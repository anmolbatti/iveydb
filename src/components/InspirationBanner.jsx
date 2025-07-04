import React from 'react';
import { Link } from 'react-router-dom';
import inspirationBanner from '../assets/images/outdoors.jpg';
export default function InspirationBanner() {
  return (
    <>
    <div className='inspiration-banner-sec position-relative text-white' data-aos="fade-up" data-aos-delay="2000" data-aos-duration="1000" style={{ backgroundImage: `url(${inspirationBanner})` }}>
        <div className='inspiration-banner-inner-wrapper'>
            <div className='inspiration-banner-inner'>
              <h3>bringing the outdoors in with natural finishes and stone</h3>
              <p>by <Link to="https://www.kosullivan.com/builtwork#/sag-harbor-3/" target="_blank">KOSA.</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}
