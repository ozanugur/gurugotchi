import React, { useEffect } from 'react';
import './FloatingText.css';

const FloatingText = ({ imageUrl, show, onAnimationEnd }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onAnimationEnd, 2000); // Adjust the timeout duration to match the animation duration
      return () => clearTimeout(timer);
    }
  }, [show, onAnimationEnd]);

  return (
    <div className={`floating-text ${show ? 'show' : ''}`}>
      {imageUrl && <img src={imageUrl} alt="Floating" />}
    </div>
  );
};

export default FloatingText;
