import "./autoStartSettings.css";
import { useState } from "react";
import SwitcherInput from "../switcher/Switcher";
import { AutoStartSettingsType } from "../../types/autoStartSettings";

const AutoStartSettings = () => {
    const [autoStartSettings, setAutoStartSettings] =
        useState<AutoStartSettingsType>(() => {
            const autoStartSettingsFromLocalStorage =
                localStorage.getItem("autoStartSettings");
            if (autoStartSettingsFromLocalStorage) {
                return JSON.parse(autoStartSettingsFromLocalStorage);
            }

            return {
                autoStartBreaks: true,
                autoStartPomodoro: false,
            };
        });

    const onCheckboxValueChange = (setting: keyof AutoStartSettingsType) => {
        setAutoStartSettings((prev) => {
            const newSettings = {
                ...prev,
                [setting]: !prev[setting],
            };

            localStorage.setItem(
                "autoStartSettings",
                JSON.stringify(newSettings)
            );
            return newSettings;
        });
    };

    return (
        <section>
            <div className="autoStartSettings__inputContainer">
                <p>Auto Start Pomodoro Timer</p>
                <SwitcherInput
                    label="Auto Start pomodoros"
                    id="autoStartPomodoros"
                    checked={autoStartSettings.autoStartPomodoro}
                    onChange={() => onCheckboxValueChange("autoStartPomodoro")}
                />
            </div>
            <div className="autoStartSettings__inputContainer">
                <p>Auto Start Breaks</p>
                <SwitcherInput
                    label="Auto Start pomodoros"
                    id="autoStartPomodoros"
                    checked={autoStartSettings.autoStartBreaks}
                    onChange={() => onCheckboxValueChange("autoStartBreaks")}
                />
            </div>
        </section>
    );
};

export default AutoStartSettings;
