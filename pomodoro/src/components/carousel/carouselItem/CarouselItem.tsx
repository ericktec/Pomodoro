import { PropsWithChildren } from "react";
import "./carouselItem.css";

type Props = {} & PropsWithChildren;

const CarouselItem = ({ children }: Props) => {
    return <div className="carouselItem">{children}</div>;
};

export default CarouselItem;
