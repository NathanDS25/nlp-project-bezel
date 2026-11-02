import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Check, Upload, RefreshCw, Zap, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';

export default function AtelierAgency({ models, onRefreshModels, activeModelId, onSelectActiveModel }) {
  const [subTab, setSubTab] = useState('gallery'); // 'gallery' | 'generate' | 'register' | 'edit'

  // --- AI MODEL GENERATOR STATE ---
  const [genPrompt, setGenPrompt] = useState(
    'Full-body wide angle fashion photograph of a handsome male model standing with confident posture, head-to-toe view with shoes and feet completely visible on the concrete studio floor. Wearing a sharp black leather biker jacket over a crisp white crewneck t-shirt, paired with tailored dark charcoal pleated trousers, and polished black leather Chelsea boots. Natural cinematic studio lighting, soft shadows, sharp focus, 8k luxury editorial lookbook, complete outfit framing.'
  );
  const [genNegative, setGenNegative] = useState(
    'close-up, headshot, cropped, out of frame, cut off feet, cut off legs, blurry, distorted anatomy, bad hands, low resolution'
  );
  const [genFraming, setGenFraming] = useState('full_body'); // 'full_body' | 'portrait' | 'square'
  const [genName, setGenName] = useState('Julian Vance');
  const [genGender, setGenGender] = useState('Male');
  const [genArchetype, setGenArchetype] = useState('20s European Male, sharp jawline, short fade, athletic build, high-fashion streetwear');
  const [genDesc, setGenDesc] = useState('Generated via Qwen-2512 2-Step Turbo studio casting.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genElapsed, setGenElapsed] = useState(0);
  const [genResult, setGenResult] = useState(null);
  const [genError, setGenError] = useState(null);
  const [addedToRoster, setAddedToRoster] = useState(false);
  const [addingToRoster, setAddingToRoster] = useState(false);

  // Quick 1-click starter templates
  const STARTER_TEMPLATES = [
    {
      label: '🤵 Streetwear (Male Full-Body)',
      name: 'Julian Vance',
      gender: 'Male',
      archetype: '20s European Male, sharp jawline, short fade, athletic build, high-fashion streetwear',
      prompt: 'Full-body wide angle fashion photograph of a handsome male model standing with confident posture, head-to-toe view with shoes and feet completely visible on the concrete studio floor. Wearing a sharp black leather biker jacket over a crisp white crewneck t-shirt, paired with tailored dark charcoal pleated trousers, and polished black leather Chelsea boots. Natural cinematic studio lighting, soft shadows, sharp focus, 8k luxury editorial lookbook, complete outfit framing.'
    },
    {
      label: '💃 Trench Lookbook (Female Full-Body)',
      name: 'Saffron Laurent',
      gender: 'Female',
      archetype: '20s South Asian Female, dark wavy hair, athletic slender frame, high-fashion editorial runway',
      prompt: 'Full-body head-to-toe high-fashion editorial photograph of an elegant female model standing poised facing camera, shoes and feet fully visible on the polished concrete floor. Wearing a tailored camel wool trench coat layered over a cream cashmere turtleneck and relaxed wide-leg trousers, with sleek pointed leather ankle boots. Soft diffused daylight studio lighting, subtle floor reflections, 8k commercial lookbook.'
    },
    {
      label: '✨ Silk Evening Gown (Female Full-Body)',
      name: 'Aria Thorne',
      gender: 'Female',
      archetype: '20s East Asian Female, statuesque poise, porcelain skin, high-glam couture',
      prompt: 'Full-body fashion photograph of a statuesque female model in an emerald silk evening gown, complete head-to-toe shot with strappy stiletto heels resting on marble floor. Dramatic side rim lighting, architectural studio environment, immaculate fabric drape, 8k luxury vogue aesthetic.'
    },
    {
      label: '🧥 Minimalist Tailored (Male Full-Body)',
      name: 'Kaelen Cross',
      gender: 'Male',
      archetype: '20s East Asian Male, lean minimalist aesthetic, sculpted cheekbones',
      prompt: 'Full-body studio catalog photograph of a lean male model standing in relaxed posture, wearing an oversized beige linen blazer, white ribbed tank top, off-white pleated trousers, and minimalist leather sneakers visible on floor. Neutral cyclorama background, clean softbox studio lighting, 8k editorial.'
    }
  ];

  // Register state
  const [regName, setRegName] = useState('');
  const [regGender, setRegGender] = useState('Female');
  const [regArchetype, setRegArchetype] = useState('Sculpted cheekbones, radiant dewy glass skin, elegant high-fashion posture');
  const [regDesc, setRegDesc] = useState('Signed to Paris & Milan editorial division.');
  const [regImage, setRegImage] = useState(null);
  const [regImagePreview, setRegImagePreview] = useState(null);
  const [regBiometricLock, setRegBiometricLock] = useState(true);
  const [regLockStrength, setRegLockStrength] = useState(0.90);
  const [registering, setRegistering] = useState(false);

  // Edit state
  const [editId, setEditId] = useState(Object.keys(models)[0] || '');
  const [editName, setEditName] = useState(models[editId]?.name || '');
  const [editGender, setEditGender] = useState(models[editId]?.gender || 'Female');
  const [editArchetype, setEditArchetype] = useState(models[editId]?.archetype || '');
  const [editDesc, setEditDesc] = useState(models[editId]?.description || '');
  const [editImage, setEditImage] = useState(null);
  const [editBiometricLock, setEditBiometricLock] = useState(true);
  const [editLockStrength, setEditLockStrength] = useState(0.90);
  const [savingEdit, setSavingEdit] = useState(false);
  const [galleryGender, setGalleryGender] = useState('All'); // 'All' | 'Female' | 'Male'

  const handleSelectEditTarget = (id) => {
    setEditId(id);
    const m = models[id];
    if (m) {
      setEditName(m.name || '');
      setEditGender(m.gender || 'Female');
      setEditArchetype(m.archetype || '');
      setEditDesc(m.description || '');
      setEditBiometricLock(m.biometric_lock !== false);
      setEditLockStrength(m.lock_strength || 0.90);
    }
  };

  React.useEffect(() => {
    if ((!editId || !models[editId]) && Object.keys(models).length > 0) {
      handleSelectEditTarget(Object.keys(models)[0]);
    }
  }, [models]);

  const handleApplyTemplate = (tpl) => {
    setGenPrompt(tpl.prompt);
    setGenName(tpl.name);
    setGenGender(tpl.gender);
    setGenArchetype(tpl.archetype);
    setGenResult(null);
    setAddedToRoster(false);
  };

  const handleGenerateModel = async () => {
    if (!genPrompt.trim()) return;
    setIsGenerating(true);
    setGenError(null);
    setGenResult(null);
    setAddedToRoster(false);
    setGenElapsed(0);

    const timer = setInterval(() => {
      setGenElapsed((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    try {
      const res = await fetch('/api/models/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: genPrompt,
          negative_prompt: genNegative,
          framing: genFraming,
          name: genName,
          gender: genGender,
          archetype: genArchetype,
          description: genDesc,
          auto_register: false
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(errData.detail || 'Generation failed');
      }

      const data = await res.json();
      setGenResult(data);
    } catch (err) {
      setGenError(err.message);
    } finally {
      clearInterval(timer);
      setIsGenerating(false);
    }
  };

  const handleAddGeneratedToRoster = async () => {
    if (!genResult || !genResult.local_image_path) return;
    setAddingToRoster(true);

    const modelId = `model_${Date.now()}`;
    const formData = new FormData();
    formData.append('model_id', modelId);
    formData.append('name', genName.trim() || 'Custom AI Model');
    formData.append('gender', genGender);
    formData.append('archetype', genArchetype || genPrompt.slice(0, 120));
    formData.append('description', genDesc || 'Generated via Qwen-2512 2-Step Turbo');
    formData.append('local_file', genResult.local_image_path);

    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await onRefreshModels();
        setAddedToRoster(true);
        if (onSelectActiveModel) {
          onSelectActiveModel(modelId);
        }
      } else {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to add model to roster');
      }
    } catch (err) {
      alert(`Could not add to roster: ${err.message}`);
    } finally {
      setAddingToRoster(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName.trim()) return;
    setRegistering(true);

    const modelId = `model_${Date.now()}`;
    const formData = new FormData();
    formData.append('model_id', modelId);
    formData.append('name', regName);
    formData.append('gender', regGender);
    formData.append('archetype', regArchetype);
    formData.append('description', regDesc);
    formData.append('biometric_lock', regBiometricLock);
    formData.append('lock_strength', regLockStrength);
    if (regImage) formData.append('image', regImage);

    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await onRefreshModels();
        setSubTab('gallery');
        setRegName('');
        setRegImage(null);
        setRegImagePreview(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegistering(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);

    const formData = new FormData();
    formData.append('model_id', editId);
    formData.append('name', editName);
    formData.append('gender', editGender);
    formData.append('archetype', editArchetype);
    formData.append('description', editDesc);
    formData.append('biometric_lock', editBiometricLock);
    formData.append('lock_strength', editLockStrength);
    if (editImage) formData.append('image', editImage);

    try {
      const res = await fetch('/api/models', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await onRefreshModels();
        alert('Model updated successfully.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteModel = async (id) => {
    if (!window.confirm(`Are you sure you want to delete ${models[id]?.name || id}?`)) return;
    try {
      const res = await fetch(`/api/models/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onRefreshModels();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hair)', paddingBottom: '1.2rem' }}>
        <div>
          <span className="heading-sub">ATELIER IV · CASTING & BIOMETRIC ARCHETYPES</span>
          <h1 className="heading-hero" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>Model Agency & Studio Roster</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', background: '#080808', padding: '3px', borderRadius: '999px', border: '1px solid var(--border-hair)' }}>
          <button
            onClick={() => setSubTab('gallery')}
            style={{
              background: subTab === 'gallery' ? '#ffffff' : 'transparent',
              color: subTab === 'gallery' ? '#000000' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Roster Gallery
          </button>
          <button
            onClick={() => setSubTab('generate')}
            style={{
              background: subTab === 'generate' ? '#ffffff' : 'transparent',
              color: subTab === 'generate' ? '#000000' : '#4ade80',
              border: subTab === 'generate' ? 'none' : '1px solid rgba(74, 222, 128, 0.35)',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Zap size={12} fill={subTab === 'generate' ? '#000000' : '#4ade80'} /> ⚡ AI Model Generator
          </button>
          <button
            onClick={() => setSubTab('register')}
            style={{
              background: subTab === 'register' ? '#ffffff' : 'transparent',
              color: subTab === 'register' ? '#000000' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Register Custom
          </button>
          <button
            onClick={() => setSubTab('edit')}
            style={{
              background: subTab === 'edit' ? '#ffffff' : 'transparent',
              color: subTab === 'edit' ? '#000000' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Edit & Delete
          </button>
        </div>
      </div>

      {/* SUB-VIEWS */}
      {/* 1. ROSTER GALLERY */}
      {subTab === 'gallery' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Gender Filter Chips */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="formula-tag">ROSTER ROSTER: {Object.keys(models).length} SIGNED MODELS</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { key: 'All', label: 'All Models' },
                { key: 'Female', label: 'Female 💃' },
                { key: 'Male', label: 'Male 🤵' }
              ].map(g => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setGalleryGender(g.key)}
                  style={{
                    background: galleryGender === g.key ? '#ffffff' : 'transparent',
                    color: galleryGender === g.key ? '#000000' : 'var(--text-muted)',
                    border: '1px solid ' + (galleryGender === g.key ? '#ffffff' : 'rgba(255,255,255,0.2)'),
                    borderRadius: '999px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.7rem',
                    fontWeight: galleryGender === g.key ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {Object.entries(models)
              .filter(([_, m]) => {
                if (galleryGender === 'All') return true;
                return m.gender?.toLowerCase() === galleryGender.toLowerCase();
              })
              .map(([k, m]) => {
                const isActive = activeModelId === k;
                const imgPath = m.local_file ? `/${m.local_file.replace(/\\/g, '/').replace(/^\/+/, '')}` : m.image_url;
                return (
                  <div
                    key={k}
                    className="eth-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderColor: isActive ? '#ffffff' : 'var(--border-hair)',
                      background: isActive ? '#0e0e0e' : 'var(--bg-surface)'
                    }}
                  >
                    <div style={{
                      height: '320px',
                      background: '#050505',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                      position: 'relative'
                    }}>
                      {imgPath ? (
                        <img
                          src={imgPath}
                          alt={m.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            if (m.image_url && e.target.src !== m.image_url) {
                              e.target.src = m.image_url;
                            }
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>◆</div>
                      )}
                      {isActive && (
                        <span className="eth-badge eth-badge-active" style={{ position: 'absolute', top: '10px', left: '10px', backdropFilter: 'blur(8px)' }}>
                          <Check size={11} /> ACTIVE CASTING
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '400', fontFamily: 'var(--font-display)', color: '#fff' }}>{m.name}</h3>
                      <span className="formula-tag">{m.gender}</span>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.6rem', flex: 1 }}>
                      {m.archetype}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
                      <span className="formula-tag" style={{ color: '#30D158', borderColor: 'rgba(48, 209, 88, 0.35)', fontSize: '0.65rem' }}>
                        🔒 BIOMETRIC LOCKED {m.lock_strength ? `${Math.round(m.lock_strength * 100)}%` : '90%'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button
                        className="btn-secondary"
                        style={{ flex: 1, padding: '0.5rem', borderColor: isActive ? '#ffffff' : 'var(--border-hair)' }}
                        onClick={() => onSelectActiveModel && onSelectActiveModel(k)}
                      >
                        {isActive ? 'Selected Model' : 'Select for Studio'}
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => { handleSelectEditTarget(k); setSubTab('edit'); }}
                        title="Edit Model"
                      >
                        <Edit2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 2. ⚡ AI MODEL GENERATOR STUDIO */}
      {subTab === 'generate' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '2rem' }}>
          {/* LEFT: GENERATION DIRECTIVES & CONTROLS */}
          <div className="eth-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="heading-sub">QWEN-2512 2-STEP TURBO LoRA CASTING</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginTop: '0.2rem' }}>
                  Generate Virtual Fashion Model
                </h2>
              </div>
              <span className="eth-badge" style={{ borderColor: 'rgba(74, 222, 128, 0.4)', color: '#4ade80' }}>
                ⚡ 2-STEP LIGHTNING
              </span>
            </div>

            {/* Starter Presets */}
            <div>
              <label className="eth-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                1-Click Full-Body Lookbook Templates
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {STARTER_TEMPLATES.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    style={{
                      background: genPrompt === tpl.prompt ? '#ffffff' : 'rgba(255,255,255,0.04)',
                      color: genPrompt === tpl.prompt ? '#000000' : 'var(--text-secondary)',
                      border: '1px solid ' + (genPrompt === tpl.prompt ? '#ffffff' : 'var(--border-hair)'),
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Directive */}
            <div>
              <label className="eth-label">Full-Body Fashion Prompt Directive</label>
              <textarea
                className="eth-textarea"
                rows={5}
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                placeholder="Describe model features, posture, outfit, studio lighting, head-to-toe shoes..."
              />
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'block' }}>
                💡 Tip: Keep keywords like "head-to-toe view, shoes and feet completely visible on floor" for ideal lookbook framing.
              </span>
            </div>

            {/* Negative Prompt */}
            <div>
              <label className="eth-label">Negative Prompt (Anatomy & Cropping Safeguards)</label>
              <input
                type="text"
                className="eth-input"
                value={genNegative}
                onChange={(e) => setGenNegative(e.target.value)}
                placeholder="close-up, cropped, cut off feet..."
              />
            </div>

            {/* Framing & Aspect Ratio Selector */}
            <div>
              <label className="eth-label">Framing & Aspect Ratio</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { key: 'full_body', label: 'Full Body (768×1360)', desc: 'Head-to-Toe Lookbook' },
                  { key: 'portrait', label: 'Editorial (768×1024)', desc: 'Three-Quarter Stance' },
                  { key: 'square', label: 'Square (1024×1024)', desc: 'Campaign Feed' }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setGenFraming(f.key)}
                    style={{
                      background: genFraming === f.key ? '#181818' : 'transparent',
                      border: '1px solid ' + (genFraming === f.key ? '#ffffff' : 'var(--border-hair)'),
                      borderRadius: '6px',
                      padding: '0.6rem 0.5rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: '500', color: genFraming === f.key ? '#fff' : 'var(--text-secondary)' }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {f.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Model Identity Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.8rem' }}>
              <div>
                <label className="eth-label">Model Name</label>
                <input
                  type="text"
                  className="eth-input"
                  value={genName}
                  onChange={(e) => setGenName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                />
              </div>
              <div>
                <label className="eth-label">Gender</label>
                <select className="eth-select" value={genGender} onChange={(e) => setGenGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
            </div>

            <div>
              <label className="eth-label">Biometric Archetype Note</label>
              <input
                type="text"
                className="eth-input"
                value={genArchetype}
                onChange={(e) => setGenArchetype(e.target.value)}
                placeholder="e.g. 20s European Male, sharp jawline, short fade"
              />
            </div>

            {/* Error Message */}
            {genError && (
              <div style={{ padding: '0.75rem', borderRadius: '6px', background: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.3)', color: '#ff8888', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={14} /> {genError}
              </div>
            )}

            {/* Generate Button */}
            <button
              type="button"
              className="btn-primary"
              disabled={isGenerating || !genPrompt.trim()}
              onClick={handleGenerateModel}
              style={{
                marginTop: '0.5rem',
                padding: '0.85rem',
                background: isGenerating ? '#1a1a1a' : '#ffffff',
                color: isGenerating ? 'var(--text-muted)' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={15} className="status-dot-pulse" />
                  Generating via 2-Step Turbo LoRA ({genElapsed}s)...
                </>
              ) : (
                <>
                  <Zap size={15} fill="#000" />
                  ⚡ Generate Model with 2-Step Turbo LoRA
                </>
              )}
            </button>
          </div>

          {/* RIGHT: LIVE STUDIO PREVIEW & REGISTRATION */}
          <div className="eth-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '560px' }}>
            <span className="heading-sub">STUDIO CASTING MONITOR</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff' }}>
                {genResult ? genName || 'Generated Model' : 'Preview Monitor'}
              </h3>
              {genResult && (
                <span className="eth-badge" style={{ borderColor: 'rgba(74, 222, 128, 0.3)', color: '#4ade80' }}>
                  ⚡ {genResult.elapsed_sec}s
                </span>
              )}
            </div>

            {/* Image Preview Box */}
            <div
              style={{
                flex: 1,
                minHeight: '420px',
                background: 'var(--bg-surface)',
                borderRadius: '8px',
                border: '1px solid var(--border-hair)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isGenerating ? (
                <CoutureConveyorLoader
                  title="Fabricating Bespoke Model"
                  subtitle="Qwen-2512 2-Step Turbo Fashion Synthesis"
                  elapsedSec={genElapsed}
                />
              ) : genResult && (genResult.image_url || genResult.raw_image_url) ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img
                    src={genResult.image_url || genResult.raw_image_url}
                    alt="Generated Model"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      if (genResult.raw_image_url && e.target.src !== genResult.raw_image_url) {
                        e.target.src = genResult.raw_image_url;
                      }
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.62rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.75)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', backdropFilter: 'blur(4px)' }}>
                      ● STORED IN DUCKDB & ASSETS
                    </span>
                    <span style={{ fontSize: '0.62rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                      {genFraming === 'full_body' ? '768×1360' : genFraming === 'portrait' ? '768×1024' : '1024×1024'}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  <Sparkles size={32} style={{ margin: '0 auto 0.8rem auto', opacity: 0.3 }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Ready for Generation
                  </p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem', maxWidth: '280px', margin: '0.3rem auto 0 auto' }}>
                    Select a lookbook template or customize prompt directives, then click Generate to create a bespoke AI model.
                  </p>
                </div>
              )}
            </div>

            {/* Result Action Buttons */}
            {genResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={addingToRoster || addedToRoster}
                    onClick={handleAddGeneratedToRoster}
                    style={{
                      flex: 1,
                      padding: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      background: addedToRoster ? '#112211' : '#ffffff',
                      color: addedToRoster ? '#4ade80' : '#000000',
                      border: addedToRoster ? '1px solid #4ade80' : 'none'
                    }}
                  >
                    {addedToRoster ? (
                      <>
                        <CheckCircle2 size={14} color="#4ade80" /> Added to Agency Roster!
                      </>
                    ) : addingToRoster ? (
                      <>
                        <RefreshCw size={14} className="status-dot-pulse" /> Registering...
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Add to Agency Roster
                      </>
                    )}
                  </button>

                  {addedToRoster && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setSubTab('gallery')}
                      style={{ padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      View in Roster <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', padding: '0 0.2rem' }}>
                  <span>Asset: {genResult.local_image_path || 'assets/models/'}</span>
                  <span>Shoot ID: {genResult.shoot_id || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. REGISTER CUSTOM MODEL */}
      {subTab === 'register' && (
        <form onSubmit={handleRegister} className="eth-card" style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
          <span className="heading-sub">New Model Casting Application</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.2rem' }}>
            <div>
              <label className="eth-label">Model Display Name</label>
              <input
                type="text"
                className="eth-input"
                placeholder="e.g. Saffron Lee, Elena Rostova"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="eth-label">Gender</label>
              <select className="eth-select" value={regGender} onChange={(e) => setRegGender(e.target.value)}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>

            <div>
              <label className="eth-label">Archetype Prompt Directive (Visual Details for AI)</label>
              <textarea
                className="eth-textarea"
                rows={3}
                value={regArchetype}
                onChange={(e) => setRegArchetype(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="eth-label">Studio Notes / Agency Bio</label>
              <textarea
                className="eth-textarea"
                rows={2}
                value={regDesc}
                onChange={(e) => setRegDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="eth-label">Model Portrait Photo</label>
              <label className="upload-zone" style={{ display: 'block' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setRegImage(f);
                      setRegImagePreview(URL.createObjectURL(f));
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <Upload size={20} color="var(--text-secondary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <p style={{ fontSize: '0.8rem' }}>{regImage ? regImage.name : 'Upload portrait photo'}</p>
              </label>
              {regImagePreview && (
                <div style={{ marginTop: '0.8rem', width: '80px', height: '100px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src={regImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <div style={{ background: '#0a0a0c', border: '1px solid var(--border-hair)', borderRadius: '6px', padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="eth-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  🔒 Biometric Identity Lock
                </label>
                <input
                  type="checkbox"
                  checked={regBiometricLock}
                  onChange={(e) => setRegBiometricLock(e.target.checked)}
                  style={{ accentColor: '#4ade80', width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
              <p className="formula-tag" style={{ margin: '0 0 0.6rem 0', color: 'var(--text-secondary)' }}>
                Locks facial bone structure, eye contour, and undertones during neural virtual try-on.
              </p>
              {regBiometricLock && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#fff', marginBottom: '0.2rem' }}>
                    <span>Lock Strength</span>
                    <span className="formula-tag" style={{ color: '#4ade80' }}>{Math.round(regLockStrength * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.0"
                    step="0.05"
                    value={regLockStrength}
                    onChange={(e) => setRegLockStrength(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#4ade80' }}
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={registering} style={{ marginTop: '1rem' }}>
              {registering ? <RefreshCw size={14} className="status-dot-pulse" /> : <Plus size={14} />} Register Model into Agency
            </button>
          </div>
        </form>
      )}

      {/* 4. EDIT & DELETE */}
      {subTab === 'edit' && (
        <div className="eth-card" style={{ maxWidth: '640px', margin: '0 auto', width: '100%' }}>
          <span className="heading-sub">Modify or Remove Roster Model</span>
          <div style={{ marginTop: '1.2rem' }}>
            <label className="eth-label">Choose Model to Edit</label>
            <select
              className="eth-select"
              value={editId}
              onChange={(e) => handleSelectEditTarget(e.target.value)}
            >
              {Object.entries(models).map(([k, m]) => (
                <option key={k} value={k}>{m.name} ({m.gender})</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.2rem' }}>
            <div>
              <label className="eth-label">Display Name</label>
              <input
                type="text"
                className="eth-input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="eth-label">Gender</label>
              <select className="eth-select" value={editGender} onChange={(e) => setEditGender(e.target.value)}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>

            <div>
              <label className="eth-label">Archetype Prompt Directive</label>
              <textarea
                className="eth-textarea"
                rows={3}
                value={editArchetype}
                onChange={(e) => setEditArchetype(e.target.value)}
              />
            </div>

            <div>
              <label className="eth-label">Studio Notes</label>
              <textarea
                className="eth-textarea"
                rows={2}
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
            </div>

            <div style={{ background: '#0a0a0c', border: '1px solid var(--border-hair)', borderRadius: '6px', padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="eth-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  🔒 Biometric Identity Lock
                </label>
                <input
                  type="checkbox"
                  checked={editBiometricLock}
                  onChange={(e) => setEditBiometricLock(e.target.checked)}
                  style={{ accentColor: '#4ade80', width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
              <p className="formula-tag" style={{ margin: '0 0 0.6rem 0', color: 'var(--text-secondary)' }}>
                Locks facial bone structure, eye contour, and undertones during neural virtual try-on.
              </p>
              {editBiometricLock && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#fff', marginBottom: '0.2rem' }}>
                    <span>Lock Strength</span>
                    <span className="formula-tag" style={{ color: '#4ade80' }}>{Math.round(editLockStrength * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.0"
                    step="0.05"
                    value={editLockStrength}
                    onChange={(e) => setEditLockStrength(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#4ade80' }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={savingEdit}>
                {savingEdit ? 'Saving...' : 'Save Modifications'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ borderColor: 'rgba(255, 60, 60, 0.4)', color: '#ff7777' }}
                onClick={() => handleDeleteModel(editId)}
              >
                <Trash2 size={14} /> Delete Model
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
