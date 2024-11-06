import React from 'react';
import './FormComponents.css'
const LoadingSpinner = () => {
    return <div className="loading-spinner"></div>;
  };

const SummaryComponent = ({ formData, handleSubmit,startFromFirst, loading }) => {
  const text = (
    <span>
     So You’re  <span style={{ color: '#d91656' }}>{formData.name}</span> from 
      <span style={{ color: '#d91656' }}> {formData.department} </span>
      <span style={{ color: '#d91656' }}>
       ( {formData.year === 1 ? '1st' : '2nd'} year)
      </span> with roll number <span style={{ color: '#d91656' }}>{formData.roll_no}</span>. If you need to Double-Check, just click Go Back.
    </span>
  );
   return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative', padding:'10px',width:"80%"}}>
      <h2 className="confirmtxt">Confirm Your Details</h2>
      <p style={{ margin: '1rem 0', color: 'white',textAlign:'center',fontSize:'18pt',fontFamily:"'Red Rose', serif"}}>{text}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <button style={{borderRadius:'7px',margin:'5px'}} type="button" onClick={startFromFirst} className='submit-btn'>
        Go  back
      </button>
      <button style={{borderRadius:'7px',margin:'5px'}} onClick={handleSubmit} className="submit-btn" disabled={loading}>
        {loading ? <LoadingSpinner/> : "Register"}
      </button>

      </div>
    </div>
  );
};

export default SummaryComponent;
