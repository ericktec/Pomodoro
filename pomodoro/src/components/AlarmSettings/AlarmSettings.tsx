import "./alarmSettings.css";
import { FormEvent, useState, useRef } from "react";
import SliderSelector from "../sliderSelector/SliderSelector";
import { AlarmSettingsProfile, AlarmSettingsType } from "../../types/alarm";

const alarms: Array<AlarmSettingsProfile> = [
    {
        label: "Alarm 1",
        soundPath: "alarms/alarm1.mp3",
    },
    {
        label: "Alarm 2",
        soundPath: "alarms/alarm2.mp3",
    },
    {
        label: "Alarm 3",
        soundPath: "alarms/alarm3.mp3",
    },
    {
        label: "Alarm 4",
        soundPath: "alarms/alarm4.mp3",
    },
    {
        label: "No Alarm",
        soundPath: null,
        iconClassName: "icofont-ui-mute",
    },
];

const AlarmSettings = () => {
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

    const soundRef = useRef<HTMLAudioElement | null>(
        alarmSettings.soundPath ? new Audio(alarmSettings.soundPath) : null
    );

    const onChangeVolume = (event: FormEvent<HTMLInputElement>) => {
        const volume = Number(event.currentTarget.value);
        setAlarmSettings((prevValue) => ({
            ...prevValue,
            volume: volume,
        }));
    };

    const onChangeVolumeFinish = () => {
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
    };

    const onChangeSound = (soundPath: string | null) => {
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
    };

    return (
        <section className="alarmSettings">
            <h3 className="alarmSettings__title">Alarm on completion</h3>
            <ul className="alarmSettings__soundsList">
                {alarms.map((alarm) => (
                    <li
                        key={alarm.label + alarm.soundPath}
                        onClick={() => onChangeSound(alarm.soundPath)}
                        className={`alarmSettings__sound ${
                            alarmSettings.soundPath === alarm.soundPath
                                ? "alarmSettings__sound-selected"
                                : ""
                        }`}
                    >
                        {alarm.iconClassName ? (
                            <i className={alarm.iconClassName}></i>
                        ) : (
                            alarm.label
                        )}
                    </li>
                ))}
            </ul>
            <label
                htmlFor="alarmVolume"
                className="alarmsSettings__volumeLabel"
            >
                Volume
                <span className="alarmsSettings__volume">
                    {alarmSettings.volume}
                </span>
            </label>
            <SliderSelector
                onMouseUp={onChangeVolumeFinish}
                id="alarmVolume"
                min={0}
                max={100}
                value={alarmSettings.volume}
                onChange={onChangeVolume}
                disabled={alarmSettings.soundPath === null}
            />
        </section>
    );
};

export default AlarmSettings;
