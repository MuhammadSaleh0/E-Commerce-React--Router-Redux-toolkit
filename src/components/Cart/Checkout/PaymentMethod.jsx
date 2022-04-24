import './Checkout.css';
import mastercard from '../../Icons/mastercard.svg';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { booleanActions } from '../../store/booleanStates';
import DoneModal from './DoneModal/DoneModal';

const isEmpty = (value) => value.trim() === '';
const isCorrectChars = (value) => value.length === 14;
const isFiveChars = (value) => value.length === 3;
const PaymentMethod = () => {
    const [isFormValid, setFormValidity] = useState({
        cardNumber: true,
        owner: true,
        explanition: true,
        cvv: true,
    });

    const dark = useSelector((state) => state.boolean.isDark);
    const dispatch = useDispatch();

    const CardNumberRef = useRef();
    const ownerRef = useRef();
    const ExplanRef = useRef();
    const CvvRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enterdNumber = CardNumberRef.current.value;
        const enterdOwner = ownerRef.current.value;
        const enterdExplain = ExplanRef.current.value;
        const enterdCvv = CvvRef.current.value;

        const enterdNumberIsVaild = isCorrectChars(enterdNumber);
        const enterdOwnerIsVaild = !isEmpty(enterdOwner);
        const enterdExplainIsVaild = !isEmpty(enterdExplain);
        const enterdCvvIsVaild = isFiveChars(enterdCvv);

        setFormValidity({
            cardNumber: enterdNumberIsVaild,
            owner: enterdOwnerIsVaild,
            explanition: enterdExplainIsVaild,
            cvv: enterdCvvIsVaild,
        });

        const formValidity =
            enterdNumberIsVaild &&
            enterdOwnerIsVaild &&
            enterdExplainIsVaild &&
            enterdCvvIsVaild;

        if (!formValidity) {
            return;
        }
        dispatch(booleanActions.setPaymentsFormVaild());
        dispatch(booleanActions.showDoneModal());
        dispatch(booleanActions.showPaymentForm());
    };

    const cardNumberClass = `control ${isFormValid.cardNumber ? '' : 'invalid'}`;
    const explanClass = `control ${isFormValid.explanition ? '' : 'invalid'}`;
    const ownerClass = `control ${isFormValid.owner ? '' : 'invalid'}`;
    const cvvClass = `control ${isFormValid.cvv ? '' : 'invalid'}`;

    const completedHandler = () => {
        dispatch(booleanActions.setPaymentsFormVaild());
        showDoneModal2();
    };

    const showDoneModal2 = () => {
        dispatch(booleanActions.showDoneModal());
    };

    const showDoneModal = () => {
        if (!isPaymentFormVaild) {
            return;
        }
        dispatch(booleanActions.showDoneModal());
    };

    const cashSelectionHandler = (event) => {
        dispatch(booleanActions.showPaymentForm());
    };

    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const showForm = useSelector((state) => state.boolean.isPaymentFormShown);
    const isDoneModalShown = useSelector((state) => state.boolean.isDoneModal);
    const isPaymentFormVaild = useSelector(
        (state) => state.boolean.isPaymentFormVaild
    );

    return (
        <>
            {!isDoneModalShown && (
                <div className="PaymentMethod">
                    <div className={`${dark ? ' methods methods_dark' : 'methods'}`}>
                        <div className="choices">
                            <div className="cash">
                                <input
                                    type="radio"
                                    id="cash"
                                    name="payment"
                                    value="cash"
                                    onChange={cashSelectionHandler}
                                />
                                <label htmlFor="cash">Cash on delivery</label>
                            </div>

                            <div className="master">
                                <input
                                    type="radio"
                                    id="master"
                                    name="payment"
                                    value="Master Card"
                                    defaultChecked
                                    onChange={cashSelectionHandler}
                                />
                                <label htmlFor="master">Master Card</label>
                            </div>
                        </div>

                        <div className="master_card">
                            <img src={mastercard} alt="master_card" />
                        </div>
                    </div>
                </div>
            )}

            {showForm && !isDoneModalShown && (
                <form
                    className={`${dark ? ' form form_dark' : 'form'}`}
                    style={{ marginTop: '13rem' }}
                    onSubmit={confirmHandler}
                >
                    <div className="full_width ">
                        <div className={cardNumberClass}>
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" ref={CardNumberRef} />
                            {!isFormValid.cardNumber && <p>Enter Vaild 14 numbers</p>}
                        </div>

                        <div className={ownerClass}>
                            <label htmlFor="owner">Owner</label>
                            <input type="text" id="owner" ref={ownerRef} />
                            {!isFormValid.owner && <p>Enter Vaild Name</p>}
                        </div>
                    </div>

                    <div className="half_width ">
                        <div className={explanClass}>
                            <label htmlFor="Explanition">Explanition</label>
                            <input type="text" id="Explanition" ref={ExplanRef} />
                            {!isFormValid.explanition && <p>enter vaild text</p>}
                        </div>

                        <div className={cvvClass}>
                            <label htmlFor="cvv">Cvv</label>
                            <input type="text" id="cvv" ref={CvvRef} />
                            {!isFormValid.cvv && <p>Enter Vaild 3 numbers</p>}
                        </div>
                    </div>

                    <div className="action">
                        <button
                            type="submit"
                            onClick={showDoneModal}
                            className={`${dark ? 'dark' : ''}`}
                            style={{ margin: '1rem 0 0' }}
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}

            {!showForm && !isDoneModalShown && (
                <div className="cash_delivry">
                    <div className="text">
                        <h5>
                            Your Products are {totalQuantity} Items ,<br />
                            "Shipping Free"
                            <br />
                            Thank You for Your Trust.
                        </h5>

                        <div className="action">
                            <button
                                onClick={completedHandler}
                                className={`${dark ? 'dark' : ''}`}
                                style={{ margin: '2.5rem 0 0' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDoneModalShown && <DoneModal />}
        </>
    );
};

export default PaymentMethod;
