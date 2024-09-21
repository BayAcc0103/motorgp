// trang admin có những gì?
// sidebar -- các chức năng | chức năng A
//                          | chức năng B  
//                          | chức năng thứ n          
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './admin.css';
import SlideBar from './slidebar';

import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './slidebar'; // Import the Sidebar component
const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

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
          <SlideBar isOpen={isSidebarOpen} onClose={handleSidebarClose}/>
          <Outlet />
        </div>
    </div>

  );
}

export default Admin;
