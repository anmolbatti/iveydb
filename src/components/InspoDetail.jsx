import React from 'react';
import { Link } from 'react-router-dom';
import inspoimage1 from '../assets/images/natural-curves.jpg';
import inspoimage2 from '../assets/images/ash-wood.jpg';
import inspoimage3 from '../assets/images/pedigreed.jpg';

export default function InspoDetail() {
  return (
    <>
    <div className='inspo-detail-sec d-grid bg-white'>
        <div className='inspo-detail-wrapper d-grid'>
            <div className='inspo-detail-items inspo-detail-large-items d-grid' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage1} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>natural curves and tones throughout a modern home</h3>
                    <p>a great example of modern meets the warmth of home from KOSA. </p>
                </div>
            </div>
            <div className='inspo-detail-items d-grid inside' data-aos="fade-up" data-aos-delay="1600" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage2} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>Contemporary, Modern Sculptural Cabinets, Stained Ash Wood</h3>
                    <p>from <Link to="https://www.chairish.com/product/15081190/contemporary-modern-sculptural-cabinets-stained-ash-wood-2024?epik=dj0yJnU9UG1aNzNRLWlfcW14VkU5czduWG5scjA2elZFTFkwV0cmcD0wJm49NzBkSjg0bFl6anJjQVYycW5tMHJHUSZ0PUFBQUFBR2RTVTA4" target="_blank">Chairish</Link> thins the line between retro and contemporary.</p>
                </div>
            </div>
            <div className='inspo-detail-items d-grid inside' data-aos="fade-up" data-aos-delay="1600" data-aos-duration="1000">
                <div className='inspo-detail-item-img'>
                    <img src={inspoimage3} alt="inspo-img" />
                </div>
                <div className='inspo-detail-item-desc'>
                    <h3>pedigreed spaces (literally and figuratively) and contemporary artists belong together</h3>
                    <p>an installation by <Link to="https://www.instagram.com/p/C7d_nNPsXb3/?hl=en&img_index=2" target="_blank">CB Hoyo</Link> at Casa Cipriani.</p>
                </div>
            </div>
        </div>
    </div>

      
    </>
  )
}
