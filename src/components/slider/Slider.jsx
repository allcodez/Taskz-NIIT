import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './slider.css'
import svg1 from '../../asstes/images/undraw_to_do_list_re_9nt7.svg'
import svg2 from '../../asstes/images/undraw_add_tasks_re_s5yj.svg'
import svg3 from '../../asstes/images/undraw_push_notifications_re_t84m.svg'
import svg4 from '../../asstes/images/undraw_complete_task_re_44tb.svg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App({ hideProp, sliderContent }) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: true,
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
            <div className='custom-slide-img'>
              <img src={svg1} alt="dd" />
            </div>
            <p className={`${sliderContent}`}>Create, manage, and prioritize your tasks efficiently. Our task manager allows you to keep all your tasks organized and easily accessible.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide2 ${hideProp}`}>
            <div className='custom-slide-img'>
              <img src={svg2} alt="dd" />
            </div>

            <p className={`${sliderContent}`}>Reflecting the clean and intuitive interface of Star Taskz, our app ensures that you can navigate and manage your tasks with ease.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide3 ${hideProp}`}>
            <div className='custom-slide-img'>
              <img src={svg3} alt="dd" />
            </div>

            <p className={`${sliderContent}`}>Visualize your progress and get notified before the deadline. Our progress tracking features help you stay on top of your workload.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`custom-slide slide4 ${hideProp}`}>
            <div className='custom-slide-img'>
              <img src={svg4} alt="dd" />
            </div>

            <p className={`${sliderContent}`}>Experience the productivity and satisfaction of completing tasks. Our app provides a sense of accomplishment with every task you finish.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
