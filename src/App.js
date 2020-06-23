import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { NavStateProvider } from './components/Providers/NavState';

const App = () => {
  //  const history = useHistory();
  // const [menu, setMenu] = useState(menuObject);

  //const handleMenuItemClick = (event, index) => {
  //   event.preventDefault();
  //   console.log(history);
  //   history.push('/home');

  //   let menuItems = [...menu];
  //   menuItems.forEach((menuItem, idx) => {
  //     if (idx === index) {
  //       menuItem.isActive = true;
  //       if (menuItem.subMenus) menuItem.showSubMenus = !menuItem.showSubMenus;
  //     } else {
  //       menuItems[idx].isActive = false;
  //       menuItem.showSubMenus = false;
  //     }
  //   });
  //   menuItems[index].isActive = true;

  //   setMenu(menuItems);
  // };
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
