import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

const NameInput = ({ name, setName, nextStep }) => {
    const handleChange = (e) => {
      setName(e.target.value);
      setNameError('')
    };
    const [nameError,setNameError] = useState('');
    const handleNext = (e) => {
      e.preventDefault();
      if (name.trim() !== '') {
        nextStep();
      } else {

        console.error('Name is required');
        setNameError('Enter Name !')
      }
    };
    return (
      <>
      <p style={{position:'absolute', alignContent:'center',top:'30px'}} className='registerationtxt'>Let's Git Together</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative', padding:'10px' }}>
      <TextField
        id="name-input"
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleChange}
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
       {nameError &&  <Alert severity="error" sx={{ mt: 2 }}>{nameError}</Alert>}
      <p style={{ margin: '1rem 0', color: 'white',textAlign:'center',fontSize:'14pt',fontFamily:"'Red Rose', serif" }}>We’ll try not to forget your name</p>

      <button
        onClick={handleNext}
        style={{

          border: '1px solid rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'rgb(190, 142, 158)',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
      >
        Next
      </button>
    </div>
    </>
    );
  };

  export default NameInput;
