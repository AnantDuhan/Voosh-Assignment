import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './Reducers/userReducer';
import { myOrdersReducer, orderReducer } from './Reducers/orderReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        myOrder: myOrdersReducer,
    },
});

export default store;