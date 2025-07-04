import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';

function UpdateBlogDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const featuredImageRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState("");
    const [contentData, setContentData] = useState([]);

    useEffect(() => {
        if(selectedOption === "imageText"){
          // setImageAndTextFields((prevData) => [...prevData, {index: prevData.length, contentImage: null, contentEditor: ""}]);
          setContentData((prevData) => [...prevData, {type: selectedOption, contentImage: null, contentEditor: "", added: false}]);
        }else{
          // setContentData((prevData) => prevData.slice(0, -1));
        }
    
        if(selectedOption === "editorOnly"){
          // setImageAndTextFields((prevData) => [...prevData, {index: prevData.length, contentImage: null, contentEditor: ""}]);
          setContentData((prevData) => [...prevData, {type: selectedOption, contentEditor: "", added: false}]);
        }
    
        if(selectedOption === "galleryImages"){
          // setImageAndTextFields((prevData) => [...prevData, {index: prevData.length, contentImage: null, contentEditor: ""}]);
          setContentData((prevData) => [...prevData, {type: selectedOption, contentGalleryImages: null, added: false}]);
        }
    
        if(selectedOption === "bannerImage"){
          // setImageAndTextFields((prevData) => [...prevData, {index: prevData.length, contentImage: null, contentEditor: ""}]);
          setContentData((prevData) => [...prevData, {type: selectedOption, contentBannerImage: null, bannerText: "", added: false}]);
        }
    
    
    }, [selectedOption]);

    const handleImageUpload = async (base64Image, name) => {
        const formData = new FormData();
        formData.append('imageBase64', base64Image); // Append the base64 string here
        formData.append('name', name); // Append editor field name
    
        try {
          const response = await axios.post(`${config.BASE_URL}/api/admin/upload-image`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data.imageUrl; // Assuming your API returns the image URL
        } catch (error) {
          console.error('Image upload failed:', error);
          return null;
        }
    };

    const handleRepeaterInputChange = (index, e) => {
        const { name, value, files } = e;
        const updatedContent = [...contentData];
      
        if (files && files.length > 0) {
          // If there are files, convert them to base64 and upload one by one
          const filePromises = Array.from(files).map((file) => {
            return new Promise(async (resolve, reject) => {
              const reader = new FileReader();
              
              reader.onloadend = async () => {
                const base64File = reader.result; // This is the base64 encoded string of the file
                
                // Upload the image
                try {
                  const imageName = await handleImageUpload(base64File, "contentImage");
                  resolve(imageName); // Resolve with the uploaded image URL
                } catch (error) {
                  reject(error); // Reject in case of upload failure
                }
              };
              
              reader.onerror = reject; // Reject if file reading fails
              reader.readAsDataURL(file); // Convert file to base64
            });
          });
      
          // Once all files are processed, update the content
          Promise.all(filePromises)
            .then((imageNames) => {
              updatedContent[index] = {
                ...updatedContent[index],
                [name]: imageNames, // Store the array of image URLs
              };
              setContentData(updatedContent);
            })
            .catch((error) => {
              console.error("Error uploading files:", error);
              alert("There was an error uploading the image(s).");
            });
        } else {
          // If it's a text input, update the value directly
          updatedContent[index] = {
            ...updatedContent[index],
            [name]: value,
          };
          setContentData(updatedContent);
        }
    };

    const removeRepeaterItem = (index) => {
        setContentData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const addRepeaterData = () => {
        if (selectedOption) {
    
          const updatedContent = [...contentData];
          updatedContent[contentData.length - 1] = {
            ...updatedContent[contentData.length - 1],
            added: true,
          };
    
          setContentData(updatedContent);
    
          setSelectedOption("");
        }
    };
   

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-blog/${id}`, { withCredentials: true });
                setBlog(response?.data);
                setContentData(response?.data?.contentSections);
            } catch (err) {
                setError('Failed to fetch blog details');
            }
        };

        fetchBlogDetails();
    }, [id]);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image-blog`, { 
                blogId: blog._id, 
                imageName 
            }, { withCredentials: true });
    
            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array
                
                // Update project state
                setBlog(prevBlog => {
                    return {
                        ...prevBlog,
                        featuredImage: prevBlog.featuredImage === imageName ? null : prevBlog.featuredImage,
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
        formData.append('title', blog.title);
        formData.append('description', blog.description);
        formData.append('category', blog.category);

        formData.append('contentData', JSON.stringify(contentData));

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the project state with the response data
            setBlog(response.data.blog); // Assuming the response includes the updated project
            
            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }

            setFeaturedImage(null); 
            setSuccessMessage('Blog updated successfully!'); 
        } catch (err) {
            setError('Failed to update blog');
        }
    }

    return (
        <div className="dashboard update_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Edit Blog</h1>
                <div className="back_btn_wrap">
                    <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                {blog ? (
                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Blog Title</label>
                            <input
                                type="text"
                                value={blog.title}
                                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group textareaField">
                            <h2>Description</h2>
                            <textarea
                                name="description"
                                value={blog.description}
                                onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={blog.clientName}
                                onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                            />
                        </div>

                        <div className="add_field repeaterFieldsData titleField">
                            <h2>Blog Content</h2>
                            {contentData.length > 0 && contentData.map((item, index) => {
                                if(item.added === true){
                                    if(item.type === "imageText"){
                                    return (<div className="singleReapterField">
                                        <div>
                                        <h3>Image and Text</h3>
                                        <p>Image: {item.contentImage && (<img src={config.BASE_URL + item.contentImage[0]}/>)}</p>
                                        <p>Text: {item.contentEditor}</p>
                                        <span className="btn removeItemBtn" onClick={() => removeRepeaterItem(index)}>Remove Item</span>
                                        </div>
                                    </div>)
                                    }
            
                                    if(item.type === "editorOnly") {
                                    return (<div className="singleReapterField">
                                        <div>
                                        <h3>Editor</h3>
                                        <p>Text: {item.contentEditor}</p>
                                        <span className="btn removeItemBtn" onClick={() => removeRepeaterItem(index)}>Remove Item</span>
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
                                        
                                        <span className="btn removeItemBtn" onClick={() => removeRepeaterItem(index)}>Remove Item</span>
                                        </div>
                                    </div>)
                                    }
            
                                    if(item.type === "bannerImage"){
                                    return (<div className="singleReapterField">
                                        <div>
                                        <h3>Banner Image</h3>
                                        <p>Image: {item.contentBannerImage && (<img src={config.BASE_URL + item.contentBannerImage[0]}/>)} </p>
                                        <p>Banner Text: {item.bannerText} </p>
                                        <span className="btn removeItemBtn" onClick={() => removeRepeaterItem(index)}>Remove Item</span>
                                        </div>
                                    </div>)
                                    }
                                }
                                }
                            )}
                        </div>

                        <div className="add_field">
                            <h2>Select Option</h2>
                            <select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="">--Select an Option--</option>
                                <option value="imageText">Image + Text</option>
                                <option value="editorOnly">Editor Only</option>
                                <option value="galleryImages">Gallery Images</option>
                                <option value="bannerImage">Banner Image</option>
                            </select>
                            </div>

                            {selectedOption === "imageText" && (
                            contentData.length > 0 && (
                                <div className="add_field">
                                <h2>Image</h2>
                                <input
                                    type="file"
                                    name="contentImage"
                                    onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                    required
                                />

                                <h2>Editor</h2>
                                <textarea
                                    style={{minHeight: "200px"}}
                                    name="contentEditor"
                                    value={contentData[contentData.length - 1].contentEditor}
                                    onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                    required
                                />
                                </div>
                            )
                            )}

                            {selectedOption === "editorOnly" && (
                            <div className="add_field">
                                <h2>Editor</h2>

                                <textarea
                                    style={{minHeight: "200px"}}
                                    name="contentEditor"
                                    value={contentData[contentData.length - 1].contentEditor}
                                    onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                    required
                                />
                            </div>
                            )}

                            {selectedOption === "galleryImages" && (
                            <div className="add_field">
                                <h2>Gallery Images</h2>
                                <input
                                type="file"
                                name="contentGalleryImages"
                                // onChange={(e) => handleInputChange(e.target)}
                                // value={contentData[contentData.length - 1].contentEditor}
                                onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                multiple
                                required
                                />
                            </div>
                            )}

                            {selectedOption === "bannerImage" && (
                            <div className="add_field">
                                <h2>Banner Image</h2>

                                <input
                                type="text"
                                name="bannerText"
                                onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                required
                                />

                                <input
                                type="file"
                                name="contentBannerImage"
                                onChange={(e) => handleRepeaterInputChange(contentData.length - 1, e.target)}
                                required
                                />
                            </div>
                            )}

                            {selectedOption !== "" && (
                            <span onClick={addRepeaterData} style={{background: "#fff", color: "#000", padding: "8px 30px"}}>Add</span>
                            )}

                        <div className="form-group">
                        <div className="detail_banner_wrap">
                            <div className="detail_img_grid">
                            
                                <div className="upload_item">
                                <label>Featured Image</label>
                                    <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                </div>
                                <div className="detail_img_grid">
                                    {blog.featuredImage ? (
                                        <div className="detail_img_item">
                                            <div className="banner_img_wrap">
                                            <img src={`${config.BASE_URL}${blog.featuredImage}`} alt="Featured" />
                                            </div>
                                            <button className="remove_btn" type="button" onClick={() => handleRemoveImage(blog.featuredImage)}>Remove</button>
                                        </div>
                                    ) : (
                                        <p>No image available.</p>
                                    )}
                                </div>
                                
                            </div>

                        </div>
                        </div>
                    
                    <div className="update_btn_wrap">
                        <button className="update_btn" type="submit">Update Blog</button>
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                        </div>
                    </form>
                ) : (
                    <h5>Blog not found!</h5>
                )}
            </div>
        </div>
    ); 
}

export default UpdateBlogDetail;
