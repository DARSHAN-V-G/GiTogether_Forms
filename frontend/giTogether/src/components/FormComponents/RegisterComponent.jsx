import React from 'react';
import './FormComponents.css'
const LoadingSpinner = () => {
    return <div className="loading-spinner"></div>;
  };

const SummaryComponent = ({ formData, handleSubmit,startFromFirst, loading }) => {
  const text = `Gotcha ${formData.name}! As if we didn’t already know you’re a ${formData.department} genius, currently slaying it in your ${formData.year=='1' ? '1st' : '2nd'} year🎉! Check your inbox at ${formData.email} – or don’t.`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', position: 'relative', padding:'10px',width:"80%"}}>
      <h2 className="confirmtxt">Confirm Your Details</h2>
      <p style={{ margin: '1rem 0', color: 'white',textAlign:'center',fontSize:'18pt',fontFamily:"'Red Rose', serif"}}>{text}</p>
      <p style={{ margin: '1rem 0', color: 'white',textAlign:'center',fontSize:'18pt',fontFamily:"'Red Rose', serif" }}>If you need to change your details, Go back and Change</p>
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
