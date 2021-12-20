/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import mainApi from "./api";
import { isArray } from "lodash";
import { Button, Col, Container, Form, Input, Row, Spinner } from "reactstrap";
import Nodata from "./components/Nodata";
import Map from "./components/Map";
import Venues from "./components/Venues";

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

function App() {
  const initState = {
    query: "",
    lat: 21.020834217027996,
    lng: 105.79101014000946,
    radius: 1000,
    v: 20182507,
    venues: [],
    isLoading: false,
    activeId: "",
  };

  const [state, setState] = useState(initState);

  const { query, lat, lng, radius, v, venues, isLoading, activeId } = state;

  const callApi = async () => {
    try {
      setState({
        ...state,
        isLoading: true,
      });
      const ll = lat + "," + lng;
      const params = {
        query: query.trim(),
        ll,
        radius,
        v,
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_CLIENT_SECRET,
      };
      const res = await mainApi.get("search", {
        params,
      });
      const venues = res?.data?.response.venues;
      if (isArray(venues)) {
        setState({
          ...state,
          venues,
          isLoading: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        venues: [],
        isLoading: false,
      });
    }
  };

  const onClickVenue = (venue) => () => {
    const lat = venue?.location?.lat;
    const lng = venue?.location?.lng;
    setState({
      ...state,
      activeId: venue?.id,
      lat,
      lng,
    });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      query: value,
    });
  };

  const onSearch = (e) => {
    e.preventDefault();
    callApi();
  };

  const renderVenues = useMemo(() => {
    return (
      (isLoading && (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <Spinner />
        </div>
      )) ||
      (venues.length > 0 ? (
        <Venues venues={venues} activeId={activeId} onClick={onClickVenue} />
      ) : (
        <Nodata />
      ))
    );
  }, [isLoading, activeId]);

  useEffect(() => {
    callApi();
  }, []);

  return (
    <Container className="py-4 d-flex flex-column h-100v">
      <Form className="mb-5" onSubmit={onSearch}>
        <Row>
          <Col md={10}>
            <Input value={query} onChange={onChange} />
          </Col>
          <Col md={2}>
            <Button
              color="primary"
              type="submit"
              className="w-100"
              disabled={isLoading}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="flex-grow-1 overflow-hidden">
        <Col md={6} className="h-100 overflow-scroll-y">
          {renderVenues}
        </Col>
        <Col md={6}>
          <div className="w-100 h-100">
            <Map venues={venues} lat={lat} lng={lng} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
