import {
    createContext,
    PropsWithChildren,
    useRef,
    useEffect,
    useState,
    useMemo,
    useCallback,
} from "react";
import {
    changeTabIcon,
    changeTabTile,
    notifyUser,
} from "../utils/notifications";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

import timerWorker from "../workers/timer.worker";
import {
    SetupTimerMessage,
    StartTimerMessage,
    StopTimerMessage,
    TimerContextDispatchersValue,
    TimerContextValue,
    TimerTypes,
    TimerWorkerMessage,
} from "../types/timer";

export const TimerContext = createContext<TimerContextValue>({
    isTimerRunning: false,
    remainingTime: 0,
    timerWorkerRef: null,
    remainingTimeFormatted: "00:00",
});

export const TimerControllersContext =
    createContext<TimerContextDispatchersValue>({
        setRestTime: () => {},
        setWorkingTime: () => {},
        setLongRestTime: () => {},
        startTimer: () => {},
        stopTimer: () => {},
    });

const setupTimer = (
    periodType: TimerTypes,
    timerWorker: Worker,
    time: number
) => {
    const message: SetupTimerMessage = {
        event: "setupTimer",
        payload: {
            duration: time,
            type: periodType,
        },
    };

    timerWorker.postMessage(message);
};

type Props = {} & PropsWithChildren;
const TimerProvider = ({ children }: Props) => {
    const [workTime, setWorkTime] = useState(
        Number(localStorage.getItem("workTime") ?? 20 * 60)
    );
    const [breakTime, setBreakTime] = useState(
        Number(localStorage.getItem("breakTime") ?? 60 * 5)
    );
    const [longBreakTime, setLongBreakTime] = useState(
        Number(localStorage.getItem("longBreakTime") ?? 60 * 15)
    );

    const [remainingTime, setRemainingTime] = useState(workTime);

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const [periodType, setPeriodType] = useState<TimerTypes>("pomodoroPeriod");

    const [autoPlayBreaks, setAutoPlayBreaks] = useState(
        Boolean(localStorage.getItem("autoPlayBreaks"))
    );
    const [autoPlayPomodoro, setAutoPlayPomodoro] = useState(
        Boolean(localStorage.getItem("autoPlayPomodoro"))
    );

    const timerWorkerRef = useRef<null | Worker>(null);

    useEffect(() => {
        let urlWorker = URL.createObjectURL(timerWorker);
        timerWorkerRef.current = new Worker(urlWorker);

        const receiveMessageFromTimerWorker = (
            event: MessageEvent<TimerWorkerMessage>
        ) => {
            switch (event.data.event) {
                case "tick": {
                    setRemainingTime(event.data.payload);
                    break;
                }

                case "completed": {
                    setIsTimerRunning(false);
                    break;
                }

                default: {
                    break;
                }
            }
        };

        timerWorkerRef.current.addEventListener(
            "message",
            receiveMessageFromTimerWorker
        );

        const initialMessage: SetupTimerMessage = {
            event: "setupTimer",
            payload: {
                duration: Number(localStorage.getItem("workTime") ?? 20 * 60),
                type: "pomodoroPeriod",
            },
        };
        timerWorkerRef.current.postMessage(initialMessage);

        return () => {
            timerWorkerRef.current?.terminate();
            URL.revokeObjectURL(urlWorker);
        };
    }, []);

    const remainingTimeFormatted = useMemo<string>(() => {
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }, [remainingTime]);

    // useEffect(() => {
    //     if (!isTimerRunning) {
    //         changeTabTile();
    //         changeTabIcon();
    //     } else {
    //         changeTabTile(`${remainingTimeFormatted} Pomodoro`);
    //         const percentage = (1 - remainingTime / time) * 100;
    //         const svg = `data:image/svg+xml;base64,${btoa(
    //             LoadingSpinner(percentage)
    //         )}`;
    //         changeTabIcon(svg);
    //     }
    // }, [remainingTimeFormatted, isTimerRunning, remainingTime]);

    const setRestTime = useCallback(
        (time: number) => {
            if (time > 0 && time < 60 * 100 && !isTimerRunning) {
                setBreakTime(time);
                localStorage.setItem("breakTime", time.toString());
            }
        },
        [isTimerRunning]
    );

    const setLongRestTime = useCallback(
        (time: number) => {
            if (time > 0 && time < 60 * 100 && !isTimerRunning) {
                setLongBreakTime(time);
                localStorage.setItem("longBreak", time.toString());
            }
        },
        [isTimerRunning]
    );

    const timerContextValue = useMemo(
        () => ({
            remainingTime,
            isTimerRunning,
            timerWorkerRef,
            remainingTimeFormatted,
        }),
        [remainingTime, remainingTimeFormatted, isTimerRunning]
    );

    const startTimer = useCallback(() => {
        const message: StartTimerMessage = {
            event: "startTimer",
            payload: { startAt: new Date().getTime() },
        };
        timerWorkerRef.current?.postMessage(message);
        setIsTimerRunning(true);
    }, []);

    const stopTimer = useCallback(() => {
        const message: StopTimerMessage = {
            event: "stopTimer",
        };
        timerWorkerRef.current?.postMessage(message);
        setIsTimerRunning(false);

        switch (periodType) {
            case "pomodoroPeriod":
                setRemainingTime(workTime);
                break;

            case "break":
                setRemainingTime(breakTime);
                break;

            case "longBreak":
                setRemainingTime(longBreakTime);
                break;

            default:
                break;
        }
    }, [periodType, longBreakTime, workTime, breakTime]);

    const setWorkingTime = useCallback(
        (time: number) => {
            if (
                time > 0 &&
                time < 60 * 100 &&
                !isTimerRunning &&
                timerWorkerRef.current
            ) {
                setWorkTime(time);
                localStorage.setItem("workTime", time.toString());
                if (periodType === "pomodoroPeriod") {
                    setRemainingTime(time);
                    setupTimer(periodType, timerWorkerRef.current, time);
                }
            }
        },
        [isTimerRunning, periodType]
    );

    const timerDispatchersContextValue = useMemo(
        () => ({
            setWorkingTime,
            setRestTime,
            setLongRestTime,
            startTimer,
            setupTimer,
            stopTimer,
        }),
        [setWorkingTime, setLongRestTime, startTimer, setRestTime, stopTimer]
    );

    return (
        <TimerControllersContext.Provider value={timerDispatchersContextValue}>
            <TimerContext.Provider value={timerContextValue}>
                {children}
            </TimerContext.Provider>
        </TimerControllersContext.Provider>
    );
};

export default TimerProvider;
