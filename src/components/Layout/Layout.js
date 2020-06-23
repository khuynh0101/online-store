import React from 'react';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';
import { Home } from '../Home/Home';
import { Contact } from '../Contact/Contact';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

export const Layout = ({ menu, onMenuItemClick }) => {
  //add routing here
  const history = useHistory();
  const onMenuItemClick2 = (event, index) => {
    event.preventDefault();
    console.log(history);
    history.push('/home');
  };
  return (
    <>
      <section className='header'>
        <Header />
        <Nav />
      </section>
      <Switch>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
};
