import React, { useState, useEffect } from 'react';
import HiggsfieldCinematicLoader from './HiggsfieldCinematicLoader';
import {
  Video,
  Camera,
  Film,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  CheckCircle2,
  HardDrive,
  Clock,
  Layers,
  Maximize2,
  Download,
  Eye,
  RefreshCw,
  ZoomIn,
  ArrowRight,
  ArrowDown,
  Zap,
  Grid,
  Check,
  Share2,
  ChevronRight,
  Sparkle,
  Upload,
  X
} from 'lucide-react';

// Cinematographic Director Camera Trajectory Presets
const CAMERA_TRAJECTORIES = [
  {
    id: 'dolly_in',
    name: 'High-Fashion Dolly-In',
    tag: 'Macro Texture Push',
    focalLength: '85mm f/1.4 Prime',
    desc: 'Slow, ultra-smooth push-in directly toward model, shifting focus onto lapels, drape, and micro-textile weave.',
    motionVector: 'Forward Z-Axis (+1.8m/s)',
    icon: ZoomIn
  },
  {
    id: 'orbit_360',
    name: '360° Bullet-Time Orbit',
    tag: 'Continuous Circular Arc',
    focalLength: '50mm Cinema Prime',
    desc: 'Seamless 360-degree orbital rotation around the model, capturing garment volume and silhouette from every angle.',
    motionVector: 'Radial Theta (360° / 4s)',
    icon: RotateCcw
  },
  {
    id: 'runway_truck',
    name: 'Runway Lateral Truck',
    tag: 'Catwalk Stride Pacing',
    focalLength: '70mm Telephoto',
    desc: 'Fluid lateral tracking matching the walking stride of the model along the concrete catwalk with natural motion blur.',
    motionVector: 'Linear X-Axis (+2.4m/s)',
    icon: ArrowRight
  },
  {
    id: 'crane_down',
    name: 'Overhead Jib Crane Drop',
    tag: 'Architectural Reveal',
    focalLength: '35mm Wide Anamorphic',
    desc: 'Cinematic jib crane sweeping vertically from high overhead establishing angle down into intimate eye-level portraiture.',
    motionVector: 'Vertical Y-Axis (-3.2m/s)',
    icon: ArrowDown
  },
  {
    id: 'handheld_editorial',
    name: 'French New-Wave Handheld',
    tag: 'Documentary Sway',
    focalLength: '50mm Natural Cooke',
    desc: 'Intimate handheld organic micro-sway, natural operator breathing, zero artificial robotic rigidity, Paris Vogue realism.',
    motionVector: 'Organic Perlin Noise (6-DoF)',
    icon: Video
  },
  {
    id: 'fpv_whip',
    name: 'Kinetic FPV Whip-Zoom',
    tag: 'Commercial Hook',
    focalLength: '24mm High-Speed Prime',
    desc: 'Dynamic high-energy whip pan followed by instant snap-zoom into hero hardware and tailoring details.',
    motionVector: 'Impulse Angular Snap (180°/0.4s)',
    icon: Zap
  }
];

