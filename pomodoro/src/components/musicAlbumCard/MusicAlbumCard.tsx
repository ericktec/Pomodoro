import "./musicAlbumCard.css";

type Props = {
    title: string;
    image: string;
    source: "native" | "spotify";
    albumLink?: string;
};

const MusicAlbumCard = ({ title, image, source, albumLink }: Props) => {
    return (
        <div className="musicAlbumCard">
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
