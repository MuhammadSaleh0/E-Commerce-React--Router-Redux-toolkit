import './CartButton.css';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import cart_bottom from '../../Icons/cart.svg';

const CartButton = () => {
    const cart = useSelector((state) => state.cart);
    let totalQuantity = cart.totalQuantity ? cart.totalQuantity : 0;

    const darkmood = useSelector((state) => state.boolean.isDark);

    return (
        <Link to="/cart" className="cart">
            <div className="cart-image">
                <span>{totalQuantity}</span>
                <img
                    className={darkmood ? 'white_cart' : ''}
                    src={cart_bottom}
                    alt="cart"
                />
            </div>
        </Link>
    );
};

export default CartButton;
