import React, {useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
// import brochure from '../assets/images/download-brochure.jpg';
import brochure from '../assets/images/download-brochure.jpg';
import brochureMobile from '../assets/images/download-brochure-mobile.jpg';
import closeIcon from '../assets/images/close-icon.png';
import config from '../config';

export default function DownloadBrochure() {
    const [formData, setFormData] = useState({
        email: "",
        name: ""
    });
    
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    const handleClick = () => {
        setIsActive(true);
    };

    const handleClose = () => {
        setIsActive(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkboxChange = (e) => {
        if(e.target.checked){
            setTags([...tags, e.target.value]);
        }else{
            setTags(tags.filter(tag => tag !== e.target.value));
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false);
        setIsSuccess(false);
        setIsDownload(false);

        if(!validateEmail(formData.email)) return setError("Email is invalid");
    
        try {
            const response = await fetch(`${config.BASE_URL}/api/admin/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    tags: tags
                })
            });
    
            const result = await response.json();
            if(result?.success){
                setIsSuccess("Thanks for Signup!");

                setTimeout(function(){
                    setIsDownload(true);
                }, 2000);
            }else{
                if(result?.error){
                    let displayError = result?.error.split("member.")[0];

                    if(result?.errorDetails?.title === "Member Exists"){
                        setIsSuccess("Already Signed up!");

                        setTimeout(function(){
                            setIsDownload(true);
                        }, 2000);
                    }else{
                        setError(displayError);   
                    }
                }
            }

            setFormData({
                email: "",
                name: ""
            });

            setTags([]);

        } catch (error) {
            setError("Something went Wrong!");
        }
    };

    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
          setTimeout(() => {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
              const headerOffset = 65;
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerOffset;    
              window.requestAnimationFrame(() => {
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              });
            }
          }, 500);
        }
      }, [location]);

  return (
    <>
    
        <div id="downloadsection" className="download-brochure">
            <div className="image-block">
                <picture>
                    <source media="(max-width: 768px)" srcset={brochureMobile} />
                    <img className="w-100" width="" height="" src={brochure} alt="" />
                </picture>
            </div>            
            <div className="summary-block-wrapper">
                <div className="summary-block">                
                    <span className="view-more">View More</span>
                    <h2>download the 2025 <span>Ivey DB brochure</span></h2>
                    <button onClick={handleClick}>Download Brochure</button>
                </div>
            </div>
        </div>        

        <div className={`brochure-popup${isActive ? " open" : ""}`}>
            {!isDownload ? (
                <div className="brochure-form-wrapper">
                    <h3>sign up, get our brochure and more</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-fields input-fields column-2">
                            <div className="form-field">
                                <input
                                    type="text" 
                                    placeholder="your name" 
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <input 
                                    type="email" 
                                    placeholder="your email" 
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <label>I am a...</label>

                        <div className="form-fields checkbox-fields">

                            {["Property Owner", "Interior Designer", "Vendor", "Builder/Developer", "Potential Partner"].map((role) => (
                                <div className="form-field" key={role}>
                                    <input 
                                        type="checkbox" 
                                        name="iam" 
                                        value={role} 
                                        checked={tags.includes(role)}
                                        onChange={checkboxChange} 
                                    />
                                    <span>{role}</span>
                                </div>
                            ))}

                        </div>

                        {error && <p style={{color: "red", marginBottom: "10px"}}>{error}</p>}
                        {isSuccess && <p style={{color: "#fff", marginBottom: "10px"}}>{isSuccess}</p>}
                        
                        <div className="form-field">
                            <input type="submit" value="Done" />
                        </div>

                    </form>
                </div>
            ) : (
                <div className="brochure-form-wrapper">
                    <h3 style={{marginBottom: "20px"}}>Download your brochure here</h3>

                    <a style={{marginBottom: "40px"}} target='_blank' className='downloadBrochureBtn' href="https://docsend.com/view/hp84t7cxhgdpj8tq">DOWNLOAD BROCHURE</a>

                    <div className="form-field">
                        <input type="submit" value="Done" onClick={handleClose} />
                    </div>
                </div>
            )}
            <div className="close-popup" onClick={handleClose}>
                <img width="" height="" src={closeIcon} alt="" />
            </div>
        </div>

    </>
  )
}
