!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="1f807af0-da71-553b-9312-6056c8c97b4e")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Mr as r,jr as i}from"./1a2c0e3d-hu4uXBiL-IQJn9o2.js";function a(e){return(1-Math.cos(m*e))/2}function o(e){if(d=requestAnimationFrame(o),e-f<p)return;f=e;let t=e/1e3;u.forEach(({el:e,config:n})=>{for(let r of n.oscillators){let n=(t-r.delay)/r.period,i=r.a+(r.b-r.a)*a(n);e.style.setProperty(r.prop,r.unit===`px`?`${i.toFixed(2)}px`:i.toFixed(4))}if(n.hue){let{prop:r,range:i,period:o,continuous:s}=n.hue,c=s?t/o%1*i:-i+2*i*a(t/o);e.style.setProperty(r,`${c.toFixed(2)}deg`)}})}function s(){d==null&&(f=0,d=requestAnimationFrame(o))}function c(){u.size===0&&d!=null&&(cancelAnimationFrame(d),d=null)}function l(e,t){let n={el:e,config:t};return u.add(n),s(),()=>{u.delete(n),c()}}var u,d,f,p,m;function h(){return(h=e((()=>{u=new Set,d=null,f=0,p=1e3/30-2,m=Math.PI*2})))()}function g(e){return W[e].border.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function _(e){return W[e].inner.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function v(e){return U[e].border.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function y(e){let t=U[e],n=e===`mono`?.225:.45;return t.border.map(e=>{let t=e.color.replace(`rgb(`,`rgba(`).replace(`)`,`, ${n})`);return`radial-gradient(ellipse ${e.size.split(` `).map(e=>`${Math.round(parseInt(e)*.9)}px`).join(` `)} at ${e.pos}, ${t}, transparent)`}).join(`,
    `)}function b(e,t){let n=U[e];return t?n.spike:n.spikeLt}function x(e,t,n){return G[e][t?`dark`:`light`].map(e=>{let t=e.offsetX===0?``:e.offsetX>0?` + ${e.offsetX}px`:` - ${Math.abs(e.offsetX)}px`,r=e.offsetY===0?``:e.offsetY>0?` + ${e.offsetY}px`:` - ${Math.abs(e.offsetY)}px`;return`radial-gradient(ellipse calc(${e.sizeW}px * var(--beam-w-${n})) calc(${e.sizeH}px * var(--beam-h-${n})) at calc(var(--beam-x-${n}) * 100%${t}) calc(100%${r}), ${e.color}, transparent)`}).join(`,
       `)}function S(e,t){return K[e].map(e=>{let n=e.offsetX===0?``:e.offsetX>0?` + ${e.offsetX}px`:` - ${Math.abs(e.offsetX)}px`,r=e.offsetY===0?``:` - ${Math.abs(e.offsetY)}px`;return`radial-gradient(ellipse calc(${e.sizeW}px * var(--beam-w-${t})) calc(${e.sizeH}px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%${n}) calc(100%${r}), ${e.color}, transparent)`}).join(`,
    `)}function C(e,t){let n=e.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/);if(n)return`rgba(${n[1]}, ${n[2]}, ${n[3]}, ${t})`;let r=e.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);return r?`rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t})`:e}function w(e,t){let n=e.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);if(n)return`rgba(${n[1]}, ${n[2]}, ${n[3]}, ${(parseFloat(n[4])*t).toFixed(2)})`;let r=e.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);return r?`rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t.toFixed(2)})`:e}function T(e,t,n){let r=b(e,t),i=q[e][t?`dark`:`light`],a=e===`mono`,o=a?.14:1,s=a?w(r.primary,.14):r.primary,c=a?w(r.primary,.09):r.primary,l=a?w(r.secondary,.12):r.secondary,u=a?C(r.secondary,.06):C(r.secondary,.49),d=i.spikes.map(e=>a?{color1:w(e.color1,o),color2:w(e.color2,o*.7)}:e),f=a?`12px`:`0.8px`,p=a?`14px`:`2px`,m=a?`12px`:`1.2px`,h=a?`10px`:`0.6px`,g=a?`42px`:`92px`,_=a?`38px`:`72px`,v=a?`40px`:`85px`,y=a?`32px`:`60px`,x=a?`12px`:`1px`,S=a?`rgba(255, 255, 255, 0.5)`:`rgba(255, 255, 255, 1)`,T=a?`rgba(255, 255, 255, 0.45)`:`rgba(255, 255, 255, 0.9)`,E=a?`rgba(255, 255, 255, 0.25)`:`rgba(255, 255, 255, 0.5)`,D=a?`rgba(255, 255, 255, 0.15)`:`rgba(255, 255, 255, 0.3)`,O=a?`rgba(255, 255, 255, 0.06)`:`rgba(255, 255, 255, 0.12)`,k=a?`rgba(255, 255, 255, 0.015)`:`rgba(255, 255, 255, 0.03)`;return t?`radial-gradient(ellipse calc(${f} * var(--beam-spike-${n})) calc(${g} * var(--beam-h-${n})) at 8% calc(100% - 2px), ${s}, ${c} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${n})) calc(35px * var(--beam-h-${n})) at 22% calc(100% - 4px), ${l}, ${u} 50%, transparent 95%),
       radial-gradient(ellipse calc(${p} * (2 - var(--beam-spike-${n}))) calc(${_} * var(--beam-h-${n})) at 36% calc(100% - 3px), ${d[0].color1}, ${d[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${n})) calc(28px * var(--beam-h-${n})) at 50% calc(100% - 2px), ${d[1].color1}, ${d[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${m} * (2 - var(--beam-spike2-${n}))) calc(${v} * var(--beam-h-${n})) at 64% calc(100% - 4px), ${d[2].color1}, ${d[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${n})) calc(45px * var(--beam-h-${n})) at 78% calc(100% - 2px), ${d[3].color1}, ${d[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${h} * (2 - var(--beam-spike-${n}))) calc(${y} * var(--beam-h-${n})) at 92% calc(100% - 3px), ${d[4].color1}, ${d[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike-${n})) calc(15px * var(--beam-spike2-${n})) at calc(var(--beam-x-${n}) * 100%) calc(100% + 1px), ${S} 0%, ${T} 20%, ${E} 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w-${n})) calc(40px * var(--beam-h-${n})) at calc(var(--beam-x-${n}) * 100%) 100%, ${D} 0%, ${O} 25%, ${k} 55%, transparent 80%)`:`radial-gradient(ellipse calc(${f} * var(--beam-spike-${n})) calc(${g} * var(--beam-h-${n})) at 8% calc(100% - 2px), ${s}, ${a?w(r.primary,.11):C(r.primary,.85)} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${n})) calc(35px * var(--beam-h-${n})) at 22% calc(100% - 4px), ${l}, ${a?w(r.secondary,.09):C(r.secondary,.7)} 50%, transparent 95%),
       radial-gradient(ellipse calc(${p} * (2 - var(--beam-spike-${n}))) calc(${_} * var(--beam-h-${n})) at 36% calc(100% - 3px), ${d[0].color1}, ${d[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${n})) calc(28px * var(--beam-h-${n})) at 50% calc(100% - 2px), ${d[1].color1}, ${d[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${m} * (2 - var(--beam-spike2-${n}))) calc(${v} * var(--beam-h-${n})) at 64% calc(100% - 4px), ${d[2].color1}, ${d[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${n})) calc(45px * var(--beam-h-${n})) at 78% calc(100% - 2px), ${d[3].color1}, ${d[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${x} * (2 - var(--beam-spike-${n}))) calc(${y} * var(--beam-h-${n})) at 92% calc(100% - 3px), ${d[4].color1}, ${d[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w-${n})) calc(32px * var(--beam-h-${n})) at calc(var(--beam-x-${n}) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`}function E(e,t,n){let r=e.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);return`rgba(${r?`${r[1]}, ${r[2]}, ${r[3]}`:`255, 255, 255`}, var(--bop-${t}-${n}))`}function D(e,t,n,r,i,a,o,s){return`radial-gradient(ellipse calc(${t}px * var(--bw${r}-${s}) * var(--pulse-glow-sx, 1)) calc(${n}px * var(--bh${r}-${s}) * var(--bgh-${s}) * var(--pulse-glow-sy, 1)) at calc(${a} + var(--bx${r}-${s})) calc(${o} + var(--by${r}-${s})), var(--beam-pulse-color, ${E(e,i,s)}), transparent)`}function O(e,t){return U[e].border.map((e,n)=>{let{region:r,quad:i}=J[n],[a,o]=e.pos.split(` `),[s,c]=e.size.split(` `).map(parseFloat);return D(e.color,s,c,r,i,a,o,t)}).join(`,
    `)}function k(e,t,n){let r=U[e].border.map((e,n)=>{let{region:r,quad:i}=J[n],[a,o]=e.pos.split(` `),[s,c]=Y[n];return D(e.color,s,c,r,i,a,o,t)}),i=n?`255, 255, 255`:`0, 0, 0`,a=n?.18:.08,o=[[`0%`,`0%`,`tl`],[`100%`,`0%`,`tr`],[`0%`,`100%`,`bl`],[`100%`,`100%`,`br`]].map(([e,n,r])=>`radial-gradient(ellipse 60px 60px at ${e} ${n}, var(--beam-pulse-color, rgba(${i}, calc(${a} * var(--bop-${r}-${t})))), transparent 70%)`);return[...r,...o].join(`,
    `)}function A(e,t,n){let r=U[t].border;return e.map(e=>{var t,i;let a=r[e.ci],[o,s]=a.pos.split(` `);return D(a.color,e.w,e.h,e.region,e.quad,(t=e.x)==null?o:t,(i=e.y)==null?s:i,n)}).join(`,
    `)}function j(e,t,n){let r=U[t].border,i=+n.toFixed(3);return e.map(e=>{var t,n;let a=r[e.ci],[o,s]=a.pos.split(` `),c=(t=e.x)==null?o:t,l=(n=e.y)==null?s:n,u=a.color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/),d=u?`${u[1]}, ${u[2]}, ${u[3]}`:`255, 255, 255`;return`radial-gradient(ellipse calc(${e.w}px * var(--pulse-glow-sx, 1)) calc(${e.h}px * var(--pulse-glow-sy, 1)) at ${c} ${l}, var(--beam-pulse-color, rgba(${d}, ${i})), transparent)`}).join(`,
    `)}function M(e){return`
[data-beam="${e}"][data-paused],
[data-beam="${e}"][data-paused]::after,
[data-beam="${e}"][data-paused]::before,
[data-beam="${e}"][data-paused] [data-beam-bloom] {
  animation-play-state: paused !important;
}`}function ee(e){return`${[`bw1`,`bh1`,`bw2`,`bh2`,`bw3`,`bh3`,`bgh`,`bop-tl`,`bop-tr`,`bop-bl`,`bop-br`].map(t=>`@property --${t}-${e} {\n  syntax: "<number>";\n  initial-value: 1;\n  inherits: true;\n}`).join(`

`)}\n\n${[`bx1`,`by1`,`bx2`,`by2`,`bx3`,`by3`].map(t=>`@property --${t}-${e} {\n  syntax: "<length>";\n  initial-value: 0px;\n  inherits: true;\n}`).join(`

`)}\n\n@property --beam-opacity-${e} {\n  syntax: "<number>";\n  initial-value: 0;\n  inherits: true;\n}\n\n@property --beam-hue-${e} {\n  syntax: "<angle>";\n  initial-value: 0deg;\n  inherits: true;\n}`}function N(e,t,n){let r=t===`dark`,i=n/2.3;return e===`pulse-inner`?{sp:.28,dr:r?33:40,op:r?.48:.45,gh:r?.34:.22,bs:(r?1.9:2.6)*i,ss:(r?2.6:4.6)*i,ghs:(r?2.4:5.5)*i,huePeriod:16}:{sp:r?.28:.36,dr:r?14:19,op:r?.46:0,gh:r?.16:.58,bs:(r?2.3:3.7)*i,ss:(r?6.4:4.6)*i,ghs:(r?2.4:3.8)*i,huePeriod:14}}function P(e,t){let{sp:n,dr:r,op:i,gh:a,bs:o,ss:s,ghs:c}=t;return[{prop:`--bw1-${e}`,a:1-n,b:1+n*1.1,period:s*.9,delay:0,unit:``},{prop:`--bh1-${e}`,a:1+n*.9,b:1-n*.85,period:s*1.26,delay:0,unit:``},{prop:`--bx1-${e}`,a:-r,b:r*.9,period:o*1.6,delay:0,unit:`px`},{prop:`--by1-${e}`,a:r*.55,b:-r*.7,period:o*1.6,delay:0,unit:`px`},{prop:`--bw2-${e}`,a:1+n,b:1-n*.85,period:s*1.1,delay:0,unit:``},{prop:`--bh2-${e}`,a:1-n*.8,b:1+n*1.05,period:s*.81,delay:0,unit:``},{prop:`--bx2-${e}`,a:r*.8,b:-r*.9,period:o*1.88,delay:0,unit:`px`},{prop:`--by2-${e}`,a:-r,b:r*.65,period:o*1.88,delay:0,unit:`px`},{prop:`--bw3-${e}`,a:1-n*.6,b:1+n*1.15,period:s*.98,delay:0,unit:``},{prop:`--bh3-${e}`,a:1+n*.75,b:1-n,period:s*1.4,delay:0,unit:``},{prop:`--bx3-${e}`,a:-r*.6,b:r,period:o*1.45,delay:0,unit:`px`},{prop:`--by3-${e}`,a:-r*.85,b:r*.45,period:o*1.45,delay:0,unit:`px`},{prop:`--bgh-${e}`,a:1-a,b:1+a,period:c,delay:0,unit:``},{prop:`--bop-tl-${e}`,a:1-i,b:1,period:o,delay:0,unit:``},{prop:`--bop-tr-${e}`,a:1-i,b:1,period:o*1.32,delay:o*.28,unit:``},{prop:`--bop-bl-${e}`,a:1-i,b:1,period:o*.84,delay:o*.55,unit:``},{prop:`--bop-br-${e}`,a:1-i,b:1,period:o*1.58,delay:o*.83,unit:``}]}function F(e,t,n,r,i,a){if(e!==`pulse-inner`&&e!==`pulse-outside`)return null;let o=N(e,t,n);return{oscillators:P(a,o),hue:i?null:{prop:`--beam-hue-${a}`,range:360,period:o.huePeriod,continuous:!0}}}function I(e,t,n){return`  animation: ${t}-${e} ${n}s ease forwards;`}function L(e,t,n){let r=t+(e-t)*Math.max(.5,Math.min(1.5,n));return+Math.max(0,Math.min(100,r)).toFixed(2)}function te(e){let{size:t}=e;return t===`line`?V(e):t===`sm`?R(e):t===`pulse-inner`?B(e):t===`pulse-outside`?ne(e):z(e)}function R(e){let{id:t,borderRadius:n,borderWidth:r,duration:i,strokeOpacity:a,innerOpacity:o,bloomOpacity:s,innerShadow:c,colorVariant:l,staticColors:u,brightness:d,saturation:f,hueRange:p,theme:m}=e,h=Math.max(0,n-r),v=l===`mono`?.5:1,y=a*v,b=o*v,x=s*v,S=u?``:`animation: beam-hue-shift-${t} 12s ease-in-out infinite;`,C=u?``:`
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  50% { filter: hue-rotate(${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  100% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
}`,w=m===`dark`,T=w?`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`:`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`,E=g(l),D=_(l),O=w?`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`:`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`,k=`conic-gradient(
    from var(--beam-angle-${t}),
    transparent 0%, transparent 22%,
    rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
    white 46%, white 82%,
    rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
    transparent 97%, transparent 100%
  )`;return`
@property --beam-angle-${t} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-spin-${t} ${i}s linear infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-spin-${t} ${i}s linear infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${h}px;
  padding: ${r}px;
  clip-path: inset(0 round ${n}px);
  background: ${T},${E};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * ${y.toFixed(2)} * var(--beam-strength, 1));
  ${S}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  clip-path: inset(0 round ${n}px);
  background: ${D};
  box-shadow: inset 0 0 5px 1px ${c};
  -webkit-mask-image: ${k};
  -webkit-mask-composite: source-over;
  mask-image: ${k};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * ${b.toFixed(2)} * var(--beam-strength, 1));
  ${S}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${h}px;
  clip-path: inset(0 round ${n}px);
  background: ${O};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  filter: blur(8px) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${x.toFixed(2)} * var(--beam-strength, 1));
}

@keyframes beam-spin-${t} {
  to { --beam-angle-${t}: 360deg; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${C}
${M(t)}
`}function z(e){let{id:t,borderRadius:n,borderWidth:r,duration:i,strokeOpacity:a,innerOpacity:o,bloomOpacity:s,innerShadow:c,colorVariant:l,staticColors:u,brightness:d,saturation:f,hueRange:p,theme:m,beamLength:h}=e,g=Math.max(0,n-r),_=l===`mono`?.5:1,b=a*_,x=o*_,S=s*_,C=u?``:`animation: beam-hue-shift-${t} 12s ease-in-out infinite;`,w=u?``:`
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  50% { filter: hue-rotate(${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  100% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
}`,T=m===`dark`,E=e=>L(e,66,h),D=e=>L(e,70,h),O=T?`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent ${E(54)}%,
        rgba(255, 255, 255, 0.1) ${E(57)}%,
        rgba(255, 255, 255, 0.3) ${E(60)}%,
        rgba(255, 255, 255, 0.6) ${E(63)}%,
        rgba(255, 255, 255, 0.75) ${E(66)}%,
        rgba(255, 255, 255, 0.6) ${E(69)}%,
        rgba(255, 255, 255, 0.3) ${E(72)}%,
        rgba(255, 255, 255, 0.1) ${E(75)}%,
        transparent ${E(78)}%, transparent 100%
      )`:`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent ${E(54)}%,
        rgba(0, 0, 0, 0.08) ${E(57)}%,
        rgba(0, 0, 0, 0.2) ${E(60)}%,
        rgba(0, 0, 0, 0.4) ${E(63)}%,
        rgba(0, 0, 0, 0.55) ${E(66)}%,
        rgba(0, 0, 0, 0.4) ${E(69)}%,
        rgba(0, 0, 0, 0.2) ${E(72)}%,
        rgba(0, 0, 0, 0.08) ${E(75)}%,
        transparent ${E(78)}%, transparent 100%
      )`,k=v(l),A=y(l),j=T?`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent ${D(58)}%,
        rgba(255, 255, 255, 0.03) ${D(62)}%,
        rgba(255, 255, 255, 0.08) ${D(65)}%,
        rgba(255, 255, 255, 0.2) ${D(67)}%,
        rgba(255, 255, 255, 0.45) ${D(69)}%,
        rgba(255, 255, 255, 0.85) ${D(70)}%,
        rgba(255, 255, 255, 0.85) ${D(70.5)}%,
        rgba(255, 255, 255, 0.45) ${D(71.5)}%,
        rgba(255, 255, 255, 0.2) ${D(73)}%,
        rgba(255, 255, 255, 0.08) ${D(75)}%,
        rgba(255, 255, 255, 0.03) ${D(78)}%,
        transparent ${D(82)}%
      )`:`conic-gradient(
        from var(--beam-angle-${t}),
        transparent 0%, transparent ${D(58)}%,
        rgba(0, 0, 0, 0.02) ${D(62)}%,
        rgba(0, 0, 0, 0.08) ${D(65)}%,
        rgba(0, 0, 0, 0.2) ${D(67)}%,
        rgba(0, 0, 0, 0.4) ${D(69)}%,
        rgba(0, 0, 0, 0.6) ${D(70)}%,
        rgba(0, 0, 0, 0.6) ${D(70.5)}%,
        rgba(0, 0, 0, 0.4) ${D(71.5)}%,
        rgba(0, 0, 0, 0.2) ${D(73)}%,
        rgba(0, 0, 0, 0.08) ${D(75)}%,
        rgba(0, 0, 0, 0.02) ${D(78)}%,
        transparent ${D(82)}%
      )`;return`
@property --beam-angle-${t} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-spin-${t} ${i}s linear infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-spin-${t} ${i}s linear infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${g}px;
  padding: ${r}px;
  clip-path: inset(0 round ${n}px);
  background: ${O},${k};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * ${b.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  background: ${A};
  box-shadow: inset 0 0 9px 1px ${c};
  -webkit-mask-image:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--beam-angle-${t}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * ${x.toFixed(2)} * var(--beam-strength, 1));
  clip-path: inset(0 round ${n}px);
  ${C}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${g}px;
  clip-path: inset(0 round ${n}px);
  background: ${j};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  filter: blur(8px) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${S.toFixed(2)} * var(--beam-strength, 1));
}

@keyframes beam-spin-${t} {
  to { --beam-angle-${t}: 360deg; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${w}
${M(t)}
`}function B(e){let{id:t,borderRadius:n,borderWidth:r,duration:i,strokeOpacity:a,innerOpacity:o,bloomOpacity:s,colorVariant:c,staticColors:l,brightness:u,saturation:d,theme:f}=e,p=f===`dark`,m=c===`mono`?.5:1,h=(a*m).toFixed(2),g=(o*m).toFixed(2),_=(s*m).toFixed(2),{op:v}=N(`pulse-inner`,f,i),y=u.toFixed(2),b=d.toFixed(2),x=l?`filter: brightness(${y}) saturate(${b});`:`filter: hue-rotate(var(--beam-hue-${t})) brightness(${y}) saturate(${b});`,S=l?`filter: blur(8px) brightness(${y}) saturate(${b});`:`filter: blur(8px) hue-rotate(var(--beam-hue-${t})) brightness(${y}) saturate(${b});`,C=O(c,t),w=k(c,t,p),T=j(X,c,1-v*.5);return`
${ee(t)}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: hidden;
  isolation: isolate;
}

[data-beam="${t}"][data-active] {
${I(t,`beam-fade-in`,.6)}
}

[data-beam="${t}"][data-fading] {
${I(t,`beam-fade-out`,.5)}
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  padding: ${r}px;
  clip-path: inset(0 round ${n}px);
  background: ${C};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${h} * var(--beam-strength, 1));
  ${x}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  clip-path: inset(0 round ${n}px);
  background: ${w};
  -webkit-mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-over;
  mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${g} * var(--beam-strength, 1));
  ${x}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  clip-path: inset(0 round ${n}px);
  background: ${T};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  pointer-events: none;
  z-index: 3;
  will-change: opacity;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${_} * var(--beam-strength, 1));
  ${S}
}

@keyframes beam-fade-in-${t} { to { --beam-opacity-${t}: 1; } }
@keyframes beam-fade-out-${t} { from { --beam-opacity-${t}: 1; } to { --beam-opacity-${t}: 0; } }
${M(t)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${t}"][data-active],
  [data-beam="${t}"][data-fading],
  [data-beam="${t}"][data-active]::after,
  [data-beam="${t}"][data-fading]::after,
  [data-beam="${t}"][data-active]::before,
  [data-beam="${t}"][data-fading]::before,
  [data-beam="${t}"][data-active] [data-beam-bloom],
  [data-beam="${t}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`}function ne(e){let{id:t,borderRadius:n,duration:r,strokeOpacity:i,innerOpacity:a,bloomOpacity:o,colorVariant:s,staticColors:c,brightness:l,saturation:u,theme:d,hairlineOpacity:f=0}=e,p=d===`dark`,m=s===`mono`?.5:1,h=(i*m).toFixed(2),g=(a*m).toFixed(2),_=(o*m).toFixed(2),v=p?`70, 70, 70`:`0, 0, 0`,y=f.toFixed(2),b=`linear-gradient(rgba(${v}, ${y}), rgba(${v}, ${y}))`,{op:x}=N(`pulse-outside`,d,r),S=.95,C=.9,w=p?3:6,T=p?22.5:15,E=l.toFixed(2),D=u.toFixed(2),O=c?`filter: brightness(${E}) saturate(${D});`:`filter: hue-rotate(var(--beam-hue-${t})) brightness(${E}) saturate(${D});`,k=c?`filter: blur(${w}px) brightness(${E}) saturate(${D});`:`filter: blur(${w}px) hue-rotate(var(--beam-hue-${t})) brightness(${E}) saturate(${D});`,P=c?`filter: blur(${T}px) brightness(${E}) saturate(${D});`:`filter: blur(${T}px) hue-rotate(var(--beam-hue-${t})) brightness(${E}) saturate(${D});`,F=A(Z,s,t),L=A(Z,s,t),te=j(ie,s,1-x*.5),R=f>0?`${F},
    ${b}`:F;return`
${ee(t)}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: visible;
  isolation: isolate;
}

[data-beam="${t}"][data-active] {
${I(t,`beam-fade-in`,.6)}
}

[data-beam="${t}"][data-fading] {
${I(t,`beam-fade-out`,.5)}
}
${f>0?`
/* Idle hairline — painted above the (opaque) child in the inner 1px edge ring so
   it overlaps a standard inset component border exactly. */
[data-beam="${t}"]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  padding: 1px;
  clip-path: inset(0 round ${n}px);
  background: ${b};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}
