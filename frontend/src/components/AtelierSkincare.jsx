import React, { useState } from 'react';
import { Droplets, Sparkles, Upload, Download, RefreshCw, X, Sliders, CheckCircle2 } from 'lucide-react';
import CoutureConveyorLoader from './CoutureConveyorLoader';

export default function AtelierSkincare({ schemas, models }) {
  const sk = schemas?.skincare || {};

  // Grounded Product Upload
  const [productFile, setProductFile] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [productName, setProductName] = useState('');

  // Custom Character & Scene Prompt (User has 100% creative liberty)
  const defaultPrompt = "Extreme macro 4k beauty close-up photograph of a radiant woman with glowing skin, holding this skincare product delicately right next to her face and cheekbone. Delicate manicured fingers resting gently on cheek, soft warm studio lighting, immaculate pore-level realistic skin texture, dewy glass skin finish, commercial beauty advertisement.";
  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);

  // Optional Fine-Tuning Directives
  const [productType, setProductType] = useState('Glass Dropper Serum Bottle');
  const [skinFinish, setSkinFinish] = useState('Glass Skin (Hyper-dewy, reflective, luminous)');
  const [lighting, setLighting] = useState('High-Key Softbox Beauty Lighting');
  const [background, setBackground] = useState('Minimalist Soft Studio Backdrop with gentle warm glow');

  // Execution State
  const [rendering, setRendering] = useState(false);
  const [renderResult, setRenderResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleProductUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductFile(file);
      setProductName(file.name);
      setProductPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleClearProduct = () => {
    setProductFile(null);
    setProductPreview(null);
    setProductName('');
  };

  // Quick attribute chips to append descriptive traits to the user's prompt
  const appendTrait = (trait) => {
    setCustomPrompt((prev) => {
      const trimmed = prev.trim();
      if (trimmed.toLowerCase().includes(trait.toLowerCase())) return prev;
      return trimmed.endsWith('.')
        ? `${trimmed} ${trait}.`
        : `${trimmed}, ${trait}.`;
    });
  };

  const handleGenerate = async () => {
    if (!productFile) {
      setErrorMsg('Please upload your skincare product photo first.');
      return;
    }
    if (!customPrompt || !customPrompt.trim()) {
      setErrorMsg('Please enter a prompt describing your character and scene.');
      return;
    }

    setRendering(true);
    setErrorMsg(null);
    setRenderResult(null);

    try {
      const formData = new FormData();
      formData.append('product_file', productFile);
      formData.append('product_type', productType);
      formData.append('skin_finish', skinFinish);
      formData.append('lighting', lighting);
      formData.append('background', background);
      formData.append('brief', 'Macro pore clarity, crisp product label reflection');
      formData.append('model_archetype', 'Custom Character');
      formData.append('custom_prompt', customPrompt.trim());

      const res = await fetch('/api/skincare/generate-grounded', {
        method: 'POST',
        body: formData
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const txt = await res.text().catch(() => '');
        data = { detail: txt || `Server returned status ${res.status}` };
      }

      if (!res.ok) {
        throw new Error(data?.detail || `Server returned status ${res.status}`);
      }

      setRenderResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Skincare generation failed');
    } finally {
      setRendering(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hair)', paddingBottom: '1.2rem' }}>
        <div>
          <span className="heading-sub">ATELIER II · COMMERCIAL BEAUTY & DERMATOLOGICAL CAMPAIGNS</span>
          <h1 className="heading-hero" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>Skincare Face & Product Studio</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <span className="eth-badge eth-badge-active"><span className="status-dot status-dot-pulse"></span> QWEN 2512 4K ENGINE</span>
          <span className="eth-badge">PRODUCT GROUNDED</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.25fr', gap: '2rem' }}>
        {/* LEFT COLUMN: PRODUCT UPLOAD & CUSTOM CHARACTER PROMPT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          
          {/* STEP 1: PRODUCT UPLOAD */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span className="heading-sub">Step 1 · Upload Cosmetic Product</span>
              {productFile && (
                <button
                  onClick={handleClearProduct}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}
                >
                  <X size={12} /> Remove
                </button>
              )}
            </div>

            {!productPreview ? (
              <label className="upload-zone" style={{ display: 'block', cursor: 'pointer', padding: '1.8rem 1rem' }}>
                <input type="file" accept="image/*" onChange={handleProductUpload} style={{ display: 'none' }} />
                <Upload size={24} color="var(--text-secondary)" style={{ margin: '0 auto 0.6rem auto' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.3rem', fontWeight: '500' }}>
                  Upload Product Bottle, Jar, Tube, or Dropper
                </p>
                <p className="formula-tag">SUPPORTS PNG, JPG, WEBP PACKSHOTS</p>
              </label>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: '#0a0a0a', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '4px', background: '#000', border: '1px solid var(--border-hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={productPreview} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', fontWeight: '500' }}>
                    <CheckCircle2 size={14} /> Product Loaded
                  </div>
                  <p style={{ fontSize: '0.84rem', fontWeight: '500', marginTop: '0.2rem', color: '#fff' }}>{productName}</p>
                  <span className="formula-tag" style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'inline-block' }}>
                    WILL BE SYNTHESIZED IN HAND BESIDE FACE
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: CUSTOM CHARACTER & SCENE PROMPT (NO PREMADE TEMPLATES) */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span className="heading-sub">Step 2 · Design Character & Posing (Prompt)</span>
              <span className="formula-tag" style={{ color: '#fff' }}>100% CUSTOM CHARACTER FREEDOM</span>
            </div>

            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: '1.4' }}>
              Describe the character you want (ethnicity, features, hair, expression, skin) and how she holds the product next to her face:
            </p>

            <textarea
              className="eth-textarea"
              rows={5}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Extreme macro 4k beauty close-up photograph of a 24-year-old Japanese woman with a sleek black bob hair and serene expression, holding this skincare product delicately next to her cheekbone with manicured fingers, dewy glass skin with natural organic pores..."
              style={{ fontSize: '0.82rem', lineHeight: '1.5' }}
            />

            {/* QUICK TRAIT INSERTERS (NOT RIGID TEMPLATES - JUST HELPFUL DESCRIPTORS) */}
            <div style={{ marginTop: '0.9rem' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                Add descriptive touches to your prompt:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[
                  'Holding bottle right beside cheekbone',
                  'Luminous dewy glass skin finish',
                  'Natural organic pore clarity 4k',
                  'Serene gentle smile',
                  'Crisp spa towel hair turban',
                  'Soft morning studio window light',
                  'Minimalist travertine marble vanity',
                  'Extreme macro face close-up'
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
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.68rem',
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

          {/* STEP 3: OPTIONAL SETTINGS / DIRECTIVES */}
          <div className="eth-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <Sliders size={14} color="var(--text-secondary)" />
              <span className="heading-sub">Fine-Tuning Directives</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="eth-label">Container Type</label>
                <select className="eth-select" value={productType} onChange={(e) => setProductType(e.target.value)}>
                  {(sk.product_types || ['Glass Dropper Serum Bottle', 'White Lotion Pump Bottle', 'Moisturizer Cream Jar', 'Facial Cleanser Tube']).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Skin Finish</label>
                <select className="eth-select" value={skinFinish} onChange={(e) => setSkinFinish(e.target.value)}>
                  {(sk.skin_finishes || ['Glass Skin (Hyper-dewy, reflective, luminous)', 'Satin Hydrated Glow', 'Natural Radiant Beauty', 'Matte Velvet Finish']).map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Beauty Lighting</label>
                <select className="eth-select" value={lighting} onChange={(e) => setLighting(e.target.value)}>
                  {(sk.lighting_modes || ['High-Key Softbox Beauty Lighting', 'Diffused Daylight Window', 'Golden Hour Warm Glow', 'Clinical Dermatology Daylight']).map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eth-label">Backdrop</label>
                <select className="eth-select" value={background} onChange={(e) => setBackground(e.target.value)}>
                  {(sk.background_presets || ['Minimalist Soft Studio Backdrop with gentle warm glow', 'Minimalist Travertine Marble Vanity', 'Luxe Botanical Bathroom', 'Clinical Clean Slate']).map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* DISPATCH ACTION */}
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1.1rem', fontSize: '0.85rem' }}
            disabled={rendering || !productFile}
            onClick={handleGenerate}
          >
            {rendering ? (
              <>
                <RefreshCw size={16} className="status-dot-pulse" /> Generating Custom Character & Holding Product...
              </>
            ) : (
              <>
                <Droplets size={16} /> Generate Skincare Portrait (Product Next To Face)
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
              <span className="heading-sub">Campaign Portrait Output</span>
              {renderResult && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="eth-badge">{renderResult.elapsed_sec}s 4K RENDER</span>
                  <span className="eth-badge eth-badge-active">QWEN 2512 LIGHTNING</span>
                </div>
              )}
            </div>

            <div style={{
              flex: 1,
              minHeight: '480px',
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
                  title="Formulating Beauty Visuals"
                  subtitle="Macro Skin Surface Synthesis on Runway Conveyor"
                  elapsedSec={0}
                />
              ) : renderResult?.local_image_path ? (
                <img
                  src={`/${renderResult.local_image_path.replace(/\\/g, '/')}`}
                  alt="Generated Skincare Campaign"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  <Droplets size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                  <p className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Commercial Skincare Portrait
                  </p>
                  <p className="formula-tag">UPLOAD PRODUCT & DEFINE YOUR CHARACTER ON THE LEFT TO GENERATE</p>
                </div>
              )}
            </div>

            {renderResult && (
              <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a
                  href={`/${renderResult.local_image_path.replace(/\\/g, '/')}`}
                  download
                  className="btn-secondary"
                  style={{ width: '100%', textDecoration: 'none', textAlign: 'center', padding: '0.8rem' }}
                >
                  <Download size={15} /> Download High-Resolution Campaign (PNG)
                </a>

                {renderResult.nlp_data?.instruction && (
                  <div style={{ background: '#080808', border: '1px solid var(--border-hair)', borderRadius: '4px', padding: '0.8rem' }}>
                    <span className="formula-tag" style={{ color: '#fff' }}>[ACTIVE SYNTHESIS PROMPT]</span>
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
