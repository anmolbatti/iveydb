import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import config from '../../src/config';
import { useNavigate } from 'react-router-dom';

export default function AdditionalProject() {
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [projects, setProjects] = useState([]); // State for dynamic projects

  const moveToProjects = () => {
    return navigate("/projects");
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, {
          withCredentials: true,
        });
        setProjects(response.data); // Assuming response.data is the array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className='additional-project-sec'>
        <h5 data-aos="fade-up" data-aos-delay="300" data-aos-duration="300" className='text-white font-16' style={{fontSize: "12px"}}>ADDITIONAL PROJECTS</h5>
        <div className='home-recent-projet-sec d-flex w-100'>
          <div className='home-recent-projet-center d-flex flex-column' data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
            {projects.length > 0 && (
              <Link className='text-black' to={`/single-project/${projects[0].slug}`}>
                <div className='home-recent-project-item'>
                  <div className='recent-featured-img'>
                    <img src={`${config.BASE_URL}${projects[0].featuredImage}`} alt={projects[0].title} />
                  </div>
                  <div className='recent-project-detail d-flex'>
                    <span className='project-name font-14 font-medium text-uppercase text-white'>
                      {/* <span className='project-scale font-11 text-uppercase text-white'>{projects[0].title} {projects[0].location} · {projects[0].space} sq ft</span> */}

                      {projects[0].title || 'Project Name'}
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className='home-recent-projet-left d-flex flex-column' data-aos="fade-up" data-aos-delay="700" data-aos-duration="1000">
            {projects.slice(1, 3).map((project, index) => (
              <Link className='text-black' to={`/single-project/${project.slug}`}>
                <div key={index} className='home-recent-project-item'>
                  <div className='recent-featured-img'>
                    <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                  </div>
                  <div className='recent-project-detail d-flex'>
                    <span className='project-name font-11 font-medium text-uppercase text-white'>
                      {project.title || 'Project Name'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='home-recent-projet-right d-flex flex-column' data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1000">
            {projects.slice(3, 5).map((project, index) => (
              <Link className='text-black' to={`/single-project/${project.slug}`}>
                <div key={index} className='home-recent-project-item'>
                  <div className='recent-featured-img'>
                    <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                  </div>
                  <div className='recent-project-detail d-flex'>
                    <span className='project-name font-11 font-medium text-uppercase text-white'>
                      {project.title || 'Project Name'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='home-recent-projet-slider'>
          <Slider {...sliderSettings}>
            {projects.map((project, index) => (
              <Link className='text-black' to={`/single-project/${project.slug}`}>
                <div key={index} className='home-recent-project-item'>
                  <div className='recent-featured-img'>
                    <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                  </div>
                  <div className='recent-project-detail d-flex'>
                    <span className='project-name font-11 font-medium text-uppercase text-white'>
                      {project.title || 'Project Name'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>

        <div className='view-all-project d-flex w-100'>
          <div className='view-all-project-inner flex-column align-items-start' data-aos="fade-up" data-aos-delay="1300" data-aos-duration="1000">
            <h2 className='text-white' onClick={moveToProjects}>+ many more</h2>
            <Link to="/projects" className='view-all text-white font-12 text-uppercase'>view</Link>
          </div>
        </div>
      </div>
    </>
  );
}
