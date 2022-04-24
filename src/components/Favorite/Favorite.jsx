import './favorite.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { ProductActions } from '../store/productSclice';

const Favorite = () => {
    const dispatch = useDispatch();
    const Products = useSelector((state) => state.productSlice.favoriteProducts);
    useEffect(() => {
        const favArr = JSON.parse(localStorage.getItem('favArr'));

        dispatch(ProductActions.updatedFavorieProducts(favArr));
    }, [dispatch]);

    let List;

    List = <div className="no_products">No Favorite Products</div>;

    if (Products.length > 0) {
        List = (
            <div className="list">
                {Products.map((product) => (
                    <Card key={product.id} items={product} />
                ))}
            </div>
        );
    }

    const isList = Products.length > 0;

    return (
        <div className="favorite_list">
            {isList && <h1>Your Favorite Products List</h1>}
            {List}
        </div>
    );
};

export default Favorite;
