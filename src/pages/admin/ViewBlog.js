import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import BlogDetails from '../../components/admincomponents/BlogDetails';

function ViewBlog({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <BlogDetails />            
    </>
  );
}

export default ViewBlog;
