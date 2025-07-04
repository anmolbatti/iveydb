import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo from '../assets/images/logoDark.png';
import Experience from '../assets/images/experience.png';
import Experience1 from '../assets/images/experience1.png';
import Experience2 from '../assets/images/experience2.png';
import Experience3 from '../assets/images/experience3.png';

const slides = [
    {
        image: Experience1,
        text: 'Chauffeured site and showroom visits',
    },
    {
        image: Experience3,
        text: 'Personalized material presentations',
    },
    {
        image: Experience2,
        text: 'Showroom tours and visits with your clients',
    },
    {
        image: Experience3,
        text: 'Personalized material presentations',
    },
];

const IveyExperience = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '78px',
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                },
            },
        ],
    };

    const progressPercentage = ((currentSlide % slides.length) + 1) / slides.length * 100;

    return (
        <div className='ivey-experience-section color-dark py-60 d-py-100 position-relative'>
            <div className='wrapper ps-30 d-ps-80'>
                <div className='grid-blocks d-flex align-center gap-50 d-gap-0'>
                    <div className='grid-block left-grid'>
                        <div className='h6 font-medium mb-15'>WELCOME TO THE</div>
                        <img src={Logo} className='logo mb-30' alt='' />
                        <img src={Experience} className='experience-img' alt='' />
                    </div>
                    <div className='grid-block right-grid'>
                        <div className='experience-slider mb-20'>
                            <Slider {...settings}>
                                {slides.map((slide, index) => (
                                    <div key={index} className="px-4">
                                        <div className="slider-item d-flex align-center">
                                            <img
                                                src={slide.image}
                                                alt={`Slide ${index + 1}`}
                                                className="cover"
                                            />
                                            <p className="text-block">{slide.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-bar-wrapper w-100 overflow-hidden position-absolute top-0 start-0">
                            <div
                                className="progress-bar h-100"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IveyExperience;
