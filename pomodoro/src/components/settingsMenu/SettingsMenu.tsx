import { Dispatch, SetStateAction, useContext } from "react";
import { TabSelected } from "../../types/settingsMenu";
import { TimerContext } from "../../contexts/TimerContext";

type Props = {
    setTabSelected: Dispatch<SetStateAction<TabSelected>>;
};

const SettingsMenu = ({ setTabSelected }: Props) => {
    const { isTimerRunning } = useContext(TimerContext);
    return (
        <>
            <ul className="menu__timerOptions">
                <li
                    className={`menu__timerOptionsElement ${
                        isTimerRunning
                            ? "menu__timerOptionsElement__timerRunning"
                            : ""
                    }`}
                    onClick={() =>
                        isTimerRunning ||
                        setTabSelected("concentrationTimeSettings")
                    }
                >
                    <i className="icofont-clock-time"></i>
                    <span>
                        Concentration time
                        {isTimerRunning && (
                            <p className="menu__timerOptionsElement__timerRunning-description">
                                Stop the timer to change the time
                            </p>
                        )}
                    </span>
                </li>
                <li
                    className="menu__timerOptionsElement"
                    onClick={() => setTabSelected("alarmSettings")}
                >
                    <i className="icofont-alarm"></i>
                    Alarm
                </li>

                <li
                    className="menu__timerOptionsElement"
                    onClick={() => setTabSelected("autoStart")}
                >
                    <i className="icofont-redo"></i>
                    Auto Start
                </li>

                <li
                    className="menu__timerOptionsElement"
                    onClick={() => setTabSelected("notifications")}
                >
                    <i className="icofont-duotone icofont-notification-circle"></i>
                    Notifications
                </li>
            </ul>
        </>
    );
};

export default SettingsMenu;
