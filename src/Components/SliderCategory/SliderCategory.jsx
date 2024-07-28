import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows:false

  };
export default function SliderCategory() {
function getSliderCategroy() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
const {data}=useQuery("AllSliderCatgeory",getSliderCategroy)
// const sliderCat= 


    return <>
    <Slider {...settings}>
       {data?.data.data.map(function (categroy,index) { return <div key={index}> <img style={{height:"250px"}} className=' pb-3 w-100' src={categroy.image} alt="" />
       </div>})}
     
     </Slider>
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   </>
}
