!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="b8396d15-098c-59f0-bfe4-2a075a97c4f0")}catch(e){}}();const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./1a2c0e3d-qt7VMc2kCVWtb9dv.js","./1a2c0e3d-qkEQVTOfhOQDK3h0.js","./1a2c0e3d-WT7-FZ22RLi5rJnW.js","./1a2c0e3d-35HuCA9ZunOlmIga.js","./1a2c0e3d-Pf8INxYMCRI-tPPR.js","./1a2c0e3d-hu4uXBiL-IQJn9o2.js","./1a2c0e3d-vpQWWKdBwslpL-5u.js","./1a2c0e3d-PyxNIWEnYIaCX-QJ.js","./1a2c0e3d-mk3R8kDwGNHAPqvp.js","./1a2c0e3d-o7fPGNWZmdWvgxmx.js","./1a2c0e3d-KNPZJj8fQZaYwEZk.js","./1a2c0e3d-JtAFCZvNEGwO6uT3.js","./1a2c0e3d-X-wLJjkBoTAb917z.js","./1a2c0e3d-c4wa3JdPY5MK4a2G.js","./1a2c0e3d-DHo-FuCGt7kSraQf.js","./1a2c0e3d-ebb4dyE_VAoJSuFc.js","./1a2c0e3d-BdXYtDtmuZgBzVis.js","./1a2c0e3d-NKVD_f7YKfTNVsEI.js","./1a2c0e3d-bKb52-2438U67KZ6.js","./1a2c0e3d-76h_n-sQ7shzbvBx.js","./1a2c0e3d-QyUmfbYE3KVyhDIT.js","./1a2c0e3d-F7C_lUYA_BpUyQg_.js","./1a2c0e3d-7GTT1-MLSBhQEucT.js","./1a2c0e3d-ksJeWtLwlVvl0W9J.js","./1a2c0e3d-6Tgy9A36Lzdk5wg8.js","./1a2c0e3d-6dH7Qq-2KVAt13xE.js","./1a2c0e3d-vGOIeQ3YhD05xjTl.js","./1a2c0e3d-Hgq08B2LhHVtxial.js","./1a2c0e3d-BfgMm-ZNJAiS6yNG.js","./1a2c0e3d-RWmnJehfBhxCRSCD.js","./1a2c0e3d-h_XAJTTTndOQgRc1.js","./1a2c0e3d-bni-fSPnabmEA3u4.js","./1a2c0e3d-k4alPuAiIRxIfLPh.js","./1a2c0e3d-ToKbkaO1wU9U6WLA.css","./1a2c0e3d-hMa2Ild8dwt-6F-H.css","./1a2c0e3d-v2IlITZYB7Bne3xI.css","./1a2c0e3d-rOu4aQ4aBDawgJec.css"])))=>i.map(i=>d[i]);
import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{_ as t,v as n}from"./1a2c0e3d-Pf8INxYMCRI-tPPR.js";import{n as r}from"./1a2c0e3d-KPrYTroWkbqO3E_H.js";import{n as i}from"./1a2c0e3d-ksJeWtLwlVvl0W9J.js";import{f as a,g as o}from"./1a2c0e3d-BfgMm-ZNJAiS6yNG.js";function s(e){i(e,c,l)}var c,l;function u(){return(u=e(()=>{c=`fable-panel-inspector-styles`,l=`
.fable-inspector {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.fable-inspector .panel-header {
  flex: none;
  border-bottom: 1px solid var(--hf-color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
}
.fable-inspector .zoom-readout {
  font-variant-numeric: tabular-nums;
}

.fable-inspector .inspector-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 24px;
}

.fable-inspector .muted { color: var(--hf-color-text-tertiary); }
.fable-inspector fieldset.contents {
  display: contents;
  min-inline-size: 0;
  margin: 0;
  border: 0;
  padding: 0;
}
.fable-inspector .alignment-buttons {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 2px;
}
.fable-inspector .alignment-buttons > button { width: 100%; min-width: 0; }
.fable-inspector .num-readout {
  width: 38px;
  flex: none;
  text-align: right;
}

.fable-inspector .section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
  min-height: 22px;
}
.fable-inspector .section-title.clip-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fable-inspector .picker { flex: 1; min-width: 0; }
.fable-inspector .picker .fui-menu-wrap { width: 100%; }

/* AI Edit section: contributed verbs as a two-per-row button grid. */
.fable-inspector .ai-edit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

/* DaVinci-style paired axis fields (Position X/Y, Zoom X/Y, Skew X/Y …). */
.fable-inspector .axis-field {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.fable-inspector .axis-field .fui-number { width: 100%; flex: 1; }
.fable-inspector .axis-label {
  flex: none;
  width: 10px;
  text-align: center;
}

/* Angle field paired with a rotation slider. */
.fable-inspector .angle-field { width: 52px; flex: none; }

/* Per-row reset-to-default. */
.fable-inspector .reset-btn {
  width: 20px;
  height: 20px;
  flex: none;
  border: none;
  background: transparent;
  color: var(--hf-color-text-tertiary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
.fable-inspector .reset-btn:hover:not(:disabled) { color: var(--hf-color-text-primary); }
.fable-inspector .reset-btn:disabled { opacity: 0.35; cursor: default; }

/* Chain link between paired zoom fields. */
.fable-inspector .link-btn {
  width: 16px;
  height: 20px;
  flex: none;
  border: none;
  background: transparent;
  color: var(--hf-color-text-tertiary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
.fable-inspector .link-btn:hover { color: var(--hf-color-text-primary); }
.fable-inspector .link-btn.active { color: var(--hf-color-brand-primary); }

/* Blank slot matching the diamond/reset width so control columns align. */
.fable-inspector .ctl-spacer { width: 20px; flex: none; }

/* Keyframe diamond + prev/next navigation. */
.fable-inspector .kf-controls { display: inline-flex; align-items: center; flex: none; }
.fable-inspector .kf-diamond {
  width: 20px;
  height: 20px;
  flex: none;
  border: none;
  background: transparent;
  color: var(--hf-color-text-tertiary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
.fable-inspector .kf-diamond:hover { color: var(--hf-color-text-primary); }
.fable-inspector .kf-diamond.active { color: var(--hf-color-brand-primary); }
.fable-inspector .kf-nav {
  width: 14px;
  height: 20px;
  flex: none;
  border: none;
  background: transparent;
  color: var(--hf-color-text-tertiary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}
.fable-inspector .kf-nav:hover { color: var(--hf-color-text-primary); }

.fable-inspector .text-area {
  width: 100%;
  resize: vertical;
  min-height: 56px;
  font-family: inherit;
  margin-bottom: 4px;
}

/* Text style toggles. */
.fable-inspector .style-btn { background: var(--hf-color-background-tertiary); }
.fable-inspector .italic-btn { font-style: italic; font-family: Georgia, serif; }
.fable-inspector .bold-btn { font-weight: 700; }

/* Effects + animation entries. */
.fable-inspector .effect { padding: 4px 0; border-bottom: 1px solid var(--hf-color-border-subtle); }
.fable-inspector .effect:last-child { border-bottom: none; }
.fable-inspector .effect-row { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
.fable-inspector .effect-row .fx-label { flex: 1; }
.fable-inspector .anim-entry { padding: 4px 0; border-bottom: 1px solid var(--hf-color-border-subtle); }
.fable-inspector .anim-entry:last-child { border-bottom: none; }
.fable-inspector .anim-dir { width: 58px; flex: none; padding: 4px 6px; }
.fable-inspector .anim-hint { padding: 6px 0 2px; }

/* Easing picker + cubic-bezier popover. */
.fable-inspector .easing-picker {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}
.fable-inspector .easing-picker .fui-number { width: 48px; }
.fable-inspector .bezier-pop {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 1000;
  min-width: 0;
  padding: 10px;
}
.fable-inspector .bezier-canvas { width: 200px; height: 168px; }
.fable-inspector .bezier-canvas canvas {
  border-radius: var(--hf-radius-200);
  background: var(--hf-color-background-primary);
  cursor: crosshair;
}
.fable-inspector .bezier-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

/* Gradient strip editor. */
.fable-inspector .grad-strip {
  position: relative;
  height: 18px;
  margin: 6px 0 10px;
  border-radius: 6px;
  border: 1px solid var(--hf-color-border-subtle);
  cursor: copy;
  background-color: var(--hf-color-background-tertiary);
}
.fable-inspector .grad-handle {
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 10px;
  transform: translateX(-50%);
  border: 2px solid var(--hf-color-text-primary);
  border-radius: 4px;
  padding: 0;
  cursor: ew-resize;
}
.fable-inspector .grad-handle.active { border-color: var(--hf-color-brand-primary); }
`}))()}function d(e){p.push(e.extensions.register(`panel`,`fable.panel-inspector.panel`,r(()=>((e,t)=>{let n=globalThis.__HF_MOBILE_CHUNK_OBSERVER__;return n!=null&&n.load?n.load(e,t):e()})(()=>t(()=>import(`./1a2c0e3d-qt7VMc2kCVWtb9dv.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]),import.meta.url),new globalThis.URL(`./1a2c0e3d-qt7VMc2kCVWtb9dv.js`,import.meta.url).href),{styles:s})),e.extensions.register(`operator`,`fable.panel-inspector.setSpeed`,o()))}function f(){for(let e of p.splice(0))try{e.dispose()}catch(e){}}var p;function m(){return(m=e(()=>{a(),u(),n(),p=[]}))()}export{f as n,m as r,d as t};
//# debugId=b8396d15-098c-59f0-bfe4-2a075a97c4f0

//# chunkId=b8396d15-098c-59f0-bfe4-2a075a97c4f0