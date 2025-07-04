import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import config from "../../src/config";
import { Link } from 'react-router-dom';

export default function FilterProject() {
    const [projects, setProjects] = useState([]);
    const [sliderProjects, setSliderProjects] = useState([]);
    const [projectChunks, setProjectChunks] = useState([]);
    const [moreProjectsLoaded, setMoreProjectsLoaded] = useState(false);


    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, {
                    withCredentials: true
                });
                setProjects(response.data); // Assuming `projects` is an array in the response
                if(response?.data?.length > 0){
                    setProjectChunks(chunkArray(response.data.slice(0, 5), 5));
                    setSliderProjects(response.data.slice(0, 5));
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const loadMoreProjects = (e) => {
        e.preventDefault();

        setProjectChunks(chunkArray(projects, 5));
        setSliderProjects(projects);
        setMoreProjectsLoaded(true);
    }

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
              settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            },
        ]
    };

    return (
        <>
            <div className='projectpagerow' data-aos="fade-up">
                {projectChunks.map((projectChunk) => (
                    <div className={`home-recent-projet-sec filter-project-sec d-flex w-100 bg-white ${projectChunk.length === 3 ? "threeColumns" : ""}`}>
                        {projectChunk.map((item, index) => (
                            <Link className='text-black' to={`/single-project/${item.slug}`}>
                                <div className='home-recent-project-item' key={index}>
                                    <div className='recent-featured-img'>
                                        <img src={`${config.BASE_URL}${item.featuredImage}`}  alt="featured" /> {/* Use project image or fallback */}
                                    </div>
                                    <div className='recent-project-detail d-flex'>
                                        <span className='project-name font-11 font-medium text-uppercase text-black'>{item.title || "Project Name"}</span>
                                        <span className='project-scale font-11 text-black'>{item.location} · {item.space} sq ft</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <div className='home-recent-projet-slider filter-project-slider-mobile'>
                <Slider {...sliderSettings}>
                    {sliderProjects.map((project, index) => (
                        <Link className='text-black' to={`/single-project/${project.slug}`}>
                            <div className='home-recent-project-item' key={index}>
                                <div className='recent-featured-img'>
                                    <img src={`${config.BASE_URL}${project.featuredImage}`} alt="featured" />
                                </div>
                                <div className='recent-project-detail d-flex'>
                                    <span className='project-name font-11 font-medium text-uppercase text-black'>{project.title}</span>
                                    <span className='project-scale font-11 text-black'>{project.location} · {project.space} sq ft</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>

            {(!moreProjectsLoaded && projects.length > 5) && ( 
                <div className='view-all-project d-flex bg-white w-100'>
                    <div className='view-all-project-inner flex-column align-items-start'>
                        <h2 className='text-black loaderMoreProjects' onClick={loadMoreProjects}>+ more</h2>
                        <a className='view-all text-black font-12 text-uppercase loaderMoreProjects' onClick={loadMoreProjects}>view</a>
                    </div>
                </div>
            )};
        </>
    );
}
