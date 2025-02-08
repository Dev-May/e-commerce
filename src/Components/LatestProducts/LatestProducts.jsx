import { useEffect, useState } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import ProductItem from "./../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getProducts() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row justify-center">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
          >
            <ProductItem product={product} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
