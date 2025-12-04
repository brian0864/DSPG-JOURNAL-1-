
import React from 'react';

interface LogoProps {
  className?: string;
}

const DSPGLogo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      className={className}
      aria-label="Delta State Polytechnic Ogwashi-Uku Logo"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B4941F" />
        </linearGradient>
      </defs>
      
      {/* Outer Ring */}
      <circle cx="100" cy="100" r="95" fill="#002147" stroke="#D4AF37" strokeWidth="4" />
      <circle cx="100" cy="100" r="85" fill="white" />
      
      {/* Inner Circle Background */}
      <circle cx="100" cy="100" r="60" fill="#002147" />
      
      {/* Polytechnic Gear Symbol */}
      <path 
        d="M100 25 L110 45 L130 45 L135 65 L155 70 L150 90 L165 100 L150 110 L155 130 L135 135 L130 155 L110 155 L100 175 L90 155 L70 155 L65 135 L45 130 L50 110 L35 100 L50 90 L45 70 L65 65 L70 45 L90 45 Z" 
        fill="none" 
        stroke="#D4AF37" 
        strokeWidth="3"
      />
      
      {/* Academic Book */}
      <path 
        d="M60 100 C60 100 80 110 100 100 C120 110 140 100 140 100 V140 C140 140 120 150 100 140 C80 150 60 140 60 140 Z" 
        fill="white" 
      />
      <path d="M100 100 V140" stroke="#002147" strokeWidth="2" />
      
      {/* Text Ring */}
      <path id="textCurveTop" d="M 30 100 A 70 70 0 0 1 170 100" fill="transparent" />
      <path id="textCurveBottom" d="M 30 100 A 70 70 0 0 0 170 100" fill="transparent" />
      
      <text fill="#002147" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">
        <textPath href="#textCurveTop" startOffset="50%">DELTA STATE POLYTECHNIC</textPath>
      </text>
      
      <text fill="#002147" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">
        <textPath href="#textCurveBottom" startOffset="50%" dominantBaseline="hanging">OGWASHI-UKU</textPath>
      </text>
      
      {/* Center Initials */}
      <text x="100" y="85" fill="#D4AF37" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="serif">DSPG</text>
    </svg>
  );
};

export default DSPGLogo;
