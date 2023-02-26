import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArtistEvents from "./ArtistEvents";
import { ArtistContext } from "./ArtistContext";
import ArtistForm from "./ArtistForm";
import SearchArtist from "./";

test("renders Search title", () => {
  const errorMessage = "The artist was not found";
  render(<ArtistEvents errorMessage={errorMessage} events={[]} />);
  const linkElement = screen.getByText(/The artist was not found/i);
  expect(linkElement).toBeInTheDocument();
});

test("shows favorite events", () => {
  const dummyEvents = [
    {
      id: "1027410231",
      url: "https://www.bandsintown.com/e/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-06T18:45:00",

      venue: {
        name: "Passeio Maritimo de Alges",
        latitude: "38.71667",
        longitude: "-9.13333",
        city: "Lisbon",
        country: "Portugal",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2023-02-04T10:00:00",
    },
    {
      id: "1026839195",
      url: "https://www.bandsintown.com/e/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-10T16:00:00",
      venue: {
        name: "Etihad Stadium",
        latitude: "53.48313810000001",
        longitude: "-2.2003952999999683",
        city: "Manchester",
        country: "United Kingdom",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2022-12-02T12:00:00",
    },
  ];
  render(
    <ArtistContext.Provider
      value={{
        events: dummyEvents,
        showFavorites: true,
        artist: {
          id: 12312,
          name: "Test",
          url: "mock",
          image_url: "mock",
          thumb_url: "mock",
          facebook_page_url: "mock",
          mbid: "mock",
          tracker_count: 12123,
          upcoming_event_count: 123,
        },
        favoriteEvents: dummyEvents,
        loading: false,
      }}
    >
      <ArtistEvents events={dummyEvents} />
    </ArtistContext.Provider>
  );

  const favoriteEventsTitle = screen.getByText(/Favorite events/i);
  expect(favoriteEventsTitle).toBeInTheDocument();
});

test("add to favorite events", () => {
  const dummyEvents = [
    {
      id: "1027410231",
      url: "https://www.bandsintown.com/e/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-06T18:45:00",

      venue: {
        name: "Passeio Maritimo de Alges",
        latitude: "38.71667",
        longitude: "-9.13333",
        city: "Lisbon",
        country: "Portugal",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2023-02-04T10:00:00",
    },
    {
      id: "1026839195",
      url: "https://www.bandsintown.com/e/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-10T16:00:00",
      venue: {
        name: "Etihad Stadium",
        latitude: "53.48313810000001",
        longitude: "-2.2003952999999683",
        city: "Manchester",
        country: "United Kingdom",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2022-12-02T12:00:00",
    },
  ];

  render(
    <ArtistContext.Provider
      value={{
        events: dummyEvents,
        showFavorites: false,
        artist: {
          id: 12312,
          name: "Test",
          url: "mock",
          image_url: "mock",
          thumb_url: "mock",
          facebook_page_url: "mock",
          mbid: "mock",
          tracker_count: 12123,
          upcoming_event_count: 123,
        },
        favoriteEvents: [
          {
            id: "1027410231",
            url: "https://www.bandsintown.com/e/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
            datetime: "2023-06-06T18:45:00",

            venue: {
              name: "Passeio Maritimo de Alges",
              latitude: "38.71667",
              longitude: "-9.13333",
              city: "Lisbon",
              country: "Portugal",
              region: "",
            },
            lineup: ["The Weeknd"],
            offers: [
              {
                type: "Tickets",
                url: "https://www.bandsintown.com/t/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
                status: "available",
              },
            ],
            artist_id: "1371750",
            on_sale_datetime: "2023-02-04T10:00:00",
          },
        ],
        loading: false,
      }}
    >
      <ArtistEvents events={dummyEvents} />
    </ArtistContext.Provider>
  );
  const addToFavoritesIcon = screen.getByRole("add-to-favorites-0");
  const addToFavoritesIcon2 = screen.getByRole("add-to-favorites-1");
  fireEvent.click(addToFavoritesIcon);
  fireEvent.click(addToFavoritesIcon2);
});

test("simulate form submit", () => {
  render(<ArtistForm />);
  const artistForm = screen.getByRole("artist-form");
  const searchInput = screen.getByRole("search-input");
  // eslint-disable-next-line testing-library/no-node-access
  const searchButton = screen.getByText("Search").closest("button") as Element;
  fireEvent.change(searchInput, { target: { value: "new value" } });
  fireEvent.click(searchButton);
  fireEvent.submit(artistForm);
  fireEvent.change(searchInput, { target: { value: "" } });
  fireEvent.click(searchButton);
  render(
    <ArtistContext.Provider
      value={{
        events: [],
        showFavorites: false,
        artist: {
          id: 12312,
          name: "Test",
          url: "mock",
          image_url: "mock",
          thumb_url: "mock",
          facebook_page_url: "mock",
          mbid: "mock",
          tracker_count: 12123,
          upcoming_event_count: 123,
        },
        favoriteEvents: [
          {
            id: "1027410231",
            url: "https://www.bandsintown.com/e/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
            datetime: "2023-06-06T18:45:00",

            venue: {
              name: "Passeio Maritimo de Alges",
              latitude: "38.71667",
              longitude: "-9.13333",
              city: "Lisbon",
              country: "Portugal",
              region: "",
            },
            lineup: ["The Weeknd"],
            offers: [
              {
                type: "Tickets",
                url: "https://www.bandsintown.com/t/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
                status: "available",
              },
            ],
            artist_id: "1371750",
            on_sale_datetime: "2023-02-04T10:00:00",
          },
        ],
        loading: false,
      }}
    >
      <ArtistForm />
    </ArtistContext.Provider>
  );
  const showAllFavsButton = screen.getByRole("show-all-favorites");
  fireEvent.click(showAllFavsButton);
});

test("simulate click", () => {
  const dummyEvents = [
    {
      id: "1027410231",
      url: "https://www.bandsintown.com/e/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-06T18:45:00",

      venue: {
        name: "Passeio Maritimo de Alges",
        latitude: "38.71667",
        longitude: "-9.13333",
        city: "Lisbon",
        country: "Portugal",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1027410231?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2023-02-04T10:00:00",
    },
    {
      id: "1026839195",
      url: "https://www.bandsintown.com/e/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event",
      datetime: "2023-06-10T16:00:00",
      venue: {
        name: "Etihad Stadium",
        latitude: "53.48313810000001",
        longitude: "-2.2003952999999683",
        city: "Manchester",
        country: "United Kingdom",
        region: "",
      },
      lineup: ["The Weeknd"],
      offers: [
        {
          type: "Tickets",
          url: "https://www.bandsintown.com/t/1026839195?app_id=123&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
          status: "available",
        },
      ],
      artist_id: "1371750",
      on_sale_datetime: "2022-12-02T12:00:00",
    },
  ];

  localStorage.setItem("savedFavorites", JSON.stringify(dummyEvents));
  render(<SearchArtist />);
  const showAllFavsButton = screen.getByRole("show-all-favorites");
  fireEvent.click(showAllFavsButton);

  const addToFavoritesIcon = screen.getByRole("add-to-favorites-0");
  fireEvent.click(addToFavoritesIcon);
});
