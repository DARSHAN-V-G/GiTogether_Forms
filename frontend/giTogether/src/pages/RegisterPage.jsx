import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import NameInput from '../components/FormComponents/NameInput';
import RollNoInput from '../components/FormComponents/RollNoInput';
import PhoneInput from '../components/FormComponents/PhoneInput';
import SummaryComponent from '../components/FormComponents/RegisterComponent';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const SuccessMessage = () => (
  <div className="overlay">
    <div className="success-message">
      <p className="txt" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Registration successful!</p>
      <p className="txt" style={{ fontSize: "1.2rem", marginBottom: "20px" }}>Don't forget to join the fun on 14th November!!</p>
      <a className="txt" style={{ fontSize: "1rem", marginBottom: "20px" }} href="/link" target="_blank" rel="noopener noreferrer">Join our WhatsApp group</a>
      <a className="closebtn" href="/">Close</a>
    </div>
  </div>
);

const ErrorMessage = () => {
  return (
    <div className="overlay">
      <div className="success-message">
        <p className="txt" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Error Occured while registration.</p>
        <p className="txt" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Sorry for the inconvenience</p>
        <a className="closebtn" href="/register">Try Again</a>
      </div>
    </div>
  );
};

const AlreadyRegistered = () => {
  return (
    <div className="overlay">
      <div className="success-message">
        <p className="txt" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>You have Already registered</p>
        <p className="txt" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Haha! I got You</p>
        <a className="closebtn" href="/">Get out</a>
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    department: '',
    email: '',
    phn_no: '',
    year: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [step, setStep] = useState(0);

  const departmentDict = {
    "24n2": "CSE (AI&ML)",
    "24z2": "CSE - G1",
    "24z3": "CSE - G2",
    "23n2": "CSE (AI&ML)",
    "23z2": "CSE - G1",
    "23z3": "CSE - G2",
    "24n4": "CSE (AI&ML)",
    "24z4": "CSE - G1"
  };

  const yearDict = {
    "24n2": 1,
    "24z2": 1,
    "24z3": 1,
    "23n2": 2,
    "23z2": 2,
    "23z3": 2,
    "24n4": 2,
    "24z4": 2,
  };

  const setDepartmentAndYear = () => {
    setFormData((prevData) => {
      const rollNoPrefix = prevData.roll_no.toLowerCase().slice(0, 4);
      let department = departmentDict[rollNoPrefix] || '';

      if (rollNoPrefix === '24z4') {
        const fifthChar = prevData.roll_no.charAt(4);
        department = fifthChar === '3' ? "CSE - G1" : "CSE - G2";
      }

      return {
        ...prevData,
        roll_no: prevData.roll_no.toUpperCase(),
        department,
        year: yearDict[rollNoPrefix] || '',
        email: prevData.roll_no.toLowerCase() + "@psgtech.ac.in",
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setDepartmentAndYear();

      const response = await axios.post(`${backend_url}/event/register`, formData);

      if (response.status === 201) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }

      setFormData({
        name: '',
        roll_no: '',
        department: '',
        email: '',
        phn_no: '',
        year: ''
      });

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.includes("duplicate key value violates unique constraint")) {
          console.error("Duplicate entry: Roll number already registered.");
          setRegistered(true);
        } else {
          console.error('Other error during registration: ', error.response.data.error);
          setIsError(true);
        }
      } else {
        console.error('Error during registration: ', error.message);
        setIsError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleNextStep = (nextRef) => {
    setStep((prevStep) => prevStep + 1);
    scrollToComponent(nextRef);
  };

  const handlePrevStep = (prevRef) => {
    setStep((prevStep) => prevStep - 1);
    scrollToComponent(prevRef);
  };

  const nameInputRef = useRef(null);
  const rollNoInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const summaryComponentRef = useRef(null);
  const particles = Array.from({ length: 50 });

  return (
    <>
      {isError && <ErrorMessage />}
      {isSuccess && <SuccessMessage />}
      {isRegistered && <AlreadyRegistered />}

      <div className="main-container">
        <div className="particles-container">
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
        </div>
        <div className="section" ref={nameInputRef}>
          {step === 0 && (
            <NameInput
              name={formData.name}
              setName={(name) => setFormData({ ...formData, name })}
              nextStep={() => handleNextStep(rollNoInputRef)}
            />
          )}
        </div>

        <div className="section" ref={rollNoInputRef}>
          {step === 1 && (
            <RollNoInput
              roll_no={formData.roll_no}
              setRollNo={(roll_no) => setFormData({ ...formData, roll_no })}
              prevStep={() => handlePrevStep(nameInputRef)}
              nextStep={() => {
                setDepartmentAndYear();
                handleNextStep(phoneInputRef);
              }}
            />
          )}
        </div>

        <div className="section" ref={phoneInputRef}>
          {step === 2 && (
            <PhoneInput
              phn_no={formData.phn_no}
              setPhoneNo={(phn_no) => setFormData({ ...formData, phn_no })}
              prevStep={() => handlePrevStep(rollNoInputRef)}
              nextStep={() => handleNextStep(summaryComponentRef)}
            />
          )}
        </div>

        <div className="section" ref={summaryComponentRef}>
          {step === 3 && (
            <SummaryComponent
              formData={formData}
              handleSubmit={handleSubmit}
              startFromFirst={() => {
                handlePrevStep(nameInputRef)
                setStep(0);
              }}
              loading={loading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;