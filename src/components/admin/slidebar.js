import React from 'react';
import './admin.css';
import { Link } from 'react-router-dom';
import adminLogo from './asset/adminlogobw.png';
import accLogo from './asset/accountlogo.png';
import helmet from './asset/helmetbw.png';
import calend from './asset/calendarbw.png';
import cup from './asset/cupbw.png';
import logout from './asset/logoutbw.png';

const SlideBar = () => {
    return (
        <div className="row">
            <div className="col-2 custom-sidebar min-vh-100">
            <div className="sidebar p-2">
                <div className="m-2 d-flex align-items-center">
                    <img src={adminLogo} alt="Admin Logo" style={{ width: '85px' }} />
                    <span className="brand-name fs-4 ms-2">Admin</span>
                </div>

                <hr className="text-light" />

                {/* Sidebar Items */}
                <div className="list-group list-group-flush">
                    <Link to="account" className="list-group-item py-2 my-1 custom-sidebar-item">
                        <img src={accLogo} alt="account logo" style={{ width: '35px' }} />
                        <span className="fs-5 ms-2">Account</span>
                    </Link>

                    <Link to="/admin/racers-and-team" className="list-group-item py-2 my-1 custom-sidebar-item">
                        <img src={helmet} alt="helmet logo" style={{ width: '27px' }} />
                        <span className="fs-5 ms-2">Racers and team</span>
                    </Link>

                    <Link to="/admin/calendaradmin" className="list-group-item py-2 custom-sidebar-item">
                        <img src={calend} alt="calendar logo" style={{ width: '30px' }} />
                        <span className="fs-5 ms-2">Calendar</span>
                    </Link>

                    <Link to="/admin/ranking" className="list-group-item py-2 custom-sidebar-item">
                        <img src={cup} alt="ranking logo" style={{ width: '30px' }} />
                        <span className="fs-5 ms-2">Ranking</span>
                    </Link>

                    <Link to="/admin/logout" className="list-group-item py-2 custom-sidebar-item">
                        <img src={logout} alt="logout logo" style={{ width: '30px' }} />
                        <span className="fs-5 ms-2">Logout</span>
                    </Link>
                </div>
            </div>
            </div>
        </div>
            );
};

export default SlideBar;