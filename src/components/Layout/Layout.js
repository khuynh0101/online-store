import React from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Home } from '../Home/Home';
import { Contact } from '../Contact/Contact';
import { Plants } from '../Plants/Plants';
import { Switch, Route } from 'react-router-dom';

export const Layout = ({ menu, onMenuItemClick }) => {
  return (
    <>
      <section className='header'>
        <Header />
        <Nav />
      </section>
      <Switch>
        <Route path='/plants/:name'>
          <Plants />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/wishlist'></Route>
        <Route path='/search/:term'></Route>
        <Route path='/cart'></Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </>
  );
};
