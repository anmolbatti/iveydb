import React from 'react';
import aboutsericeimg from '../assets/images/about-services.jpg';

export default function AboutServices() {
  return (
    <>
    <div className='about-service-sec' id='about-services' style={{ backgroundImage: `url(${aboutsericeimg})` }}>
        <h6 className='font-12 text-uppercase text-white' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">SERVICES</h6>
        <div className='about-services d-grid text-white'>
            <div className='about-servies-item' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                <h3>Project Management</h3>
                <p>Our team includes skilled project managers, superintendents, project coordinators, and board-certified architects. We handle every aspect from start to finish.
                </p>
            </div>
            <div className='about-servies-item' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
                <h3>Efficient Operations</h3>
                <p>Our project coordinators support superintendents and manage subcontractors. We provide weekly project status reports to keep clients informed.
                </p>
            </div>
            <div className='about-servies-item' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
                <h3>Permit Handling</h3>
                <p>Our permit expediters navigate the permitting process across different cities to obtain necessary approvals quickly.
                </p>
            </div>
            <div className='about-servies-item' data-aos="fade-up" data-aos-delay="900" data-aos-duration="1000">
                <h3>Design Coordination</h3>
                <p>Our design coordinator works directly with designers to ensure every detail is accounted for and your project comes to life exactly as envisioned.
                </p>
            </div>
            <div className='about-servies-item' data-aos="fade-up" data-aos-delay="1100" data-aos-duration="1000">
                <h3>On-Site Supervision</h3>
                <p>Dedicated superintendents oversee the project, ensuring timely delivery and maintaining clean, organized conditions.
                </p>
            </div>
        </div>

    </div>
      
    </>
  )
}
