import { HTMLProps, PropsWithChildren } from "react";

type Props = HTMLProps<HTMLDivElement> & PropsWithChildren;

const Tooltip = ({ children, ...props }: Props) => {
    return (
        <div {...props} className="tooltip">
            {children}
        </div>
    );
};

export default Tooltip;
