import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import booleanStates from './booleanStates';
import productSlice from './productSclice';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        boolean: booleanStates.reducer,
        productSlice: productSlice.reducer,
    },
});

export default store;
