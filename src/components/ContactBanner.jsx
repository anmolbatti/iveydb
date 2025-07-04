import React, {useEffect, useState} from 'react';
import contactBannerDesktop from '../assets/images/conatctBg.jpg';
import contactBannerMobile from '../assets/images/conatctBg.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from "../config"

export default function ContactBanner() {
    const [isMobile, setIsMobile] = useState(false);
    const [isMailSent, setIsMailSent] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 767); // Adjust width as needed for mobile
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const contactBanner = isMobile ? contactBannerMobile : contactBannerDesktop;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/send-email`, formData, { withCredentials: true });
            if(response){
                setIsMailSent(true);

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            }

            setTimeout(() => {
                setIsMailSent(false);
            }, 5000);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setIsMailSent(false);
        }
    };
    return (
    <>
    <div className='contact-baner' style={{ backgroundImage: `url(${contactBanner})` }}>
        <img src={contactBanner}/>
        <div className='contact-banner-inner d-flex'>
            <div className='contact-banner-left text-white'>
                <h6 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">contact us</h6>
                <h2 data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">leave us a message and our team will get back to you</h2>
                <div className='custom-form'>
                <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                    <input
                        type="text"
                        name="name"
                        placeholder="your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="your phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="message"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    {isMailSent && (<><p style={{color: "#fff"}}>Message Sent!</p></>)}
                    <button type="submit" className='form-submit'>SEND MESSAGE</button>
                    </form>
                </div>
            </div>
            <div className='contact-banner-right text-white d-grid'>
                <div className='contatc-info-items' data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                    <span className='font-11 text-uppercase'>EMAIL</span>
                    <Link to='mailto:inquiry@iveydb.com' className=''>inquiry@iveydb.com</Link>
                </div>
                <div className='contatc-info-items' data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                    <span className='font-11 text-uppercase'>PHONE</span>
                    <Link to='tel:954 - 580 - 8686' className=''>(954) 580 - 8686</Link>
                </div>
                <div className='contatc-info-items' data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                    <span className='font-11 text-uppercase'>AVENTURA LOCATION</span>
                    <div className='contact-detail'>
                        <span>20801 Biscayne Blvd Suite 202A</span>
                        <span>Aventura FL 33180</span>
                    </div>
                </div>
                <div className='contatc-info-items' data-aos="fade-up" data-aos-delay="800" data-aos-duration="1000">
                    <span className='font-11 text-uppercase'>BOCA RATON LOCATION</span>
                    <div className='contact-detail'>
                        <span>2255 Glades rd. </span>
                        <span>Suite 324-A </span>
                        <span>Boca Raton FL 33431</span>
                    </div>
                    <span className='font-11'>*by appointment only</span>
                </div>
            </div>
        </div>

    </div>
      
    </>
  )
}