// Curated Instagram High-Fashion Commercial Presets (With Couture Garments & Models)
const INSTAGRAM_COMMERCIAL_PRESETS = [
  {
    title: 'Tulle Cloud Ballgown',
    tag: 'Couture Catwalk',
    garment_name: 'Grand Voluminous Royal Blue Tulle Cloud Ballgown',
    garment_preview: '/assets/outputs/hero_champagne_gold_runway.jpg',
    garment_local: null,
    model_id: 'model_female_1',
    concept: 'A statuesque haute couture model walking gracefully down a Paris runway wearing a grand voluminous royal blue tulle cloud ballgown with majestic billowing layers, illuminated by soft atmospheric keylight and dramatic low-angle runway perspective.',
    camera: 'crane_down',
    lighting: 'Cinematic Studio Octabox (45° Key)',
    aspect: '9:16'
  },
  {
    title: 'Liquid Silver Runway',
    tag: 'Liquid Chrome',
    garment_name: 'Molten Liquid Silver Metallic Drape Evening Gown',
    garment_preview: '/assets/outputs/hero_liquid_silver_runway.jpg',
    garment_local: null,
    model_id: 'model_female_2',
    concept: 'An editorial model wearing a molten liquid silver evening dress with mirror-sheen metallic reflection walking forward on a dark wet reflective runway, illuminated by dramatic high-contrast volumetric studio spotlights.',
    camera: 'dolly_in',
    lighting: 'High-Contrast Runway Spotlight',
    aspect: '9:16'
  },
  {
    title: 'Bordeaux Velvet Cape',
    tag: 'Opulent Drama',
    garment_name: 'Deep Crimson Bordeaux Velvet Cape Dress with Gold Embroidery',
    garment_preview: '/assets/outputs/hero_bordeaux_velvet_runway.jpg',
    garment_local: null,
    model_id: 'model_female_3',
    concept: 'A dramatic 360-degree turnaround of an editorial model wearing an opulent deep crimson bordeaux velvet cape dress with sculptural shoulder drape and gold gilded embroidery on an obsidian misty runway.',
    camera: 'orbit_360',
    lighting: 'Golden Hour Backlit Rim Flare (2800K)',
    aspect: '9:16'
  },
  {
    title: 'Italian Wool Suit',
    tag: 'Tailored Menswear',
    garment_name: 'Double-Breasted Italian Charcoal Wool Suit with Silk Lapels',
    garment_preview: '/assets/models/model_male_2.png',
    garment_local: null,
    model_id: 'model_male_2',
    concept: 'A distinguished male model wearing a bespoke double-breasted Italian charcoal wool suit with crisp silk lapels, pacing with confident authority across a minimalist penthouse terrace overlooking the city skyline.',
    camera: 'dolly_in',
    lighting: 'Architectural Window Slat Sunlight',
    aspect: '9:16'
  },
  {
    title: 'Obsidian Leather Bomber',
    tag: 'Streetwear Catwalk',
    garment_name: 'Oversized Obsidian Black Patent Leather Bomber & Sneakers',
    garment_preview: '/assets/outputs/hero_obsidian_cyberpunk_runway.jpg',
    garment_local: null,
    model_id: 'model_male_1',
    concept: 'A fierce streetwear model wearing an oversized obsidian black patent leather bomber jacket and designer sneakers, pacing and turning on a rain-slicked asphalt catwalk with neon anamorphic light streaks.',
    camera: 'fpv_whip',
    lighting: 'High-Contrast Runway Spotlight',
    aspect: '9:16'
  },
  {
    title: 'Camel Cashmere Coat',
    tag: 'Quiet Luxury',
    garment_name: 'Tailored Double-Faced Camel Cashmere Overcoat with Horn Buttons',
    garment_preview: '/assets/garments/camel_cashmere_coat.png',
    garment_local: 'assets/garments/camel_cashmere_coat.png',
    model_id: 'model_female_4',
    concept: 'A statuesque model in a minimalist tailored double-breasted camel cashmere coat layered over black knitwear, moving with natural catwalk stride and subtle fabric flutter in a concrete architectural studio.',
    camera: 'runway_truck',
    lighting: 'Architectural Window Slat Sunlight',
    aspect: '9:16'
  },
  {
    title: 'Champagne Gilded Gown',
    tag: 'Golden Hour Gala',
    garment_name: 'Shimmering Champagne Gold Silk Gown with Micro-Sequin Luster',
    garment_preview: '/assets/outputs/hero_champagne_gold_runway.jpg',
    garment_local: null,
    model_id: 'model_female_1',
    concept: 'A high-fashion model wearing a shimmering champagne gold silk gown with micro-sequin luster walking forward on the catwalk, backlit by warm golden hour rim lighting that traces the fabric silhouette.',
    camera: 'dolly_in',
    lighting: 'Golden Hour Backlit Rim Flare (2800K)',
    aspect: '9:16'
  },
  {
    title: 'Vogue Linen & Silk',
    tag: 'French Editorial',
    garment_name: 'Relaxed Tailored White Linen Trousers & Raw Silk Blouse',
    garment_preview: '/assets/models/model_female_2.png',
    garment_local: null,
    model_id: 'model_female_2',
    concept: 'An intimate handheld Parisian editorial sequence of a model walking through warm sunlit studio daylight in relaxed tailored white linen trousers and a raw silk blouse with organic fabric sway.',
    camera: 'handheld_editorial',
    lighting: 'Pure Minimalist Cyclorama High-Key',
    aspect: '9:16'
  },
  {
    title: 'Avant-Garde Blazer',
    tag: 'Tokyo Catwalk',
    garment_name: 'Deconstructed Asymmetrical Monochromatic Charcoal Blazer',
    garment_preview: '/assets/models/model_male_3.png',
    garment_local: null,
    model_id: 'model_male_3',
    concept: 'An urban avant-garde runway model wearing a deconstructed asymmetrical monochromatic charcoal blazer and wide-leg tailored trousers, walking with sharp rhythmic stride on concrete runway.',
    camera: 'runway_truck',
    lighting: 'High-Contrast Runway Spotlight',
    aspect: '9:16'
  },
  {
    title: 'Dewy Glass-Skin Radiance',
    tag: 'Beauty Macro',
    garment_name: 'Minimalist Silk Camisole & Dewy Botanical Skin Treatment',
    garment_preview: '/assets/models/model_beauty_face.png',
    garment_local: null,
    model_id: 'model_female_3',
    concept: 'A commercial beauty macro sequence showcasing radiant dewy glass skin with natural subsurface scattering and softbox catchlights, model turning with subtle smile under warm studio illumination.',
    camera: 'dolly_in',
    lighting: 'Cinematic Studio Octabox (45° Key)',
    aspect: '9:16'
  }
];

