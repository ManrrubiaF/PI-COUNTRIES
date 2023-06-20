import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function LandingPage() {
  const navigate = useNavigate();


  const handleComeInClick = () => {
    navigate('/Home');
  };


  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <h1>Your journey starts here</h1>
        <h2>Discover your new destination!</h2>
        <button className='button-enter' onClick={handleComeInClick}>Come In</button>        
      </div>
    </div>
  );
}

export default LandingPage;
