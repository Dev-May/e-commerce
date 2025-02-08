import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams();
  console.log(productId);

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return <div>ProductDetails</div>;
}
