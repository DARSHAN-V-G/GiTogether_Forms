import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@mui/icons-material/Phone'; 
import { useState } from 'react';
import { Alert } from '@mui/material';

const PhoneInput = ({ phn_no, setPhoneNo, prevStep, nextStep }) => {
  const [phnmsg, setPhnmsg] = useState('');
  const handleChange = (e) => {
    setPhoneNo(e.target.value);
    setPhnmsg('')
  };

  const handleNext = (e) => {
    e.preventDefault();
    const phnNoPattern = /^\d{10}$/;
    if(!phn_no.trim()){
      setPhnmsg('Enter Phone number !')
    } else
    if (phnNoPattern.test(phn_no.trim())) {
      nextStep(); 
    } else {
      setPhnmsg('Please enter 10 digits'); 
     
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <TextField
        id="phn_no-input" 
        label="Phone Number" 
        variant="outlined" 
        value={phn_no}
        onChange={handleChange}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon sx={{ color: '#d91656' }} /> 
              
            </InputAdornment>
          ),
        }}
        sx={{
          width: '100%', // Full width for the TextField
          '& .MuiInputLabel-root': {
            color: '#d91656', // Label color
            '&.Mui-focused': {
              color: '#d91656', // Change label color when focused
            },
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d91656', // Outline color
            },
            '&:hover fieldset': {
              borderColor: '#d91656', // Outline color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#d91656', // Outline color when focused
            },
          },
          '& .MuiInputBase-input': {
            color: 'white', // Input text color
          },
        }}
      />
       {phnmsg &&  <Alert severity="error" sx={{ mt: 2 }}>{phnmsg}</Alert>} 
     
      <p style={{ margin: '1rem 0', color: 'white' ,fontSize:'14pt'}}>Promise we won’t spam you...much.👀</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button onClick={prevStep} style={{ ...buttonStyle,marginLeft:'1rem', }}>Back</button>
        <button onClick={handleNext}  style={{ ...buttonStyle,marginRight:'1rem', }}>Next</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  border: '1px solid rgba(255, 255, 255, 0.5)', 
  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  color: 'rgb(190, 142, 158)', 
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '40%',
  transition: 'background-color 0.3s', 
};

export default PhoneInput;
