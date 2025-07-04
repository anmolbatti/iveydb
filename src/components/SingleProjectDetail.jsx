import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../config';

export default function SingleProjectDetail({ project }) {
  // const [project, setProject] = useState([]);

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const response = await axios.get(`${config.BASE_URL}/api/admin/single-project/${slug}`);
  //       setProject(response.data);
  //     } catch (error) {
  //       console.error("Error fetching project:", error);
  //     }
  //   };

  //   fetchProject();
  // }, [slug]);

  const team = project.team ? JSON.parse(project.team[0]) : [];

  return (
    <>
      <div className='single-project-detail d-flex position-relative text-white'>
        <div className='single-project-detail-left single-project-detail-inner' data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
          <h3 style={{fontSize: "16px", lineHeight: "1.5"}}>{project.description}</h3>
        </div>
        <div className='single-project-detail-right single-project-detail-inner' data-aos="fade-up" data-aos-delay="900" data-aos-duration="1000">
          <h6 className='font-11 text-uppercase'>IVEY DESIGN BUILD PROJECT TEAM</h6>
          <ul>
            {team.map((member, index) => (
              <li key={index}>
                <span className='font-medium'>{member.name}</span> {member.position}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  )
}
