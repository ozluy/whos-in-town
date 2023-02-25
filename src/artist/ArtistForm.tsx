import { Form, Input, Card } from "antd";
import { fetchArtist, fetchArtistEvents } from "./api";
import styles from "./styles/ArtistForm.module.css";
import { Artist } from "./types";

const { Search } = Input;

type ArtistFormProps = {
  setResponse: (responses: { events: Event[]; artist: Artist } | {}) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
};

const ArtistForm = ({ setResponse, setLoading, loading }: ArtistFormProps) => {
  // for / use %252F, for ? use %253F, for * use %252A, and for " use %27C
  const [form] = Form.useForm();

  const onFinish = (values: { artistName: string }) => {
    const { artistName } = values;
    setLoading(true);
    setResponse({});
    Promise.all([fetchArtist(artistName), fetchArtistEvents(artistName)]).then(
      (responses) => {
        setLoading(false);
        const [artist, events] = responses;
        setResponse({
          events,
          artist,
        });
      }
    );
  };

  // Can be one of the following values: "upcoming", "past", "all", or a date range e.g. "2015-05-05,2017-05-05".
  // If not specified, only upcoming shows are returned

  return (
    <Card className={styles.Artist_Form} title="Who's in town?">
      <Form
        name="artist-form"
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
    </Card>
  );
};

export default ArtistForm;
