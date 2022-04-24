import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from "./components/store/index";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App tab="home" />
    </Provider>
  </BrowserRouter>
);

