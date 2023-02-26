import { Form, Input, Card, Typography, Button } from "antd";
import { useContext } from "react";
import { StarOutlined } from "@ant-design/icons";
import { fetchArtist, fetchArtistEvents } from "./api";
import { ArtistContext } from "./ArtistContext";
import replaceChar from "./helper/replaceChar";
import styles from "./styles/ArtistForm.module.css";

const { Search } = Input;

const ArtistForm = () => {
  const [form] = Form.useForm();
  const { setLoading, setResponse, setShowFavorites, favoriteEvents } =
    useContext(ArtistContext);

  const onFinish = (values: { artistName: string }) => {
    const artistName = replaceChar(values.artistName);
    setLoading?.(true);
    setResponse?.(null);
    Promise.all([fetchArtist(artistName), fetchArtistEvents(artistName)]).then(
      (responses) => {
        setLoading?.(false);
        const [artist, events] = responses;
        artist?.name && form.setFieldValue("artistName", "");
        setResponse?.({
          events,
          artist,
        });
      }
    );
  };

  return (
    <Card
      className={styles.Artist_Form}
      title={<Typography.Title>Who's in town?</Typography.Title>}
    >
      <Form
        name="artist-form"
        role="artist-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="artistName"
          rules={[{ required: true, message: "Please input artist name!" }]}
          required
        >
          <Search
            placeholder="Search for artist e.g Maroon 5"
            allowClear
            enterButton="Search"
            size="large"
            role="search-input"
            onSearch={(val) => {
              if (!val) {
                form.validateFields(["artistName"]);
              } else {
                onFinish({ artistName: val });
              }
            }}
          />
        </Form.Item>
      </Form>
      {favoriteEvents.length > 0 && (
        <Button
          role="show-all-favorites"
          onClick={() => {
            setShowFavorites?.(true);
            setResponse?.(null);
          }}
          icon={<StarOutlined />}
        >
          Show all favorites ({favoriteEvents.length})
        </Button>
      )}
    </Card>
  );
};

export default ArtistForm;
