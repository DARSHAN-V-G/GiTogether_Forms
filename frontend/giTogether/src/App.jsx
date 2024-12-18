import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegisterPage.jsx';
import './App.css'
import HomePage from './pages/home.jsx';
import Database from './pages/ViewData.jsx';
const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/view" element={<Database />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
