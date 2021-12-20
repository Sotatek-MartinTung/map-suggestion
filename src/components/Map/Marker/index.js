import React from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const MapMarker = () => (
  <span className={styles.wrapper}>
    <FontAwesomeIcon icon={faMapMarkerAlt} />
  </span>
);

export default MapMarker;
