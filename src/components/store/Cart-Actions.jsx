import { cartActions } from './cartSlice';

export const GetData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://baradox-a4d03-default-rtdb.firebaseio.com/cart.json'
            );
            if (!response.ok) {
                throw new Error('failed to pring Data Cart');
            }
            const data = await response.json();
            return data;
        };
        try {
            const CartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: CartData.items || [],
                    totalQuantity: CartData.totalQuantity,
                })
            );
        } catch (error) {
            console.log(error);
        }
    };
};

export const SentDataCart = (cart) => {
    return async (dispatch) => {
        const sentRequest = async () => {
            const response = await fetch(
                'https://baradox-a4d03-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('failed to pring Data Cart');
            }
        };
        try {
            await sentRequest();
        } catch (error) {
            console.log(error);
        }
    };
};
