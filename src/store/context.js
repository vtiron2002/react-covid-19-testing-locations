import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const reducer = (state, action) => {
  console.log(action.type);
  const set = (data) => ({ ...state, ...data });
  switch (action.type) {
    case "SET_MAP_CONTEXT":
      return set({ mapContext: action.payload.map });
    case "ON_MAP_MOVE":
      return set({ locations: action.payload.locations, loading: false });
    case "START_FETCH":
      return set({ loading: true });
    case "ON_MARKER_CLICK":
      return set({ locationInfo: action.payload.location });
    case "CLOSE_LOCATION_INFO":
      return set({ locationInfo: null });
    case "SET_MY_LOCATION":
      return set({ myLocation: action.payload.location, loading: false });
    case "ON_CHANGE":
      return set({ searchQuery: action.payload.value });
    default:
      return state;
  }
};

const initialState = {
  mapCenter: [37.6, -95.665],
  mapZoom: 4,
  locations: [],
  loading: false,
  locationInfo: null,
  myLocation: null,
  searchQuery: "",
  mapContext: null,
};

const ContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);

export default ContextProvider;
