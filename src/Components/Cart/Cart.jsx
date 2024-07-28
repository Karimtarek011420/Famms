import React, { useContext } from 'react'
import { cartContext } from '../CartContext/CartContext'
import './Cart.css'
import toast from 'react-hot-toast';
import { RevolvingDot } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  
  const {numOfCartItems,totalCartPrice,products,deleteProductCart,UpdataProductCart,removeProductsCart} = useContext(cartContext);
 const navagateCart= useNavigate()
 async function deleteElement(id) {
   const res= await deleteProductCart(id);
   console.log(res);
   if(res.status === "success") {
    toast.success("product Removed", {
      position: "top-center",
      duration: 3000,
      className: " bg-success text-white rounded-5",
    });
  } 
  }
 async  function UpdataElement(id,count) {
   const res= await UpdataProductCart(id,count);
   if (res.status === "success") {
    toast.success("product updated", {
      position: "top-center",
      duration: 3000,
      className: " bg-success text-white rounded-5",
    });
  } 
    
  }
 async  function removeCart() {
   await removeProductsCart();
   toast.success("product removed", {
      position: "top-center",
      duration: 3000,
      className: " bg-success text-white rounded-5",
    });
    setTimeout(function name() {
      navagateCart('/Products')
    },500)
  }
  if (products===null) {
    return (
      <div className=" vh-100 productloader d-flex justify-content-center  align-items-center">
        <RevolvingDot
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="revolving-dot-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  } 
  return <>
  <div className=' container py-5 shadow'>
    <h6 style={{color:'#34434D',fontWeight:'bolder'}}> Shop Cart</h6>
    <h6 style={{color:'#000000',fontWeight:'bolder'}}>totalCartPrice: <span style={{color:'#34434D'}}>{totalCartPrice}</span><span className="rating-color"> EGP</span></h6> 
    <h6 className='pb-3' style={{color:'#000000',fontWeight:'bolder'}}>numOfCartItems: <span style={{color:'#34434D'}}>{numOfCartItems}</span> </h6>
    <div className='border-3 border-bottom pb-3 d-flex justify-content-between' >
    <button onClick={removeCart} type="button" class="btn btn-outline-success ">Clear Cart</button>
    <Link to='/payment'><button type="button" class="btn btn-outline-success "> Payment</button></Link>
    </div>
    <div className='row g-4 py-5'>
    {products.map(function(product,indv) { 
      return <div key={indv} className='col-md-3'> <div className='inner text-center shadow p-4'>
    <img src={product.product.imageCover}  className='w-100' alt="" />
      <h6 className=' py-3' style={{color:'#3AB73D'}}>{product.product.title.split(' ').slice(0,1).join(' ')}</h6>
    <div className=' d-flex justify-content-between align-items-center'>
      <h6 style={{fontWeight:"bolder"}} >{product.product.ratingsAverage}<i class="fa-solid fa-star mainProduct rating-color"></i> </h6>
      <h6 onClick={()=>deleteElement(product.product.id)} style={{cursor:'pointer'}}  className='deteleProduct'><i class="fa-solid fa-trash fa-2xl"></i></h6>
    </div>
    <div className=' d-flex justify-content-start align-items-center pt-2 '>
      <h6 onClick={()=>UpdataElement(product.product.id,product.count+1)} style={{cursor:'pointer',color:'#3AB73D'}} className=' border border-2 p-2'><i class="fa-solid fa-plus"></i></h6>
      <h6 className=' fs-6 mx-1'> {product.count}</h6>
      <h6 onClick={()=>UpdataElement(product.product.id,product.count-1)} style={{cursor:'pointer',color:'#3AB73D'}} className=' border border-2 p-2'><i class="fa-solid fa-minus"></i></h6>
    </div></div></div>})}
    </div>



  </div>
  
  
  
  
  
  </>
}

