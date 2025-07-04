import React from "react";
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AdminSettings from '../../components/admincomponents/AdminSettings';

function Settings({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AdminSettings  />            
    </>
  );
}

export default Settings;
