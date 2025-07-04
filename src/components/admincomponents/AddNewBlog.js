import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import 'primereact/resources/themes/saga-blue/theme.css'; // Import PrimeReact Theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons
import config from "../../config";

function AddNewBlog() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    featuredImage: null,
    contentData: ''
  });


  const handleContentTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      contentType: value,
    }));
  };

  const handleInputChange = async (e) => {
    const { name, value, files } = e;
    
    if (files && files[0]) {
      console.log("files[0]: ",files[0]);
        const fileSize = files[0].size / (1024 * 1024); // Convert to MB
        if (fileSize > 10) { // Assuming the limit is 10 MB
            alert('File size exceeds 10 MB limit.');
            return;
        }
    }


    setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files : value
    }));
  };


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
  
  console.log("formData: ", formData);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('contentData', JSON.stringify(contentData));
    // data.append('featuredImage', formData.featuredImage);

    // Single file upload for featured image
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage[0]);
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-blog`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/blogs');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add blog');
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
            <form onSubmit={handleAddBlog} encType="multipart/form-data">
              <div className="form-login">
                <div className="add_field titleField">
                  <h2>Blog Title</h2>
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
                  <h2>Category</h2>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange(e.target)}
                    required
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
              {/* </div> */}



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
                <button type="submit">Add Blog</button>
              </div>

            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewBlog;
