import React from 'react';
import AboutBanner from '../components/AboutBanner';
import Layout from './layout';
import AboutDetail from '../components/AboutDetail';
import AboutServices from '../components/AboutServices';
import InstagramSlider from '../components/InstagramSlider';

export default function About() {
    
  return (
    <>
    <Layout page={"about"}>
        <AboutBanner />
        <AboutDetail />
        <AboutServices />
        <div className='about-instagram-sec'>
            <InstagramSlider />
        </div>
    </Layout>
    
    
      
    </>
  )
}
