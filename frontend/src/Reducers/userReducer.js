import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const userReducer = createReducer(initialState, {
    LoginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
    },

    RegisterRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
    },

    LogoutUserRequest: (state) => {
        state.loading = true;
    },
    LogoutUserSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    },
    LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },

    LoadUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
    },
    
    clearErrors: (state) => {
        state.error = null;
    },
});