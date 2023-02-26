import { Card } from "antd";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import ArtistEvents from "./ArtistEvents";
import ArtistForm from "./ArtistForm";
import ArtistProfile from "./ArtistProfile";
import { ArtistContext } from "./ArtistContext";
import { Event } from "./types";

const SearchArtist = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [savedFavorites, setSavedFavorites] = useLocalStorage<Event[]>(
    "savedFavorites",
    []
  );
  const [favorites, setFavorites] = useState<Event[]>(savedFavorites);

  return (
    <ArtistContext.Provider
      value={{
        events: response?.events,
        artist: response?.artist,
        favoriteEvents: favorites,
        showFavorites,
        response,
        setLoading,
        setShowFavorites,
        setFavoriteEvent: (events) => {
          setSavedFavorites(events);
          setFavorites(events);
        },
        setResponse,
        loading,
      }}
    >
      <ArtistForm />
      <Card>
        {!showFavorites && (
          <ArtistProfile artist={response?.artist} loading={loading} />
        )}
        <ArtistEvents
          events={response?.events}
          errorMessage={response?.events?.errorMessage}
        />
      </Card>
    </ArtistContext.Provider>
  );
};

export default SearchArtist;
