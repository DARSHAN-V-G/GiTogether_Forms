import React, { useState, useRef } from 'react';
import rick_roll from '../assets/rick-roll.mp4';
import loadingSvg from '../assets/loading.svg';
import { colors } from '@mui/material';
const whatsappGroupLink = 'https://chat.whatsapp.com/your-group-link'; // Replace with your WhatsApp group link

const LoadingSpinner = () => {
  return (
    <div  style={{ background:'rgb(255,255,255,0)',borderRadius: '7px', margin: '10px', padding: '10px 20px', display: 'block' ,width:'80px',height:'30px'}}
    >
      <img src={loadingSvg} alt="Loading..." />
    </div>
  );
};
const WhatsAppInvite = () => {
  const [showMeme, setShowMeme] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWhatsAppLink, setShowWhatsAppLink] = useState(false);
  const videoRef = useRef(null);

  const handleInviteClick = () => {
    setShowMeme(true);
    setLoading(true);

    // Start playing the video and set a timer to show the link after 8 seconds
    if (videoRef.current) {
      videoRef.current.play();
    }

    setTimeout(() => {
      setLoading(false);
      setShowWhatsAppLink(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 8000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      {!showMeme && (
        <button 
          style={{ borderRadius: '7px', margin: '5px', padding: '10px 20px' }} 
          onClick={handleInviteClick} 
          className="submit-btn">
          Join our WhatsApp Group!
        </button>
      )}

      {showMeme && (
        <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <video 
            ref={videoRef} 
            src={rick_roll} 
            autoPlay 
            controls 
            className="meme-video" 
            style={{ width: '100%', height: 'auto', borderRadius: '10px', marginTop: '20px' }} 
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
            <p className="txt">Haha! You have been rickrolled. </p>
            <a 
              href={whatsappGroupLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="submit-btn"
              style={{ background:'rgb(255,255,255,0.1)',borderRadius: '7px', margin: '10px', padding: '10px 20px', display: 'block' }}
            >
              Click here to join our WhatsApp Group!
            </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WhatsAppInvite;
