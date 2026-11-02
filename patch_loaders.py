import sys

# 1. Patch AtelierCommercialVideo.jsx
with open('frontend/src/components/AtelierCommercialVideo.jsx', 'r', encoding='utf-8') as f:
    cv_code = f.read()

# Add import if missing
if 'import HiggsfieldCinematicLoader' not in cv_code:
    cv_code = cv_code.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport HiggsfieldCinematicLoader from './HiggsfieldCinematicLoader';"
    )

# Replace old timer
old_timer = """    const progressTimer = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev < 35) {
          setStatusMessage('Synthesizing 6-DoF Camera Trajectory & Focal Curve...');
          return prev + 6;
        }
        if (prev < 70) {
          setStatusMessage('LTX-2.5 DiT Sampling Physical Video Latents (24 fps)...');
          return prev + 4;
        }
        if (prev < 90) {
          setStatusMessage('Decoding Spatial-Temporal VAE & Color Grading...');
          return prev + 2;
        }
        return prev;
      });
    }, 800);"""

new_timer = """    const startGenTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startGenTime) / 1000);
      setGenerationProgress((prev) => {
        let nextProg = 10;
        let msg = 'Initializing ComfyUI & Staging LTX-2.5 22B VRAM...';
        if (elapsed < 25) {
          nextProg = Math.min(24, 10 + Math.floor(elapsed * 0.6));
          msg = `Staging LTX-2.5 22B & Arri Alexa LF Kinematics (${elapsed}s)...`;
        } else if (elapsed < 320) {
          nextProg = Math.min(84, 24 + Math.floor((elapsed - 25) * 0.20));
          const stepNum = Math.min(8, Math.floor((elapsed - 25) / 37) + 1);
          msg = `LTX-2.5 DiT 24fps Latent Sampling (${elapsed}s elapsed · Diffusion Step ${stepNum}/8)...`;
        } else if (elapsed < 450) {
          nextProg = Math.min(95, 84 + Math.floor((elapsed - 320) * 0.09));
          msg = `Latent Upscaler & Tiled VAE Video Decode (${elapsed}s elapsed)...`;
        } else {
          nextProg = 96;
          msg = `Finalizing MP4 muxing & DuckDB video BLOB persistence (${elapsed}s)...`;
        }
        setStatusMessage(msg);
        return nextProg;
      });
    }, 1000);"""

if old_timer in cv_code:
    cv_code = cv_code.replace(old_timer, new_timer)
    print("Replaced video progress timer")
else:
    print("Old video progress timer not matched")

# Replace viewfinder spinner with HiggsfieldCinematicLoader
old_vf_spinner = """              {/* Viewfinder Content: Generating state, Video Result, or Staged Framing */}
              {isGenerating ? (
                <div
                  style={{
                    zIndex: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.2rem',
                    textAlign: 'center',
                    padding: '2rem',
                    maxWidth: '420px'
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      borderTopColor: '#ffffff',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  <div>
                    <p style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>
                      {statusMessage}
                    </p>
                    <p className="formula-tag" style={{ color: 'rgba(255, 255, 255, 0.55)', margin: 0 }}>
                      MINIMAX H3 DI-T · ZERO-VRAM SWAPPING
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${generationProgress}%`,
                        height: '100%',
                        background: '#ffffff',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              ) : videoResult?.video_url ? ("""

new_vf_loader = """              {/* Viewfinder Content: Generating state, Video Result, or Staged Framing */}
              {isGenerating ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 6, display: 'flex' }}>
                  <HiggsfieldCinematicLoader
                    progress={generationProgress}
                    statusMessage={statusMessage}
                    cameraPreset={cameraPreset}
                    aspectRatio={aspectRatio}
                    duration={duration}
                    concept={concept}
                  />
                </div>
              ) : videoResult?.video_url ? ("""

if old_vf_spinner in cv_code:
    cv_code = cv_code.replace(old_vf_spinner, new_vf_loader)
    print("Replaced video viewfinder with HiggsfieldCinematicLoader")
else:
    print("Old video viewfinder spinner not matched")

with open('frontend/src/components/AtelierCommercialVideo.jsx', 'w', encoding='utf-8') as f:
    f.write(cv_code)


# 2. Patch AtelierAgentChat.jsx
with open('frontend/src/components/AtelierAgentChat.jsx', 'r', encoding='utf-8') as f:
    chat_code = f.read()

# Add import
if 'import CoutureConveyorLoader' not in chat_code:
    chat_code = chat_code.replace(
        "import React, { useState, useEffect, useRef } from 'react';",
        "import React, { useState, useEffect, useRef } from 'react';\nimport CoutureConveyorLoader from './CoutureConveyorLoader';"
    )

# Add elapsed timer state & effect
timer_hook = """  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);
  const [chatElapsedSec, setChatElapsedSec] = useState(0);

  useEffect(() => {
    let timer;
    if (sending) {
      setChatElapsedSec(0);
      const t0 = Date.now();
      timer = setInterval(() => {
        setChatElapsedSec((Date.now() - t0) / 1000);
      }, 100);
    } else {
      setChatElapsedSec(0);
    }
    return () => clearInterval(timer);
  }, [sending]);"""

old_chat_state = """  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);"""

if old_chat_state in chat_code:
    chat_code = chat_code.replace(old_chat_state, timer_hook)
    print("Added chat elapsed timer hook")
else:
    print("Old chat state not matched")

# Replace small spinner with CoutureConveyorLoader card
old_sending_ui = """            {sending && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666666', fontSize: '0.78rem' }}>
                <RefreshCw size={13} className="status-dot-pulse" />
                <span>Nexus is consulting Nemotron and orchestrating design directives...</span>
              </div>
            )}"""

new_sending_ui = """            {sending && (
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  margin: '0.8rem 0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        boxShadow: '0 0 8px #22c55e',
                        animation: 'pulse 1s infinite'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', color: '#000000' }}>
                      NEXUS PRODUCTION PIPELINE ACTIVE
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#666666',
                      background: 'rgba(0, 0, 0, 0.04)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    ⏱️ {chatElapsedSec.toFixed(1)}s ELAPSED
                  </span>
                </div>

                <CoutureConveyorLoader
                  elapsedSec={chatElapsedSec}
                  title="Fabricating Bespoke Haute Couture Garment"
                  subtitle="Autonomous Multi-Station Conveyor & Neural Diffusion"
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.8rem',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    fontSize: '0.68rem',
                    color: '#777777'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6' }} />
                    RTX 4050 CUDA Engine · 2-Step Qwen Diffusion
                  </span>
                  <span>Persistent DuckDB Media Storage</span>
                </div>
              </div>
            )}"""

if old_sending_ui in chat_code:
    chat_code = chat_code.replace(old_sending_ui, new_sending_ui)
    print("Replaced sending spinner with CoutureConveyorLoader in chat")
else:
    print("Old sending UI not matched")

with open('frontend/src/components/AtelierAgentChat.jsx', 'w', encoding='utf-8') as f:
    f.write(chat_code)

print("Patch complete!")

