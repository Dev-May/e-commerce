import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Cart from "./Pages/Cart/Cart";
import Brands from "./Pages/Brands/Brands";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CounterContextProvider from "./Context/CounterContext";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { Offline, Online } from "react-detect-offline";
import { CiWifiOff } from "react-icons/ci";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:productId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <Offline>
            <div className="offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold z-50 rounded">
              <CiWifiOff className="inline mx-3 text-xl" />
              You Are Now Offline!
            </div>
          </Offline>
          <Toaster position="bottom-right" />
          <RouterProvider router={routes}></RouterProvider>;
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}
