import axios from 'axios'
import React from 'react'
import { RevolvingDot } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import './Categroy.css'

export default function Categroies() {
function getCategrioes() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 const {data,isLoading}=useQuery("allCategrios",getCategrioes)
const catgroy= data?.data.data;



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
  return <>
  <div className=' container py-5'>
    <div className='row gy-5'>
      {catgroy.map(function (product) { return <div className=' col-md-4'>
        <div className=' shadow catgroyHover productgruop overflow-hidden position-relative'>
          <img src={product.image} className='w-100 ' style={{height:"400px"}} alt={product.name} />
          <div className='innerCatagroy d-flex justify-content-center align-items-center  rounded-5'>
            <h5 className='text-center' style={{fontWeight:'bolder',color:' #2CB72E'}}>{product.name}</h5>

          </div>

        </div>

      </div>})}
    


    </div>

  </div>
  
  
  
  
  
  
  
  
  
  
  
  </>
}
