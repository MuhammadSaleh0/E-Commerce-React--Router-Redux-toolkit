import './ProductDetails.css';

import { useEffect, useState } from 'react';
import useHttp from '../Hooks/use-http';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { ProductActions } from '../store/productSclice';
import { booleanActions } from '../store/booleanStates';
import Modal from '../Modal/ModalOverley';
import wave from '../Icons/wave_blue.svg';

const ProductDetails = () => {
    const [data, setData] = useState({});
    const { sentRequest } = useHttp();
    const { id } = useParams();
    const dispatch = useDispatch();
    const item_id = +id - 1;

    const showModal = useSelector((state) => state.boolean.modalCart);

    useEffect(() => {
        const getData = async () => {
            const url = `https://paradox-data-default-rtdb.firebaseio.com/products/${item_id}.json`;
            const ItemObject = await sentRequest(url);
            dispatch(
                ProductActions.getProductItem({
                    ...ItemObject,
                    netPrice: ItemObject.discount
                        ? ItemObject.price - ItemObject.discount
                        : ItemObject.price,
                })
            );
            setData(ItemObject);
        };
        getData();
    }, [sentRequest, item_id, dispatch]);

    // const cart = useSelector(state => state.cart);
    const cartDiv = document.querySelector('.cart');

    const addItemToCart = () => {
        cartDiv.classList.add('cartScale');
        const timer = setTimeout(() => {
            cartDiv.classList.remove('cartScale');
            return () => {
                clearTimeout(timer);
            };
        }, 400);

        dispatch(
            cartActions.addItems({
                id: data.id,
                title: data.name,
                price: data.price,
                netPrice: data.discount ? data.price - data.discount : data.price,
                image: data.img_url,
            })
        );

        window.scrollTo(0, 0);
        dispatch(booleanActions.showModal());

        setTimeout(() => {
            const modal_item = document.querySelector('.modal_item');
            const overLey = document.querySelector('.backdrop');
            if (modal_item && overLey) {
                modal_item.classList.add('close_Modal');
                overLey.classList.add('close_overLey');
            }
        }, 2500);

        setTimeout(() => {
            dispatch(booleanActions.showModal());
        }, 3000);
    };

    let netPrice;
    if (data.price && data.discount) {
        netPrice = +data.price - data.discount;
    } else {
        if (data.price) {
            netPrice = data.price;
        }
    }

    let items;

    items = (
        <div className="item_card" key={data.id}>
            <div className="blue_ground">
                {/* <img src={wave2} alt="wave" /> */}
                <div className="wave">
                    <img src={wave} alt="blue_wave" />
                </div>
                {/* <div className="wave wave_Invert">
                <img src={wave} alt="blue_wave" />
            </div> */}
            </div>
            <div className="card_content">
                <div className="image">
                    <img src={data.img_url} alt="product" />
                </div>

                <div className="info">
                    <h3 className="item_cate">{data.category}</h3>

                    <h2 className="item_title">{data.name}</h2>

                    <div className="item_price">
                        {data.discount ? <span>${data.price}</span> : ''}${netPrice}
                    </div>

                    <div className="item_description">{data.description}</div>
                    <div className="add_cart" onClick={addItemToCart.bind()}>
                        Add To Cart
                    </div>
                </div>
            </div>

            {showModal && <Modal />}
        </div>
    );

    return <div className="Product_details">{items}</div>;
};

export default ProductDetails;
