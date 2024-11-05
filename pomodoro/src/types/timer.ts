import { Ref } from "react";

export type TimerContextValue = {
    remainingTime: number;
    isTimerRunning: boolean;
    timerWorkerRef: Ref<null | Worker>;
    remainingTimeFormatted: string;
};

export type TimerContextDispatchersValue = {
    setWorkingTime: (time: number) => void;
    setRestTime: (time: number) => void;
    setLongRestTime: (time: number) => void;
    startTimer: () => void;
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
    payload: number;
};

export type StopTimerMessage = {
    event: "stopTimer";
    payload: null;
};

export type TimerStoppedMessage = {
    event: "stoppedTimer";
    payload: null;
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
