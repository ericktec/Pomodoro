import {
    createContext,
    PropsWithChildren,
    useRef,
    useEffect,
    useLayoutEffect,
    useState,
    useMemo,
    useCallback,
} from "react";
import {
    changeTabIcon,
    changeTabTile,
    notifyUser,
} from "../utils/notifications";

import timerWorker from "../workers/timer.worker";
import {
    concentrationProfiles,
    SetupTimerMessage,
    StartTimerMessage,
    StopTimerMessage,
    TimerContextDispatchersValue,
    TimerContextValue,
    TimerProfile,
    TimerTypes,
    TimerWorkerMessage,
} from "../types/timer";
import { storeTimeProfileToLocalStorage } from "../utils/saveTimeSettings";

export const TimerContext = createContext<TimerContextValue>({
    isTimerRunning: false,
    remainingTime: 0,
    timerWorkerRef: null,
    remainingTimeFormatted: "00:00",
    concentrationProfile: {
        title: "Default",
        breakTime: 10,
        longBreak: 5,
        workTime: 60,
    },
});

export const TimerControllersContext =
    createContext<TimerContextDispatchersValue>({
        setTimerProfile: () => {},
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
    const [concentrationProfile, setConcentrationProfile] =
        useState<TimerProfile>(() => {
            const profileFromLocalStorage =
                localStorage.getItem("timerProfile");
            if (profileFromLocalStorage) {
                const profileJson: TimerProfile = JSON.parse(
                    profileFromLocalStorage
                );
                profileJson.workTime = Number(profileJson.workTime);
                profileJson.breakTime = Number(profileJson.breakTime);
                profileJson.longBreak = Number(profileJson.longBreak);

                return profileJson;
            }
            return concentrationProfiles[0];
        });

    const [remainingTime, setRemainingTime] = useState(
        concentrationProfile.workTime * 60
    );

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const [periodType, setPeriodType] = useState<TimerTypes>("pomodoroPeriod");

    const [autoPlayBreaks, setAutoPlayBreaks] = useState(
        Boolean(localStorage.getItem("autoPlayBreaks"))
    );
    const [autoPlayPomodoro, setAutoPlayPomodoro] = useState(
        Boolean(localStorage.getItem("autoPlayPomodoro"))
    );

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
            timerWorkerRef.current?.terminate();
            URL.revokeObjectURL(urlWorker);
        };
    }, []);

    useEffect(() => {
        if (!timerWorkerRef.current) return;

        const initialMessage: SetupTimerMessage = {
            event: "setupTimer",
            payload: {
                duration: concentrationProfile.workTime * 60,
                type: "pomodoroPeriod",
            },
        };

        timerWorkerRef.current.postMessage(initialMessage);
    }, [concentrationProfile]);

    const remainingTimeFormatted = useMemo<string>(() => {
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }, [remainingTime]);

    useEffect(() => {
        if (isTimerRunning) {
            changeTabTile(remainingTimeFormatted);
        } else {
            changeTabTile();
            changeTabIcon();
        }
    }, [remainingTimeFormatted, isTimerRunning]);

    const timerContextValue = useMemo(
        () => ({
            remainingTime,
            isTimerRunning,
            remainingTimeFormatted,
            concentrationProfile,
            timerWorkerRef,
        }),
        [
            remainingTime,
            remainingTimeFormatted,
            isTimerRunning,
            concentrationProfile,
        ]
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
    }, [periodType, concentrationProfile]);

    const setTimerProfile = useCallback((profile: TimerProfile) => {
        setConcentrationProfile(profile);
        storeTimeProfileToLocalStorage(profile);
        setRemainingTime(profile.workTime * 60);
        setPeriodType("pomodoroPeriod");
    }, []);

    const timerDispatchersContextValue = useMemo(
        () => ({
            startTimer,
            setupTimer,
            stopTimer,
            setTimerProfile,
        }),
        [startTimer, stopTimer, setTimerProfile]
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
