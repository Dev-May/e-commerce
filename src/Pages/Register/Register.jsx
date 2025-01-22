import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function handleRegister(data) {
    // call api
    // https://ecommerce.routemisr.com/api/v1/auth/signup
    setIsLoading(true);
    const x = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then((response) => {
        console.log(response);
        setErrorMsg(null);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoading(false);
      });
  }

  // function validateData(data) {
  //   console.log(data);

  //   const errors = {};
  //   const nameRegex = /^[A-Z][a-z]{1,15}$/;
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   const passwordRegex = /^[A-Za-z1-9]{8,12}$/;
  //   const phoneRegex = /^01[0125][0-9]{8}$/;

  //   if (data.name === "") {
  //     errors.name = "Name is required";
  //   } else if (!nameRegex.test(data.name)) {
  //     errors.name = "Name must start with capital letter";
  //   }

  //   if (data.email === "") {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(data.email)) {
  //     errors.email = "Invalid email";
  //   }

  //   if (data.password === "") {
  //     errors.password = "Password is required";
  //   } else if (!passwordRegex.test(data.password)) {
  //     errors.password = "Invalid password";
  //   }

  //   if (data.repassword === "") {
  //     errors.repassword = "rePassword is required";
  //   } else if (data.repassword !== data.password) {
  //     errors.repassword = "rePassword does not match password";
  //   }

  //   if (data.phone === "") {
  //     errors.phone = "Phone is required";
  //   } else if (!phoneRegex.test(data.phone)) {
  //     errors.phone = "Invalid phone";
  //   }

  //   return errors;
  // }

  const validationSchema = Yup.object({
    name: Yup.string().required().min(2).max(20),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(/^[A-Za-z1-9]{8,12}$/, "Password is not valid"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "rePassword does not match password"),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
  });

  const formik = useFormik({
    initialValues,
    // validate: validateData,
    validationSchema,
    onSubmit: handleRegister,
  });
  // console.log(formik);

  return (
    <section className="dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
      <h1 className="text-3xl font-bold my-3">Register Now:</h1>
      {errorMsg && (
        <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Name"
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-red-600">{formik.errors.name}</small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-red-600">{formik.errors.email}</small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Password"
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-red-600">{formik.errors.password}</small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your rePassword
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your rePassword"
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <small className="text-red-600">{formik.errors.rePassword}</small>
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
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Phone"
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-red-600">{formik.errors.phone}</small>
          )}
        </div>
        {isLoading ? (
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled
          >
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={!formik.isValid}
          >
            Register
          </button>
        )}
        <small>
          Already have an account! <Link to={"/login"}>Login</Link>
        </small>
      </form>
    </section>
  );
}
