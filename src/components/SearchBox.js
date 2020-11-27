import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { getAutoCompleteTerms } from "../API";
import { useAppState } from "../store/Context";
import { randomId } from "../utils";

const SearchBox = () => {
  const [{ searchQuery, mapContext }, dispatch] = useAppState();
  const [autoComplete, setAutoComplete] = useState([]);

  const handleChange = (e) => {
    dispatch({ type: "ON_CHANGE", payload: { value: e.target.value } });
    getAutoCompleteTerms(searchQuery).then(({ features }) =>
      setAutoComplete(features),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    getAutoCompleteTerms(searchQuery).then(({ features }) => {
      mapContext.flyTo(features[0].geometry.coordinates.reverse(), 10);
      setAutoComplete([]);
    });
  };

  const handleClick = (w) => {
    const coords = w.geometry.coordinates.reverse();
    mapContext.flyTo(coords, 10);
    setAutoComplete([]);
  };

  return (
    <form onSubmit={handleSubmit} className="searchBox">
      <input
        type="text"
        placeholder="Enter a location to search for Covid-19 Testing Sites"
        onChange={handleChange}
        value={searchQuery}
      />

      {autoComplete.map((w) => (
        <div key={randomId()} onClick={() => handleClick(w)}>
          {w.properties.name}, {w.properties.state}
        </div>
      ))}
    </form>
  );
};

export default SearchBox;
