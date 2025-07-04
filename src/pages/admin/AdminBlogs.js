import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import BlogsList from '../../components/admincomponents/BlogsList';

function AdminBlogs({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <BlogsList  />            
    </>
  );
}

export default AdminBlogs;
