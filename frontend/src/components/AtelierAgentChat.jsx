import React, { useState, useEffect, useRef } from 'react';
import CoutureConveyorLoader from './CoutureConveyorLoader';
import {
  Bot,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  Send,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';

const getGatewayUrl = () => {
  const host = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '127.0.0.1';
  return `http://${host}:18789/?token=c454b34719aab3c09ba2b5c4ba07615d4fb1b177bca28769`;
};

const QUICK_PROMPTS = [
  {
    title: 'Design & Drape Outerwear',
    prompt: 'Synthesize a bespoke double-breasted camel cashmere coat flat-lay and drape it onto camille_paris.'
  },
  {
    title: 'Enhance Slip Dress Brief',
    prompt: 'Enhance the prompt for an emerald silk bias-cut evening slip dress using the Atelier tailor style.'
  },
  {
    title: 'List Agency Models',
    prompt: 'List all available agency models in the studio biometric registry.'
  },
  {
    title: 'Review Recent Shoots',
    prompt: 'Review the recent collection shoot records and lookbook telemetry.'
  }
];

export default function AtelierAgentChat({ isDrawerMode = false, onCloseDrawer }) {
  const [gatewayStatus, setGatewayStatus] = useState({
    gateway: { online: false, port: 18789 },
    ollama: { online: true, model: 'nemotron:latest' },
    mode: 'native'
  });
  const [activeViewMode, setActiveViewMode] = useState('native'); // 'native' | 'gateway'
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Chat State for Native Agent
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'nexus',
      text: 'Greetings. I am **Nexus**, your Haute Couture Multi-Agent Art Director.\n\nI can synthesize bespoke garment specifications, expand luxury prompts via **Nemotron**, drape collections onto agency models, and coordinate editorial lookbooks. How may I direct your atelier today?',
      steps: ['Atelier agent engine initialized', 'Nemotron LLM connected (:11434)'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
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
  }, [sending]);

  useEffect(() => {
    checkGatewayStatus();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, sending]);

  const checkGatewayStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await fetch('/api/agent/status');
      if (res.ok) {
        const data = await res.json();
        setGatewayStatus(data);
      }
    } catch (err) {
      // Backend not yet ready or offline
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || sending) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setSending(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) {
        throw new Error(`Server returned error (${res.status})`);
      }

      const data = await res.json();
      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'nexus',
        text: data.reply || 'Directive processed.',
        steps: data.steps || [],
        imageUrl: data.image_url,
        data: data.data,
        action: data.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'nexus',
          text: `Nexus received your directive, but encountered an error: ${err.message}. Please verify the studio backend is running.`,
          steps: ['Directive dispatch attempt failed'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleCopyPrompt = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  return (
    <div
      style={{
        width: '100%',
        height: isDrawerMode ? '100%' : 'calc(100vh - 3.5rem)',
        display: 'flex',
        flexDirection: 'column',
        padding: isDrawerMode ? '0' : '1.2rem 2rem 2rem',
        boxSizing: 'border-box',
        background: '#fafafd'
      }}
    >
      {/* ── TOP ORCHESTRATOR HEADER ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.8rem 1.4rem',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: isDrawerMode ? '0' : '10px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          borderTop: isDrawerMode ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          borderLeft: isDrawerMode ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          borderRight: isDrawerMode ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
          marginBottom: isDrawerMode ? '0' : '0.8rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#000000',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Bot size={19} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontWeight: '600', fontSize: '0.92rem', letterSpacing: '-0.01em', color: '#000000' }}>
                Nexus Multi-Agent Orchestrator
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: gatewayStatus.gateway?.online ? '#e8f5e9' : 'rgba(0, 0, 0, 0.05)',
                  color: gatewayStatus.gateway?.online ? '#2e7d32' : '#555555',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: gatewayStatus.gateway?.online ? '#2e7d32' : '#ff9500'
                  }}
                />
                {gatewayStatus.gateway?.online ? 'GATEWAY :18789 LIVE' : 'NATIVE NEMOTRON AGENT'}
              </span>
            </div>
            <div style={{ fontSize: '0.73rem', color: '#666666', marginTop: '2px' }}>
              Autonomous fashion orchestration · Direct prompt enhancement, garment synthesis & virtual draping
            </div>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {gatewayStatus.gateway?.online && (
            <div
              style={{
                display: 'flex',
                background: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '6px',
                padding: '2px'
              }}
            >
              <button
                onClick={() => setActiveViewMode('native')}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeViewMode === 'native' ? '#ffffff' : 'transparent',
                  color: activeViewMode === 'native' ? '#000000' : '#666666',
                  boxShadow: activeViewMode === 'native' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Native Studio
              </button>
              <button
                onClick={() => setActiveViewMode('gateway')}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: activeViewMode === 'gateway' ? '#ffffff' : 'transparent',
                  color: activeViewMode === 'gateway' ? '#000000' : '#666666',
                  boxShadow: activeViewMode === 'gateway' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                OpenClaw Gateway
              </button>
            </div>
          )}

          <button
            onClick={checkGatewayStatus}
            disabled={checkingStatus}
            className="secondary-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.75rem',
              fontSize: '0.74rem',
              borderRadius: '6px'
            }}
            title="Check OpenClaw Gateway connectivity (:18789)"
          >
            <RefreshCw size={12} className={checkingStatus ? 'status-dot-pulse' : ''} />
            {checkingStatus ? 'Checking...' : 'Check Gateway'}
          </button>

          {gatewayStatus.gateway?.online && (
            <a
              href={getGatewayUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.75rem',
                fontSize: '0.74rem',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
              title="Open OpenClaw Gateway in full window"
            >
              <ExternalLink size={12} />
              Full Window
            </a>
          )}
        </div>
      </div>

      {/* ── GATEWAY STANDBY NOTICE IF OFFLINE ── */}
      {!gatewayStatus.gateway?.online && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '0.55rem 1rem',
            background: 'rgba(255, 149, 0, 0.08)',
            border: '1px solid rgba(255, 149, 0, 0.25)',
            borderRadius: isDrawerMode ? '0' : '8px',
            marginBottom: '0.6rem',
            fontSize: '0.74rem',
            color: '#8a5000'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={14} color="#ff9500" />
            <span>
              <strong>OpenClaw Gateway (:18789) is in standby.</strong> Communicating directly via local <strong>Nemotron AI Agent</strong>. To run full OpenClaw UI, execute <code>openclaw gateway --port 18789</code> in terminal.
            </span>
          </div>
          <button
            onClick={checkGatewayStatus}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(255, 149, 0, 0.3)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.68rem',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#8a5000',
              whiteSpace: 'nowrap'
            }}
          >
            Reconnect
          </button>
        </div>
      )}

      {/* ── VIEWPORT CONTENT: EITHER OPENCLAW IFRAME OR NATIVE LUXURY CHAT ── */}
      {activeViewMode === 'gateway' && gatewayStatus.gateway?.online ? (
        <div
          style={{
            flex: 1,
            width: '100%',
            position: 'relative',
            borderRadius: isDrawerMode ? '0' : '10px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            background: '#ffffff'
          }}
        >
          <iframe
            key={iframeKey}
            src={getGatewayUrl()}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="OpenClaw Autonomous Orchestrator"
          />
        </div>
      ) : (
        /* NATIVE HAUTE COUTURE CHAT INTERFACE */
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: isDrawerMode ? '0' : '10px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden'
          }}
        >
          {/* Messages Stream */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem'
            }}
          >
            {messages.map((m) => {
              const isNexus = m.sender === 'nexus';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isNexus ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    alignSelf: isNexus ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: '600', color: isNexus ? '#000000' : '#888888', letterSpacing: '0.04em' }}>
                      {isNexus ? 'NEXUS ART DIRECTOR' : 'DESIGNER'}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: '#999999' }}>{m.timestamp}</span>
                  </div>

                  <div
                    style={{
                      background: isNexus ? '#f8f8fa' : '#000000',
                      color: isNexus ? '#111111' : '#ffffff',
                      border: isNexus ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                      borderRadius: isNexus ? '2px 12px 12px 12px' : '12px 2px 12px 12px',
                      padding: '0.85rem 1.1rem',
                      fontSize: '0.85rem',
                      lineHeight: '1.55',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}
                  >
                    {m.text}

                    {/* Optional Image Result */}
                    {m.imageUrl && (
                      <div style={{ marginTop: '0.8rem', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                        <img
                          src={m.imageUrl}
                          alt="Nexus Synthesized Haute Couture"
                          style={{ width: '100%', maxHeight: '380px', objectFit: 'contain', background: '#ffffff', display: 'block' }}
                        />
                      </div>
                    )}

                    {/* Optional Model Cards Grid */}
                    {m.data && Array.isArray(m.data) && m.action === 'models' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem', marginTop: '0.8rem' }}>
                        {m.data.slice(0, 6).map((model) => (
                          <div
                            key={model.id}
                            style={{
                              background: '#ffffff',
                              border: '1px solid rgba(0,0,0,0.08)',
                              borderRadius: '6px',
                              padding: '0.5rem',
                              fontSize: '0.72rem'
                            }}
                          >
                            <div style={{ fontWeight: '600', color: '#000000' }}>{model.name}</div>
                            <div style={{ fontSize: '0.65rem', color: '#666666', marginTop: '2px' }}>{model.archetype?.split('—')[0] || model.gender}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Execution Steps */}
                  {m.steps && m.steps.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
                      {m.steps.map((st, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.62rem',
                            padding: '1px 6px',
                            background: '#f0f0f4',
                            borderRadius: '4px',
                            color: '#555555'
                          }}
                        >
                          ✓ {st}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {sending && (
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
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              padding: '0.6rem 1.2rem',
              background: '#fcfcfd',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              scrollbarWidth: 'none'
            }}
          >
            <span style={{ fontSize: '0.68rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              Quick Directives:
            </span>
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.prompt)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.73rem',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  color: '#222222',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Click to dispatch directive"
              >
                <Sparkles size={11} color="#c5a880" />
                <span>{qp.title}</span>
              </button>
            ))}
          </div>

          {/* User Input Bar */}
          <div
            style={{
              padding: '0.9rem 1.2rem',
              background: '#ffffff',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Give Nexus an instruction (e.g. 'Synthesize double-breasted camel trench coat and drape onto Camille', or 'Enhance brief')..."
              style={{
                flex: 1,
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                fontSize: '0.84rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#000000')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0, 0, 0, 0.12)')}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={sending || !inputMessage.trim()}
              style={{
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1.2rem',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: sending || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                opacity: sending || !inputMessage.trim() ? 0.45 : 1,
                transition: 'all 0.15s ease'
              }}
            >
              <span>Send</span>
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
