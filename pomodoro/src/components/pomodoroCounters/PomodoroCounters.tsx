import { useContext, useMemo } from "react";
import "./pomodoroCounters.css";
import { TimerContext } from "../../contexts/TimerContext";

type PomodoroCounterItem = {
    count: number;
    label: string;
};

const PomodoroCounters = () => {
    const { isTimerRunning } = useContext(TimerContext);

    const counters = useMemo<Array<PomodoroCounterItem>>(() => {
        return [
            {
                count: 0,
                label: "Pomodoro",
            },
            {
                count: 0,
                label: "Breaks",
            },
            {
                count: 0,
                label: "Long Breaks",
            },
        ];
    }, []);

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
