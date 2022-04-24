import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.css';
import { booleanActions } from '../../store/booleanStates';
import checked from '../../Icons/checked.svg';
import PaymentMethod from './PaymentMethod';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.length > 3;

const Checkout = (props) => {
  const [isFormValid, setFormValidity] = useState({
    name: true,
    Lastname: true,
    email: true,
    adress: true,
    postal: true,
    city: true,
    country: true,
    phone: true,
  });
  const NameInputRef = useRef();
  const LastNameInputRef = useRef();
  const adressInputRef = useRef();
  const emailInputRef = useRef();
  const PostalInputRef = useRef();
  const CityInputRef = useRef();
  const CountryInputRef = useRef();
  const PhoneInputRef = useRef();

  const isDoneModalShown = useSelector((state) => state.boolean.isDoneModal);
  const PaymentFormVaild = useSelector(
    (state) => state.boolean.isPaymentFormVaild
  );
  const dark = useSelector((state) => state.boolean.isDark);
  const formVaild = useSelector((state) => state.boolean.isForm_Vaild);
  const dispatch = useDispatch();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterdName = NameInputRef.current.value;
    const enterdLastName = LastNameInputRef.current.value;
    const enterdemail = emailInputRef.current.value;
    const enterdAdress = adressInputRef.current.value;
    const enterdpostal = PostalInputRef.current.value;
    const enterdCity = CityInputRef.current.value;
    const enterdCountry = CountryInputRef.current.value;
    const enterdPhone = PhoneInputRef.current.value;

    const enterdNameIsVaild = !isEmpty(enterdName);
    const enterdLastNameIsVaild = !isEmpty(enterdLastName);
    const enterdEmailsVaild = !isEmpty(enterdemail);
    const enterdadressIsVaild = !isEmpty(enterdAdress);
    const enterdCityIsVaild = !isEmpty(enterdCity);
    const enterdCountryIsVaild = !isEmpty(enterdCountry);
    const enterdpostalIsVaild = isFiveChars(enterdpostal);
    const enterdPhoneIsVaild = isFiveChars(enterdPhone);

    setFormValidity({
      name: enterdNameIsVaild,
      Lastname: enterdLastNameIsVaild,
      email: enterdEmailsVaild,
      adress: enterdadressIsVaild,
      postal: enterdpostalIsVaild,
      city: enterdCityIsVaild,
      country: enterdCountryIsVaild,
      phone: enterdPhoneIsVaild,
    });

    const formValidity =
      enterdNameIsVaild &&
      enterdadressIsVaild &&
      enterdpostalIsVaild &&
      enterdCityIsVaild &&
      enterdCountryIsVaild &&
      enterdPhoneIsVaild &&
      enterdLastName &&
      enterdemail;

    if (!formValidity) {
      return;
    }
    dispatch(booleanActions.setFormVaild());
  };
  const nameClass = `control ${isFormValid.name ? '' : 'invalid'}`;
  const LastnameClass = `control ${isFormValid.Lastname ? '' : 'invalid'}`;
  const emailClass = `control ${isFormValid.email ? '' : 'invalid'}`;
  const adressClass = `control ${isFormValid.adress ? '' : 'invalid'}`;
  const postalClass = `control ${isFormValid.postal ? '' : 'invalid'}`;
  const cityClass = `control ${isFormValid.city ? '' : 'invalid'}`;
  const countryClass = `control ${isFormValid.country ? '' : 'invalid'}`;
  const phoneClass = `control ${isFormValid.phone ? '' : 'invalid'}`;

  let lineClass = ' line light_line';
  if (dark) {
    lineClass = 'line';
  }

  if (formVaild) {
    lineClass = 'line light_line green_line';
    if (dark) {
      lineClass = 'line green_line';
    }
  }
  const isPaymentFormShown = useSelector(
    (state) => state.boolean.isPaymentFormShown
  );
  return (
    <div className="check_out">
      <div className="bar">
        <div className="progress_bar">
          <div
            className={`${lineClass}  ${!isPaymentFormShown && formVaild ? 'completed' : ''
              }
          ${isPaymentFormShown && formVaild ? 'ConfirmPayment' : ''}
          ${isPaymentFormShown && PaymentFormVaild ? 'paymentDone' : ''} 
          ${isDoneModalShown ? 'done' : ''}`}
          >
            <div className="shipping">
              <div className="shipping_title">Shipping</div>
              <div className="one">
                {formVaild ? (
                  <img src={checked} alt="tick" />
                ) : (
                  <span>1</span>
                )}
              </div>
            </div>

            <div className="Pyment">
              <div className="pyment_title">Payment</div>
              <div className="two">
                {!isPaymentFormShown || PaymentFormVaild ? (
                  <img src={checked} alt="tick" />
                ) : (
                  <span>2</span>
                )}
              </div>
            </div>

            <div className="Done">
              <div className="Done_title">Done</div>
              <div className="three">
                {PaymentFormVaild ? (
                  <img src={checked} alt="tick" />
                ) : (
                  <span>3</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {formVaild && <PaymentMethod />}

      {!formVaild && (
        <div className="Forms">
          <form
            className={`${dark ? ' form form_dark' : 'form'}`}
            onSubmit={confirmHandler}
          >
            <div className="forms_grid  personal_info">
              <h3 className="info_text">Personal Information</h3>
              <div className="half_width names">
                <div className={nameClass}>
                  <label htmlFor="name">First Name</label>
                  <input type="text" id="name" ref={NameInputRef} />
                  {!isFormValid.name && <p>enter vaild name</p>}
                </div>

                <div className={LastnameClass}>
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    ref={LastNameInputRef}
                  />
                  {!isFormValid.Lastname && <p>Enter Vaild Name</p>}
                </div>
              </div>

              <div className="  full_width emails">
                <div className={emailClass}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" ref={emailInputRef} />
                  {!isFormValid.name && <p>Enter Vaild email</p>}
                </div>
              </div>
            </div>

            <div className="forms_grid  contact_info">
              <h3 className="info_text">Contact Information</h3>

              <div className="half_width ">
                <div className={countryClass}>
                  <label htmlFor="Country">Country</label>
                  <input
                    type="text"
                    id="Country"
                    ref={CountryInputRef}
                  />
                  {!isFormValid.name && <p>enter vaild Country</p>}
                </div>

                <div className={phoneClass}>
                  <label htmlFor="name">Phone</label>
                  <input
                    type="number"
                    id="Phone"
                    ref={PhoneInputRef}
                  />
                  {!isFormValid.name && <p>Enter Vaild number</p>}
                </div>
              </div>

              <div className="half_width ">
                <div className={postalClass}>
                  <label htmlFor="postal">postal Code</label>
                  <input
                    type="text"
                    id="postal"
                    ref={PostalInputRef}
                  />
                  {!isFormValid.postal && (
                    <p>Enter Vaild Posta(5 Characters)</p>
                  )}
                </div>

                <div className={cityClass}>
                  <label htmlFor="City">City /Town </label>
                  <input type="text" id="City" ref={CityInputRef} />
                  {!isFormValid.city && <p>Enter Vaild City</p>}
                </div>
              </div>

              <div className=" full_width ">
                <div className={adressClass}>
                  <label htmlFor="Adress">Adress</label>
                  <input
                    type="text"
                    id="Adress"
                    ref={adressInputRef}
                  />
                  {!isFormValid.adress && <p>Enter Vaild Adress</p>}
                </div>
              </div>
            </div>

            <div className="action">
              <button type="submit" className={`${dark ? 'dark' : ''}`}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
