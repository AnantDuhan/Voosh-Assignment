import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const orderReducer = createReducer(initialState, {
    createOrderRequest: (state) => {
        state.loading = true;
    },
    createOrderSuccess: (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
    },
    createOrderFailure: (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});

export const myOrdersReducer = createReducer(initialState, {
    myOrdersRequest: (state) => {
        state.loading = true;
    },
    myOrdersSuccess: (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
    },
    myOrdersFailure: (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});