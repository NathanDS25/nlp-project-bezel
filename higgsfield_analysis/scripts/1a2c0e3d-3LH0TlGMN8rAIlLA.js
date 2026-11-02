!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="93e26747-52cb-57f4-9889-be0ee0c02cf6")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Lf as r,Rf as i}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{g as a,l as o}from"./1a2c0e3d-RXMFpnCHih4po08F.js";import{_ as s,n as c}from"./1a2c0e3d-yEUD4lq8e7_10Gkp.js";import{a as l,n as u,o as d,r as f,t as p}from"./1a2c0e3d-gUP-nPfpkmYV7FTx.js";var m;function h(){return(h=e((()=>{m={aspectRatio:`1:1`,background:`color`,direction:`reference`,drift:1,flat:1,font:`baloo`,grow:.246,holeX:.35,holeY:.6,ink:`#FE171D`,letters:15,paper:`#D6BAF5`,seed:7,speed:1,squash:1,text:`FOCUS`,texture:0,twist:`reference`,zoom:1}})))()}function g({value:e,onChange:t}){let{_:n}=i(),r=(0,_.useMemo)(()=>({effectId:`funnel-type`,title:n({id:`mEGSrm`}),prompt:null,ui:{advancedSectionGap:`compact`,mobilePresetControlId:`background`,panelSectionGap:`compact`,primarySectionPlacement:`advanced`},primarySection:{id:`motion`,label:n({id:`itfxKl`}),surface:`card`,controls:[{type:`slider`,id:`speed`,label:n({id:`l9wI00`}),defaultValue:1,min:.25,max:3,step:.05}]},advancedSections:[{id:`background`,label:n({id:`GtJbUa`}),surface:`card`,comfortableBottom:e.background!==`color`,controlBlockGap:`comfortable`,controls:[{type:`choice`,id:`background`,label:n({id:`GtJbUa`}),defaultValue:`color`,variant:`sound`,gridColumns:2,options:[{id:`color`,label:n({id:`PWXDu-`})},{id:`media`,label:n({id:`xYilR2`})},{id:`none`,label:n({id:`sQyiWm`})}]},...e.background===`color`?[{type:`color`,id:`paper`,label:n({id:`PWXDu-`}),defaultValue:`#D6BAF5`,variant:`surface`}]:[]]},{id:`typography`,label:n({id:`nWRfmt`}),info:n({id:`9TWac-`}),surface:`card`,controlBlockGap:`comfortable`,controls:[{type:`choice`,id:`font`,defaultValue:`baloo`,variant:`font-grid`,gridColumns:2,options:[{id:`baloo`,label:n({id:`l9MBeX`}),fontFamily:`Baloo 2`,fontSource:`/viral-hub/presets/funnel-type/fonts/baloo2-800.woff2`,fontWeight:800},{id:`nunito`,label:n({id:`kaRKjl`}),fontFamily:`Nunito`,fontSource:`/viral-hub/presets/funnel-type/fonts/nunito-900.woff2`,fontWeight:900},{id:`archivo-black`,label:n({id:`b2D_03`}),fontFamily:`Archivo Black`,fontSource:`/viral-hub/presets/funnel-type/fonts/archivo-black.woff2`,fontWeight:400}]},{type:`slider`,id:`texture`,label:n({id:`1Cuk5n`}),defaultValue:0,min:0,max:1,step:.01},{type:`color`,id:`ink`,label:n({id:`MapzEo`}),defaultValue:`#FE171D`,variant:`surface`}]},{id:`text-funnel`,label:n({id:`09nJ5S`}),surface:`card`,controlBlockGap:`spacious`,controlGroupGap:`compact`,controlGroupLabels:{twist:n({id:`Uz09HI`}),direction:n({id:`MI9HNR`})},controlGroupInfos:{twist:n({id:`b-61LP`}),direction:n({id:`8pQMnY`})},controls:[{type:`slider`,id:`letters`,label:n({id:`7uJAnp`}),defaultValue:15,min:6,max:30,step:1},{type:`slider`,id:`zoom`,label:n({id:`ACjxWW`}),defaultValue:1,min:.3,max:3,step:.01},{type:`slider`,id:`grow`,label:n({id:`6Q13Dx`}),defaultValue:.246,min:.12,max:.45,step:.005},{type:`slider`,id:`flat`,label:n({id:`I7EAdU`}),defaultValue:1,min:.5,max:1.5,step:.01},{type:`slider`,id:`drift`,label:n({id:`pJbyPU`}),defaultValue:1,min:0,max:2.5,step:.01},{type:`slider`,id:`squash`,label:n({id:`qx49l7`}),defaultValue:1,min:.5,max:1.5,step:.01},{type:`slider`,id:`seed`,label:n({id:`gq6UJs`}),defaultValue:7,min:0,max:99,step:1},{type:`choice`,id:`twist`,label:n({id:`Uz09HI`}),defaultValue:`reference`,variant:`segmented`,options:[{id:`reference`,label:n({id:`N2C89m`})},{id:`mirrored`,label:n({id:`dlJx6x`})}]},{type:`choice`,id:`direction`,label:n({id:`MI9HNR`}),defaultValue:`reference`,variant:`segmented`,options:[{id:`reference`,label:n({id:`N2C89m`})},{id:`reversed`,label:n({id:`035DvW`})}]}]},{id:`funnel-position`,label:n({id:`amV7ns`}),info:n({id:`0aYxt5`}),surface:`card`,controls:[{type:`axis`,id:`funnelPosition`,label:n({id:`amV7ns`}),labels:[n({id:`cfF5xw`}),n({id:`YqxyYd`})],defaultValue:[.35,.6],min:.1,max:.9,step:.005}]}]}),[n,e.background]),a=(0,_.useMemo)(()=>({speed:e.speed,background:e.background,ink:e.ink,paper:e.paper,texture:e.texture,font:e.font,letters:e.letters,zoom:e.zoom,grow:e.grow,flat:e.flat,drift:e.drift,squash:e.squash,funnelPosition:[e.holeX,e.holeY],twist:e.twist,direction:e.direction,seed:e.seed}),[e]),o=(0,_.useCallback)((n,r)=>{if(n===`funnelPosition`){let[n,i]=r;t({...e,holeX:n,holeY:i})}else t({...e,[n]:r})},[t,e]);return(0,v.jsx)(c,{definition:r,values:a,onValueChange:o})}var _,v;function y(){return(y=e((()=>{s(),r(),_=n(),v=t()})))()}function b(){let e=200/30,t=null,n=null,r=null,i=null,a=null,o=null,s={},c=null,l=``,u=new Map,d=0,p=null,m=!1,h=(e,t,n)=>e<t?t:e>n?n:e,g=e=>`rgb(${Math.round(h(e[0],0,1)*255)},${Math.round(h(e[1],0,1)*255)},${Math.round(h(e[2],0,1)*255)})`,_=[{fam:`Baloo 2`,w:800,file:`baloo2-800.woff2`},{fam:`Nunito`,w:900,file:`nunito-900.woff2`},{fam:`Archivo Black`,w:400,file:`archivo-black.woff2`}],v=`"Arial Black", "Avenir Next Heavy", system-ui, sans-serif`;async function y(e){let t=`${e.fam}:${e.w}`;try{let n=await(await fetch(`${x}/${e.file}`,{signal:p==null?void 0:p.signal})).arrayBuffer(),r=new FontFace(e.fam,n,{weight:String(e.w)});await r.load(),document.fonts.add(r),u.set(t,`ready`)}catch(e){u.set(t,`failed`)}d++}function b(e){var t;let n=(t=_[e.uFont|0])==null?_[0]:t,r=`${n.fam}:${n.w}`;return u.get(r)?null:(u.set(r,`loading`),y(n))}function S(e){var t,n;let r=i,a=(t=_[e.uFont|0])==null?_[0]:t,o=u.get(`${a.fam}:${a.w}`)===`ready`,s=(String((n=e.uText)==null?`FOCUS`:n).trim()||`FOCUS`).toUpperCase(),f=`${s}¦${a.fam}¦${o}¦${d}`;if(f===l&&c)return;l=f;let p=460.8,m=s.length,h=new OffscreenCanvas(8,8),g=h.getContext(`2d`);g.font=`${a.w} 100px ${o?`"${a.fam}", `:``}${v}`;let y=p/((g.measureText(`H`).actualBoundingBoxAscent||72)/100);h.width=369*m,h.height=512,g.font=`${a.w} ${y}px ${o?`"${a.fam}", `:``}${v}`,g.fillStyle=`#fff`,g.textBaseline=`alphabetic`;for(let e=0;e<m;e++){let t=s[e],n=Math.max(1,g.measureText(t).width),r=Math.min(1.7,Math.max(.4,339.48/n)),i=(r<1?p*.035*(1/r-1):0)+p*.01;g.save(),g.translate(e*369+369/2,486.4),g.scale(r,1);let a=Math.min(9,3+Math.ceil(i/(p*.012)));for(let e=0;e<a;e++){let r=a===1?0:(e/(a-1)-.5)*i;g.fillText(t,-n/2+r,0)}g.restore()}c||(c=r.createTexture()),r.bindTexture(r.TEXTURE_2D,c),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,h),r.generateMipmap(r.TEXTURE_2D),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.REPEAT),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR_MIPMAP_LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR);let b=r.getExtension(`EXT_texture_filter_anisotropic`);b&&r.texParameterf(r.TEXTURE_2D,b.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)||1))}function C(){let e=i,t=(t,n)=>{let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(r)||`shader`);return r};if(a=e.createProgram(),e.attachShader(a,t(e.VERTEX_SHADER,`#version 300 es
  layout(location=0) in vec2 aP;
  out vec2 vUV;
  void main() { vUV = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }`)),e.attachShader(a,t(e.FRAGMENT_SHADER,`#version 300 es
  precision highp float;
  in vec2 vUV;
  out vec4 oC;

  uniform vec2 uRes;
  uniform vec2 uHole;        // throat position, fraction of frame
  uniform float uSquash;     // vertical squash of the composition
  uniform float uA0;         // ring 0 horizontal semi-axis, frame-height units
  uniform float uGrow;       // ln of per-ring growth at the throat
  uniform float uAsp0;       // ring flatness at k=0 (measured 0.441)
  uniform float uAspSlope;   // flatness gain per ring (measured 0.0499)
  uniform vec2 uC0;          // ring-0 center offset from the hole
  uniform vec2 uD1;          // center drift per ring
  uniform vec2 uD2;          // quadratic center drift
  uniform float uR0;         // base ellipse tilt
  uniform float uR1;         // tilt gain per ring — the twist
  uniform float uGA;         // decelerating-growth amplitude
  uniform float uLetters;    // letter columns per ring
  uniform float uWordLen;    // letters in the word
  uniform float uSpin;       // screw phase, in letter columns
  uniform float uFlow;       // ring-flow phase
  uniform float uTwist;      // ±1: which way the word-wrap twists the columns
  uniform float uFlipU;      // handedness of the reading direction
  uniform float uFlipV;      // handedness of the glyph tops
  uniform vec3 uInkC;
  uniform vec3 uPaperC;
  uniform int uBgMode;       // 0 paper, 1 transparent (media/none composite in 2D)
  uniform float uTexAmt;
  uniform float uT12;        // 12fps-quantized clock for the print texture
  uniform float uSeedF;
  uniform sampler2D uAtlas;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
  float noise1(float x) {
    float i = floor(x), f = fract(x);
    float a = hash12(vec2(i, 7.7)), b = hash12(vec2(i + 1.0, 7.7));
    return mix(a, b, f * f * (3.0 - 2.0 * f));
  }

  // Ring size reaches zero at k=0. This creates an apex, not an inner floor.
  float ringE(vec2 q, float k) {
    float kp = max(k, 0.0);
    float a = uA0 * max(exp(uGrow * kp + uGA * (1.0 - exp(-kp / 1.32))) - 1.0, 0.00005);
    float kc = clamp(k, 0.0, 8.0);
    vec2 c = uC0 + uD1 * kc + uD2 * kc * kc;
    float th = uR0 + uR1 * kc;
    float cs = cos(th), sn = sin(th);
    vec2 d = q - c;
    d = vec2(cs * d.x + sn * d.y, -sn * d.x + cs * d.y);
    float asp = uAsp0 + uAspSlope * k;
    float b = a * clamp(asp, 0.28, 0.96);
    vec2 e = vec2(d.x / a, d.y / b);
    return dot(e, e) - 1.0;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 q = vec2((vUV.x - uHole.x) * aspect, ((1.0 - vUV.y) - uHole.y) * uSquash);

    float alpha = 0.0;
    {
      float kLo = 0.0, kHi = 34.0;
      float eLo = ringE(q, kLo);
      float vv0;
      if (eLo <= 0.0) {
        vv0 = kLo;
      } else {
        for (int i = 0; i < 32; i++) {
          float km = 0.5 * (kLo + kHi);
          if (ringE(q, km) > 0.0) kLo = km; else kHi = km;
        }
        vv0 = 0.5 * (kLo + kHi);
      }
      {
        float kp2 = max(vv0, 0.0);
        float a = uA0 * max(exp(uGrow * kp2 + uGA * (1.0 - exp(-kp2 / 1.32))) - 1.0, 0.00005);
        float kc = clamp(vv0, 0.0, 8.0);
        vec2 c = uC0 + uD1 * kc + uD2 * kc * kc;
        float th = uR0 + uR1 * kc;
        float cs = cos(th), sn = sin(th);
        vec2 dd = q - c;
        dd = vec2(cs * dd.x + sn * dd.y, -sn * dd.x + cs * dd.y);
        float asp = uAsp0 + uAspSlope * vv0;
        float b = a * clamp(asp, 0.28, 0.96);
        float phi = atan(dd.x / a, -dd.y / b);
        float phiU = uFlipU > 0.5 ? (3.14159265 - phi) : (phi + 3.14159265);
        float lu = phiU / 6.2831853 * uLetters + uSpin;
        float vv = vv0 - uFlow;
        float nW = max(uWordLen, 1.0);
        float u = fract(lu / uLetters);
        float m = floor(vv);
        float withinV = fract(vv);
        float gLet = u * uLetters + uTwist * m * uLetters;
        float gidx = mod(mod(floor(gLet), nW) + nW, nW);
        vec2 tc = vec2((gidx + fract(gLet)) / nW, uFlipV > 0.5 ? 1.0 - withinV : withinV);
        float uB = fract(lu / uLetters + 0.5);
        vec2 dA = vec2(dFdx(u), dFdy(u));
        vec2 dB = vec2(dFdx(uB), dFdy(uB));
        vec2 du = dot(dA, dA) <= dot(dB, dB) ? dA : dB;
        vec2 dv = vec2(dFdx(vv), dFdy(vv));
        float fwS = abs(dv.x) + abs(dv.y);
        vec2 ddx = vec2(uLetters * du.x / nW, dv.x);
        vec2 ddy = vec2(uLetters * du.y / nW, dv.y);
        float aTex = textureGrad(uAtlas, tc, ddx, ddy).a;
        // crisp edges at readable scales; grazing / throat zones blend to the
        // boosted mip average — dense ink mush like the reference
        float lod = fwS * uRes.y * 0.006;
        float w = clamp(fwS * 1.2 + 0.02, 0.02, 0.35);
        float sharp = smoothstep(0.5 - w, 0.5 + w, aTex);
        float deep = clamp((aTex - 0.22) * 1.7, 0.0, 1.0);
        alpha = mix(sharp, deep, clamp(lod - 0.75, 0.0, 1.0));
      }
    }

    vec3 ink = uInkC;
    float paperNoise = 0.0;
    if (uTexAmt > 0.001) {
      vec2 px = vUV * uRes;
      float roll = floor(uT12 * 61.7 + uSeedF * 13.1);
      float band = noise1(px.y * 0.055 + roll * 17.3)
                 * (0.45 + 0.55 * noise1(px.y * 0.009 + roll * 7.7));
      band = band * band * 1.6;
      ink = mix(ink, mix(ink, vec3(0.74), 0.8), clamp(band, 0.0, 1.0) * uTexAmt * 0.85);
      float nib = hash12(px * 0.9 + vec2(roll * 3.1, roll * 5.7));
      alpha = clamp(alpha - (nib - 0.5) * 1.25 * uTexAmt * (1.0 - abs(alpha - 0.5) * 1.4), 0.0, 1.0);
      float sp = hash12(px * 0.53 + vec2(roll * 9.3, uSeedF));
      paperNoise = (sp > 0.968 ? (sp - 0.968) * 22.0 : 0.0) * uTexAmt
                 + (hash12(px * 1.7 + vec2(uSeedF, roll)) - 0.5) * 0.10 * uTexAmt;
    }

    if (uBgMode == 0) {
      vec3 paper = uPaperC * (1.0 - paperNoise * 0.5);
      oC = vec4(mix(paper, ink, alpha), 1.0);
    } else {
      oC = vec4(ink * alpha, alpha);
    }
  }`)),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error(e.getProgramInfoLog(a)||`link`);o=e.createVertexArray(),e.bindVertexArray(o);let n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);let r=`uRes.uHole.uSquash.uA0.uGrow.uAsp0.uAspSlope.uC0.uD1.uD2.uR0.uR1.uGA.uLetters.uWordLen.uSpin.uFlow.uTwist.uFlipU.uFlipV.uInkC.uPaperC.uBgMode.uTexAmt.uT12.uSeedF.uAtlas`.split(`.`);s={};for(let t of r)s[t]=e.getUniformLocation(a,t)}function w(e,t){if(m)return!1;if(!r){r=new OffscreenCanvas(e,t);try{if(i=r.getContext(`webgl2`,{premultipliedAlpha:!0,antialias:!1}),!i)throw Error(`no webgl2`);C()}catch(e){return m=!0,!1}}return(r.width!==e||r.height!==t)&&(r.width=e,r.height=t),!0}return{duration(t){let n=h(+t.uSpeed||1,.05,8);return e/n},async prepareFonts(e,t){p={signal:t},await b(e)},process(l,{width:u,height:d,time:p,params:m}){var _;t||(t=new OffscreenCanvas(u,d),n=t.getContext(`2d`)),(t.width!==u||t.height!==d)&&(t.width=u,t.height=d);let y=n;b(m);let x=m.uBg|0;if(y.setTransform(1,0,0,1,0,0),y.globalAlpha=1,y.clearRect(0,0,u,d),x===0?(y.fillStyle=g(m.uPaper||[.839,.729,.961]),y.fillRect(0,0,u,d)):x===1&&l&&f(y,l,u,d),!w(u,d)||!i){var C;let e=(String((C=m.uText)==null?`FOCUS`:C).trim()||`FOCUS`).toUpperCase();return y.fillStyle=g(m.uInk||[1,.09,.11]),y.font=`800 ${Math.round(d*.14)}px ${v}`,y.textAlign=`center`,y.textBaseline=`middle`,y.fillText(e,u/2,d/2),t}let T=i;S(m);let E=h(+m.uSpeed||1,.05,8),D=(String((_=m.uText)==null?`FOCUS`:_).trim()||`FOCUS`).toUpperCase(),O=Math.max(1,D.length),k=h(m.uLetters|0||15,4,40),A=O*Math.max(1,Math.round(k/O)),j=(m.uDir|0)==1?1:-1,M=(m.uTwist|0)==1?-1:1,N=m.uLoop===!1?Math.min(p,e/E-.001):p,P=N*E/e,F=j*5,I=F,L=!1;for(let e=0;e<=O+4;e++){for(let t of e===0?[F]:[F-e,F+e])if(((t-M*-3*A)%O+O)%O===0){I=t,L=!0;break}if(L)break}let R=P*I+1,z=P*-3,B=Math.floor(Math.max(0,N)*E*12)/12;T.viewport(0,0,u,d),T.disable(T.DEPTH_TEST),T.disable(T.BLEND),T.clearColor(0,0,0,0),T.clear(T.COLOR_BUFFER_BIT),T.useProgram(a),T.bindVertexArray(o),T.activeTexture(T.TEXTURE0),T.bindTexture(T.TEXTURE_2D,c),T.uniform1i(s.uAtlas,0),T.uniform2f(s.uRes,u,d),T.uniform2f(s.uHole,h(+m.uHoleX,0,1),h(+m.uHoleY,0,1));let V=h(+m.uZoom,.3,3),H=h(+m.uGrow,.12,.45),U=h(+m.uFlat,.5,1.5),W=h(+m.uDrift,0,2.5);T.uniform1f(s.uSquash,h(+m.uSquash,.5,1.5)),T.uniform1f(s.uA0,.0595*V),T.uniform1f(s.uGrow,H),T.uniform1f(s.uGA,0),T.uniform1f(s.uAsp0,.441*U),T.uniform1f(s.uAspSlope,.018*U),T.uniform2f(s.uC0,0,0),T.uniform2f(s.uD1,0,-.028*W),T.uniform2f(s.uD2,3e-4*W,-4e-4*W),T.uniform1f(s.uR0,0),T.uniform1f(s.uR1,-.01*W),T.uniform1f(s.uLetters,A),T.uniform1f(s.uWordLen,O),T.uniform1f(s.uSpin,R),T.uniform1f(s.uFlow,z),T.uniform1f(s.uTwist,M),T.uniform1f(s.uFlipU,0),T.uniform1f(s.uFlipV,1);let G=m.uInk||[.996,.09,.114],K=m.uPaper||[.839,.729,.961];return T.uniform3f(s.uInkC,G[0],G[1],G[2]),T.uniform3f(s.uPaperC,K[0],K[1],K[2]),T.uniform1i(s.uBgMode,x===0?0:1),T.uniform1f(s.uTexAmt,h(+m.uTexture||0,0,1)),T.uniform1f(s.uT12,B),T.uniform1f(s.uSeedF,m.uSeed|0||0),T.drawArrays(T.TRIANGLES,0,3),y.drawImage(r,0,0),t},dispose(){try{var e;i==null||(e=i.getExtension(`WEBGL_lose_context`))==null||e.loseContext()}catch(e){}t=null,n=null,r=null,i=null,a=null,o=null,s={},c=null,l=``,u.clear()}}}var x;function S(){return(S=e((()=>{x=`/viral-hub/presets/funnel-type/fonts`})))()}function C(e,t){let n=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!n)return[t[0],t[1],t[2]];let r=Number.parseInt(n[1],16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function w(e){return{uText:e.text,uSpeed:e.speed,uInk:C(e.ink,[.996,.09,.114]),uPaper:C(e.paper,[.839,.729,.961]),uBg:{color:0,media:1,none:2}[e.background],uTexture:e.texture,uLetters:e.letters,uHoleX:e.holeX,uHoleY:e.holeY,uSquash:e.squash,uZoom:e.zoom,uGrow:e.grow,uFlat:e.flat,uDrift:e.drift,uTwist:+(e.twist===`mirrored`),uFont:{baloo:0,nunito:1,"archivo-black":2}[e.font],uDir:+(e.direction===`reversed`),uLoop:!0,uSeed:e.seed}}function T(e,t){let n=w(t),r=D[t.aspectRatio],i=e.engine.duration(n),a=p({engine:e.engine,media:e.media,mediaImage:e.mediaImage,params:n,size:r,time:e=>e/E});return{kind:`frames`,width:r.width,height:r.height,fps:E,totalFrames:Math.max(1,Math.ceil(i*E)),alpha:t.background===`none`,...a}}var E,D;function O(){return(O=e((()=>{u(),E=30,D={"1:1":{width:1080,height:1080},"9:16":{width:1080,height:1920},"4:5":{width:1080,height:1350},"16:9":{width:1920,height:1080}}})))()}var k;function A(){return(A=e((()=>{l(),o(),y(),S(),O(),h(),k={id:`funnel-type`,kind:`code`,name:`Funnel Type`,description:`A word spirals down a 3D text funnel on a seamless screw loop, 1:1 to the FOCUS reference.`,thumbnailUrl:`https://static.higgsfield.ai/public/viral-hub/presets/funnel-type/thumbnail.webp`,defaultSettings:m,Settings:g,inputs:[{id:`text`,kind:`text`,label:`Word`,placeholder:`FOCUS`,defaultValue:`FOCUS`,maxLength:12,affects:`render`,mobilePosition:`first`,required:!0},{id:`media`,kind:`media`,label:`Background media (optional)`,accept:`media`,min:0,max:1,affects:`apply`},{id:`aspectRatio`,kind:`select`,label:`Aspect ratio`,defaultValue:`1:1`,options:[{id:`1:1`,name:`1:1`},{id:`9:16`,name:`9:16`},{id:`4:5`,name:`4:5`},{id:`16:9`,name:`16:9`}],affects:`render`}],async apply({inputs:e,signal:t}){let n=b();await n.prepareFonts(w(m),t);let r=Array.isArray(e.media)?e.media[0]:void 0,i=await d(r,t,()=>n.dispose());return{artifact:{engine:n,...i.artifact},initialSettings:{...m,text:typeof e.text==`string`&&e.text.trim()?e.text:m.text,background:r?`media`:m.background},applySettings:a(r),Settings:g,dispose(){i.dispose(),n.dispose()},render({artifact:e,inputs:t,settings:n}){return T(e,{...n,text:typeof t.text==`string`&&t.text.trim()?t.text:n.text,aspectRatio:t.aspectRatio||n.aspectRatio})}}}}})))()}export{A as n,k as t};
//# debugId=93e26747-52cb-57f4-9889-be0ee0c02cf6

//# chunkId=93e26747-52cb-57f4-9889-be0ee0c02cf6