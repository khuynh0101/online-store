import React from 'react';
import './app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { NavStateProvider } from './components/Providers/NavState';
import { CartStateProvider } from './components/Providers/CartState';
import { ProductsStateProvider } from './components/Providers/ProductsState';

const App = () => {
  return (
    <>
      <Router>
        <NavStateProvider>
          <CartStateProvider>
            <ProductsStateProvider>
              <Layout />
            </ProductsStateProvider>
          </CartStateProvider>
        </NavStateProvider>
      </Router>
    </>
  );
};
export default App;
