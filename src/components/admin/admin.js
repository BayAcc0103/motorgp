// trang admin có những gì?
// sidebar -- các chức năng | chức năng A
//                          | chức năng B  
//                          | chức năng thứ n          
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import './admin.css';
import SlideBar from './slidebar';

import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './slidebar'; // Import the Sidebar component

import { isAdmin } from '../../context/decoder'; // Import the isAdmin function
const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility


  if (isAdmin()) {



    // Function to toggle sidebar open
    const handleSidebarOpen = () => {
      setIsSidebarOpen(true);
    };

    // Function to close sidebar
    const handleSidebarClose = () => {
      setIsSidebarOpen(false);
    };
    return (
      <div className="container-fluid min-vh-100">
        <IconButton onClick={handleSidebarOpen} style={{ position: 'fixed', top: 70, left: 0 }}>
          <MenuIcon />
        </IconButton>
        {/* Main Content */}
        <div>
          <SlideBar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
          <Outlet />
        </div>
      </div>

    );
  } else {

    return <Navigate to="/login" />; // Use Navigate instead of Redirect
  }

}

export default Admin;
