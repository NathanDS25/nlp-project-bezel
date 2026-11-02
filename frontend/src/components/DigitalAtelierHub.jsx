import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Download,
  Eye,
  RefreshCw,
  Sliders,
  ChevronRight,
  Maximize2,
  Film,
  FileText,
  Check,
  Lock,
  Layers,
  ArrowRight,
  RotateCw,
  Palette
} from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';
import BeforeAfterSlider from './BeforeAfterSlider';
import PromptEnhancer from './PromptEnhancer';

// Ethnicity & Archetype Presets for the refined slider
const ETHNICITY_PRESETS = [
  { label: 'Nordic Minimalist', archetype: 'Nordic Female — Sleek platinum blonde, sculptural cheekbones, porcelain tone', defaultModel: 'camille_paris' },
  { label: 'Parisian Chic', archetype: 'French Female — Natural brunette, effortless elegance, refined bone structure', defaultModel: 'elena_vogue' },
  { label: 'Mediterranean', archetype: 'Italian / Spanish Female — Warm olive complexion, rich dark wavy hair, high-fashion gaze', defaultModel: 'valentina_milan' },
  { label: 'Afro-Editorial', archetype: 'West African Haute Couture — Deep rich obsidian skin, razor-sharp jawline, statuesque grace', defaultModel: 'amina_haute' },
  { label: 'East Asian Avant-Garde', archetype: 'East Asian High-Fashion — Symmetrical porcelain features, sleek raven bob, runway poise', defaultModel: 'charlotte_london' },
  { label: 'South Asian Editorial', archetype: 'South Asian Haute Couture — Almond eyes, warm golden undertone, sharp contouring', defaultModel: 'priya_mumbai' }
];

// Lighting Presets for the refined slider (0 - 100%)
const LIGHTING_LEVELS = [
  { pct: 0, label: 'Soft Diffused Commercial Studio', desc: 'Even shadowless illumination tailored for e-commerce catalog clarity' },
  { pct: 25, label: 'Editorial Directional Keylight', desc: 'Sculptural 45° softbox modeling garment fold depth and drape' },
  { pct: 50, label: 'High-Contrast Studio Chiaroscuro', desc: 'Razor-sharp contrast with dramatic luxury shadows (Vogue Italia style)' },
  { pct: 75, label: 'Architectural Shadow & Sunlight', desc: 'Linear window-slat sunlight grazing textured fabrics in a modern atelier' },
  { pct: 100, label: 'Natural Golden Hour Sunlight', desc: 'Warm 2800K low-angle sunlight accentuating liquid silk sheen and cashmere fuzz' }
];

// Fabric Texture Presets for the refined slider (0 - 100%)
const FABRIC_TEXTURES = [
  { pct: 0, label: 'Liquid Silk Charmeuse', promptAdd: 'lustrous 22-momme liquid silk charmeuse with fluid cascading drape, light-catching high-sheen ripples' },
  { pct: 20, label: 'High-Twist Wool & Cashmere', promptAdd: 'fine 180s worsted wool and Mongolian cashmere blend, matte luxury weave with razor-sharp tailored creases' },
  { pct: 40, label: 'Raw Slub Linen & Cotton', promptAdd: 'organic textured slub linen weave with tactile organic threads and breathable relaxed folds' },
  { pct: 60, label: 'Structured Raw Indigo Denim', promptAdd: '14oz rigid Japanese selvedge denim with prominent twill grain, sturdy sculptural drape and contrast topstitching' },
  { pct: 80, label: 'Technical Sculptural Taffeta', promptAdd: 'architectural technical silk-taffeta with crisp paper-like memory folds and subtle iridescent sheen' },
  { pct: 100, label: 'High-Gloss Patent Leather', promptAdd: 'mirror-finish glossy calfskin patent leather with sharp specular reflections and supple structured contours' }
];