// Curated Commercial Lighting Rigs
const LIGHTING_RIGS = [
  { id: 'octabox', label: 'Cinematic Studio Octabox (45° Key)', spec: 'Even beauty diffusion with sculptural wrap-around shadow falloff' },
  { id: 'golden_rim', label: 'Golden Hour Backlit Rim Flare (2800K)', spec: 'Low-angle warm sunlight tracing fabric silhouette and flyaway hairs' },
  { id: 'chiaroscuro', label: 'High-Contrast Runway Spotlight', spec: 'Dramatic razor-sharp contrast with deep editorial obsidian shadows' },
  { id: 'window_slat', label: 'Architectural Window Slat Sunlight', spec: 'Linear sunlight casting subtle geometric window shadows on cyclorama' },
  { id: 'clean_highkey', label: 'Pure Minimalist Cyclorama High-Key', spec: 'Shadowless clean commercial catalog illumination for e-commerce' }
];

// Aspect Ratio Options
const ASPECT_RATIOS = [
  { id: '9:16', label: '9:16 Vertical Reel', dims: '1080 × 1920', usage: 'TikTok / Instagram Reels / Mobile' },
  { id: '16:9', label: '16:9 Cinema Widescreen', dims: '1920 × 1080', usage: 'Commercial TV / Digital Billboard' },
  { id: '4:5', label: '4:5 Editorial Feed', dims: '1080 × 1350', usage: 'Instagram Portrait Lookbook' },
  { id: '1:1', label: '1:1 Square Format', dims: '1080 × 1080', usage: 'Luxury E-Commerce Grid' }
];

