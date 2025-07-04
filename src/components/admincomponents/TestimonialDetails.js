import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function TestimonialDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [testimonial, setTestimonial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTestimonialDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-testimonial/${id}`, { withCredentials: true });
            setTestimonial(response.data);
        } catch (err) {
            setError('Failed to fetch testimonial details');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTestimonialDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-testimonial/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/testimonials'); 
        } catch (err) {
            setError('Failed to delete the testimonial');
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
                                <h2>Testimonial Title</h2>
                                <div className="detail_item_inner">
                                    <p>{testimonial.title}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Description</h2>
                                <div className="detail_item_inner">
                                    <p>{testimonial.description}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <h2>Client Name</h2>
                                <div className="detail_item_inner">
                                    <p>{testimonial.clientName}</p>
                                </div>
                            </div>

                            <div className="detail_item">
                                <div className="detail_banner_wrap">
                                    <div className="detail_img_grid">

                                        {testimonial.featuredImage ? ( // No .length because it's a string
                                            <div className="detail_img_item">
                                                <h2>Featured Image</h2>
                                                <div className="banner_img_wrap">
                                                <img src={`${config.BASE_URL}${testimonial.featuredImage}`} alt="Featured" />
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
                                        <Link to={`/admin/update-testimonial/${testimonial._id}`} className="update_detail detail_btns">Edit</Link>
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

export default TestimonialDetails;
