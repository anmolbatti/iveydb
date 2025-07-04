import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import MenuDetails from '../../components/admincomponents/MenuDetails';

function ViewMenu({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <MenuDetails />            
    </>
  );
}

export default ViewMenu;
