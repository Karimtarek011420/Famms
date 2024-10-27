import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { athuContext } from "../../Context/athucontext";
import { cartContext } from "../CartContext/CartContext";

export default function Navbar() {
  const { token, settoken } = useContext(athuContext);
  const {numOfCartItems} = useContext(cartContext)
  const logNavgite = useNavigate();
  function getLogout() {
    localStorage.removeItem("ktn");
    settoken(null);
    logNavgite("/Login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg pt-3 d-flex justify-content-center ">
        <div className="container">
         <Link style={{fontWeight:'bolder'}} className="navbar-brand fs-2" to="/Products">
         <img src={require('../../images/icon1.webp')} style={{width:'40px'}} alt="Logo" className="img-fluid" />
            F<span className=" text-success">a</span>mms
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse pt-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Products"
                    >
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/Cart">
                      Cart
                      <span class="position-absolute top-0 start-110 translate-middle badge rounded-pill  bg-success">
                        {numOfCartItems}+
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Categroies">
                      Categroies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                    AllOrders
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex justify-content-center align-items-center">
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-brands fa-lg me-2 fa-twitter"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-brands fa-lg me-2 fa-linkedin"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-brands fa-lg me-2 fa-instagram"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-brands  fa-lg me-2 fa-youtube"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-brands fa-lg me-2 fa-tiktok"
                ></i>
              </li>
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Profile"
                    >
                      <i className="fa-solid fa-user fs-4"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={getLogout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
