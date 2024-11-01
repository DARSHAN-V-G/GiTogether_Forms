import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

const RollNoInput = ({ roll_no, setRollNo, nextStep, prevStep }) => {
  const [rollmsg, setRollmsg] = useState('');

  const handleChange = (e) => {
    setRollNo(e.target.value);
    setRollmsg('');
  };

  const handleNext = (e) => {
    e.preventDefault();
    const rollNoPattern = /^(23|24)[nNzZ][2345]\d{2}$/;
    if(!roll_no.trim()){
      setRollmsg("Enter Roll Number and click next!");
    }else
    if (rollNoPattern.test(roll_no.trim())) {
      nextStep(); 
    } else {
      setRollmsg('Enter a valid roll number !'); 
     
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative', padding:'10px' }}>
      <TextField
        id="roll_no-input" // Unique ID for the TextField
        label="Roll Number" // Label for the input
        variant="outlined" // Using outlined variant
        value={roll_no}
        onChange={handleChange}
        placeholder='23N213 or 23n213'
        required
        sx={{
          width: '100%', // Full width for the TextField
          '& .MuiInputLabel-root': {
            color: '#d91656',
            '&.Mui-focused': {
              color: '#d91656', // Change label color when focused
            }, // Label color
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
      {rollmsg &&  <Alert severity="error" sx={{ mt: 2 }}>{rollmsg}</Alert>}
      <p style={{ margin: '1rem 0', color: 'white', textAlign: 'center',fontSize:'14pt' }}>Enter Roll number to reveal your department .</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button 
          onClick={prevStep} 
          
          style={{
            border: '1px solid rgba(255, 255, 255, 0.5)', 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgb(190, 142, 158)', 
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '40%',
            marginLeft:'1rem',
            transition: 'background-color 0.3s', 
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} 
        >
          Back
        </button>

        <button 
          onClick={handleNext} // Use handleNext for validation
          className="next-btn" 
          style={{
            border: '1px solid rgba(255, 255, 255, 0.5)', // 1px border with transparency
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent glass background color
            color: 'rgb(190, 142, 158)', // Text color matching specified RGB
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '40%',
            marginRight:'1rem',
            transition: 'background-color 0.3s', // Transition for hover effect
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'} // Change background on hover
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} // Reset background on mouse leave
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RollNoInput;
