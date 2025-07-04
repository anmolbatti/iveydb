import React, { useEffect, useState } from 'react';
import blogimage1 from '../assets/images/blogimage1.jpg';
import blogimage2 from '../assets/images/blogimage2.jpg';
import blogimage3 from '../assets/images/blogimage3.jpg';
import blogimage4 from '../assets/images/blogimage4.jpg';
import blogimage5 from '../assets/images/blogimage5.jpg';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from "../../src/config"
import axios from 'axios';
export default function HomeRecentBlog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-blogs`, { withCredentials: true });
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchBlogs();
    }, []);
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


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Get the month name
        const options = { month: 'long', year: 'numeric' };
        const monthYear = date.toLocaleDateString(undefined, options);

        // Get the day and add the appropriate suffix
        const day = date.getDate();
        const suffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // 4-20 have "th"
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${monthYear.split(' ')[0]} ${day}${suffix(day)}, ${monthYear.split(' ')[1]}`;
    };


    return (
        <>
            <div className='home-recent-blog d-flex bg-white position-relative' data-aos="fade-up" data-aos-delay="2000" data-aos-duration="1000">
                <h6 className='font-11 text-uppercase position-absolute font-medium'>JOURNAL</h6>
                {blogs.slice(0, 1).map(blog => (
                    <div className='home-recent-blog-items home-recent-blog-itemsleft home-recent-project-item'>
                        <div className='blog-featured-image'>
                            <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                        </div>
                        <div className='recent-project-detail d-flex'>
                            <span className='project-name font-12 font-medium text-uppercase text-black'>{blog.category}</span>
                            <span className='project-scale font-10 text-black'>{formatDate(blog.created_at)}</span>
                            </div>
                        <h2 className='font-thin'><Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link></h2>
                        <p className='font-14'>{blog.description}</p>
                    </div>
                ))}

                <div className='home-ecent-blog-items home-ecent-blog-itemsright'>
                    {blogs.slice(1, 2).map(blog => (
                        <div className='home-recent-blog-items-inner home-recent-project-item '>
                            <div className='blog-featured-image'>
                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                            </div>
                            <div className='recent-project-detail d-flex'>
                                <span className='project-name font-9 font-medium text-uppercase text-black'>{blog.category}</span>
                                <span className='project-scale font-10 text-black'>{formatDate(blog.created_at)}</span>
                                </div>
                            <h2 className='font-thin'><Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link></h2>
                            <p className='font-14'>{blog.description}</p>
                        </div>
                    ))}

                    {blogs.slice(2, 3).map(blog => (
                        <div className='home-recent-blog-items-inner home-recent-project-item '>
                            <div className='blog-featured-image'>
                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                            </div>
                            <div className='recent-project-detail d-flex'>
                                <span className='project-name font-9 font-medium text-uppercase text-black'>{blog.category}</span>
                                <span className='project-scale font-10 text-black'>{formatDate(blog.created_at)}</span>
                            </div>
                            <h2 className='font-thin'><Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link></h2>
                            <p className='font-14'>{blog.description}</p>
                        </div>
                    ))}
                </div>
                <div className='home-ecent-blog-items home-ecent-blog-itemsright'>
                    {blogs.slice(3, 4).map(blog => (

                        <div className='home-recent-blog-items-inner home-recent-project-item '>
                            <div className='blog-featured-image'>
                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                            </div>
                            <div className='recent-project-detail d-flex'>
                                <span className='project-name font-9 font-medium text-uppercase text-black'>{blog.category}</span>
                                <span className='project-scale font-10 text-black'>{formatDate(blog.created_at)}</span>
                                </div>
                            <h2 className='font-thin'><Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link></h2>
                            <p className='font-14'>{blog.description}</p>
                        </div>
                    ))}

                    {blogs.slice(4, 5).map(blog => (

                        <div className='home-recent-blog-items-inner home-recent-project-item '>
                            <div className='blog-featured-image'>
                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                            </div>
                            <div className='recent-project-detail d-flex'>
                                <span className='project-name font-9 font-medium text-uppercase text-black'>{blog.category}</span>
                                <span className='project-scale font-10 text-black'>{formatDate(blog.created_at)}</span>
                                </div>
                            <h2 className='font-thin'><Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link></h2>
                            <p className='font-14'>{blog.description}</p>

                        </div>
                    ))}

                </div>
            </div>
            <div className='home-recent-projet-slider bg-white home-blog-slider'>
                <Slider {...sliderSettings}>
                    <div className='home-recent-blog-items-inner home-recent-project-item '>
                        <div className='blog-featured-image'>
                            <img src={blogimage2} alt="blogimage" />
                        </div>
                        <div className='recent-project-detail d-flex'>
                            <span className='project-name font-9 font-medium text-uppercase text-black'>DEVELOPMENT</span>
                            <span className='project-scale font-10 text-black'>october 8th, 2024</span>
                        </div>
                        <h2 className='font-thin'><Link to="/single-blog" className='text-black'>blog title goes here</Link></h2>
                    </div>
                    <div className='home-recent-blog-items-inner home-recent-project-item '>
                        <div className='blog-featured-image'>
                            <img src={blogimage3} alt="blogimage" />
                        </div>
                        <div className='recent-project-detail d-flex'>
                            <span className='project-name font-9 font-medium text-uppercase text-black'>DEVELOPMENT</span>
                            <span className='project-scale font-10 text-black'>october 8th, 2024</span>
                        </div>
                        <h2 className='font-thin'><Link to="/single-blog" className='text-black'>blog title goes here</Link></h2>
                    </div>
                    <div className='home-recent-blog-items-inner home-recent-project-item '>
                        <div className='blog-featured-image'>
                            <img src={blogimage4} alt="blogimage" />
                        </div>
                        <div className='recent-project-detail d-flex'>
                            <span className='project-name font-9 font-medium text-uppercase text-black'>DEVELOPMENT</span>
                            <span className='project-scale font-10 text-black'>october 8th, 2024</span>
                        </div>
                        <h2 className='font-thin'><Link to="/single-blog" className='text-black'>blog title goes here</Link></h2>
                    </div>
                    <div className='home-recent-blog-items-inner home-recent-project-item '>
                        <div className='blog-featured-image'>
                            <img src={blogimage5} alt="blogimage" />
                        </div>
                        <div className='recent-project-detail d-flex'>
                            <span className='project-name font-9 font-medium text-uppercase text-black'>DEVELOPMENT</span>
                            <span className='project-scale font-10 text-black'>october 8th, 2024</span>
                        </div>
                        <h2 className='font-thin'><Link to="/single-blog" className='text-black'>blog title goes here</Link></h2>
                    </div>
                </Slider>
            </div>

            <div className='view-all-project d-flex bg-white w-100 view-all-blog'>
                <div className='view-all-project-inner'>
                    <div className='view-all-left'>
                        <h3 className='text-black'>more expert insights</h3>
                        <Link to="/blog" className='view-all text-uppercase text-black font-12'>view all</Link>
                    </div>
                    <div className='view-all-desc text-black'>
                        <p className='font-14'>We post about our experience and what’s new in the industry every so often. Sign up for our newsletter to keep up.  </p>
                        <form className="newsletter-signup">
                            <input type="email" placeholder="email" />
                            <button type="submit" className='sign-up-btn'>Sign up</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
