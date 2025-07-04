import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import config from '../../config';

function BlogsList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-blogs`, { withCredentials: true });
            
            if(response.data){
                setBlogs(response.data);
            }

        } catch (err) {
            setError('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="dashboard">
                <div className="container">
                    <h1 className="dash_title">Blogs</h1>
                    <div className="main-section">
                        <div className="projects">
                            <div className="projects-inner">
                                <header className="projects-header">
                                    <div className="title">
                                        Total 
                                        <div className="count"> {blogs.length } Blogs</div>
                                    </div>
                                    <div className="project_search">
                                        <form action="">
                                            <input type="text" name="search" placeholder="Search blogs" />
                                            <button type="submit" className="btn">Search</button>
                                        </form>
                                    </div>
                                    <div className="add_project">
                                        <Link to="/admin/add-blog">Add Blog</Link>
                                    </div>
                                </header>
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Blog Title</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="4">Loading...</td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="4">{error}</td>
                                            </tr>
                                        ) : (
                                            blogs.map((blog, index) => ( 
                                                <tr key={blog._id}>
                                                    <td><p>{blog.title}</p></td>
                                                    <td><p>{blog.description}</p></td>
                                                    <td><p>{blog.category}</p></td>
                                                    <td>
                                                        <Link to={`/admin/blog/${blog._id}`} className="view_detail">View Details</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogsList;
