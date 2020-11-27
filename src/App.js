import React, { useEffect } from "react";
import Loading from "./components/Loading";
import LocationInfoBox from "./components/LocationInfoBox";
import Map from "./components/Map";
import SearchBox from "./components/SearchBox";
import { useAppState } from "./store/Context";

const App = () => {
  const [{ loading, locationInfo }, dispatch] = useAppState();

  useEffect(() => {}, []);

  return (
    <>
      {loading && <Loading />}
      <SearchBox />
      <Map />
      <LocationInfoBox />
    </>
  );
};

export default App;
