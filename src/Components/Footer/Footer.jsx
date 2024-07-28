import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="py-5  bg-main-light">
        '
        <div className=" container">
          <h3
            className="main"
            style={{ color: "#3AB73D", fontWeight: "bolder" }}
          >
            Get the FreshCart app
          </h3>
          <h6 className="main1" style={{ fontWeight: "bolder" }}>
            We can send you alink ,it open it on your phone to download the app
          </h6>
          <div className="row">
            <div className=" col-md-6 footer">
              <input
                type="email"
                placeholder="Email"
                className="  form-control my-2"
              />
            </div>
            <div className="col-md-3">
              <button
                type="sumbit"
                style={{ color: "#3AB73D", fontWeight: "bolder" }}
                className="border-0 py-2 px-3 rounded-2 my-2 btnfotgot "
              >
                Shre APP Link
              </button>
            </div>
            <div className="col-md-3">
              <p
                className="fw-bold"
                style={{ color: "#3AB73D", fontWeight: "bolder" }}
              >
                Payment Partners
              </p>
              <img
                src={require("../../images/MasterCard_Logo.svg.webp")}
                width={50}
                alt=""
                className="mx-2"
              />
              <img
                src={require("../../images/download.png")}
                width={40}
                className="mx-2"
                alt=""
              />
              <img src={require("../../images/images.png")} width={40} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
