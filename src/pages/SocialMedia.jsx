import React from 'react';
import Layout from './layout';
import { Link } from 'react-router-dom';
import socialBanner from '../assets/images/social-banner.jpg';
import iveyLogo from '../assets/images/ivey-logo.svg';
import iveyCircleLogo from '../assets/images/ivey-circle-logo.svg';

export default function Contact() {
  return (
    <>
    <Layout page={"social-media"}>
        
       <div className="social-banner position-relative">
        <img className="social-banner-image w-100" width="" height="" src={socialBanner} alt="" />
        <div className="summary-block position-absolute">
            <div className="social-logo">
                <span>Welcome to</span>
                <img width="" height="" src={iveyLogo} alt="" />
                <div className="social-menu">
                    <ul>
                        <li><Link to="/">View website</Link></li>
                        <li><Link to="/contact">Contact us</Link></li>
                        <li><Link to="/#downloadsection">Download Brochure</Link></li>
                    </ul>
                </div>
            </div>            
        </div>
        <div className="social-bottom-logo position-absolute">
            <img width="" height="" src={iveyCircleLogo} alt="" />
        </div>
       </div>

    </Layout>
      
    </>
  )
}
