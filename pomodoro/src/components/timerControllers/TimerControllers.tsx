import { HTMLProps, useContext } from "react";
import { TimerControllersContext } from "../../contexts/TimerContext";

type Props = {} & HTMLProps<HTMLDivElement>;
const TimerControllers = ({ ...props }: Props) => {
    const { startTimer, setWorkingTime } = useContext(TimerControllersContext);
    return (
        <div {...props}>
            <button className="timerController__btn">Music</button>
            <button className="timerController__btn" onClick={startTimer}>
                Start
            </button>
            <button className="timerController__btn">Todo list</button>
        </div>
    );
};

export default TimerControllers;
