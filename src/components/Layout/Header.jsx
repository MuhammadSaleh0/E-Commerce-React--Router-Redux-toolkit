import './Header.css';
import online_shopping from '../../assets/online-shopping.png';
import { Link, useLocation } from 'react-router-dom';
import sun from '../../assets/sunny.png';
import moon from '../../assets/moon_full.png';
import { useEffect } from 'react';
import CartButton from '../Cart/CartButton/CartButton';
import { useDispatch, useSelector } from 'react-redux';
import { booleanActions } from '../store/booleanStates';
import Search from '../Search/Search';
import sign from '../Icons/sign_in.svg';
import heart from '../Icons/favorite-1.svg';

const Header = () => {
    const dark = useSelector((state) => state.boolean.isDark);
    const dispatch = useDispatch();
    const setDrakMood = () => {
        dispatch(booleanActions.setDarkMood());
    };
    dark
        ? document.body.classList.add('light')
        : document.body.classList.remove('light');

    useEffect(() => {
        const all_products = document.querySelector('.all_products');
        const header = document.querySelector('header');
        const header_div = document.querySelector('.header');
        const container = document.querySelector('.container');


        if (all_products) {
            const options = {
                // threshold: 0.9
                rootMargin: '-200px',
            };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        header.classList.add('shrink_nav');
                        header_div.classList.add('shrink_nav');
                        container.classList.add('shrink_nav');
                    } else {
                        header.classList.remove('shrink_nav');
                        header_div.classList.remove('shrink_nav');
                        container.classList.remove('shrink_nav');
                    }
                });
            }, options);

            observer.observe(all_products);
        }
    }, []);

    const location = useLocation();
    const isLogInPage = location.pathname === '/LogIn';

    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="drakmood">
                        <img
                            src={dark ? moon : sun}
                            alt="moon"
                            onClick={setDrakMood}
                        />
                    </div>

                    <Link to="/products" className="Logo_div">
                        <div className="brand">
                            <div className="image">
                                <div className="fav_list"></div>
                                <img src={online_shopping} alt="logo" />
                            </div>

                            <h1>Baradox</h1>
                        </div>
                    </Link>

                    {/* <div className="burger" onClick={showNav}>
                    <img src={menu} className={dark ? "icon_dark" : ""} alt="menu" />
                </div> */}

                    {!isLogInPage && (
                        <div className="search_cart_div">
                            <Search />
                            <div className="fav_list">
                                <Link to="/favorite">
                                    <img
                                        className={`${dark ? 'icon_dark' : ''}`}
                                        src={heart}
                                        alt="favorite"
                                    />
                                </Link>
                            </div>
                            <CartButton />
                        </div>
                    )}

                    {isLogInPage && (
                        <div className="signIn_icon">
                            <img
                                className={`${dark ? 'icon_dark' : ''}`}
                                src={sign}
                                alt="sign"
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
