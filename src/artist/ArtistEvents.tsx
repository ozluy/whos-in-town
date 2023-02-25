import { List, Alert, Skeleton } from "antd";
import styles from "./styles/ArtistEvents.module.css";
import { Event } from "./types";

type ArtistEventsProps = {
  events: Event[];
  loading: boolean;
  errorMessage?: string;
};

const ArtistEvents = ({ events, errorMessage, loading }: ArtistEventsProps) =>
  errorMessage ? (
    <Alert message={errorMessage} type="error" />
  ) : (
    <List
      className={styles.Artist_Events}
      itemLayout="vertical"
      dataSource={events}
      renderItem={(item) => (
        <List.Item>
          <Skeleton loading={loading} active>
            <List.Item.Meta
              title={
                <a className={styles.Artist_Event_Title} href={item.url}>
                  {`${item.venue.name}, ${item.venue.city}, ${item.venue.region}, ${item.venue.country}`}
                </a>
              }
              description={
                <div>
                  {item.lineup.map((line) => line)}
                  {`, `}
                  {new Date(item.datetime).toDateString()}
                  {`, `}
                  {item.offers.length &&
                    item.offers.map((offer) => (
                      <a href={offer.url}>{`${offer.type}: ${offer.status}`}</a>
                    ))}
                </div>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );

export default ArtistEvents;
