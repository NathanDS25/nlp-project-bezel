import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Eye,
  Layers,
  Users,
  Sliders,
  User,
  HardDrive,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Bot,
  Video,
  X,
  Maximize2,
  Copy,
  Check
} from 'lucide-react';
import DigitalAtelierHub from './components/DigitalAtelierHub';
import AtelierTryOn from './components/AtelierTryOn';
import AtelierAgency from './components/AtelierAgency';
import AtelierTelemetry from './components/AtelierTelemetry';
import AtelierEditorial from './components/AtelierEditorial';
import AtelierSkincare from './components/AtelierSkincare';
import AtelierTailor from './components/AtelierTailor';
import AtelierCommercialVideo from './components/AtelierCommercialVideo';
import AtelierAgentChat from './components/AtelierAgentChat';
import ErrorBoundary from './components/ErrorBoundary';

const SECTION_TITLES = {
  studio: 'I · GENERATION HUB',
  taylor: 'II · BESPOKE TAYLORING',
  wardrobe: 'III · WARDROBE LAYERING',
  editorial: 'IV · EDITORIAL CAMPAIGN',
  skincare: 'V · SKINCARE & BEAUTY',
  agency: 'VI · MODEL ROSTER',
  commercial: 'VII · COMMERCIAL & DOP VIDEO',
  gallery: 'VIII · DUCKDB ARCHIVE',
  agent: 'IX · NEXUS MULTI-AGENT'
};

const DRAWER_QUICK_PROMPTS = [
  {
    title: 'Design & Drape Outerwear',
    prompt: 'Nexus, delegate to an Atelier subagent: synthesize a bespoke double-breasted camel cashmere coat flat-lay and drape it onto model_female_1. Report back with the shoot ID and image URL.'
  },
  {
    title: 'Enhance Slip Dress Brief',
    prompt: 'Nexus, enhance the prompt for an emerald silk bias-cut evening slip dress using the Atelier tailor style.'
  },
  {
    title: 'List Agency Models',
    prompt: 'Nexus, query the Atelier Studio registry and list all available female and male agency models.'
  },
  {
    title: 'Review Recent Shoots',
    prompt: 'Nexus, fetch the last 3 lookbook shoot records and telemetry from the Atelier history.'
  }
];

