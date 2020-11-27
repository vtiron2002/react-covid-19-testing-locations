import React from "react";
import { useAppState } from "../store/Context";
import { randomId, truncate } from "../utils";

const LocationInfoBox = () => {
  const [{ locationInfo, mapContext }, dispatch] = useAppState();

  const viewOnMap = (e) => {
    const toValues = (what) => Object.values(what).map((v) => v.toFixed(4));
    if (
      toValues(mapContext.getCenter())[0] === toValues(locationInfo.position)[0]
    )
      return;
    mapContext.flyTo(locationInfo.position, 16);
  };

  const close = () => dispatch({ type: "CLOSE_LOCATION_INFO" });

  return (
    <div className={`LocationInfoBox ${locationInfo ? "active" : ""}`}>
      <h3>
        {locationInfo?.title} <span onClick={close}>&times;</span>
      </h3>
      <p>{locationInfo?.address.label}</p>
      {locationInfo?.contacts.map((c, i) => (
        <ul key={randomId()}>
          {Object.entries(c).map(([key, value], j) => {
            if (key === "www")
              return value.map((v) => (
                <li key={randomId()}>
                  <a href={v.value} target="_blank">
                    {truncate(
                      v.value,
                      Math.max(
                        document.documentElement.clientWidth || 0,
                        window.innerWidth || 0,
                      ) / 18,
                    )}
                  </a>
                </li>
              ));
            return value.map((v) => <li key={randomId()}>{v.value}</li>);
          })}
        </ul>
      ))}

      <button onClick={viewOnMap}>View on Map</button>
    </div>
  );
};

export default LocationInfoBox;
