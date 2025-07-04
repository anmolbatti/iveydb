import React, { useEffect, useState } from 'react';
import config from '../config';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";
import { LightgalleryItem } from "react-lightgallery";

export default function SingleProjectGallery({project}) {
    const [featuredImages, setFeaturedImages] = useState([]);
    const settings = {
        dots: false,
        infinite: true, 
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '220px',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1481, settings: { slidesToShow: 3, centerPadding: '120px' } },
            { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '140px' } },
            { breakpoint: 991, settings: { slidesToShow: 2, centerPadding: '100px' } },
            { breakpoint: 767, settings: { slidesToShow: 2, centerPadding: '80px' } },
            { breakpoint: 575, settings: { slidesToShow: 1, centerPadding: '60px' } },
        ],
    };

    console.log("project: ", project);

    useEffect(() => {
        if(project){
            setFeaturedImages(project?.galleryImages)
        }
    }, [project]);

    return (
        <>
        <LightgalleryProvider
            lightgallerySettings={
                    {
                        download: false
                        // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
                    }
                }                
            >
            <div className='single-project-featured-gallery d-grid'>
                <div className='single-project-featured-gallery-items' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                    {featuredImages[0] && (
                        <div className='single-project-featured-gallery-img featured-large-img'>
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[0]}`}>                                    
                                <img src={`${config.BASE_URL}${featuredImages[0]}`} alt="gallery" />                                    
                            </LightgalleryItem>
                        </div>
                    )}
                    {featuredImages[1] && (
                        <div className='single-project-featured-gallery-img' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[1]}`}>                                    
                                <img src={`${config.BASE_URL}${featuredImages[1]}`} alt="gallery" />                                    
                            </LightgalleryItem>
                        </div>
                        )}
                    {featuredImages[2] && (
                        <div className='single-project-featured-gallery-img' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[2]}`}>
                                <img src={`${config.BASE_URL}${featuredImages[2]}`} alt="gallery" />
                            </LightgalleryItem>
                        </div>
                    )}
                </div>
                <div className='single-project-featured-gallery-items'>
                    {featuredImages[3] && (
                        <div className='single-project-featured-gallery-img' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[3]}`}>
                                    <img src={`${config.BASE_URL}${featuredImages[3]}`} alt="gallery" />
                            </LightgalleryItem>
                        </div>
                    )}
                        {featuredImages[4] && (
                    <div className='single-project-featured-gallery-img' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                        <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[4]}`}>
                                <img src={`${config.BASE_URL}${featuredImages[4]}`} alt="gallery" />
                                </LightgalleryItem>
                    </div>
                        )}
                        {featuredImages[5] && (
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${featuredImages[5]}`}>
                    <div className='single-project-featured-gallery-img featured-large-img' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
                                <img src={`${config.BASE_URL}${featuredImages[5]}`} alt="gallery" />
                    </div>
                    </LightgalleryItem>
                        )}
                </div>
            </div>
        </LightgalleryProvider>

        <LightgalleryProvider
            lightgallerySettings={
                    {
                        download: false
                        // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
                    }
                }
                galleryClassName="my_custom_classname"
            >            
            <div className='single-project-gallery-slider position-relative'>
                <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
                    <Slider {...settings} data-aos="fade-up">
                        {featuredImages.map((image, index) => (
                            <LightgalleryItem group="any" src={`${config.BASE_URL}${image}`}>
                                <div key={index} className='single-project-gallery-img'>
                                    <img src={`${config.BASE_URL}${image}`} alt={`gallery ${index}`} />
                                </div>
                            </LightgalleryItem>
                        ))}
                    </Slider>
                </div>
            </div>
            </LightgalleryProvider>

        </>
    )
}