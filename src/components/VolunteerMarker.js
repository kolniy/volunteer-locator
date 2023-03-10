import React from "react";
import { Marker } from "@react-google-maps/api";

const VolunteerMarker = ({ foundLocation }) => {
  const { geometry, name } = foundLocation;
  const { location } = geometry;

  return <Marker position={location} title={name} />;
};

export default VolunteerMarker;
