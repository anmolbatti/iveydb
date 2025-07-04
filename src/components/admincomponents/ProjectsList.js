import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import config from '../../config';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [menus, setmenus] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, { withCredentials: true });
            
            if(response.data){
                setProjects(response.data);
            }

        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
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
                                        <div className="count"> {projects.length } Projects</div>
                                    </div>
                                    <div className="project_search">
                                        <form action="">
                                            <input type="text" name="search" placeholder="Search projects" />
                                            <button type="submit" className="btn">Search</button>
                                        </form>
                                    </div>
                                    <div className="add_project">
                                    <Link to="/admin/add-project">Add Project</Link>
                                    </div>
                                </header>
                                <table className="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Project Title</th>
                                            <th>Description</th>
                                            <th>Location</th>
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
                                            projects.map((project, index) => ( 
                                                <tr key={project._id}>
                                                    <td><p>{project.title}</p></td>
                                                    <td><p>{project.description}</p></td>
                                                    <td><p>{project.location}</p></td>
                                                    <td>
                                                        <Link to={`/admin/project/${project._id}`} className="view_detail">View Details</Link>
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

export default ProjectsList;
