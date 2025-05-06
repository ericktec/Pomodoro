import Carousel from "../carousel/CarouselIndex";
import MusicAlbumCard from "../musicAlbumCard/MusicAlbumCard";
import "./musicPlayer.css";

type Props = {
    className?: string;
};

const MusicPlayer = ({ className }: Props) => {
    return (
        <section className={`musicPlayer ${className ?? ""}`}>
            <Carousel className="musicPlayer__carousel">
                <Carousel.Item>
                    <MusicAlbumCard
                        title="Test"
                        image="https://picsum.photos/200"
                        source="spotify"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <MusicAlbumCard
                        title="Test"
                        image="https://picsum.photos/200"
                        source="spotify"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <MusicAlbumCard
                        title="Test"
                        image="https://picsum.photos/200"
                        source="spotify"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <MusicAlbumCard
                        title="Test"
                        image="https://picsum.photos/200"
                        source="spotify"
                    />
                </Carousel.Item>
            </Carousel>
            <iframe
                className="musicPlayer__player"
                title="spotify"
                src="https://open.spotify.com/embed/playlist/6phYndBIC4DIqefH1CcUsT?utm_source=generator&theme=0"
                allow="autoplay;
      clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </section>
    );
};

export default MusicPlayer;
