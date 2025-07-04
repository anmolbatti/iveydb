import React, {useEffect, useState, useRef} from 'react';
import contactBannerDesktop from '../assets/images/vendors-banner.jpg';
import contactBannerMobile from '../assets/images/vendors-banner.jpg';
import { Link } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import config from "../config";
import { Button } from 'primereact/button';

export default function ContactBanner() {
    const [isMobile, setIsMobile] = useState(false);
    const [isMailSent, setIsMailSent] = useState(false);
    const fileUploadRefs = useRef({});
    const [loading, setLoading] = useState(false);

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
        company: '',
        website: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormFileUpload = async (e, fieldName) => {
        // convert file to base64 encoded
        const file = e.files[0];
        setFormData({ ...formData, [fieldName]: file });
        // const reader = new FileReader();
        // let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        // reader.readAsDataURL(blob);

        // reader.onloadend = function () {
        //     const base64data = reader.result;
        // };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        setLoading(true);
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/send-email-vendors`, formData, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });

            if(response){
                setIsMailSent(true);

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    website: '',
                });

                Object.keys(fileUploadRefs.current).forEach((key) => {
                    if (fileUploadRefs.current[key]) {
                      fileUploadRefs.current[key].clear();
                    }
                });

                setLoading(false);
            }

            setTimeout(() => {
                setIsMailSent(false);
            }, 5000);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setIsMailSent(false);
            setLoading(false);
        }
    };
    return (
    <>
    <div className='contact-baner vendors-banner' style={{ backgroundImage: `url(${contactBanner})` }}>
        <img src={contactBanner}/>
        <div className='contact-banner-inner vendors-contact-banner d-flex'>
            <div className='contact-banner-left text-white'>
                <h6 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">Join us</h6>
                <h2 data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">apply to be Ivey vendor</h2>                
                <div className='custom-form vendor-contact-form'>                
                <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
                    <div className='fields-group'>
                        <h6>Peronal Info</h6>
                        <div className='form-field'>
                            <input
                                type="text"
                                name="name"
                                placeholder="your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <input
                                type="email"
                                name="email"
                                placeholder="your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-field'>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="your phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='fields-group'>
                        <h6>Company Info</h6>
                        <div className='form-field'>
                            <input
                                type="tel"
                                name="company"
                                placeholder="company name"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-field'>
                            <input
                                type="tel"
                                name="website"
                                placeholder="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='fields-group'>
                        <h6>Your Documents</h6>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["generalLiability"] = el)} mode="basic" name="generalLiability[]" onSelect={(e) => handleFormFileUpload(e, "generalLiability")} chooseLabel='General Liability' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["workerCompensation"] = el)} mode="basic" name="workerCompensation[]" onSelect={(e) => handleFormFileUpload(e, "workerCompensation")} chooseLabel='Worker’s compensation' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["license"] = el)} mode="basic" name="license[]" onSelect={(e) => handleFormFileUpload(e, "license")} chooseLabel='License' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["lbt"] = el)} mode="basic" name="lbt[]" onSelect={(e) => handleFormFileUpload(e, "lbt")} chooseLabel='LBT' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["permitForms"] = el)} mode="basic" name="permitForms[]" onSelect={(e) => handleFormFileUpload(e, "permitForms")} chooseLabel='Permit forms' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>
                        <div className='form-field'>
                            <FileUpload ref={(el) => (fileUploadRefs.current["costAffidavit"] = el)} mode="basic" name="costAffidavit[]" onSelect={(e) => handleFormFileUpload(e, "costAffidavit")} chooseLabel='Cost affidavit' chooseOptions={{ icon: 'pi pi-fw pi-images', iconOnly: false, }} />
                        </div>                        
                    </div>

                    {isMailSent && (<><p style={{color: "#fff"}}>Message Sent!</p></>)}                        
                        <Button className='form-submit' label="SEND MESSAGE" loading={loading} />
                    </form>
                </div>
            </div>            
        </div>

    </div>
      
    </>
  )
}
