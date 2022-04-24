import { useSelector } from 'react-redux';
import './CartData.css';
// import Modal from "../../Modal/ModalOverley";
// import dolar from "../../../assets/dolar.png"

import CartItem from './CarItem';
import { Link } from 'react-router-dom';
const CartData = () => {
    const cart = useSelector((state) => state.cart);
    const { totalQuantity } = cart;
    const items = cart.items;

    const dark = useSelector((state) => state.boolean.isDark);

    let CartProducts = (
        <div className="empty">
            Cart Is Empty
            <br />
            Let's Add Some Products.
        </div>
    );

    let totalAmount = 0;
    if (items && items.length > 0) {
        totalAmount = items.reduce((curNumber, item) => {
            return curNumber + item.totalPrice;
        }, 0);
    }
    if (items && items.length > 0) {
        CartProducts = (
            <div className="cart_products">
                {items.map((item) => {
                    return (
                        <CartItem
                            key={item.id}
                            item={{
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                netPrice: item.netPrice,
                                quantity: item.quantity,
                                totalPrice: item.totalPrice,
                                image: item.image,
                            }}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <div className="cart_data">
            <div className="container">
                <div className="cart_elements">
                    <h2>Cart Products</h2>
                    {CartProducts}
                </div>

                <div className="amount_quantity">
                    <h2>Cart Summery</h2>

                    <div className="total_quantity">
                        <div> Total Quantity: </div>
                        <div>{totalQuantity}</div>
                    </div>

                    <div className="total_amount">
                        <div>Total :</div>
                        <div className="money">
                            {' '}
                            {totalAmount.toFixed(2) ? totalAmount.toFixed(2) : ''}
                        </div>
                    </div>

                    {totalQuantity > 0 && (
                        <div className="check_out_btn">
                            <Link
                                to="/cart/checkout"
                                className={`ckeckOut_link ${dark ? 'dark' : ''}`}
                            >
                                Check Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartData;
