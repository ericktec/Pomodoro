import { useCallback, useEffect, useMemo, useState } from "react";
import { storeTimeProfileToLocalStorage } from "../utils/saveTimeSettings";
import {
    concentrationProfiles,
    TimerCountersType,
    TimerProfile,
    TimerTypes,
} from "../types/timer";

import { changeTabIcon, changeTabTile } from "../utils/notifications";

const useTimerProfile = () => {
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

    const [remainingTime, setRemainingTime] = useState(0);

    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const [periodType, setPeriodType] = useState<TimerTypes>("pomodoroPeriod");

    const [counters, setCounters] = useState<TimerCountersType>({
        pomodoros: 0,
        breaks: 0,
        longBreaks: 0,
    });

    const setTimerProfile = useCallback((profile: TimerProfile) => {
        setConcentrationProfile(profile);
        storeTimeProfileToLocalStorage(profile);
        setPeriodType("pomodoroPeriod");
    }, []);

    const incrementPomodoroCounter = useCallback(() => {
        setCounters((prevCounter) => {
            const newCounters = { ...prevCounter };

            setPeriodType((prevPeriodType) => {
                if (prevPeriodType === "pomodoroPeriod") {
                    newCounters.pomodoros += 1;
                    if (
                        prevCounter.breaks > 0 &&
                        prevCounter.breaks % 2 === 0
                    ) {
                        return "longBreak";
                    }
                    return "break";
                } else if (prevPeriodType === "break") {
                    newCounters.breaks += 1;
                    return "pomodoroPeriod";
                } else {
                    newCounters.longBreaks += 1;
                    return "pomodoroPeriod";
                }
            });
            return newCounters;
        });
    }, []);

    const remainingTimeFormatted = useMemo<string>(() => {
        const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
        const seconds = String(remainingTime % 60).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }, [remainingTime]);

    useEffect(() => {
        if (isTimerRunning) {
            // Here we call the remaining time formatted to avoid recreating the worker
            changeTabTile(remainingTimeFormatted);
        } else {
            changeTabTile();
            changeTabIcon();
        }
    }, [remainingTimeFormatted, isTimerRunning]);

    return {
        concentrationProfile,
        setTimerProfile,
        remainingTime,
        periodType,
        setRemainingTime,
        remainingTimeFormatted,
        isTimerRunning,
        setIsTimerRunning,
        incrementPomodoroCounter,
    };
};

export default useTimerProfile;
