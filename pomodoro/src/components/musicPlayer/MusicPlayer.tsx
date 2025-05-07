import { useState } from "react";
import Carousel from "../carousel/CarouselIndex";
import MusicAlbumCard, { MusicSources } from "../musicAlbumCard/MusicAlbumCard";
import "./musicPlayer.css";

type Props = {
    className?: string;
};

const albums: Array<{
    title: string;
    image: string;
    source: MusicSources;
    link: string;
}> = [
    {
        title: "Unreal Engine Playlist",
        image: "https://i.scdn.co/image/ab6761610000101fc9e097800c03fd3fb38c05bc",
        source: "spotify",
        link: "https://open.spotify.com/embed/artist/5n0h7PGhxq6dC4LCWTEcMA?utm_source=generator&theme=0",
    },
    {
        title: "Test",
        image: "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da843af3ae28da6da6a9dd9bb658",
        source: "spotify",
        link: "https://open.spotify.com/embed/playlist/78YRowPpgNrQurjR2Wx4um?utm_source=generator",
    },
];

const MusicPlayer = ({ className }: Props) => {
    const [playlistLink, setPlaylistLink] = useState(albums[0].link);

    const onClickMusicCard = (source: MusicSources, link: string) => {
        if (source === "spotify") {
            setPlaylistLink(link);
        }
    };

    return (
        <section className={`musicPlayer ${className ?? ""}`}>
            <Carousel className="musicPlayer__carousel" itemSizeInPixels={250}>
                {albums.map((album) => (
                    <Carousel.Item>
                        <MusicAlbumCard
                            onClick={onClickMusicCard}
                            title={album.title}
                            image={album.image}
                            source={album.source}
                            link={album.link}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <iframe
                className="musicPlayer__player"
                title="spotify"
                src={playlistLink}
                allow="autoplay;
      clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </section>
    );
};

export default MusicPlayer;
