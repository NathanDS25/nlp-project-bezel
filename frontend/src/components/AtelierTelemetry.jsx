import React, { useState, useEffect } from 'react';
import { Database, Search, Trash2, Clock, CheckCircle2, RefreshCw, Download, FileArchive, Eye, X, Check } from 'lucide-react';

export default function AtelierTelemetry() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/history?limit=100');
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncDuckDb = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/duckdb/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSyncStatus(data.stats);
        await fetchHistory();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (shootId) => {
    if (!window.confirm('Delete this shoot log from DuckDB?')) return;
    try {
      const res = await fetch(`/api/history/${shootId}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory(prev => prev.filter(h => h.shoot_id !== shootId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all shoot records from DuckDB?')) return;
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) setHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  // KPIs
  const total = history.length;
  const withBlobs = history.filter(h => h.has_blob || h.local_image_path).length;
  const times = history.map(h => h.render_time_sec).filter(Boolean);
  const avgTime = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : 0;
  const scopes = history.map(h => h.garment_scope).filter(Boolean);
  const topScope = scopes.length ? scopes.sort((a, b) => scopes.filter(v => v === a).length - scopes.filter(v => v === b).length).pop() : 'Commercial';

  const filtered = history.filter(h => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      h.brief?.toLowerCase().includes(q) ||
      h.prompt_used?.toLowerCase().includes(q) ||
      h.garment_name?.toLowerCase().includes(q) ||
      h.model_archetype?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hair)', paddingBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="heading-sub">DUCKDB & CHROMADB TELEMETRY STORE</span>
          <h1 className="heading-hero" style={{ fontSize: '1.6rem', marginTop: '0.3rem' }}>Database Archive & Photos</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            onClick={handleSyncDuckDb} 
            disabled={syncing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}
          >
            <Database size={14} className={syncing ? 'status-dot-pulse' : ''} />
            {syncing ? 'Syncing...' : 'Sync Media to DuckDB'}
          </button>
          <a
            href="/api/export/lookbook-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Download size={13} /> Export PDF
          </a>
          <a
            href="/api/history/export?format=csv"
            download="atelier_history.csv"
            className="btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Download size={13} /> Export CSV
          </a>
          <button className="btn-secondary" onClick={fetchHistory} disabled={loading}>
            <RefreshCw size={13} className={loading ? 'status-dot-pulse' : ''} /> Refresh
          </button>
          {total > 0 && (
            <button className="btn-secondary" style={{ borderColor: 'rgba(255, 80, 80, 0.4)', color: '#ff6666' }} onClick={handleClearAll}>
              <Trash2 size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* SYNC NOTIFICATION BANNER */}
      {syncStatus && (
        <div style={{ background: '#f5f5f7', border: '1px solid var(--border-hair)', padding: '0.8rem 1.2rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Check size={16} color="#000" />
            <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
              DuckDB Synchronized: {syncStatus.total_shoots} total records, {syncStatus.shoots_with_blobs} binary media blobs (photos & videos) verified.
            </span>
          </div>
          <button className="btn-icon" onClick={() => setSyncStatus(null)}>✕</button>
        </div>
      )}

      {/* KPI METRICS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        <div className="eth-card">
          <span className="heading-sub">Total Stored Shoots</span>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '2.2rem', color: 'var(--text-pure)', marginTop: '0.3rem' }}>{total}</p>
          <span className="formula-tag">BEZEL_BDA.DUCKDB</span>
        </div>

        <div className="eth-card">
          <span className="heading-sub">DuckDB Binary Media Blobs</span>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '2.2rem', color: 'var(--text-pure)', marginTop: '0.3rem' }}>{withBlobs}</p>
          <span className="formula-tag">PHOTOS & VIDEOS IN DATABASE</span>
        </div>

        <div className="eth-card">
          <span className="heading-sub">Average Render Latency</span>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '2.2rem', color: 'var(--text-pure)', marginTop: '0.3rem' }}>{avgTime}s</p>
          <span className="formula-tag">DIFFUSION INFERENCE</span>
        </div>

        <div className="eth-card">
          <span className="heading-sub">ChromaDB Vector Store</span>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '1.8rem', color: 'var(--text-pure)', marginTop: '0.5rem' }}>Active ●</p>
          <span className="formula-tag">SEMANTIC SEARCH READY</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="eth-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search shoots by prompt, garment, or model archetype..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* SHOOTS GRID */}
      {filtered.length === 0 ? (
        <div className="eth-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: '500' }}>
            No Shoots Found
          </p>
          <p className="formula-tag">CLICK "SYNC PICTURES TO DUCKDB" TO IMPORT ALL WORKSPACE ASSETS</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((item) => {
            const rawPath = item.output_image_path || item.local_image_path || item.image_url || '';
            const normalizedPath = rawPath.startsWith('http') 
              ? rawPath 
              : (rawPath ? (rawPath.startsWith('/') ? rawPath : `/${rawPath.replace(/\\/g, '/')}`) : null);

            const isVideo = item.garment_scope === 'video_commercial' ||
              (item.photo_type && item.photo_type.toLowerCase().includes('video')) ||
              (item.garment_name && item.garment_name.toLowerCase().endsWith('.mp4')) ||
              (item.local_image_path && item.local_image_path.toLowerCase().endsWith('.mp4')) ||
              (item.image_url && item.image_url.toLowerCase().endsWith('.mp4'));

            const duckDbBlobUrl = isVideo ? `/api/duckdb/video/${item.shoot_id}` : `/api/duckdb/photo/${item.shoot_id}`;
            const displayMedia = duckDbBlobUrl || normalizedPath;

            return (
              <div key={item.shoot_id} className="eth-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{ height: '230px', background: '#0a0a0c', borderRadius: '4px', border: '1px solid var(--border-hair)', overflow: 'hidden', marginBottom: '1rem', position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setPreviewItem(item)}
                  title={isVideo ? "Click to inspect & play full video from DuckDB BLOB" : "Click to inspect full photo from DuckDB BLOB"}
                >
                  {isVideo ? (
                    <video 
                      src={displayMedia} 
                      muted 
                      playsInline 
                      autoPlay 
                      loop 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <img 
                      src={displayMedia} 
                      alt="Shoot Output" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        if (!e.target.dataset.triedBlob) {
                          e.target.dataset.triedBlob = "true";
                          e.target.src = duckDbBlobUrl;
                        }
                      }}
                    />
                  )}
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.58rem', padding: '2px 7px', borderRadius: '3px', background: isVideo ? '#1a1a2e' : '#000000', color: '#ffffff', border: isVideo ? '1px solid #4a5568' : 'none', fontWeight: '600', letterSpacing: '0.12em' }}>
                    {isVideo ? 'DUCKDB VIDEO BLOB' : 'DUCKDB BLOB'}
                  </span>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.85)', padding: '4px 6px', borderRadius: '3px', border: '1px solid var(--border-hair)' }}>
                    <Eye size={12} color="#000" />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span className="formula-tag">{item.shoot_id}</span>
                  <span className="eth-badge">{item.render_time_sec}s</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-pure)', fontWeight: '600', marginBottom: '0.3rem' }}>
                  {item.garment_name || (isVideo ? 'Commercial Video Shoot' : 'Production Shoot')}
                </p>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.8rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.prompt_used || item.brief || 'Commercial Atelier Shoot'}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-hair)', paddingTop: '0.8rem', marginTop: 'auto' }}>
                  <span className="formula-tag">{item.created_at_str || String(item.created_at || '').slice(0, 10) || 'SAVED'}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <a
                      href={duckDbBlobUrl}
                      download={isVideo ? `commercial_${item.shoot_id}.mp4` : `shoot_${item.shoot_id}.png`}
                      className="btn-icon"
                      title={isVideo ? "Download MP4 directly from DuckDB BLOB" : "Download image from DuckDB BLOB"}
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Download size={13} />
                    </a>
                    <button
                      className="btn-icon"
                      onClick={() => handleDelete(item.shoot_id)}
                      title="Delete Record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FULL RESOLUTION DUCKDB MEDIA INSPECTION MODAL */}
      {previewItem && (() => {
        const isModalVideo = previewItem.garment_scope === 'video_commercial' ||
          (previewItem.photo_type && previewItem.photo_type.toLowerCase().includes('video')) ||
          (previewItem.garment_name && previewItem.garment_name.toLowerCase().endsWith('.mp4')) ||
          (previewItem.local_image_path && previewItem.local_image_path.toLowerCase().endsWith('.mp4')) ||
          (previewItem.image_url && previewItem.image_url.toLowerCase().endsWith('.mp4'));
        const modalMediaUrl = isModalVideo ? `/api/duckdb/video/${previewItem.shoot_id}` : `/api/duckdb/photo/${previewItem.shoot_id}`;

        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 400,
              padding: '2rem'
            }}
            onClick={() => setPreviewItem(null)}
          >
            <div
              className="eth-card"
              style={{
                maxWidth: '850px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <span className="heading-sub">{isModalVideo ? 'DUCKDB VIDEO BLOB STREAM (MP4)' : 'DUCKDB BINARY BLOB VIEWER'}</span>
                  <h3 className="heading-hero" style={{ fontSize: '1.1rem', marginTop: '2px' }}>
                    Shoot {previewItem.shoot_id} {isModalVideo ? '• 24fps Cinema' : ''}
                  </h3>
                </div>
                <button className="btn-icon" onClick={() => setPreviewItem(null)}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ background: '#000000', borderRadius: '4px', overflow: 'hidden', textAlign: 'center', marginBottom: '1rem', border: '1px solid var(--border-hair)', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isModalVideo ? (
                  <video
                    src={modalMediaUrl}
                    controls
                    autoPlay
                    playsInline
                    style={{ maxHeight: '60vh', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <img
                    src={modalMediaUrl}
                    alt="Full DuckDB BLOB"
                    style={{ maxHeight: '60vh', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      const fallback = previewItem.image_url || previewItem.local_image_path;
                      if (fallback && !e.target.dataset.triedFallback) {
                        e.target.dataset.triedFallback = "true";
                        e.target.src = fallback.startsWith('/') ? fallback : `/${fallback}`;
                      }
                    }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="formula-tag">MEDIA / ASSET:</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: '600' }}>{previewItem.garment_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="formula-tag">STORAGE LAYER:</span>
                  <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>DuckDB BLOB Store + Streaming Cache</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="formula-tag">RENDER LATENCY:</span>
                  <span style={{ fontSize: '0.78rem' }}>{previewItem.render_time_sec} seconds</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="formula-tag">CREATED:</span>
                  <span style={{ fontSize: '0.78rem' }}>{previewItem.created_at_str || 'Archived'}</span>
                </div>
                <div style={{ marginTop: '0.6rem' }}>
                  <span className="formula-tag">PROMPT & INSTRUCTION:</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: '1.4' }}>
                    {previewItem.prompt_used || previewItem.brief}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <a
                  href={modalMediaUrl}
                  download={isModalVideo ? `commercial_${previewItem.shoot_id}.mp4` : `duckdb_${previewItem.shoot_id}.png`}
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}
                >
                  <Download size={13} /> {isModalVideo ? 'Download MP4 from DuckDB BLOB' : 'Download Raw BLOB Image'}
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
