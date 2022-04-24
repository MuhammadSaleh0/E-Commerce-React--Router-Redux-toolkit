import './ModalOverley.css';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const Backdrop = () => {
    const closeModal = () => {
        // dispatch(cartActions.showCart());
    };

    return <div className="backdrop" onClick={closeModal} />;
};

const Modal = () => {
    const Item = useSelector((state) => state.productSlice.productItem);
    const navigate = useNavigate();
    const navigateToCart = () => {
        navigate('/cart');
    };

    return (
        <>
            <Backdrop />
            <div className="modal_item" open>
                {/* <p>{Item.name || ""}</p> */}
                <div className="img">
                    <img src={Item.img_url} alt="item" />
                </div>
                <small>${Item.netPrice}</small>
                <div className="go_to_cart" onClick={navigateToCart}>
                    View Cart
                </div>
            </div>
        </>
    );
};

export default Modal;
