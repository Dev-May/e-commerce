import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

const headers = {
  token: localStorage.getItem("token"),
};

function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => err);
}

function getLoggedUserCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
    .then((res) => res.data)
    .catch((err) => err);
}

function removeCartItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

function updateCartProductQuantity(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => err);
}

function clearUserCart() {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
    .then((res) => res.data)
    .catch((err) => err);
}

export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateCartProductQuantity,
        clearUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
