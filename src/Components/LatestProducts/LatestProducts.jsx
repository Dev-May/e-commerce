import { useContext, useEffect, useState } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import ProductItem from "./../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);

  async function addProduct(id) {
    const res = await addToCart(id);
    setNumOfCartItems(res.numOfCartItems);
    // setCartId(res.cartId);

    if (res.status === "success") {
      toast.success(res.message, {
        style: {
          fontWeight: 600,
          color: "#0aad0a",
        },
      });
    } else {
      toast.error("Somthing Wrong", {
        style: {
          fontWeight: 600,
        },
      });
    }
  }

  async function getProducts() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          >
            <ProductItem product={product} addProduct={addProduct} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
