import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bars, RevolvingDot } from "react-loader-spinner";
import "./productdtails.css";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductDatiels() {
  const { id } = useParams();
  const { AddproductsCart } = useContext(cartContext);
  const [loadingProducts, setloadingProducts] = useState(false);

  function ProductDatailsApi() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery("ProsuctsDatails", ProductDatailsApi);
  if (isLoading) {
    return (
      <div className=" vh-100 productloader d-flex justify-content-center  align-items-center">
        <RevolvingDot
          visible={true}
          height="80"
          width="80"
          color="#000000"
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function AddCartDatilas(id) {
    setloadingProducts(true);
    const res = await AddproductsCart(id);
    if (res.status === "success") {
      toast.success(res.message.split(" ").slice(0, 3).join(" "), {
        position: "top-center",
        duration: 3000,
        className: " bg-success text-white rounded-5",
      });
    }
    setloadingProducts(false);
  }

  return (
    <>
      <div className=" container py-5">
        <div className="row">
          <div className=" col-md-4 py-4 ">
            <div className=" shadow ">
              <Slider {...settings}>
                {data?.data.data.images.map(function (image, index) {
                  return (
                        <div className="d-flex justify-content-center  align-items-center">
                        <img
                      className="w-75 "
                      style={{ height: "300px" }}
                      key={index}
                      src={image}
                      alt=""
                    />
                        </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className=" col-md-8 py-5">
            <div className=" text-center">
              <h4 style={{color:'#34434D',fontWeight:'bolder'}}>{data?.data.data.title}</h4>
              <p className="descriptiondatilas pt-0">
                {data?.data.data.description}
              </p>
              <div className=" py-0 d-flex  justify-content-around pricedatails">
                <h5 className="descriptiondatilas headdatails ">
                  <span className="text-dark">Category</span> :{" "}
                  {data?.data.data.category.name}
                </h5>
                <h5 className="descriptiondatilas headdatails">
                  <span className="text-dark">Brand</span> :{" "}
                  {data?.data.data.brand.name}
                </h5>
              </div>
              <div className="d-flex  justify-content-around pricedatails">
                <div class="price">
                  <span class="original-price px-2 headdatails">
                    <span className="text-dark">price</span>:{" "}
                    {data?.data.data.price}{" "}
                    <span className="rating-color">EGP</span>
                  </span>
                  {data?.data.data.priceAfterDiscount ? (
                    <span class="discounted-price headdatails">
                      {" "}
                      <span className="text-dark">AfterDiscount</span>:{" "}
                      {data?.data.data.priceAfterDiscount} EGP
                    </span>
                  ) : (
                    <span class="discounted-price headdatails ">
                      <span className="text-dark">AfterDiscount</span> :{" "}
                      {data?.data.data.price / 2}EGP
                    </span>
                  )}
                  {/* */}
                </div>
                <div>
                  <h6 className=" fs-5 ratingsAverage">
                    {data?.data.data.ratingsAverage}{" "}
                    <i class="fa-solid fa-star fs-5 rating-color"></i>
                  </h6>
                </div>
              </div>
              <button
                onClick={() => AddCartDatilas(data?.data.data.id)}
                type="button"
                class=" rounded-5 btn btn-outline-success mt-3 form-control fs-6"
              >
                {loadingProducts ? (
                  <div className=" d-flex justify-content-center align-items-center">
                    <Bars
                      height="30"
                      width="30"
                      color=" #fff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  "+ Add Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
