import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { NavStateProvider } from './components/Providers/NavState';

const App = () => {
  return (
    <>
      <Router>
        <NavStateProvider>
          <Layout />
        </NavStateProvider>
      </Router>
    </>
  );
};
export default App;
