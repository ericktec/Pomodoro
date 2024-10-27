import Timer from "../../components/timer/Timer";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <img
                className="home__background"
                src="background.png"
                alt="background"
            />
            {/* <Timer
                status="working"
                time={1500}
                className="home__timer"
                autoStart
            /> */}
            <Timer status="working" time={5} autoStart />
        </div>
    );
};

export default Home;
