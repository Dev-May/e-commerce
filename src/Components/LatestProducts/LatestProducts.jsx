import { useEffect, useState } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import ProductItem from "./../ProductItem/ProductItem";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        console.log(res.data.data);
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
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id} className="w-1/6 p-2">
            <ProductItem product={product} />
          </div>
        ))}
    </div>
  );
}
