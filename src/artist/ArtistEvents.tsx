import React, { useContext, useMemo } from "react";
import { List, Alert, Skeleton, Tooltip, Typography } from "antd";
import { StarTwoTone } from "@ant-design/icons";
import styles from "./styles/ArtistEvents.module.css";
import { Event } from "./types";
import { ArtistContext } from "./ArtistContext";

type ArtistEventsProps = {
  events: Event[];
  errorMessage?: string;
};

const ArtistEvents = ({ events = [], errorMessage }: ArtistEventsProps) => {
  const {
    favoriteEvents,
    setFavoriteEvent,
    loading,
    showFavorites,
  } = useContext(ArtistContext);

  const eventsToShow = showFavorites ? favoriteEvents : events;

  const favoriteEventIds: string[] = useMemo(() => {
    return favoriteEvents.map((eventItem) => eventItem.id);
  }, [favoriteEvents]);

  const handleAddFavorites = (eventItem: Event) => {
    const indexOfEventId: number = favoriteEventIds.indexOf(eventItem.id);
    if (indexOfEventId !== -1) {
      const newFavorites = [...favoriteEvents];
      newFavorites.splice(indexOfEventId, 1);
      setFavoriteEvent?.(newFavorites);
    } else {
      const newFavorites = [...favoriteEvents, ...[eventItem]];
      setFavoriteEvent?.(newFavorites);
    }
  };

  return (
    <>
      <div className={styles.Events_Header}>
        <Typography.Title level={5} style={{ margin: 0, paddingBottom: 0 }}>
          {showFavorites ? "Favorite" : "Upcoming"} Events
          {eventsToShow.length > 0 ? ` (${eventsToShow.length})` : ""}
        </Typography.Title>
     
      </div>
      {errorMessage ? (
        <Alert message={errorMessage} type="error" />
      ) : (
        <List
          className={styles.Artist_Events}
          itemLayout="horizontal"
          dataSource={eventsToShow}
          renderItem={(item, index) => {
            const isInFavorites = favoriteEventIds.includes(item.id);
            return (
              <List.Item
                key={item.id}
                actions={[
                  <Tooltip
                    title={`${
                      isInFavorites ? "Remove from " : "Add to"
                    } favorites`}
                  >
                    <StarTwoTone
                      role={`add-to-favorites-${index}`}
                      onClick={() => handleAddFavorites(item)}
                      style={{ fontSize: 20 }}
                      twoToneColor={isInFavorites ? "#52c41a" : "#cccccc"}
                    />
                  </Tooltip>,
                ]}
              >
                <Skeleton loading={loading} active>
                  <List.Item.Meta
                    title={
                      <a className={styles.Artist_Event_Title} href={item.url}>
                        {`${item.venue.name}, ${item.venue.city}, ${item.venue.region}, ${item.venue.country}`}
                      </a>
                    }
                    description={
                      <div>
                        {item.lineup.map((line) => (
                          <React.Fragment key={line}>{line}</React.Fragment>
                        ))}
                        {`, `}
                        {new Date(item.datetime).toDateString()}
                        {`, `}
                        {item.offers.length &&
                          item.offers.map((offer) => (
                            <a
                              href={offer.url}
                              key={offer.url}
                            >{`${offer.type}: ${offer.status}`}</a>
                          ))}
                      </div>
                    }
                  />
                </Skeleton>
              </List.Item>
            );
          }}
        />
      )}
    </>
  );
};

export default ArtistEvents;
