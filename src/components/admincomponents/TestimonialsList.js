import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import config from '../../config';

function TestimonialsList() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-testimonials`, { withCredentials: true });
            
            if(response.data){
                setTestimonials(response.data);
            }

        } catch (err) {
            setError('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    return (
        <>
            <div className="dashboard">
                <div className="container">
                    <h1 className="dash_title">Projects</h1>
                    <div className="main-section">
                        <div className="projects">
                            <div className="projects-inner">
                                <header className="projects-header">
                                    <div className="title">
                                        Total 
                                        <div className="count"> {testimonials.length } Testimonials</div>
                                    </div>
                                    <div className="project_search">
                                        <form action="">
                                            <input type="text" name="search" placeholder="Search Testimonials" />
                                            <button type="submit" className="btn">Search</button>
                                        </form>
                                    </div>
                                    <div className="add_project">
                                    <Link to="/admin/add-testimonial">Add Testimonial</Link>
                                    </div>
                                </header>
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Testimonial Title</th>
                                            <th>Description</th>
                                            <th>Client Name</th>
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
                                            testimonials.map((testimonial, index) => ( 
                                                <tr key={testimonial._id}>
                                                    <td><p>{testimonial.title}</p></td>
                                                    <td><p>{testimonial.description}</p></td>
                                                    <td><p>{testimonial.clientName}</p></td>
                                                    <td>
                                                        <Link to={`/admin/testimonial/${testimonial._id}`} className="view_detail">View Details</Link>
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

export default TestimonialsList;