export default function DigitalAtelierHub({ schemas, models = {}, onSelectModel, onNavigate }) {
  // ── CORE GENERATION PROMPT ──
  const [visionPrompt, setVisionPrompt] = useState('');

  // ── GARMENT UPLOAD / REFERENCE ──
  const [garmentFile, setGarmentFile] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState('/assets/garments/camel_cashmere_coat.png');
  const [garmentName, setGarmentName] = useState('Camel Cashmere Coat (Atelier Default)');
  const garmentInputRef = useRef(null);

  // ── REFINED PARAMETER SLIDERS ──
  const [ethnicityIndex, setEthnicityIndex] = useState(1); // Default: Parisian Chic
  const [lightingSlider, setLightingSlider] = useState(25); // 0 - 100
  const [fabricSlider, setFabricSlider] = useState(20); // 0 - 100
  const [scope, setScope] = useState('outerwear'); // Default to outerwear for the default camel coat
  const [biometricLock, setBiometricLock] = useState(true);
  const [fitStyle, setFitStyle] = useState('Tailored Catalog (Crisp details, balanced proportions)');
  const [selectedModelId, setSelectedModelId] = useState(Object.keys(models)[0] || '');

  // ── GENERATION & CANVAS STATE ──
  const [rendering, setRendering] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [renderResult, setRenderResult] = useState(null);
  const [activeCanvasImage, setActiveCanvasImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false); // Default to full final image (no split)

  // ── LOOKBOOK TRAY PREVIOUS GENERATIONS ──
  const [trayItems, setTrayItems] = useState([]);
  const [selectedTrayIndex, setSelectedTrayIndex] = useState(-1);
  const [loadingTray, setLoadingTray] = useState(false);

  // Sync selectedModelId with ethnicityIndex or models registry
  useEffect(() => {
    const curPreset = ETHNICITY_PRESETS[ethnicityIndex];
    if (curPreset?.defaultModel && models[curPreset.defaultModel]) {
      setSelectedModelId(curPreset.defaultModel);
      if (onSelectModel) onSelectModel(curPreset.defaultModel);
    } else if (Object.keys(models).length > 0 && (!selectedModelId || !models[selectedModelId])) {
      setSelectedModelId(Object.keys(models)[0]);
    }
  }, [ethnicityIndex, models]);

  // Load history into lookbook tray and fetch latest render
  useEffect(() => {
    fetchTrayHistory();
  }, []);

  const fetchTrayHistory = async () => {
    setLoadingTray(true);
    try {
      const res = await fetch('/api/history?limit=50');
      if (res.ok) {
        const data = await res.json();
        // FILTER: Only keep valid visual renders (exclude raw .mp4 video files and flat garments)
        const validPhotos = (data || []).filter(item => {
          const p = (item.local_image_path || item.image_url || '').toLowerCase();
          return !p.endsWith('.mp4') && !p.includes('assets/garments') && !p.includes('assets\\garments');
        });
        setTrayItems(validPhotos);

        // Auto-display the premier successful shoot (tailored camel cashmere coat or hero look)
        if (!activeCanvasImage && validPhotos.length > 0) {
          const premierShoot = validPhotos.find(item => 
            item.local_image_path && item.local_image_path.toLowerCase().includes('shoot_camel_cashmere_coat')
          ) || validPhotos.find(item => 
            item.local_image_path && item.local_image_path.toLowerCase().includes('hero_frame')
          ) || validPhotos[0];
          
          const imgUrl = premierShoot.local_image_path
            ? `/${premierShoot.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
            : (premierShoot.image_url || `/api/duckdb/photo/${premierShoot.shoot_id}`);
            
          setActiveCanvasImage(imgUrl);
          const foundIdx = validPhotos.indexOf(premierShoot);
          setSelectedTrayIndex(foundIdx >= 0 ? foundIdx : 0);
          setRenderResult({
            local_image_path: premierShoot.local_image_path,
            image_url: imgUrl,
            prompt: premierShoot.prompt_used || premierShoot.prompt || premierShoot.brief || 'South Asian model wearing tailored camel cashmere coat',
            elapsed_sec: premierShoot.render_time_sec || premierShoot.elapsed_sec || 2.5
          });
        }
      }
    } catch (err) {
      console.warn('Could not load tray history:', err);
    } finally {
      setLoadingTray(false);
    }
  };

  // Helper to auto-detect scope from garment name
  const detectScopeFromGarmentName = (name) => {
    if (!name) return 'outerwear';
    const lower = name.toLowerCase();
    if (lower.includes('coat') || lower.includes('jacket') || lower.includes('trench') || lower.includes('blazer') || lower.includes('parka') || lower.includes('bomber') || lower.includes('outerwear')) {
      return 'outerwear';
    }
    if (lower.includes('dress') || lower.includes('gown') || lower.includes('jumpsuit') || lower.includes('romper') || lower.includes('slip')) {
      return 'one-piece';
    }
    if (lower.includes('trouser') || lower.includes('pant') || lower.includes('jean') || lower.includes('skirt') || lower.includes('short')) {
      return 'bottom';
    }
    if (lower.includes('shirt') || lower.includes('top') || lower.includes('t-shirt') || lower.includes('hoodie') || lower.includes('sweater') || lower.includes('blouse') || lower.includes('tee')) {
      return 'top';
    }
    return 'outerwear';
  };

  // Compute active parameters from slider values
  const getActiveLighting = () => {
    // Find closest lighting level
    let closest = LIGHTING_LEVELS[0];
    let minDiff = 999;
    for (const lvl of LIGHTING_LEVELS) {
      const diff = Math.abs(lvl.pct - lightingSlider);
      if (diff < minDiff) {
        minDiff = diff;
        closest = lvl;
      }
    }
    return closest;
  };

  const getActiveFabric = () => {
    let closest = FABRIC_TEXTURES[0];
    let minDiff = 999;
    for (const f of FABRIC_TEXTURES) {
      const diff = Math.abs(f.pct - fabricSlider);
      if (diff < minDiff) {
        minDiff = diff;
        closest = f;
      }
    }
    return closest;
  };

  const activeLighting = getActiveLighting();
  const activeFabric = getActiveFabric();
  const activeEthnicity = ETHNICITY_PRESETS[ethnicityIndex];

  // Handle garment upload
  const handleGarmentFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGarmentFile(file);
      setGarmentName(file.name);
      setScope(detectScopeFromGarmentName(file.name));
      const url = URL.createObjectURL(file);
      setGarmentPreview(url);
    }
  };

  // Main Generation Action
  const handleExecuteGenerate = async () => {
    if (!garmentFile && !garmentPreview) {
      // In text-to-fashion mode or fallback prompt
      if (!visionPrompt.trim()) {
        setErrorMsg('Please describe your vision or upload a garment piece.');
        return;
      }
    }

    setRendering(true);
    setErrorMsg(null);
    setElapsedSec(0);

    const timer = setInterval(() => {
      setElapsedSec((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    const fullBrief = `${visionPrompt.trim()}. Fabric fidelity: ${activeFabric.promptAdd}. Lighting: ${activeLighting.label}.`;

    const formData = new FormData();
    if (garmentFile) {
      formData.append('garment_file', garmentFile);
    } else if (garmentPreview && !garmentPreview.startsWith('blob:')) {
      formData.append('garment_url', garmentPreview);
    }

    if (selectedModelId) {
      formData.append('model_id', selectedModelId);
    }
    formData.append('brief', fullBrief);
    formData.append('scope', scope);
    formData.append('photo_type', 'flat-lay');
    formData.append('model_archetype', activeEthnicity.archetype);
    formData.append('lighting', activeLighting.label);
    formData.append('background', 'Minimalist Concrete Studio (Subtle architectural shadows)');
    formData.append('fit_style', fitStyle);
    formData.append('pose', 'Front-Facing Minimalist Pose (Relaxed posture, natural drape)');
    formData.append('biometric_lock', biometricLock ? 'true' : 'false');
    formData.append('lock_strength', '0.90');

    try {
      const res = await fetch('/api/tryon/generate', {
        method: 'POST',
        body: formData
      });

      let data = null;
      let text = '';
      try {
        text = await res.text();
        data = JSON.parse(text);
      } catch (jsonErr) {}

      if (!res.ok) {
        const detailMsg = data?.detail || (text && text.length < 250 && !text.includes('<!DOCTYPE') ? text : null);
        throw new Error(detailMsg || `Server error (${res.status}): Ensure ComfyUI (:8189) is active.`);
      }

      const freshImg = data.local_image_path
        ? `/${data.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
        : data.image_url;

      setRenderResult({ ...data, timestamp: Date.now() });
      setActiveCanvasImage(freshImg);
      setSelectedTrayIndex(0);

      // Prepend to lookbook tray
      setTrayItems((prev) => [
        {
          shoot_id: data.shoot_id || `shoot_${Date.now()}`,
          local_image_path: data.local_image_path,
          image_url: freshImg,
          prompt: fullBrief,
          model_name: activeEthnicity.label,
          scope,
          elapsed_sec: data.elapsed_sec
        },
        ...prev
      ]);
    } catch (err) {
      setErrorMsg(err.message || 'Generation pipeline encountered an error.');
    } finally {
      clearInterval(timer);
      setRendering(false);
    }
  };

  // Switch canvas to an item from the bottom tray
  const handleSelectTrayItem = (item, idx) => {
    setSelectedTrayIndex(idx);
    const imgUrl = item.local_image_path
      ? `/${item.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
      : (item.image_url || `/api/duckdb/photo/${item.shoot_id}`);
    setActiveCanvasImage(imgUrl);
    setRenderResult({
      local_image_path: item.local_image_path,
      image_url: imgUrl,
      prompt: item.prompt_used || item.prompt || item.brief,
      elapsed_sec: item.render_time_sec || item.elapsed_sec || 2.5
    });
  };

  return (
    <div className="canvas-generation-hub">
      {/* ────────────────────────────────────────────────────────────────
          1. THE GENERATION HUB (MASSIVE CENTER CANVAS)
          ──────────────────────────────────────────────────────────────── */}
      <div className="canvas-viewport">
        {rendering ? (
          // CINEMATIC LOADING STATE
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              padding: '3rem 2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1px solid var(--border-hair)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06)'
            }}
          >
            <CoutureConveyorLoader
              title="Digital Atelier Runway Fitting"
              subtitle={`Synthesizing ${activeEthnicity.label} drape with ${activeFabric.label}`}
              elapsedSec={elapsedSec}
            />
          </div>
        ) : activeCanvasImage ? (
          // ACTIVE STATE: HIGH-RESOLUTION LUXURY DISPLAY
          <div
            className="active-vision-render"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '720px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Top Canvas Bar (Ultra-minimalist tags) */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.8rem',
                marginBottom: '0.6rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="formula-tag" style={{ color: '#000000', fontWeight: '600' }}>
                  {activeEthnicity.label.toUpperCase()}
                </span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span className="formula-tag">{scope.toUpperCase()}</span>
                {renderResult?.elapsed_sec && (
                  <>
                    <span style={{ color: 'var(--text-faint)' }}>·</span>
                    <span className="formula-tag">{renderResult.elapsed_sec}s SYNTHESIS</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {garmentPreview && (
                  <button
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className="btn-secondary"
                    style={{
                      padding: '0.35rem 0.8rem',
                      fontSize: '0.68rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: showBeforeAfter ? '#000000' : '#ffffff',
                      color: showBeforeAfter ? '#ffffff' : '#000000',
                      border: '1px solid var(--border-hair)',
                      borderRadius: '999px',
                      fontWeight: '500'
                    }}
                    title="Toggle Before/After drape split slider"
                  >
                    <Eye size={12} /> {showBeforeAfter ? 'Split View: ON' : 'Split View: OFF'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveCanvasImage(null);
                    setRenderResult(null);
                    setSelectedTrayIndex(-1);
                  }}
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.68rem' }}
                  title="Return to clean blank canvas"
                >
                  Reset Canvas
                </button>
                <a
                  href={activeCanvasImage}
                  download={`atelier_vision_${Date.now()}.png`}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  title="Download High-Res 4K PNG"
                >
                  <Download size={13} />
                </a>
              </div>
            </div>

            {/* Image Canvas Frame */}
            <div
              style={{
                width: '100%',
                maxHeight: '680px',
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {garmentPreview && showBeforeAfter ? (
                <BeforeAfterSlider
                  beforeImage={garmentPreview}
                  afterImage={`${activeCanvasImage}?t=${renderResult?.timestamp || 'fresh'}`}
                  beforeLabel="FLAT-LAY PIECE"
                  afterLabel="ON-BODY COUTURE DRAPE"
                  height="640px"
                />
              ) : (
                <img
                  src={`${activeCanvasImage}?t=${renderResult?.timestamp || 'fresh'}`}
                  alt="Digital Atelier Vision Render"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '640px',
                    objectFit: 'contain',
                    background: '#fafafa'
                  }}
                  onError={(e) => {
                    if (renderResult?.image_url && e.target.src !== renderResult.image_url) {
                      e.target.src = renderResult.image_url;
                    }
                  }}
                />
              )}
            </div>

            {/* Caption beneath canvas */}
            <div
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                maxWidth: '600px'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.45',
                  letterSpacing: '0.02em'
                }}
              >
                "{renderResult?.prompt || visionPrompt}"
              </p>
            </div>
          </div>
        ) : (
          // EMPTY STATE: Minimalist "Describe the vision..."
          <div className="vision-empty-state">
            <h1 className="vision-prompt-title">Describe the vision</h1>
            <p className="vision-prompt-subtitle">
              COUTURE APPAREL SYNTHESIS · 4-STEP EDITORIAL ENGINE
            </p>
            <p
              style={{
                maxWidth: '460px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                marginTop: '0.8rem',
                lineHeight: '1.6'
              }}
            >
              Enter a styling narrative on the console to the right, adjust refined drape
              and lighting parameters, or drop a garment flat-lay to bring the collection to life.
            </p>

            <button
              onClick={() => garmentInputRef.current?.click()}
              className="btn-secondary"
              style={{ marginTop: '2rem' }}
            >
              <Upload size={14} /> Upload Garment Flat-Lay
            </button>
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────────
          2. THE INPUT CONSOLE (RIGHT-SIDE FLOATING GLASSMORPHISM PANEL)
          ──────────────────────────────────────────────────────────────── */}
      <aside className="floating-input-console">
        {/* Console Header */}
        <div className="console-header">
          <div>
            <span className="heading-sub" style={{ fontSize: '0.68rem', letterSpacing: '0.22em' }}>
              DIRECTIVE CONSOLE
            </span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: '600', letterSpacing: '0.04em', color: '#000000', margin: '2px 0 0' }}>
              Studio Generator
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="formula-tag" style={{ border: '1px solid var(--border-hair)', padding: '2px 6px', borderRadius: '4px' }}>
              QWEN-V2
            </span>
          </div>
        </div>

        {/* Console Scrollable Body */}
        <div className="console-body">
          {/* A. Minimalist AI Prompt Textarea */}
          <div>
            <label className="slider-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
              Vision Narrative Prompt
            </label>
            <textarea
              className="atelier-prompt-input"
              rows={3}
              value={visionPrompt}
              onChange={(e) => setVisionPrompt(e.target.value)}
              placeholder="Describe the silhouette, fabric weight, lapel structure, drape motion, and editorial atmosphere..."
            />
            {/* Nemotron Prompt Enhancer (Opt-In) */}
            <PromptEnhancer
              prompt={visionPrompt}
              onEnhanced={(enhanced) => setVisionPrompt(enhanced)}
              style="editorial"
              label="Nemotron Art Director"
            />
          </div>

          {/* B. Garment Reference / Flat-lay Dropzone */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <label className="slider-label" style={{ margin: 0 }}>Garment Piece</label>
                {!garmentPreview && (
                  <span className="formula-tag" style={{ color: 'var(--color-accent-gold)', fontSize: '0.58rem', border: '1px solid rgba(197, 168, 128, 0.4)' }}>
                    TEXT-TO-FASHION
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {!garmentPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setGarmentPreview('/assets/garments/camel_cashmere_coat.png');
                      setGarmentName('Camel Cashmere Coat (Atelier Default)');
                      setGarmentFile(null);
                      setScope('outerwear');
                      setErrorMsg(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.65rem',
                      color: 'var(--color-accent-gold)',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Load Default Coat
                  </button>
                )}
                {garmentPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setGarmentFile(null);
                      setGarmentPreview(null);
                      setGarmentName('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <input
              type="file"
              ref={garmentInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleGarmentFileChange}
            />

            {garmentPreview ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.5rem 0.7rem',
                  background: '#ffffff',
                  border: '1px solid var(--border-hair)',
                  borderRadius: '6px'
                }}
              >
                <img
                  src={garmentPreview}
                  alt="Garment Preview"
                  style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '3px', background: '#f5f5f5' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.74rem', fontWeight: '600', color: '#000000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                    {garmentName || 'Uploaded Garment'}
                  </p>
                  <span className="formula-tag">{scope.toUpperCase()} · READY</span>
                </div>
                <button
                  type="button"
                  onClick={() => garmentInputRef.current?.click()}
                  className="btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  title="Change Image"
                >
                  <RefreshCw size={11} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => garmentInputRef.current?.click()}
                style={{
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0.7rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.6)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#000000')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Upload size={14} style={{ margin: '0 auto 0.2rem', color: 'var(--text-muted)' }} />
                <p style={{ fontSize: '0.72rem', fontWeight: '500', color: 'var(--text-primary)', margin: 0 }}>
                  Attach Garment Flat-Lay
                </p>
                <p className="formula-tag" style={{ fontSize: '0.62rem', margin: '2px 0 0' }}>Optional · Or generate directly from vision narrative</p>
              </div>
            )}
          </div>

          {/* C. Parameter Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* 1. Model Ethnicity Slider */}
            <div className="slider-group">
              <div className="slider-group-header">
                <span className="slider-label">Model Ethnicity / Archetype</span>
                <span className="slider-value" style={{ color: 'var(--color-obsidian)', fontWeight: '600' }}>
                  {activeEthnicity.label}
                </span>
              </div>
              <input
                type="range"
                className="refined-slider"
                min={0}
                max={ETHNICITY_PRESETS.length - 1}
                step={1}
                value={ethnicityIndex}
                onChange={(e) => setEthnicityIndex(Number(e.target.value))}
              />
              <p style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', lineHeight: '1.3', marginTop: '2px' }}>
                {activeEthnicity.archetype.split('—')[1]?.trim() || activeEthnicity.archetype}
              </p>
            </div>

            {/* 2. Lighting (Studio / Natural) Slider */}
            <div className="slider-group">
              <div className="slider-group-header">
                <span className="slider-label">Lighting Environment</span>
                <span className="slider-value">
                  {lightingSlider <= 25 ? 'Studio High-Key' : lightingSlider <= 60 ? 'Chiaroscuro' : 'Natural Sun'} ({lightingSlider}%)
                </span>
              </div>
              <input
                type="range"
                className="refined-slider"
                min={0}
                max={100}
                step={5}
                value={lightingSlider}
                onChange={(e) => setLightingSlider(Number(e.target.value))}
              />
              <p style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', lineHeight: '1.3', marginTop: '2px' }}>
                {activeLighting.desc}
              </p>
            </div>

            {/* 3. Fabric Texture Slider */}
            <div className="slider-group">
              <div className="slider-group-header">
                <span className="slider-label">Fabric Texture & Sheen</span>
                <span className="slider-value">{activeFabric.label}</span>
              </div>
              <input
                type="range"
                className="refined-slider"
                min={0}
                max={100}
                step={5}
                value={fabricSlider}
                onChange={(e) => setFabricSlider(Number(e.target.value))}
              />
              <p style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', lineHeight: '1.3', marginTop: '2px' }}>
                {activeFabric.promptAdd.slice(0, 75)}...
              </p>
            </div>

            {/* 4. Garment Scope Selector */}
            <div>
              <span className="slider-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                Garment Scope
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.3rem' }}>
                {['one-piece', 'top', 'outerwear', 'bottom', 'full-outfit'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScope(s)}
                    style={{
                      background: scope === s ? '#000000' : '#ffffff',
                      color: scope === s ? '#ffffff' : '#111111',
                      border: `1px solid ${scope === s ? '#000000' : 'rgba(0, 0, 0, 0.15)'}`,
                      borderRadius: '999px',
                      padding: '0.4rem 0.2rem',
                      fontSize: '0.66rem',
                      fontWeight: scope === s ? '600' : '500',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Biometric Facial Lock Toggle */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.8rem',
                background: biometricLock ? 'rgba(197, 168, 128, 0.08)' : '#ffffff',
                border: `1px solid ${biometricLock ? 'var(--color-accent-gold)' : 'var(--border-hair)'}`,
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => setBiometricLock(!biometricLock)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={12} style={{ color: biometricLock ? 'var(--color-accent-gold)' : 'var(--text-muted)' }} />
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: '600', color: '#000000', margin: 0 }}>
                    Biometric Identity Lock
                  </p>
                  <p className="formula-tag" style={{ margin: 0 }}>
                    Preserves exact facial geometry & skin tone
                  </p>
                </div>
              </div>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: biometricLock ? '#000000' : '#d8d8de',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.6rem'
                }}
              >
                {biometricLock && <Check size={10} />}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div
              style={{
                padding: '0.7rem 0.8rem',
                background: 'rgba(255, 60, 60, 0.08)',
                border: '1px solid rgba(255, 60, 60, 0.3)',
                borderRadius: '6px',
                color: '#d32f2f',
                fontSize: '0.72rem',
                lineHeight: '1.4'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span>{errorMsg}</span>
                <button
                  type="button"
                  onClick={() => setErrorMsg(null)}
                  style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', padding: 0, fontSize: '0.8rem', lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>
              {errorMsg.toLowerCase().includes('garment') && (
                <button
                  type="button"
                  onClick={() => {
                    setGarmentPreview('/assets/garments/camel_cashmere_coat.png');
                    setGarmentName('Camel Cashmere Coat (Atelier Default)');
                    setGarmentFile(null);
                    setScope('outerwear');
                    setErrorMsg(null);
                  }}
                  className="btn-secondary"
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.66rem',
                    padding: '0.3rem 0.6rem',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  Load Default Studio Garment & Retry
                </button>
              )}
            </div>
          )}
        </div>

        {/* Console Footer: The Bold High-Contrast Generate Action Button */}
        <div className="console-footer">
          <button
            className="btn-generate-atelier"
            disabled={rendering}
            onClick={handleExecuteGenerate}
          >
            {rendering ? (
              <>
                <RefreshCw size={15} className="status-dot-pulse" />
                Synthesizing Couture... ({elapsedSec}s)
              </>
            ) : (
              <>
                <Sparkles size={15} />
                {garmentPreview ? 'Fit & Drape Couture' : 'Generate Haute Couture'}
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ────────────────────────────────────────────────────────────────
          3. THE "LOOKBOOK WORKBOOK" TRAY (BOTTOM STRIP)
          ──────────────────────────────────────────────────────────────── */}
      <footer className="lookbook-bottom-tray">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span className="heading-sub" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
            LOOKBOOK WORKBOOK
          </span>
          <span className="formula-tag">({trayItems.length})</span>
        </div>

        <div className="lookbook-strip-scroll">
          {trayItems.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
              <span className="formula-tag">NO GENERATIONS IN WORKBOOK YET · CREATE YOUR FIRST LOOK ABOVE</span>
            </div>
          ) : (
            trayItems.map((item, idx) => {
              const imgUrl = item.local_image_path
                ? `/${item.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
                : (item.image_url || `/api/duckdb/photo/${item.shoot_id}`);
              const isSelected = selectedTrayIndex === idx;

              return (
                <img
                  key={item.shoot_id || idx}
                  src={imgUrl}
                  alt={`Workbook look ${idx + 1}`}
                  className={`lookbook-thumb ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectTrayItem(item, idx)}
                  title={`${item.garment_name || item.model_name || 'Look'} · Click to view on canvas`}
                  onError={(e) => {
                    if (!e.target.dataset.triedBlob && item.shoot_id) {
                      e.target.dataset.triedBlob = "true";
                      e.target.src = `/api/duckdb/photo/${item.shoot_id}`;
                    }
                  }}
                />
              );
            })
          )}
        </div>

        {activeCanvasImage && (
          <button
            onClick={() => {
              setActiveCanvasImage(null);
              setRenderResult(null);
              setSelectedTrayIndex(-1);
            }}
            className="btn-secondary"
            style={{ flexShrink: 0, padding: '0.45rem 0.85rem', fontSize: '0.68rem', borderRadius: '4px' }}
            title="Empty canvas to describe new vision"
          >
            Clear Canvas
          </button>
        )}
      </footer>
    </div>
  );
}
