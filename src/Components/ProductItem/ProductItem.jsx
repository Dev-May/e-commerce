import { FaStar } from "react-icons/fa";
import styles from "./ProductItem.module.css";

export default function ProductItem({ product }) {
  return (
    <div className="inner product p-2">
      <img src={product.imageCover} className="w-full" alt="product image" />
      <small className="text-[#0aad0a]">{product.category?.name}</small>
      <h5 className="font-semibold my-3 truncate">
        {product.title.split(" ").slice(0, 3).join(" ")}
      </h5>
      <div className="flex justify-between">
        <p>{product.price} EGP</p>
        <p>
          <FaStar className="text-yellow-300 inline mx-1" />
          {product.ratingsAverage}
        </p>
      </div>
    </div>
  );
}
