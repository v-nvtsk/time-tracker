import {
  createAsyncThunk, createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  activityApi, ActivitySuccessResponse,
  ActivityUpdateRequest,
  ActivityUpdateSuccessResponse,
  FindActivitiesPeriodEnum
} from "@/api";

export const getActivities = createAsyncThunk('activities/getActivities', async (params?: {
  period?: FindActivitiesPeriodEnum;
  startDate?: string;
  endDate?: string;
}) => {
  const response = await activityApi.findActivities(params?.period, params?.startDate, params?.endDate);

  return response.data;
});

export const updateActivity = createAsyncThunk<ActivityUpdateSuccessResponse, ActivityUpdateRequest, {rejectValue: string}>('activities/updateActivity',
  async (activity, {rejectWithValue}) => {
    const result = await activityApi.updateActivity(activity);

    if (!result.status){
      rejectWithValue("Не удалось обновить данные активности");
    }

    return result.data;
  });

export interface ActivitiesState {
  isLoading: boolean;
  isUpdating: boolean
  hasError: boolean;
  errorMessage: string
  activities: ActivitySuccessResponse[]
}

const initialState:ActivitiesState = {
  isLoading: false,
  isUpdating: false,
  hasError: false,
  errorMessage: '',
  activities: []
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getActivities.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(getActivities.fulfilled, (state, action:PayloadAction<ActivitySuccessResponse[]>) => {
      state.isLoading = false;
      state.activities = action.payload;
    })
    .addCase(getActivities.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.activities = [];
    })
    .addCase(updateActivity.pending, (state) => {
      state.isUpdating = true;
      state.hasError = false;
    })
    .addCase(updateActivity.fulfilled, (state, action) => {
      state.isUpdating = false;

      const updatedItemIndex = state.activities.findIndex((item) => item.id === action.payload.id);

      if (updatedItemIndex){
        state.activities[updatedItemIndex] = action.payload;
      }

    })
    .addCase(updateActivity.rejected, (state, action) => {
      state.isUpdating = false;
      state.hasError = true;
      state.errorMessage = action.payload!;
    })
});
