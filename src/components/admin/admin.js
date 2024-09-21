// trang admin có những gì?
// sidebar -- các chức năng | chức năng A
//                          | chức năng B  
//                          | chức năng thứ n          
import React, { useState } from 'react';
// import { Route, Router, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
// import adminLogo from './asset/adminlogobw.png';
// import accLogo from './asset/accountlogo.png';
// import helmet from './asset/helmetbw.png';
// import calend from './asset/calendarbw.png';
// import cup from './asset/cupbw.png';
// import logout from './asset/logoutbw.png';

// Import các trang
// import Account from './pages/Account';
// import RacersAndTeam from './pages/RacersAndTeam';
// import CalendarAdmin from './pages/CalendarAdmin';
// import Ranking from './pages/Ranking';
import SlideBar from './slidebar';
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <div className="col-2 custom-sidebar min-vh-100">
          {/* Sidebar */}
          {/* <div className="sidebar p-2">
            <div className="m-2 d-flex align-items-center">
              <img src={adminLogo} alt="Admin Logo" style={{ width: '85px' }} />
              <span className="brand-name fs-4 ms-2">Admin</span>
            </div>

            <hr className="text-light" /> */}

          {/* Sidebar Items */}
          {/* <div className="list-group list-group-flush">
              <Link to="account" className="list-group-item py-2 my-1 custom-sidebar-item">
                <img src={accLogo} alt="account logo" style={{ width: '35px' }} />
                <span className="fs-5 ms-2">Account</span>
              </Link>

              <Link to="racers-and-team" className="list-group-item py-2 my-1 custom-sidebar-item">
                <img src={helmet} alt="helmet logo" style={{ width: '28px' }} />
                <span className="fs-5 ms-2">Racers and team</span>
              </Link>

              <Link to="calendaradmin" className="list-group-item py-2 custom-sidebar-item">
                <img src={calend} alt="calendar logo" style={{ width: '30px' }} />
                <span className="fs-5 ms-2">Calendar</span>
              </Link>

              <Link to="ranking" className="list-group-item py-2 custom-sidebar-item">
                <img src={cup} alt="ranking logo" style={{ width: '30px' }} />
                <span className="fs-5 ms-2">Ranking</span>
              </Link>

              <Link to="logout" className="list-group-item py-2 custom-sidebar-item">
                <img src={logout} alt="logout logo" style={{ width: '30px' }} />
                <span className="fs-5 ms-2">Logout</span>
              </Link>
            </div>
          </div> */}
        </div>
        {/* Main Content */}
        <div>
          <button className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </button>
          <SlideBar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
          {/* <Routes>
              <Route path="account" element={<Account />} />
              <Route path="racers-and-team" element={<RacersAndTeam />} />
              <Route path="calendar-admin" element={<CalendarAdmin />} />
              <Route path="ranking" element={<Ranking />} />
            </Routes>
           */}
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </div>
    </div>

  );
}

export default Admin;
