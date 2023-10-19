import LoginImage from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import style from '../Login/Login.module.css'
import { UserContext } from "../../Context/UserContext";


export default function Login() {
  let [isLoading, setIsLoading] = useState(false);

let {token , setToken} = useContext(UserContext)
  
  let navigate = useNavigate();

  async function handleSignIn(values) {
    setIsLoading(true);

    let { data } = await axios.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      values
    );
 

    console.log(data);
    setIsLoading(false);
    if (data.msg === "done") {
      localStorage.setItem('token' , `3b8ny__${data.token}`);
      setToken(data.token);
      
    }
    return data;
  }

  useEffect(() => {
    if(token) 
    navigate("/");
  } ,[token])

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter your valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must be start with a upperCase letter"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,
    onSubmit: handleSignIn,
  });

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          onSubmit={formik.handleSubmit}
          className="col-md-4 d-flex flex-column justify-content-center px-5"
        >
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.errors.email && formik.touched.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : (
              ""
            )}

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />

            {formik.errors.password && formik.touched.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : (
              ""
            )}

            <button type="submit" className="btn btn-main">
            {isLoading ?  <i className="fa-solid fa-spinner fa-spin"></i> : "Login" }
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
