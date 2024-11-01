
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Event Registration</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Roll No:</label>
        <input
          type="text"
          name="roll_no"
          value={formData.roll_no}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Phone Number:</label>
        <input
          type="tel"
          name="phn_no"
          value={formData.phn_no}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button onClick={handleSubmit} className="submit-btn" disabled={!isFormValid}>{(loading?<LoadingSpinner/>:"Register")}</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default RegistrationForm;