import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Check, ChevronDown, ChevronUp, Sliders, Cpu, Wand2 } from 'lucide-react';

/**
 * PromptEnhancer — Luxury Neural Prompt Expander powered by Nemotron LLM.
 * Completely opt-in: activates only when the user chooses to enhance.
 * Supports style selection, custom LLM models, diff preview, and 1-click revert.
 */
export default function PromptEnhancer({
  prompt,
  onEnhanced,
  style = 'editorial',
  label = 'Nemotron Enhancer',
  compact = false
}) {
  const [enhancing, setEnhancing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(style);
  const [modelList, setModelList] = useState(['nemotron:latest', 'nemotron-mini:latest', 'llama3.2:latest', 'qwen2.5:7b']);
  const [selectedModel, setSelectedModel] = useState('nemotron:latest');
  const [customModelInput, setCustomModelInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [originalPrompt, setOriginalPrompt] = useState(null);
  const [lastEnhancedResult, setLastEnhancedResult] = useState(null);
  const [engineUsed, setEngineUsed] = useState(null);
  const [notification, setNotification] = useState(null);

  // Fetch available models on mount
  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await fetch('/api/prompt/models');
      if (res.ok) {
        const data = await res.json();
        if (data.models && data.models.length > 0) {
          setModelList(data.models);
          if (data.default) setSelectedModel(data.default);
        }
      }
    } catch (e) {
      // Backend offline or fallback
    }
  };

  const handleEnhance = async () => {
    if (!prompt || !prompt.trim()) {
      setNotification('Please enter a prompt first.');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setEnhancing(true);
    setNotification(null);
    const activeModel = customModelInput.trim() || selectedModel;

    try {
      const res = await fetch('/api/prompt/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          model: activeModel
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.enhanced) {
          setOriginalPrompt(prompt);
          setLastEnhancedResult(data.enhanced);
          setEngineUsed(data.model || activeModel);
          onEnhanced(data.enhanced);
          setNotification(`Prompt enhanced via ${data.model || 'Nemotron'}`);
          setTimeout(() => setNotification(null), 4000);
        }
      } else {
        setNotification('Could not enhance prompt. Check Ollama server.');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      console.error('[PromptEnhancer]', err);
      setNotification('Enhancement connection error.');
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setEnhancing(false);
    }
  };

  const handleRevert = () => {
    if (originalPrompt !== null) {
      onEnhanced(originalPrompt);
      setNotification('Reverted to original prompt.');
      setOriginalPrompt(null);
      setLastEnhancedResult(null);
      setTimeout(() => setNotification(null), 2500);
    }
  };

  const STYLES = [
    { id: 'editorial', label: 'Vogue Editorial', desc: '85mm f/1.4 lens, natural skin pores, fluid drape & ambient shadows' },
    { id: 'film-camera', label: 'Hasselblad Film', desc: 'Medium format Portra 400, optical falloff, fine grain & true dynamic range' },
    { id: 'tailor', label: 'Master Tailor', desc: '100mm macro, architectural seams, tangible textile thread weave' },
    { id: 'commercial', label: 'Clean Catalog', desc: 'Balanced daylight, true garment color fidelity, crisp packshot' },
    { id: 'skincare', label: 'Dewy Beauty', desc: 'Macro skin clarity, vellus hair, glass skin translucency & SSS' }
  ];

  return (
    <div
      style={{
        margin: '0.4rem 0 0.8rem',
        padding: compact ? '0.35rem 0.6rem' : '0.6rem 0.8rem',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-hair)',
        borderRadius: '8px',
        transition: 'all var(--transition-fast)'
      }}
    >
      {/* Top Bar: Action Trigger & Revert */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <button
            type="button"
            onClick={handleEnhance}
            disabled={enhancing}
            className="btn-secondary"
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              borderColor: enhancing ? 'var(--color-obsidian)' : 'rgba(0, 0, 0, 0.15)',
              background: enhancing ? '#f0f0f3' : '#ffffff'
            }}
            title="Enhance the prompt with Nemotron fashion LLM"
          >
            <Sparkles
              size={12}
              style={{
                color: enhancing ? '#c5a880' : '#000000',
                animation: enhancing ? 'spin 1.5s linear infinite' : 'none'
              }}
            />
            {enhancing ? 'NEMOTRON CRAFTING...' : 'ENHANCE WITH NEMOTRON'}
          </button>

          {originalPrompt !== null && (
            <button
              type="button"
              onClick={handleRevert}
              className="btn-secondary"
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.64rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'var(--text-secondary)'
              }}
              title="Undo Nemotron enhancement and restore original prompt"
            >
              <RotateCcw size={11} /> Revert Original
            </button>
          )}

          {engineUsed && !enhancing && (
            <span
              className="formula-tag"
              style={{
                fontSize: '0.58rem',
                background: '#fafafa',
                padding: '2px 6px',
                borderRadius: '3px',
                border: '1px solid var(--border-hair)'
              }}
            >
              ✨ {engineUsed}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.66rem',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '2px 4px'
          }}
          title="Configure Nemotron enhancement style and LLM model"
        >
          <Sliders size={11} />
          <span>{STYLES.find(s => s.id === selectedStyle)?.label || 'Options'}</span>
          {showSettings ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            marginTop: '0.4rem',
            fontSize: '0.66rem',
            fontFamily: 'var(--font-mono)',
            color: '#000000',
            background: 'rgba(0, 0, 0, 0.04)',
            padding: '3px 8px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Check size={10} style={{ color: '#30d158' }} /> {notification}
        </div>
      )}

      {/* Expandable Options: Style Presets & Model Selection */}
      {showSettings && (
        <div
          style={{
            marginTop: '0.6rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-hair)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {/* 1. Style Selection */}
          <div>
            <span className="heading-sub" style={{ fontSize: '0.58rem', display: 'block', marginBottom: '0.3rem' }}>
              DIRECTIVE STYLE SPECIFICATION
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.35rem' }}>
              {STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyle(st.id)}
                  style={{
                    padding: '0.35rem 0.5rem',
                    textAlign: 'left',
                    borderRadius: '4px',
                    border: selectedStyle === st.id ? '1px solid #000000' : '1px solid var(--border-hair)',
                    background: selectedStyle === st.id ? '#000000' : '#ffffff',
                    color: selectedStyle === st.id ? '#ffffff' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontWeight: '600' }}>{st.label}</div>
                  <div
                    style={{
                      fontSize: '0.56rem',
                      opacity: selectedStyle === st.id ? 0.8 : 0.6,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {st.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Model Selection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <span className="heading-sub" style={{ fontSize: '0.58rem', display: 'block', marginBottom: '0.2rem' }}>
                OLLAMA LLM MODEL
              </span>
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setCustomModelInput('');
                }}
                className="atelier-select"
                style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.68rem' }}
              >
                {modelList.map((m) => (
                  <option key={m} value={m}>
                    {m} {m.includes('nemotron') ? '★ Recommended' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '180px' }}>
              <span className="heading-sub" style={{ fontSize: '0.58rem', display: 'block', marginBottom: '0.2rem' }}>
                OR CUSTOM MODEL NAME
              </span>
              <input
                type="text"
                value={customModelInput}
                onChange={(e) => setCustomModelInput(e.target.value)}
                placeholder="e.g. nemotron:latest or custom-lora"
                className="atelier-select"
                style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.68rem' }}
              />
            </div>
          </div>

          <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', margin: '0' }}>
            Optional: If you don't click enhance, your raw prompt is used unmodified. You have full creative control.
          </p>
        </div>
      )}
    </div>
  );
}
