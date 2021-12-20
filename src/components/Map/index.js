import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import MapMarker from "./Marker";

const { REACT_APP_GOOGLE_API_KEY } = process.env;

const Map = ({ venues, lat, lng }) => (
  <GoogleMapReact
    bootstrapURLKeys={{ key: REACT_APP_GOOGLE_API_KEY }}
    center={{ lat, lng }}
    defaultZoom={20}
  >
    {venues.map((venue) => (
      <MapMarker
        key={venue?.id}
        lat={venue?.location?.lat}
        lng={venue?.location?.lng}
      />
    ))}
  </GoogleMapReact>
);

export default React.memo(Map);

Map.propTypes = {
  venues: PropTypes.array,
  lat: PropTypes.number,
  lng: PropTypes.number,
};
