import { createSlice } from '@reduxjs/toolkit';

const booleanStates = createSlice({
    name: 'boolean',
    initialState: {
        isDark: false,
        modalCart: false,
        isForm_Vaild: false,
        isPaymentFormVaild: false,
        isPaymentFormShown: true,
        isDoneModal: false,
        isFavorite: false,
    },
    reducers: {
        setDarkMood(state) {
            state.isDark = !state.isDark;
        },
        showModal(state) {
            state.modalCart = !state.modalCart;
        },
        setFormVaild(state) {
            state.isForm_Vaild = !state.isForm_Vaild;
        },
        setPaymentsFormVaild(state) {
            state.isPaymentFormVaild = !state.isPaymentFormVaild;
        },
        showPaymentForm(state) {
            state.isPaymentFormShown = !state.isPaymentFormShown;
        },
        showDoneModal(state) {
            state.isDoneModal = !state.isDoneModal;
        },
        setFavorite(state) {
            state.isFavorite = true;
        },
    },
});

export const booleanActions = booleanStates.actions;

export default booleanStates;
