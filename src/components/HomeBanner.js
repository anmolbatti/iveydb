import React from 'react'
// import logourl from '../assets/images/site-logo.png';
import logourl from '../assets/images/banner-logo.png';
import homeBanner from '../assets/images/home-banner.jpg';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function HomeBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,        
    autoplaySpeed: 4000,
    // responsive: [
    //   {
    //     breakpoint: 767,
    //     settings: {
    //       autoplay: false,
    //     },
    //   },
    // ]
  };
  return (
    <>
    <div className="home-banner text-white d-flex">
      <div className="home-banner-slider">
        {/* <Slider {...settings}>
          <div className='homeslider-image'> 
            <img src={homeBanner} alt="slider" />
          </div>
          <div className='homeslider-image'>
            <img src={homeBanner} alt="slider" />
          </div>
          <div className='homeslider-image'>
            <img src={homeBanner} alt="slider" />
          </div>
        </Slider> */}

<div className='homeslider-image'> 
            <img src={homeBanner} alt="slider" />
          </div>
          
        <div className="slider-scrollbar"></div>
      </div>
        <Link to="/" className="header-logo">
            <img src={logourl} alt="header-logo" />
        </Link>
        <div className='banner-botm d-flex justify-content-center border-right text-white'>
            <span className='banner-botm-text font-13'> <Link className='text-white' to={"/projects"}>PROJECTS</Link></span>
            <span className='banner-botm-text font-13'><Link className='text-white' to={"/about"}>ABOUT</Link></span>
            {/* <span className='banner-botm-text font-13'>ABOUT</span> */}
            <span className='banner-botm-text font-13'><Link className='text-white' to={"/inspiration"}>INSPIRATION</Link></span>
        </div>
        {/* <div className='border-bottom position-absolute'></div> */}
    </div>
    </>
  )
}
