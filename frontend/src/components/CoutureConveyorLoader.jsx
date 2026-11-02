import React, { useState, useEffect } from 'react';

export default function CoutureConveyorLoader({
  title = "Preparing Haute Couture Model",
  subtitle = "High-Speed 2-Step Neural Fashion Fabrication",
  elapsedSec = 0
}) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const PHASES = [
    { label: "STATION 01 · ANATOMICAL SCANNING", desc: "Mapping biometric proportions & posture geometry..." },
    { label: "STATION 02 · CONVEYOR DRAPE DISPENSER", desc: "Precision robotic arm fitting tailored textile layer..." },
    { label: "STATION 03 · 2-STEP TURBO NEURAL SYNTHESIS", desc: "Synthesizing micro-fiber weave, lighting & reflections..." },
    { label: "STATION 04 · DUCKDB COMMIT & ARCHIVE", desc: "Storing 8K render & binary BLOB into persistent catalog..." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="conveyor-loader-container">
      {/* HEADER METRICS */}
      <div className="conveyor-header">
        <div className="conveyor-status-pill">
          <span className="conveyor-pulsing-dot" />
          <span>AUTONOMOUS ATELIER CONVEYOR ACTIVE</span>
        </div>
        <span className="conveyor-timer">{elapsedSec.toFixed(1)}s ELAPSED</span>
      </div>

      {/* MECHANICAL SVG RUNWAY & CONVEYOR BELT */}
      <div className="conveyor-stage">
        <svg
          viewBox="0 0 600 240"
          className="conveyor-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Laser scanning gradient */}
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* OVERHEAD ROBOTIC DISPENSER ARM */}
          <g className="overhead-machine">
            {/* Top industrial gantry rail */}
            <line x1="40" y1="20" x2="560" y2="20" stroke="#000000" strokeWidth="3" />
            <rect x="250" y="14" width="100" height="12" fill="#000000" rx="3" />
            <circle cx="270" cy="20" r="2.5" fill="#ffffff" />
            <circle cx="330" cy="20" r="2.5" fill="#ffffff" />

            {/* Pneumatic telescoping piston */}
            <g className="machine-piston">
              <rect x="294" y="26" width="12" height="42" fill="#e5e5ea" stroke="#000000" strokeWidth="1.5" />
              <rect x="297" y="65" width="6" height="30" fill="#000000" />
              {/* Gripper / Hanger mount */}
              <path d="M 285 95 L 315 95 L 305 102 L 295 102 Z" fill="#000000" />
            </g>

            {/* Garment being lowered onto model */}
            <g className="floating-garment" filter="url(#shadowGlow)">
              {/* Luxury coat silhouette on hanger */}
              <path
                d="M 288 102 Q 300 97 312 102 L 324 135 L 316 138 L 310 114 L 312 165 L 288 165 L 290 114 L 284 138 L 276 135 Z"
                fill="#111111"
              />
              {/* Lapel & collar detail */}
              <path d="M 296 102 L 300 120 L 304 102" stroke="#ffffff" strokeWidth="1.2" fill="none" />
              {/* Fabric tension lines */}
              <line x1="300" y1="120" x2="300" y2="160" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>

            {/* Precision Laser Scanning Beam */}
            <g className="laser-beam">
              <polygon points="280,26 320,26 345,195 255,195" fill="url(#laserGrad)" opacity="0.15" />
              <line x1="250" y1="195" x2="350" y2="195" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          </g>

          {/* CONVEYOR BELT & ROLLER SYSTEM */}
          <g className="conveyor-belt-track">
            {/* Belt frame */}
            <rect x="30" y="195" width="540" height="20" rx="10" fill="#f4f4f6" stroke="#000000" strokeWidth="2" />
            
            {/* Moving conveyor tick marks */}
            <g className="belt-moving-ticks">
              {Array.from({ length: 27 }).map((_, i) => (
                <line
                  key={i}
                  x1={50 + i * 20}
                  y1="195"
                  x2={50 + i * 20}
                  y2="215"
                  stroke="#000000"
                  strokeWidth="1.5"
                  opacity="0.35"
                />
              ))}
            </g>

            {/* Rollers / Wheels */}
            <circle cx="45" cy="205" r="7" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <circle cx="45" cy="205" r="2.5" fill="#000000" />
            <circle cx="555" cy="205" r="7" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <circle cx="555" cy="205" r="2.5" fill="#000000" />

            {/* Legs supporting conveyor */}
            <rect x="80" y="215" width="8" height="20" fill="#000000" />
            <rect x="296" y="215" width="8" height="20" fill="#000000" />
            <rect x="512" y="215" width="8" height="20" fill="#000000" />
            <line x1="40" y1="235" x2="560" y2="235" stroke="#000000" strokeWidth="1.5" />
          </g>

          {/* FASHION MODEL MANNEQUIN GLIDING ON CONVEYOR */}
          <g className="gliding-mannequin">
            {/* Base stand on conveyor */}
            <ellipse cx="0" cy="195" rx="18" ry="4" fill="#000000" />
            <line x1="0" y1="195" x2="0" y2="175" stroke="#000000" strokeWidth="2" />

            {/* Feet & Legs */}
            <line x1="-5" y1="175" x2="-5" y2="135" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="5" y1="175" x2="5" y2="135" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />

            {/* Elegant Hips & Torso */}
            <path
              d="M -9 135 L -11 95 Q 0 88 11 95 L 9 135 Q 0 138 -9 135 Z"
              fill="#111111"
            />

            {/* High-fashion Neck & Head Mannequin */}
            <line x1="0" y1="88" x2="0" y2="78" stroke="#111111" strokeWidth="3" />
            <ellipse cx="0" cy="70" rx="7" ry="9" fill="#111111" />

            {/* Slender Arms */}
            <path d="M -11 95 Q -16 115 -14 135" stroke="#111111" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 11 95 Q 16 115 14 135" stroke="#111111" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Architectural aura ring */}
            <ellipse cx="0" cy="115" rx="28" ry="8" fill="none" stroke="#000000" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* TICKER & STAGE DESCRIPTIONS */}
      <div className="conveyor-footer">
        <div className="conveyor-phase-card">
          <div className="conveyor-phase-title">
            <span className="formula-tag">{currentPhase.label}</span>
            <span className="conveyor-progress-count">STAGE {phaseIndex + 1} OF {PHASES.length}</span>
          </div>
          <p className="conveyor-phase-desc">{currentPhase.desc}</p>
        </div>

        {/* Minimalist animated progress bar */}
        <div className="conveyor-progress-track">
          <div className="conveyor-progress-fill" />
        </div>
      </div>
    </div>
  );
}
