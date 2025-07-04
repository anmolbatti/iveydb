import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewBlog from '../../components/admincomponents/AddNewBlog';

function Addblog({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewBlog />            
    </>
  );
}

export default Addblog;
