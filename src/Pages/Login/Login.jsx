import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  async function handleLogin(data) {
    // call api
    // https://ecommerce.routemisr.com/api/v1/auth/signin
    setIsLoading(true);
    const x = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        console.log(response);
        setErrorMsg(null);
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(/^[A-Za-z1-9]{8,12}$/, "Password is not valid"),
  });

  const formik = useFormik({
    initialValues,
    // validate: validateData,
    validationSchema,
    onSubmit: handleLogin,
  });
  // console.log(formik);

  return (
    <section className="dark:bg-gray-900 w-1/2 mx-auto bg-gray-50 shadow p-3 my-3">
      <h1 className="text-3xl font-bold my-3">Login Now:</h1>
      {errorMsg && (
        <div className="bg-red-300 rounded-md p-3 my-2">{errorMsg}</div>
      )}
      <form onSubmit={formik.handleSubmit}>
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
            Login
          </button>
        )}
        <small>
          Create an account <Link to={"/register"}>Login</Link>
        </small>
      </form>
    </section>
  );
}
