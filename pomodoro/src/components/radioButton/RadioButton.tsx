import "./radioButton.css";

import { HTMLProps } from "react";

type Props = { id: string } & HTMLProps<HTMLInputElement>;

const RadioButton = ({ id, className, ...props }: Props) => {
    return (
        <>
            <input
                {...props}
                id={id}
                type="radio"
                className={`radioButtonInput ${className || ""}`}
            ></input>
            <label htmlFor={id} className="radioButton"></label>
        </>
    );
};

export default RadioButton;
