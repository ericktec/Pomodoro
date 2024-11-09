import { useRef, useState } from "react";
import "./homeMenu.css";
import TimerSettings from "../timerSettings/TimerSettings";

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
                <TimerSettings
                    className={menuClass}
                    onCloseMenuHandler={onCloseMenuHandler}
                />
            )}
        </>
    );
};

export default HomeMenu;
