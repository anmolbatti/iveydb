import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import TestimonialsList from '../../components/admincomponents/TestimonialsList';

function AdminTestimonials({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <TestimonialsList  />            
    </>
  );
}

export default AdminTestimonials;
