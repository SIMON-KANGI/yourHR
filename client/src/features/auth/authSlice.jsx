import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunk for fetching credentials
export const fetchCredentials = createAsyncThunk(
  'auth/fetchCredentials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://yourhr-2des.onrender.com/auth/login', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data; // Return the data received from the API
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message if any
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
   token:'',
   refresh:'',
    user: null,
    status: 'idle', // Handling async request state
    error: null,    // Handling potential errors
  },
  reducers: {
    setCredentials(state, action) {
      const {user, token, refresh}= action.payload
      state.isAuthenticated = true;
      state.user = user;
      state.token=token;
      state.refresh=refresh;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCredentials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload; // Assuming the payload contains user information
      })
      .addCase(fetchCredentials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set the error message
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
