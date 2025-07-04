import React, { useEffect, useState } from 'react'
import Layout from './layout'
import SingleBlogDetail from '../components/SingleBlogDetail'
import AdditionalBlog from '../components/AdditionalBlog'
import signupBanner from '../assets/images/blog-signup-banner.png';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import config from '../../src/config'; // Import your config for the base URL

export default function SingleBlog() {
  const { slug } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [blog, setBlog] = useState(null); // State to store project data


  useEffect(() => {
    const fetchProject = async () => {
      try {

        const response = await axios.get(`${config.BASE_URL}/api/admin/single-blog/${slug}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 767);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



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

  console.log("blog: ",blog);
  return (
    <>
      <Layout page={"single-blog"}>
        <div className='inspo-desc blog-desc single-blog-desc bg-white d-flex justify-content-center align-items-center'>
          <h2>{blog?.title}</h2>
          <div className='recent-project-detail d-flex'>
            <span className='project-name font-12 font-medium text-uppercase text-black'>{blog?.category}</span>
            <span className='project-scale font-14 text-black'>{formatDate(blog?.created_at)}</span>
          </div>
        </div>
        <SingleBlogDetail slug={slug} blog={blog} />
        <AdditionalBlog />
        {isMobile && (
          <div className='main-blog-right' style={{ backgroundImage: `url(${signupBanner})` }}>
            <h3>keep in the loop</h3>
            <p> Sign up for our newsletter to keep up. </p>
            <form className="newsletter-signup">
              <input type="email" placeholder="email" />
              <button type="submit" className='sign-up-btn'>Sign up</button>
            </form>
          </div>
        )}
      </Layout>

    </>
  )
}
