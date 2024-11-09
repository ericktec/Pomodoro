import { Dispatch, PropsWithChildren, SetStateAction } from "react";

type Props = {
    onCloseMenuHandler: () => void;
    setTabSelected: Dispatch<SetStateAction<any>>;
} & PropsWithChildren;

const SettingsHeader = ({ children, onCloseMenuHandler }: Props) => {
    return (
        <ul className="menu__header-list">
            {children}
            <li className="menu__header-close" onClick={onCloseMenuHandler}>
                <i className="icofont-ui-close"></i>
            </li>
        </ul>
    );
};

export default SettingsHeader;
