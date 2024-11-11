import { TimerProfile } from "../types/timer";

export const storeTimeProfileToLocalStorage = (profile: TimerProfile) => {
    localStorage.setItem("timerProfile", JSON.stringify(profile));
};
