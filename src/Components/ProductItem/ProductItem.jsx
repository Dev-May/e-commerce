import { FaStar } from "react-icons/fa";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="inner product p-2 border border-transparent rounded-md">
      <Link to={`/productdetails/${product.id}`}>
        <img src={product.imageCover} className="w-full" alt="product image" />
        <small className="text-[#0aad0a]">{product.category?.name}</small>
        <h5 className="font-semibold my-3 truncate">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h5>
        <div className="flex justify-between">
          <p>{product.price} EGP</p>
          <div className="flex items-center">
            <FaStar className="text-yellow-300 mx-1" />
            {product.ratingsAverage}
          </div>
        </div>
      </Link>
      <div className="btn btn-green">Add to Cart</div>
    </div>
  );
}
