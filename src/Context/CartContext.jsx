import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
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

      .then((res) => {
        setNumOfCartItems(0);
        return res.data;
      })
      .catch((err) => err);
  }

  function cashOnDelivery(data) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, data, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function onlinePayment(data) {
    return axios
      .post(
        // `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        data,
        {
          params: {
            url: "http://localhost:5173",
          },
          headers,
        }
      )
      .then((res) => res.data)
      .catch((err) => err);
  }

  async function getCartData() {
    const data = await getLoggedUserCart();
    setNumOfCartItems(data.numOfCartItems);
    setCartId(data.cartId);
    console.log("Cart API Response:", data.cartId);
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateCartProductQuantity,
        clearUserCart,
        numOfCartItems,
        setNumOfCartItems,
        setCartId,
        cashOnDelivery,
        cartId,
        onlinePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
