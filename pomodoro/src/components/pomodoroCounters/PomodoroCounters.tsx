import { useContext, useMemo } from "react";
import "./pomodoroCounters.css";
import { TimerContext } from "../../contexts/TimerContext";

type PomodoroCounterItem = {
    count: number;
    label: string;
};

const PomodoroCounters = () => {
    const { isTimerRunning, pomodoroCounters } = useContext(TimerContext);

    const counters = useMemo<Array<PomodoroCounterItem>>(() => {
        return [
            {
                count: pomodoroCounters.pomodoros,
                label: "Pomodoro",
            },
            {
                count: pomodoroCounters.breaks,
                label: "Breaks",
            },
            {
                count: pomodoroCounters.longBreaks,
                label: "Long Breaks",
            },
        ];
    }, [pomodoroCounters]);

    return (
        <div className="pomodoro__counters">
            {counters.map((counter, i) => (
                <div
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
