import React, { useState, useEffect } from 'react';
import { Sparkles, Upload, Search, Download, Video, Play, Eye, RefreshCw, ChevronRight, Package, Palette, RotateCw, Image as ImageIcon, ChevronDown, ChevronUp, Grid3X3, Layers, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function AtelierTryOn({ schemas, models, onSelectModel, initialGarment }) {
  const [activeGarmentTab, setActiveGarmentTab] = useState('upload'); // 'upload' | 'layering' | 'lookbook'
  const [garmentFile, setGarmentFile] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);
  const [garmentName, setGarmentName] = useState('');
  const [tryonElapsed, setTryonElapsed] = useState(0);

  // Sync initialGarment when routed from Taylor Studio
  useEffect(() => {
    if (initialGarment?.url) {
      setGarmentPreview(initialGarment.url);
      setGarmentName(initialGarment.name || 'bespoke_taylor_garment.png');
      setActiveGarmentTab('upload');
    }
  }, [initialGarment]);

  // Multi-garment layering combinator state
  const [layerFiles, setLayerFiles] = useState({
    top: null,
    outerwear: null,
    bottom: null,
    footwear: null
  });
  const [layerPreviews, setLayerPreviews] = useState({
    top: null,
    outerwear: null,
    bottom: null,
    footwear: null
  });
  const [lookbookExporting, setLookbookExporting] = useState(false);
  const [lookbookPdfResult, setLookbookPdfResult] = useState(null);
  const [showLookbookPdf, setShowLookbookPdf] = useState(false);

  // Lookbook search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Model selection
  const [genderFilter, setGenderFilter] = useState('All'); // 'All' | 'Female' | 'Male'
  const [selectedModelId, setSelectedModelId] = useState(Object.keys(models)[0] || '');
  const [customModelFile, setCustomModelFile] = useState(null);
  const [customModelPreview, setCustomModelPreview] = useState(null);
  const [useCustomModel, setUseCustomModel] = useState(false);

  // Sync selectedModelId whenever models registry updates or loads
  useEffect(() => {
    if ((!selectedModelId || !models[selectedModelId]) && Object.keys(models).length > 0) {
      setSelectedModelId(Object.keys(models)[0]);
    }
  }, [models]);

  const handleGenderFilterChange = (g) => {
    setGenderFilter(g);
    const matches = Object.entries(models).filter(([k, v]) => {
      if (g === 'All') return true;
      return v.gender?.toLowerCase() === g.toLowerCase();
    });
    if (matches.length > 0 && !matches.some(([k]) => k === selectedModelId)) {
      setSelectedModelId(matches[0][0]);
    }
  };

  const filteredModelEntries = Object.entries(models).filter(([k, v]) => {
    if (genderFilter === 'All') return true;
    return v.gender?.toLowerCase() === genderFilter.toLowerCase();
  });

  // Styling Directives
  const rea = schemas?.rea || {};
  const [scope, setScope] = useState('one-piece');
  const [photoType, setPhotoType] = useState('flat-lay');
  const [fitStyle, setFitStyle] = useState('Tailored Catalog (Crisp details, balanced proportions)');
  const [framing, setFraming] = useState('Full Body (Head-to-Toe Standing)');
  const [lighting, setLighting] = useState('Soft Diffused Commercial Studio (Even beauty lighting)');
  const [background, setBackground] = useState('Minimalist Concrete Studio (Subtle architectural shadows)');
  const [pose, setPose] = useState('Front-Facing Minimalist Pose (Relaxed posture, natural drape)');
  const [designerBrief, setDesignerBrief] = useState('Crisp commercial lookbook shoot with high garment fidelity, symmetrical tailoring, and natural fabric drape.');
  const [customModelDirection, setCustomModelDirection] = useState('');

  // Prompt preview
  const [promptPreview, setPromptPreview] = useState('');
  const [nlpEngine, setNlpEngine] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  // Generation state
  const [rendering, setRendering] = useState(false);
  const [renderResult, setRenderResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Animation state
  const [animType, setAnimType] = useState('slow_zoom');
  const [animDur, setAnimDur] = useState(3);
  const [animating, setAnimating] = useState(false);
  const [animResult, setAnimResult] = useState(null);

  // Packshot Export state
  const [packshotExporting, setPackshotExporting] = useState(false);
  const [packshotResult, setPackshotResult] = useState(null);
  const [showPackshot, setShowPackshot] = useState(false);

  // Colorway Swatches state
  const [colorwayPresets, setColorwayPresets] = useState({});
  const [selectedColorway, setSelectedColorway] = useState('camel');
  const [colorwayRendering, setColorwayRendering] = useState(false);
  const [colorwayResult, setColorwayResult] = useState(null);
  const [showColorway, setShowColorway] = useState(false);

  // Multi-Angle 360° state
  const [multiAngleRendering, setMultiAngleRendering] = useState(false);
  const [multiAngleResult, setMultiAngleResult] = useState(null);
  const [showMultiAngle, setShowMultiAngle] = useState(false);
  const [multiAngleElapsed, setMultiAngleElapsed] = useState(0);

  // 4K DiT Upscale state
  const [upscaling, setUpscaling] = useState(false);
  const [showComparison, setShowComparison] = useState(false); // Default to full final image (no split)

  const handleUpscale4K = async () => {
    if (!renderResult) return;
    setUpscaling(true);
    try {
      const promptToUse = renderResult.nlp_data?.instruction || promptPreview?.instruction || designerBrief || "Commercial fashion lookbook shoot with high garment fidelity";
      const res = await fetch('/api/upscale/generate-4k', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || '4K Super-Resolution Upscale failed');
      }
      setRenderResult(prev => ({
        ...prev,
        image_url: data.image_url,
        local_image_path: data.local_image_path,
        is_4k: true
      }));
    } catch (err) {
      alert("4K Upscale failed: " + err.message);
    } finally {
      setUpscaling(false);
    }
  };

  // Fetch colorway presets on mount
  useEffect(() => {
    fetch('/api/colorway/presets')
      .then(res => res.ok ? res.json() : {})
      .then(data => setColorwayPresets(data))
      .catch(() => {});
  }, []);

  // Initial prompt compilation
  useEffect(() => {
    fetchPromptPreview();
  }, [designerBrief, scope, photoType, lighting, background, fitStyle, pose, customModelDirection, selectedModelId]);

  // On mount, auto-load latest render if available so canvas shows previous render
  useEffect(() => {
    fetch('/assets/outputs/shoot_camel_cashmere_coat.png', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setRenderResult((prev) => prev || { local_image_path: 'assets/outputs/shoot_camel_cashmere_coat.png', timestamp: Date.now() });
        }
      })
      .catch(() => {});
  }, []);

  const fetchPromptPreview = async () => {
    try {
      const activeArchetype = models[selectedModelId]?.archetype || 'Haute Couture Model';
      const combined = `${framing}. ${designerBrief} ${customModelDirection ? 'Model Styling: ' + customModelDirection : ''}`;
      const res = await fetch('/api/tryon/prompt-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: combined,
          scope,
          photo_type: photoType,
          model_archetype: activeArchetype,
          lighting,
          background,
          fit_style: fitStyle,
          pose
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPromptPreview(data.instruction);
        setNlpEngine(data.nlp_engine);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGarmentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGarmentFile(file);
      setGarmentName(file.name);
      setGarmentPreview(URL.createObjectURL(file));
      const lower = file.name.toLowerCase();
      if (lower.includes('coat') || lower.includes('jacket') || lower.includes('trench') || lower.includes('blazer') || lower.includes('parka') || lower.includes('bomber')) {
        setScope('outerwear');
      } else if (lower.includes('dress') || lower.includes('gown') || lower.includes('jumpsuit') || lower.includes('romper') || lower.includes('slip')) {
        setScope('one-piece');
      } else if (lower.includes('trouser') || lower.includes('pant') || lower.includes('jean') || lower.includes('skirt') || lower.includes('short')) {
        setScope('bottom');
      } else if (lower.includes('shirt') || lower.includes('top') || lower.includes('t-shirt') || lower.includes('hoodie') || lower.includes('sweater') || lower.includes('blouse') || lower.includes('tee')) {
        setScope('top');
      }
    }
  };

  const handleLayerUpload = (role, file) => {
    if (!file) return;
    setLayerFiles(prev => ({ ...prev, [role]: file }));
    setLayerPreviews(prev => ({ ...prev, [role]: URL.createObjectURL(file) }));
  };

  const handleClearLayer = (role) => {
    setLayerFiles(prev => ({ ...prev, [role]: null }));
    setLayerPreviews(prev => ({ ...prev, [role]: null }));
  };

  const handleSearchLookbook = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/lookbook/search?q=${encodeURIComponent(searchQuery)}&limit=4`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const selectLookbookItem = (item) => {
    setGarmentName(item.garment || 'lookbook_item.png');
    setGarmentPreview(item.image_url || '/assets/outputs/sample.png');
    if (item.scope) setScope(item.scope);
  };

  const handleExecuteTryon = async () => {
    if (activeGarmentTab === 'layering') {
      const hasAny = Object.values(layerFiles).some(f => f !== null);
      if (!hasAny) {
        setErrorMsg('Please upload at least one garment piece into the wardrobe layering slots.');
        return;
      }
    } else if (!garmentFile && !garmentPreview) {
      setErrorMsg('Please upload a garment image or select one from the lookbook.');
      return;
    }

    setRendering(true);
    setErrorMsg(null);
    setRenderResult(null);
    setTryonElapsed(0);

    const timer = setInterval(() => {
      setTryonElapsed((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    const formData = new FormData();
    const activeArchetype = models[selectedModelId]?.archetype || 'Haute Couture Model';
    const combined = `${framing}. ${designerBrief} ${customModelDirection ? 'Model Styling: ' + customModelDirection : ''}`;

    if (activeGarmentTab === 'layering') {
      if (layerFiles.top) formData.append('top_garment', layerFiles.top);
      if (layerFiles.outerwear) formData.append('outer_garment', layerFiles.outerwear);
      if (layerFiles.bottom) formData.append('bottom_garment', layerFiles.bottom);
      if (layerFiles.footwear) formData.append('shoes_garment', layerFiles.footwear);

      if (useCustomModel && customModelFile) {
        formData.append('model_file', customModelFile);
      } else {
        formData.append('model_id', selectedModelId);
      }
      formData.append('model_archetype', activeArchetype);
      formData.append('lighting', lighting);
      formData.append('background', background);
      formData.append('fit_style', fitStyle);
      formData.append('pose', pose);
      formData.append('brief', combined);
    } else {
      if (garmentFile) {
        formData.append('garment_file', garmentFile);
      } else {
        formData.append('garment_url', garmentPreview);
      }

      if (useCustomModel && customModelFile) {
        formData.append('model_file', customModelFile);
      } else {
        formData.append('model_id', selectedModelId);
      }

      formData.append('brief', combined);
      formData.append('scope', scope);
      formData.append('photo_type', photoType);
      formData.append('model_archetype', activeArchetype);
      formData.append('lighting', lighting);
      formData.append('background', background);
      formData.append('fit_style', fitStyle);
      formData.append('pose', pose);
    }

    const endpoint = activeGarmentTab === 'layering' ? '/api/tryon/layering' : '/api/tryon/generate';

    try {
      const res = await fetch(endpoint, {
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
        throw new Error(detailMsg || `Server error (${res.status}): Please ensure backend (server.py) and ComfyUI (:8189) are running.`);
      }
      setRenderResult({ ...data, timestamp: Date.now() });
    } catch (err) {
      setErrorMsg(err.message || 'Error executing Try-On pipeline');
    } finally {
      clearInterval(timer);
      setRendering(false);
    }
  };

  const handleExportLookbookPdf = async () => {
    setLookbookExporting(true);
    try {
      const res = await fetch('/api/export/lookbook-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: 10,
          brand_title: 'ETHEREAL',
          collection_title: 'AUTUMN / WINTER 2026 COMMERCIAL LOOKBOOK',
          curator_note: designerBrief || 'Curated luxury lookbook synthesized via Ethereal Haute Couture Studio.'
        })
      });
      const data = await res.json();
      if (res.ok) {
        setLookbookPdfResult(data);
        setShowLookbookPdf(true);
        window.open(data.pdf_url, '_blank');
      }
    } catch (err) {
      console.error('Lookbook PDF error:', err);
    } finally {
      setLookbookExporting(false);
    }
  };

  const handleGenerateAnimation = async () => {
    const imgPath = renderResult?.local_image_path || 'assets/latest_render.png';
    setAnimating(true);
    try {
      const res = await fetch('/api/tryon/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_path: imgPath,
          animation_type: animType,
          duration_sec: animDur
        })
      });
      const data = await res.json();
      setAnimResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnimating(false);
    }
  };

  // ── PACKSHOT EXPORT HANDLER ──
  const handlePackshotExport = async () => {
    const imgPath = renderResult?.local_image_path;
    if (!imgPath) return;
    setPackshotExporting(true);
    try {
      const res = await fetch('/api/tryon/packshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_path: imgPath })
      });
      const data = await res.json();
      if (res.ok) {
        setPackshotResult(data);
        setShowPackshot(true);
      }
    } catch (err) {
      console.error('Packshot export error:', err);
    } finally {
      setPackshotExporting(false);
    }
  };

  // ── COLORWAY RESYNTHESIS HANDLER ──
  const handleColorwayRender = async () => {
    if (!garmentFile) return;
    setColorwayRendering(true);
    const formData = new FormData();
    formData.append('garment_file', garmentFile);
    formData.append('colorway_key', selectedColorway);
    formData.append('scope', scope);
    formData.append('photo_type', photoType);
    formData.append('model_id', selectedModelId || '');
    formData.append('model_archetype', models[selectedModelId]?.archetype || 'Haute Couture Model');
    try {
      const res = await fetch('/api/tryon/colorway', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setColorwayResult({ ...data, timestamp: Date.now() });
        setShowColorway(true);
      }
    } catch (err) {
      console.error('Colorway render error:', err);
    } finally {
      setColorwayRendering(false);
    }
  };

  // ── MULTI-ANGLE TURNAROUND HANDLER ──
  const handleMultiAngle = async () => {
    if (!garmentFile) return;
    setMultiAngleRendering(true);
    setMultiAngleElapsed(0);
    const timer = setInterval(() => {
      setMultiAngleElapsed(prev => +(prev + 0.1).toFixed(1));
    }, 100);

    const formData = new FormData();
    formData.append('garment_file', garmentFile);
    formData.append('scope', scope);
    formData.append('photo_type', photoType);
    formData.append('lighting', lighting);
    formData.append('background', background);
    formData.append('model_id', selectedModelId || '');
    formData.append('model_archetype', models[selectedModelId]?.archetype || 'Haute Couture Model');
    formData.append('brief', designerBrief);
    try {
      const res = await fetch('/api/tryon/multi-angle', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMultiAngleResult(data);
        setShowMultiAngle(true);
      }
    } catch (err) {
      console.error('Multi-angle error:', err);
    } finally {
      clearInterval(timer);
      setMultiAngleRendering(false);
    }
  };

  const activeModel = models[selectedModelId];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* ATELIER HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hair)', paddingBottom: '1.2rem' }}>
        <div>
          <span className="heading-sub">ATELIER I · TEXTILE & DRAPE SYNTHESIS</span>
          <h1 className="heading-hero" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>Virtual Try-On Studio</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <span className="eth-badge eth-badge-active"><span className="status-dot status-dot-pulse"></span> QWEN-IMAGE-EDIT V2</span>
          <span className="eth-badge">4-STEP LIGHTNING INFERENCE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '2rem' }}>
        {/* LEFT COLUMN: CONTROLS & SELECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          
          {/* 1. GARMENT SELECTION */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="heading-sub">01 / Garment Acquisition</span>
              <div style={{ display: 'flex', gap: '0.3rem', background: '#080808', padding: '3px', borderRadius: '999px', border: '1px solid var(--border-hair)' }}>
                <button
                  onClick={() => setActiveGarmentTab('upload')}
                  style={{
                    background: activeGarmentTab === 'upload' ? '#ffffff' : 'transparent',
                    color: activeGarmentTab === 'upload' ? '#000000' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Upload Flat-Lay
                </button>
                <button
                  onClick={() => setActiveGarmentTab('layering')}
                  style={{
                    background: activeGarmentTab === 'layering' ? '#ffffff' : 'transparent',
                    color: activeGarmentTab === 'layering' ? '#000000' : '#4ade80',
                    border: activeGarmentTab === 'layering' ? 'none' : '1px solid rgba(74, 222, 128, 0.35)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Layers size={11} /> Wardrobe Layering
                </button>
                <button
                  onClick={() => setActiveGarmentTab('lookbook')}
                  style={{
                    background: activeGarmentTab === 'lookbook' ? '#ffffff' : 'transparent',
                    color: activeGarmentTab === 'lookbook' ? '#000000' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Search Lookbook
                </button>
              </div>
            </div>

            {activeGarmentTab === 'upload' && (
              <div>
                <label className="upload-zone" style={{ display: 'block' }}>
                  <input type="file" accept="image/*" onChange={handleGarmentUpload} style={{ display: 'none' }} />
                  <Upload size={22} color="var(--text-secondary)" style={{ margin: '0 auto 0.6rem auto' }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {garmentName ? garmentName : 'Select or drag garment photo'}
                  </p>
                  <p className="formula-tag">PNG, JPG, WEBP (Supports transparent cuts & studio flat-lays)</p>
                </label>
                {garmentPreview && (
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#090909', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-hair)' }}>
                    <img src={garmentPreview} alt="Garment" style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#000' }} />
                    <div>
                      <p style={{ fontSize: '0.82rem', fontWeight: '500' }}>{garmentName}</p>
                      <span className="formula-tag">READY FOR 4-STEP INJECTION</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeGarmentTab === 'layering' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', marginBottom: '0.8rem' }}>
                  {[
                    { key: 'top', label: '1. Base Top', hint: 'T-Shirt, Shirt, Knit, Camisole' },
                    { key: 'outerwear', label: '2. Outer Layer', hint: 'Blazer, Trench, Leather Coat' },
                    { key: 'bottom', label: '3. Lower Bottom', hint: 'Trousers, Skirt, Raw Denim' },
                    { key: 'footwear', label: '4. Footwear', hint: 'Boots, Loafers, Stilettos' }
                  ].map(slot => (
                    <div key={slot.key} style={{
                      background: '#090909',
                      border: layerPreviews[slot.key] ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid var(--border-hair)',
                      borderRadius: '4px',
                      padding: '0.7rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '120px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: '500', color: '#fff' }}>{slot.label}</span>
                          {layerPreviews[slot.key] && (
                            <button
                              onClick={() => handleClearLayer(slot.key)}
                              style={{ background: 'transparent', border: 'none', color: '#ff6666', fontSize: '0.68rem', cursor: 'pointer' }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <p className="formula-tag" style={{ fontSize: '0.62rem', margin: '0.15rem 0 0.4rem 0' }}>{slot.hint}</p>
                      </div>

                      {layerPreviews[slot.key] ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <img
                            src={layerPreviews[slot.key]}
                            alt={slot.label}
                            style={{ width: '42px', height: '42px', objectFit: 'contain', background: '#000', borderRadius: '3px' }}
                          />
                          <span className="formula-tag" style={{ color: '#4ade80', fontSize: '0.65rem' }}>✓ STAGED</span>
                        </div>
                      ) : (
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.3rem',
                          padding: '0.4rem',
                          border: '1px dashed var(--border-hair)',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                          color: 'var(--text-secondary)',
                          background: '#0c0c0c'
                        }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleLayerUpload(slot.key, e.target.files[0])}
                            style={{ display: 'none' }}
                          />
                          <Upload size={11} /> Stage {slot.key}
                        </label>
                      )}
                    </div>
                  ))}
                </div>
                <p className="formula-tag" style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  ⚡ All active layers are composited into a multi-garment wardrobe moodboard and synthesized with organic drapery overlaps.
                </p>
              </div>
            )}

            {activeGarmentTab === 'lookbook' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="eth-input"
                    placeholder="e.g. tailored linen blazer, emerald silk slip dress..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchLookbook()}
                  />
                  <button className="btn-secondary" onClick={handleSearchLookbook} disabled={searching}>
                    <Search size={14} /> Search
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                    {searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => selectLookbookItem(item)}
                        style={{
                          background: '#090909',
                          border: '1px solid var(--border-hair)',
                          borderRadius: '4px',
                          padding: '0.6rem',
                          cursor: 'pointer',
                          transition: 'border-color 0.2s'
                        }}
                      >
                        <p style={{ fontSize: '0.75rem', fontWeight: '500', color: '#fff' }}>{item.garment}</p>
                        <p className="formula-tag">{item.scope} · {item.lighting}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. MODEL SELECTION */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span className="heading-sub">02 / Model & Biometric Identity</span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[
                  { key: 'All', label: 'All' },
                  { key: 'Female', label: 'Female 💃' },
                  { key: 'Male', label: 'Male 🤵' }
                ].map(g => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => handleGenderFilterChange(g.key)}
                    style={{
                      background: genderFilter === g.key ? '#ffffff' : 'transparent',
                      color: genderFilter === g.key ? '#000000' : 'var(--text-muted)',
                      border: '1px solid ' + (genderFilter === g.key ? '#ffffff' : 'rgba(255,255,255,0.2)'),
                      borderRadius: '999px',
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.67rem',
                      fontWeight: genderFilter === g.key ? '600' : '400',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.2rem', marginTop: '0.8rem' }}>
              <div style={{ width: '80px', height: '100px', background: '#090909', border: '1px solid var(--border-hair)', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeModel?.local_file ? (
                  <img
                    src={`/${activeModel.local_file.replace(/\\/g, '/').replace(/^\/+/, '')}`}
                    alt={activeModel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      if (activeModel?.image_url && e.target.src !== activeModel.image_url) {
                        e.target.src = activeModel.image_url;
                      }
                    }}
                  />
                ) : activeModel?.image_url ? (
                  <img
                    src={activeModel.image_url}
                    alt={activeModel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>◆</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <label className="eth-label" style={{ marginBottom: 0 }}>Select Studio Model</label>
                  {activeModel?.gender && (
                    <span className="formula-tag">{activeModel.gender}</span>
                  )}
                </div>
                <select
                  className="eth-select"
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {filteredModelEntries.map(([k, v]) => (
                    <option key={k} value={k}>{v.name} ({v.gender})</option>
                  ))}
                </select>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.3' }}>
                  {activeModel?.archetype || 'Custom Fashion Model'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. TAILORING & LIGHTING DIRECTIVES */}
          <div className="eth-card">
            <span className="heading-sub">03 / Tailoring & Environment</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label className="eth-label">Garment Scope</label>
                <select className="eth-select" value={scope} onChange={(e) => setScope(e.target.value)}>
                  {(rea.garment_scopes || ['one-piece', 'top', 'bottom', 'outerwear', 'full-outfit']).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Garment Photo Type</label>
                <select className="eth-select" value={photoType} onChange={(e) => setPhotoType(e.target.value)}>
                  {(rea.garment_photo_types || ['flat-lay', 'model', 'ghost-mannequin']).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Fit Style</label>
                <select className="eth-select" value={fitStyle} onChange={(e) => setFitStyle(e.target.value)}>
                  {(rea.fit_styles || ['Tailored Catalog', 'Natural Everyday', 'Editorial High-Fashion']).map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Model Fashion Pose</label>
                <select className="eth-select" value={pose} onChange={(e) => setPose(e.target.value)}>
                  {(rea.model_poses || ['Front-Facing Minimalist Pose']).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Lighting Environment</label>
                <select className="eth-select" value={lighting} onChange={(e) => setLighting(e.target.value)}>
                  {(rea.lighting_toggles || ['Soft Diffused Commercial Studio']).map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Scene Background</label>
                <select className="eth-select" value={background} onChange={(e) => setBackground(e.target.value)}>
                  {(rea.background_toggles || ['Minimalist Concrete Studio']).map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1.2rem' }}>
              <label className="eth-label">Designer Creative Brief</label>
              <textarea
                className="eth-textarea"
                rows={2}
                value={designerBrief}
                onChange={(e) => setDesignerBrief(e.target.value)}
              />
            </div>

            {/* Prompt Inspector Toggle */}
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-hair)', paddingTop: '0.8rem' }}>
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <ChevronRight size={14} style={{ transform: showPrompt ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                {showPrompt ? 'Hide Compiled Prompt' : 'Inspect REA Compiled Prompt'}
              </button>
              {showPrompt && (
                <div style={{ marginTop: '0.8rem', background: '#000000', padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-hair)' }}>
                  <p className="formula-tag" style={{ color: '#fff', marginBottom: '0.4rem' }}>{nlpEngine || 'QWEN-NLP-CORE'}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {promptPreview}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DISPATCH ACTION */}
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1rem' }}
            disabled={
              rendering ||
              (activeGarmentTab === 'layering'
                ? !Object.values(layerFiles).some(Boolean)
                : (!garmentFile && !garmentPreview))
            }
            onClick={handleExecuteTryon}
          >
            {rendering ? (
              <>
                <RefreshCw size={16} className="status-dot-pulse" /> Dispatching 4-Step ComfyUI Engine... ({tryonElapsed}s)
              </>
            ) : (
              <>
                <Sparkles size={16} /> {activeGarmentTab === 'layering' ? 'Synthesize Coordinated Layered Outfit' : 'Generate Commercial Try-On'}
              </>
            )}
          </button>

          {errorMsg && (
            <div style={{ padding: '0.8rem', background: 'rgba(255, 0, 0, 0.08)', border: '1px solid rgba(255, 0, 0, 0.25)', borderRadius: '4px', color: '#ff8888', fontSize: '0.78rem' }}>
              {errorMsg}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: RENDER & OUTPUT CANVAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="eth-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="heading-sub">Studio Render Output</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {garmentPreview && (renderResult?.local_image_path || renderResult?.image_url) && (
                  <button
                    type="button"
                    onClick={() => setShowComparison(!showComparison)}
                    className="btn-secondary"
                    style={{
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.66rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: showComparison ? '#ffffff' : 'transparent',
                      color: showComparison ? '#000000' : 'var(--text-secondary)',
                      border: '1px solid var(--border-hair)',
                      borderRadius: '999px',
                      cursor: 'pointer'
                    }}
                    title="Toggle Before/After comparison slider"
                  >
                    <Eye size={11} /> {showComparison ? 'Split View: ON' : 'Split View: OFF'}
                  </button>
                )}
                {renderResult && (
                  <>
                    <span className="eth-badge">{renderResult.elapsed_sec}s RENDER</span>
                    <span className="eth-badge eth-badge-active">COMFYUI :8188</span>
                  </>
                )}
              </div>
            </div>

            {/* Canvas Display */}
            <div style={{
              flex: 1,
              minHeight: '440px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hair)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {rendering ? (
                <CoutureConveyorLoader
                  title="Virtual Try-On Runway Fitting"
                  subtitle="Dressing Model with Uploaded Garment on Conveyor Track"
                  elapsedSec={tryonElapsed}
                />
              ) : (renderResult?.local_image_path || renderResult?.image_url) ? (
                garmentPreview && showComparison ? (
                  <BeforeAfterSlider
                    beforeImage={garmentPreview}
                    afterImage={`${renderResult.local_image_path ? `/${renderResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : renderResult.image_url}?t=${renderResult.timestamp || 'latest'}`}
                    beforeLabel="FLAT-LAY PRODUCT"
                    afterLabel="ON-BODY COUTURE DRAPE"
                    height="480px"
                  />
                ) : (
                  <img
                    src={`${renderResult.local_image_path ? `/${renderResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : renderResult.image_url}?t=${renderResult.timestamp || 'latest'}`}
                    alt="Virtual Try-On Output"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      if (renderResult?.image_url && e.target.src !== renderResult.image_url) {
                        e.target.src = renderResult.image_url;
                      }
                    }}
                  />
                )
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <p className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Awaiting Garment & Directive</p>
                  <p className="formula-tag">SELECT GARMENT ON THE LEFT TO INITIATE RENDER</p>
                </div>
              )}
            </div>

            {/* Actions & Lookbook Animation Generator */}
            {renderResult && (
              <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <a
                    href={renderResult.local_image_path ? `/${renderResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : renderResult.image_url}
                    download
                    className="btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
                  >
                    <Download size={14} /> Download Ultra-Res (PNG)
                  </a>
                  <button
                    onClick={handleUpscale4K}
                    disabled={upscaling}
                    className="btn-primary"
                    style={{ flex: 1, background: renderResult.is_4k ? '#059669' : undefined }}
                  >
                    {upscaling ? (
                      <><RefreshCw size={14} className="status-dot-pulse" style={{ display: 'inline', marginRight: '6px' }} /> DiT 4K Upscaling...</>
                    ) : renderResult.is_4k ? (
                      <><CheckCircle2 size={14} style={{ display: 'inline', marginRight: '6px' }} /> 4K Super-Res Active (4096px)</>
                    ) : (
                      <><Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> Upscale to 4K (PiD DiT)</>
                    )}
                  </button>
                </div>

                {/* Video Lookbook Studio */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hair)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span className="heading-sub"><Video size={13} style={{ display: 'inline', marginRight: '4px' }} /> Lookbook Motion Animation</span>
                    <span className="formula-tag">24 FPS MP4</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr auto', gap: '0.8rem', alignItems: 'center' }}>
                    <select className="eth-select" value={animType} onChange={(e) => setAnimType(e.target.value)}>
                      <option value="slow_zoom">Haute-Couture Slow Zoom (Drape Focus)</option>
                      <option value="pan_tilt">Vertical Fashion Pan & Tilt (Full Look)</option>
                      <option value="parallax_breathe">Parallax Studio Breathe (Organic Sway)</option>
                      <option value="flash_glow">Editorial Flash Glow (Strobe Pulse)</option>
                    </select>

                    <select className="eth-select" value={animDur} onChange={(e) => setAnimDur(Number(e.target.value))}>
                      <option value={2}>2 Seconds</option>
                      <option value={3}>3 Seconds</option>
                      <option value={4}>4 Seconds</option>
                      <option value={5}>5 Seconds</option>
                    </select>

                    <button className="btn-secondary" onClick={handleGenerateAnimation} disabled={animating}>
                      {animating ? <RefreshCw size={13} className="status-dot-pulse" /> : <Play size={13} />} Generate
                    </button>
                  </div>

                  {animResult && (
                    <div style={{ marginTop: '1rem' }}>
                      <video
                        src={`/${animResult.video_path.replace(/\\/g, '/')}`}
                        controls
                        autoPlay
                        loop
                        style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border-hair)' }}
                      />
                    </div>
                  )}
                </div>

                {/* ═══ PACKSHOT E-COMMERCE EXPORT ═══ */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hair)', borderRadius: '8px', padding: '1rem' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setShowPackshot(!showPackshot)}
                  >
                    <span className="heading-sub"><Package size={13} style={{ display: 'inline', marginRight: '4px' }} /> Packshot E-Commerce Export</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="formula-tag">1:1 · 9:16 · 3:4 · 4:5</span>
                      {showPackshot ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {showPackshot && (
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.5' }}>
                        Generate studio-standard clean white cyclorama exports optimized for Shopify, Instagram, Farfetch, and Amazon catalogs.
                      </p>
                      <button
                        className="btn-secondary"
                        onClick={handlePackshotExport}
                        disabled={packshotExporting || !renderResult?.local_image_path}
                        style={{ width: '100%', marginBottom: '0.8rem' }}
                      >
                        {packshotExporting ? <><RefreshCw size={13} className="status-dot-pulse" /> Exporting Multi-Ratio...</> : <><Grid3X3 size={13} /> Generate All Packshot Variants</>}
                      </button>

                      {packshotResult?.variants && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                          {Object.entries(packshotResult.variants).map(([ratio, v]) => (
                            <div key={ratio} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hair)', borderRadius: '6px', overflow: 'hidden' }}>
                              <img
                                src={`${v.url}?t=${Date.now()}`}
                                alt={v.title}
                                style={{ width: '100%', height: '120px', objectFit: 'contain', background: '#ffffff' }}
                              />
                              <div style={{ padding: '0.5rem' }}>
                                <p style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-primary)' }}>{ratio}</p>
                                <p className="formula-tag" style={{ marginTop: '2px' }}>{v.dimensions} · {v.title.split('(')[0].trim()}</p>
                                <a href={v.url} download className="formula-tag" style={{ color: 'var(--color-obsidian)', textDecoration: 'underline', marginTop: '4px', display: 'inline-block' }}>
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ═══ COLORWAY & FABRIC SWATCH ═══ */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hair)', borderRadius: '8px', padding: '1rem' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setShowColorway(!showColorway)}
                  >
                    <span className="heading-sub"><Palette size={13} style={{ display: 'inline', marginRight: '4px' }} /> Colorway & Fabric Swatch</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="formula-tag">LUXURY MATERIAL RESYNTHESIS</span>
                      {showColorway ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {showColorway && (
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.5' }}>
                        Re-render the garment in a curated luxury colorway with authentic fabric texture, realistic sheen, and immaculate tailoring.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                        {Object.entries(colorwayPresets).map(([key, preset]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedColorway(key)}
                            style={{
                              background: selectedColorway === key ? 'var(--color-obsidian)' : 'var(--bg-elevated)',
                              color: selectedColorway === key ? '#ffffff' : 'var(--text-primary)',
                              border: `1px solid ${selectedColorway === key ? 'var(--color-obsidian)' : 'var(--border-hair)'}`,
                              borderRadius: '6px',
                              padding: '0.6rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s var(--ease-couture)',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                              <span style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                background: preset.hex,
                                border: '1px solid rgba(0,0,0,0.15)',
                                display: 'inline-block',
                                flexShrink: 0
                              }} />
                              <span style={{ fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                {preset.name}
                              </span>
                            </div>
                            <p className="formula-tag" style={{ margin: 0, lineHeight: '1.3' }}>{preset.fabric}</p>
                          </button>
                        ))}
                      </div>

                      <button
                        className="btn-primary"
                        onClick={handleColorwayRender}
                        disabled={colorwayRendering || !garmentFile}
                        style={{ width: '100%' }}
                      >
                        {colorwayRendering ? <><RefreshCw size={13} className="status-dot-pulse" /> Resynthesizing {colorwayPresets[selectedColorway]?.name || selectedColorway}...</> : <><Palette size={13} /> Render {colorwayPresets[selectedColorway]?.name || selectedColorway} Colorway</>}
                      </button>

                      {colorwayResult && (
                        <div style={{ marginTop: '1rem', border: '1px solid var(--border-hair)', borderRadius: '6px', overflow: 'hidden' }}>
                          <img
                            src={`${colorwayResult.local_image_path ? `/${colorwayResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : colorwayResult.image_url}?t=${colorwayResult.timestamp || 'latest'}`}
                            alt={`Colorway: ${selectedColorway}`}
                            style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', background: '#fafafa' }}
                          />
                          <div style={{ padding: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="formula-tag">{colorwayPresets[selectedColorway]?.name} · {colorwayPresets[selectedColorway]?.fabric}</span>
                            {colorwayResult?.elapsed_sec && <span className="eth-badge">{colorwayResult.elapsed_sec}s</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ═══ MULTI-ANGLE 360° TURNAROUND ═══ */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hair)', borderRadius: '8px', padding: '1rem' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setShowMultiAngle(!showMultiAngle)}
                  >
                    <span className="heading-sub"><RotateCw size={13} style={{ display: 'inline', marginRight: '4px' }} /> Multi-Angle 360° Turnaround</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="formula-tag">3-VIEW LOOKBOOK</span>
                      {showMultiAngle ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {showMultiAngle && (
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.5' }}>
                        Generate Front, ¾ Dynamic Stride, and Back views for comprehensive commercial cataloging.
                      </p>

                      <button
                        className="btn-primary"
                        onClick={handleMultiAngle}
                        disabled={multiAngleRendering || !garmentFile}
                        style={{ width: '100%', marginBottom: '0.8rem' }}
                      >
                        {multiAngleRendering
                          ? <><RefreshCw size={13} className="status-dot-pulse" /> Rendering 3 Angles... ({multiAngleElapsed}s)</>
                          : <><RotateCw size={13} /> Generate 3-View Turnaround</>
                        }
                      </button>

                      {multiAngleResult?.angles && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                          {multiAngleResult.angles.map((ang) => (
                            <div key={ang.angle} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hair)', borderRadius: '6px', overflow: 'hidden' }}>
                              <img
                                src={`${ang.local_image_path ? `/${ang.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : ang.image_url}?t=${Date.now()}`}
                                alt={ang.title}
                                style={{ width: '100%', height: '200px', objectFit: 'contain', background: '#fafafa' }}
                              />
                              <div style={{ padding: '0.5rem' }}>
                                <p style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ang.title}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                                  <span className="formula-tag">{ang.pose.split('(')[0].trim()}</span>
                                  <span className="formula-tag">{ang.elapsed_sec}s</span>
                                </div>
                                <a
                                  href={ang.local_image_path ? `/${ang.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : ang.image_url}
                                  download
                                  className="formula-tag"
                                  style={{ color: 'var(--color-obsidian)', textDecoration: 'underline', marginTop: '4px', display: 'inline-block' }}
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ═══ EDITORIAL LOOKBOOK PDF COMPILER ═══ */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-hair)', borderRadius: '8px', padding: '1rem' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setShowLookbookPdf(!showLookbookPdf)}
                  >
                    <span className="heading-sub"><BookOpen size={13} style={{ display: 'inline', marginRight: '4px' }} /> Editorial Lookbook PDF Compiler</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="formula-tag">300 DPI LUXURY PRESENTATION</span>
                      {showLookbookPdf ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {showLookbookPdf && (
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.5' }}>
                        Compiles high-res multi-page print-ready lookbook PDF with editorial covers, shoot spreads, and DuckDB telemetry barcodes.
                      </p>

                      <button
                        className="btn-primary"
                        onClick={handleExportLookbookPdf}
                        disabled={lookbookExporting}
                        style={{ width: '100%', marginBottom: '0.8rem' }}
                      >
                        {lookbookExporting ? <><RefreshCw size={13} className="status-dot-pulse" /> Compiling High-Res PDF...</> : <><FileText size={13} /> Compile & Open Lookbook PDF</>}
                      </button>

                      {lookbookPdfResult && (
                        <div style={{ padding: '0.7rem', background: 'var(--bg-elevated)', borderRadius: '6px', border: '1px solid var(--border-hair)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#fff' }}>{lookbookPdfResult.pdf_filename}</p>
                            <span className="formula-tag">{lookbookPdfResult.total_looks} CURATED LOOKS INCLUDED</span>
                          </div>
                          <a
                            href={lookbookPdfResult.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="btn-secondary"
                            style={{ textDecoration: 'none', padding: '0.35rem 0.7rem', fontSize: '0.7rem' }}
                          >
                            <Download size={11} /> Download PDF
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
