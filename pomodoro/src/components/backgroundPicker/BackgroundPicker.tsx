import { useContext } from "react";
import {
    BackgroundGradientType,
    BackgroundImage,
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

const backgroundImages: Array<BackgroundImage> = [
    {
        type: "image",
        path: "backgroundImages/kurumi.png",
    },
    {
        type: "image",
        path: "backgroundImages/820043.jpg",
    },
    {
        type: "image",
        path: "backgroundImages/1311951.jpg",
    },
    {
        type: "image",
        path: "backgroundImages/1329621.png",
    },
    {
        type: "image",
        path: "backgroundImages/1333846.png",
    },
    {
        type: "image",
        path: "backgroundImages/1340472.png",
    },
    {
        type: "image",
        path: "backgroundImages/1344443.png",
    },
    {
        type: "image",
        path: "backgroundImages/1345040.png",
    },
    {
        type: "image",
        path: "backgroundImages/1354206.png",
    },
    {
        type: "image",
        path: "backgroundImages/1354394.png",
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

            <label className="backgroundPicker__title">Images</label>
            <ul className="backgroundPicker__list">
                {backgroundImages.map((backgroundImage) => (
                    <li
                        className="backgroundPicker__item"
                        onClick={() => setBackground(backgroundImage)}
                    >
                        <img
                            loading="lazy"
                            src={backgroundImage.path}
                            alt="background"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BackgroundPicker;
