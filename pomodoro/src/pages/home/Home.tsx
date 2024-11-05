import { useContext, useEffect } from "react";
import PomodoroCounters from "../../components/pomodoroCounters/PomodoroCounters";
import Timer from "../../components/timer/Timer";
import TimerControllers from "../../components/timerControllers/TimerControllers";
import "./home.css";
import { TimerContext } from "../../contexts/TimerContext";

const Home = () => {
    const { remainingTimeFormatted } = useContext(TimerContext);
    return (
        <div className="home home__overlay">
            <img
                className="home__background"
                src="background.png"
                alt="background"
            />
            <div className="home__header">
                <span></span>
                <PomodoroCounters />
                <span></span>
            </div>
            <Timer
                className="home__timer"
                remainingTime={remainingTimeFormatted}
            />
            <TimerControllers className="home__timer-controllers" />
        </div>
    );
};

export default Home;
