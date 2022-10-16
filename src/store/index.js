import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from './clients/clientsSlice'
import clientReducer from './client/clientSlice'
export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    client: clientReducer
  }
})
