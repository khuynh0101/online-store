import React from 'react';
import styles from './home.module.css';
import globalStyles from '../../app.module.css';
import { Link } from 'react-router-dom';
import { Products } from '../Products/Products';
import { useProductsState } from '../Providers/ProductsState';
import { useNavState } from '../../components/Providers/NavState';

export const Home = () => {
  const [navState, setNavState] = useNavState();
  const [products, setProducts] = useProductsState();
  const filteredProducts = products.filter((p) => p.recommended);

  //setting the nav to highlight "Plants" menu item
  const updateNavMenuSelected = () => {
    let menuItems = [...navState];
    menuItems.forEach((menuItem, index) => {
      if (menuItem.name === 'Plants') {
        menuItem.isActive = true;
      } else {
        menuItems[index].isActive = false;
        menuItem.showSubMenus = false;
      }
    });
    setNavState(menuItems);
  };
  return (
    <>
      <section className={styles.heroGrid}>
        <div className={styles.heroGridContent}>
          <p
            className={`${styles.heroGridContentText} ${globalStyles.textLarge}`}
          >
            All kinds of plants for all kinds of homes
          </p>
          <Link
            to='/plants/all'
            className={`${globalStyles.link} ${globalStyles.linkButton}`}
            onClick={updateNavMenuSelected}
          >
            <span>Shop now</span>
          </Link>
        </div>
        <img
          alt='Hero'
          src='/assets/images/hero.png'
          className={styles.heroGridImg}
        />
      </section>
      <Products
        heading='Check out our recommendations for your homes'
        products={filteredProducts}
      />
    </>
  );
};
