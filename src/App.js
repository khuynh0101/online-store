import React, { useState } from 'react';
import './app.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { NavStateProvider } from './components/Providers/NavState';
import { CartStateProvider } from './components/Providers/CartState';

const App = () => {
  return (
    <>
      <Router>
        <NavStateProvider>
          <CartStateProvider>
            <Layout />
          </CartStateProvider>
        </NavStateProvider>
      </Router>
    </>
  );
};
export default App;
