import { FormEvent, useCallback, useRef, useState } from "react";
import { AlarmSettingsType } from "../types/alarm";

const useAlarmSettings = () => {
    const [alarmSettings, setAlarmSettings] = useState<AlarmSettingsType>(
        () => {
            const preferredAlarmSettings =
                localStorage.getItem("alarmSettings");

            if (preferredAlarmSettings) {
                const preferredAlarmSettingsJson: AlarmSettingsType =
                    JSON.parse(preferredAlarmSettings);

                preferredAlarmSettingsJson.volume = Number(
                    preferredAlarmSettingsJson.volume
                );

                return preferredAlarmSettingsJson;
            }

            return {
                soundPath: null,
                volume: 60,
            };
        }
    );

    const onChangeVolume = useCallback((event: FormEvent<HTMLInputElement>) => {
        const volume = Number(event.currentTarget.value);
        setAlarmSettings((prevValue) => ({
            ...prevValue,
            volume: volume,
        }));
    }, []);

    const soundRef = useRef<HTMLAudioElement | null>(
        alarmSettings.soundPath ? new Audio(alarmSettings.soundPath) : null
    );

    const onChangeVolumeFinish = useCallback(() => {
        if (soundRef.current) {
            soundRef.current.pause();
            soundRef.current.currentTime = 0;
            soundRef.current.volume = alarmSettings.volume / 100;
            soundRef.current.play();
            soundRef.current.oncanplaythrough = () => {
                soundRef.current?.play().catch((error) => {
                    console.error("Error playing sound:", error);
                });
            };
        }

        const settings = JSON.stringify(alarmSettings);
        localStorage.setItem("alarmSettings", settings);
    }, [alarmSettings]);

    const onChangeSound = useCallback((soundPath: string | null) => {
        setAlarmSettings((prevValue) => {
            if (soundPath) {
                if (!soundRef.current) {
                    soundRef.current = new Audio(soundPath);
                }
                soundRef.current.src = soundPath;
                // Wait until the sound is loaded before playing it
                soundRef.current.oncanplaythrough = () => {
                    soundRef.current?.play().catch((error) => {
                        console.error("Error playing sound:", error);
                    });
                };

                soundRef.current.volume = prevValue.volume / 100;
                soundRef.current.load(); // Explicitly reload the audio if changing source
            } else if (soundPath === null) {
                if (soundRef.current) soundRef.current.pause();
                soundRef.current = null;
            }
            const newSoundProfile = {
                ...prevValue,
                soundPath: soundPath,
            };

            localStorage.setItem(
                "alarmSettings",
                JSON.stringify(newSoundProfile)
            );

            return newSoundProfile;
        });
    }, []);

    return {
        alarmSettings,
        onChangeSound,
        onChangeVolume,
        onChangeVolumeFinish,
    };
};

export default useAlarmSettings;
