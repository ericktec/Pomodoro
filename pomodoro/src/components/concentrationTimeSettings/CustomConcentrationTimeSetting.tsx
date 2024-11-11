import { FormEvent, Fragment, useState, useRef } from "react";
import SliderSelector from "../sliderSelector/SliderSelector";
import { TimerProfile } from "../../types/timer";
import RadioButton from "../radioButton/RadioButton";

const slidersData: Array<{
    type: keyof TimerProfile;
    label: string;
}> = [
    {
        label: "Pomodoro",
        type: "workTime",
    },
    {
        label: "Break",
        type: "breakTime",
    },
    {
        label: "Long Break",
        type: "longBreak",
    },
];

type Props = {
    onConcentrationProfileChange: (profile: TimerProfile) => void;
    disabled: boolean;
    disableOption: boolean;
};

const CustomConcentrationTimeSetting = ({
    onConcentrationProfileChange,
    disabled,
    disableOption,
}: Props) => {
    const [customTimeProfile, setCustomTimeProfile] = useState<TimerProfile>(
        () => {
            const customProfileSettings = localStorage.getItem("customProfile");
            if (customProfileSettings) {
                return JSON.parse(customProfileSettings);
            }

            return {
                title: "Custom",
                workTime: 60,
                breakTime: 10,
                longBreak: 15,
            };
        }
    );

    const customProfileTimeoutRef = useRef<ReturnType<
        typeof setTimeout
    > | null>(null);

    const onChangeTimeHandler = (
        event: FormEvent<HTMLInputElement>,
        timeSetting: keyof TimerProfile
    ) => {
        const value = Number(event.currentTarget.value);
        setCustomTimeProfile((prevValue) => {
            const newProfile = {
                ...prevValue,
                [timeSetting]: value,
            };

            if (customProfileTimeoutRef.current) {
                clearTimeout(customProfileTimeoutRef.current);
                customProfileTimeoutRef.current = null;
            }
            customProfileTimeoutRef.current = setTimeout(() => {
                localStorage.setItem(
                    "customProfile",
                    JSON.stringify(newProfile)
                );
                onConcentrationProfileChange(newProfile);
            }, 800);
            return newProfile;
        });
    };

    return (
        <div className="concentrationTimeSettings__item">
            <RadioButton
                disabled={disableOption}
                name="profile"
                id="customProfile"
                value="customProfile"
                checked={!disabled}
                onChange={(event) =>
                    onConcentrationProfileChange({
                        title: customTimeProfile.title,
                        workTime: customTimeProfile.workTime,
                        breakTime: customTimeProfile.breakTime,
                        longBreak: customTimeProfile.longBreak,
                    })
                }
            />
            <label
                htmlFor="customProfile"
                className="concentrationTimesSettings__body"
            >
                <h3 className="concentrationTimesSettings__title">Custom</h3>
                <div className="concentrationTimesSettings__custom-item">
                    {slidersData.map((slider) => (
                        <Fragment key={slider.label}>
                            <p>{customTimeProfile[slider.type]} min</p>
                            <p className="concentrationTimesSettings__custom-title">
                                {slider.label}
                            </p>
                            <SliderSelector
                                className="concentrationTimesSettings__custom-slider"
                                min={1}
                                max={120}
                                value={customTimeProfile[slider.type]}
                                onChange={(event) =>
                                    onChangeTimeHandler(event, slider.type)
                                }
                                disabled={disabled}
                            />
                        </Fragment>
                    ))}
                </div>
            </label>
        </div>
    );
};

export default CustomConcentrationTimeSetting;
