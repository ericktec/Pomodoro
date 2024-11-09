import { useRef, useState } from "react";
import "./homeMenu.css";
import SettingsMenu from "../settingsMenu/SettingsMenu";
import SettingsHeader from "../settingsMenu/SettingsHeader";
import BackgroundPicker from "../backgroundPicker/BackgroundPicker";

type TransitionsType = "open" | "opening" | "closing" | "close";

type TabSelected = "settings" | "backgroundPicker";

const tabsTitles = {
    settings: "Settings",
    backgroundPicker: "Background",
};

const HomeMenu = () => {
    const [open, setOpen] = useState<TransitionsType>("close");
    const [tabSelected, setTabSelected] = useState<TabSelected>("settings");

    const transitionIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const onOpenMenuHandler = () => {
        if (transitionIntervalRef.current) {
            clearInterval(transitionIntervalRef.current);
            transitionIntervalRef.current = null;
        }
        setOpen("opening");

        transitionIntervalRef.current = setTimeout(() => {
            setOpen("open");
        }, 100);
    };

    const onCloseMenuHandler = () => {
        if (transitionIntervalRef.current) {
            clearInterval(transitionIntervalRef.current);
            transitionIntervalRef.current = null;
        }
        setOpen("closing");

        transitionIntervalRef.current = setTimeout(() => {
            setOpen("close");
        }, 100);
    };

    const onGoBackHandler = () => {
        setTabSelected("settings");
    };

    const shouldOpen =
        open === "opening" || open === "open" || open === "closing";

    let menuClass;
    if (open === "open") {
        menuClass = "menu-open";
    }

    return (
        <>
            <button onClick={onOpenMenuHandler} className="menu__hamburger">
                <span></span>
            </button>

            {shouldOpen && (
                <menu className={`menu ${menuClass}`}>
                    <SettingsHeader
                        onCloseMenuHandler={onCloseMenuHandler}
                        setTabSelected={setTabSelected}
                    >
                        {tabSelected === "settings" && (
                            <>
                                <li
                                    className="menu__element"
                                    onClick={() =>
                                        setTabSelected("backgroundPicker")
                                    }
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
                            <li
                                className="menu__element"
                                onClick={onGoBackHandler}
                            >
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
                        {tabSelected === "backgroundPicker" && (
                            <BackgroundPicker />
                        )}
                    </section>
                </menu>
            )}
        </>
    );
};

export default HomeMenu;
