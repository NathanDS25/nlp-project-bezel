import React, { useState, useEffect } from 'react';
import {
  Scissors,
  Palette,
  Sparkles,
  Download,
  Eye,
  RefreshCw,
  Sliders,
  ChevronRight,
  Upload,
  Check,
  RotateCw,
  Layers,
  ArrowRight,
  Shirt,
  Tag,
  Maximize2
} from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';
import BeforeAfterSlider from './BeforeAfterSlider';
import PromptEnhancer from './PromptEnhancer';

// Curated Haute Couture Color Swatches
const COLOR_SWATCHES = [
  { name: 'Noir Obsidian', hex: '#0A0A0A', category: 'Monochrome' },
  { name: 'Pure Optic White', hex: '#FFFFFF', category: 'Monochrome' },
  { name: 'Camel Cashmere', hex: '#C19A6B', category: 'Warm Earth' },
  { name: 'Ivory Crème', hex: '#F5F2EB', category: 'Warm Earth' },
  { name: 'Bordeaux Wine', hex: '#4A121A', category: 'Deep Jewel' },
  { name: 'Cobalt Royal', hex: '#0047FF', category: 'Deep Jewel' },
  { name: 'Forest Emerald', hex: '#1F382B', category: 'Deep Jewel' },
  { name: 'Terracotta Sienna', hex: '#B85D38', category: 'Warm Earth' },
  { name: 'Champagne Satin', hex: '#D4AF37', category: 'Precious' },
  { name: 'Lavender Mist', hex: '#9B8AA9', category: 'Pastel' },
  { name: 'Gunmetal Slate', hex: '#3E424B', category: 'Monochrome' }
];

// Garment Categories
const GARMENT_CATEGORIES = [
  { id: 'outerwear', label: 'Outerwear & Coats', defaultFabric: 'Double-Faced Cashmere Wool', defaultSilhouette: 'Tailored Architectural' },
  { id: 'evening-gown', label: 'Evening Gowns & Dresses', defaultFabric: '22-Momme Liquid Silk Charmeuse', defaultSilhouette: 'Cinched Hourglass Drape' },
  { id: 'blazer-suit', label: 'Tailored Blazers & Suiting', defaultFabric: '180s Worsted Wool & Cashmere', defaultSilhouette: 'Structured Peak-Lapel' },
  { id: 'blouse-top', label: 'Silk Blouses & Shirts', defaultFabric: 'Fluid Silk Crêpe de Chine', defaultSilhouette: 'Fluid Oversized' },
  { id: 'trousers', label: 'Tailored Trousers & Pants', defaultFabric: 'Crisp Wool Gabardine', defaultSilhouette: 'High-Waisted Wide-Leg' },
  { id: 'knitwear', label: 'Cashmere Knitwear & Sweaters', defaultFabric: 'Brushed Mongolian Cashmere', defaultSilhouette: 'Minimalist Relaxed' },
  { id: 'streetwear', label: 'Streetwear & Structured Hoodies', defaultFabric: '450gsm Heavyweight Loopback Cotton', defaultSilhouette: 'Boxy Drop-Shoulder' },
  { id: 'leather', label: 'Leather Jackets & Trenches', defaultFabric: 'Supple Italian Nappa Calfskin', defaultSilhouette: 'Sculptural Moto Silhouette' },
  { id: 'corset', label: 'Corsets & Tailored Bodices', defaultFabric: 'Structured Technical Taffeta', defaultSilhouette: 'Architectural Boned Waist' }
];

// Fabric & Textile Weaves
const FABRIC_TEXTILES = [
  'Double-Faced Cashmere Wool',
  '22-Momme Liquid Silk Charmeuse',
  '180s Worsted Wool & Cashmere',
  'Italian Velvet Corduroy',
  '14oz Japanese Selvedge Denim',
  'Raw Slub Organic Linen',
  'Architectural Technical Taffeta',
  'Supple Italian Nappa Calfskin',
  'Sheer Mulberry Silk Organza',
  'Brushed Kid Mohair & Alpaca',
  'Structured Heavy Cotton Gabardine'
];

