import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

function AddNewProject() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    featuredImage: null,
    galleryImages: null,
    description: '',
    tags: [],
    location: "",
    space:"",
    team: []
  });

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

  const handleInputChange = (e) => {
    const { name, value, files } = e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value // Set files if they exist, otherwise set value
    }));
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tags', formData.tags);
    data.append('location', formData.location);
    data.append('space',formData.space);
    data.append('team', JSON.stringify(team));

    // Handle multiple file uploads for images
    if (formData.galleryImages) {
      for (let i = 0; i < formData.galleryImages.length; i++) {
        data.append('galleryImages', formData.galleryImages[i]);
      }
    }
    // Single file upload for featured image
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage[0]);
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-project`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dash_title">Dashboard</h1>
        <div className="main-section">
        <div className="back_btn_wrap">
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
          <div className="main-inner add_project_main">
            <form onSubmit={handleAddLocation} encType="multipart/form-data">
              <div className="form-login">
                <div className="add_field titleField">
                  <h2>Project Title</h2>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Description</h2>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Tags</h2>
                  <Chips 
                    name="tags"
                    value={formData.tags} 
                    onChange={(e) => handleInputChange(e.target)} 
                    separator="," 
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Location</h2>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>
                <div className="add_field textareaField">
                  <h2>Space</h2>
                  <input
                    name="space"
                    value={formData.space}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>


                <div className="add_field textareaField">
                  <h2>Team</h2>
                  {team.map((field, index) => (
                    <div key={index}>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        
                        
                        
                      />
                      {/* <p>Team</p> */}
                      <input
                        name="position"
                        type="text"
                        placeholder="Enter position"
                        placeholderTextColor= 'red' 
                        value={field.position}
                        onChange={(event) => handleTeamChange(index, event)}
                        required
                      />
                      <button type="button" onClick={() => removeTeamFields(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addTeamFields}>Add More</button>
                </div>

                <div className="add_field">
                  <h2>Gallery Images</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="galleryImages"
                        multiple
                        onChange={(e) => handleInputChange(e.target)}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
                
                <div className="add_field">
                  <h2>Featured Image</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="featuredImage"
                        onChange={(e) => handleInputChange(e.target)}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="add_project">
                <button type="submit">Add Project</button>
              </div>

            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProject;
