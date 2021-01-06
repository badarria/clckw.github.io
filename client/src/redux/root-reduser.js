import { combineReducers } from "@reduxjs/toolkit";
import { reducer as homeReducer } from "./home-reducer";
import { createTableReducers } from "./table-reducers";
import { reducer as ratingReducer } from "./rating-reducer";
const reducer = (name) => createTableReducers(name).reducer;

export const rootReducer = combineReducers({
  home: homeReducer,
  rating: ratingReducer,
  customers: reducer("customers"),
  services: reducer("services"),
  masters: reducer("masters"),
  cities: reducer("cities"),
  orders: reducer("orders"),
});
