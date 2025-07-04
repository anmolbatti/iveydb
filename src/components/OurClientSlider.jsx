import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import serviceslider1 from '../assets/images/home-slider1.png';
import serviceslider2 from '../assets/images/homeslider2.png';
import serviceslider3 from '../assets/images/dining-room.png';
import serviceslider4 from '../assets/images/meeting-room.png';
import serviceslider5 from '../assets/images/Turnberry-img.png';
import serviceslider6 from '../assets/images/Turnberry-img1.png';
import servicelogo1 from '../assets/images/logo1.svg';
import servicelogo2 from '../assets/images/logo2.svg';
import servicelogo3 from '../assets/images/logo3.svg';
import servicelogo4 from '../assets/images/logo4.svg';
import servicelogo5 from '../assets/images/logo5.svg';
import servicelogo6 from '../assets/images/logo6.svg';
import servicelogo7 from '../assets/images/logo7.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OurClientSlider = () => {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const [syncIndex, setSyncIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,        
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setSyncIndex(newIndex),
    responsive: [
      {
        breakpoint:1024,
        settings: {
          slidesToShow: 4,
          centerMode: true,
          centerPadding: '70px',
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '70px',
        },
      },
      {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            centerMode: true,
            centerPadding: '40px',
          },
      },
    ]
  };

  const logosettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,        
    autoplaySpeed: 3000,
    centerMode: true, 
    centerPadding: '0',
    beforeChange: (oldIndex, newIndex) => setSyncIndex(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
        },
      },
      {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '90px',
          },
      },
    ] 
  };

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      sliderRef1.current.slickGoTo(syncIndex);
      sliderRef2.current.slickGoTo(syncIndex);
    }
  }, [syncIndex]);

  return (
    <div className="home-slider client-slider">
      <div className='homeslider-botmsec position-relative' data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
        <div className='homslider-services'>
          <Slider {...settings} ref={sliderRef1}>
            <div className='homslider-services-img'>
              <img src={serviceslider1} alt="slider" />
            </div>
            <div className='homslider-services-img'>
              <img src={serviceslider2} alt="slider" />
            </div>
            <div className='homslider-services-img'>
              <img src={serviceslider3} alt="slider" />
            </div>
            <div className='homslider-services-img'>
              <img src={serviceslider4} alt="slider" />
            </div>
            <div className='homslider-services-img'>
              <img src={serviceslider5} alt="slider" />
            </div>
            <div className='homslider-services-img'>
              <img src={serviceslider6} alt="slider" />
            </div>
          </Slider>
        </div>

        <div className='homslider-services-logo'>
          <Slider {...logosettings} ref={sliderRef2}>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo1} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo2} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo3} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo4} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo5} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo6} alt="slider" />
            </div>
            <div className='homslider-services-logo-img'>
              <img src={servicelogo7} alt="slider" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default OurClientSlider