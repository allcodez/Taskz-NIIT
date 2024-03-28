import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './slider.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App({hideProp, sliderContent}) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={`custom-slide slide1 ${hideProp}`}>
            <p className={`${sliderContent}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit incidunt repudiandae possimus voluptas aliquid.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide2 ${hideProp}`}>
            <p className={`${sliderContent}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit incidunt repudiandae possimus voluptas aliquid.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide3 ${hideProp}`}>
            <p className={`${sliderContent}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit incidunt repudiandae possimus voluptas aliquid.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide4 ${hideProp}`}>
            <p className={`${sliderContent}`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit incidunt repudiandae possimus voluptas aliquid.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
