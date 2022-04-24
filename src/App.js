import { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './components/Layout/Layout';
import ProductItem from './Pages/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import CartData from './components/Cart/CartData/CartData';
import ConfirmOrder from './Pages/ConfirmOrder';
import NotFound from './Pages/NotFound';
import { GetData, SentDataCart } from './components/store/Cart-Actions';
import LogInPage from './Pages/LogInPage';
import FavoriteList from './Pages/FavoriteList';

let initial = true;
function App() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (cart.changed) {
      dispatch(SentDataCart(cart));
    }
  }, [dispatch, cart]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/LogIn" />} />
          <Route path="/LogIn/*" element={<LogInPage />} />
          <Route path="/products/*" element={<Home />} />
          <Route path="/products/:category/*" element={<Home />} />
          <Route path="/products/:category/:page/*" element={<Home />} />
          <Route
            path="/products/:category/item/:id/*"
            element={<ProductItem />}
          />
          <Route path="/favorite/" element={<FavoriteList />} />
          <Route path="/cart/*" element={<CartData />} />
          <Route path="/cart/checkout" element={<ConfirmOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
