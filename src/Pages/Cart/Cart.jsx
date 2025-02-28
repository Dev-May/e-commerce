import { Helmet } from "react-helmet";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";


export default function Cart() {
  const {
    getLoggedUserCart,
    removeCartItem,
    updateCartProductQuantity,
    clearUserCart,
    setNumOfCartItems,
    setCartId,
  } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  async function getCartData() {
    const data = await getLoggedUserCart();
    console.log(data.cartId);

    setCartData(data.data);
    setCartId(data.cartId);
  }

  async function deleteProduct(id) {
    const response = await removeCartItem(id);
    setNumOfCartItems(response.numOfCartItems);
    setCartData(response.data);
  }

  async function updateProductQuantity(id, count) {
    const data = await updateCartProductQuantity(id, count);
    setCartData(data.data);
  }

  async function clearCart() {
    const data = await clearUserCart();
    setCartData([]);
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartData ? (
        <>
          <div className="flex justify-between my-4">
            <h4 className="text-2xl font-semibold">Shopping Cart</h4>
            <h6>
              <span className="font-semibold">
                Total Price:{" "}
                {cartData.totalCartPrice ? cartData.totalCartPrice : "0"} EGP
              </span>
            </h6>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.products?.length > 0 ? (
                  cartData.products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product?.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product?.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            disabled={product.count === 1}
                            onClick={() => {
                              updateProductQuantity(
                                product.product.id,
                                product.count - 1
                              );
                            }}
                            className="disabled:cursor-not-allowed inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">{product.count}</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>{product.count}</div>
                          <button
                            onClick={() => {
                              updateProductQuantity(
                                product.product.id,
                                product.count + 1
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            deleteProduct(product.product?.id);
                          }}
                        >
                          <FaTrashCan className="text-2xl text-red-700" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
                {/* <tr>
                  <td colSpan="5" className="text-center">
                    {cartData.products?.length > 0 && (
                      <>
                        <button
                          onClick={() => {
                            clearCart();
                          }}
                          className="text-white hover:text-white text-center my-2 cursor-pointer bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-700 dark:hover:bg-bg-red-600"
                        >
                          Delete Cart
                        </button>
                        <select
                          name="payment"
                          id="payment"
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                          }}
                        >
                          <option value="cash">Cash</option>
                          <option value="online">Online</option>
                        </select>
                        <button
                          className="btn-green"
                          onClick={() => {
                            navigate("/checkout", { state: paymentMethod });
                          }}
                        >
                          Checkout
                        </button>
                      </>
                    )}
                  </td>
                </tr> */}
                <tr>
                  <td colSpan="5" className="py-6">
                    {cartData.products?.length > 0 && (
                      <div className="flex items-center justify-around gap-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <select
                            id="payment"
                            name="payment"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-2 rounded-md shadow-sm"
                          >
                            <option value="cash">💵 Cash</option>
                            <option value="online">💳 Online</option>
                          </select>

                          <button
                            onClick={() =>
                              navigate("/checkout", { state: paymentMethod })
                            }
                            className="btn-green"
                          >
                            <GiShoppingCart className="inline text-2xl" />{" "}
                            Checkout
                          </button>
                        </div>

                        <button
                          onClick={clearCart}
                          className="px-4 py-2 text-sm text-red-600 border border-red-700 rounded-lg hover:bg-red-600 hover:text-white transition-all flex items-center"
                        >
                          <FaTrashCan className="inline mx-1" /> Clear Cart
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
