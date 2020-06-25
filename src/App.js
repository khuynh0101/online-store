import React from 'react';
import './app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CartStateProvider } from './components/Providers/CartState';
import { ProductsStateProvider } from './components/Providers/ProductsState';

const App = () => {
  return (
    <>
      <Router>
        <ProductsStateProvider>
          <CartStateProvider>
            <Layout />
          </CartStateProvider>
        </ProductsStateProvider>
      </Router>
    </>
  );
};
export default App;
