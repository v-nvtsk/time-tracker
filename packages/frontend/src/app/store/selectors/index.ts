import {createSelector} from "@reduxjs/toolkit";
import {AppRootState} from "..";

export const selectAuth = (state:AppRootState) => state.auth;
export const selectCategories = createSelector(
  (state) => state,
  (state:AppRootState) => state.categories);
export const selectActivities = createSelector(
  (state) => state,
  (state:AppRootState) => state.activities);

export const selectResources = createSelector(
  (state) => state,
  (state:AppRootState) => state.resources);