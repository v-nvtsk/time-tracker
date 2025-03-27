import {
  createAsyncThunk, createSlice
} from "@reduxjs/toolkit";
import {
  resourceApi,
  ResourceSuccessResponse,
  ResourceUpdateRequest,
} from "../../../api";

export const getResources = createAsyncThunk('resources/getResources', async (_, {rejectWithValue}) => {
  const result = await resourceApi.findAll();

  if (!result.status){
    rejectWithValue('Не удалось получить ресурсы');
  }

  return result.data;
});

export const deleteResource = createAsyncThunk('resources/deleteResource', async (id: number, {rejectWithValue}) => {
  const result = await resourceApi.deleteResource({id});

  if (!result.status){
    rejectWithValue('Не удалось удалить ресурс');
  }

  return result.data;
});

export const updateResource = createAsyncThunk< ResourceSuccessResponse, ResourceUpdateRequest, {rejectValue: string}>('resources/updateResource', async (resource: ResourceUpdateRequest, {rejectWithValue}) => {
  const result = await resourceApi.updateResource(resource);

  if (!result.status){
    rejectWithValue('Не удалось обновить ресурс');
  }

  return result.data;
});

export interface ResourcesState{
  isLoading: boolean;
  isInitialized: boolean;
  hasError: boolean;
  isUpdating: boolean;
  errorMessage: string;
  items: ResourceSuccessResponse[]
}

const initialState:ResourcesState = {
  isLoading: false,
  isInitialized: false,
  hasError: false,
  isUpdating: false,
  errorMessage: '',
  items: []
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getResources.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(getResources.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;
      state.items = action.payload;
    })
    .addCase(getResources.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })
    .addCase(updateResource.pending, (state) => {
      state.isUpdating = true;
      state.hasError = false;
    })
    .addCase(updateResource.fulfilled, (state, action) => {
      state.isUpdating = false;

      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.id);

      if (updatedItemIndex){
        state.items[updatedItemIndex] = action.payload;
      }
    })
    .addCase(updateResource.rejected, (state, action) => {
      state.isUpdating = false;
      state.hasError = true;
      state.errorMessage = action.payload!;
    })
});