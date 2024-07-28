import React, { useState } from "react";
import "./Register.css";
import { useFormik } from "formik";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// import { logDOM } from "@testing-library/react";

export default function Register() {
  const [errormas, seterrormas] = useState(null);
  const [successmag, setsuccessmag] = useState(null);
  const [loading, setloading] = useState(false);
  const navigateLogin=useNavigate()

  async function getRegister(values) {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        setsuccessmag("The account has been activated successfully");
        console.log(data.message);
        setTimeout(function () {
          navigateLogin("/login");

          
        },2000)
      }
    } catch (error) {
      seterrormas(error.response.data.message);
      console.log(error.response.data.message);
    }
    setloading(false);
  }
  const registerUser = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: getRegister,
    validate: function (values) {
      seterrormas(null);
      setsuccessmag(null);
      const errors = {};

      if (!values.name.match(/^[A-Za-z ]{3,18}$/)) {
        errors.name = "Name must be 3 to 18 characters and only letters.";
      }

      if (!values.email.match(/^[A-Za-z0-9]{3,20}@gmail\.com$/)) {
        errors.email =
          "Email must be 3 to 20 characters before @gmail.com and only contain letters and numbers.";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "Phone must be 11 characters and start with 01";
      }
      if (
        !values.password.match(
          /^[a-z0-9]{6,20}$/
        )
      ) {
        errors.password =
          "Password must be 6 to 20 characters long";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "rePassword must be same Password";
      }
      return errors;
    },
  });

  return (
    <>
    <div className="registerBack  overflow-hidden">
      <div className=" registerShadow py-5 w-25 bg-white shadow my-5 m-auto position-relative  px-3 rounded-4">
        <form onSubmit={registerUser.handleSubmit}>
          {errormas ? (
            <div className="errormass d-flex justify-content-center align-items-center text-white fs-4">
              <i class="fa-solid fa-circle-xmark text-white me-2 fa-2xl"></i>{" "}
              {errormas}
            </div>
          ) : (
            ""
          )}
          {successmag ? (
            <div className="successmag d-flex justify-content-center align-items-center text-white fs-4">
              <i class="fa-solid fa-check-double fa-2xl me-2"></i> {successmag}
            </div>
          ) : (
            ""
          )}
          <h3 className=" text-center" style={{color:'#34434D',fontWeight:'bolder'}}>Register Now</h3>
          <div className="form-floating my-4">
            <input
              onChange={registerUser.handleChange}
              value={registerUser.values.name}
              type="text"
              id="name"
              className=" form-control my-4"
              placeholder="Name"
              autoComplete="name"
              onBlur={registerUser.handleBlur}
            />
            <label htmlFor="name">Name</label>
            {registerUser.errors.name && registerUser.touched.name ? (
              <div className="alert alert-success is-invalid" role="alert">
                {registerUser.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating">
            <input
              onChange={registerUser.handleChange}
              value={registerUser.values.email}
              type="email"
              id="email"
              placeholder="email"
              className=" form-control my-4"
              onBlur={registerUser.handleBlur}
              autoComplete="email"
            />
            <label htmlFor="email">Email address</label>
            {registerUser.errors.email && registerUser.touched.email ? (
              <div className="alert alert-success" role="alert">
                {registerUser.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating my-4">
            <input
              onChange={registerUser.handleChange}
              value={registerUser.values.phone}
              type="tel"
              id="phone"
              placeholder="phone"
              className=" form-control my-4"
              onBlur={registerUser.handleBlur}
              autoComplete="phone"
            />

            <label htmlFor="phone">Phone</label>
            {registerUser.errors.phone && registerUser.touched.phone ? (
              <div className="alert alert-success" role="alert">
                {registerUser.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating">
            <input
              onChange={registerUser.handleChange}
              value={registerUser.values.password}
              type="password"
              id="password"
              placeholder="Password"
              className=" form-control my-4"
              onBlur={registerUser.handleBlur}
              autoComplete="password"
            />

            <label htmlFor="password">Password</label>
            {registerUser.errors.password && registerUser.touched.password ? (
              <div className="alert alert-success" role="alert">
                {registerUser.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating my-4">
            <input
              onChange={registerUser.handleChange}
              value={registerUser.values.rePassword}
              type="password"
              id="rePassword"
              placeholder="rePassword"
              className=" form-control my-4"
              onBlur={registerUser.handleBlur}
              autoComplete="rePassword"
            />
            <label htmlFor="rePassword">RePassword</label>
            {registerUser.errors.rePassword &&
            registerUser.touched.rePassword ? (
              <div className="alert alert-success " role="alert">
                {registerUser.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" d-flex justify-content-end">
            <button
              type="sumbit"
              disabled={!registerUser.dirty || !registerUser.isValid}
              className="btn1 btn btn-success fs-5 "
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
    </>
  );
}
