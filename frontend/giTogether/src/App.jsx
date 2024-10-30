import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegisterPage';
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<RegistrationForm />} /> 
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

