import React, { useState, useEffect } from 'react';
import {
  Video,
  Camera,
  Film,
  Sparkles,
  Zap,
  RotateCcw,
  ZoomIn,
  ArrowRight,
  ArrowDown,
  Layers,
  Activity,
  Sliders,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export default function HiggsfieldCinematicLoader({
  progress = 0,
  statusMessage = "Calibrating Arri Optical Stage & Higgsfield Kinematics...",
  cameraPreset = "dolly_in",
  aspectRatio = "9:16",
  duration = 5,
  concept = ""
}) {
  const [timecodeFrames, setTimecodeFrames] = useState(0);
  const [telemetryTick, setTelemetryTick] = useState(0);

  // Timecode animation: increments 24fps frames
  useEffect(() => {
    const timer = setInterval(() => {
      setTimecodeFrames((prev) => (prev + 1) % (duration * 24));
      setTelemetryTick((prev) => prev + 1);
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, [duration]);

  const sec = Math.floor(timecodeFrames / 24);
  const fr = timecodeFrames % 24;
  const timecodeString = `00:00:0${sec}:${fr < 10 ? '0' : ''}${fr}`;

  // Trajectory configurations
  const TRAJECTORY_META = {
    dolly_in: {
      name: "High-Fashion Dolly-In",
      tag: "Macro Texture Push",
      vector: "Forward Z-Axis (+1.8m/s)",
      optics: "Cooke /i Full Frame 85mm T1.4",
      icon: ZoomIn
    },
    orbit_360: {
      name: "360° Bullet-Time Orbit",
      tag: "Continuous Circular Arc",
      vector: "Radial Theta (360° / 4s)",
      optics: "Cinema Prime 50mm T1.3",
      icon: RotateCcw
    },
    runway_truck: {
      name: "Runway Lateral Truck",
      tag: "Catwalk Stride Pacing",
      vector: "Linear X-Axis (+2.4m/s)",
      optics: "Master Telephoto 70mm T2.0",
      icon: ArrowRight
    },
    crane_down: {
      name: "Overhead Jib Crane Drop",
      tag: "Architectural Reveal",
      vector: "Vertical Y-Axis (-3.2m/s)",
      optics: "Wide Anamorphic 35mm T2.8",
      icon: ArrowDown
    },
    handheld_editorial: {
      name: "French New-Wave Handheld",
      tag: "Documentary Sway",
      vector: "Organic Gyro 6-DoF Sway",
      optics: "Cooke S4 50mm Natural T2.0",
      icon: Video
    },
    fpv_whip: {
      name: "Kinetic FPV Whip-Zoom",
      tag: "Commercial Hook",
      vector: "Angular Velocity (180°/0.4s)",
      optics: "High-Speed Prime 24mm T1.4",
      icon: Zap
    }
  };

  const activeMeta = TRAJECTORY_META[cameraPreset] || TRAJECTORY_META.dolly_in;

  // Stages based on progress
  const STAGES = [
    { threshold: 25, title: "Optical Rig & Sensor Calibration", sub: "Arri Alexa LF sensor · Cooke Anamorphic de-squeeze" },
    { threshold: 55, title: "Higgsfield Angle 3D Kinematics", sub: "Computing 6-DoF trajectory curve & cloth aerodynamics" },
    { threshold: 85, title: "Neural Commercial Video Stream", sub: "Fetching 1080p 24fps latent frames from Higgsfield Engine" },
    { threshold: 100, title: "Master Color Suite & ProRes Output", sub: "ACEScct film grade · Anamorphic flare & halation" }
  ];

  const currentStageIndex = STAGES.findIndex((s) => progress <= s.threshold);
  const activeStage = STAGES[currentStageIndex === -1 ? 3 : currentStageIndex];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '490px',
        background: '#040406',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.4rem 1.6rem',
        boxSizing: 'border-box',
        color: '#ffffff',
        fontFamily: 'var(--font-sans)',
        userSelect: 'none'
      }}
    >
      {/* ── BACKGROUND ANAMORPHIC FLARE & GRID LINES ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, rgba(184, 134, 11, 0.12) 0%, rgba(6, 12, 28, 0.45) 55%, #040406 85%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Horizontal Anamorphic Flare Sweeping Bar */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.15) 20%, rgba(255, 255, 255, 0.85) 50%, rgba(56, 189, 248, 0.4) 80%, transparent 100%)',
          boxShadow: '0 0 24px 2px rgba(255, 215, 0, 0.55), 0 0 60px 8px rgba(56, 189, 248, 0.35)',
          animation: 'anamorphicBreath 3.2s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Optical Viewfinder 4 Corner Reticles */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', width: '22px', height: '22px', borderLeft: '2px solid rgba(255, 215, 0, 0.75)', borderTop: '2px solid rgba(255, 215, 0, 0.75)', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: '16px', right: '16px', width: '22px', height: '22px', borderRight: '2px solid rgba(255, 215, 0, 0.75)', borderTop: '2px solid rgba(255, 215, 0, 0.75)', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '22px', height: '22px', borderLeft: '2px solid rgba(255, 215, 0, 0.75)', borderBottom: '2px solid rgba(255, 215, 0, 0.75)', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '22px', height: '22px', borderRight: '2px solid rgba(255, 215, 0, 0.75)', borderBottom: '2px solid rgba(255, 215, 0, 0.75)', zIndex: 3 }} />

      {/* ── TOP VIEWFINDER HUD BAR ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 4,
          position: 'relative'
        }}
      >
        {/* REC dot + Timecode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(239, 68, 68, 0.18)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 10px #ef4444',
                animation: 'pulse 1s infinite'
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.12em' }}>
              REC
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.1em',
              textShadow: '0 0 12px rgba(255, 255, 255, 0.4)'
            }}
          >
            {timecodeString}
          </span>
        </div>

        {/* Central Camera Package Specs */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: '#ffd700',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.25)',
              padding: '2px 8px',
              borderRadius: '3px',
              letterSpacing: '0.08em'
            }}
          >
            HIGGSFIELD ANGLE · MINIMAX H3
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'rgba(255, 255, 255, 0.75)',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '2px 6px',
              borderRadius: '3px'
            }}
          >
            {aspectRatio} · 24.0 FPS
          </span>
        </div>

        {/* Battery & Thermal Sensor */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.65)' }}>
          <span>42°C</span>
          <span>·</span>
          <span>98% BAT</span>
          <span>·</span>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>SYNCED</span>
        </div>
      </div>

      {/* ── CENTER VISUALIZER: 3D HOLOGRAPHIC CAMERA GIMBAL & TRAJECTORY RADAR ── */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          margin: 'auto 0'
        }}
      >
        {/* Holographic Radar Container */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Outer Pulsing Trajectory Orbit Ring */}
          <svg
            viewBox="0 0 200 200"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              transform: `rotate(${timecodeFrames * 6}deg)`,
              transition: 'transform 0.05s linear'
            }}
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(255, 215, 0, 0.18)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
            {/* Active Gimbal Camera Beacon */}
            <circle
              cx="100"
              cy="12"
              r="6.5"
              fill="#ffd700"
              filter="drop-shadow(0 0 8px #ffd700)"
            />
            <circle
              cx="100"
              cy="12"
              r="2.5"
              fill="#000000"
            />
            {/* Degree Tick marks */}
            <line x1="100" y1="2" x2="100" y2="8" stroke="#ffd700" strokeWidth="2" />
            <line x1="100" y1="192" x2="100" y2="198" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
            <line x1="2" y1="100" x2="8" y2="100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
            <line x1="192" y1="100" x2="198" y2="100" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
          </svg>

          {/* Middle Counter-Rotating Gyro Ring */}
          <div
            style={{
              position: 'absolute',
              width: '136px',
              height: '136px',
              borderRadius: '50%',
              border: '1px solid rgba(56, 189, 248, 0.28)',
              borderTopColor: '#38bdf8',
              borderBottomColor: '#ffd700',
              transform: `rotate(-${timecodeFrames * 9}deg)`,
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)'
            }}
          />

          {/* Center Subject Crosshair & Lens Icon */}
          <div
            style={{
              position: 'relative',
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(10, 10, 15, 0.85) 75%)',
              border: '1px solid rgba(255, 215, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.25)'
            }}
          >
            <Camera size={26} color="#ffd700" style={{ filter: 'drop-shadow(0 0 6px #ffd700)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                color: '#ffffff',
                fontWeight: 700,
                marginTop: '3px',
                letterSpacing: '0.08em'
              }}
            >
              DoP 6-DoF
            </span>
          </div>

          {/* Horizon Level Indicator bar */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.18)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Live Vector & Lens Package Badge */}
        <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '4px 12px', borderRadius: '999px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#ffffff' }}>
              {activeMeta.name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: '#ffd700' }}>
              [{activeMeta.vector}]
            </span>
          </div>

          <p style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.55)', margin: '0.4rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
            Optics: {activeMeta.optics} · 180.0° Mechanical Shutter
          </p>
        </div>
      </div>

      {/* ── BOTTOM STAGES & PROGRESS PROGRESSION ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          zIndex: 4,
          position: 'relative',
          background: 'rgba(12, 12, 16, 0.65)',
          backdropFilter: 'blur(10px)',
          padding: '0.9rem 1.1rem',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Active Stage & Status Text */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Sparkles size={12} color="#ffd700" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em' }}>
                {activeStage.title}
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
              {statusMessage || activeStage.sub}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#ffd700',
                letterSpacing: '0.02em',
                textShadow: '0 0 16px rgba(255, 215, 0, 0.4)'
              }}
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Master Cinema Progress Bar */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #b8860b 0%, #ffd700 50%, #ffffff 100%)',
              boxShadow: '0 0 14px rgba(255, 215, 0, 0.75)',
              transition: 'width 0.35s ease'
            }}
          />
        </div>

        {/* Bottom Micro-Audio & Neural Telemetry Tickers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.45)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>qwen_camera_control::trajectory_smoothness = 0.984</span>
          </div>

          {/* Equalizer Waveform Bars simulating 24fps master audio-visual sync */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px' }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const h = 3 + Math.sin((telemetryTick + i * 2) * 0.4) * 5 + 4;
              return (
                <div
                  key={i}
                  style={{
                    width: '2px',
                    height: `${h}px`,
                    background: i % 2 === 0 ? '#ffd700' : '#38bdf8',
                    opacity: 0.75,
                    borderRadius: '1px'
                  }}
                />
              );
            })}
          </div>

          <div>
            <span>ACEScct · ProRes 422 HQ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
