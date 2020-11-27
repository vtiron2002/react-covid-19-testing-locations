import React from "react";
import { useAppState } from "../store/Context";
import * as M from "leaflet";
import { Marker } from "react-leaflet";

const MyLocationMarker = () => {
  const [{ myLocation }, dispatch] = useAppState();

  const icon = M.icon({
    iconUrl:
      "https://www.pngjoy.com/pngm/101/2112015_marker-circle-map-marker-circle-png-png-download.png",
    iconSize: [45, "auto"],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -56],
  });

  return <Marker riseOnHover icon={icon} position={myLocation}></Marker>;
};

export default MyLocationMarker;
