import { useState } from "react";
import SettingsMenu from "../settingsMenu/SettingsMenu";
import SettingsHeader from "../settingsMenu/SettingsHeader";
import BackgroundPicker from "../backgroundPicker/BackgroundPicker";
import ConcentrationTimeSettings from "../concentrationTimeSettings/ConcentrationTimeSettings";
import { TabSelected } from "../../types/settingsMenu";
import AlarmSettings from "../AlarmSettings/AlarmSettings";
import AutoStartSettings from "../autoStartSettings/AutoStartSettings";

const tabsTitles: { [key in TabSelected]: string } = {
    settings: "Settings",
    backgroundPicker: "Background",
    concentrationTimeSettings: "Concentration Time",
    alarmSettings: "Alarm",
    autoStart: "Auto Start",
};

type Props = {
    className?: string;
    onCloseMenuHandler: () => void;
};

const TimerSettings = ({ className, onCloseMenuHandler }: Props) => {
    const [tabSelected, setTabSelected] = useState<TabSelected>("settings");

    const onGoBackHandler = () => {
        setTabSelected("settings");
    };

    return (
        <menu className={`menu ${className || ""}`}>
            <SettingsHeader
                onCloseMenuHandler={onCloseMenuHandler}
                setTabSelected={setTabSelected}
            >
                {tabSelected === "settings" && (
                    <>
                        <li
                            className="menu__element"
                            onClick={() => setTabSelected("backgroundPicker")}
                        >
                            <i className="icofont-image"></i>
                            <span>Background</span>
                        </li>
                        <li className="menu__element">
                            <i className="icofont-world"></i>
                            <span>Language</span>
                        </li>
                    </>
                )}
                {tabSelected !== "settings" && (
                    <li className="menu__element" onClick={onGoBackHandler}>
                        <i className="icofont-simple-left home__menu-back-btn"></i>
                        <span className="menu__title">
                            {tabsTitles[tabSelected]}
                        </span>
                    </li>
                )}
            </SettingsHeader>

            <section>
                {tabSelected === "settings" && (
                    <SettingsMenu setTabSelected={setTabSelected} />
                )}
                {tabSelected === "backgroundPicker" && <BackgroundPicker />}
                {tabSelected === "concentrationTimeSettings" && (
                    <ConcentrationTimeSettings />
                )}
                {tabSelected === "alarmSettings" && <AlarmSettings />}
                {tabSelected === "autoStart" && <AutoStartSettings />}
            </section>
        </menu>
    );
};

export default TimerSettings;
