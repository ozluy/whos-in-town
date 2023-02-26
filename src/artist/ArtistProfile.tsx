import { Avatar, Card, Skeleton } from "antd";
import { Artist } from "./types";
import styles from "./styles/ArtistProfile.module.css";

const { Meta } = Card;

type ArtistProfileProps = {
  loading: boolean;
  artist: Artist | "" | undefined;
};

const ArtistProfile = ({ loading, artist }: ArtistProfileProps) => (
  <div className={styles.Profile_Wrapper}>
    <Skeleton loading={loading || artist === ""} avatar active>
      {artist && (
        <Meta
          avatar={<Avatar size="large" src={artist.thumb_url} />}
          title={artist.name}
        />
      )}
    </Skeleton>
  </div>
);

export default ArtistProfile;
