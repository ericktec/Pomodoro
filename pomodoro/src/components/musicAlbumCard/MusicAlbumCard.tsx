import "./musicAlbumCard.css";

export type MusicSources = "native" | "spotify";

type Props = {
    title: string;
    image: string;
    source: MusicSources;
    link: string;
    onClick?: (source: MusicSources, link: string) => void;
};

const MusicAlbumCard = ({ title, image, source, link, onClick }: Props) => {
    return (
        <div
            className="musicAlbumCard"
            onClick={onClick ? () => onClick(source, link) : undefined}
        >
            <img
                className="musicAlbumCard__image"
                src={image}
                alt="AlbumImage"
            />
            <p className="musicAlbumCard__title">{title}</p>
        </div>
    );
};

export default MusicAlbumCard;
