import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
import "./oredr.css"
export default function Allorders() {
  const [orders, setOrders] = useState(null);
  async function AllordersApi(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("ktn"));
    AllordersApi(id);
  }, []);
  if (orders === null) {
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

  return (
    <>
      <div className="  container py-5">
        <div className="row gy-4">
          {orders.map(function (order, ibex) {
            return (
              <div key={ibex} className=" col-md-6">
                <div className="innerOder shadow p-3">
                  <div className=" d-flex justify-content-between  align-items-center">
                  <h6 style={{ fontWeight: "bolder" }}>
                    {" "}
                    Name: {order.user.name}
                  </h6>
                  <h6 style={{ fontWeight: "bolder" }}>
                    {" "}
                    city: {order.shippingAddress.city}
                  </h6>
                  </div>
                  <div  className="infoOder d-flex justify-content-between  align-items-center">
                  <h6 style={{ fontWeight: "bolder" }}>
                    {" "}
                    Phone: {order.shippingAddress.phone}
                  </h6>
                  <h6 style={{ fontWeight: "bolder" }}>
                    totalOrderPrice: {order.totalOrderPrice}
                    <span className="rating-color"> Egp</span>
                  </h6>
                  </div>
                 
                  <div className="row gy-3 py-3">
                    {order.cartItems.map(function (item, itmeindex) {
                      return (
                        <div key={itmeindex} className=" col-md-3 shadow">
                          <img src={item.product.imageCover} className=" w-100 py-2" alt="" />
                          <h6  style={{ fontWeight: "bolder" }}>
                            {" "}
                            title: {item.product.title.split( ' ').slice(0,1).join( '')}
                          </h6>
                         <div  className="">
                         <h6 style={{ fontWeight: "bolder" }}>
                            {" "}
                            Count: {item.count}
                          </h6>
                          <h6 style={{ fontWeight: "bolder" }}>
                            {" "}
                            Price {item.price}{" "}
                            <span className="rating-color">Egp</span>
                          </h6>
                         </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
