import React from 'react';
import { Link } from 'react-router-dom';
import inspoimage1 from '../assets/images/indoors-out.jpg';
import inspoimage2 from '../assets/images/house.jpg';
import inspoimage3 from '../assets/images/reimagined.jpg';

export default function InspoDetail() {
  return (
    <>
    <div className='inspo-detail-sec d-grid bg-white'>
        <div className='inspo-detail-wrapper d-grid'>
            <div className='inspo-detail-items inspo-detail-large-items d-grid' data-aos="fade-up" data-aos-delay="2000" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage1} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>and the indoors out.</h3>
                    <p>with Zara Home x Vincent Van Duysen</p>
                </div>
            </div>
            <div className='inspo-detail-items d-grid inside' data-aos="fade-up" data-aos-delay="2300" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage2} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>when contemporary, traditional, and eclectic meet at soho house</h3>
                    <p>the Mexico City Soho House delivers an impactful blend by Sordo Madaleno.</p>
                </div>
            </div>
            <div className='inspo-detail-items d-grid inside' data-aos="fade-up" data-aos-delay="2800" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage3} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>terracotta, reimagined</h3>
                    <p>by <Link to="https://www.fornacebrioni.it/en/item/corte/" target="_blank">Fornace Brioni</Link></p>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}
