import React, { useState, useEffect } from 'react';
import Layout from './layout';
import FilterProject from '../components/FilterProject';
import { Link } from 'react-router-dom';
import FeaturedProjectBanner from '../components/FeaturedProjectBanner';

import axios from "axios";
import config from '../config';

export default function Project() {
  const [detailPageFeatured, setDetailPageFeatured] = useState(null);

  const fetchFeaturedProjects = async () => {
    try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/get-featured-projects`, { withCredentials: true });
        if(response){
          setDetailPageFeatured(response?.data.detailPageFeatured);
        }
    } catch (err) {
        console.log("err: ", err.response.data);
    }
  };

  useEffect(() => {
      fetchFeaturedProjects();
  }, []);

  return (
    <>
      <Layout page={"project"}>
        <FeaturedProjectBanner detailPageFeatured={detailPageFeatured} />

        
        <div className='filter-project bg-white' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
            {/* <ul className='filter-project-list d-flex border-right'>
                <li><Link to="/" className="text-black">RECENT</Link></li>
                <li><Link to="/" className="text-black">UPCOMING</Link></li>
                <li><Link to="/" className="text-black">build</Link></li>
                <li><Link to="/" className="text-black">design</Link></li>
            </ul> */}
            <FilterProject />
            {/* <FilterProject /> */}
            {/* <div className='view-all-project d-flex bg-white w-100'>
                <div className='view-all-project-inner flex-column'>
                    <h2 className='text-black'>+ more</h2>
                    <Link to="/projects" className='view-all text-black font-12 text-uppercase'>view MORE</Link>
                </div>
            </div> */}
        </div>
      </Layout>
    </>
  )
}
