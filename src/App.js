import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categroies from "./Components/Categroies/Categroies";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ForgetPassword from "./Components/Forget Password/ForgetPassword";
import Authcontext from "./Context/athucontext";
import Profile from "./Components/Profile/Profile";
import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDatiels from "./Components/ProductDatails/ProductDatiels";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payemnt/Payment";
import CartContextProvider from "./Components/CartContext/CartContext";
import Allorders from "./Components/Allorders/Allorders";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectRoute>
            <Products />
          </ProtectRoute>
        ),
      },
     
      {
        path: "Products",
        element: (
          <ProtectRoute>
            <Products />
          </ProtectRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectRoute>
            {" "}
            <Brands />
          </ProtectRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectRoute>
            <Cart />
          </ProtectRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectRoute>
            <Allorders/>
          </ProtectRoute>
        ),
      },
      {
        path: "Categroies",
        element: (
          <ProtectRoute>
            <Categroies />
          </ProtectRoute>
        ),
      },
      {
        path: "ProductDatiels/:id",
        element: (
          <ProtectRoute>
            <ProductDatiels />
          </ProtectRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "Famms", element: <Login /> },
      { path: "Register", element: <Register /> },
      {
        path: "Profile",
        element: (
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectRoute>
            <Payment/>
          </ProtectRoute>
        ),
      },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "*", element: <NotFound /> },
      {},
    ],
  },
]);
function App() {
  const queryProvider = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryProvider}>
        <CartContextProvider>
          <Authcontext>
            <RouterProvider router={router} />
          </Authcontext>
        </CartContextProvider>
        <Toaster/>
      </QueryClientProvider>
    </>
  );
}

export default App;
