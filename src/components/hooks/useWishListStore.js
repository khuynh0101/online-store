import React, { useState, useEffect } from 'react';
import * as storage from '../../utils/localStorage';

export const useWishListStore = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    setWishList(storage.getWishList() || []);
  }, []);

  const updateWishList = (wishList) => {
    setWishList(wishList);
    storage.updateWishList(wishList);
  };
  const getWishList = () => {
    return [...wishList];
  };
  const addWishListItem = (id) => {
    const wishList = getWishList();
    wishList.push(id);
    updateWishList(wishList);
  };
  const removeWishListItem = (id) => {
    const wishList = getWishList();
    const index = wishList.indexOf(id);
    if (index > -1) wishList.splice(index, 1);
    updateWishList(wishList);
  };

  return { getWishList, addWishListItem, removeWishListItem };
};
