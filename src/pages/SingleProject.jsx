import React, {useEffect, useState} from 'react';
import Layout from './layout';
import SingleProjectBanner from '../components/SingleProjectBanner';
import SingleProjectDetail from '../components/SingleProjectDetail';
import SingleProjectGallery from '../components/SingleProjectGallery';
import AdditionalProject from '../components/AdditionalProject';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import config from '../../src/config';

export default function SingleProject() {
  const { slug } = useParams(); 
  const [project, setProject] = useState(null); // State to store project data

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/single-project/${slug}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [slug]);

  return (
    <Layout page={"single-project"}>
      {project && ( <>
        <SingleProjectBanner project={project} /> 
        <SingleProjectDetail project={project} /> 
        <SingleProjectGallery project={project} /> 
        <AdditionalProject /> 
      </> )}
    </Layout>
  );
}
