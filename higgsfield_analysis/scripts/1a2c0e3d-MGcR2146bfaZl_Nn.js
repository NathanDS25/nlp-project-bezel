!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="f25eaffe-274a-5985-a538-f6f12824eed2")}catch(e){}}();const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./1a2c0e3d-9rSeafVT6mmkqmz3.js","./1a2c0e3d-qkEQVTOfhOQDK3h0.js","./1a2c0e3d-WT7-FZ22RLi5rJnW.js","./1a2c0e3d-35HuCA9ZunOlmIga.js","./1a2c0e3d-Pf8INxYMCRI-tPPR.js","./1a2c0e3d-hu4uXBiL-IQJn9o2.js","./1a2c0e3d-vpQWWKdBwslpL-5u.js","./1a2c0e3d-PyxNIWEnYIaCX-QJ.js","./1a2c0e3d-mk3R8kDwGNHAPqvp.js","./1a2c0e3d-o7fPGNWZmdWvgxmx.js","./1a2c0e3d-KNPZJj8fQZaYwEZk.js","./1a2c0e3d-JtAFCZvNEGwO6uT3.js","./1a2c0e3d-AnYPRFSRKsJQH3X2.js","./1a2c0e3d-c4wa3JdPY5MK4a2G.js","./1a2c0e3d-vGOIeQ3YhD05xjTl.js","./1a2c0e3d-WeJCQLPrsrB_eKsK.js","./1a2c0e3d-7GTT1-MLSBhQEucT.js","./1a2c0e3d-E1LN-7E64T12es97.js","./1a2c0e3d-KTBJCTnyBhN49FzO.js","./1a2c0e3d-ksJeWtLwlVvl0W9J.js","./1a2c0e3d-6Tgy9A36Lzdk5wg8.js","./1a2c0e3d-6dH7Qq-2KVAt13xE.js","./1a2c0e3d-CM28QYo5iXErnxps.js","./1a2c0e3d-Hgq08B2LhHVtxial.js","./1a2c0e3d-h_XAJTTTndOQgRc1.js","./1a2c0e3d-RWmnJehfBhxCRSCD.js","./1a2c0e3d-bni-fSPnabmEA3u4.js","./1a2c0e3d-k4alPuAiIRxIfLPh.js","./1a2c0e3d-OQUGqcBW_HPkwJ3S.js","./1a2c0e3d-ToKbkaO1wU9U6WLA.css","./1a2c0e3d-hMa2Ild8dwt-6F-H.css","./1a2c0e3d-v2IlITZYB7Bne3xI.css","./1a2c0e3d-rOu4aQ4aBDawgJec.css"])))=>i.map(i=>d[i]);
import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{_ as t,v as n}from"./1a2c0e3d-Pf8INxYMCRI-tPPR.js";import{n as r}from"./1a2c0e3d-KPrYTroWkbqO3E_H.js";import{n as i}from"./1a2c0e3d-ksJeWtLwlVvl0W9J.js";function a(e){i(e,s,o)}var o,s;function c(){return(c=e(()=>{o=`
.fv-root {
  position: relative;
  height: 100%;
  min-height: 240px;
  overflow: hidden;
  background: var(--hf-color-background-primary);
  display: flex;
  flex-direction: column;
}
.fv-design-title { display: none; }
.fv-stage {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
}
.fv-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.fv-context-toolbar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  display: none;
  align-items: center;
  gap: 3px;
  padding: 4px;
  border: 1px solid var(--hf-color-border-default);
  border-radius: 8px;
  background: var(--hf-color-background-tertiary);
  color: var(--hf-color-text-primary);
  box-shadow: 0 4px 12px var(--hf-color-overlay-dim-soft);
  user-select: none;
}
.fshell[data-view-mode="contextual"] .fv-context-toolbar:not([hidden]) { display: flex; }
.fv-context-toolbar[hidden] { display: none; }
.fv-context-toolbar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.fv-context-toolbar button:hover { background: var(--hf-color-overlay-hover); }
.fv-context-toolbar button:focus-visible { outline: 2px solid var(--hf-color-border-focus); outline-offset: 1px; }
.fv-context-toolbar button[aria-pressed="true"],
.fv-context-toolbar button.active { background: var(--hf-color-brand-primary); color: var(--hf-color-text-inverse); }
.fv-context-toolbar button:disabled { opacity: 0.4; cursor: default; }
.fv-context-divider { width: 1px; height: 18px; background: var(--hf-color-border-subtle); }
.fv-context-editor {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  z-index: 20;
  transform: translateX(-50%);
  width: 320px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid var(--hf-color-border-default);
  border-radius: 8px;
  background: var(--hf-color-background-secondary);
  color: var(--hf-color-text-primary);
  box-shadow: 0 8px 24px var(--hf-color-overlay-dim-soft);
  font: 400 var(--hf-type-size-100) / var(--hf-type-line-height-300) var(--hf-type-family-primary);
  user-select: none;
}
.fv-context-editor-title,
.fv-context-editor-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.fv-context-editor-title {
  justify-content: space-between;
  min-height: 28px;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--hf-color-border-subtle);
  font-weight: 600;
}
.fv-context-editor-name {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.fv-context-editor-row {
  min-height: 34px;
  color: var(--hf-color-text-tertiary);
}
.fv-context-editor-row > span:first-child { width: 72px; flex: none; }
.fv-context-editor-row .fui-slider { min-width: 0; }
.fv-context-value {
  width: 34px;
  flex: none;
  color: var(--hf-color-text-primary);
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.fv-context-align {
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  background: var(--hf-color-background-primary);
}
.fv-context-align button { height: 24px; min-width: 26px; padding: 0 4px; }
.fv-context-number {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  color: var(--hf-color-text-tertiary);
}
.fv-context-number .fui-number { width: 62px; }
.fv-context-rotation { width: 100%; flex: 1; }
.fv-context-editor .fui-color-field { flex: 1; }
.fv-context-editor .fui-hex { width: 100%; }
.fv-scene-controls {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 10px;
  border-top: 1px solid var(--hf-color-border-subtle);
  background: var(--hf-color-background-primary);
  z-index: 10;
  user-select: none;
}
.fv-scene-controls .fv-sc-side {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: max-content;
}
.fv-scene-controls .fv-sc-right {
  justify-content: flex-end;
}
.fv-scene-controls .fv-sc-timecode {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--hf-color-text-tertiary);
}
.fv-scene-controls .fv-sc-current {
  color: var(--hf-color-text-primary);
}
.fv-scene-controls .fv-sc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 24px;
  padding: 0 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--hf-color-icon-primary);
  font: inherit;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
}
.fv-scene-controls .fv-sc-btn:hover {
  background: var(--hf-color-overlay-hover);
  color: var(--hf-color-text-primary);
}
.fv-scene-controls .fv-sc-chip {
  border: 1px solid var(--hf-color-border-default);
  padding: 0 8px;
}
.fv-scene-controls .fv-sc-play {
  height: 28px;
  min-width: 28px;
}
.fshell[data-design="higgsfield"] .fv-design-title {
  display: flex;
  flex: none;
  align-items: center;
  height: 56px;
  padding: 0 12px;
  color: var(--hf-color-text-primary);
  font-size: var(--hf-type-size-200);
  font-weight: 500;
  line-height: 20px;
}
/* Scene path. One crumb per level; only the last one is where you already are,
   so only it is not a control. */
.fshell[data-design="higgsfield"] .fv-crumb-item {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}
.fshell[data-design="higgsfield"] .fv-crumb-sep {
  padding: 0 6px;
  color: var(--hf-color-text-tertiary);
  user-select: none;
}
.fshell[data-design="higgsfield"] .fv-crumb {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: inherit;
}
.fshell[data-design="higgsfield"] button.fv-crumb {
  padding: 2px 4px;
  border: 0;
  border-radius: 4px;
  background: none;
  color: var(--hf-color-text-secondary);
  cursor: pointer;
}
.fshell[data-design="higgsfield"] button.fv-crumb:hover {
  background: var(--hf-color-overlay-hover);
  color: var(--hf-color-text-primary);
}
.fshell[data-design="higgsfield"] button.fv-crumb:focus-visible {
  outline: 2px solid var(--hf-color-border-focus);
  outline-offset: -1px;
}
.fshell[data-design="higgsfield"] .fv-crumb-current {
  padding: 2px 4px;
  color: var(--hf-color-text-primary);
}
/* Player row under the preview (Figma 2780:28590): play on the left, the
   ticking timecode centered, zoom/ratio/fullscreen utilities on the right. */
.fshell[data-design="higgsfield"] .fv-scene-controls {
  position: relative;
  height: 48px;
  gap: 16px;
  padding: 12px;
  border-top: 0;
  background: transparent;
}
/* The design draws the icon buttons as bare 24px glyphs. Icon size is a render
   prop and the design mode is only reachable as a CSS hook, so the skin resizes
   the rendered svg instead of the component forking on design. */
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-btn:not(.fv-sc-chip) {
  width: 24px;
  min-width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 9999px;
  color: var(--hf-color-icon-primary);
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-btn:not(.fv-sc-chip) svg {
  width: 24px;
  height: 24px;
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-play {
  order: -1;
}
/* The design centers the timecode on the bar, not on the space left over by the
   utilities, so it is taken out of flow like the transport bar's timecode. */
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-side:not(.fv-sc-right) {
  position: absolute;
  top: 50%;
  left: 50%;
  justify-content: center;
  transform: translate(-50%, -50%);
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-current {
  color: var(--hf-color-text-primary);
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-sep {
  font-weight: 400;
  color: var(--hf-color-text-tertiary);
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-total {
  color: var(--hf-color-text-secondary);
}
.fshell[data-design="higgsfield"] .fv-scene-controls .fv-sc-right {
  flex: none;
  margin-left: auto;
}
`,s=`fable-panel-viewport-styles`}))()}function l(){let e=[];return{bind(t,n){let r={stage:t,session:n};return e.push(r),{dispose:()=>{let t=e.indexOf(r);t!==-1&&e.splice(t,1)}}},active:()=>{var t;return(t=e[e.length-1])==null?null:t}}}function u(e){let n=l();for(let t of h)g.push(e.extensions.register(`tool`,`fable.panel-viewport.tool.${t}`,p(t,n)));g.push(e.extensions.register(`panel`,m,r(()=>((e,t)=>{let n=globalThis.__HF_MOBILE_CHUNK_OBSERVER__;return n!=null&&n.load?n.load(e,t):e()})(()=>t(()=>import(`./1a2c0e3d-9rSeafVT6mmkqmz3.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]),import.meta.url),new globalThis.URL(`./1a2c0e3d-9rSeafVT6mmkqmz3.js`,import.meta.url).href),{props:()=>({bindStage:n.bind}),styles:a})),e.commands.register(`fable.panel-viewport.zoomToFit`,()=>{var e;return(e=n.active())==null?void 0:e.stage.zoomToFit()}),e.commands.register(`fable.panel-viewport.zoomToActual`,()=>{var e;return(e=n.active())==null?void 0:e.stage.zoomToActual()}),e.commands.register(`fable.panel-viewport.scrubPreview`,e=>{var t;return(t=n.active())==null?void 0:t.stage.scrubPreview(f(e))}))}function d(){for(let e of g.splice(0))try{e.dispose()}catch(e){}}function f(e){if(typeof e!=`object`||!e||Array.isArray(e))return null;let{src:t,time:n}=e;return typeof t==`string`&&typeof n==`number`&&Number.isFinite(n)?{src:t,time:n}:null}function p(e,t){return{activate:()=>{var n;return(n=t.active())==null?void 0:n.session.setActiveTool(e)},deactivate:()=>{},onPointer:e=>{var n,r;return(n=(r=t.active())==null?void 0:r.stage.toolPointer(e))!=null&&n}}}var m,h,g;function _(){return(_=e(()=>{c(),n(),m=`fable.panel-viewport.main`,h=[`move`,`frame`,`rect`,`text`],g=[]}))()}export{d as n,_ as r,u as t};
//# debugId=f25eaffe-274a-5985-a538-f6f12824eed2

//# chunkId=f25eaffe-274a-5985-a538-f6f12824eed2