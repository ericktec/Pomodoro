import {
    useState,
    useImperativeHandle,
    forwardRef,
    Ref,
    Children,
    PropsWithChildren,
} from "react";
import "./drawer.css";

type Props = {
    title: string;
} & PropsWithChildren;

export type DrawerHandle = {
    getIsOpen: () => boolean;
    open: () => void;
    close: () => void;
} | null;

const Drawer = forwardRef(
    ({ title, children }: Props, ref: Ref<DrawerHandle>) => {
        const [isOpen, setIsOpen] = useState(false);

        useImperativeHandle(ref, () => ({
            getIsOpen: () => {
                return isOpen;
            },
            close: () => {
                setIsOpen(false);
            },
            open: () => {
                setIsOpen(true);
            },
        }));

        return (
            <div className="drawer">
                <div className="drawer__title">
                    <h2>{title}</h2>
                    <span className="icofont-ui-close"></span>
                </div>

                <div className="drawer__content">{children}</div>
            </div>
        );
    }
);

export default Drawer;
