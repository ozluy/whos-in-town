import { Card, Alert, Typography } from "antd";
import React, { useState } from "react";

import ArtistEvents from "./ArtistEvents";
import ArtistForm from "./ArtistForm";
import ArtistProfile from "./ArtistProfile";

const Artist: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  return (
    <>
      <ArtistForm
        setLoading={setLoading}
        setResponse={setResponse}
        loading={loading}
      />
      {response && (
        <Card>
          <ArtistProfile artist={response?.artist} loading={loading} />
          <Typography.Title
            level={5}
            style={{ marginTop: 24, marginBottom: 12 }}
          >
            Upcoming Events ( {response?.artist?.upcoming_event_count})
          </Typography.Title>
          <ArtistEvents
            events={response?.events}
            loading={loading}
            errorMessage={response?.events?.errorMessage}
          />
        </Card>
      )}
    </>
  );
};

export default Artist;
