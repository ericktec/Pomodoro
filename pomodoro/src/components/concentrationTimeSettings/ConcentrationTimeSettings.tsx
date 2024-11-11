import { useContext } from "react";
import RadioButton from "../radioButton/RadioButton";
import "./concentrationTimeSettings.css";
import { concentrationProfiles } from "../../types/timer";
import CustomConcentrationTimeSetting from "./CustomConcentrationTimeSetting";
import {
    TimerContext,
    TimerControllersContext,
} from "../../contexts/TimerContext";

const ConcentrationTimeSettings = () => {
    const { setTimerProfile: onConcentrationProfileChange } = useContext(
        TimerControllersContext
    );
    const { concentrationProfile, isTimerRunning } = useContext(TimerContext);

    return (
        <form className="concentrationTimeSettings">
            {concentrationProfiles.map((profile) => (
                <div
                    key={profile.title}
                    className="concentrationTimeSettings__item"
                >
                    <RadioButton
                        name="profile"
                        id={profile.title}
                        value={profile.title}
                        onChange={(event) =>
                            onConcentrationProfileChange(profile)
                        }
                        checked={profile.title === concentrationProfile.title}
                        disabled={isTimerRunning}
                    />
                    <label
                        className="concentrationTimesSettings__body"
                        htmlFor={profile.title}
                    >
                        <h3 className="concentrationTimesSettings__title">
                            {profile.title}
                        </h3>
                        <p className="concentrationTimesSettings__setting">
                            {profile.workTime} min pomodoro
                        </p>
                        <p className="concentrationTimesSettings__setting">
                            {profile.breakTime} min break
                        </p>
                        <p className="concentrationTimesSettings__setting">
                            {profile.longBreak} min long break
                        </p>
                    </label>
                </div>
            ))}

            <CustomConcentrationTimeSetting
                onConcentrationProfileChange={onConcentrationProfileChange}
                disabled={concentrationProfile.title !== "Custom"}
                disableOption={isTimerRunning}
            />
        </form>
    );
};

export default ConcentrationTimeSettings;
