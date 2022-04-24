import { useSelector } from 'react-redux';
import './HomePage.css';

const HomePage = () => {
    const allDataProducts = useSelector((state) => state.productSlice.allData);

    const ProductsImages1 = allDataProducts.slice(29, 60).map((product) => {
        return (
            <div key={product.id} className="img_item_1">
                <img src={product.img_url} alt="img" />
            </div>
        );
    });
    const ProductsImages2 = allDataProducts.slice(0, 29).map((product) => {
        return (
            <div key={product.id} className="img_item_2">
                <img src={product.img_url} alt="img" />
            </div>
        );
    });
    const ItemImages = allDataProducts.map((product) => {
        return (
            <div key={product.id} className="circle_img">
                <img src={product.img_url} alt="img" />
            </div>
        );
    });

    return (
        <div className="homePage">
            <div className="overley"></div>
            <div className="circle_images">{ItemImages}</div>
            <div className="image_groupe_1">{ProductsImages1}</div>
            <div className="image_groupe_2">{ProductsImages2}</div>
        </div>
    );
};

export default HomePage;
