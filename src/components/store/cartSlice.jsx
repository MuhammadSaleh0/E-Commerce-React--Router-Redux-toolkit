import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItems(state, action) {
            const newItem = action.payload;
            state.changed = true;
            state.totalQuantity++;
            const exsitingItem = state.items.find((x) => x.id === newItem.id);
            if (!exsitingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    netPrice: newItem.netPrice,
                    quantity: 1,
                    totalPrice: newItem.netPrice,
                    title: newItem.title,
                    image: newItem.image,
                });
            } else {
                exsitingItem.quantity++;
                exsitingItem.totalPrice =
                    exsitingItem.totalPrice + action.payload.netPrice;
            }
        },

        removeItem(state, action) {
            const id = action.payload;
            state.changed = true;
            const exsitingItem = state.items.find((x) => x.id === id);
            state.totalQuantity--;
            if (exsitingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                exsitingItem.quantity--;
                exsitingItem.totalPrice =
                    exsitingItem.totalPrice - exsitingItem.netPrice;
            }
        },

        deleteProduct(state, action) {
            const id = action.payload;
            state.changed = true;
            const exsitingItem = state.items.find((x) => x.id === id);
            state.items = state.items.filter((item) => item.id !== id);
            state.totalQuantity = state.totalQuantity - exsitingItem.quantity;
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
        },
    },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
