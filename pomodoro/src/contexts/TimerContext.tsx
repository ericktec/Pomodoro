import {
    createContext,
    PropsWithChildren,
    useRef,
    useEffect,
    useLayoutEffect,
    useMemo,
    useCallback,
} from "react";
import {
    changeTabIcon,
    changeTabTitle,
    notifyUser,
} from "../utils/notifications";

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
import useAlarmSettings from "../hooks/useAlarmSettings";
import useTimerProfile from "../hooks/useTimerProfile";

export const TimerContext = createContext<TimerContextValue>({
    isTimerRunning: false,
    remainingTime: 0,
    timerWorkerRef: null,
    periodType: "pomodoroPeriod",
    remainingTimeFormatted: "00:00",
    concentrationProfile: {
        title: "Default",
        breakTime: 10,
        longBreak: 5,
        workTime: 60,
    },
    alarmSettings: {
        soundPath: null,
        volume: 0,
    },
    pomodoroCounters: {
        breaks: 0,
        longBreaks: 0,
        pomodoros: 0
    }
});

export const TimerControllersContext =
    createContext<TimerContextDispatchersValue>({
        setTimerProfile: () => {},
        startTimer: () => {},
        stopTimer: () => {},
        onChangeSound: () => {},
        onChangeVolume: () => {},
        onChangeVolumeFinish: () => {},
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
    const {
        alarmSettings,
        onChangeSound,
        onChangeVolume,
        onChangeVolumeFinish,
    } = useAlarmSettings();

    const {
        periodType,
        remainingTime,
        setTimerProfile,
        concentrationProfile,
        setRemainingTime,
        remainingTimeFormatted,
        isTimerRunning,
        setIsTimerRunning,
        incrementPomodoroCounter,
        pomodoroCounters
    } = useTimerProfile();

    const timerWorkerRef = useRef<null | Worker>(null);

    useLayoutEffect(() => {
        let urlWorker = URL.createObjectURL(timerWorker);
        timerWorkerRef.current = new Worker(urlWorker);

        const receiveMessageFromTimerWorker = (
            event: MessageEvent<TimerWorkerMessage>
        ) => {
            switch (event.data.event) {
                case "tick": {
                    setRemainingTime(event.data.payload.countDown);
                    changeTabIcon(event.data.payload.icon);
                    break;
                }

                case "completed": {
                    setIsTimerRunning(false);
                    incrementPomodoroCounter();
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

        return () => {
            console.log("cleaning timer");
            timerWorkerRef.current?.terminate();
            URL.revokeObjectURL(urlWorker);
        };
    }, [setIsTimerRunning, setRemainingTime, incrementPomodoroCounter]);

    useEffect(() => {
        if (!timerWorkerRef.current) return;

        let duration = concentrationProfile.workTime * 60;
        if (periodType === "break") {
            duration = concentrationProfile.breakTime * 60;
        } else if (periodType === "longBreak") {
            duration = concentrationProfile.longBreak * 60;
        }
        setRemainingTime(duration);

        const initialMessage: SetupTimerMessage = {
            event: "setupTimer",
            payload: {
                duration,
                type: periodType,
            },
        };

        timerWorkerRef.current.postMessage(initialMessage);
    }, [periodType, concentrationProfile, setRemainingTime]);

    const startTimer = useCallback(() => {
        const message: StartTimerMessage = {
            event: "startTimer",
            payload: { startAt: new Date().getTime() },
        };
        timerWorkerRef.current?.postMessage(message);
        setIsTimerRunning(true);
    }, [setIsTimerRunning]);

    const stopTimer = useCallback(() => {
        const message: StopTimerMessage = {
            event: "stopTimer",
        };
        timerWorkerRef.current?.postMessage(message);
        setIsTimerRunning(false);

        switch (periodType) {
            case "pomodoroPeriod":
                setRemainingTime(concentrationProfile.workTime * 60);
                break;

            case "break":
                setRemainingTime(concentrationProfile.breakTime * 60);
                break;

            case "longBreak":
                setRemainingTime(concentrationProfile.longBreak * 60);
                break;

            default:
                break;
        }
    }, [periodType, concentrationProfile, setRemainingTime, setIsTimerRunning]);


    const timerContextValue = useMemo<TimerContextValue>(
        () => ({
            remainingTime,
            isTimerRunning,
            remainingTimeFormatted,
            concentrationProfile,
            timerWorkerRef,
            alarmSettings,
            periodType,
            pomodoroCounters
        }),
        [
            remainingTime,
            remainingTimeFormatted,
            isTimerRunning,
            concentrationProfile,
            alarmSettings,
            periodType,
            pomodoroCounters
        ]
    );

    const timerDispatchersContextValue = useMemo(
        () => ({
            startTimer,
            setupTimer,
            stopTimer,
            setTimerProfile,
            onChangeVolume,
            onChangeVolumeFinish,
            onChangeSound,
        }),
        [
            startTimer,
            stopTimer,
            setTimerProfile,
            onChangeVolume,
            onChangeVolumeFinish,
            onChangeSound,
        ]
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
