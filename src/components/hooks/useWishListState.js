import React, { useState, useEffect } from 'react';

export const useWishList = () => {
  const [wishList, setWishList] = useState([]);

  const getWishList = () => {
    return [...wishList];
  };
  const addWishListItem = (id) => {
    const wishList = getWishList();
    wishList.push(id);
    setWishList(wishList);
  };
  const removeWishListItem = (id) => {
    const wishList = getWishList();
    const index = wishList.indexOf(id);
    if (index > -1) wishList.splice(index, 1);
    setWishList(wishList);
  };

  return { getWishList, addWishListItem, removeWishListItem };
};
