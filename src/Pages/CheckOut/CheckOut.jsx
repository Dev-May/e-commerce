import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckOut() {
  const navigate = useNavigate();
  const {
    cashOnDelivery,
    setNumOfCartItems,
    setCartId,
    cartId,
    onlinePayment,
  } = useContext(CartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const { state } = useLocation();

  const validationSchema = Yup.object({
    details: Yup.string().required(),
    phone: Yup.string().required(),
    city: Yup.string().required(),
  });

  async function pay(values) {
    console.log({ shippingAddress: values });
    if (state === "online") {
      let response = await onlinePayment({ shippingAddress: values });
      console.log(response);
      if (response.status == "success") {
        console.log(response.session.url);
        window.location.href = response.session.url;
      }
    } else {
      console.log({ shippingAddress: values });
      let response = await cashOnDelivery({ shippingAddress: values });
      console.log(response);

      if (response.data.status) {
        setCartId(null);
        setNumOfCartItems(0);
        navigate("/allorders");
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: pay,
  });
  // useEffect(() => {
  //   console.log("Cart ID updated:", cartId);
  // }, [cartId]);
  return (
    <div className="dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
      <h5 className="font-bold mb-4 text-xl">CheckOut</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your details
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="details"
            name="details"
            value={formik.values.details}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0aad0a] focus:border-[#0aad0a] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Details"
          />
          {formik.touched.details && formik.errors.details && (
            <small className="text-red-600">{formik.errors.details}</small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="phone"
            name="phone"
            value={formik.values.phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0aad0a] focus:border-[#0aad0a] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Phones"
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-red-600">{formik.errors.phone}</small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your city
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter Your City"
          />
          {formik.touched.city && formik.errors.city && (
            <small className="text-red-600">{formik.errors.city}</small>
          )}
        </div>
        <button type="submit" className="w-full btn-green">
          Pay
        </button>
      </form>
    </div>
  );
}
