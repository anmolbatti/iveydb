import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function BlogDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchBlogDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-blog/${id}`, { withCredentials: true });
            setBlog(response.data);
        } catch (err) {
            setError('Failed to fetch blog details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-blog/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/blogs'); 
        } catch (err) {
            setError('Failed to delete the blog');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard project_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Dashboard</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <div className="main-section">
                    <div className="projects">
                        <div className="projects-inner">
                            <div className="detail_item">
                                <h2>Blog Title</h2>
                                <div className="detail_item_inner">
                                    <p>{blog.title}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Description</h2>
                                <div className="detail_item_inner">
                                    <p>{blog.description}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Blog Content</h2>
                                <div className="detail_item_inner">
                                    {blog.contentSections.length > 0 && blog.contentSections.map((item, key) => {
                                        if(item.type === "imageText"){
                                            return (<div className="singleReapterField">
                                              <div>
                                                <h3>Image and Text</h3>
                                                <p>Image: {item.contentImage && (<img src={config.BASE_URL + item.contentImage[0]}/>)}</p>
                                                <p>Text: {item.contentEditor}</p>
                                              </div>
                                            </div>)
                                          }
                    
                                          if(item.type === "editorOnly") {
                                            return (<div className="singleReapterField">
                                              <div>
                                                <h3>Editor</h3>
                                                <p>Text: {item.contentEditor}</p>
                                              </div>
                                            </div>)
                                          }
                    
                                          if(item.type === "galleryImages"){
                                            return (<div className="singleReapterField">
                                              <div>
                                                <h3>Gallery Images</h3>
                                                <p>Images:</p>
                  
                                                {item.contentGalleryImages.length > 0 && item.contentGalleryImages.map(item=> (
                                                    <>
                                                      <img src={config.BASE_URL + item} />
                                                      <br />
                                                    </>
                                                ))}
                                                
                                              </div>
                                            </div>)
                                          }
                    
                                          if(item.type === "bannerImage"){
                                            return (<div className="singleReapterField">
                                              <div>
                                                <h3>Banner Image</h3>
                                                <p>Image: {item.contentBannerImage && (<img src={config.BASE_URL + item.contentBannerImage[0]}/>)} </p>
                                              </div>
                                            </div>)
                                          }
                                    })}
                                </div>
                            </div>


                            <div className="detail_item">
                                <h2>Category</h2>
                                <div className="detail_item_inner">
                                    <p>{blog.category}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <div className="detail_banner_wrap">
                                    <div className="detail_img_grid">

                                        {blog.featuredImage ? ( // No .length because it's a string
                                            <div className="detail_img_item">
                                                <h2>Featured Image</h2>
                                                <div className="banner_img_wrap">
                                                <img src={`${config.BASE_URL}${blog.featuredImage}`} alt="Featured" />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>No image available.</p>
                                        )}
                                
                                    </div>
                                </div>
                            </div>
                           
                            <div className="detail_project_btn_wrap">
                                <div className="detail_edit_del">
                                    <div className="btn_item">
                                        <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                    </div>
                                    <div className="btn_item">
                                        <Link to={`/admin/update-blog/${blog._id}`} className="update_detail detail_btns">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;
