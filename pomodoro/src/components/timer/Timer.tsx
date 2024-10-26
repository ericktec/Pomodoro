import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./timer.css";
import { notifyUser } from "../../utils/notifications";

type Props = {
    time: number;
    status: "working" | "resting";
};

const Timer = ({ time, status }: Props) => {
    const [remainingTime, setRemainingTime] = useState(time);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0) {
                    notifyUser("Timer up");
                    intervalRef.current && clearInterval(intervalRef.current);
                    return prevTime;
                }

                return prevTime - 1;
            });
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    const restartTimer = useCallback(() => {
        stopTimer();
        setRemainingTime(time);
        startTimer();
    }, [stopTimer, startTimer, time]);

    useEffect(() => {
        restartTimer();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [time, status, restartTimer]);

    const remainingTimeFormatted = useMemo<string>(() => {
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }, [remainingTime]);

    return (
        <div>
            {remainingTimeFormatted}
            <button onClick={stopTimer}>Stop timer</button>
            <button onClick={startTimer}>Resume timer</button>
            <button onClick={restartTimer}>Restart Timer</button>
        </div>
    );
};

export default Timer;
