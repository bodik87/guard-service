import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientsService from "../services/clientsService";

export const getClients = createAsyncThunk('GET_CLIENTS', async (_, thunkAPI) => {
  try {
    return await clientsService.getClients();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: null,
    isError: false,
    isLoading: false,
    message: ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.clients = null;
      })
  }
});

export default clientsSlice.reducer;