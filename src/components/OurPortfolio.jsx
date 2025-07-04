import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/images/feautred-image1.jpg'; // Assuming your dynamic images will replace these
import config from '../../src/config';
import { useNavigate } from 'react-router-dom';

const OurPortfolio = () => {

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
        ]
    };

    const [projects, setProjects] = useState([]); // State for dynamic projects
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    const moveToProjects = () => {
        return navigate("/projects");
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, {
                    withCredentials: true
                });
                setProjects(response.data); // Assuming the data structure has `projects` array
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='our-portfolio home-recent-project-main pt-60 d-pt-100 pb-60 d-pb-100' data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
            <div className='container'>
                <div className='section-title sm-px-30 d-ps-40'>
                    <h3 className='font-16 font-medium uppercase'>Explore our portfolio</h3>
                </div>
                <div className='home-recent-projet-sec d-flex w-100 bg-white'>
                    <div className='home-recent-projet-center d-flex flex-column'>
                        {projects.slice(2, 3).map((project, index) => (
                            <Link className='text-black' to={`/single-project/${project.slug}`}>
                                <div key={index} className='home-recent-project-item'>
                                    <div className='recent-featured-img'>
                                        <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                                    </div>
                                    <div className='recent-project-detail d-flex'>
                                        <span className='project-name font-14 font-medium text-uppercase text-black'>{project.title}</span>
                                        <span className='project-scale font-14 text-black'>{project.location} · {project.space} sq ft</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='home-recent-projet-left d-flex flex-column'>
                        {projects.slice(0, 2).map((project, index) => (
                            <Link className='text-black' to={`/single-project/${project.slug}`}>
                                <div key={index} className='home-recent-project-item'>
                                    <div className='recent-featured-img'>
                                        <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                                    </div>
                                    <div className='recent-project-detail d-flex'>
                                        <span className='project-name font-11 font-medium text-uppercase text-black'>{project.title}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='home-recent-projet-right d-flex flex-column'>
                        {projects.slice(3, 5).map((project, index) => (
                            <Link className='text-black' to={`/single-project/${project.slug}`}>
                                <div key={index} className='home-recent-project-item'>
                                    <div className='recent-featured-img'>
                                        <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                                    </div>
                                    <div className='recent-project-detail d-flex'>
                                        <span className='project-name font-11 font-medium text-uppercase text-black'>{project.title}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='home-recent-projet-slider bg-white filter-project-slider-mobile'>
                    <Slider {...sliderSettings}>
                        {projects.map((project, index) => (
                            <Link className='text-black' to={`/single-project/${project.slug}`}>
                                <div key={index} className='home-recent-project-item'>
                                    <div className='recent-featured-img'>
                                        <img src={`${config.BASE_URL}${project.featuredImage}`} alt={project.title} />
                                    </div>
                                    <div className='recent-project-detail d-flex'>
                                        <span className='project-name font-11 font-medium text-uppercase text-black'>{project.title}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
                <div className='view-all-project d-flex bg-white w-100'>
                    <div className='view-all-project-inner d-ps-40'>
                        <h2 className='text-black cursor-pointer-link' onClick={moveToProjects}>+ many more</h2>
                        <Link to="/projects" className='more-text text-black font-12'>view more</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OurPortfolio