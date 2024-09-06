import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Homepage from './components/news/Homepage'
import LoginForm from './components/loginform/Loginform';
import Calendar from './components/calendar/Calendar';
const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/calendar" element={<Calendar/>}/>
        </Routes>
    </Router>
  )
}

export default App