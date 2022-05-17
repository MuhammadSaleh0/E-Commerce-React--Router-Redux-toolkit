import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import Categories from '../Categories/CategoriesNav';
import useHttp from '../Hooks/use-http';
import Loading from '../Loading/Loading';
import NavPages from '../NavPages/NavPages';
import './AllProducts.css';
import { useDispatch, useSelector } from 'react-redux';
import { ProductActions } from '../store/productSclice';

const AllProducts = () => {
    const { sentRequest, isLoading } = useHttp();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataPage, setPageData] = useState(filter);
    const [navPages, setNavPages] = useState(true);
    const { category, page } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const res = await sentRequest();
            const productsData = res ? res : [];
            setData(productsData);
        };
        fetchData();
    }, [sentRequest]);

    useEffect(() => {
        dispatch(ProductActions.GetAllData(data));
    }, [dispatch, data]);

    let searchValue = useSelector((state) => state.productSlice.searchValue);
    useEffect(() => {
        if (searchValue === '') {
            const getData = async () => {
                const res = await fetch(
                    `https://paradox-data-default-rtdb.firebaseio.com/Data/${page ? page : 'page_1'
                    }.json`,
                    { method: 'GET' }
                );
                const datares = await res.json();
                setFilter(datares[0]);
                setPageData(datares[0]);
            };
            getData();
        } else {
            const dataSearchResult = data.filter((product) =>
                product.name.toUpperCase().startsWith(searchValue.toUpperCase())
            );
            setFilter(dataSearchResult);
        }
    }, [page, searchValue, data]);

    useEffect(() => {
        if (category) {
            if (category === 'all') {
                setFilter(dataPage);
                return;
            } else {
                if (
                    category !== 'all' &&
                    category !== 'Pants' &&
                    category !== 'T-shirt' &&
                    category !== 'Shirt' &&
                    category !== 'Shoes' &&
                    category !== 'Jacket' &&
                    category !== 'Blazer' &&
                    category !== 'Coat' &&
                    category !== 'Suit'
                ) {
                    navigate('/products/');
                }
                setFilter(data.filter((cate) => cate.category === category));
            }
        }
    }, [category, data, navigate, dataPage]);

    useEffect(() => {
        if (category && category !== 'all') {
            setNavPages(false);
        }
        if (category === 'all') {
            setNavPages(true);
        }
    }, [category]);

    let products;
    isLoading
        ? (products = <Loading />)
        : (products = (
            <div className="products">
                {filter.map((product) => (
                    <Card key={product.id} items={product} />
                ))}
            </div>
        ));

    let headTitle;

    const isSearch = searchValue.length > 0;
    const isData = filter.length > 0;

    if (category) {
        headTitle = category;
    } else {
        headTitle = 'All Items';
    }
    if (isSearch) {
        headTitle = '';
    }
    if (!isData) {
        headTitle = '';
    }
    if (isSearch && !isData) {
        products = <div className="empty">No Products Founded.</div>;
    }

    return (
        <div className="container">
            <div className="Products_section">
                <Categories />
                <div className="all_products">
                    <h1>{headTitle}</h1>
                    {products}
                    {navPages && !isSearch && <NavPages />}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
