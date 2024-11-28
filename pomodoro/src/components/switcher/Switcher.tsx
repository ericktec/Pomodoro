import { InputHTMLAttributes } from "react";
import "./switcher.css";

type Props = {
    label: string;
    checked: boolean;
    id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const SwitcherInput = ({ label, value, checked, id, ...props }: Props) => {
    return (
        <label aria-label={label}>
            <input
                id={id}
                {...props}
                type="checkbox"
                className="switcher-input"
                checked={checked}
            ></input>
            <div className="switcher"></div>
        </label>
    );
};

export default SwitcherInput;
