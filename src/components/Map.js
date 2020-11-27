import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAppState } from "../store/Context";
import "leaflet/dist/leaflet.css";
import LocationInfoBox from "./LocationInfoBox";
import MyLocationMarker from "./MyLocationMarker";
import TestingLocationMarker from "./TestingLocationMarker";
import MapEvents from "./MapEvents";
import SearchBox from "./SearchBox";

const Map = () => {
  const [
    { mapCenter, mapZoom, locations, myLocation },
    dispatch,
  ] = useAppState();
  const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerAttribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <MapContainer minZoom={4} center={mapCenter} zoom={mapZoom}>
      <TileLayer attribution={tileLayerAttribution} url={tileLayerUrl} />
      <MapEvents />


      {myLocation && <MyLocationMarker />}

      {locations.map((l, i) => (
        <TestingLocationMarker key={i} l={l} />
      ))}

    </MapContainer>
  );
};

export default Map;
