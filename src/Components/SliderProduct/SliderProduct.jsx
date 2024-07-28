import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false

  };

export default function SliderProduct() {
  return <>
   <Slider {...settings}>
      <div>
        <img style={{height:"400px"}} className=' w-100' src={require('../../images/slider-image-1.jpeg')} alt="" />
      </div>
      <div>
      <img style={{height:"400px"}} className=' w-100 ' src={require('../../images/slider-image-2.jpeg')} alt="" />

      </div>
      <div>
      <img style={{height:"400px"}} className=' w-100' src={require('../../images/slider-image-3.jpeg')} alt="" />
      </div>
      <div>
      <img style={{height:"400px"}} className=' w-100' src={require('../../images/slider-2.jpeg')} alt="" />
      </div>
    </Slider>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
}
