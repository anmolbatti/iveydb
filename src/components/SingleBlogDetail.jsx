import React, {useState, useEffect} from 'react';
import inspoimage1 from '../assets/images/inspimg1.jpg';
import inspirationBanner from '../assets/images/inspobanner.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';


export default function SingleBlogDetail({blog}) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    // const { slug } = useParams();
    // const [blog, setBlog] = useState(null); // State to store project data

    // useEffect(() => {
    //     const fetchProject = async () => {
    //       try {
    
    //         const response = await axios.get(`${config.BASE_URL}/api/admin/single-blog/${slug}`);
    //         console.log("response.data-----------------", response.data)
    //         setBlog(response.data);
    //       } catch (error) {
    //         console.error("Error fetching project:", error);
    //       }
    //     };
    
    //     fetchProject();
    //   }, [slug]);
    

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <>

        {blog?.contentSections.length > 0 && blog?.contentSections.map((item, key) => {
            if(item.type === "imageText"){
                return (
                    <div className='single-blog-detail-sec inspo-detail-sec d-grid bg-white'>
                        <div className='inspo-detail-items inspo-detail-large-items  d-flex'>
                            <div className='inspo-detail-item-img'>
                                {item.contentImage && (
                                    <img src={config.BASE_URL + item.contentImage} alt="inspo-img" />
                                )}
                            </div>
                            <div className='inspo-detail-item-desc' dangerouslySetInnerHTML={{__html: item?.contentEditor.replace(/\n/g, "<br />")}} />
                        </div>
                    </div>
                )
              }

              if(item.type === "editorOnly") {
                return (
                    <div className='single-blog-detail-sec inspo-detail-sec d-grid bg-white'>
                        <div className='inspo-detail-items d-flex'>
                            <div className='inspo-detail-item-desc' dangerouslySetInnerHTML={{__html: item?.contentEditor.replace(/\n/g, "<br />")}} />
                        </div>
                    </div>
                )
              }

              if(item.type === "galleryImages"){
                return (
                    <div className='single-blog-detail-sec inspo-detail-sec d-grid bg-white'>
                    <div className='inspo-detail-items d-flex'>
                        <div className='single-blog-detail-gallery'>
                            {item.contentGalleryImages.length > 0 && item.contentGalleryImages.map(img=> (
                                <img src={config.BASE_URL + img} alt="inspo-img" />
                            ))}
                        </div>
                    </div>
                    </div>
                )
              }

              if(item.type === "bannerImage"){
                return (
                    <div className='blog-banner inspiration-banner-sec position-relative text-white' style={{ backgroundImage: `url(${config.BASE_URL + item.contentBannerImage[0]})` }}>
                        <div className='inspiration-banner-inner'>
                            <h3>{item.bannerText}</h3>
                        </div>
                    </div>
                )
              }
        })}
    
    {/* <div className='blog-banner inspiration-banner-sec position-relative text-white' style={{ backgroundImage: `url(${inspirationBanner})` }}>
        <div className='inspiration-banner-inner'>
            <h3>a natural yet experimental cabin and artist retreat</h3>
        </div>
    </div> */}
    <div className='single-blog-detail-sec single-blog-detail-botm-sec inspo-detail-sec d-grid bg-white'>
        {/* <div className='inspo-detail-items d-flex'>
            <div className='inspo-detail-item-desc'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div> */}
        {isDesktop && (
            <div className='main-blog-right'>
                <h3>keep in the loop</h3>
                <p>Sign up for our newsletter to keep up.</p>
                <form className="newsletter-signup">
                    <input type="email" placeholder="email"/>
                    <button type="submit" className='sign-up-btn'>Sign up</button>
                </form>
            </div>
        )}
    </div>
      
    </>
  )
}
