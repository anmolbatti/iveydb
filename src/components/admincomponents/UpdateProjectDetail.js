import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

function UpdateProjectDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [project, setProject] = useState({
        tags: []
    });
    const [newImages, setNewImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const fileInputRef = useRef(null);
    const bannerImageRef = useRef(null); // Reference for banner image input
    const featuredImageRef = useRef(null); // Reference for featured image input
    const videoRef = useRef(null);

    const [team, setTeam] = useState([
        { name: '', position: '' }
    ]);

    const handleTeamChange = (index, event) => {
        const newFields = team.map((field, fieldIndex) => {
          if (index === fieldIndex) {
            return { ...field, [event.target.name]: event.target.value };
          }
          return field;
        });
        setTeam(newFields);
      };
    
      const addTeamFields = () => {
        setTeam([...team, { name: '', position: '' }]);
      };
    
      const removeTeamFields = (index) => {
        const newFields = team.filter((field, fieldIndex) => index !== fieldIndex);
        setTeam(newFields);
      };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-project/${id}`, { withCredentials: true });
                setProject(response.data);
                setTeam(JSON.parse(response.data.team))
            } catch (err) {
                setError('Failed to fetch project details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image`, { 
                projectId: project._id, 
                imageName 
            }, { withCredentials: true });
    
            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array
                
                // Update project state
                setProject(prevProject => {
                    const updatedImages = prevProject.galleryImages.filter(image => image !== imageName);
                    return {
                        ...prevProject,
                        galleryImages: updatedImages,
                        // Check if the removed image was the banner or featured image
                        bannerImage: prevProject.bannerImage === imageName ? null : prevProject.bannerImage,
                        featuredImage: prevProject.featuredImage === imageName ? null : prevProject.featuredImage,
                    };
                });
            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };

    const handleNewImageChange = (e) => {
        setNewImages(e.target.files); // Set new images to be uploaded
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('tags', project.tags);
        formData.append('location', project.location);
        formData.append('space', project.space);
        formData.append('team', JSON.stringify(team));

        // Send the images to remove, if any
        if (removeImages.length > 0) {
            formData.append('removeImages', JSON.stringify(removeImages));
        }

        // Add new images for gallery
        for (const image of newImages) {
            formData.append('galleryImages', image);
        }

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the project state with the response data
            setProject(response.data.project); // Assuming the response includes the updated project
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input for new images
            }
            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }

            setFeaturedImage(null); 
            setSuccessMessage('Project updated successfully!'); 
        } catch (err) {
            setError('Failed to update project');
        }
    }

    // console.log("team: ", team);

    return (
        <div className="dashboard update_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Edit Project</h1>
                <div className="back_btn_wrap">
                    <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                {project ? (
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Location Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group textareaField">
                            <h2>Description</h2>
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags</label>
                            {/* <input
                                type="text"
                                value={project.tags}
                                onChange={(e) => setProject({ ...project, tags: e.target.value })}
                            /> */}

                            <Chips 
                                name="tags"
                                value={project.tags} 
                                onChange={(e) => setProject({ ...project, tags: e.target.value })}
                                separator="," 
                            />

                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={project.location}
                                onChange={(e) => setProject({ ...project, location: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Space</label>
                            <input
                                type="text"
                                value={project.space}
                                onChange={(e) => setProject({ ...project, space: e.target.value })}
                            />
                        </div>

                        {team.map((field, index) => (
                            <div key={index}>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={field.name}
                                    onChange={(event) => handleTeamChange(index, event)}
                                />
                                <input
                                    name="position"
                                    type="text"
                                    placeholder="Enter position"
                                    value={field.position}
                                    onChange={(event) => handleTeamChange(index, event)}
                                />
                                <button type="button" onClick={() => removeTeamFields(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button type="button" onClick={addTeamFields}>Add More</button>

                        <div className="form-group">
                            
                            <div className="form-group">
                                <label>Upload Gallery Images</label>
                                <input type="file" multiple onChange={handleNewImageChange} ref={fileInputRef} />
                            </div>
                            <div className="detail_item_inner gallery_inner">
                            <div className="detail_img_grid">
                                {project?.galleryImages && project.galleryImages.map((image, index) => (
                                    <div className="detail_image_item" key={index}>
                                        <div className="detail_img_item">
                                        <img src={`${config.BASE_URL}${image}`} alt={`Project ${index}`} />
                                        </div>
                                        <button className="remove_btn" type="button" onClick={() => handleRemoveImage(image)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="detail_banner_wrap">
                            <div className="detail_img_grid">
                            
                                <div className="upload_item">
                                <label>Featured Image</label>
                                    <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                </div>
                                <div className="detail_img_grid">
                                    {project.featuredImage ? (
                                        <div className="detail_img_item">
                                            <div className="banner_img_wrap">
                                            <img src={`${config.BASE_URL}${project.featuredImage}`} alt="Featured" />
                                            </div>
                                            <button className="remove_btn" type="button" onClick={() => handleRemoveImage(project.featuredImage)}>Remove</button>
                                        </div>
                                    ) : (
                                        <p>No image available.</p>
                                    )}
                                </div>
                                
                            </div>

                        </div>
                        </div>
                    
                    <div className="update_btn_wrap">
                        <button className="update_btn" type="submit">Update Project</button>
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                        </div>
                    </form>
                ) : (
                    <h5>Project not found!</h5>
                )}
            </div>
        </div>
    ); 
}

export default UpdateProjectDetail;
