import { useContext } from "react";
import {
    BackgroundGradientType,
    BackgroundTypes,
} from "../../types/backgrounds";
import "./backgroundPicker.css";
import HomeBackGroundContext from "../../contexts/HomeBackgroundContext";

const gradientColors: Array<BackgroundGradientType> = [
    {
        type: "gradient",
        className: "home__background-blue-purple",
    },
    {
        type: "gradient",
        className: "home__background-turquoise-flow",
    },
    {
        type: "gradient",
        className: "home__background-vine",
    },
    {
        type: "gradient",
        className: "home__background-river",
    },
    {
        type: "gradient",
        className: "home__background-purple-bliss",
    },
    {
        type: "gradient",
        className: "home__background-servQuick",
    },
    {
        type: "gradient",
        className: "home__background-behongo",
    },
    {
        type: "gradient",
        className: "home__background-red-mist",
    },
    {
        type: "gradient",
        className: "home__background-deep-space",
    },
    {
        type: "gradient",
        className: "home__background-starfall",
    },
];

const BackgroundPicker = () => {
    const { setBackground } = useContext(HomeBackGroundContext);

    return (
        <section className="backgroundPicker">
            <label className="backgroundPicker__title">Colors</label>
            <ul className="backgroundPicker__list">
                {gradientColors.map((gradientColor) => (
                    <li
                        onClick={() => setBackground(gradientColor)}
                        key={gradientColor.className}
                        className={`backgroundPicker__item ${gradientColor.className}`}
                    ></li>
                ))}
            </ul>
        </section>
    );
};

export default BackgroundPicker;
