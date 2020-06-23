import React, { useState } from 'react';
import styles from './searchTextBox.module.css';
import { checkEnterKey } from '../../utils/checkEnterKey';
import { useHistory } from 'react-router-dom';

export const SearchTextBox = () => {
  const history = useHistory();
  const [search, setSearch] = useState({
    text: '',
    isSearchActive: false,
  });
  const handleOnChange = (e) => {
    const searchProps = {
      text: e.target.value,
      isSearchActive: true,
    };
    setSearch(searchProps);
  };
  const handleOnClick = () => {
    const { text } = search;
    const searchProps = {
      text: text,
      isSearchActive: true,
    };
    setSearch(searchProps);
  };
  const handleOnBlur = () => {
    const searchProps = {
      text: '',
      isSearchActive: false,
    };
    setSearch(searchProps);
  };
  const handleSearchSubmit = () => {
    history.push(`/search/${search.text}`);
  };

  const textBoxActiveClassName = search.isSearchActive ? styles.active : null;
  return (
    <div className={`${styles.navActionSearch} ${textBoxActiveClassName}`}>
      <input
        value={search.text}
        className={styles.inputSearch}
        type='text'
        placeholder='Search'
        onChange={handleOnChange}
        onClick={handleOnClick}
        onKeyDown={(event) => checkEnterKey(event, handleSearchSubmit)}
        onBlur={handleOnBlur}
      />
      <svg
        className={`${styles.navActionSearchImg} ${styles.svgImg}`}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path d='M0 0h24v24H0V0z' fill='none' />
        <path
          className={styles.svgAction}
          d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
        />
      </svg>
    </div>
  );
};
