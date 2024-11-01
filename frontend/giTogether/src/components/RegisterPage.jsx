import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    department: '',
    email: '',
    phn_no: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('event/register', {
        ...formData,
        department : '',
        email: formData.roll_no.toLowerCase() + '@psgtech.ac.in'
      });
      setMessage('Registration successful!');
      console.log(response.data);
      setFormData({
        name: '',
        roll_no: '',
        department: '',
        email: '',
        phn_no: ''
      });
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Error during registration : ', error.message);
    }
  };

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
        <label style={styles.label}>Phone Number:</label>
        <input
          type="tel"
          name="phn_no"
          value={formData.phn_no}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#333'
  },
  message: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  label: {
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default RegistrationForm;
