import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import TestimonialDetails from '../../components/admincomponents/TestimonialDetails';

function ViewTestimonial({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <TestimonialDetails />            
    </>
  );
}

export default ViewTestimonial;
