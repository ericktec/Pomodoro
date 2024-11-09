import { Dispatch, SetStateAction } from "react";

type Props = {
    setTabSelected: Dispatch<SetStateAction<any>>;
};

const SettingsMenu = ({ setTabSelected }: Props) => {
    return (
        <>
            <ul className="menu__timerOptions">
                <li className="menu__timerOptionsElement">
                    <i className="icofont-clock-time"></i>
                    Concentration time
                </li>
                <li className="menu__timerOptionsElement">
                    <i className="icofont-alarm"></i>
                    Alarm
                </li>

                <li className="menu__timerOptionsElement">
                    <i className="icofont-redo"></i>
                    Auto Start
                </li>

                <li className="menu__timerOptionsElement">
                    <i className="icofont-duotone icofont-notification-circle"></i>
                    Notifications
                </li>
            </ul>
        </>
    );
};

export default SettingsMenu;
