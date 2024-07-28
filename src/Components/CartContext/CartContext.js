import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [products, setproducts] = useState(null);
  const [cartItems, setcartItems] = useState(null);
  async function AddproductsCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: { token: localStorage.getItem("ktn") },
        }
      );
      getProductsCart()
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async function getProductsCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("ktn") },
        }
      );
      setproducts(data.data.products);
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setcartItems(data.data._id)
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
  async function deleteProductCart(productid) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        {
          headers: { token: localStorage.getItem("ktn") },
        }
      );
      setproducts(data.data.products);
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function UpdataProductCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: { token: localStorage.getItem("ktn") },
        }
      );
      setproducts(data.data.products);
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductsCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("ktn") },
        }
      );
      setproducts([]);
      setnumOfCartItems(0);
      settotalCartPrice(0);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  }


  useEffect(() => {
    getProductsCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        AddproductsCart,
        getProductsCart,
        numOfCartItems,
        totalCartPrice,
        products,
        deleteProductCart,
        UpdataProductCart,
        removeProductsCart,
        cartItems,
        setproducts,
        setnumOfCartItems,
        settotalCartPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
