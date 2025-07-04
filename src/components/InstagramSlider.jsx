import React from 'react';
import instagramimage from '../assets/images/instagram.svg' ;
import { Link } from 'react-router-dom';
import instagallery1 from '../assets/images/instagallery1.png';
import instagallery2 from '../assets/images/instagallery2.png';
import instagallery3 from '../assets/images/instagallery3.png';
import instagallery4 from '../assets/images/instagallery4.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function InstagramSlider() {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 800,
        arrows: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        centerMode: false, 
        autoplay: true,        
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2.5,
                },
              },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              },
            },
            {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  centerMode:true,
                },
            },
        ]
    };
  return (
    <>
    <div className='instagram-sec'>
        <div className='instagram-top-sec' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
          <Link className='d-flex' to="https://www.instagram.com/ivey_design_build" target="_blank"><h6 className='font-12 text-uppercase text-white'>FOLLOW OUR INSTAGRAM</h6><img src={instagramimage} alt="instagram" /></Link>
        </div>
        <div className='instagram-slider' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
            <Slider {...sliderSettings}>
            <div className='instagram-img'>
                <img src={instagallery1} alt="gallery"/>
            </div>
            <div className='instagram-img'>
                <img src={instagallery2} alt="gallery"/>
            </div>
            <div className='instagram-img'>
                <img src={instagallery3} alt="gallery"/>
            </div>
            <div className='instagram-img'>
                <img src={instagallery4} alt="gallery"/>
            </div>
            </Slider>
        </div>
    </div>
      
    </>
  )
}
