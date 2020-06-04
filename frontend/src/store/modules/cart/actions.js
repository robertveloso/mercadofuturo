export function addToCartRequest(id, month, price, discount, donate) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
    month,
    price,
    discount,
    donate,
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
