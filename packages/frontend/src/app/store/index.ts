import {
  combineSlices, configureStore
} from "@reduxjs/toolkit";
import {
  activitiesSlice, authSlice, categoriesSlice
} from "./slices";
import {resourcesSlice} from "./slices/resources-slice";

const rootReducer = combineSlices(authSlice, categoriesSlice, activitiesSlice, resourcesSlice);

export const store = configureStore(
  {reducer: rootReducer}
);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;