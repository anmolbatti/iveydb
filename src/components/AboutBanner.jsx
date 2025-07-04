import React, {useEffect, useState} from 'react';
import aboutBannerDesktop from '../assets/images/about-banner.jpg';
import aboutBannerMobile from '../assets/images/about-banner-mobile.png';

import aboutBanner2 from '../assets/images/about-hero-banner.jpg';
import { Link } from 'react-router-dom';

export default function AboutBanner() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 767); // Adjust width as needed for mobile
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const aboutBanner = isMobile ? aboutBannerMobile : aboutBannerDesktop;
    return (
    <>
    <div className='about-banner position-relative'>
         <div className='about-banner-image position-absolute'>
            <div className='about-banner-image-wrapper position-relative'>
                <img src={aboutBanner2} alt="banner"/>
            </div>
        </div>
        <div className='home-services-inner' data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
            <span className='font-11 text-uppercase text-white'>ABOUT IVEY</span>
            <h2 className='text-white font-thin'>Kirk Ivy has worked internationally, using his expertise in construction, interior design, and IT architecture to provide a comprehensive solution for clients.</h2>
            <Link to="/" className='view-all text-uppercase font-11 text-white'>contact us </Link>
            
        </div>

        <div className='about-detail-sec d-flex'>
        <div className='about-detail-left-sec' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <p>By helping his family in remodeling their home, Kirk felt a calling and  immediately knew that his talents were meant for the building and design industry. Next, Kirk too on a position in construction management on a small plaza project. These two small steps into design and build management were a start towards building Ivey Design Build.</p>
            <p>Well known for his honest, competent, and diplomatic style, Kirk has worked in international markets, using his expertise in construction, interior design, and information technology architecture to provide a comprehensive solution for clients. His knowledge and attention to detail are unparalleled, which enabled him to build striking spaces on schedule while conserving budget.
            </p>
            <p>Ivey Design Build has supported the latest update to the Jetlinx airport,  luxury apartments in the Ritz Carlton residences, Marquis Building, Trump Towers, Presidential Estate, Bal Harbor Condominium, Armani Building, Turnberry Ocean Club, Regalia among others. Additionally, Ivey has acted as builder to major entities in Jamaica such as Super Clubs, Air Jamaica, Victoria Mutual Building Society. Additionally, Kirk has spearheaded projects for HNW residential clients in Miami, Florida, and the Hamptons.
            </p>
            <p>Following a decade of experience that has yielded exceptional results, Kirk Ivy still has more in store for the company. He aspires to maintain and continue <span className='font-bold' >exceeding the high standards of service rendering to all the clients the Ivey experience.</span>
            </p>
        </div>
        <div className='about-detail-right-sec'>
            <div className='featured-list d-grid'>
                <div className='featured-list-item d-flex flex-column'>
                    <span className='font-38 text-white'>150+</span>
                    <span className='featured-text font-11 text-white text-uppercase'>BUILD PROJECTS</span>
                </div>
                <div className='featured-list-item d-flex flex-column'>
                    <span className='font-38 text-white'>100+</span>
                    <span className='featured-text font-11 text-white text-uppercase'>DESIGN PROJECTS</span>
                </div>
                <div className='featured-list-item d-flex flex-column'>
                    <span className='font-38 text-white'>13+</span>
                    <span className='featured-text font-11 text-white text-uppercase'>years experience</span>
                </div>
                <div className='featured-list-item d-flex flex-column'>
                    <span className='font-38 text-white'>15+</span>
                    <span className='featured-text font-11 text-white text-uppercase'>CITIES SERVICED</span>
                </div>
            </div>  
        </div>
    </div>    
            



    </div>
    </>
   )
}
