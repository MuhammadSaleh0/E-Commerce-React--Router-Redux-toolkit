import './categories.css';
import all_icon from '../Icons/categories/select-all.svg';
import shoes from '../Icons/categories/shoes.svg';
import t_shirt from '../Icons/categories/t-shirt.svg';
import blazer from '../Icons/categories/blazer.svg';
import pants from '../Icons/categories/pants.svg';
import coat from '../Icons/categories/coat.svg';
import suit from '../Icons/categories/suit.svg';
import jacket from '../Icons/categories/jacket.svg';
import shirt from '../Icons/categories/shirt.svg';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const listOfCategories = [
    {
        img_url: all_icon,
        tag: 'all',
        active: false,
        id: '1',
        cate: '27110',
    },
    {
        img_url: pants,
        tag: 'Pants',
        active: false,
        id: '13',
        cate: '4910',
    },
    {
        img_url: t_shirt,
        tag: 'T-shirt',
        active: false,
        id: '14',
        cate: '7616',
    },
    {
        img_url: shirt,
        tag: 'Shirt',
        active: false,
        id: '15',
        cate: '3602',
    },
    {
        img_url: shoes,
        tag: 'Shoes',
        active: false,
        id: '12',
        cate: '4209',
    },
    {
        img_url: jacket,
        tag: 'Jacket',
        active: false,
        id: '16',
        cate: '3606',
    },
    {
        img_url: blazer,
        tag: 'Blazer',
        active: false,
        id: '17',
        cate: '4208',
    },
    {
        img_url: suit,
        tag: 'Suit',
        active: false,
        id: '19',
        cate: '5678',
    },
    {
        img_url: coat,
        tag: 'Coat',
        active: false,
        id: '18',
        cate: '4616',
    },
];

const Categories = (props) => {
    const dark = useSelector((state) => state.boolean.isDark);
    const ScrollTopHandler = () => {
        window.scrollTo(0, 0);
    };

    const { category } = useParams();
    let categories_nav = listOfCategories.map((item) => {
        return (
            <Link
                onClick={ScrollTopHandler}
                data-cate={item.cate}
                to={`/products/${item.tag}`}
                key={item.id}
                className={item.tag === category ? 'cate_link active' : 'cate_link'}
            >
                <li>
                    <div className={!dark ? 'image_cate light' : 'image_cate'}>
                        <img src={item.img_url} alt="item" />
                    </div>
                    <div className="name">{item.tag}</div>
                </li>
            </Link>
        );
    });

    return (
        <div className="categories">
            <ul>{categories_nav}</ul>
        </div>
    );
};

export default Categories;
