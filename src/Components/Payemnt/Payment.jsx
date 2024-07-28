import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cartItems, setproducts, setnumOfCartItems, settotalCartPrice } =
    useContext(cartContext);
  const oreder = useNavigate();
  async function PaymentCart() {
    const phone = document.querySelector("#floatingInput1").value;
    const city = document.querySelector("#floatingInput2").value;
    const dtails = document.querySelector("#floatingInput3").value;
    const shippingAddress = {
      shippingAddress: {
        details: dtails,
        phone: phone,
        city: city,
      },
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartItems}`,
        shippingAddress,
        {
          headers: {
            token: localStorage.getItem("ktn"),
          },
        }
      );
      if (data.status === "success") {
        toast.success(" payment Sucessfuly", {
          position: "top-center",
          duration: 3000,
          className: " bg-success text-white rounded-5",
        });
        setTimeout(function () {
          oreder("/orders");
        }, 2000);
        setproducts([null])
        setnumOfCartItems(0)
        settotalCartPrice(0)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=" py-5 w-25 m-auto shadow my-5  rounded-5">
        <h1 className=" text-success text-center pb-2">Payment</h1>
        <form action="">
          <div class="form-floating mb-3 mx-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput1"
              placeholder="name@example.com"
            />
            <label for="floatingInput1"> Phone</label>
          </div>
          <div class="form-floating mb-3 3 mx-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput2"
              placeholder="name@example.com"
            />
            <label for="floatingInput2">City</label>
          </div>
          <div class="form-floating mb-3 3 mx-3">
            <textarea
              type="email"
              class="form-control"
              id="floatingInput3"
              placeholder="name@example.com"
            ></textarea>
            <label for="floatingInpu3">Datials</label>
          </div>
          <button
            onClick={PaymentCart}
            type="button"
            class="btn btn-success mx-3"
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}
