import { Dispatch, FormEvent, Ref, SetStateAction } from "react";
import { AlarmSettingsType } from "./alarm";

export type TimerProfile = {
    title: string;
    workTime: number;
    breakTime: number;
    longBreak: number;
};

export type TimerContextValue = {
    remainingTime: number;
    isTimerRunning: boolean;
    timerWorkerRef: Ref<null | Worker>;
    remainingTimeFormatted: string;
    concentrationProfile: TimerProfile;
    alarmSettings: AlarmSettingsType;
    periodType: TimerTypes;
    setPeriodType: Dispatch<SetStateAction<TimerTypes>>
    pomodoroCounters: TimerCountersType
};

export type TimerContextDispatchersValue = {
    startTimer: () => void;
    stopTimer: () => void;
    setTimerProfile: (timerProfile: TimerProfile) => void;
    onChangeVolume: (event: FormEvent<HTMLInputElement>) => void;
    onChangeVolumeFinish: () => void;
    onChangeSound: (soundPath: string | null) => void;
};

// Communication to worker
export type TimerTypes = "pomodoroPeriod" | "break" | "longBreak";
export type StartTimerMessage = {
    event: "startTimer";
    payload: {
        startAt: number;
    };
};

export type SetupTimerMessage = {
    event: "setupTimer";
    payload: {
        duration: number;
        type: TimerTypes;
    };
};

export type MessageReady = {
    event: "workerReady";
    payload: null;
};

export type MessageTick = {
    event: "tick";
    payload: {
        countDown: number;
        icon: string;
    };
};

export type StopTimerMessage = {
    event: "stopTimer";
};

export type TimerStoppedMessage = {
    event: "stoppedTimer";
};

export type TimerCompleted = {
    event: "completed";
    payload: null;
};

export type TimerWorkerMessage =
    | StartTimerMessage
    | MessageReady
    | SetupTimerMessage
    | MessageTick
    | StopTimerMessage
    | TimerStoppedMessage
    | TimerCompleted;

export const concentrationProfiles: Array<TimerProfile> = [
    {
        title: "Popular",
        workTime: 20,
        breakTime: 5,
        longBreak: 15,
    },
    {
        title: "Medium",
        workTime: 40,
        breakTime: 8,
        longBreak: 20,
    },
    {
        title: "Extended",
        workTime: 60,
        breakTime: 10,
        longBreak: 25,
    },
    {
        title: "Extended tryhard",
        workTime: 60,
        breakTime: 5,
        longBreak: 10,
    },
];

export type TimerCountersType = {
    pomodoros: number;
    breaks: number;
    longBreaks: number;
};
