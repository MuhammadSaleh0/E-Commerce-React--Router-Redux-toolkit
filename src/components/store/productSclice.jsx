import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        productItem: {},
        searchValue: '',
        favoriteProducts: [],
        allData: [],
    },
    reducers: {
        getProductItem: (state, action) => {
            const newItem = action.payload;
            state.productItem = newItem;
        },

        inputSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        GetAllData(state, action) {
            state.allData = action.payload;
        },
        favoriteList(state, action) {
            const favItem = action.payload;
            const exsitingItem = state.favoriteProducts.find(
                (e) => e.id === favItem.id
            );
            if (!exsitingItem) {
                state.favoriteProducts = [...state.favoriteProducts, favItem];
                localStorage.setItem(
                    'favArr',
                    JSON.stringify(state.favoriteProducts)
                );
            } else {
                return;
            }
        },
        updatedFavorieProducts(state, action) {
            state.favoriteProducts = action.payload;
        },
    },
});

export const ProductActions = productSlice.actions;

export default productSlice;
