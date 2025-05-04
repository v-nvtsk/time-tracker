import {
  categoryApi,
  CategoryCreateRequest,
  CategoryCreateSuccessResponse,
  CategorySuccessResponse,
  CategoryUpdateRequest,
  CategoryUpdateSuccessResponse,
} from "@api";
import {
  createAsyncThunk, createSlice,
} from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk<CategorySuccessResponse[], void, {rejectValue: string}>('categories/getCategories',
  async (_, {rejectWithValue}) => {
    const result = await categoryApi.findCategories();

    if (!result.status){
      rejectWithValue('Не удалось получить категории');
    }

    return result.data;
  });

export const createCategory = createAsyncThunk<CategoryCreateSuccessResponse, CategoryCreateRequest, {rejectValue: string}>('categories/createCategory',
  async (payload, {rejectWithValue}) => {
    const result = await categoryApi.createCategory(payload);

    if (!result.status){
      rejectWithValue('Не удалось создать категорию');
    }

    return result.data;
  });

export const updateCategory = createAsyncThunk<
  CategoryUpdateSuccessResponse,
  CategoryUpdateRequest,
  {rejectValue: string}>
('categories/updateCategory', async (payload, {rejectWithValue}) => {
  const result = await categoryApi.updateCategory(payload);

  if (!result.status){
    rejectWithValue('Не удалось обновить категорию');
  }

  return result.data;
});

export const initDefaultCategories = createAsyncThunk<CategorySuccessResponse[], void, {rejectValue: string}>
('categories/initDefaultCategories', async (_, {rejectWithValue}) => {
  const result = await categoryApi.initDefault();

  if (!result.status){
    rejectWithValue('Не удалось создать категории');
  }

  return result.data;
});

export interface CategoriesState {
  isLoading: boolean;
  isUpdating: boolean;
  hasError: boolean;
  errorMessage: string,
  categories: CategorySuccessResponse[];
}

const initialState:CategoriesState = {
  isLoading: false,
  isUpdating: false,
  hasError: false,
  errorMessage: '',
  categories: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;

      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload!;
        state.categories = [];
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = [
          ...state.categories,
          action.payload
        ];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload!;
        state.categories = [];
      })
      .addCase(updateCategory.pending, (state) => {
        state.isUpdating = true;
        state.hasError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedItemIndex = state.categories.findIndex((item) => item.id === action.payload.id);

        if (updatedItemIndex){
          state.categories[updatedItemIndex] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isUpdating = false;
        state.hasError = true;
        state.errorMessage = action.payload!;
      })
      .addCase(initDefaultCategories.pending, (state) => {
        state.isUpdating = true;
        state.hasError = false;
      })
      .addCase(initDefaultCategories.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.categories = action.payload;
      })
      .addCase(initDefaultCategories.rejected, (state, action) => {
        state.isUpdating = false;
        state.hasError = true;
        state.errorMessage = action.payload!;
      });

  }
});