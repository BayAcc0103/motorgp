// trang admin có những gì?
// sidebar -- các chức năng | chức năng A
//                          | chức năng B  
//                          | chức năng thứ n          
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './admin.css';
import SlideBar from './slidebar';
const Admin = () => {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <div className="col-2 custom-sidebar min-vh-100">
        </div>
        {/* Main Content */}
        <div>
          <SlideBar/>
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </div>
    </div>

  );
}

export default Admin;
