import "./alarmSettings.css";
import { FormEvent, useState, useRef, useContext } from "react";
import SliderSelector from "../sliderSelector/SliderSelector";
import { AlarmSettingsProfile, AlarmSettingsType } from "../../types/alarm";
import {
    TimerContext,
    TimerControllersContext,
} from "../../contexts/TimerContext";

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
    const { onChangeSound, onChangeVolume, onChangeVolumeFinish } = useContext(
        TimerControllersContext
    );

    const { alarmSettings } = useContext(TimerContext);

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
