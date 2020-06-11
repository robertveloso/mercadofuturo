export function addToCartRequest(id, date, bonus, price) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
    date,
    bonus,
    price,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function clearCart() {
  return {
    type: '@cart/CLEAR',
  };
}
