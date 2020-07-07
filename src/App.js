import React from 'react';
import './app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CartStateProvider } from './components/Providers/CartState';
import { ProductsStateProvider } from './components/Providers/ProductsState';
import { ContactInfoStateProvider } from './components/Providers/ContactInfoState';
import { SecurityStateProvider } from './components/Providers/SecurityState';

const App = () => {
  return (
    <>
      <Router>
        <ProductsStateProvider>
          <SecurityStateProvider>
            <CartStateProvider>
              <ContactInfoStateProvider>
                <Layout />
              </ContactInfoStateProvider>
            </CartStateProvider>
          </SecurityStateProvider>
        </ProductsStateProvider>
      </Router>
    </>
  );
};
export default App;
