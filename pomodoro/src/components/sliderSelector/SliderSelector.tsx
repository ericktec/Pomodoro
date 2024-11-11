import { HTMLProps } from "react";
import "./sliderSelector.css";

type Props = {
    min?: number;
    max?: number;
} & HTMLProps<HTMLInputElement>;

const SliderSelector = ({ type, className, ...props }: Props) => {
    return (
        <input
            className={`sliderSelector ${className || ""}`}
            type="range"
            {...props}
        ></input>
    );
};

export default SliderSelector;
