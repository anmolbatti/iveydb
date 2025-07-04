import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

function UpdateTestimonialDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [testimonial, setTestimonial] = useState({
        title: '',
        description: '',
        clientName: ''
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const featuredImageRef = useRef(null);
   

    useEffect(() => {
        const fetchTestimonialDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-testimonial/${id}`, { withCredentials: true });
                setTestimonial(response.data);
            } catch (err) {
                setError('Failed to fetch Testimonial details');
            }
        };

        fetchTestimonialDetails();
    }, [id]);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image-testimonial`, { 
                testimonialId: testimonial._id, 
                imageName 
            }, { withCredentials: true });
    
            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array
                
                // Update project state
                setTestimonial(prevTestimonial => {
                    return {
                        ...prevTestimonial,
                        featuredImage: prevTestimonial.featuredImage === imageName ? null : prevTestimonial.featuredImage,
                    };
                });
            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', testimonial.title);
        formData.append('description', testimonial.description);
        formData.append('clientName', testimonial.clientName);

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-testimonial/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the project state with the response data
            setTestimonial(response.data.testimonial); // Assuming the response includes the updated project
            
            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }

            setFeaturedImage(null); 
            setSuccessMessage('Testimonial updated successfully!'); 
        } catch (err) {
            setError('Failed to update testimonial');
        }
    }

    return (
        <div className="dashboard update_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Edit Testimonial</h1>
                <div className="back_btn_wrap">
                    <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                {testimonial ? (
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Testimonial Title</label>
                            <input
                                type="text"
                                value={testimonial.title}
                                onChange={(e) => setTestimonial({ ...testimonial, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group textareaField">
                            <h2>Description</h2>
                            <textarea
                                name="description"
                                value={testimonial.description}
                                onChange={(e) => setTestimonial({ ...testimonial, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Client Name</label>
                            <input
                                type="text"
                                value={testimonial.clientName}
                                onChange={(e) => setTestimonial({ ...testimonial, clientName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                        <div className="detail_banner_wrap">
                            <div className="detail_img_grid">
                            
                                <div className="upload_item">
                                <label>Featured Image</label>
                                    <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                </div>
                                <div className="detail_img_grid">
                                    {testimonial.featuredImage ? (
                                        <div className="detail_img_item">
                                            <div className="banner_img_wrap">
                                            <img src={`${config.BASE_URL}${testimonial.featuredImage}`} alt="Featured" />
                                            </div>
                                            <button className="remove_btn" type="button" onClick={() => handleRemoveImage(testimonial.featuredImage)}>Remove</button>
                                        </div>
                                    ) : (
                                        <p>No image available.</p>
                                    )}
                                </div>
                                
                            </div>

                        </div>
                        </div>
                    
                    <div className="update_btn_wrap">
                        <button className="update_btn" type="submit">Update Testimonial</button>
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                        </div>
                    </form>
                ) : (
                    <h5>Testimonial not found!</h5>
                )}
            </div>
        </div>
    ); 
}

export default UpdateTestimonialDetail;
