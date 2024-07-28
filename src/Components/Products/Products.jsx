import axios from "axios";
import "./Product.css";
import { Bars, RevolvingDot } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from "../SliderProduct/SliderProduct";
import SliderCategory from "../SliderCategory/SliderCategory";
import { Link } from "react-router-dom";
import {useContext, useState}   from "react";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
export default function Products() {
  const {AddproductsCart} = useContext(cartContext)
const [loadingProducts, setloadingProducts] = useState(false)


  function getAllProductsApi() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading } = useQuery("Allproducts", getAllProductsApi);
  const product = data?.data.data;
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
  async function AddCartProduct(id) {
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
      <div className=" container  text-center py-4">
        <div className="row gx-0 pb-3">
          <div className="col-md-9">
            <SliderProduct />
          </div>
          <div className="col-md-3 itemsSlider">
            <img
              className=" w-100"
              style={{ height: "200px" }}
              src={require("../../images/blog-img-1.jpeg")}
              alt=""
            />
            <img
              className=" w-100"
              style={{ height: "200px" }}
              src={require("../../images/blog-img-2.jpeg")}
              alt=""
            />
          </div>
        </div>
        <div className="row py-4">
          <div className="col-md-12">
            <SliderCategory/>

          </div>

        </div>

        <div className="row gy-4 py-5">
          {product.map(function (product, index) {
            return (
              <div key={index} className=" col-md-3">
                <div className="productgruop overflow-hidden shadow">
                <Link to={`/ProductDatiels/${product.id}`}>
                  <Slider {...settings}>
                    {product.images.map(function (image, index) {
                      return (
                        <img className="w-100" key={index} src={image} alt="" />
                      );
                    })}
                  </Slider>

                  <div className="  pt-4">
                    <h5 className=" pt-2 pb-0 mainProduct">
                      {product.category.name}
                    </h5>
                    <h6 className="py-0 productTitle">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h6>
                    <div className=" d-flex    justify-content-between align-items-center px-2">
                      <h6 className="text-dark fs-6 productTitle">
                        {product.price} <span className="rating-color">EGP</span>
                      </h6>
                      <h6 className="productTitle">
                        {product.ratingsAverage}
                        <i class="fa-solid fa-star px-1 mainProduct rating-color"></i>
                      </h6>
                    </div>
                  </div>
                </Link>
                <button onClick={function () {AddCartProduct(product.id)}}  className=" btn btn-outline-success form-control mb-2 rounded-4"> 
                  {loadingProducts?<div className=" d-flex justify-content-center align-items-center">
                    <Bars
                      height="30"
                      width="30"
                      color=" #fff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div> :"+Add Cart"}
                </button>
               
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
