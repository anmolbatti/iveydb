import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import TeamBannerDesktop from '../assets/images/team-banner.jpg';
import TeamBannerMobile from '../assets/images/team-banner-mobile.jpg';



import config from '../config';

export default function HomeTeam() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust width as needed for mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const TeamBannerDesktop = '/team-banner.jpg';
  // const TeamBannerMobile = '/team-banner-mobile.jpg';
  const TeamBanner = isMobile ? TeamBannerMobile : TeamBannerDesktop;

  return (
    <>
    <div className='home-services-sec position-relative home-team-sec' data-aos="fade-up" data-aos-delay="2000" data-aos-duration="1000" style={{ backgroundImage: `url(${TeamBanner})` }}>
      <img src={TeamBanner} alt="" />
      {/* <div style={{ backgroundImage: `url(${TeamBanner})`, height: "100px", width: "200px" }}></div> */}
        <div className='blur-left'></div>
        <div className='blur-right'></div>
        <div className='home-services-inner d-flex'>
            <div className='home-service-left'>
                <span className='font-11 text-uppercase text-white'>ABOUT IVEY</span>
                <h2 className='text-white font-thin'>Kirk Ivey has worked internationally, using his expertise in construction, interior design, and IT architecture to provide a comprehensive solution for clients.</h2>
                <Link to="/about" className='view-all text-uppercase font-11 text-white'>LEARN MORE </Link>
            </div>
            <div className='home-service-right home-team-right'>
                <Link to="/" className='view-all text-uppercase font-11 text-white'>MEET THE TEAM </Link>
            </div>
        </div>
    </div>
      
    </>
  )
}
