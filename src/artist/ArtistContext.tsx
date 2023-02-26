import { createContext } from "react";
import { Event, Artist } from "./types";

type ArtistResponse = { events: Event[]; artist: Artist };

type ContextValue = {
  events: Event[];
  artist: Artist | null;
  favoriteEvents: Event[];
  loading: boolean;
  showFavorites: boolean;
  setLoading?: (val: boolean) => void;
  setFavoriteEvent?: (val: Event[]) => void;
  setShowFavorites?: (val: boolean) => void;
  setResponse?: (val: ArtistResponse | null) => void;
  response?: ArtistResponse | null;
};

export const ArtistContext = createContext<ContextValue>({
  events: [],
  artist: null,
  favoriteEvents: [],
  loading: false,
  showFavorites: false,
});
