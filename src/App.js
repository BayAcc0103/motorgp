import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Homepage from './components/news/Homepage'
import LoginForm from './components/loginform/Loginform';
import Calendar from './components/calendar/Calendar';
<<<<<<< Updated upstream
import AddEvent from './components/addevent/AddEvent';
=======
import Result from './components/result/Result';
import Standing from './components/standing/Standing';

>>>>>>> Stashed changes
const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/calendar" element={<Calendar/>}/>
<<<<<<< Updated upstream
          <Route path="/addevent" element={<AddEvent/>}/>
=======
          <Route path="/result" element={<Result/>}/>
          <Route path="/standing" element={<Standing/>}/>
>>>>>>> Stashed changes
        </Routes>
    </Router>
  )
}

export default App