import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from './intro.mp4'; // Make sure the path is correct

const NetflixTitle: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error('Video play error:', err));
    }
    setIsClicked(true);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate('/browse');
  };

  useEffect(() => {
    if (!isClicked) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnd = () => navigate('/browse');
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('ended', handleEnd);
    };
  }, [isClicked, navigate]);

  // Inline styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '100%',
      height: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: isClicked ? 'block' : 'none',
      animation: isClicked ? 'fadeIn 1s ease forwards' : undefined,
    },
    clickOverlay: {
      position: 'absolute',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 10,
      pointerEvents: 'none',
    },
    skipButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 20,
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background 0.3s ease',
    },
    skipButtonHover: {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
  };

  return (
    <div style={styles.container} onClick={handlePlayVideo}>
      <video
        ref={videoRef}
        playsInline
        src={intro}
        style={styles.video}
      />

      {!isClicked && <div style={styles.clickOverlay}>Click anywhere to start</div>}

      {isClicked && (
        <button
          style={styles.skipButton}
          onClick={handleSkip}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}
        >
          Skip Intro
        </button>
      )}

      {/* Fade-in keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default NetflixTitle;
