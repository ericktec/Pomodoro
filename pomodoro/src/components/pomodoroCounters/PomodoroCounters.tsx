import { useContext, useMemo } from "react";
import "./pomodoroCounters.css";
import { TimerContext } from "../../contexts/TimerContext";
import { TimerTypes } from "../../types/timer";

type PomodoroCounterItem = {
    count: number;
    label: string;
    type: TimerTypes;
};

const PomodoroCounters = () => {
    const { isTimerRunning, pomodoroCounters, periodType, setPeriodType } =
        useContext(TimerContext);

    const onClickPomodoroTimerHandler = (timerProfile: TimerTypes) => {
        if (isTimerRunning) return;
        setPeriodType(timerProfile);
    };

    const counters = useMemo<Array<PomodoroCounterItem>>(() => {
        return [
            {
                count: pomodoroCounters.pomodoros,
                label: "Pomodoro",
                type: "pomodoroPeriod",
            },
            {
                count: pomodoroCounters.breaks,
                label: "Breaks",
                type: "break",
            },
            {
                count: pomodoroCounters.longBreaks,
                label: "Long Breaks",
                type: "longBreak",
            },
        ];
    }, [pomodoroCounters]);

    return (
        <div className="pomodoro__counters">
            {counters.map((counter, i) => (
                <div
                    onClick={() => onClickPomodoroTimerHandler(counter.type)}
                    key={i}
                    className={`pomodoro__counter ${
                        isTimerRunning
                            ? "pomodoro__counter--noClickable"
                            : "pomodoro__counter--clickable"
                    }`}
                >
                    <span className="pomodoro__counter-count">
                        {counter.count}
                    </span>{" "}
                    <span>{counter.label}</span>
                </div>
            ))}
        </div>
    );
};

export default PomodoroCounters;
