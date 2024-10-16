import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Homepage from './components/news/Homepage';
import LoginForm from './components/loginform/Loginform';
import Calendar from './components/calendar/Calendar';
import Result from './components/result/Result';
import Standing from './components/standing/Standing';
import Rider from './components/rider/Rider';
import Team from './components/team/Team';
import Admin from './components/admin/admin';
import Account from './components/admin/pages/Account';
import RidersAdmin from './components/admin/pages/RiderAdmin';
import TeamsAdmin from './components/admin/pages/TeamAdmin';
import CalendarAdmin from './components/admin/pages/CalendarAdmin';
import ScheduleAdmin from './components/admin/pages/ScheduleAdmin';
import ResultAdmin from './components/admin/pages/ResultAdmin';
import StandingAdmin from './components/admin/pages/StandingAdmin';
import Footer from './components/footer/Footer';
import Schedule from './components/schedule/Schedule';
import ReviewPDF from './components/review/Review';
import {jwtDecode} from 'jwt-decode'
const App = () => {
  const [userName, setUserName] = useState(null);

  const handleUserLogin = (name) => {
    setUserName(name);
  };
  
  useEffect(() => {
    // Check if user is logged in and set userName accordingly
    const token = localStorage.getItem('token');
    setUserName(token ? jwtDecode(token).user.name : null)
  }, [])

  return (
    <Router>
      <Navbar userName={userName} onUserLogin={handleUserLogin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm onUserLogin={handleUserLogin} />} />
        <Route path="/calendar" element={<Calendar />} />
        {/* <Route exact path='/' element={<ProtectedRoute/>}>
      <Route exact path='/result' element={<Result/>}/>
</Route> */}
        <Route path='/result' element={<Result/>}/>
        <Route path="/standing" element={<Standing />} />
        <Route path="/rider" element={<Rider />} />
        <Route path="/team" element={<Team />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/reviewpdf" element={<ReviewPDF />} />

        {/* Admin Route with Nested Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="account" element={<Account />} />
          <Route path="ridersadmin" element={<RidersAdmin />} />
          <Route path="teamsadmin" element={<TeamsAdmin />} />
          <Route path="calendaradmin" element={<CalendarAdmin />} />
          <Route path="scheduleadmin" element={<ScheduleAdmin />} />
          <Route path="resultadmin" element={<ResultAdmin />} />
          <Route path="standingadmin" element={<StandingAdmin />} />

        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
