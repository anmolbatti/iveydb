import React, { useState, useEffect } from 'react'
import HomeBanner from '../components/HomeBanner'
import HomeSlider from '../components/HomeSlider'
import featuredImgDesktop from '../assets/images/featured-img.png';
import featuredImgMobile from  '../assets/images/featured-mobile-banner.jpg';
import { Link } from 'react-router-dom';
import HomeRecentProject from '../components/HomeRecentProject';
import Layout from './layout';
import HomeServices from '../components/HomeServices';
import HomeTeam from '../components/HomeTeam';
import HomeRecentBlog from '../components/HomeRecentBlog';
import HomeTestimonial from '../components/HomeTestimonial';

import DownloadBrochure from '../components/DownloadBrochure';

import axios from "axios";
import config from '../config';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedHomeProject, setSelectedHomeProject] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Adjust width as needed for mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const fetchFeaturedProjects = async () => {
    try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/get-featured-projects`, { withCredentials: true });
        if(response){
            setSelectedHomeProject(response?.data.homePageFeatured);
        }
    } catch (err) {
        console.log("err: ", err.response.data);
    }
  };

  useEffect(() => {
      fetchFeaturedProjects();
  }, []);

  const featuredImg = isMobile ? featuredImgMobile : featuredImgDesktop;
  return (
    <Layout page={"home"}>
      <HomeBanner />
      <HomeSlider />
      <div className='home-featured' data-aos="fade-up" data-aos-delay="100" data-aos-duration="600" style={{ backgroundImage: `url(${config.BASE_URL}${selectedHomeProject?.featuredImage})` }}>
        <img src={config.BASE_URL + selectedHomeProject?.featuredImage} />
        <div className='blur-left'></div>
        <div className='blur-right'></div>
        <div className='featured-list d-grid'>
          <div className='featured-list-item d-flex flex-column'>
            <span className='font-38 text-black'>150+</span>
            <span className='featured-text font-11 text-black text-uppercase'>BUILD PROJECTS</span>
          </div>
          <div className='featured-list-item d-flex flex-column'>
            <span className='font-38 text-black'>100+</span>
            <span className='featured-text font-11 text-black text-uppercase'>DESIGN PROJECTS</span>
          </div>
          <div className='featured-list-item d-flex flex-column'>
            <span className='font-38 text-black'>13+</span>
            <span className='featured-text font-11 text-black text-uppercase'>years experience</span>
          </div>
          <div className='featured-list-item d-flex flex-column'>
            <span className='font-38 text-black'>15+</span>
            <span className='featured-text font-11 text-black text-uppercase'>CITIES SERVICED</span>
          </div>
        </div>
        <div className='home-featured-center text-white'>
          <span className='font-11 font-medium text-uppercase'>FEATURED</span>
          <h2>{selectedHomeProject?.title}</h2>
          <Link to={"/single-project/" + selectedHomeProject?.slug} className='view-all text-uppercase font-11 text-white'>VIEW</Link>
        </div>
      </div>
      <HomeRecentProject/>
      <HomeServices />      
      <HomeTestimonial />
      <DownloadBrochure />      
      {/* <HomeRecentBlog /> */}
      <HomeTeam />
    </Layout>
  )
}
