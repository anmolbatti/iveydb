import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from '../../config';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function AdminDashboard({ onLogout }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [selectedHomeProject, setSelectedHomeProject] = useState(null);
    const [selectedDetailProject, setSelectedDetailProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, { withCredentials: true });
            setProjects(response.data); // Set the fetched projects to state
        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedProjects = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-featured-projects`, { withCredentials: true });
            if(response){
                setSelectedProjects(response?.data.featuredProjects);
                setSelectedHomeProject(response?.data.homePageFeatured);
                setSelectedDetailProject(response?.data.detailPageFeatured);
            }
        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchFeaturedProjects();
    }, []);

    const saveFeaturedProjects = async () => {
        const payload = {
            featuredProjects: selectedProjects,
            homePageFeatured: selectedHomeProject,
            detailPageFeatured: selectedDetailProject,
        };

        try {
            await axios.post(`${config.BASE_URL}/api/admin/update-featured-projects`, JSON.stringify(payload),  { 
                withCredentials: true,  
                headers: {
                    'Content-Type': 'application/json'
                } 
            });
            
        } catch (err) {
            setError('Failed to save featured projects');
        }
    }

    return (
        <>
            <div className="dashboard">
                <div className="container">
                    <h1 className="dash_title">Settings</h1>
                    <div className="main-section_dashboard">
                        <div class="content">
                            <div className="featuredInnerContent">
                            <div className="setFeaturedProjects">
                                <h4>Select featured projects</h4>

                                <MultiSelect 
                                    value={selectedProjects} 
                                    onChange={(e) => setSelectedProjects(e.value)} 
                                    options={projects} 
                                    optionLabel="title" 
                                    placeholder="Select Projects" 
                                    maxSelectedLabels={3} 
                                    className="w-full md:w-20rem" 
                                />
                            </div>

                            <div className="setFeaturedProjectsHome">
                                <h4>Select featured project for homepage</h4>

                                <Dropdown 
                                    value={selectedHomeProject} 
                                    onChange={(e) => setSelectedHomeProject(e.value)} 
                                    options={projects} 
                                    optionLabel="title" 
                                    placeholder="Select project" 
                                    className="w-full md:w-14rem" 
                                />

                            </div>

                            <div className="setFeaturedProjectsHome">
                                <h4>Select featured project for homepage</h4>

                                <Dropdown 
                                    value={selectedDetailProject} 
                                    onChange={(e) => setSelectedDetailProject(e.value)} 
                                    options={projects} 
                                    optionLabel="title" 
                                    placeholder="Select project" 
                                    className="w-full md:w-14rem" 
                                />

                            </div>

                            <div className="saveFeaturedBtn">
                                <Button label="Save" style={{padding: "4px 8px", marginTop: "10px"}} onClick={saveFeaturedProjects} />
                            </div>

                            <div className="error">
                                {error && error}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
