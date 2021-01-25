import { combineReducers } from '@reduxjs/toolkit'
import { reducer as homeReducer } from './home-reducer'
import { createAdminReducers } from './admin-reducer'
import { reducer as ratingReducer } from './rating-reducer'
const reducer = (name) => createAdminReducers(name).reducer

export const rootReducer = combineReducers({
  home: homeReducer,
  rating: ratingReducer,
  customers: reducer('customers'),
  services: reducer('services'),
  masters: reducer('masters'),
  cities: reducer('cities'),
  orders: reducer('orders'),
})
