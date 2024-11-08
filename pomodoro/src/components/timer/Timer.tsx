import "./timer.css";

type Props = {
    remainingTime: string;
    className?: string;
};

const Timer = ({ className, remainingTime }: Props) => {
    return (
        <section className={`${className || ""}`}>
            <div className="timer">{remainingTime}</div>
        </section>
    );
};

export default Timer;
