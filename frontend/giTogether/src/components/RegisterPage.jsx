
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const SuccessMessage = () => (
  <div className="overlay">
    <div className="success-message">
      <p className="txt" style={{fontSize:"1.5rem",marginBottom:"20px"}}>Registration successful!</p>
      <p className="txt" style={{fontSize:"1.2rem",marginBottom:"20px"}}>Don't forget to join the fun on 14th November!!</p>
      <a className="txt" style={{fontSize:"1rem",marginBottom:"20px"}} href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer">Join our WhatsApp group</a>
      <a className="closebtn" href="/">Close</a>
    </div>
  </div>
);

const ErrorMessage = ()=>{
  <div className="overlay">
    <div className="success-message">
      <p className="txt" style={{fontSize:"1.5rem",marginBottom:"20px"}}>Error Occured while registration.</p>
      <p className="txt" style={{fontSize:"1.5rem",marginBottom:"20px"}}>Sorry for the inconvenience</p>
      <a className="closebtn" href="/register">Try Again</a>
    </div>
  </div>
};

const LoadingSpinner = () => {
  return <div className="loading-spinner"></div>;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    department: '',
    email: '',
    phn_no: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [iserror , setIsError] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/event/register`, formData);
      if (response.status === 201) {
        setIsSuccess(true);
      }
      else{
        setIsError(true);
      }
      setFormData({
        name: '',
        roll_no: '',
        department: '',
        email: '',
        phn_no: ''
      });
    } catch (error) {
      setIsError(true);
      console.error('Error during registration : ', error.message);
    }finally{
      setLoading(false);
    }
  };

  const particles = Array.from({ length: 50 });

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
      <>
        {iserror && <ErrorMessage/>}
        {isSuccess && <SuccessMessage />}
        <div className="main-container">
        <div className="main-container">
    {particles.map((_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        ></span>
      ))}
      <h1 className="txt">Join the Fun</h1>
      <form className="form-container">
        <input type="text" name="name" className="input" placeholder='Name' onChange={handleChange} value={formData.name} required/>

        <input type="text" name="roll_no" className="input" placeholder='Roll no' onChange={handleChange} value={formData.roll_no} required/>

        <select name="department" className="dropdown-input" onChange={handleChange} value={formData.department} required>
          <option value="" disabled>Select Department</option>
          <option value="CSE G1">CSE G1</option>
          <option value="CSE G2">CSE G2</option>
          <option value="CSE AI ML">CSE AI ML</option>
        </select>

        <input type="text" name="email" className="input" placeholder='Email' onChange={handleChange} value={formData.email} required/>

        <input type="text" name="phn_no" className="input" placeholder='Phone No' onChange={handleChange} value={formData.phn_no} required/>

        <button onClick={handleSubmit} className="submit-btn" disabled={!isFormValid}>{(loading?<LoadingSpinner/>:"Register")}</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default RegistrationForm;