import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewTestimonial from '../../components/admincomponents/AddNewTestimonial';

function AddTestimonial({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewTestimonial />            
    </>
  );
}

export default AddTestimonial;
