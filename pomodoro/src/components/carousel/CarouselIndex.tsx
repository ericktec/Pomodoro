import CarouselContainer from "./carouselContainer/CarouselContainer";
import CarouselItem from "./carouselItem/CarouselItem";

const Carousel = Object.assign(CarouselContainer, {
    Item: CarouselItem,
});

export default Carousel;
