import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./timer.css";
import {
    changeTabIcon,
    changeTabTile,
    notifyUser,
} from "../../utils/notifications";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

type Props = {
    time: number;
    status: "working" | "resting";
    className?: string;
    autoStart?: boolean;
};

const Timer = ({ time, status, className, autoStart }: Props) => {
    const [remainingTime, setRemainingTime] = useState(time);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
        }
        intervalRef.current = null;
    }, []);

    const startTimer = useCallback(() => {
        setIsTimerRunning(true);
        intervalRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    notifyUser("Timer up");
                    stopTimer();
                    return prevTime;
                }

                return prevTime - 1;
            });
        }, 1000);
    }, [stopTimer]);

    const restartTimer = useCallback(() => {
        stopTimer();
        setRemainingTime(time);
        startTimer();
    }, [stopTimer, startTimer, time]);

    useEffect(() => {
        if (autoStart) {
            restartTimer();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [time, status, restartTimer, autoStart]);

    const remainingTimeFormatted = useMemo<string>(() => {
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }, [remainingTime]);

    useEffect(() => {
        if (!isTimerRunning) {
            changeTabTile();
            changeTabIcon();
        } else {
            changeTabTile(`${remainingTimeFormatted} Pomodoro`);
            const percentage = (1 - remainingTime / time) * 100;
            const svg = `data:image/svg+xml;base64,${btoa(
                LoadingSpinner(percentage)
            )}`;
            changeTabIcon(svg);
        }
    }, [remainingTimeFormatted, isTimerRunning, time, remainingTime]);

    return (
        <section className={`${className || ""}`}>
            <div className="pomodoro__counters">
                <span className="pomodoro__counter">1 Pomodoro</span>
                <span className="pomodoro__counter">0 Breaks</span>
                <span className="pomodoro__counter">0 Long Breaks</span>
            </div>
            <div className="timer">{remainingTimeFormatted}</div>
        </section>
    );
};

export default Timer;
