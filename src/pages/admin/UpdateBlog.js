import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateBlogDetail from '../../components/admincomponents/UpdateBlogDetail';

function UpdateBlog({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateBlogDetail />            
    </>
  );
}

export default UpdateBlog;
