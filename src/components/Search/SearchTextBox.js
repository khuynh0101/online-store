import React, { useState, useEffect } from 'react';
import styles from './searchTextBox.module.css';
import { useHistory } from 'react-router-dom';
import products from '../../data/products.json';

export const SearchTextBox = () => {
  const history = useHistory();
  const [suggestion, setSuggestion] = useState([]);
  const [search, setSearch] = useState({
    text: '',
    isSearchActive: false,
  });
  const [keywords, setKeywords] = useState([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.text.length > 1) getSuggestion(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  //consolidate unique keywords from JSON
  useEffect(() => {
    let keyWordSet = new Set();
    products.forEach((product) => {
      const words = product.keywords.split(' ');
      words.forEach((word) => {
        keyWordSet.add(word);
      });
    });
    setKeywords([...keyWordSet]);
  }, []);

  //returning the keywords that match the user's search term
  const getSuggestion = () => {
    const searchText = search.text.toLowerCase();
    let searchTerms = new Set();
    keywords.forEach((keyword) => {
      const word = keyword.toLowerCase();
      if (word.includes(searchText)) {
        searchTerms.add(word);
      }
    });
    const term = [search.text];
    setSuggestion([...searchTerms]);
  };

  //allow only alpha characters and spaces
  const handleOnChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setSearchProp(value, true);
  };
  const handleOnFocus = () => {
    const { text } = search;
    setSearchProp(text, true);
  };
  const closeSearch = () => {
    setSearchProp('', false);
    setSuggestion([]);
    setCursor(-1);
  };

  const setSearchProp = (text, isSearchActive) => {
    const searchProps = {
      text: text,
      isSearchActive: isSearchActive,
    };
    setSearch(searchProps);
  };

  const handleSearchSubmit = () => {
    history.push(`/search/${search.text}`);
    closeSearch();
  };
  const handleSuggestionClick = (suggestion) => {
    history.push(`/search/${suggestion}`);
    closeSearch();
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 38 && cursor > -1) {
      setCursor(cursor - 1);
    } else if (event.keyCode === 40 && cursor < suggestion.length - 1) {
      setCursor(cursor + 1);
    }
    if (event.keyCode === 13) {
      if (cursor > -1) handleSuggestionClick(suggestion[cursor]);
      else handleSearchSubmit();
    }
  };

  const textBoxActiveClassName = search.isSearchActive ? styles.active : null;
  const suggestionBoxClassName =
    suggestion.length > 0 ? styles.show : styles.hide;
  return (
    <div className={`${styles.navActionSearch} ${textBoxActiveClassName}`}>
      {search.isSearchActive && (
        <div className={styles.hiddenDiv} onClick={closeSearch}></div>
      )}
      <input
        value={search.text}
        className={styles.inputSearch}
        type='text'
        placeholder='Search'
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
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
      {suggestion.length > 0 && (
        <div className={`${styles.suggestion} ${suggestionBoxClassName}`}>
          <ul>
            {suggestion.map((suggestion, index) => {
              const highlightClassName =
                index === cursor ? styles.suggestionActive : null;
              return (
                <li
                  key={index}
                  className={`${styles.suggestionText} ${highlightClassName}`}
                  onClick={(index) => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
