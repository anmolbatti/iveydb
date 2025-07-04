import React from 'react'
import ServiceVideo from '../assets/videos/service-video.mp4';
import { Link } from 'react-router-dom';

export default function HomeServices() {
  return (
    <>
    <div className='home-services-sec position-relative' data-aos="fade-up" data-aos-delay="1600" data-aos-duration="1000">
        <video width="100%" autoPlay muted loop  playsInline
            style={{ pointerEvents: 'none' }} className="position-absolute">
            <source src={ServiceVideo} type="video/mp4" />
        </video>
        <div className='blur-right'></div>
        <div className='home-services-inner d-flex'>
            <div className='home-service-left'>
                <h2 className='font-38 text-white'>Our services</h2>
                <ul className='service-list'>
                    <li className='font-12 text-white text-uppercase'>ARCHITECTURAL SERVICES</li>
                    <li className='font-12 text-white text-uppercase'>PERMITTING SERVICES</li>
                    <li className='font-12 text-white text-uppercase'>INTERIOR DESIGN SERVICES</li>
                    <li className='font-12 text-white text-uppercase'>CONSTRUCTION EXECUTION & SUPERVISION</li>
                </ul>
                <Link to="/about#about-services" className='view-all text-uppercase font-11 text-white'>VIEW ALL </Link>
            </div>
            <div className='home-service-right'>
                <p className='font-18 text-white text-right'>IVEY offers a wholistic approach to service with technology and a personal touch both in and out of the office</p>
            </div>
        </div>
    </div>
      
    </>
  )
}
