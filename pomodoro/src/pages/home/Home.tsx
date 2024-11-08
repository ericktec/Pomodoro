import { useContext, useEffect, useState } from "react";
import PomodoroCounters from "../../components/pomodoroCounters/PomodoroCounters";
import Timer from "../../components/timer/Timer";
import TimerControllers from "../../components/timerControllers/TimerControllers";
import "./home.css";
import { TimerContext } from "../../contexts/TimerContext";
import { BackgroundTypes } from "../../types/backgrounds";
import HomeMenu from "../../components/homeMenu/HomeMenu";

const Home = () => {
    const { remainingTimeFormatted } = useContext(TimerContext);
    const [background, setBackground] = useState<BackgroundTypes>(() => {
        const backgroundStoreInLocalStorage =
            localStorage.getItem("background");
        if (backgroundStoreInLocalStorage) {
            return JSON.parse(backgroundStoreInLocalStorage);
        }

        return {
            type: "gradient",
            className: "home__background-blue-purple",
            // type: "image",
            // path: "background.png",
        };
    });

    return (
        <div
            className={`home 
                ${background.type === "image" ? "home__overlay" : ""}
                ${background.type === "gradient" ? background.className : ""}
                `}
        >
            {background.type === "image" && (
                <img
                    className="home__background"
                    src={background.path}
                    alt="background"
                />
            )}
            <div className="home__header">
                <p className="home__username">{"Erick"}</p>
                <PomodoroCounters />
                <HomeMenu />
            </div>
            <Timer
                className="home__timer"
                remainingTime={remainingTimeFormatted}
            />
            <p className="home__mantra">This is a mantra</p>
            <TimerControllers className="home__timer-controllers" />
        </div>
    );
};

export default Home;
