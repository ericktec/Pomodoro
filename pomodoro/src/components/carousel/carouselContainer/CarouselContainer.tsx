import "./carouselContainer.css";
import {
    Children,
    ComponentProps,
    PropsWithChildren,
    useRef,
    useState,
} from "react";

type Props = {
    itemSizeInPixels: number;
} & ComponentProps<"div"> &
    PropsWithChildren;

const CarouselContainer = ({
    children,
    className,
    itemSizeInPixels = 250,
    ...props
}: Props) => {
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const overflowContainerRef = useRef<HTMLDivElement>(null);
    const [carouselPage, setCarouselPage] = useState(0);
    const lastItemRef = useRef<HTMLDivElement>(null);

    const childrenArray = Children.toArray(children);

    const numberOfItemsPerPage = overflowContainerRef.current
        ? Math.floor(
              overflowContainerRef.current?.getBoundingClientRect().width /
                  itemSizeInPixels
          )
        : 0;

    const onNextItemHandler = () => {
        setCarouselPage((prevValue) => {
            return prevValue + 1;
        });
    };

    const hasNextItem =
        itemSizeInPixels * numberOfItemsPerPage +
            itemSizeInPixels * carouselPage <
        (cardsContainerRef.current?.getBoundingClientRect().width ?? 0);
    const hasPrevItem = carouselPage > 0;

    console.log(
        itemSizeInPixels * numberOfItemsPerPage +
            itemSizeInPixels * carouselPage
    );

    console.log(cardsContainerRef.current?.getBoundingClientRect().width ?? 0);

    const onPrevItemHandler = () => {
        setCarouselPage((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    };

    console.log(carouselPage);
    return (
        <div className={`carouselContainer ${className ?? ""}`} {...props}>
            <div
                className={` carousel__controller-left ${
                    hasPrevItem
                        ? "carousel__controller"
                        : "carousel__controller-hidden"
                }`}
                onClick={hasPrevItem ? onPrevItemHandler : undefined}
            >
                {hasPrevItem && "<"}
            </div>

            <div
                className="carouselContainer__overflow"
                ref={overflowContainerRef}
            >
                <div
                    className="carouselContainer__children"
                    style={{
                        transform: `translate(${
                            -1 * itemSizeInPixels * carouselPage
                        }px)`,
                    }}
                    ref={cardsContainerRef}
                >
                    {childrenArray.map((child, i) => (
                        <div
                            className="child__container"
                            style={{ width: `${itemSizeInPixels}px` }}
                            key={i}
                            ref={
                                i === childrenArray.length - 1
                                    ? lastItemRef
                                    : null
                            }
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={` carousel__controller-right ${
                    hasNextItem
                        ? "carousel__controller"
                        : "carousel__controller-hidden"
                }`}
                onClick={hasNextItem ? onNextItemHandler : undefined}
            >
                {hasNextItem && ">"}
            </div>
        </div>
    );
};

export default CarouselContainer;
