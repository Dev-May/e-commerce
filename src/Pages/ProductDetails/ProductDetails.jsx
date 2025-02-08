import axios from "axios";
import styles from "./ProductDetails.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplaySpeed: 1000,
  autoplay: true,
};

export default function ProductDetails() {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState({});

  const { addToCart } = useContext(CartContext);

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => {
        setProductDetails(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  async function addProduct(id) {
    const res = await addToCart(id);
    console.log(res);

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

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    document.title = productDetails.title;
  }, [productDetails]);

  return (
    <div className="row my-14 items-center">
      {/* <Helmet>
        <title>{productDetails.title}</title>
      </Helmet> */}
      <div className="w-1/4">
        <Slider {...settings}>
          {productDetails.images?.map((image, index) => (
            <img key={index} src={image} alt={productDetails.title} />
          ))}
        </Slider>
        {/* <img
          src={productDetails.imageCover}
          className="w-full"
          alt={productDetails.title}
        /> */}
      </div>
      <div className="w-3/4 px-10 py-4">
        <div className="inner">
          <h2 className="text-2xl font-bold">{productDetails.title}</h2>
          <p className="text-gray-700 text-md my-4">
            {productDetails.description}
          </p>
          <small>{productDetails.category?.name}</small>
          <div className="flex justify-between mt-4">
            <p>{productDetails.price} EGP</p>
            <div className="flex items-center">
              <FaStar className="text-yellow-300 mx-1" />
              {productDetails.ratingsAverage}
            </div>
          </div>
          <div
            className="btn-green w-full"
            onClick={() => addProduct(productDetails.id)}
          >
            Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
}