// Silhouettes
const SILHOUETTES = [
  'Tailored Architectural',
  'Fluid Cascading Oversized',
  'Cinched Hourglass Drape',
  'Minimalist Boxy Cut',
  'Asymmetric Draped Fold',
  'Sculptural Sharp Peak-Lapel',
  'High-Waisted Wide-Leg'
];

// Hardware & Accents
const HARDWARE_ACCENTS = [
  'Horn Buttons & Concealed Placket',
  'Brushed Silver Riri Zippers',
  'Vintage Brass Buckles & Belt',
  'Peak Satin Lapels & French Cuffs',
  'Contrast White Saddle Topstitching',
  'Raw Minimalist Clean Edges',
  'Mother-of-Pearl Buttons'
];

// Presentation Views
const VIEW_MODES = [
  { id: 'flat-lay', label: 'Commercial Flat-Lay Packshot' },
  { id: 'ghost-mannequin', label: '3D Ghost Mannequin' },
  { id: 'dress-form', label: 'Atelier Tailor Dress Form' },
  { id: 'runway-model', label: 'Runway Model Drape' },
  { id: 'macro-textile', label: 'Macro Fabric Texture Detail' }
];

export default function AtelierTailor({ onNavigateToWardrobe }) {
  // Active Mode: 'design' (Create New Cloth) | 'edit' (Edit/Recolor Current Cloth)
  const [activeConsoleTab, setActiveConsoleTab] = useState('design');

  // ── DESIGN NEW CLOTH STATE ──
  const [clothDescription, setClothDescription] = useState(
    'A sculptural double-breasted trench coat with structured storm flap, wide belted waist, and sharp tailored storm collar.'
  );
  const [garmentCategory, setGarmentCategory] = useState(GARMENT_CATEGORIES[0].id);
  const [silhouette, setSilhouette] = useState(GARMENT_CATEGORIES[0].defaultSilhouette);
  const [fabric, setFabric] = useState(GARMENT_CATEGORIES[0].defaultFabric);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[2]); // Camel Cashmere
  const [customHex, setCustomHex] = useState('#C19A6B');
  const [pattern, setPattern] = useState('Solid Minimalist');
  const [hardware, setHardware] = useState(HARDWARE_ACCENTS[0]);
  const [viewMode, setViewMode] = useState('flat-lay');
  const [customModelId, setCustomModelId] = useState(''); // Separate model input for later

  // ── ACTIVE GARMENT & CANVAS STATE ──
  const [activeGarment, setActiveGarment] = useState(null);
  const [previousVersionImage, setPreviousVersionImage] = useState(null);
  const [showComparison, setShowComparison] = useState(true);
  const [synthesizing, setSynthesizing] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);

  // ── EDIT / RECOLOR STATE ──
  const [editColor, setEditColor] = useState(COLOR_SWATCHES[4]); // Bordeaux Wine
  const [editCustomHex, setEditCustomHex] = useState('#4A121A');
  const [editFabric, setEditFabric] = useState('Italian Velvet Corduroy');
  const [editRevisionPrompt, setEditRevisionPrompt] = useState(
    'Recolor to rich Bordeaux Wine in Italian velvet texture, preserving tailored silhouette and clean seams.'
  );
  const [editingGarment, setEditingGarment] = useState(false);

  // ── RECENT DESIGNS TRAY ──
  const [trayItems, setTrayItems] = useState([]);
  const [loadingTray, setLoadingTray] = useState(false);

  // Load past tailor designs on mount
  useEffect(() => {
    fetchTrayHistory();
  }, []);

  const fetchTrayHistory = async () => {
    setLoadingTray(true);
    try {
      const res = await fetch('/api/tailor/history?limit=30');
      if (res.ok) {
        const data = await res.json();
        setTrayItems(data || []);
        // If no active garment yet, load first from history
        if (!activeGarment && data && data.length > 0) {
          const first = data[0];
          const imgUrl = first.local_image_path
            ? `/${first.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
            : (first.image_url || `/api/duckdb/photo/${first.shoot_id}`);
          setActiveGarment({
            image_url: imgUrl,
            local_image_path: first.local_image_path,
            garment_name: first.garment_name || 'bespoke_garment.png',
            color: 'Camel Cashmere',
            color_hex: '#C19A6B',
            fabric: 'Double-Faced Cashmere Wool',
            silhouette: 'Tailored Architectural',
            prompt: first.prompt_used || 'Bespoke Couture Garment',
            elapsed_sec: first.render_time_sec || 3.8
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTray(false);
    }
  };

  // Timer for synthesis animation
  useEffect(() => {
    let timer;
    if (synthesizing || editingGarment) {
      setElapsedSec(0);
      timer = setInterval(() => setElapsedSec((s) => +(s + 0.1).toFixed(1)), 100);
    }
    return () => clearInterval(timer);
  }, [synthesizing, editingGarment]);

  // Handle Category Change
  const handleCategoryChange = (catId) => {
    setGarmentCategory(catId);
    const cat = GARMENT_CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      if (cat.defaultFabric) setFabric(cat.defaultFabric);
      if (cat.defaultSilhouette) setSilhouette(cat.defaultSilhouette);
    }
  };

  // 1. Synthesize New Garment Design
  const handleDesignGarment = async () => {
    if (!clothDescription.trim()) return;

    setSynthesizing(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/tailor/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: clothDescription.trim(),
          garment_type: garmentCategory,
          silhouette,
          color: selectedColor.name,
          color_hex: customHex,
          fabric,
          hardware,
          pattern,
          view_mode: viewMode,
          custom_model_id: customModelId.trim() || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        // If we previously had an active garment, store it for comparison
        if (activeGarment?.image_url) {
          setPreviousVersionImage(activeGarment.image_url);
        }
        setActiveGarment(data);
        setStatusMessage(data.offline_note || 'Bespoke garment synthesized successfully.');
        fetchTrayHistory();
      } else {
        const err = await res.json();
        setStatusMessage(`Design error: ${err.detail || 'Could not synthesize garment'}`);
      }
    } catch (e) {
      console.error(e);
      setStatusMessage('Network connection error.');
    } finally {
      setSynthesizing(false);
    }
  };

  // 2. Recolor / Edit Existing Garment
  const handleRecolorGarment = async () => {
    if (!activeGarment) {
      setStatusMessage('Please design or select a garment first.');
      return;
    }

    setEditingGarment(true);
    setStatusMessage(null);

    const imgPath = activeGarment.local_image_path || activeGarment.image_url;

    try {
      const res = await fetch('/api/tailor/recolor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_path: imgPath,
          garment_name: activeGarment.garment_name || 'tailor_piece.png',
          target_color: editColor.name,
          target_hex: editCustomHex,
          target_fabric: editFabric,
          scope: activeGarment.garment_type || 'one-piece',
          modification_brief: editRevisionPrompt.trim(),
          custom_model_id: customModelId.trim() || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Set previous image for before/after comparison
        setPreviousVersionImage(activeGarment.image_url);
        setActiveGarment({
          ...activeGarment,
          ...data,
          color: editColor.name,
          color_hex: editCustomHex,
          fabric: editFabric
        });
        setStatusMessage(`Garment recolored to ${editColor.name} (${editFabric}).`);
        fetchTrayHistory();
      } else {
        const err = await res.json();
        setStatusMessage(`Recolor error: ${err.detail || 'Failed to modify garment'}`);
      }
    } catch (e) {
      console.error(e);
      setStatusMessage('Network connection error.');
    } finally {
      setEditingGarment(false);
    }
  };

  // Send garment to virtual try-on wardrobe
  const handleSendToWardrobe = () => {
    if (!activeGarment) return;
    if (onNavigateToWardrobe) {
      onNavigateToWardrobe(activeGarment.image_url, activeGarment.garment_name);
    }
  };

  return (
    <div className="atelier-stage-layout" style={{ position: 'relative' }}>
      {/* ────────────────────────────────────────────────────────────────
          1. THE OPTICAL GARMENT CANVAS (MAIN STAGE)
          ──────────────────────────────────────────────────────────────── */}
      <div className="optical-monitor-stage">
        {synthesizing || editingGarment ? (
          // Couture Loader
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              padding: '3rem 2rem',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid var(--border-hair)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08)'
            }}
          >
            <CoutureConveyorLoader
              elapsedSec={elapsedSec}
              garmentName={
                editingGarment
                  ? `Recoloring to ${editColor.name}`
                  : `Tailoring ${GARMENT_CATEGORIES.find((c) => c.id === garmentCategory)?.label}`
              }
              scope={garmentCategory}
            />
          </div>
        ) : activeGarment ? (
          // Active Garment Display
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Top Canvas Bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.8rem',
                padding: '0 0.2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: activeGarment.color_hex || '#C19A6B',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    display: 'inline-block'
                  }}
                  title={activeGarment.color || 'Color Swatch'}
                />
                <span className="heading-sub" style={{ fontSize: '0.72rem', letterSpacing: '0.18em' }}>
                  {activeGarment.color || 'BESPOKE TAILOR PIECE'}
                </span>
                <span style={{ color: 'var(--text-faint)' }}>·</span>
                <span className="formula-tag">{activeGarment.fabric || 'CASHMERE WOOL'}</span>
                {activeGarment.elapsed_sec && (
                  <>
                    <span style={{ color: 'var(--text-faint)' }}>·</span>
                    <span className="formula-tag">{activeGarment.elapsed_sec}s SYNTHESIS</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {previousVersionImage && (
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.66rem' }}
                    title="Toggle Before/After drape comparison slider"
                  >
                    <Eye size={12} /> {showComparison ? 'Compare: ON' : 'Compare: OFF'}
                  </button>
                )}

                <button
                  onClick={handleSendToWardrobe}
                  className="btn-secondary"
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.66rem',
                    background: '#000000',
                    color: '#ffffff',
                    borderColor: '#000000'
                  }}
                  title="Send this bespoke garment to the Wardrobe Virtual Try-On studio"
                >
                  <Layers size={12} /> Try On Model
                </button>

                <a
                  href={activeGarment.image_url}
                  download={activeGarment.garment_name || 'bespoke_garment.png'}
                  className="btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  title="Download High-Res Packshot PNG"
                >
                  <Download size={13} />
                </a>
              </div>
            </div>

            {/* Viewport Frame */}
            <div
              style={{
                width: '100%',
                maxHeight: '660px',
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
              {previousVersionImage && showComparison ? (
                <BeforeAfterSlider
                  beforeImage={previousVersionImage}
                  afterImage={activeGarment.image_url}
                  beforeLabel="ORIGINAL SPEC"
                  afterLabel="EDITED / RECOLORED"
                  height="620px"
                />
              ) : (
                <img
                  src={activeGarment.image_url}
                  alt="Taylor Bespoke Garment"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '620px',
                    objectFit: 'contain',
                    background: '#fafafa'
                  }}
                />
              )}
            </div>

            {/* Garment Directive Caption */}
            <div style={{ marginTop: '0.9rem', textAlign: 'center', maxWidth: '640px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.45',
                  letterSpacing: '0.015em'
                }}
              >
                "{activeGarment.prompt || clothDescription}"
              </p>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="vision-empty-state">
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#f0f0f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <Scissors size={22} style={{ color: '#000000' }} />
            </div>
            <h1 className="vision-prompt-title">Taylor Bespoke Studio</h1>
            <p className="vision-prompt-subtitle">NEURAL COUTURE CUTTING, SEAMING & RECOLORING</p>
            <p
              style={{
                maxWidth: '460px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                marginTop: '0.8rem',
                lineHeight: '1.6'
              }}
            >
              Describe your garment in the console to the right, refine fabric composition,
              swatches, and lapel cuts, or modify and recolor existing couture pieces.
            </p>
          </div>
        )}

        {/* ── LOOKBOOK TRAY OF PREVIOUS TAYLOR DESIGNS ── */}
        <div
          style={{
            width: '100%',
            maxWidth: '820px',
            marginTop: '2rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid var(--border-hair)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span className="heading-sub" style={{ fontSize: '0.66rem', letterSpacing: '0.18em' }}>
              TAYLOR BESPOKE ARCHIVE
            </span>
            <span className="formula-tag">{trayItems.length} PIECES READY</span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'thin'
            }}
          >
            {trayItems.map((item, idx) => {
              const url = item.local_image_path
                ? `/${item.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
                : item.image_url;
              return (
                <div
                  key={item.shoot_id || idx}
                  onClick={() => {
                    if (activeGarment?.image_url && activeGarment.image_url !== url) {
                      setPreviousVersionImage(activeGarment.image_url);
                    }
                    setActiveGarment({
                      image_url: url,
                      local_image_path: item.local_image_path,
                      garment_name: item.garment_name || 'bespoke_garment.png',
                      color: 'Bespoke Colorway',
                      color_hex: '#111111',
                      fabric: 'Atelier Fabric',
                      silhouette: 'Tailored',
                      prompt: item.prompt_used || 'Bespoke Garment'
                    });
                  }}
                  style={{
                    flexShrink: 0,
                    width: '64px',
                    height: '64px',
                    borderRadius: '6px',
                    border: activeGarment?.image_url === url ? '2px solid #000000' : '1px solid var(--border-hair)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#f5f5f5',
                    transition: 'all var(--transition-fast)'
                  }}
                  title={item.prompt_used || 'Select to edit'}
                >
                  <img
                    src={url}
                    alt="Past design"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────
          2. THE DIRECTIVE CONSOLE (RIGHT-SIDE CONTROL PANEL)
          ──────────────────────────────────────────────────────────────── */}
      <aside className="floating-input-console" style={{ width: '420px' }}>
        {/* Console Header */}
        <div className="console-header">
          <div>
            <span className="heading-sub" style={{ fontSize: '0.68rem', letterSpacing: '0.22em' }}>
              DIRECTIVE CONSOLE
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: '#000000',
                margin: '2px 0 0'
              }}
            >
              Taylor Atelier
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', background: '#f0f0f3', padding: '3px', borderRadius: '999px' }}>
            <button
              onClick={() => setActiveConsoleTab('design')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                border: 'none',
                fontSize: '0.66rem',
                fontWeight: '600',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                background: activeConsoleTab === 'design' ? '#000000' : 'transparent',
                color: activeConsoleTab === 'design' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Design New
            </button>
            <button
              onClick={() => setActiveConsoleTab('edit')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '999px',
                border: 'none',
                fontSize: '0.66rem',
                fontWeight: '600',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                background: activeConsoleTab === 'edit' ? '#000000' : 'transparent',
                color: activeConsoleTab === 'edit' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Edit & Recolor
            </button>
          </div>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div
            style={{
              padding: '0.5rem 0.8rem',
              background: '#f8f8fa',
              borderBottom: '1px solid var(--border-hair)',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>{statusMessage}</span>
            <button
              onClick={() => setStatusMessage(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ×
            </button>
          </div>
        )}

        {/* Console Body */}
        <div className="console-body" style={{ padding: '1.2rem', overflowY: 'auto' }}>
          {/* ════════════════════════════════════════════════════════════
              MODE 1: DESIGN NEW CLOTH BY DESCRIBING IT
              ════════════════════════════════════════════════════════════ */}
          {activeConsoleTab === 'design' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 1. Prompt Description with Built-in Nemotron Enhancer */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Describe the Garment Design
                </label>
                <textarea
                  className="atelier-prompt-input"
                  rows={3}
                  value={clothDescription}
                  onChange={(e) => setClothDescription(e.target.value)}
                  placeholder="Describe silhouette, lapel structure, drape motion, seams, buttons..."
                />

                {/* NEMOTRON PROMPT ENHANCER (Opt-In) */}
                <PromptEnhancer
                  prompt={clothDescription}
                  onEnhanced={(enhanced) => setClothDescription(enhanced)}
                  style="tailor"
                  label="Master Tailor Enhancer"
                />
              </div>

              {/* 2. Garment Category */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Garment Category
                </label>
                <select
                  value={garmentCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {GARMENT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Primary Color Swatch & Custom Hex Picker */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="slider-label">Primary Color & Palette</label>
                  <span className="formula-tag">{selectedColor.name}</span>
                </div>

                {/* Swatch chips */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {COLOR_SWATCHES.map((sw) => (
                    <button
                      key={sw.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(sw);
                        setCustomHex(sw.hex);
                      }}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: sw.hex,
                        border: selectedColor.name === sw.name ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        boxShadow: selectedColor.name === sw.name ? '0 0 0 2px rgba(0, 0, 0, 0.15)' : 'none',
                        transition: 'all var(--transition-fast)'
                      }}
                      title={`${sw.name} (${sw.hex})`}
                    />
                  ))}
                </div>

                {/* Custom Color Input & Hex Code */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setSelectedColor({ name: `Custom (${e.target.value})`, hex: e.target.value });
                    }}
                    style={{
                      width: '36px',
                      height: '32px',
                      padding: '2px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-hair)',
                      cursor: 'pointer',
                      background: 'none'
                    }}
                    title="Pick custom color"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setSelectedColor({ name: `Custom (${e.target.value})`, hex: e.target.value });
                    }}
                    className="atelier-select"
                    style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}
                    placeholder="#Hex Color"
                  />
                </div>
              </div>

              {/* 4. Fabric & Textile Weave */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Fabric & Textile Composition
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {FABRIC_TEXTILES.map((fab) => (
                    <option key={fab} value={fab}>
                      {fab}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Silhouette & Cut */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Silhouette & Cut
                </label>
                <select
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {SILHOUETTES.map((sil) => (
                    <option key={sil} value={sil}>
                      {sil}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Hardware & Seam Construction */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Hardware & Construction Accents
                </label>
                <select
                  value={hardware}
                  onChange={(e) => setHardware(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {HARDWARE_ACCENTS.map((hw) => (
                    <option key={hw} value={hw}>
                      {hw}
                    </option>
                  ))}
                </select>
              </div>

              {/* 7. Presentation View Mode */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Presentation View
                </label>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {VIEW_MODES.map((vm) => (
                    <option key={vm.id} value={vm.id}>
                      {vm.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Custom Separate Model Specification (For User's Future Model) */}
              <div
                style={{
                  padding: '0.6rem 0.8rem',
                  background: '#fafafa',
                  borderRadius: '6px',
                  border: '1px solid var(--border-hair)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label className="slider-label" style={{ fontSize: '0.66rem' }}>
                    Separate Tailor Model
                  </label>
                  <span className="formula-tag" style={{ fontSize: '0.55rem' }}>USER PLUGGABLE</span>
                </div>
                <input
                  type="text"
                  value={customModelId}
                  onChange={(e) => setCustomModelId(e.target.value)}
                  placeholder="Default (Qwen-Fashion-T2I) or enter custom model/checkpoint name"
                  className="atelier-select"
                  style={{ width: '100%', fontSize: '0.68rem', padding: '0.35rem 0.6rem' }}
                />
                <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: 0 }}>
                  You can provide a separate custom model checkpoint here whenever ready.
                </p>
              </div>

              {/* Action Button: Synthesize Garment */}
              <button
                type="button"
                onClick={handleDesignGarment}
                disabled={synthesizing}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Sparkles size={14} />
                {synthesizing ? 'SYNTHESIZING BESPOKE CLOTH...' : 'SYNTHESIZE BESPOKE GARMENT'}
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════
              MODE 2: EDIT & RECOLOR EXISTING CLOTH
              ════════════════════════════════════════════════════════════ */}
          {activeConsoleTab === 'edit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Active Cloth Target Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.6rem 0.8rem',
                  background: '#ffffff',
                  border: '1px solid var(--border-hair)',
                  borderRadius: '6px'
                }}
              >
                {activeGarment?.image_url ? (
                  <img
                    src={activeGarment.image_url}
                    alt="Current Cloth"
                    style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '4px', background: '#f5f5f5' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '4px',
                      background: '#f0f0f3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Shirt size={20} style={{ color: 'var(--text-muted)' }} />
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.74rem', fontWeight: '600', color: '#000000', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeGarment?.garment_name || 'No cloth selected'}
                  </p>
                  <span className="formula-tag">
                    {activeGarment ? `${activeGarment.color || 'Custom'} · ${activeGarment.fabric || 'Textile'}` : 'Select from archive or design new'}
                  </span>
                </div>
              </div>

              {/* 1. Recolor: Target Color Swatch & Hex Picker */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="slider-label">New Colorway Swatch</label>
                  <span className="formula-tag">{editColor.name}</span>
                </div>

                {/* Swatches */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {COLOR_SWATCHES.map((sw) => (
                    <button
                      key={sw.name}
                      type="button"
                      onClick={() => {
                        setEditColor(sw);
                        setEditCustomHex(sw.hex);
                      }}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: sw.hex,
                        border: editColor.name === sw.name ? '2px solid #000000' : '1px solid rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        boxShadow: editColor.name === sw.name ? '0 0 0 2px rgba(0, 0, 0, 0.15)' : 'none',
                        transition: 'all var(--transition-fast)'
                      }}
                      title={`${sw.name} (${sw.hex})`}
                    />
                  ))}
                </div>

                {/* Custom Color Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <input
                    type="color"
                    value={editCustomHex}
                    onChange={(e) => {
                      setEditCustomHex(e.target.value);
                      setEditColor({ name: `Custom (${e.target.value})`, hex: e.target.value });
                    }}
                    style={{
                      width: '36px',
                      height: '32px',
                      padding: '2px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-hair)',
                      cursor: 'pointer',
                      background: 'none'
                    }}
                  />
                  <input
                    type="text"
                    value={editCustomHex}
                    onChange={(e) => {
                      setEditCustomHex(e.target.value);
                      setEditColor({ name: `Custom (${e.target.value})`, hex: e.target.value });
                    }}
                    className="atelier-select"
                    style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>

              {/* 2. Fabric & Material Swap */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Swap Fabric & Texture
                </label>
                <select
                  value={editFabric}
                  onChange={(e) => setEditFabric(e.target.value)}
                  className="atelier-select"
                  style={{ width: '100%' }}
                >
                  {FABRIC_TEXTILES.map((fab) => (
                    <option key={fab} value={fab}>
                      {fab}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Revision Directive / Styling Modifications */}
              <div>
                <label className="slider-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
                  Modification & Styling Brief
                </label>
                <textarea
                  className="atelier-prompt-input"
                  rows={3}
                  value={editRevisionPrompt}
                  onChange={(e) => setEditRevisionPrompt(e.target.value)}
                  placeholder="Specify cuts to change, trim accents to add, collar revisions, cropped lengths..."
                />

                {/* Nemotron Enhancer for Revisions */}
                <PromptEnhancer
                  prompt={editRevisionPrompt}
                  onEnhanced={(enhanced) => setEditRevisionPrompt(enhanced)}
                  style="tailor"
                  label="Master Tailor Enhancer"
                  compact={true}
                />
              </div>

              {/* Action Buttons: Apply Recolor & Modification */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.4rem' }}>
                <button
                  type="button"
                  onClick={handleRecolorGarment}
                  disabled={editingGarment || !activeGarment}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <Palette size={14} />
                  {editingGarment ? 'RECOLORING & ALTERING...' : 'APPLY COLOR & FABRIC RECOLOR'}
                </button>

                <button
                  type="button"
                  onClick={handleSendToWardrobe}
                  disabled={!activeGarment}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Layers size={13} /> Send Cloth to Virtual Try-On
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
