import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateTestimonialDetail from '../../components/admincomponents/UpdateTestimonialDetail';

function UpdateTestimonial({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateTestimonialDetail />            
    </>
  );
}

export default UpdateTestimonial;
