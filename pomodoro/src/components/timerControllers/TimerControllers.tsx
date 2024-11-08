import "./timerController.css";
import { HTMLProps, useContext } from "react";
import {
    TimerContext,
    TimerControllersContext,
} from "../../contexts/TimerContext";

type Props = {} & HTMLProps<HTMLDivElement>;
const TimerControllers = ({ ...props }: Props) => {
    const { startTimer, stopTimer } = useContext(TimerControllersContext);
    const { isTimerRunning } = useContext(TimerContext);
    return (
        <div {...props}>
            <button className="timerController__btn timerController__btn-secondary">
                <i className="timerController__btn-img icofont-music"></i>
            </button>
            {!isTimerRunning ? (
                <button
                    className="timerController__btn timerController__btn-primary"
                    onClick={startTimer}
                >
                    Start
                </button>
            ) : (
                <button
                    className="timerController__btn timerController__btn-primary"
                    onClick={stopTimer}
                >
                    Stop
                </button>
            )}
            <button className="timerController__btn timerController__btn-secondary">
                Todo list
            </button>
        </div>
    );
};

export default TimerControllers;
