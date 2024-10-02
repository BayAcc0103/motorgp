import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/result" element={<Result />} />
        <Route path="/standing" element={<Standing />} />
        <Route path="/rider" element={<Rider />} />
        <Route path="/team" element={<Team />} />
        <Route path="/schedule" element={<Schedule />} />

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
