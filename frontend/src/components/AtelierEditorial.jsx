import React, { useState } from 'react';
import { Sparkles, Upload, Download, RefreshCw, Type, Compass, X, CheckCircle2, Sliders, User, Shirt, MapPin, Wand2 } from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';

export default function AtelierEditorial({ schemas, models }) {
  const post = schemas?.posters || {};
  const [workflowMode, setWorkflowMode] = useState('grounded'); // 'grounded' | 't2i'

  // Step 1: Garment Upload (Clothing)
  const [garmentFile, setGarmentFile] = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(null);
  const [garmentName, setGarmentName] = useState('');

  // Step 2: Model Who Wears The Garment
  const baseModelOptions = [
    {
      id: 'model_female_1',
      gender: 'female',
      ethnicity: 'South Asian',
      label: 'South Asian Female — Editorial High-Fashion (Dark wavy hair, razor-sharp cheekbones, athletic frame)',
      img: '/assets/models/model_female_1.png'
    },
    {
      id: 'model_female_2',
      gender: 'female',
      ethnicity: 'East Asian',
      label: 'East Asian Female — Minimalist Avant-Garde (Sleek black bob, statuesque poise, porcelain tone)',
      img: '/assets/models/model_female_2.png'
    },
    {
      id: 'model_female_3',
      gender: 'female',
      ethnicity: 'Afro-Latina',
      label: 'Afro-Latina Female — Commercial High-Glam (Textured curls, glowing warm skin, striking gaze)',
      img: '/assets/models/model_female_3.png'
    },
    {
      id: 'model_female_4',
      gender: 'female',
      ethnicity: 'Mediterranean',
      label: 'Mediterranean Female — High-Fashion Chic (Natural olive skin, honey waves, slender athletic frame)',
      img: '/assets/models/model_female_4.png'
    },
    {
      id: 'model_male_1',
      gender: 'male',
      ethnicity: 'European',
      label: 'European Male — Contemporary High-Fashion Streetwear (Sharp jawline, athletic build, short fade)',
      img: '/assets/models/model_male_1.png'
    },
    {
      id: 'model_male_2',
      gender: 'male',
      ethnicity: 'South Asian',
      label: 'South Asian Male — Tailored Classic Menswear (Sophisticated frame, groomed beard, refined poise)',
      img: '/assets/models/model_male_2.png'
    },
    {
      id: 'model_male_3',
      gender: 'male',
      ethnicity: 'East Asian',
      label: 'East Asian Male — Urban Avant-Garde (Minimalist silhouette, textured undercut, lean frame)',
      img: '/assets/models/model_male_3.png'
    },
    {
      id: 'custom_model',
      gender: 'custom',
      ethnicity: 'Custom',
      label: 'Custom Model (Describe age, ethnicity & features freely in Step 3)',
      img: null
    }
  ];

  const [genderFilter, setGenderFilter] = useState('all'); // 'all' | 'male' | 'female' | 'custom'
  const [selectedModelId, setSelectedModelId] = useState('model_female_1');
  const [modelArchetype, setModelArchetype] = useState(
    'South Asian Female — Editorial High-Fashion (Dark wavy hair, razor-sharp cheekbones, athletic frame)'
  );

  // Step 3: Custom Creative Liberty & Description (Styling / Scene Directives)
  const [customPrompt, setCustomPrompt] = useState('');

  // Style & Composition Directives
  const [posterStyle, setPosterStyle] = useState(
    'Vogue Paris Haute Couture (Sharp contrast, sculptural luxury silhouette)'
  );
  const [posterPose, setPosterPose] = useState(
    'Runway Power Stride (Dynamic forward motion, flowing fabric flair)'
  );
  const [background, setBackground] = useState(
    'Parisian Haussmann Balcony with Wrought-Iron Railing & Limestone Facades'
  );
  const [effects, setEffects] = useState(
    'High-Contrast Studio Chiaroscuro (Razor-sharp shadows, crisp texture)'
  );

  // Typography & Framing
  const [enableTypography, setEnableTypography] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('2:3 (Portrait Editorial 832x1216)');
  const [brandTitle, setBrandTitle] = useState('ETHEREAL');
  const [subheader, setSubheader] = useState('AUTUMN / WINTER 2026');
  const [tagline, setTagline] = useState('PARIS · MILAN · NEW YORK');

  // Pure T2I Prompt
  const [t2iPrompt, setT2iPrompt] = useState(
    'High-fashion editorial campaign photograph of a statuesque model walking down a sun-drenched Parisian balcony, wearing a sharp sculptural architectural coat, 35mm film aesthetic, high contrast, cinematic lighting'
  );

  // Execution State
  const [rendering, setRendering] = useState(false);
  const [renderResult, setRenderResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const filteredModels = genderFilter === 'all'
    ? baseModelOptions
    : baseModelOptions.filter(m => m.gender === genderFilter || m.gender === 'custom');

  const handleGenderChange = (g) => {
    setGenderFilter(g);
    const available = g === 'all'
      ? baseModelOptions
      : baseModelOptions.filter(m => m.gender === g || m.gender === 'custom');
    if (available.length > 0 && !available.some(m => m.id === selectedModelId)) {
      setSelectedModelId(available[0].id);
      setModelArchetype(available[0].label);
    }
  };

  const handleModelChange = (id) => {
    setSelectedModelId(id);
    const target = baseModelOptions.find(m => m.id === id);
    if (target) {
      setModelArchetype(target.label);
    }
  };

  const currentModel = baseModelOptions.find(m => m.id === selectedModelId) || baseModelOptions[0];

  const handleGarmentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setGarmentFile(file);
      setGarmentName(file.name);
      setGarmentPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleClearGarment = () => {
    setGarmentFile(null);
    setGarmentPreview(null);
    setGarmentName('');
  };

  // Additive trait chips for 100% creative liberty
  const appendTrait = (trait) => {
    setCustomPrompt((prev) => {
      const trimmed = prev.trim();
      if (trimmed.toLowerCase().includes(trait.toLowerCase())) return prev;
      return trimmed.endsWith('.')
        ? `${trimmed} ${trait}.`
        : `${trimmed ? trimmed + ', ' : ''}${trait}.`;
    });
  };

  const handleGenerate = async () => {
    setRendering(true);
    setErrorMsg(null);
    setRenderResult(null);

    try {
      if (workflowMode === 't2i') {
        const res = await fetch('/api/posters/generate-t2i', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: t2iPrompt,
            aspect_ratio: aspectRatio,
            brand_title: brandTitle,
            subheader,
            tagline,
            enable_typography: enableTypography
          })
        });
        let data = null;
        let text = '';
        try {
          text = await res.text();
          data = JSON.parse(text);
        } catch {}
        if (!res.ok) {
          throw new Error(data?.detail || (text && text.length < 250 && !text.includes('<!DOCTYPE') ? text : `Server error (${res.status}): Please check backend or ComfyUI status.`));
        }
        setRenderResult(data);
      } else {
        if (!garmentFile) {
          throw new Error('Please upload your clothing item in Step 1 first.');
        }
        const formData = new FormData();
        formData.append('garment_file', garmentFile);
        formData.append('poster_style', posterStyle);
        formData.append('aspect_ratio', aspectRatio);
        formData.append('pose', posterPose);
        formData.append('lighting', effects);
        formData.append('background', background);
        formData.append('brand_title', brandTitle);
        formData.append('subheader', subheader);
        formData.append('tagline', tagline);
        formData.append('enable_typography', enableTypography);
        formData.append('brief', 'Dramatic silhouette, razor-sharp garment folds');
        formData.append('model_archetype', modelArchetype);
        if (selectedModelId && selectedModelId !== 'custom_model') {
          formData.append('model_id', selectedModelId);
        }
        formData.append('effects', effects);
        formData.append('custom_prompt', customPrompt.trim());

        const res = await fetch('/api/posters/generate-grounded', {
          method: 'POST',
          body: formData
        });
        let data = null;
        let text = '';
        try {
          text = await res.text();
          data = JSON.parse(text);
        } catch {}
        if (!res.ok) {
          throw new Error(data?.detail || (text && text.length < 250 && !text.includes('<!DOCTYPE') ? text : `Server error (${res.status}): Please check backend or ComfyUI status.`));
        }
        setRenderResult(data);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Poster generation failed');
    } finally {
      setRendering(false);
    }
  };

  const [upscaling, setUpscaling] = useState(false);

  const handleUpscale4K = async () => {
    if (!renderResult) return;
    setUpscaling(true);
    setErrorMsg('');
    try {
      const promptToUse = renderResult.nlp_data?.instruction || t2iPrompt || customPrompt || "High-fashion commercial editorial poster";
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
      setErrorMsg(err.message);
    } finally {
      setUpscaling(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hair)', paddingBottom: '1.2rem' }}>
        <div>
          <span className="heading-sub">ATELIER III · HAUTE COUTURE CAMPAIGN POSTERS & EDITORIALS</span>
          <h1 className="heading-hero" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>Fashion Campaign & Poster Studio</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <span className="eth-badge eth-badge-active"><span className="status-dot status-dot-pulse"></span> QWEN-IMAGE 2512 4K</span>
          <span className="eth-badge">GARMENT GROUNDED</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: '2rem' }}>
        {/* LEFT COLUMN: CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          
          {/* WORKFLOW SWITCHER */}
          <div className="eth-card" style={{ padding: '0.6rem 1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="heading-sub" style={{ minWidth: '85px' }}>Mode:</span>
              <div style={{ display: 'flex', gap: '0.4rem', flex: 1 }}>
                <button
                  type="button"
                  onClick={() => setWorkflowMode('grounded')}
                  style={{
                    flex: 1,
                    background: workflowMode === 'grounded' ? '#ffffff' : 'transparent',
                    color: workflowMode === 'grounded' ? '#000000' : 'var(--text-secondary)',
                    border: '1px solid ' + (workflowMode === 'grounded' ? '#ffffff' : 'var(--border-hair)'),
                    padding: '0.55rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Wearing Uploaded Garment (Campaign)
                </button>
                <button
                  type="button"
                  onClick={() => setWorkflowMode('t2i')}
                  style={{
                    flex: 1,
                    background: workflowMode === 't2i' ? '#ffffff' : 'transparent',
                    color: workflowMode === 't2i' ? '#000000' : 'var(--text-secondary)',
                    border: '1px solid ' + (workflowMode === 't2i' ? '#ffffff' : 'var(--border-hair)'),
                    padding: '0.55rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Pure Text-to-Image (T2I)
                </button>
              </div>
            </div>
          </div>

          {workflowMode === 'grounded' ? (
            /* GROUNDED GARMENT MODE */
            <>
              {/* STEP 1: UPLOAD CLOTHING */}
              <div className="eth-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Shirt size={14} color="var(--text-secondary)" />
                    <span className="heading-sub">Step 1 · Upload Clothing</span>
                  </div>
                  {garmentFile && (
                    <button
                      onClick={handleClearGarment}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}
                    >
                      <X size={12} /> Remove
                    </button>
                  )}
                </div>

                {!garmentPreview ? (
                  <label className="upload-zone" style={{ display: 'block', cursor: 'pointer', padding: '1.6rem 1rem' }}>
                    <input type="file" accept="image/*" onChange={handleGarmentUpload} style={{ display: 'none' }} />
                    <Upload size={22} color="var(--text-secondary)" style={{ margin: '0 auto 0.6rem auto' }} />
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginBottom: '0.2rem', fontWeight: '500' }}>
                      Upload Clothing (Trench Coat, Jacket, Dress, Suit, or Top)
                    </p>
                    <p className="formula-tag">SUPPORTS PNG, JPG, WEBP PACKSHOTS & FLAT-LAYS</p>
                  </label>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: '#0a0a0a', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ width: '68px', height: '68px', borderRadius: '4px', background: '#000', border: '1px solid var(--border-hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={garmentPreview} alt="Garment" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', fontWeight: '500' }}>
                        <CheckCircle2 size={14} /> Garment Loaded
                      </div>
                      <p style={{ fontSize: '0.84rem', fontWeight: '500', marginTop: '0.2rem', color: '#fff' }}>{garmentName}</p>
                      <span className="formula-tag" style={{ color: '#60a5fa', marginTop: '0.2rem', display: 'inline-block' }}>
                        THE MODEL WILL WEAR THIS CLOTHING IN THE CAMPAIGN
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: WHO IS WEARING THE GARMENT (MODEL CASTING) */}
              <div className="eth-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={14} color="var(--text-secondary)" />
                    <span className="heading-sub">Step 2 · Model Wearing The Garment</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {[
                      { key: 'all', label: 'All Models' },
                      { key: 'female', label: 'Female 💃' },
                      { key: 'male', label: 'Male 🤵' }
                    ].map(g => (
                      <button
                        key={g.key}
                        type="button"
                        onClick={() => handleGenderChange(g.key)}
                        style={{
                          background: genderFilter === g.key ? '#ffffff' : 'transparent',
                          color: genderFilter === g.key ? '#000000' : 'var(--text-muted)',
                          border: '1px solid ' + (genderFilter === g.key ? '#ffffff' : 'rgba(255,255,255,0.2)'),
                          borderRadius: '999px',
                          padding: '0.25rem 0.65rem',
                          fontSize: '0.68rem',
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

                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', marginTop: '0.8rem', background: '#080808', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-hair)' }}>
                  {/* Model Portrait Preview */}
                  <div style={{ width: '80px', height: '100px', background: '#000', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-hair)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentModel?.img ? (
                      <img
                        src={currentModel.img}
                        alt={currentModel.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        <User size={24} style={{ margin: '0 auto 0.2rem auto', opacity: 0.5 }} />
                        Custom
                      </div>
                    )}
                  </div>

                  {/* Model Selector & Ethnicity Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className="formula-tag" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                        {currentModel.ethnicity}
                      </span>
                      <span className="formula-tag" style={{ textTransform: 'capitalize' }}>
                        {currentModel.gender}
                      </span>
                    </div>

                    <select
                      className="eth-select"
                      value={selectedModelId}
                      onChange={(e) => handleModelChange(e.target.value)}
                      style={{ width: '100%', fontSize: '0.78rem', padding: '0.55rem' }}
                    >
                      {filteredModels.map(m => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>

                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                      {currentModel.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 3: DEDICATED SEPARATE SUBSECTION FOR CUSTOM CREATIVE LIBERTY */}
              <div className="eth-card" style={{ border: '1px solid rgba(255, 255, 255, 0.15)', background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(10,10,10,0.8) 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Wand2 size={14} color="#60a5fa" />
                    <span className="heading-sub" style={{ color: '#fff' }}>Step 3 · Creative Styling & Directives</span>
                  </div>
                  <span className="formula-tag" style={{ color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' }}>
                    OPTIONAL STYLING
                  </span>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.45' }}>
                  Add extra creative touches or leave blank to automatically inherit the selected model and venue presets:
                </p>

                <textarea
                  className="eth-textarea"
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Walking briskly along a rain-slicked Haussmann boulevard at twilight, dramatic coat motion, 35mm film grain, chiaroscuro lighting..."
                  style={{ fontSize: '0.82rem', lineHeight: '1.5' }}
                />

                {/* QUICK ADDITIVE TRAIT CHIPS */}
                <div style={{ marginTop: '0.8rem' }}>
                  <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                    Click to add quick creative touches to your description:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {[
                      'Wearing uploaded coat with open front',
                      'Dynamic coat tail swirl in wind',
                      'Rain-slicked wet asphalt reflections',
                      '35mm vintage analog film grain',
                      'Dramatic low-angle hero stance',
                      'Golden hour sun lens flare',
                      'Hands casually in pockets',
                      'Monochrome silver chiaroscuro',
                      'Cinematic wind-machine motion'
                    ].map((tag, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => appendTrait(tag)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-hair)',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)',
                          padding: '0.32rem 0.6rem',
                          fontSize: '0.67rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#ffffff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-hair)'; }}
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 4: CAMPAIGN DIRECTIVES (THEME, POSE, VENUE, EFFECTS) */}
              <div className="eth-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                  <Sliders size={14} color="var(--text-secondary)" />
                  <span className="heading-sub">Step 4 · Campaign Theme, Pose & Venue Controls</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* THEME */}
                  <div>
                    <label className="eth-label">Campaign Theme</label>
                    <select className="eth-select" value={posterStyle} onChange={(e) => setPosterStyle(e.target.value)}>
                      {(post.poster_styles || [
                        'Vogue Paris Haute Couture (Sharp contrast, sculptural luxury silhouette)',
                        'Balenciaga Brutalist Streetwear (Heavy grain, oversized industrial tailoring)',
                        'Helmut Lang 90s Minimalist (Analog film warmth, stark editorial attitude)',
                        'Old Money Italian Riviera (Sun-washed cashmere, effortless palazzo elegance)',
                        'Cyberpunk Tokyo Avant-Garde (Reflective chrome, holographic edge neon)',
                        'Milan Runway Catwalk (Dramatic front-row spotlights, fabric in motion)',
                        'Y2K High-Gloss Metallic (Sleek reflections, liquid silver pop sheen)',
                        'Gothic Noir Editorial (Deep velvet chiaroscuro, mysterious high drama)'
                      ]).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* POSE */}
                  <div>
                    <label className="eth-label">Fashion Pose</label>
                    <select className="eth-select" value={posterPose} onChange={(e) => setPosterPose(e.target.value)}>
                      {(post.poster_poses || [
                        'Runway Power Stride (Dynamic forward motion, flowing fabric flair)',
                        'Contrapposto Hip-Shift (Asymmetrical weight balance, casual high-fashion poise)',
                        'Over-the-Shoulder Haute Glance (Sharp cinematic gaze back toward camera)',
                        'Architectural Seated Pose (Perched on minimalist concrete cube with draped apparel)',
                        'Hands-in-Pockets Streetwear Lean (Relaxed urban attitude against architectural wall)',
                        'Dramatic Low-Angle Hero Stance (Commanding towering silhouette, sweeping lines)',
                        'Dynamic Mid-Turn Swirl (Motion-frozen cape and coat fabric swirling in air)'
                      ]).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* VENUE / LOCATION */}
                  <div>
                    <label className="eth-label">Venue / Architectural Setting</label>
                    <select className="eth-select" value={background} onChange={(e) => setBackground(e.target.value)}>
                      {(post.background_presets || [
                        'Parisian Haussmann Balcony with Wrought-Iron Railing & Limestone Facades',
                        'Brutalist Raw Concrete Architectural Column Gallery',
                        'Milanese Palazzo Courtyard with Polished Carrara Marble',
                        'Tokyo Rain-Slicked Neon Fashion Alley with Asphalt Reflections',
                        'New York Soho Cast-Iron Cobblestone Street at Dusk',
                        'Minimalist Sunlit Contemporary Art Gallery with Floating Plinths',
                        'Sun-Drenched Mediterranean Villa Terrace with Ancient Olive Trees',
                        'Ultra-Modern Glass & Steel Skybridge overlooking Futuristic Cityline'
                      ]).map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* EFFECTS & ATMOSPHERE */}
                  <div>
                    <label className="eth-label">Effects & Lighting</label>
                    <select className="eth-select" value={effects} onChange={(e) => setEffects(e.target.value)}>
                      {(post.lighting_presets || [
                        'High-Contrast Studio Chiaroscuro (Razor-sharp shadows, crisp texture)',
                        'Cinematic Golden Hour Rim Light (Warm sun flare contouring garment silhouette)',
                        '35mm Vintage Analog Film Grain with Warm Tungsten Flash',
                        'Neon Cyber Edge Rim Light (Electric cyan and magenta edge glow)',
                        'Atmospheric Rain Mist & Wet Asphalt Sheen (Glossy fabric reflections)',
                        'Sun-Dappled Window Shadow Patterns (Ethereal botanical gobos)',
                        'Moody Dramatic Fog & Volumetric Light Shafts (Theatrical stage atmosphere)'
                      ]).map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* PURE T2I MODE */
            <div className="eth-card">
              <span className="heading-sub">Editorial Directive Prompt</span>
              <div style={{ marginTop: '1rem' }}>
                <textarea
                  className="eth-textarea"
                  rows={5}
                  value={t2iPrompt}
                  onChange={(e) => setT2iPrompt(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 5: MASTHEAD TYPOGRAPHY */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="heading-sub"><Type size={13} style={{ display: 'inline', marginRight: '4px' }} /> Step 5 · Masthead Typography & Framing</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={enableTypography}
                  onChange={(e) => setEnableTypography(e.target.checked)}
                />
                Overlay Masthead
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div>
                <label className="eth-label">Poster Aspect Ratio</label>
                <select className="eth-select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                  {(post.aspect_ratios || [
                    '2:3 (Portrait Editorial 832x1216)',
                    '3:4 Luxury Magazine Portrait (Standard Editorial)',
                    '9:16 Full Screen / Digital Billboard (Story Ad)',
                    '1:1 Square Campaign Artwork (Feed & Album)',
                    '4:5 Commercial Fashion Catalog Ad'
                  ]).map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Brand Title</label>
                <input
                  type="text"
                  className="eth-input"
                  value={brandTitle}
                  onChange={(e) => setBrandTitle(e.target.value)}
                  disabled={!enableTypography}
                />
              </div>

              <div>
                <label className="eth-label">Collection / Season</label>
                <input
                  type="text"
                  className="eth-input"
                  value={subheader}
                  onChange={(e) => setSubheader(e.target.value)}
                  disabled={!enableTypography}
                />
              </div>

              <div>
                <label className="eth-label">Location / Tagline</label>
                <input
                  type="text"
                  className="eth-input"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  disabled={!enableTypography}
                />
              </div>
            </div>
          </div>

          {/* DISPATCH ACTION */}
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1.1rem', fontSize: '0.85rem' }}
            disabled={rendering || (workflowMode === 'grounded' && !garmentFile)}
            onClick={handleGenerate}
          >
            {rendering ? (
              <>
                <RefreshCw size={16} className="status-dot-pulse" /> Synthesizing Model Wearing Garment...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate Haute Couture Campaign Poster
              </>
            )}
          </button>

          {errorMsg && (
            <div style={{ padding: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#f87171', fontSize: '0.8rem' }}>
              {errorMsg}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: RENDER & OUTPUT CANVAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="eth-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="heading-sub">Campaign Poster Canvas</span>
              {renderResult && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="eth-badge">{renderResult.elapsed_sec}s RENDER</span>
                  <span className="eth-badge eth-badge-active">QWEN 2512 LIGHTNING</span>
                </div>
              )}
            </div>

            <div style={{
              flex: 1,
              minHeight: '520px',
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
                  title="Haute Couture Poster Fitting"
                  subtitle="Model Silhouette on Conveyor with Editorial Garment"
                  elapsedSec={0}
                />
              ) : (renderResult?.local_image_path || renderResult?.image_url) ? (
                <img
                  src={renderResult.local_image_path ? `/${renderResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : renderResult.image_url}
                  alt="Generated Fashion Poster"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    if (renderResult?.image_url && e.target.src !== renderResult.image_url) {
                      e.target.src = renderResult.image_url;
                    }
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  <Shirt size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                  <p className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Editorial Campaign Poster
                  </p>
                  <p className="formula-tag">UPLOAD CLOTHING ON THE LEFT TO HAVE THE MODEL WEAR IT</p>
                </div>
              )}
            </div>

            {renderResult && (
              <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <a
                    href={renderResult.local_image_path ? `/${renderResult.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}` : renderResult.image_url}
                    download
                    className="btn-secondary"
                    style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '0.8rem' }}
                  >
                    <Download size={15} /> Download Poster (PNG)
                  </a>
                  <button
                    onClick={handleUpscale4K}
                    disabled={upscaling}
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.8rem', background: renderResult.is_4k ? '#059669' : undefined }}
                  >
                    {upscaling ? (
                      <><RefreshCw size={15} className="status-dot-pulse" style={{ display: 'inline', marginRight: '6px' }} /> DiT 4K Upscaling...</>
                    ) : renderResult.is_4k ? (
                      <><CheckCircle2 size={15} style={{ display: 'inline', marginRight: '6px' }} /> 4K Super-Res Active (4096px)</>
                    ) : (
                      <><Sparkles size={15} style={{ display: 'inline', marginRight: '6px' }} /> Upscale to 4K (PiD DiT)</>
                    )}
                  </button>
                </div>

                {renderResult.nlp_data?.instruction && (
                  <div style={{ background: '#080808', border: '1px solid var(--border-hair)', borderRadius: '4px', padding: '0.8rem' }}>
                    <span className="formula-tag" style={{ color: '#fff' }}>[ACTIVE EDITORIAL DIRECTIVE]</span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.4' }}>
                      {renderResult.nlp_data.instruction}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
