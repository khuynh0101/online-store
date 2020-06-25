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
