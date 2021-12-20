import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import classnames from "classnames";
import styles from "./style.module.scss";

const Venues = ({ venues, activeId, onClick }) =>
  venues.map((venue) => (
    <Card
      className={classnames(styles.card, "mb-4 cursor-pointer", {
        "bg-info": activeId === venue?.id,
      })}
      key={venue?.id}
      onClick={onClick(venue)}
    >
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          {venue?.name}
        </CardTitle>
        <CardText className="mb-2">
          Address: {venue?.location?.address || "N/A"}
        </CardText>
        <CardText className="mb-0">
          Distance (m2): {venue?.location?.distance || "N/A"}
        </CardText>
      </CardBody>
    </Card>
  ));

export default React.memo(Venues);

Venues.propTypes = {
  venues: PropTypes.array,
  activeId: PropTypes.string,
  onClick: PropTypes.func,
};