`:``}
[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  padding: 1px;
  clip-path: inset(0 round ${n}px);
  background: ${R};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${h} * var(--beam-strength, 1));
  ${O}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: -10px;
  z-index: -1;
  border-radius: ${n+10}px;
  background: ${L};
  transform: scale(${S}, ${C});
  pointer-events: none;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${t}) * ${g} * var(--beam-strength, 1));
  ${k}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: -30px;
  z-index: -1;
  border-radius: ${n+30}px;
  background: ${te};
  transform: scale(${S}, ${C});
  pointer-events: none;
  will-change: transform;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * ${_} * var(--beam-strength, 1));
  ${P}
}

@keyframes beam-fade-in-${t} { to { --beam-opacity-${t}: 1; } }
@keyframes beam-fade-out-${t} { from { --beam-opacity-${t}: 1; } to { --beam-opacity-${t}: 0; } }
${M(t)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${t}"][data-active],
  [data-beam="${t}"][data-fading],
  [data-beam="${t}"][data-active]::after,
  [data-beam="${t}"][data-fading]::after,
  [data-beam="${t}"][data-active]::before,
  [data-beam="${t}"][data-fading]::before,
  [data-beam="${t}"][data-active] [data-beam-bloom],
  [data-beam="${t}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`}function V(e){let{id:t,borderRadius:n,borderWidth:r,duration:i,strokeOpacity:a,innerOpacity:o,bloomOpacity:s,innerShadow:c,colorVariant:l,staticColors:u,brightness:d,saturation:f,hueRange:p,theme:m}=e,h=Math.max(0,n-r),g=m===`dark`,_=a,v=o,y=s,b=u?``:`animation: beam-hue-shift-${t} 12s ease-in-out infinite;`,C=u?``:`animation: beam-hue-shift-bloom-${t} 8s ease-in-out infinite;`,w=u?``:`
@keyframes beam-hue-shift-${t} {
  0% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  50% { filter: hue-rotate(${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  100% { filter: hue-rotate(-${p}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
}

@keyframes beam-hue-shift-bloom-${t} {
  0% { filter: blur(8px) hue-rotate(-${p+10}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  50% { filter: blur(8px) hue-rotate(${p+10}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
  100% { filter: blur(8px) hue-rotate(-${p+10}deg) brightness(${d.toFixed(2)}) saturate(${f.toFixed(2)}); }
}`,E=g?`radial-gradient(
        ellipse calc(24px * var(--beam-w-${t})) calc(28px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )`:`radial-gradient(
        ellipse calc(35px * var(--beam-w-${t})) calc(28px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) calc(100% + 2px),
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        transparent 70%
      )`,D=x(l,g,t),O=S(l,t),k=T(l,g,t),A=l===`mono`?`filter: blur(6px);`:``;return`
@property --beam-x-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-w-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-h-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike2-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-edge-${t} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: hidden;
}

[data-beam="${t}"][data-active] {
  animation:
    beam-travel-${t} ${i}s linear infinite,
    beam-edge-fade-${t} ${i}s linear infinite,
    beam-breathe-${t} ${(i*1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${t} ${(i*1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${t} ${(i*1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-in-${t} 0.6s ease forwards;
}

[data-beam="${t}"][data-fading] {
  animation:
    beam-travel-${t} ${i}s linear infinite,
    beam-edge-fade-${t} ${i}s linear infinite,
    beam-breathe-${t} ${(i*1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${t} ${(i*1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${t} ${(i*1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-out-${t} 0.5s ease forwards;
}

[data-beam="${t}"][data-active]::after,
[data-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${h}px;
  padding: ${r}px;
  clip-path: inset(0 round ${n}px);
  background: ${E}, ${D};
  -webkit-mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${_.toFixed(2)} * var(--beam-strength, 1));
  ${b}
}

[data-beam="${t}"][data-active]::before,
[data-beam="${t}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${n}px;
  background: ${O};
  box-shadow: inset 0 0 9px 1px ${c};
  -webkit-mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${t})) calc(60px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${v.toFixed(2)} * var(--beam-strength, 1));
  clip-path: inset(0 round ${n}px);
  ${b}
}

[data-beam="${t}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${h}px;
  clip-path: inset(0 round ${n}px);
  padding: 0;
  -webkit-mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${t})) calc(110px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  -webkit-mask-composite: source-over;
  mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${t})) calc(110px * var(--beam-h-${t})) at calc(var(--beam-x-${t}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  mask-composite: add;
  background: ${k};
  ${A}
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${t}"][data-active] [data-beam-bloom],
[data-beam="${t}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${t}) * var(--beam-edge-${t}) * ${y.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

@keyframes beam-travel-${t} {
  0%   { --beam-x-${t}: 0.06;  --beam-w-${t}: 0.5; }
  10%  { --beam-x-${t}: 0.15;  --beam-w-${t}: 0.8; }
  20%  { --beam-x-${t}: 0.25;  --beam-w-${t}: 1.1; }
  30%  { --beam-x-${t}: 0.35;  --beam-w-${t}: 1.3; }
  40%  { --beam-x-${t}: 0.44;  --beam-w-${t}: 1.45; }
  50%  { --beam-x-${t}: 0.5;   --beam-w-${t}: 1.5; }
  60%  { --beam-x-${t}: 0.56;  --beam-w-${t}: 1.45; }
  70%  { --beam-x-${t}: 0.65;  --beam-w-${t}: 1.3; }
  80%  { --beam-x-${t}: 0.75;  --beam-w-${t}: 1.1; }
  90%  { --beam-x-${t}: 0.85;  --beam-w-${t}: 0.8; }
  100% { --beam-x-${t}: 0.94;  --beam-w-${t}: 0.5; }
}

@keyframes beam-edge-fade-${t} {
  0%    { --beam-edge-${t}: 0; }
  12.5% { --beam-edge-${t}: 0; }
  32.5% { --beam-edge-${t}: 1; }
  67.5% { --beam-edge-${t}: 1; }
  87.5% { --beam-edge-${t}: 0; }
  100%  { --beam-edge-${t}: 0; }
}

@keyframes beam-breathe-${t} {
  0%, 100% { --beam-h-${t}: 0.8; }
  25%      { --beam-h-${t}: 1.25; }
  55%      { --beam-h-${t}: 0.85; }
  80%      { --beam-h-${t}: 1.3; }
}

@keyframes beam-spike-${t} {
  0%   { --beam-spike-${t}: 0.8; }
  25%  { --beam-spike-${t}: 1.3; }
  50%  { --beam-spike-${t}: 0.9; }
  75%  { --beam-spike-${t}: 1.4; }
  100% { --beam-spike-${t}: 0.8; }
}

@keyframes beam-spike2-${t} {
  0%   { --beam-spike2-${t}: 1.2; }
  25%  { --beam-spike2-${t}: 0.7; }
  50%  { --beam-spike2-${t}: 1.4; }
  75%  { --beam-spike2-${t}: 0.8; }
  100% { --beam-spike2-${t}: 1.2; }
}

@keyframes beam-fade-in-${t} {
  to { --beam-opacity-${t}: 1; }
}

@keyframes beam-fade-out-${t} {
  from { --beam-opacity-${t}: 1; }
  to { --beam-opacity-${t}: 0; }
}
${w}
${M(t)}
`}var re,H,U,W,G,K,q,J,Y,X,Z,ie;function ae(){return(ae=e((()=>{re={sm:{borderRadius:32,borderWidth:1,width:70,height:36},md:{borderRadius:16,borderWidth:1},line:{borderRadius:16,borderWidth:1},"pulse-outside":{borderRadius:16,borderWidth:1},"pulse-inner":{borderRadius:16,borderWidth:1}},H={sm:{dark:{strokeOpacity:.46,innerOpacity:.24,bloomOpacity:.38,innerShadow:`rgba(255, 255, 255, 0.3)`,saturation:1.2},light:{strokeOpacity:.12,innerOpacity:.3,bloomOpacity:.16,innerShadow:`rgba(0, 0, 0, 0.14)`,saturation:1.8}},md:{dark:{strokeOpacity:.26,innerOpacity:.42,bloomOpacity:.24,innerShadow:`rgba(255, 255, 255, 0.27)`,saturation:1.2},light:{strokeOpacity:.12,innerOpacity:.26,bloomOpacity:.34,innerShadow:`rgba(0, 0, 0, 0.14)`,saturation:1.5}},line:{dark:{strokeOpacity:1.14,innerOpacity:.7,bloomOpacity:.8,innerShadow:`rgba(255, 255, 255, 0.1)`,saturation:1.2},light:{strokeOpacity:.16,innerOpacity:.32,bloomOpacity:.3,innerShadow:`rgba(0, 0, 0, 0.14)`,saturation:1.95}},"pulse-outside":{dark:{strokeOpacity:.94,innerOpacity:.34,bloomOpacity:.3,innerShadow:`transparent`,saturation:1.2,brightness:1.9,hairlineOpacity:0},light:{strokeOpacity:1.96,innerOpacity:1.04,bloomOpacity:.42,innerShadow:`transparent`,saturation:.6,brightness:1.7,hairlineOpacity:0}},"pulse-inner":{dark:{strokeOpacity:1.54,innerOpacity:.44,bloomOpacity:.66,innerShadow:`transparent`,saturation:1.2,brightness:.75},light:{strokeOpacity:.32,innerOpacity:.4,bloomOpacity:.8,innerShadow:`transparent`,saturation:.75,brightness:1.3}}},{...H.md.dark},{...H.md.light},U={colorful:{border:[{color:`rgb(133, 240, 45)`,pos:`33% -7.4%`,size:`70px 40px`},{color:`rgb(96, 226, 72)`,pos:`12% -5%`,size:`60px 35px`},{color:`rgb(64, 210, 96)`,pos:`2.1% 68.3%`,size:`40px 70px`},{color:`rgb(150, 246, 56)`,pos:`2.1% 68.3%`,size:`20px 35px`},{color:`rgb(112, 232, 60)`,pos:`74.4% 100%`,size:`180px 32px`},{color:`rgb(80, 220, 84)`,pos:`55% 100%`,size:`85px 26px`},{color:`rgb(170, 250, 70)`,pos:`93.9% 0%`,size:`74px 32px`},{color:`rgb(56, 206, 110)`,pos:`100% 27.1%`,size:`26px 42px`},{color:`rgb(120, 234, 52)`,pos:`100% 27.1%`,size:`52px 48px`}],spike:{primary:`rgb(120, 240, 60)`,secondary:`rgba(70, 215, 120, 0.98)`},spikeLt:{primary:`rgb(70, 165, 30)`,secondary:`rgb(40, 150, 80)`}},mono:{border:[{color:`rgb(180, 180, 180)`,pos:`33% -7.4%`,size:`70px 40px`},{color:`rgb(140, 140, 140)`,pos:`12% -5%`,size:`60px 35px`},{color:`rgb(160, 160, 160)`,pos:`2.1% 68.3%`,size:`40px 70px`},{color:`rgb(130, 130, 130)`,pos:`2.1% 68.3%`,size:`20px 35px`},{color:`rgb(170, 170, 170)`,pos:`74.4% 100%`,size:`180px 32px`},{color:`rgb(150, 150, 150)`,pos:`55% 100%`,size:`85px 26px`},{color:`rgb(190, 190, 190)`,pos:`93.9% 0%`,size:`74px 32px`},{color:`rgb(145, 145, 145)`,pos:`100% 27.1%`,size:`26px 42px`},{color:`rgb(165, 165, 165)`,pos:`100% 27.1%`,size:`52px 48px`}],spike:{primary:`rgb(200, 200, 200)`,secondary:`rgb(170, 170, 170)`},spikeLt:{primary:`rgb(80, 80, 80)`,secondary:`rgb(120, 120, 120)`}},ocean:{border:[{color:`rgb(100, 80, 220)`,pos:`33% -7.4%`,size:`70px 40px`},{color:`rgb(60, 120, 255)`,pos:`12% -5%`,size:`60px 35px`},{color:`rgb(80, 100, 200)`,pos:`2.1% 68.3%`,size:`40px 70px`},{color:`rgb(50, 140, 220)`,pos:`2.1% 68.3%`,size:`20px 35px`},{color:`rgb(120, 80, 255)`,pos:`74.4% 100%`,size:`180px 32px`},{color:`rgb(70, 130, 255)`,pos:`55% 100%`,size:`85px 26px`},{color:`rgb(140, 100, 240)`,pos:`93.9% 0%`,size:`74px 32px`},{color:`rgb(90, 110, 230)`,pos:`100% 27.1%`,size:`26px 42px`},{color:`rgb(130, 70, 255)`,pos:`100% 27.1%`,size:`52px 48px`}],spike:{primary:`rgb(100, 120, 255)`,secondary:`rgba(130, 100, 220, 0.98)`},spikeLt:{primary:`rgb(60, 60, 180)`,secondary:`rgb(80, 100, 200)`}},sunset:{border:[{color:`rgb(255, 80, 50)`,pos:`33% -7.4%`,size:`70px 40px`},{color:`rgb(255, 160, 40)`,pos:`12% -5%`,size:`60px 35px`},{color:`rgb(255, 120, 60)`,pos:`2.1% 68.3%`,size:`40px 70px`},{color:`rgb(255, 200, 50)`,pos:`2.1% 68.3%`,size:`20px 35px`},{color:`rgb(255, 100, 80)`,pos:`74.4% 100%`,size:`180px 32px`},{color:`rgb(255, 180, 60)`,pos:`55% 100%`,size:`85px 26px`},{color:`rgb(255, 60, 60)`,pos:`93.9% 0%`,size:`74px 32px`},{color:`rgb(255, 140, 50)`,pos:`100% 27.1%`,size:`26px 42px`},{color:`rgb(255, 90, 70)`,pos:`100% 27.1%`,size:`52px 48px`}],spike:{primary:`rgb(255, 140, 80)`,secondary:`rgba(255, 100, 60, 0.98)`},spikeLt:{primary:`rgb(200, 80, 40)`,secondary:`rgb(220, 120, 30)`}}},W={colorful:{border:[{color:`rgb(50, 200, 80)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgb(30, 185, 170)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgb(255, 120, 40)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgb(100, 70, 255)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgb(240, 50, 180)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgb(180, 40, 240)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgb(40, 140, 255)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgb(255, 50, 100)`,pos:`100% 27%`,size:`11px 12px`}],inner:[{color:`rgba(50, 200, 80, 0.5)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgba(30, 185, 170, 0.45)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgba(255, 120, 40, 0.35)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgba(100, 70, 255, 0.35)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgba(240, 50, 180, 0.3)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgba(180, 40, 240, 0.4)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgba(40, 140, 255, 0.3)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgba(255, 50, 100, 0.3)`,pos:`100% 27%`,size:`11px 12px`}]},mono:{border:[{color:`rgb(160, 160, 160)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgb(140, 140, 140)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgb(180, 180, 180)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgb(150, 150, 150)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgb(170, 170, 170)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgb(155, 155, 155)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgb(145, 145, 145)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgb(165, 165, 165)`,pos:`100% 27%`,size:`11px 12px`}],inner:[{color:`rgba(160, 160, 160, 0.25)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgba(140, 140, 140, 0.22)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgba(180, 180, 180, 0.17)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgba(150, 150, 150, 0.17)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgba(170, 170, 170, 0.15)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgba(155, 155, 155, 0.20)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgba(145, 145, 145, 0.15)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgba(165, 165, 165, 0.15)`,pos:`100% 27%`,size:`11px 12px`}]},ocean:{border:[{color:`rgb(60, 140, 200)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgb(50, 120, 180)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgb(100, 80, 220)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgb(80, 100, 255)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgb(120, 70, 240)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgb(90, 80, 220)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgb(70, 110, 255)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgb(110, 90, 230)`,pos:`100% 27%`,size:`11px 12px`}],inner:[{color:`rgba(60, 140, 200, 0.5)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgba(50, 120, 180, 0.45)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgba(100, 80, 220, 0.35)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgba(80, 100, 255, 0.35)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgba(120, 70, 240, 0.3)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgba(90, 80, 220, 0.4)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgba(70, 110, 255, 0.3)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgba(110, 90, 230, 0.3)`,pos:`100% 27%`,size:`11px 12px`}]},sunset:{border:[{color:`rgb(255, 180, 50)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgb(255, 150, 40)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgb(255, 80, 60)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgb(255, 100, 80)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgb(255, 60, 80)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgb(255, 120, 60)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgb(255, 200, 50)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgb(255, 90, 70)`,pos:`100% 27%`,size:`11px 12px`}],inner:[{color:`rgba(255, 180, 50, 0.5)`,pos:`2% 68%`,size:`9px 18px`},{color:`rgba(255, 150, 40, 0.45)`,pos:`2% 68%`,size:`4px 8px`},{color:`rgba(255, 80, 60, 0.35)`,pos:`72% -3%`,size:`59px 9px`},{color:`rgba(255, 100, 80, 0.35)`,pos:`74% 100%`,size:`42px 7px`},{color:`rgba(255, 60, 80, 0.3)`,pos:`100% 27%`,size:`10px 17px`},{color:`rgba(255, 120, 60, 0.4)`,pos:`100% 27%`,size:`10px 18px`},{color:`rgba(255, 200, 50, 0.3)`,pos:`100% 27%`,size:`5px 10px`},{color:`rgba(255, 90, 70, 0.3)`,pos:`100% 27%`,size:`11px 12px`}]}},G={colorful:{dark:[{color:`rgb(255, 50, 100)`,sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(40, 180, 220)`,sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:`rgb(50, 200, 80)`,sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:`rgb(180, 40, 240)`,sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:`rgb(255, 160, 30)`,sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:`rgb(100, 70, 255)`,sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:`rgb(40, 140, 255)`,sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:`rgb(240, 50, 180)`,sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:`rgb(30, 185, 170)`,sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:`rgb(255, 50, 100)`,sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(40, 140, 255)`,sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:`rgb(50, 200, 80)`,sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:`rgb(180, 40, 240)`,sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:`rgb(30, 185, 170)`,sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:`rgb(100, 70, 255)`,sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:`rgb(40, 140, 255)`,sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:`rgb(255, 120, 40)`,sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:`rgb(240, 50, 180)`,sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},mono:{dark:[{color:`rgb(200, 200, 200)`,sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(170, 170, 170)`,sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:`rgb(155, 155, 155)`,sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:`rgb(185, 185, 185)`,sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:`rgb(165, 165, 165)`,sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:`rgb(180, 180, 180)`,sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:`rgb(160, 160, 160)`,sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:`rgb(175, 175, 175)`,sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:`rgb(190, 190, 190)`,sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:`rgb(100, 100, 100)`,sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(80, 80, 80)`,sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:`rgb(90, 90, 90)`,sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:`rgb(70, 70, 70)`,sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:`rgb(85, 85, 85)`,sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:`rgb(95, 95, 95)`,sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:`rgb(75, 75, 75)`,sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:`rgb(105, 105, 105)`,sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:`rgb(65, 65, 65)`,sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},ocean:{dark:[{color:`rgb(100, 80, 220)`,sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(60, 120, 255)`,sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:`rgb(80, 100, 200)`,sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:`rgb(130, 70, 255)`,sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:`rgb(70, 130, 255)`,sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:`rgb(120, 80, 255)`,sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:`rgb(90, 110, 230)`,sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:`rgb(110, 90, 240)`,sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:`rgb(140, 100, 255)`,sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:`rgb(80, 60, 200)`,sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(50, 100, 220)`,sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:`rgb(70, 90, 190)`,sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:`rgb(110, 60, 220)`,sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:`rgb(60, 110, 230)`,sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:`rgb(100, 70, 240)`,sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:`rgb(80, 100, 210)`,sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:`rgb(90, 80, 225)`,sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:`rgb(120, 90, 245)`,sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},sunset:{dark:[{color:`rgb(255, 100, 60)`,sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(255, 180, 50)`,sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:`rgb(255, 140, 70)`,sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:`rgb(255, 80, 80)`,sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:`rgb(255, 200, 60)`,sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:`rgb(255, 120, 50)`,sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:`rgb(255, 160, 80)`,sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:`rgb(255, 90, 60)`,sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:`rgb(255, 70, 70)`,sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:`rgb(220, 80, 40)`,sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:`rgb(230, 150, 30)`,sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:`rgb(210, 110, 50)`,sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:`rgb(200, 60, 60)`,sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:`rgb(220, 170, 40)`,sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:`rgb(210, 100, 30)`,sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:`rgb(230, 130, 60)`,sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:`rgb(190, 70, 50)`,sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:`rgb(180, 50, 50)`,sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]}},K={colorful:[{color:`rgba(255, 50, 100, 0.48)`,sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:`rgba(40, 180, 220, 0.42)`,sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:`rgba(50, 200, 80, 0.48)`,sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:`rgba(180, 40, 240, 0.42)`,sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:`rgba(255, 160, 30, 0.50)`,sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:`rgba(100, 70, 255, 0.45)`,sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:`rgba(40, 140, 255, 0.40)`,sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:`rgba(240, 50, 180, 0.45)`,sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:`rgba(30, 185, 170, 0.52)`,sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],mono:[{color:`rgba(200, 200, 200, 0.48)`,sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:`rgba(170, 170, 170, 0.42)`,sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:`rgba(155, 155, 155, 0.48)`,sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:`rgba(185, 185, 185, 0.42)`,sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:`rgba(165, 165, 165, 0.50)`,sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:`rgba(180, 180, 180, 0.45)`,sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:`rgba(160, 160, 160, 0.40)`,sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:`rgba(175, 175, 175, 0.45)`,sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:`rgba(190, 190, 190, 0.52)`,sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],ocean:[{color:`rgba(100, 80, 220, 0.48)`,sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:`rgba(60, 120, 255, 0.42)`,sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:`rgba(80, 100, 200, 0.48)`,sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:`rgba(130, 70, 255, 0.42)`,sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:`rgba(70, 130, 255, 0.50)`,sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:`rgba(120, 80, 255, 0.45)`,sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:`rgba(90, 110, 230, 0.40)`,sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:`rgba(110, 90, 240, 0.45)`,sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:`rgba(140, 100, 255, 0.52)`,sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],sunset:[{color:`rgba(255, 100, 60, 0.48)`,sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:`rgba(255, 180, 50, 0.42)`,sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:`rgba(255, 140, 70, 0.48)`,sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:`rgba(255, 80, 80, 0.42)`,sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:`rgba(255, 200, 60, 0.50)`,sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:`rgba(255, 120, 50, 0.45)`,sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:`rgba(255, 160, 80, 0.40)`,sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:`rgba(255, 90, 60, 0.45)`,sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:`rgba(255, 70, 70, 0.52)`,sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}]},q={colorful:{dark:{spikes:[{color1:`rgb(100, 70, 255)`,color2:`rgba(100, 70, 255, 1)`},{color1:`rgba(255, 170, 40, 0.59)`,color2:`rgba(255, 170, 40, 0.29)`},{color1:`rgb(50, 200, 100)`,color2:`rgba(50, 200, 100, 1)`},{color1:`rgba(200, 50, 240, 0.91)`,color2:`rgba(200, 50, 240, 0.45)`},{color1:`rgb(40, 140, 255)`,color2:`rgba(40, 140, 255, 1)`}]},light:{spikes:[{color1:`rgb(80, 50, 200)`,color2:`rgba(80, 50, 200, 0.8)`},{color1:`rgba(210, 130, 0, 0.7)`,color2:`rgba(210, 130, 0, 0.46)`},{color1:`rgb(30, 160, 70)`,color2:`rgba(30, 160, 70, 0.82)`},{color1:`rgb(160, 30, 190)`,color2:`rgba(160, 30, 190, 0.7)`},{color1:`rgb(30, 100, 200)`,color2:`rgba(30, 100, 200, 0.78)`}]}},mono:{dark:{spikes:[{color1:`rgb(200, 200, 200)`,color2:`rgba(200, 200, 200, 1)`},{color1:`rgba(180, 180, 180, 0.59)`,color2:`rgba(180, 180, 180, 0.29)`},{color1:`rgb(190, 190, 190)`,color2:`rgba(190, 190, 190, 1)`},{color1:`rgba(170, 170, 170, 0.91)`,color2:`rgba(170, 170, 170, 0.45)`},{color1:`rgb(185, 185, 185)`,color2:`rgba(185, 185, 185, 1)`}]},light:{spikes:[{color1:`rgb(80, 80, 80)`,color2:`rgba(80, 80, 80, 0.8)`},{color1:`rgba(100, 100, 100, 0.7)`,color2:`rgba(100, 100, 100, 0.46)`},{color1:`rgb(70, 70, 70)`,color2:`rgba(70, 70, 70, 0.82)`},{color1:`rgb(90, 90, 90)`,color2:`rgba(90, 90, 90, 0.7)`},{color1:`rgb(85, 85, 85)`,color2:`rgba(85, 85, 85, 0.78)`}]}},ocean:{dark:{spikes:[{color1:`rgb(100, 80, 255)`,color2:`rgb(100, 80, 255)`},{color1:`rgba(80, 130, 220, 0.59)`,color2:`rgba(80, 130, 220, 0.29)`},{color1:`rgb(60, 100, 255)`,color2:`rgb(60, 100, 255)`},{color1:`rgba(90, 120, 200, 0.91)`,color2:`rgba(90, 120, 200, 0.45)`},{color1:`rgb(120, 90, 255)`,color2:`rgb(120, 90, 255)`}]},light:{spikes:[{color1:`rgb(50, 40, 180)`,color2:`rgba(50, 40, 180, 0.8)`},{color1:`rgba(40, 80, 200, 0.7)`,color2:`rgba(40, 80, 200, 0.46)`},{color1:`rgb(30, 50, 190)`,color2:`rgba(30, 50, 190, 0.82)`},{color1:`rgb(60, 90, 180)`,color2:`rgba(60, 90, 180, 0.7)`},{color1:`rgb(70, 60, 200)`,color2:`rgba(70, 60, 200, 0.78)`}]}},sunset:{dark:{spikes:[{color1:`rgb(255, 100, 80)`,color2:`rgb(255, 100, 80)`},{color1:`rgba(255, 150, 80, 0.59)`,color2:`rgba(255, 150, 80, 0.29)`},{color1:`rgb(255, 80, 60)`,color2:`rgb(255, 80, 60)`},{color1:`rgba(255, 120, 50, 0.91)`,color2:`rgba(255, 120, 50, 0.45)`},{color1:`rgb(255, 140, 70)`,color2:`rgb(255, 140, 70)`}]},light:{spikes:[{color1:`rgb(200, 60, 30)`,color2:`rgba(200, 60, 30, 0.8)`},{color1:`rgba(220, 100, 20, 0.7)`,color2:`rgba(220, 100, 20, 0.46)`},{color1:`rgb(180, 40, 20)`,color2:`rgba(180, 40, 20, 0.82)`},{color1:`rgb(210, 80, 10)`,color2:`rgba(210, 80, 10, 0.7)`},{color1:`rgb(190, 70, 30)`,color2:`rgba(190, 70, 30, 0.78)`}]}}},J=[{region:1,quad:`tl`},{region:2,quad:`tl`},{region:3,quad:`bl`},{region:1,quad:`bl`},{region:2,quad:`br`},{region:3,quad:`br`},{region:1,quad:`tr`},{region:2,quad:`tr`},{region:3,quad:`tr`}],Y=[[65,35],[55,30],[35,65],[15,30],[173,28],[80,22],[69,28],[22,38],[47,44]],X=[{ci:0,region:1,quad:`tl`,w:84,h:48},{ci:1,region:2,quad:`tl`,w:72,h:42},{ci:2,region:3,quad:`bl`,w:48,h:84},{ci:4,region:2,quad:`br`,w:216,h:38},{ci:5,region:3,quad:`br`,w:102,h:31},{ci:6,region:1,quad:`tr`,w:89,h:38},{ci:8,region:3,quad:`tr`,w:62,h:58}],Z=[{ci:0,region:1,quad:`tl`,w:80,h:19,x:`27%`,y:`0%`},{ci:6,region:2,quad:`tr`,w:74,h:11,x:`73%`,y:`-1%`},{ci:7,region:3,quad:`tr`,w:15,h:44,x:`100%`,y:`33%`},{ci:8,region:1,quad:`br`,w:19,h:38,x:`101%`,y:`72%`},{ci:4,region:2,quad:`br`,w:84,h:13,x:`67%`,y:`100%`},{ci:1,region:3,quad:`bl`,w:60,h:21,x:`24%`,y:`101%`},{ci:2,region:1,quad:`bl`,w:17,h:40,x:`0%`,y:`60%`},{ci:3,region:2,quad:`tl`,w:13,h:32,x:`-1%`,y:`28%`}],ie=[{ci:0,region:1,quad:`tl`,w:110,h:30,x:`27%`,y:`3%`},{ci:6,region:2,quad:`tr`,w:100,h:20,x:`73%`,y:`1%`},{ci:7,region:3,quad:`tr`,w:26,h:62,x:`100%`,y:`33%`},{ci:8,region:1,quad:`br`,w:30,h:56,x:`101%`,y:`72%`},{ci:4,region:2,quad:`br`,w:120,h:22,x:`67%`,y:`99%`},{ci:1,region:3,quad:`bl`,w:88,h:32,x:`24%`,y:`99%`},{ci:2,region:1,quad:`bl`,w:28,h:58,x:`0%`,y:`60%`}]})))()}function oe(){let[e,t]=(0,Q.useState)(()=>typeof window>`u`||window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`);return(0,Q.useEffect)(()=>{if(typeof window>`u`)return;let e=window.matchMedia(`(prefers-color-scheme: dark)`),n=e=>{t(e.matches?`dark`:`light`)};return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function se(e,t){return e===`auto`?t:e}function ce({ref:e,children:t,size:n=`md`,colorVariant:i=`colorful`,theme:a=`dark`,staticColors:o=!1,duration:s,active:c=!0,borderRadius:u,borderWidth:d,beamLength:f=1,brightness:p,saturation:m,hueRange:h=30,strength:g=1,className:_,style:v,onActivate:y,onDeactivate:b,onAnimationEnd:x,...S}){var C,w;let T=(0,Q.useId)().replace(/:/g,`-`),E=oe(),D=(0,Q.useRef)(null),[O,k]=(0,Q.useState)(c),[A,j]=(0,Q.useState)(!1),[M,ee]=(0,Q.useState)(!0),[N,P]=(0,Q.useState)(null),[I,L]=(0,Q.useState)({x:1,y:1});(0,Q.useEffect)(()=>{if(u!=null)return;let e=D.current;if(!e)return;let t=()=>{let t=e.firstElementChild;if(!t)return;let n=getComputedStyle(t),r=parseFloat(n.borderTopLeftRadius);!isNaN(r)&&r>0&&P(r)};t();let n=new MutationObserver(t);return n.observe(e,{childList:!0,subtree:!1}),()=>n.disconnect()},[u,t]),(0,Q.useEffect)(()=>{c&&!O&&!A?k(!0):!c&&O&&!A&&j(!0)},[c,O,A]),(0,Q.useEffect)(()=>{let e=D.current;if(!e||typeof IntersectionObserver>`u`)return;let t=new IntersectionObserver(e=>{for(let t of e)ee(t.isIntersecting)},{rootMargin:`256px`});return t.observe(e),()=>t.disconnect()},[]),(0,Q.useEffect)(()=>{if(n!==`pulse-outside`){L({x:1,y:1});return}let e=D.current;if(!e)return;let t=e=>Math.max(.35,Math.min(4,e)),r=()=>{let n=e.firstElementChild;if(!n)return;let r=n.getBoundingClientRect();if(!r.width||!r.height)return;let i=+t(r.width/350).toFixed(3),a=+t(r.height/140).toFixed(3);L(e=>e.x===i&&e.y===a?e:{x:i,y:a})};if(r(),typeof ResizeObserver>`u`)return;let i=e.firstElementChild;if(!i)return;let a=new ResizeObserver(r);return a.observe(i),()=>a.disconnect()},[n,t]);let R=(0,Q.useCallback)(e=>{let t=e.animationName;t.includes(`fade-out`)?(k(!1),j(!1),b==null||b()):t.includes(`fade-in`)&&(y==null||y()),x==null||x(e)},[y,b,x]),z=se(a,E),B=H[n][z],ne=re[n],V=n===`pulse-inner`||n===`pulse-outside`,U=(C=u==null?N:u)==null?ne.borderRadius:C,W=d==null?ne.borderWidth:d,G=s==null?n===`line`?3.1:V?2.3:1.96:s,K=m==null?B.saturation:m,q=(w=p==null?B.brightness:p)==null?1.3:w,J=n===`line`?Math.min(h,13):h,Y=i===`mono`||o,X=(0,Q.useMemo)(()=>te({id:T,borderRadius:U,borderWidth:W,beamLength:f,duration:G,strokeOpacity:B.strokeOpacity,innerOpacity:B.innerOpacity,bloomOpacity:B.bloomOpacity,innerShadow:B.innerShadow,size:n,colorVariant:i,staticColors:Y,brightness:q,saturation:K,hueRange:J,theme:z,hairlineOpacity:B.hairlineOpacity}),[T,U,W,f,G,B.strokeOpacity,B.innerOpacity,B.bloomOpacity,B.innerShadow,B.hairlineOpacity,n,i,Y,q,K,J,z]),Z=(0,Q.useMemo)(()=>V?F(n,z,G,J,Y,T):null,[V,n,z,G,J,Y,T]);(0,Q.useEffect)(()=>{if(!Z||!(O||A)||!M)return;let e=D.current;if(e&&!r())return l(e,Z)},[Z,O,A,M]);let ie=(0,Q.useCallback)(t=>{D.current=t,typeof e==`function`?e(t):e&&(e.current=t)},[e]),ae={...v==null?{}:v,"--beam-strength":Math.max(0,Math.min(1,g)),...n===`pulse-outside`?{"--pulse-glow-sx":I.x,"--pulse-glow-sy":I.y}:{}};return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`style`,{children:X}),(0,$.jsxs)(`div`,{...S,ref:ie,"data-beam":T,"data-active":O&&!A?``:void 0,"data-fading":A?``:void 0,"data-paused":O&&!A&&!M?``:void 0,className:_,style:ae,onAnimationEnd:R,children:[t,(0,$.jsx)(`div`,{"data-beam-bloom":!0})]})]})}var Q,$;function le(){return(le=e((()=>{i(),Q=n(),h(),ae(),$=t()})))()}export{le as n,ce as t};
//# debugId=1f807af0-da71-553b-9312-6056c8c97b4e

//# chunkId=1f807af0-da71-553b-9312-6056c8c97b4e