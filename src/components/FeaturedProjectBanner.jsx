import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import featuredBannerDesktop from '../assets/images/featured-img.png'
import featuredBannerMobile from '../assets/images/featured-mobile-banner.jpg'
import config from '../config';

export default function FeaturedProjectBanner( {detailPageFeatured} ) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust width as needed for mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredBanner = isMobile ? featuredBannerMobile : featuredBannerDesktop;
  return (
    <>
    <div className='home-services-sec position-relative home-team-sec featured-banner'  style={{ backgroundImage: `url(${config.BASE_URL}${detailPageFeatured?.featuredImage})` }}>
      <img src={config.BASE_URL + detailPageFeatured?.featuredImage} />
        {/* <div className='blur-left'></div> */}
        <div className='blur-right'></div>
        <div className='home-services-inner d-flex'>
            <div className='home-service-left' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                <span className='font-11 text-uppercase text-white'>OUR WORK</span>
                <h2 className='text-white font-thin'>explore IVEY design and build projects</h2>
            </div>
            <div className='home-service-right'>
                <div className='home-featured-center text-white' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                    <span className='font-11 font-medium text-uppercase'>FEATURED</span>
                    <h2>{detailPageFeatured?.title}</h2>
                    <Link to={"/single-project/" + detailPageFeatured?.slug} className='view-all text-uppercase font-11 text-white'>VIEW </Link>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}
