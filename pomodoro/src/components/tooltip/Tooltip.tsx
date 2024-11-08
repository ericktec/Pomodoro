import { HTMLProps, PropsWithChildren } from "react";
import "./tooltip.css";

type Props = HTMLProps<HTMLDivElement> & PropsWithChildren;

const Tooltip = ({ children, ...props }: Props) => {
    return (
        <div {...props} className="tooltip">
            <div className="tooltip__content">{children}</div>
        </div>
    );
};

export default Tooltip;
