import "./DoneModal.css"
import Successful_purchase from "../../../Icons/illustrations/Successful-purchase.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { booleanActions } from "../../../store/booleanStates";
import { cartActions } from "../../../store/cartSlice";



const DoneModal = () => {

    const dispatch = useDispatch()

    const Navigate = useNavigate();
    const GoToProductsHandler = () => {
        Navigate("/products");
        dispatch(booleanActions.setFormVaild())
        dispatch(booleanActions.setPaymentsFormVaild())
        dispatch(booleanActions.showPaymentForm())
        dispatch(booleanActions.showDoneModal())
        dispatch(cartActions.clearCart());

    }






    return <div className="DoneModal">

        <div className="modal_content">


            <div className="Successful-purchase">
                <img src={Successful_purchase} alt="cover" />
            </div>

            <div className="Congratulations">
                <h4>Congratulations,</h4>
                <p>Your Order is Going to arrive Soon</p>
            </div>

            <div className="go_shopping">
                <div className="Products_page" onClick={GoToProductsHandler}>
                    go to shopping
                </div>
            </div>

        </div>
    </div>
}

export default DoneModal;