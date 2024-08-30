import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import { apiSlice } from "./api";
const store= configureStore({
    reducer: {
        auth: authReducer,
        api:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store