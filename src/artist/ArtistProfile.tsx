import { Avatar, Card, Skeleton } from "antd";
import { Artist } from "./types";

const { Meta } = Card;

type ArtistProfileProps = {
  loading: boolean;
  artist: Artist | "";
};

const ArtistProfile = ({ loading, artist }: ArtistProfileProps) => (
  <Skeleton loading={loading || artist === ""} avatar active>
    {artist && (
      <Meta
        avatar={<Avatar size="large" src={artist.thumb_url} />}
        title={artist.name}
      />
    )}
  </Skeleton>
);

export default ArtistProfile;
