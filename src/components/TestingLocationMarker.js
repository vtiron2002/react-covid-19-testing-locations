import React from "react";
import { Marker, useMap } from "react-leaflet";
import { useAppState } from "../store/Context";
import * as M from "leaflet";

const TestingLocationMarker = ({ l }) => {
  const [{ locationInfo }, dispatch] = useAppState();
  const map = useMap();

  const icon = M.icon({
    iconUrl: "https://www.freeiconspng.com/thumbs/pin-png/pin-png-28.png",
    iconSize: [35, "auto"],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -56],
  });

  const handleMarkerClick = () => {
    if (locationInfo) {
      if (l === locationInfo)
        return dispatch({
          type: "ON_MARKER_CLICK",
          payload: { location: null },
        });
      map.flyTo(Object.values(l.position), 16);
      dispatch({ type: "ON_MARKER_CLICK", payload: { location: l } });
    } else {
      map.flyTo(Object.values(l.position), 16);
      dispatch({ type: "ON_MARKER_CLICK", payload: { location: l } });
    }
  };

  return (
    <Marker
      riseOnHover
      icon={icon}
      position={[l.position.lat, l.position.lng]}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    ></Marker>
  );
};

export default TestingLocationMarker;
