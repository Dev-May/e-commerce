import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { tokenContext } from "../../Context/TokenContext";
import logo from "./../../assets/freshcart-logo.svg";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const { numOfCartItems, getLoggedUserCart } = useContext(CartContext);

  function logoutUser() {
    // remove local storage
    // set context null
    // navigate to login

    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  // async function getCartData() {
  //   const data = await getLoggedUserCart();
  //   setCartData(data);
  // }

  // useEffect(() => {
  //   getCartData();
  // }, []);

  return (
    <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8 mx-2" alt="FreshCart Logo" />
          </Link>

          {token && (
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-500">
                <li>
                  <NavLink
                    to={"/"}
                    className="block text-gray-900 md:hover:text-[#0aad0a] py-1 px-2 rounded-md dark:text-white md:dark:text-[#0aad0a]"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className="block text-gray-900 md:hover:text-[#0aad0a] py-1 px-2 rounded-md dark:text-white md:dark:text-[#0aad0a]"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className="block text-gray-900 md:hover:text-[#0aad0a] py-1 px-2 rounded-md dark:text-white md:dark:text-[#0aad0a]"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"brands"}
                    className="block text-gray-900 md:hover:text-[#0aad0a] py-1 px-2 rounded-md dark:text-white md:dark:text-[#0aad0a]"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-500">
            <li>
              <Link
                to={""}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="block py-2 px-3  text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaTiktok />
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <FaYoutube />
              </Link>
            </li>
            {token && (
              <>
                <li>
                  <NavLink
                    to={"cart"}
                    className="relative block text-gray-900 md:hover:text-[#0aad0a] py-1 px-2 rounded-md dark:text-white md:dark:text-[#0aad0a]"
                  >
                    <FiShoppingCart className="text-xl font-semibold" />
                    <span className="absolute -top-3 -right-3 w-6 h-6 text-white font-semibold bg-yellow-300 rounded-full border border-white flex justify-center items-center text-xs">
                      {/* {cartData?.numOfCartItems} */}
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <div
                    onClick={() => {
                      logoutUser();
                    }}
                    className="block cursor-pointer py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#0aad0a] md:p-0 dark:text-white md:dark:hover:text-[#0aad0a] dark:hover:bg-gray-500 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    SignOut
                  </div>
                </li>
              </>
            )}
            {!token && (
              <>
                <li>
                  <Link to={"login"} className="btn">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"register"} className="btn">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
