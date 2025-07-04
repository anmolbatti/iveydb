import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowRightSLine } from "react-icons/ri";
import processImg1 from "../assets/images/process1.png"
import processImg2 from "../assets/images/process2.png"
import processImg3 from "../assets/images/process3.png"
import processImg4 from "../assets/images/process4.png"


const OurProcess = () => {
    const NextArrow = ({ onClick }) => (
        <div
                className="slick-arrow position-absolute"
                onClick={onClick}
            >
                <RiArrowRightSLine />
            </div>
            );
    const sliderSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '5%',
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1441,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '5%',
                },
            },
        ],
    };

    

    const slides = [
        {
            id: 1,
            Image: processImg1,
            heading: "from initial concept to final touches, our team is an integral part of your process",
            list: [
                "Review renderings with our expert team",
                "Establish clear, transparent cost estimates and timelines"
            ]
        },
        {
            id: 2,
            Image: processImg2,
            heading: "We use effective, transparent technology to keep you and your clients up to speed on progress ",
            list: [
                "Check in on each stage of your project with real-time photo and video ",
                "Give your clients the peace of mind of with 24/7 access to progress",
                "Permit progress tracking"
            ]
        },
        {
            id: 3,
            Image: processImg3,
            heading: "Source the best specs with a black car VIP touch with our team",
            list: [
                "Give your clients a VIP experience with the IVEY black car",
                "Meet as a team for full clarity when sourcing"
            ]
        },
        {
            id: 4,
            Image: processImg4,
            heading: "A turnkey, detailed finish clients don’t forget",
            list: [
                "Deep clean up after construction work at every phase",
                "All details finalized before final walkthrough",
                "A truly turnkey experience"
            ]
        },
        
    ];

    return (
        <>
            <div className='our-process-section py-60 d-py-100'>
                <div className='container'>
                    <div className='section-title d-ps-30 pb-30 d-pb-60'>
                        <h3 className='font10 font-medium uppercase'>Explore our portfolio</h3>
                    </div>
                </div>
                <div className='our-process-slider position-relative d-ps-60'>
                    <Slider {...sliderSettings}>
                        {slides.map(slide => (
                            <div className='process-slide pe-50'>
                                <div className='grid-blocks d-flex gap-40 align-center'>
                                    <div className='grid-block left-grid'>
                                        <img src={slide.Image} alt="" className="cover"/>
                                    </div>
                                    <div className='grid-block right-grid'>
                                        <div className='h3 mb-15 d-mb-20'>{slide.heading}</div>
                                        <ul className="text-gray-600 list-disc pl-5 space-y-2">
                                            {slide.list.map((item, index) => (
                                                <li className='mb-0 d-mb-5' key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default OurProcess