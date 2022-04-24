import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import delete_icon from '../../Icons/delete.svg';

const CartItem = (props) => {
    const { id, title, quantity, totalPrice, price, image, netPrice } =
        props.item;

    const dispatch = useDispatch();

    const addItem = () => {
        dispatch(
            cartActions.addItems({
                id,
                title,
                quantity,
                price,
                image,
                netPrice,
            })
        );
    };
    const removeItem = () => {
        dispatch(cartActions.removeItem(id));
    };

    const deleteProductHandler = (id) => {
        dispatch(cartActions.deleteProduct(id));
    };

    let Total_P;
    totalPrice ? (Total_P = totalPrice.toFixed(2)) : (Total_P = '');

    return (
        <>
            <div className="cart_content">
                <div className="image">
                    <img src={image} alt="item" />
                </div>

                <div className="item_data">
                    <div className="title_price">
                        <h4>{title}</h4>
                        <div className="product_price">
                            <span className="gross">
                                {price !== netPrice ? price : ''}
                            </span>
                            ${netPrice}
                        </div>
                    </div>

                    <div className="buttons">
                        <div className="remove_item" onClick={removeItem}>
                            -
                        </div>
                        <div className="quantity">{quantity}</div>
                        <div className="add_item" onClick={addItem}>
                            +
                        </div>
                    </div>

                    <div className="Total_price">Total : {Total_P}</div>

                    <div
                        className="delete"
                        onClick={deleteProductHandler.bind(null, id)}
                    >
                        <img src={delete_icon} alt="delete" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;
