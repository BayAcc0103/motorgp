import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import logo from './asset/motogp-logo.jpg'
import logo1 from './asset/helmet.png'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0'); // Ngày
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng
      const year = now.getFullYear(); // Năm    
      // Mảng chứa tên các thứ
      const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const weekday = weekdays[now.getDay()]; // Lấy thứ
      const dateString = `${weekday}, ${day}/${month}/${year}`; // Định dạng thứ, ngày/tháng/năm
      setCurrentDate(dateString);
    };
    updateDate(); // Cập nhật ngay khi load
    const interval = setInterval(updateDate, 1000 * 60); // Cập nhật mỗi phút
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <div class="top">
            <img src={logo} alt="Logo" style={{ width: '100px', height: '50px', marginRight: '5px' }} class="img-logo"></img>

            {/* button navbar-toggler được thiết kế để chỉ hiển thị khi chiều rộng màn hình giảm xuống một mức nhất định.*/}
            <Nav className="navbar-toggler">
              <NavDropdown>
                <Link to="/" className="nav-link" aria-current="page">Homepage</Link>
                <Link to="/calendar" className="nav-link" aria-current="page">Calendar</Link>
                <Link to="./result" className="nav-link" aria-current="page">Results</Link>
                <Link to="./standing" className="nav-link" aria-current="page">Standings</Link>
                <Link to="./rider" className="nav-link" aria-current="page">Riders</Link>
                <Link to="./team" className="nav-link" aria-current="page">Teams</Link>
              </NavDropdown>
            </Nav>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" style={{ color: 'white' }} className="nav-link active" aria-current="page">
                  <i className="bi bi-house-door" style={{ fontSize: '24px' }}></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/calendar" className="nav-link text-white" aria-current="page" 
                style={{ fontFamily: '"Playwrite DE Grund", cursive', fontStyle: 'bold' }}>Calendar</Link>
              </li>
              <Nav>
                <NavDropdown
                  style={{ fontFamily: '"Playwrite DE Grund", cursive' }}
                  id="nav-dropdown"
                  title="Results & Standings"
                  menuVariant="dark"
                >
                  <Link to="./result"><NavDropdown.Item href="#action/3.1" >Results</NavDropdown.Item></Link>
                  <Link to="./standing"><NavDropdown.Item href="#action/3.2">Standings</NavDropdown.Item></Link>
                </NavDropdown>
              </Nav>

              <Nav>
                <NavDropdown
                  style={{ fontFamily: '"Playwrite DE Grund", cursive' }}
                  id="nav-dropdown"
                  title="Riders & Teams"
                  menuVariant="dark"
                >
                  <Link to="./rider"><NavDropdown.Item href="#action/3.1">Riders</NavDropdown.Item></Link>
                  <Link to="./team"><NavDropdown.Item href="#action/3.2">Teams</NavDropdown.Item></Link>
                </NavDropdown>
              </Nav>
            </ul>

            <div className="d-flex align-items-center custom-gap ms-auto">
              <div className="d-flex flex-column me-3">
                <span className="text-white" style={{ fontFamily: '"Playwrite DE Grund", cursive' }}>{currentDate}</span>
              </div>
            </div>
          </div>
          <div class="d-flex gap-2 justify-content-center custom-gap">
            <Link to="./admin">
              <button class="btn btn-outline-danger text-white" type="login" style={{ fontFamily: '"Playwrite DE Grund", cursive' }}>
                <span class="bi-person-circle" ></span>Admin</button>
            </Link>
            <img src={logo1} alt='racing-helmet'></img>
          </div>
          {/* thời tiết */}
        </div>
      </nav>
    </>
  )
}

export default Navbar
