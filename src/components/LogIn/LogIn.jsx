import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.length > 5;

const LogIn = () => {
    const dark = useSelector((state) => state.boolean.isDark);

    const [isFormValid, setFormValidity] = useState({
        password: true,
        email: true,
    });
    const passwordRef = useRef();
    const emailInputRef = useRef();

    const navigate = useNavigate();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enterdPassword = passwordRef.current.value;
        const enterdEmail = emailInputRef.current.value;
        const enterdPasswordVaild = isFiveChars(enterdPassword);
        const enterdEmailsVaild = !isEmpty(enterdEmail);

        setFormValidity({
            email: enterdEmailsVaild,
            password: enterdPasswordVaild,
        });

        const formValidity = enterdPasswordVaild && enterdEmailsVaild;

        if (!formValidity) {
            return;
        }

        navigate('/products');
    };

    const passwordClass = `control ${isFormValid.password ? '' : 'invalid'}`;
    const emailClass = `control ${isFormValid.email ? '' : 'invalid'}`;

    const [isSiginIn, setSignIn] = useState(false);

    const SignInHandler = () => {
        setSignIn((prevstate) => !prevstate);
    };

    const login_btn = <span onClick={SignInHandler}>Log In</span>;
    const sign_btn = <span onClick={SignInHandler}>Sign In</span>;

    return (
        <div className="Login">
            <div className="Forms">
                <form
                    className={`${dark ? ' form form_dark' : 'form'}`}
                    onSubmit={confirmHandler}
                >
                    <h2 className="info_text">
                        {isSiginIn ? ' Sign In' : ' LOG IN'}
                    </h2>

                    <div className="forms_grid  ">
                        <div className="full_width ">
                            <div className={emailClass}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" ref={emailInputRef} />
                                {!isFormValid.email && <p>Enter Vaild email</p>}
                            </div>

                            <div className={passwordClass}>
                                <label htmlFor="lastname">Password</label>
                                <input
                                    type="password"
                                    id="lastname"
                                    ref={passwordRef}
                                />
                                {!isFormValid.password && (
                                    <p>Enter Vaild password (6 char long)</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <small className="sign_in">
                        {isSiginIn
                            ? 'Already  have an account? '
                            : "Don't have an account? "}
                        {isSiginIn ? login_btn : sign_btn}
                    </small>

                    <div className="action">
                        <button type="submit" className={`${dark ? 'dark' : ''}`}>
                            {isSiginIn ? ' Sign IN' : ' LOG IN'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
