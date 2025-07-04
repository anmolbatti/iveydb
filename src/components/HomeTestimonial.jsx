import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from "../../src/config"
import axios from 'axios';


export default function HomeTestimonial() {

  const sliderRef = useRef();

  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials data on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/get-testimonials`, {
          withCredentials: true
        });
        

        setTestimonials(response.data); // Assuming response.data contains the array of testimonials
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);
  
  const slidesToShow = testimonials.length <= 5 ? 3 : 5;

  const Arrow = () => {
    return (
      <button class="testimonial-slider-button"></button>
    );
  }

  const moveNextSlide = () => {
    if(sliderRef.current){
      sliderRef.current.slickNext();
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <Arrow />,    
    centerMode: true,
    centerPadding: '120px',
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1481,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '100px',
        }
      },
      // {
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 1,
      //     centerMode: true,
      //     centerPadding: '50px',
      //   }
      // },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '130px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '50px',
        }
      }
    ]
  };
  return (
    <>
      <div className="testimonial-slider position-relative">
        <div data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1000">
          <span className='font-10 testimonial-title position-absolute'>FROM OUR CLIENTS</span>
          <Slider {...settings} ref={sliderRef}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-slide" key={index}>
                <div className='testimonial-slide-img'>
                  <img src={`${config.BASE_URL}${testimonial.featuredImage}`} alt={`Slide ${index + 1}`} />
                </div>
                <div className='testimonial-desc'>
                  <h2 className='text-white'>“{testimonial.title}” 

                  <button type="button" onClick={moveNextSlide} data-role="none" className="slick-arrow slick-next testimonial-slider-button"></button>

                  </h2>
                  <p className='font-14 text-white'>{testimonial.description}</p>
                  <span className='client-name text-white font-10'>{testimonial.clientName}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
