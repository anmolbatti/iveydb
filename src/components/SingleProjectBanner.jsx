import React, { useEffect, useState } from 'react';
import SingleProjectBannerImage from '../assets/images/singleprojectbanner.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import config from '../../src/config'; // Import your config for the base URL

export default function SingleProjectBanner({ project }) {
  // const [project, setProject] = useState(null); // State to store project data
  // const [loading, setLoading] = useState(true); // State to manage loading status

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const response = await axios.get(`${config.BASE_URL}/api/admin/single-project/${slug}`);
  //       setProject(response.data);
  //     } catch (error) {
  //       console.error("Error fetching project:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProject();
  // }, [slug]);
  const bannerImage = project && project.featuredImage
    ? `${config.BASE_URL}${project.featuredImage}`
    : `${config.BASE_URL}/path/to/default/image.jpg`;
  const tagsArray = project?.tags[0]?.split(',') || [];

  return (
    <>
      <div className='home-services-sec position-relative single-project-banner d-flex flex-column'
        style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <img src={bannerImage} />
        <div className='single-project-banner-inner' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000"> 
          <div className="mobile-tagline">DESIGN BUILD PROJECT</div>
          <h2 className='text-white' style={{fontSize: "32px"}}>{project?.title}</h2>
          <ul className='filter-project-list d-flex border-right m-hide'>
            {tagsArray.map((tag, index) => (
              <li className="m-hide" key={index}>
                <Link to="/" className="text-white">{tag.trim()}</Link>
              </li>
            ))}
            <li><Link to="/" className="text-white">{project?.location}</Link></li>
          </ul>
        </div>
        <div className='border-bottom position-absolute'></div>
      </div>

    </>
  )
}
