import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import signupBannerMobile from '../assets/images/blog-signup-banner.png';
import axios from 'axios';
import config from '../../src/config';

export default function BlogBlock() {
    const [isMobile, setIsMobile] = useState(false);
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

    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
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


    const renderBlogs = () => {
        const blogChunks = chunkArray(blogs, 3); // Divide blogs into chunks of 3
        var i = 0;
        var swape = true;
        return blogChunks.map((blogGroup, groupIndex) => {
            i = 0;

            if(swape){
                swape = false;
            }else{
                swape = true;
            }

            return (<div key={groupIndex} className={`home-recent-blogs d-flex bg-white ${swape ? "swapeContent" : ""}`}>
                {blogGroup.map((blog, index) => {
                    // Determine the class based on the specified pattern
                    const positionClass = ((groupIndex * 3 + index) % 6 === 0 || (groupIndex * 3 + index) % 6 === 3)
                        ? 'home-recent-blog-itemsleft'   // Left-aligned items
                        : 'home-recent-blog-itemsright';  // Right-aligned items

                    const columnClass = ((groupIndex * 3 + index) % 6 === 1 || (groupIndex * 3 + index) % 6 === 2) ? 'column-layout' : '';

                    i++;
                    return (
                        <div
                            key={blog.id}
                            className={`blog-item blog-item-${i}`}
                        >
                            <div className='blog-featured-image'>
                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt={blog.title} />
                            </div>
                            <div className='blog-item-summary'>
                                <div className='recent-project-detail d-flex'>
                                    <span className='project-name font-12 font-medium text-uppercase text-black'>{blog.category}</span>
                                    <span className='project-scale font-14 text-black'>{formatDate(blog.created_at)}</span>
                                </div>
                                <h2 className='font-thin'>
                                    <Link to={`/single-blog/${blog.slug}`} className='text-black'>{blog.title}</Link>
                                </h2>
                                <p className='font-14'>{blog.description}</p>
                            </div>
                        </div>
                    );

                })}
            </div>);
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const signupBanner = isMobile ? signupBannerMobile : '';

    return (
        <div className='main-blog-sec d-flex bg-white'>
            <div className='main-blog-left'>
                {renderBlogs()}
            </div>
            <div className='main-blog-right' style={{ backgroundImage: `url(${signupBanner})` }}>
                <h3>keep in the loop</h3>
                <p>Sign up for our newsletter to keep up.</p>
                <form className="newsletter-signup">
                    <input type="email" placeholder="email" />
                    <button type="submit" className='sign-up-btn'>Sign up</button>
                </form>
            </div>
        </div>
    );
}
