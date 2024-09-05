import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import logo from './asset/motogp-logo.jpg'
import logo1 from './asset/racing-helmet.png'

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

  const city = 'TP. Hồ Chí Minh';
  const temperature = '31°C';
  const condition = 'Nắng';
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <img src={logo} alt="Logo" style={{ width: '100px', height: '50px', marginRight: '5px'}} ></img>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" style={{ color: 'white' }} className="nav-link active" aria-current="page">
                <i className="bi bi-house-door" style={{ fontSize: '24px' }}></i>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Calendar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Results & Standings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Rider & Teams</a>
              </li>
            </ul>
            <div className="d-flex align-items-center custom-gap ms-auto">
              <div className="d-flex flex-column me-3">
                <span className="text-primary">{city}</span>
                <span className="text-white">{currentDate}</span>
              </div>
              <div className="d-flex align-items-center me-3">
                <i className="bi bi-sun" style={{ fontSize: '24px', color: 'orange' }}></i>
                <span className="text-danger fs-4 ms-2">{temperature}</span>
              </div>
              <span className="text-white">{condition}</span>
            </div>
          </div>
          <div class="d-flex gap-2 justify-content-center custom-gap">
            <Link to="/login">
              <button class="btn btn-outline-danger text-white" type="login">
                <span class="bi-person-circle"></span>Login</button>
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
