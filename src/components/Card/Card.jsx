import { Link, useLocation } from 'react-router-dom';
import './Card.css';
import { useState } from 'react';
import heart from '../Icons/favorite-1.svg';
import heart_white from '../Icons/heart-thin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ProductActions } from '../store/productSclice';
import { booleanActions } from '../store/booleanStates';
import delete_icon from '../Icons/delete.svg';

const Card = (props) => {
    const { price, name, img_url, id, category } = props.items;

    const items = props.items;

    const dispatch = useDispatch();

    const [fav, setfav] = useState(false);

    const addFavoriteHandler = () => {
        dispatch(ProductActions.favoriteList(items));
        const img = document.getElementById(name);
        img.classList.add('heart_Scale');
        document.querySelector('.fav_list img').classList.add('heart_Scale');
        setTimeout(() => {
            img.classList.remove('heart_Scale');
            document
                .querySelector('.fav_list img')
                .classList.remove('heart_Scale');
        }, 600);
        dispatch(booleanActions.setFavorite());
        setfav(true);
        img.setAttribute('src', heart);
    };

    const favoriteProducts = useSelector(
        (state) => state.productSlice.favoriteProducts
    );
    const RemoveFavoriteHandler = () => {
        const UpdatedItems = favoriteProducts.filter((e) => e.id !== id);
        localStorage.setItem('favArr', JSON.stringify(UpdatedItems));
        dispatch(ProductActions.updatedFavorieProducts(UpdatedItems));
    };

    let isInProductsPage = true;
    const location = useLocation();
    location.pathname.includes('favorite')
        ? (isInProductsPage = false)
        : (isInProductsPage = true);

    return (
        <div className={`card ${props.className ? props.className : ''}`}>
            <Link to={`/products/${category}/item/${id}`}>
                <div className="image">
                    <img src={img_url} alt="cover" />
                </div>
            </Link>
            <p className="name">{name}</p>
            <div className="price">${price ? price : ''}</div>

            {isInProductsPage && (
                <div className="favorite" onClick={addFavoriteHandler}>
                    <div className="image_favorite">
                        <img id={name} src={fav ? heart : heart_white} alt="heart" />
                    </div>
                </div>
            )}

            {!isInProductsPage && (
                <div
                    className="favorite remove_fav "
                    onClick={RemoveFavoriteHandler}
                >
                    <div className="image_favorite">
                        <img id={name} src={delete_icon} alt="remove" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
