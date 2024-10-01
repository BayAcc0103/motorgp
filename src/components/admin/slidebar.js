import React from 'react';
import './admin.css';
import { Link } from 'react-router-dom';
import adminLogo from './asset/adminlogobw.png';
import accLogo from './asset/accountlogo.png';
import helmet from './asset/helmetbw.png';
import calend from './asset/calendarbw.png';
import cup from './asset/cupbw.png';
import logout from './asset/logoutbw.png';

import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SlideBar = ({ isOpen, onClose }) => {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={isOpen}
            sx={{ width: 240, flexShrink: 0 }}
        >
            <div className="row">
                <div className="col-2 custom-sidebar min-vh-100">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className="sidebar p-2">
                        <div className="m-2 d-flex align-items-center">
                            <img src={adminLogo} alt="Admin Logo" style={{ width: '85px' }} />
                            <span className="brand-name fs-4 ms-2">Admin</span>
                        </div>

                        <hr className="text-light" />

                        {/* Account Section */}
                        <div className="list-group list-group-flush">
                            <Link to="account" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={accLogo} alt="account logo" style={{ width: '35px' }} />
                                <span className="fs-5 ms-2">Account</span>
                            </Link>
                        </div>

                        {/* Calendar Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/calendaradmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={calend} alt="calendar logo" style={{ width: '30px' }} />
                                <span className="fs-5 ms-2">Calendar</span>
                            </Link>
                        </div>

                        {/* Schedule Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/schedule" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={calend} alt="calendar logo" style={{ width: '30px' }} />
                                <span className="fs-5 ms-2">Schedule</span>
                            </Link>
                        </div>

                        {/* Rider Section */}
                        {/* <div className="list-group list-group-flush">
                            <Link to="/admin/racersadmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={helmet} alt="helmet logo" style={{ width: '27px' }} />
                                <span className="fs-5 ms-2">Rider</span>
                            </Link>
                        </div> */}

                        <div className="list-group list-group-flush">
                            <Link to="/admin/ridersadmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={helmet} alt="helmet logo" style={{ width: '27px' }} />
                                <span className="fs-5 ms-2">Rider</span>
                            </Link>
                        </div>

                        {/* Team Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/teamsadmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={helmet} alt="helmet logo" style={{ width: '27px' }} />
                                <span className="fs-5 ms-2">Team</span>
                            </Link>
                        </div>

                        {/* Result Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/resultadmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={cup} alt="results logo" style={{ width: '30px' }} />
                                <span className="fs-5 ms-2">Result</span>
                            </Link>
                        </div>

                        {/* Standing Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/standingadmin" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={cup} alt="standing logo" style={{ width: '30px' }} />
                                <span className="fs-5 ms-2">Standing</span>
                            </Link>
                        </div>
                            
                        {/* Logout Section */}
                        <div className="list-group list-group-flush">
                            <Link to="/admin/logout" className="list-group-item py-2 my-1 custom-sidebar-item">
                                <img src={logout} alt="logout logo" style={{ width: '30px' }} />
                                <span className="fs-5 ms-2">Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default SlideBar;
