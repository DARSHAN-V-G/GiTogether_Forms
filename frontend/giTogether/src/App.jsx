import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegisterPage';
import './App.css'
import HomePage from './pages/home.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/register" element={<RegistrationForm />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