export default function App() {
  // Navigation State: 'studio' | 'taylor' | 'gallery' | 'wardrobe' | 'agency' | 'editorial' | 'skincare' | 'agent'
  const [activeTab, setActiveTab] = useState('studio');
  const [wardrobeInitialGarment, setWardrobeInitialGarment] = useState(null);

  // Backend state & schemas
  const [schemas, setSchemas] = useState(null);
  const [models, setModels] = useState({});
  const [activeModelId, setActiveModelId] = useState('');
  const [status, setStatus] = useState({ comfyui: { online: false }, ollama: { online: false } });

  // Modals & Drawer
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [drawerCopiedIdx, setDrawerCopiedIdx] = useState(null);
  const [diskPaths, setDiskPaths] = useState([]);
  const [newDiskInput, setNewDiskInput] = useState('');
  const [linkingDisk, setLinkingDisk] = useState(false);

  useEffect(() => {
    fetchInitialData();
    const interval = setInterval(fetchStatus, 8000);
    return () => clearInterval(interval);
  }, []);

  const fetchInitialData = async () => {
    fetchStatus();
    fetchSchemas();
    fetchModels();
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (e) {
      // Backend not yet running or network error
    }
  };

  const fetchSchemas = async () => {
    try {
      const res = await fetch('/api/schemas');
      if (res.ok) {
        const data = await res.json();
        setSchemas(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchModels = async () => {
    try {
      const res = await fetch('/api/models');
      if (res.ok) {
        const data = await res.json();
        setModels(data);
        if (!activeModelId && Object.keys(data).length > 0) {
          setActiveModelId(Object.keys(data)[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDiskPaths = async () => {
    try {
      const res = await fetch('/api/comfy/paths');
      if (res.ok) {
        const data = await res.json();
        setDiskPaths(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLinkDisk = async () => {
    if (!newDiskInput.trim()) return;
    setLinkingDisk(true);
    try {
      const res = await fetch('/api/comfy/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: newDiskInput.trim() })
      });
      if (res.ok) {
        setNewDiskInput('');
        fetchDiskPaths();
        alert('External storage linked successfully to ComfyUI.');
      } else {
        alert('Could not link path. Please verify that folder exists.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLinkingDisk(false);
    }
  };

  return (
    <div className="atelier-shell">
      {/* ────────────────────────────────────────────────────────────────
          1. GLOBAL NAVIGATION: FIXED VERTICAL SLIM SIDEBAR (LEFT)
          ──────────────────────────────────────────────────────────────── */}
      <aside className="atelier-sidebar">
        {/* Top: Minimalist Atelier Brandmark */}
        <div
          className="sidebar-logo"
          onClick={() => setActiveTab('studio')}
          title="ATELIER — AI Commercial Fashion Studio"
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/ethereal_monogram.svg"
            alt="Atelier Mark"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '2px',
              flexShrink: 0
            }}
          />
          <div className="sidebar-label">
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.28em',
                color: '#000000',
                display: 'block',
                lineHeight: '1.2'
              }}
            >
              ATELIER
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase'
              }}
            >
              STUDIO
            </span>
          </div>
        </div>

        {/* Center: Complete Feature Navigation */}
        <nav className="sidebar-nav">
          {/* 1. Studio / Generation Hub */}
          <button
            className={`sidebar-btn ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveTab('studio')}
            title="Studio — Vision Prompt, Canvas & Lookbook Tray"
          >
            <Sparkles size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Studio</span>
          </button>

          {/* 2. Taylor / Bespoke Cloth Design & Recolor Studio */}
          <button
            className={`sidebar-btn ${activeTab === 'taylor' ? 'active' : ''}`}
            onClick={() => setActiveTab('taylor')}
            title="Taylor — Bespoke Cloth Design, Swatches & Recolor Studio"
          >
            <Scissors size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Taylor</span>
          </button>

          {/* 3. Wardrobe / Virtual Try-On */}
          <button
            className={`sidebar-btn ${activeTab === 'wardrobe' ? 'active' : ''}`}
            onClick={() => setActiveTab('wardrobe')}
            title="Wardrobe — Multi-Garment Layering, Colorways & Multi-Angle"
          >
            <Layers size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Wardrobe</span>
          </button>

          {/* 3. Editorial / Magazine Campaign Studio */}
          <button
            className={`sidebar-btn ${activeTab === 'editorial' ? 'active' : ''}`}
            onClick={() => setActiveTab('editorial')}
            title="Editorial — Haute Couture Campaign & Magazine Posters"
          >
            <Eye size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Editorial</span>
          </button>

          {/* 4. Skincare / Beauty & Cosmetics */}
          <button
            className={`sidebar-btn ${activeTab === 'skincare' ? 'active' : ''}`}
            onClick={() => setActiveTab('skincare')}
            title="Skincare — Macro Beauty Clarity, Glass Skin & Bottle Branding"
          >
            <Sparkles size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Skincare</span>
          </button>

          {/* 5. Agency / Biometric Model Roster */}
          <button
            className={`sidebar-btn ${activeTab === 'agency' ? 'active' : ''}`}
            onClick={() => setActiveTab('agency')}
            title="Agency — Model Casting, 2-Step Turbo Synthesis & Biometrics"
          >
            <Users size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Agency</span>
          </button>

          {/* 6. Commercial Video / Director of Photography */}
          <button
            className={`sidebar-btn ${activeTab === 'commercial' ? 'active' : ''}`}
            onClick={() => setActiveTab('commercial')}
            title="Commercial — Higgsfield Angle Camera & Minimax Video Reel"
          >
            <Video size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Commercial</span>
          </button>

          {/* 7. Nexus Multi-Agent Orchestrator */}
          <button
            className={`sidebar-btn ${activeTab === 'agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent')}
            title="Nexus Agent — Autonomous Multi-Agent Orchestrator"
          >
            <Bot size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Agent</span>
          </button>

          <div style={{ height: '1px', background: 'var(--border-hair)', margin: '0.4rem 0.6rem' }} />

          {/* Settings */}
          <button
            className={`sidebar-btn ${showSettingsModal ? 'active' : ''}`}
            onClick={() => {
              setShowSettingsModal(true);
              fetchDiskPaths();
            }}
            title="Settings — Storage Paths & Inference Engine"
          >
            <Sliders size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Settings</span>
          </button>

          {/* Profile */}
          <button
            className={`sidebar-btn ${showProfileModal ? 'active' : ''}`}
            onClick={() => setShowProfileModal(true)}
            title="Profile — Studio Configuration"
          >
            <User size={17} style={{ flexShrink: 0 }} />
            <span className="sidebar-label">Profile</span>
          </button>
        </nav>

        {/* Bottom: Live Engine Status Dot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 0.8rem',
            cursor: 'pointer',
            width: '100%'
          }}
          onClick={() => {
            setShowSettingsModal(true);
            fetchDiskPaths();
          }}
          title={status.comfyui.online ? 'ComfyUI: ONLINE (:8189)' : 'ComfyUI: OFFLINE (:8189)'}
        >
          <span
            className="status-dot status-dot-pulse"
            style={{
              background: status.comfyui.online ? '#30D158' : '#ff453a',
              boxShadow: status.comfyui.online ? '0 0 8px rgba(48,209,88,0.5)' : 'none',
              flexShrink: 0
            }}
          />
          <div className="sidebar-label">
            <span className="formula-tag" style={{ color: status.comfyui.online ? '#2e7d32' : '#ff453a', fontWeight: '600' }}>
              {status.comfyui.online ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </aside>

      {/* ────────────────────────────────────────────────────────────────
          2. MAIN STAGE VIEW AREA (ALL FEATURES FULLY ACCESSIBLE)
          ──────────────────────────────────────────────────────────────── */}
      <main className="atelier-main-stage">
        {/* Global Haute Couture Topbar */}
        <header className="atelier-topbar">
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              <span className="breadcrumb-brand">ETHEREAL // </span>
              <span className="breadcrumb-section">{SECTION_TITLES[activeTab] || 'STUDIO'}</span>
            </div>
          </div>

          <div className="topbar-center">
            <div className="telemetry-pill" title="Live ComfyUI Engine status">
              <span className={`telemetry-dot ${status.comfyui.online ? 'dot-online' : 'dot-offline'}`} />
              <span>ComfyUI {status.comfyui.online ? ':8189 LIVE' : ':8189 OFFLINE'}</span>
            </div>
            <div className="telemetry-pill" title="Nemotron LLM status via Ollama">
              <span className={`telemetry-dot ${status.ollama.online ? 'dot-online' : 'dot-offline'}`} />
              <span>Nemotron {status.ollama.online ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
            <div className="telemetry-pill" title="OpenClaw Multi-Agent Gateway">
              <span className="telemetry-dot dot-online" />
              <span>Gateway :18789</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* FANCY OPENCLAW CHAT BUTTON */}
            <button
              className={`btn-openclaw-fancy ${isChatDrawerOpen || activeTab === 'agent' ? 'active' : ''}`}
              onClick={() => setIsChatDrawerOpen(!isChatDrawerOpen)}
              title="Open Nexus Autonomous Multi-Agent Assistant"
            >
              <span className="fancy-icon-wrapper">
                <Sparkles size={13} className="fancy-icon-sparkle" />
                <Bot size={15} />
              </span>
              <span>Nexus Agent</span>
              <span className="fancy-pulse-badge">LIVE</span>
            </button>

            <div className="topbar-divider" />

            <button
              className="topbar-icon-btn"
              onClick={() => { setShowSettingsModal(true); fetchDiskPaths(); }}
              title="Settings — Storage Paths & Inference Engine"
            >
              <Sliders size={15} />
            </button>

            <button
              className="topbar-icon-btn"
              onClick={() => setShowProfileModal(true)}
              title="Profile — Studio Configuration"
            >
              <User size={15} />
            </button>
          </div>
        </header>

        {/* Persistent Studio Tabs (Stay alive during background generation and tab switching) */}
        {/* 1. STUDIO: Vision Prompt, Canvas, Parameter Console & Lookbook Tray */}
        <div style={{ display: activeTab === 'studio' ? 'block' : 'none' }}>
          <ErrorBoundary tabName="Generation Hub">
            <DigitalAtelierHub
              schemas={schemas}
              models={models}
              onSelectModel={(id) => setActiveModelId(id)}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          </ErrorBoundary>
        </div>

        {/* 2. TAYLOR: Bespoke Cloth Design & Recolor Studio */}
        <div style={{ display: activeTab === 'taylor' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Taylor Bespoke Design Atelier">
            <AtelierTailor
              onNavigateToWardrobe={(imgUrl, garmentName) => {
                setWardrobeInitialGarment({ url: imgUrl, name: garmentName });
                setActiveTab('wardrobe');
              }}
            />
          </ErrorBoundary>
        </div>

        {/* 3. WARDROBE: Multi-Garment Layering, Colorways & Multi-Angle */}
        <div style={{ display: activeTab === 'wardrobe' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Wardrobe Layering Atelier">
            <AtelierTryOn
              schemas={schemas}
              models={models}
              onSelectModel={(id) => setActiveModelId(id)}
              initialGarment={wardrobeInitialGarment}
            />
          </ErrorBoundary>
        </div>

        {/* 4. EDITORIAL: Haute Couture Campaign & Magazine Posters */}
        <div style={{ display: activeTab === 'editorial' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Editorial Campaign Studio">
            <AtelierEditorial
              schemas={schemas}
              models={models}
            />
          </ErrorBoundary>
        </div>

        {/* 5. SKINCARE: Beauty, Cosmetics & Dewy Glass-Skin Studio */}
        <div style={{ display: activeTab === 'skincare' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Skincare & Beauty Atelier">
            <AtelierSkincare
              schemas={schemas}
              models={models}
            />
          </ErrorBoundary>
        </div>

        {/* 6. AGENCY: Biometric Models Roster & 2-Step Turbo Synthesis */}
        <div style={{ display: activeTab === 'agency' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Model Agency Roster">
            <AtelierAgency
              models={models}
              activeModelId={activeModelId}
              onRefreshModels={fetchModels}
              onSelectActiveModel={(id) => setActiveModelId(id)}
            />
          </ErrorBoundary>
        </div>

        {/* 7. COMMERCIAL: Higgsfield Angle Camera & Minimax Video Reel */}
        <div style={{ display: activeTab === 'commercial' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="Commercial Studio & DoP">
            <AtelierCommercialVideo
              models={models}
              onSelectModel={(id) => setActiveModelId(id)}
            />
          </ErrorBoundary>
        </div>

        {/* 8. DUCKDB ARCHIVE & TELEMETRY */}
        <div style={{ display: activeTab === 'gallery' ? 'block' : 'none', padding: '2.5rem 3.5rem 8rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <ErrorBoundary tabName="DuckDB Archive & Telemetry">
            <AtelierTelemetry />
          </ErrorBoundary>
        </div>

        {/* 9. NEXUS MULTI-AGENT STUDIO */}
        <div style={{ display: activeTab === 'agent' ? 'block' : 'none' }}>
          <ErrorBoundary tabName="Nexus Multi-Agent Studio">
            <AtelierAgentChat />
          </ErrorBoundary>
        </div>

        {/* Floating Slide-Over Drawer for OpenClaw */}
        {isChatDrawerOpen && (
          <div className="openclaw-drawer-overlay" onClick={() => setIsChatDrawerOpen(false)}>
            <div className="openclaw-drawer-panel" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <div className="drawer-title">
                  <div className="fancy-icon-wrapper" style={{ width: '28px', height: '28px' }}>
                    <Bot size={16} />
                  </div>
                  <span>Nexus Orchestrator</span>
                </div>
                <div className="drawer-actions">
                  <button
                    className="drawer-action-btn"
                    onClick={() => {
                      setActiveTab('agent');
                      setIsChatDrawerOpen(false);
                    }}
                    title="Expand into Full Tab"
                  >
                    <Maximize2 size={14} />
                  </button>
                  <button
                    className="drawer-action-btn"
                    onClick={() => setIsChatDrawerOpen(false)}
                    title="Close Drawer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Seamless Native / Gateway Agent in Drawer */}
              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <AtelierAgentChat isDrawerMode={true} onCloseDrawer={() => setIsChatDrawerOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ────────────────────────────────────────────────────────────────
          3. SETTINGS MODAL (External Disks & ComfyUI Server)
          ──────────────────────────────────────────────────────────────── */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300
          }}
        >
          <div
            className="eth-card"
            style={{
              maxWidth: '560px',
              width: '90%',
              background: '#ffffff',
              border: '1px solid var(--border-hair)',
              boxShadow: 'var(--shadow-floating)',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <span className="heading-sub">ATELIER ENGINE CONFIGURATION</span>
                <h3 className="heading-hero" style={{ fontSize: '1.3rem', marginTop: '2px' }}>Studio Settings</h3>
              </div>
              <button className="btn-icon" onClick={() => setShowSettingsModal(false)}>✕</button>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: '#fafafa', borderRadius: '6px', border: '1px solid var(--border-hair)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#000000' }}>ComfyUI Inference Engine</p>
                  <p className="formula-tag">PORT 8189 · 4-STEP LIGHTNING DIFFUSION</p>
                </div>
                <span className="formula-tag" style={{ color: status.comfyui.online ? '#000' : '#ff4444', fontWeight: '600' }}>
                  {status.comfyui.online ? '● RUNNING' : '○ DISCONNECTED'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: '#fafafa', borderRadius: '6px', border: '1px solid var(--border-hair)' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#000000' }}>DuckDB Telemetry & Vector Store</p>
                  <p className="formula-tag">BEZEL_BDA.DUCKDB · LOOKBOOK ARCHIVE</p>
                </div>
                <span className="formula-tag" style={{ color: '#000', fontWeight: '600' }}>
                  ● CONNECTED
                </span>
              </div>
            </div>

            <label className="eth-label">External Disk & Model Paths</label>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.4' }}>
              Connect external NVMe or hard drives containing Qwen-Image-Edit, Z-Turbo checkpoints, or custom LoRAs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
              {diskPaths.map((dp, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5', padding: '0.6rem 0.8rem', borderRadius: '4px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#000', fontWeight: '500' }}>{dp.name}</span>
                    <p className="formula-tag">{dp.path}</p>
                  </div>
                  <span className="formula-tag" style={{ color: dp.exists ? '#000' : '#888' }}>
                    {dp.exists ? '● DETECTED' : '○ UNLINKED'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                type="text"
                className="eth-input"
                placeholder="e.g. D:\models or E:\ComfyUI\models"
                value={newDiskInput}
                onChange={(e) => setNewDiskInput(e.target.value)}
              />
              <button className="btn-primary" onClick={handleLinkDisk} disabled={linkingDisk}>
                {linkingDisk ? 'Linking...' : 'Connect Disk'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────
          4. PROFILE MODAL (Haute Couture Brand Identity)
          ──────────────────────────────────────────────────────────────── */}
      {showProfileModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300
          }}
        >
          <div
            className="eth-card"
            style={{
              maxWidth: '520px',
              width: '90%',
              background: '#ffffff',
              border: '1px solid var(--border-hair)',
              boxShadow: 'var(--shadow-floating)',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <span className="heading-sub">HAUTE COUTURE ATELIER PROFILE</span>
                <h3 className="heading-hero" style={{ fontSize: '1.3rem', marginTop: '2px' }}>Brand Identity</h3>
              </div>
              <button className="btn-icon" onClick={() => setShowProfileModal(false)}>✕</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#fafafa', borderRadius: '8px', marginBottom: '1.2rem' }}>
              <img
                src="/ethereal_monogram.svg"
                alt="Brand Monogram"
                style={{ width: '48px', height: '48px', borderRadius: '6px', filter: 'invert(1)' }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#000000' }}>
                  ETHEREAL PARIS
                </h4>
                <p className="formula-tag" style={{ margin: '2px 0 0' }}>
                  EDITORIAL COMMERCIAL AI PLATFORM · EST. 2026
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <p>
                <strong>Aesthetic Philosophy:</strong> Digital Atelier bridges traditional Parisian couture craftsmanship with next-generation neural image diffusion.
              </p>
              <p>
                <strong>Model Biometrics:</strong> Strict facial feature anchoring and high-fidelity textile rendering (180s worsted wool, liquid silk charmeuse, raw Japanese denim).
              </p>
              <div style={{ borderTop: '1px solid var(--border-hair)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span className="formula-tag">VERSION: 2.4.0 HAUTE COUTURE</span>
                <span className="formula-tag">LICENSED FOR HIGH-FASHION CAMPAIGNS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
