import React, { useContext, useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { athuContext } from "../../Context/athucontext";
import toast from "react-hot-toast";
// import { logDOM } from "@testing-library/react";

export default function Login() {
 const {settoken}= useContext(athuContext)
  const [errormas, seterrormas] = useState(null);
  // const [successmag, setsuccessmag] = useState(null);
  const [loading, setloading] = useState(false);
  const navigateLogin = useNavigate();

  async function getRegister(values) {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        toast.success("Welcome to the FreshCart website", {
          position: "top-center",
          duration: 3000,
          className: " bg-success text-white rounded-5",
        });
        localStorage.setItem("ktn",data.token);
        settoken(data.token);
        setTimeout(function () {
          navigateLogin("/Products");
        },1500);
      }
    } catch (error) {
      seterrormas(error.response.data.message);
      console.log(error.response.data.message);
    }
    setloading(false);
  }
  const registerUser = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: getRegister,
    validate: function (values) {
      seterrormas(null);
      const errors = {};

      if (!values.email.match(/^[A-Za-z0-9]{3,20}@gmail\.com$/)) {
        errors.email =
          "Email must be 3 to 20 characters before @gmail.com and only contain letters and numbers.";
      }

      if (
        !values.password.match(
          /^[a-z0-9]{6,20}$/
        )
      ) {
        errors.password =
          "Password must be 6 to 20 characters long";
      }

      return errors;
    },
  });

  return (
    <>
    <div className="loginback overflow-hidden">
      <div className=" py-5 w-25 m-auto position-relative bg-light formshadow mt-5 px-3 rounded-4">
        <form onSubmit={registerUser.handleSubmit}>
          {errormas ? (
            <div className="errormass d-flex justify-content-center align-items-center text-white fs-4">
              <i class="fa-solid fa-circle-xmark text-white me-2 fa-2xl"></i>{" "}
              {errormas}
            </div>
          ) : (
            ""
          )}
          {/* {successmag ? (
            <div className="successmag d-flex justify-content-center align-items-center text-white fs-4">
              <i class="fa-solid fa-check-double fa-2xl me-2"></i> {successmag}
            </div>
          ) : (
            ""
          )} */}
          <h3 className=" text-center" style={{color:'#34434D',fontWeight:'bolder'}}>Login Now</h3>
      
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
          <div className=" btn3 d-flex  justify-content-between">
            <Link to={'/ForgetPassword'}><button type="button" className="btn1 btn btn-success fs-5 ">Forget Password</button>
            </Link>
            <button type="sumbit" disabled={!registerUser.dirty || !registerUser.isValid}
              className="btn1 btn btn-success fs-5 ">
              {loading ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  className='ColorRing'
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
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
    </>
  );
}