export default function AtelierCommercialVideo({ models = {}, onSelectModel }) {
  // Mode: 'prompt' (Direct from text concept via Instagram Cinema Engine) vs 'lookbook' (Animate existing shoot)
  const [sourceMode, setSourceMode] = useState('prompt');

  // Concept & Directing State
  const [concept, setConcept] = useState(
    'A statuesque high-fashion model wearing a molten liquid silver evening dress with mirror-sheen metallic drape, walking on a dark reflective wet runway illuminated by dramatic volumetric studio spotlights.'
  );
  const [cameraPreset, setCameraPreset] = useState('dolly_in');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [lighting, setLighting] = useState('High-Contrast Runway Spotlight');
  const [duration, setDuration] = useState(4);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [uploadedGarment, setUploadedGarment] = useState(null); // { filename, name, previewUrl, localPath }
  const [isUploadingGarment, setIsUploadingGarment] = useState(false);
  const garmentFileInputRef = React.useRef(null);

  const handleGarmentFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const rawBase = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    const cleanName = rawBase.charAt(0).toUpperCase() + rawBase.slice(1);

    setIsUploadingGarment(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/video/upload-garment', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedGarment({
          filename: file.name,
          name: cleanName,
          previewUrl: data.web_url || previewUrl,
          localPath: data.local_path
        });
        if (!concept || concept.includes('molten liquid silver')) {
          setConcept(`A high-fashion runway model wearing ${cleanName} walking on the catwalk with dramatic studio spotlights.`);
        }
      } else {
        alert('Failed to upload outfit image');
      }
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploadingGarment(false);
      if (garmentFileInputRef.current) garmentFileInputRef.current.value = '';
    }
  };

  const handleRemoveGarment = () => {
    setUploadedGarment(null);
  };

  // Reference Subject / Look State
  const [selectedHeroImage, setSelectedHeroImage] = useState('/assets/outputs/shoot_camel_cashmere_coat.png');
  const [recentShoots, setRecentShoots] = useState([]);

  // Synthesized Prompt State
  const [synthesizedPrompt, setSynthesizedPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  // Generation & Player State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [videoResult, setVideoResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load past shoots for hero look selection
  useEffect(() => {
    fetch('/api/history?limit=30')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (data && data.length > 0) {
          const validPhotos = data.filter((item) => {
            const p = (item.local_image_path || item.image_url || '').toLowerCase();
            return !p.endsWith('.mp4') && !p.includes('assets/garments') && !p.includes('assets\\garments');
          });
          setRecentShoots(validPhotos);
          // Prefer camel coat shoot or first curated look
          const coatShoot = validPhotos.find(
            (s) =>
              (s.local_image_path && s.local_image_path.includes('camel_cashmere_coat')) ||
              (s.garment_name && s.garment_name.includes('camel_cashmere_coat'))
          ) || validPhotos[0];
          if (coatShoot) {
            const url = coatShoot.local_image_path
              ? `/${coatShoot.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
              : (coatShoot.image_url || `/api/duckdb/photo/${coatShoot.shoot_id}`);
            setSelectedHeroImage(url);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Auto-synthesize Director Prompt on changes
  useEffect(() => {
    handleSynthesizePrompt();
  }, [concept, cameraPreset, aspectRatio, lighting, selectedModelId]);

  const handleSynthesizePrompt = async () => {
    setIsSynthesizing(true);
    const activeTrajectory = CAMERA_TRAJECTORIES.find((t) => t.id === cameraPreset);

    // Build ultra-clean local fallback prompt so UI is NEVER broken even if backend is starting
    const localPrompt = `Haute-couture commercial cinematography. Subject: ${concept.trim()}
Optics: Arri Alexa Mini LF, Master Prime ${activeTrajectory?.focalLength || '85mm'}, T1.3, authentic anamorphic flare, gentle roll-off.
Camera Kinematics: ${activeTrajectory?.name || 'High-Fashion Dolly-In'} (${activeTrajectory?.motionVector || 'Forward Z-Axis'}), perfectly smooth gimbal stabilization.
Lighting & Atmosphere: ${lighting}. Ambient floor contact shadows, pristine textile micro-pores.
Cadence: 24.0 fps master, 180° mechanical shutter angle, filmic temporal motion blur, ProRes 422 HQ 10-bit color.`;

    try {
      const res = await fetch('/api/video/commercial-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept,
          mode: 'ltx',
          camera_preset: cameraPreset,
          aspect_ratio: aspectRatio,
          lighting
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSynthesizedPrompt(data.commercial_prompt || localPrompt);
      } else {
        setSynthesizedPrompt(localPrompt);
      }
    } catch {
      setSynthesizedPrompt(localPrompt);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setVideoResult(null);
    setGenerationProgress(10);
    setStatusMessage('Connecting to ComfyUI LTX-2.5 Video Engine...');

    const startGenTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startGenTime) / 1000);
      setGenerationProgress((prev) => {
        let nextProg = 10;
        let msg = 'Initializing ComfyUI & Staging LTX-2.5 22B VRAM...';
        if (elapsed < 25) {
          nextProg = Math.min(24, 10 + Math.floor(elapsed * 0.6));
          msg = `Staging LTX-2.5 22B & Arri Alexa LF Kinematics (${elapsed}s)...`;
        } else if (elapsed < 320) {
          nextProg = Math.min(84, 24 + Math.floor((elapsed - 25) * 0.20));
          const stepNum = Math.min(8, Math.floor((elapsed - 25) / 37) + 1);
          msg = `LTX-2.5 DiT 24fps Latent Sampling (${elapsed}s elapsed · Diffusion Step ${stepNum}/8)...`;
        } else if (elapsed < 450) {
          nextProg = Math.min(95, 84 + Math.floor((elapsed - 320) * 0.09));
          msg = `Latent Upscaler & Tiled VAE Video Decode (${elapsed}s elapsed)...`;
        } else {
          nextProg = 96;
          msg = `Finalizing MP4 muxing & DuckDB video BLOB persistence (${elapsed}s)...`;
        }
        setStatusMessage(msg);
        return nextProg;
      });
    }, 1000);

    try {
      const activeModel = selectedModelId && models[selectedModelId] ? models[selectedModelId] : null;

      const res = await fetch('/api/video/generate-commercial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept,
          camera_preset: cameraPreset,
          aspect_ratio: aspectRatio,
          lighting,
          duration_sec: duration,
          reference_image_path: sourceMode === 'lookbook' ? selectedHeroImage : null,
          garment_image_path: uploadedGarment ? uploadedGarment.localPath : null,
          garment_name: uploadedGarment ? uploadedGarment.name : null,
          model_id: selectedModelId || null,
          model_archetype: activeModel ? (activeModel.archetype || activeModel.name) : null,
          model_image_path: activeModel ? activeModel.local_file : null
        })
      });

      clearInterval(progressTimer);
      setGenerationProgress(100);

      if (res.ok) {
        const data = await res.json();
        setVideoResult(data);
        setStatusMessage('Commercial Reel Master Complete');
      } else {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.detail || `Server returned error (${res.status})`;
        setStatusMessage(`Error: ${errMsg}`);
        alert(`Video Generation Notice: ${errMsg}`);
      }
    } catch (err) {
      clearInterval(progressTimer);
      setStatusMessage(`Connection Error: ${err.message}`);
      alert(`Network Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const activeTrajectory = CAMERA_TRAJECTORIES.find((t) => t.id === cameraPreset);
  const activeAspect = ASPECT_RATIOS.find((a) => a.id === aspectRatio);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* ── ATELIER STUDIO HEADER ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1px solid var(--border-hair)',
          paddingBottom: '1.2rem'
        }}
      >
        <div>
          <span className="heading-sub">ATELIER VII · DIRECTOR OF PHOTOGRAPHY & CINEMATOGRAPHY</span>
          <h1 className="heading-hero" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>
            Commercial Motion Studio
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <span className="eth-badge eth-badge-active">
            <span className="status-dot status-dot-pulse" /> HIGGSFIELD KINEMATICS
          </span>
          <span className="eth-badge">ARRI ALEXA 85MM</span>
          <span className="eth-badge">24 FPS MASTER</span>
        </div>
      </div>

      {/* ── MAIN STUDIO GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.25fr', gap: '2rem' }}>
        {/* ── LEFT COLUMN: DIRECTOR CONSOLE ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. INSTAGRAM COMMERCIAL CONCEPT & PROMPT */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
              <span className="heading-sub">01 / Commercial Concept & Fashion Prompt</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => setSourceMode('prompt')}
                  style={{
                    padding: '3px 9px',
                    fontSize: '0.66rem',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: sourceMode === 'prompt' ? '#000000' : 'rgba(0,0,0,0.06)',
                    color: sourceMode === 'prompt' ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  ✨ Direct from Prompt
                </button>
                <button
                  type="button"
                  onClick={() => setSourceMode('lookbook')}
                  style={{
                    padding: '3px 9px',
                    fontSize: '0.66rem',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: sourceMode === 'lookbook' ? '#000000' : 'rgba(0,0,0,0.06)',
                    color: sourceMode === 'lookbook' ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  🖼️ Animate Lookbook Shoot
                </button>
              </div>
            </div>

            {/* Prompt Text Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="eth-label" style={{ marginBottom: 0 }}>
                  Enter Any Fashion Garment, Lighting & Setting Concept:
                </label>
                <button
                  type="button"
                  onClick={handleSynthesizePrompt}
                  disabled={isSynthesizing}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.66rem',
                    color: '#000000',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'underline'
                  }}
                >
                  <RefreshCw size={10} className={isSynthesizing ? 'status-dot-pulse' : ''} />
                  Re-Compile Lens
                </button>
              </div>
              <textarea
                className="eth-textarea"
                rows={3}
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. Molten liquid silver evening dress on minimalist runway with volumetric spotlights..."
                style={{
                  fontSize: '0.82rem',
                  lineHeight: '1.45',
                  padding: '0.75rem',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid var(--border-hair)',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* ── BESPOKE OUTFIT / GARMENT UPLOAD DROPZONE ── */}
            <div style={{ marginTop: '0.85rem', marginBottom: '0.85rem' }}>
              <input 
                type="file" 
                ref={garmentFileInputRef} 
                onChange={handleGarmentFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />

              {!uploadedGarment ? (
                <div
                  onClick={() => garmentFileInputRef.current?.click()}
                  style={{
                    border: '1px dashed var(--border-hair)',
                    background: 'rgba(0,0,0,0.02)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-hair)'; e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Upload size={14} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.74rem', fontWeight: '600', margin: 0, color: '#000' }}>
                        {isUploadingGarment ? 'Uploading Outfit Photo...' : 'Upload Outfit / Garment for Commercial'}
                      </p>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                        PNG, JPG, or WEBP · Flat-lay, ghost mannequin, or product image
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ fontSize: '0.68rem', padding: '4px 10px', height: 'auto' }}
                    onClick={(e) => { e.stopPropagation(); garmentFileInputRef.current?.click(); }}
                  >
                    Choose File
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    border: '1px solid #000000',
                    background: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.6rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '52px', borderRadius: '4px', overflow: 'hidden', background: '#000', flexShrink: 0, border: '1px solid var(--border-hair)' }}>
                      <img src={uploadedGarment.previewUrl} alt="Outfit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.58rem', background: '#000', color: '#fff', padding: '1px 6px', borderRadius: '3px', fontWeight: '600', letterSpacing: '0.08em' }}>
                          HERO OUTFIT ATTACHED
                        </span>
                      </div>
                      <input
                        type="text"
                        value={uploadedGarment.name}
                        onChange={(e) => setUploadedGarment({ ...uploadedGarment, name: e.target.value })}
                        placeholder="Outfit name..."
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: 'none',
                          borderBottom: '1px dashed var(--border-hair)',
                          padding: '2px 0',
                          background: 'transparent',
                          outline: 'none',
                          width: '200px'
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveGarment}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.68rem'
                    }}
                    title="Remove attached outfit"
                  >
                    <X size={14} /> Remove
                  </button>
                </div>
              )}
            </div>

            {/* Curated Instagram Commercial Style Presets */}
            <div style={{ marginTop: '0.85rem' }}>
              <span className="eth-label" style={{ marginBottom: '0.4rem', display: 'block' }}>
                Curated Instagram Commercial Reels (Click to Direct)
              </span>
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {INSTAGRAM_COMMERCIAL_PRESETS.map((p, idx) => {
                  const isCurrent = concept === p.concept;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setConcept(p.concept);
                        setCameraPreset(p.camera);
                        setLighting(p.lighting);
                        setAspectRatio(p.aspect);
                        if (p.model_id) setSelectedModelId(p.model_id);
                        if (p.garment_name) {
                          setUploadedGarment({
                            filename: `${p.garment_name.toLowerCase().replace(/\s+/g, '_')}.png`,
                            name: p.garment_name,
                            previewUrl: p.garment_preview || '/assets/garments/camel_cashmere_coat.png',
                            localPath: p.garment_local || null
                          });
                        }
                        setSourceMode('prompt');
                      }}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: isCurrent ? '1px solid #000000' : '1px solid var(--border-hair)',
                        background: isCurrent ? '#000000' : '#ffffff',
                        color: isCurrent ? '#ffffff' : '#000000',
                        fontSize: '0.68rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <Sparkles size={11} color={isCurrent ? '#ffffff' : 'var(--text-secondary)'} />
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MODEL PERSONA ROSTER SELECTOR */}
            <div style={{ marginTop: '1.2rem', borderTop: '1px solid var(--border-hair)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span className="eth-label">
                  Featured Model Persona (Optional or Auto from Prompt)
                </span>
                {selectedModelId && (
                  <button 
                    type="button" 
                    onClick={() => setSelectedModelId('')} 
                    style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Clear Selection (Auto Detect)
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                <div
                  onClick={() => setSelectedModelId('')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: selectedModelId === '' ? '2px solid #000000' : '1px solid var(--border-hair)',
                    background: selectedModelId === '' ? 'var(--surface-sunken)' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '74px',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Sparkles size={16} color={selectedModelId === '' ? '#000000' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '0.72rem', fontWeight: '600', marginTop: '0.3rem' }}>Auto from Prompt</span>
                  <span style={{ fontSize: '0.60rem', color: 'var(--text-secondary)' }}>Matches characters</span>
                </div>

                {Object.entries(models).map(([mId, model]) => {
                  const isSelected = selectedModelId === mId;
                  const mImg = model.local_file 
                    ? `/${model.local_file.replace(/\\/g, '/').replace(/^\/+/, '')}`
                    : (model.image_url || '/assets/models/model_female_1.png');

                  return (
                    <div
                      key={mId}
                      onClick={() => {
                        setSelectedModelId(mId);
                        if (onSelectModel) onSelectModel(mId);
                      }}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid #000000' : '1px solid var(--border-hair)',
                        background: isSelected ? 'var(--surface-sunken)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all var(--transition-fast)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ width: '36px', height: '48px', borderRadius: '4px', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
                        <img src={mImg} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                        <p style={{ fontSize: '0.70rem', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {model.name?.split(':')[0] || mId}
                        </p>
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                          {model.gender || 'Model'}
                        </span>
                      </div>
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '4px', right: '4px' }}>
                          <CheckCircle2 size={12} color="#000000" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Lookbook Subject Strip if in Lookbook Mode */}
            {sourceMode === 'lookbook' && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-hair)', paddingTop: '0.85rem' }}>
                <span className="eth-label" style={{ marginBottom: '0.4rem' }}>
                  Select Reference Shoot from Lookbook
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                  {recentShoots.slice(0, 8).map((shoot, idx) => {
                    const imgUrl = shoot.local_image_path
                      ? `/${shoot.local_image_path.replace(/\\/g, '/').replace(/^\/+/, '')}`
                      : (shoot.image_url || `/api/duckdb/photo/${shoot.shoot_id}`);
                    const isSelected = selectedHeroImage === imgUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedHeroImage(imgUrl)}
                        style={{
                          width: '46px',
                          height: '60px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid #000000' : '1px solid var(--border-hair)',
                          padding: 0,
                          background: '#000',
                          cursor: 'pointer',
                          flexShrink: 0,
                          opacity: isSelected ? 1 : 0.65,
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <img src={imgUrl} alt="Shoot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. CAMERA TRAJECTORY SELECTION (HIGGSFIELD ANGLE) */}
          <div className="eth-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
              <span className="heading-sub">02 / DoP Camera Trajectory</span>
              <span className="formula-tag">HIGGSFIELD 6-DOF</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {CAMERA_TRAJECTORIES.map((traj) => {
                const isSelected = cameraPreset === traj.id;
                const IconComponent = traj.icon;
                return (
                  <div
                    key={traj.id}
                    onClick={() => setCameraPreset(traj.id)}
                    style={{
                      background: isSelected ? '#000000' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#000000',
                      border: isSelected ? '1px solid #000000' : '1px solid var(--border-hair)',
                      borderRadius: '8px',
                      padding: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '110px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <IconComponent size={16} color={isSelected ? '#ffffff' : '#000000'} />
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 6px',
                            borderRadius: '999px',
                            background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                          }}
                        >
                          {traj.focalLength}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', fontWeight: 600, margin: '0 0 0.2rem 0' }}>{traj.name}</p>
                      <p
                        style={{
                          fontSize: '0.68rem',
                          color: isSelected ? 'rgba(255, 255, 255, 0.75)' : 'var(--text-secondary)',
                          lineHeight: 1.35,
                          margin: 0
                        }}
                      >
                        {traj.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-mono)',
                        color: isSelected ? 'rgba(255, 255, 255, 0.55)' : 'var(--text-muted)'
                      }}
                    >
                      {traj.motionVector}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. OPTICAL DIRECTIVES: ASPECT RATIO, LIGHTING, DURATION */}
          <div className="eth-card">
            <span className="heading-sub">03 / Optical Specs & Cadence</span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.9rem', marginTop: '1rem' }}>
              {/* Aspect Ratio */}
              <div>
                <label className="eth-label">Aspect Ratio</label>
                <select
                  className="eth-select"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {ASPECT_RATIOS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <p className="formula-tag" style={{ fontSize: '0.6rem', marginTop: '0.3rem' }}>
                  {activeAspect?.dims}
                </p>
              </div>

              {/* Lighting */}
              <div>
                <label className="eth-label">Lighting Rig</label>
                <select
                  className="eth-select"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {LIGHTING_RIGS.map((l) => (
                    <option key={l.id} value={l.label}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <p className="formula-tag" style={{ fontSize: '0.6rem', marginTop: '0.3rem' }}>
                  Studio Calibrated
                </p>
              </div>

              {/* Duration */}
              <div>
                <label className="eth-label">Shot Length</label>
                <select
                  className="eth-select"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value={3}>3s · 72 Frames (Teaser)</option>
                  <option value={5}>5s · 120 Frames (Standard)</option>
                  <option value={8}>8s · 192 Frames (Director Cut)</option>
                </select>
                <p className="formula-tag" style={{ fontSize: '0.6rem', marginTop: '0.3rem' }}>
                  24.0 FPS · 180° Shutter
                </p>
              </div>
            </div>



            {/* Accordion: Compiled 5-Layer Cinematographic Prompt */}
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-hair)', paddingTop: '0.8rem' }}>
              <button
                type="button"
                onClick={() => setShowPromptDetails(!showPromptDetails)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <ChevronRight
                  size={14}
                  style={{
                    transform: showPromptDetails ? 'rotate(90deg)' : 'none',
                    transition: 'transform var(--transition-fast)'
                  }}
                />
                {showPromptDetails ? 'Hide Cinematographic Directive' : 'Inspect 5-Layer Director Trajectory'}
              </button>
              {showPromptDetails && (
                <div
                  style={{
                    marginTop: '0.8rem',
                    background: '#09090b',
                    padding: '0.9rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-hair)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="formula-tag" style={{ color: '#ffffff' }}>
                      ARRI ALEXA MINI · MINIMAX H3 PIPELINE
                    </span>
                    <span className="formula-tag" style={{ color: 'var(--text-muted)' }}>
                      PRORES 422 HQ
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.55',
                      whiteSpace: 'pre-line',
                      margin: 0
                    }}
                  >
                    {synthesizedPrompt}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DISPATCH ACTION BUTTON */}
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '0.82rem', letterSpacing: '0.14em' }}
            disabled={isGenerating}
            onClick={handleGenerateVideo}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={16} className="status-dot-pulse" /> Directing Commercial Reel ({generationProgress}%)...
              </>
            ) : (
              <>
                <Video size={16} /> Direct & Render Commercial Video Reel
              </>
            )}
          </button>
        </div>

        {/* ── RIGHT COLUMN: ARRI DIRECTOR OPTICAL MONITOR ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="eth-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Monitor Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="heading-sub">Optical Viewfinder</span>
                <span className="formula-tag">ARRI DIRECTOR MONITOR</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowGrid(!showGrid)}
                  className="btn-secondary"
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.66rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: showGrid ? '#000000' : 'transparent',
                    color: showGrid ? '#ffffff' : 'var(--text-secondary)'
                  }}
                  title="Toggle Rule-of-Thirds Framing Reticle"
                >
                  <Grid size={11} /> {showGrid ? 'Grid: ON' : 'Grid: OFF'}
                </button>
                <span className="eth-badge">{aspectRatio}</span>
              </div>
            </div>

            {/* Viewfinder Main Bezel (Sleek Monolith Cinema Monitor) */}
            <div
              style={{
                flex: 1,
                minHeight: '480px',
                background: '#070709',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
              }}
            >
              {/* OSD (On-Screen Display) Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              >
                {/* REC Status & Timecode */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isGenerating ? '#ef4444' : '#22c55e',
                      boxShadow: isGenerating ? '0 0 10px #ef4444' : 'none',
                      animation: isGenerating ? 'pulseDot 1s infinite' : 'none'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: isGenerating ? '#ef4444' : '#ffffff',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {isGenerating ? `REC 00:00:0${Math.floor(generationProgress / 20)}:18` : `STBY 00:00:0${duration}:00`}
                  </span>
                </div>

                {/* Sensor & Color Metadata */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      background: 'rgba(0, 0, 0, 0.65)',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}
                  >
                    1080P · 24 FPS
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      background: 'rgba(0, 0, 0, 0.65)',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}
                  >
                    ARRI RAW
                  </span>
                </div>
              </div>

              {/* Bottom OSD Bar: Lens, Shutter, ISO */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}
                >
                  {activeTrajectory?.focalLength} · 180° SHUTTER
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}
                >
                  TRAJECTORY: {activeTrajectory?.tag.toUpperCase()}
                </span>
              </div>

              {/* Rule-of-Thirds Grid Reticle */}
              {showGrid && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 5,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 1fr'
                  }}
                >
                  <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.12)', borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.12)', borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.12)', borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  {/* Center Reticle crosshair */}
                  <div
                    style={{
                      borderRight: '1px dashed rgba(255, 255, 255, 0.12)',
                      borderBottom: '1px dashed rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ width: '12px', height: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '50%' }} />
                  </div>
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.12)' }} />
                  <div />
                </div>
              )}

              {/* Viewfinder Content: Generating state, Video Result, or Staged Framing */}
              {isGenerating ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 6, display: 'flex' }}>
                  <HiggsfieldCinematicLoader
                    progress={generationProgress}
                    statusMessage={statusMessage}
                    cameraPreset={cameraPreset}
                    aspectRatio={aspectRatio}
                    duration={duration}
                    concept={concept}
                  />
                </div>
              ) : videoResult?.video_url ? (
                /* COMPLETED VIDEO REEL */
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <video
                    key={videoResult.video_url || videoResult.shoot_id}
                    src={videoResult.video_url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '480px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}
                    onError={(e) => {
                      if (videoResult.shoot_id && !e.target.dataset.triedBlob) {
                        e.target.dataset.triedBlob = "true";
                        e.target.src = `/api/duckdb/video/${videoResult.shoot_id}`;
                      }
                    }}
                  />
                </div>
              ) : (
                /* STAGED CALIBRATION (LIVE FRAMING PREVIEW OF HERO LOOK OR PROMPT STAGE) */
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {sourceMode === 'lookbook' ? (
                    <img
                      src={selectedHeroImage}
                      alt="Hero Stage Subject"
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '480px',
                        objectFit: 'contain',
                        opacity: 0.88,
                        filter: 'contrast(1.05)'
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/outputs/shoot_camel_cashmere_coat.png';
                      }}
                    />
                  ) : (
                    /* Instagram Reel Haute Couture Optical Preview Stage */
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '420px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06) 0%, rgba(10,12,16,0.95) 75%)',
                        padding: '2.5rem',
                        textAlign: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          border: '1px solid rgba(255,255,255,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.2rem',
                          background: 'rgba(255,255,255,0.04)',
                          boxShadow: '0 0 24px rgba(255,255,255,0.06)'
                        }}
                      >
                        <Video size={28} color="#ffffff" />
                      </div>
                      <span className="formula-tag" style={{ color: '#ffffff', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
                        INSTAGRAM CINEMATIC REEL STAGE
                      </span>
                      <p
                        style={{
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          maxWidth: '380px',
                          lineHeight: '1.45',
                          margin: '0 0 0.8rem 0'
                        }}
                      >
                        "{concept.length > 90 ? concept.slice(0, 90) + '...' : concept}"
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span className="formula-tag" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          SPEED RAMP 1.5X ➔ 0.5X ➔ 1.8X
                        </span>
                        <span className="formula-tag" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          ANAMORPHIC FLARE
                        </span>
                        <span className="formula-tag" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          24 FPS MASTER
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Ambient Viewport Callout */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      background: 'rgba(0, 0, 0, 0.72)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '999px',
                      padding: '0.45rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      pointerEvents: 'none'
                    }}
                  >
                    <Camera size={13} />
                    <span>Optical Stage Calibrated · Ready to Film</span>
                  </div>
                </div>
              )}
            </div>

            {/* Viewfinder Footer Actions */}
            {videoResult && (
              <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.8rem' }}>
                <a
                  href={videoResult.video_url}
                  download={`commercial_reel_${Date.now()}.mp4`}
                  className="btn-primary"
                  style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
                >
                  <Download size={14} /> Download Reel Master (1080p MP4)
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setVideoResult(null);
                    setSelectedHeroImage('/assets/outputs/shoot_camel_cashmere_coat.png');
                  }}
                  className="btn-secondary"
                  style={{ padding: '0 1.2rem' }}
                >
                  <RefreshCw size={13} /> Reset Viewport
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
