import { useRef, useState } from "react";
import "./homeMenu.css";

type TransitionsType = "open" | "opening" | "closing" | "close";

const HomeMenu = () => {
    const [open, setOpen] = useState<TransitionsType>("close");
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
                    <section className="menu__header">
                        <ul className="menu__header-list">
                            <li className="menu__element">
                                <i className="icofont-image"></i>
                                <span>Background</span>
                            </li>
                            <li className="menu__element">
                                <i className="icofont-world"></i>
                                <span>Language</span>
                            </li>
                            <li
                                className="menu__header-close"
                                onClick={onCloseMenuHandler}
                            >
                                <i className="icofont-ui-close"></i>
                            </li>
                        </ul>

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
                    </section>
                </menu>
            )}
        </>
    );
};

export default HomeMenu;
