/* wishlist */
const LOCAL_STORAGE_KEY_WISHLIST = 'plant-wishlist';

export function updateWishList(wishList) {
  localStorage.setItem(LOCAL_STORAGE_KEY_WISHLIST, JSON.stringify(wishList));
}

export const getWishList = () => {
  try {
    const wishList = localStorage.getItem(LOCAL_STORAGE_KEY_WISHLIST);
    if (!wishList) return;
    return JSON.parse(wishList);
  } catch (e) {
    return;
  }
};

/* cart */
const LOCAL_STORAGE_KEY_SHOPPING_CART = 'plant-shopping-cart';

export function updateCart(cartItems) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY_SHOPPING_CART,
    JSON.stringify(cartItems)
  );
}

export const getCart = () => {
  try {
    const cartItems = localStorage.getItem(LOCAL_STORAGE_KEY_SHOPPING_CART);
    if (!cartItems) return;
    return JSON.parse(cartItems);
  } catch (e) {
    return;
  }
};
