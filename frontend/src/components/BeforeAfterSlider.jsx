import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sliders, Maximize2, Split } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "ORIGINAL GARMENT",
  afterLabel = "VIRTUAL ON-BODY DRAPE",
  aspectRatio = "auto",
  height = "520px"
}) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'after_only' | 'before_only'
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  if (!afterImage) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
      {/* Top Toggle Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="formula-tag">COMPARISON LENS</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            {viewMode === 'split' ? `${Math.round(sliderPosition)}% SPLIT` : viewMode === 'after_only' ? '100% RENDER' : '100% ORIGINAL'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.3rem', background: '#f4f4f6', padding: '2px', borderRadius: '999px', border: '1px solid var(--border-hair)' }}>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            style={{
              background: viewMode === 'split' ? '#000000' : 'transparent',
              color: viewMode === 'split' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <Split size={10} /> Split Lens
          </button>
          <button
            type="button"
            onClick={() => setViewMode('after_only')}
            style={{
              background: viewMode === 'after_only' ? '#000000' : 'transparent',
              color: viewMode === 'after_only' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Render
          </button>
          {beforeImage && (
            <button
              type="button"
              onClick={() => setViewMode('before_only')}
              style={{
                background: viewMode === 'before_only' ? '#000000' : 'transparent',
                color: viewMode === 'before_only' ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                fontSize: '0.65rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Garment
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          if (viewMode !== 'split') return;
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          if (viewMode !== 'split') return;
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: height,
          background: 'var(--bg-surface)',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--border-hair)',
          userSelect: 'none',
          cursor: viewMode === 'split' ? 'ew-resize' : 'default',
          outline: 'none'
        }}
      >
        {/* AFTER IMAGE (Full Base Layer) */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={afterImage}
            alt="Virtual Try-On Render"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none'
            }}
          />
          {viewMode !== 'before_only' && (
            <span
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                padding: '3px 8px',
                borderRadius: '4px',
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none'
              }}
            >
              {afterLabel}
            </span>
          )}
        </div>

        {/* BEFORE IMAGE (Clipped Layer on Left) */}
        {beforeImage && viewMode !== 'after_only' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: viewMode === 'before_only' ? '100%' : `${sliderPosition}%`,
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              borderRight: viewMode === 'split' ? '2px solid #000000' : 'none',
              boxShadow: viewMode === 'split' ? '2px 0 12px rgba(0, 0, 0, 0.15)' : 'none'
            }}
          >
            {/* Inner wrapper sized exactly to outer container so image doesn't squash */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={beforeImage}
                alt="Original Garment Flat-lay"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }}
              />
            </div>

            <span
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#000000',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                padding: '3px 8px',
                borderRadius: '4px',
                pointerEvents: 'none'
              }}
            >
              {beforeLabel}
            </span>
          </div>
        )}

        {/* DRAG HANDLE (Only visible in split mode) */}
        {beforeImage && viewMode === 'split' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPosition}%`,
              transform: 'translate(-50%, -50%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#000000',
              border: '2px solid #ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'ew-resize',
              zIndex: 10,
              pointerEvents: 'none',
              transition: isDragging ? 'none' : 'transform 0.1s ease'
            }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '-2px' }}>◀▶</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
        <span>Drag the center line or use keyboard ← → to compare fabric & drape</span>
        <span>Phase One 150MP Resolution</span>
      </div>
    </div>
  );
}
