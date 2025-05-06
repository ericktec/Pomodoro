import "./carouselContainer.css";
import { ComponentProps, PropsWithChildren } from "react";

type Props = {} & ComponentProps<"div"> & PropsWithChildren;

const CarouselContainer = ({ children, className, ...props }: Props) => {
    return (
        <div className={`carouselContainer ${className ?? ""}`} {...props}>
            <div className="carousel__controller-left">{"<"}</div>
            <div className="carouselContainer__children">{children}</div>
            <div className="carousel__controller-right">{">"}</div>
        </div>
    );
};

export default CarouselContainer;
