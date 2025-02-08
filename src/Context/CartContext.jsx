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

export default function CartContextProvider({ children }) {
  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
