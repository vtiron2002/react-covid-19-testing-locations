import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { fetchLocations } from "../API";
import { useAppState } from "../store/Context";

const MapEvents = () => {
  const [state, dispatch] = useAppState();

  const getAndSetLocations = async () => {
    if (map.getZoom() < 9) return;
    dispatch({ type: "START_FETCH" });
    const coords = Object.values(map.getCenter());
    const data = await fetchLocations({ coords });
    dispatch({
      type: "ON_MAP_MOVE",
      payload: {
        locations: [...data.items, ...state.locations].slice(0, 100),
      },
    });
  };

  const map = useMapEvents({
    moveend: getAndSetLocations,
  });

  
  useEffect(() => {
    dispatch({ type: "SET_MAP_CONTEXT", payload: { map } });
    getAndSetLocations();
    
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      dispatch({ type: "START_FETCH" });
      map.flyTo([coords.latitude, coords.longitude], 12);
      dispatch({
        type: "SET_MY_LOCATION",
        payload: { location: [coords.latitude, coords.longitude] },
      });
    });
  }, []);
  
  return null;
};

export default MapEvents;
