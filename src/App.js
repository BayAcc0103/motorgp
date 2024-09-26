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
import RacersAdmin from './components/admin/pages/RacerAdmin';
import TeamsAdmin from './components/admin/pages/TeamAdmin';
import CalendarAdmin from './components/admin/pages/CalendarAdmin';
import ResultAdmin from './components/admin/pages/ResultAdmin';
import StandingAdmin from './components/admin/pages/StandingAdmin';
import Footer from './components/footer/Footer';

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

        {/* Admin Route with Nested Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="account" element={<Account />} />
          <Route path="racersadmin" element={<RacersAdmin />} />
          <Route path="teamsadmin" element={<TeamsAdmin />} />
          <Route path="calendaradmin" element={<CalendarAdmin />} />
          <Route path="resultadmin" element={<ResultAdmin />} />
          <Route path="standingadmin" element={<StandingAdmin />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
