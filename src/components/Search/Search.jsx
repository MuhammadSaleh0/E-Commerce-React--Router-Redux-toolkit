import './Search.css';
import search_icon from '../Icons/search-thin.svg';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductActions } from '../store/productSclice';

const Search = () => {
    const input_ref = useRef();
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();
    const searchHandler = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue === input_ref.current.value) {
                dispatch(ProductActions.inputSearchValue(inputValue));
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, input_ref, inputValue]);


    return (
        <div className="search">
            <div className="input_search">
                <input
                    id="search-input"
                    value={inputValue}
                    type="text"
                    ref={input_ref}
                    onChange={searchHandler}
                />
                <label htmlFor="search-input">
                    <img src={search_icon} className="search_icon" alt="search" />
                </label>
            </div>
        </div>
    );
};

export default Search;
