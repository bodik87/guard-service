import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientsService from "../services/clientsService";

export const getClient = createAsyncThunk('GET_CLIENT', async (id, thunkAPI) => {
  try {
    return await clientsService.getClient(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

export const createClient = createAsyncThunk('CREATE_CLIENT', async (clientData, thunkAPI) => {
  try {
    return await clientsService.createClient(clientData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: null,
    isError: false,
    isLoading: false,
    message: '',
    errors: null
  },
  reducers: { // экшн для обнудения ошибок
    resetClientErrors: (state) => {
      state.errors = null;
    },
    resetClientPage: (state) => {
      state.client = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.client = action.payload;
      })
      .addCase(getClient.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.client = null;
      })
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
        state.errors = null; // обнуляем ошибки перед отправкой запроса
      })
      .addCase(createClient.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errors = action.payload;
      })
  }
});

export const { resetClientErrors, resetClientPage } = clientSlice.actions;
export default clientSlice.reducer;