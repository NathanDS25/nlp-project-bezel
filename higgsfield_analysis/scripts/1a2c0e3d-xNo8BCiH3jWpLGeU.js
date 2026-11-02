!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="558bb000-d3eb-50f1-9d49-185f9f5f2bde")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{g as t,h as n}from"./1a2c0e3d-Pf8INxYMCRI-tPPR.js";function r(e,t,n){let r=(t,n,r)=>{let i=e.createShader(t);if(!i)throw Error(`effect-shader: could not create the ${r} shader`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){var a;let t=(a=e.getShaderInfoLog(i))==null?`no log`:a;throw e.deleteShader(i),Error(`effect-shader: ${r} shader did not compile: ${t.trim()}`)}return i},i=r(e.VERTEX_SHADER,t,`vertex`),a=null,o=null;try{if(a=r(e.FRAGMENT_SHADER,n,`fragment`),o=e.createProgram(),!o)throw Error(`effect-shader: could not create the program`);if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){var s;let t=(s=e.getProgramInfoLog(o))==null?`no log`:s;throw e.deleteProgram(o),o=null,Error(`effect-shader: program did not link: ${t.trim()}`)}return o}catch(t){throw o&&e.deleteProgram(o),t}finally{a&&e.deleteShader(a),e.deleteShader(i)}}function i(e,t,n){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}function a(e,t,n){e.viewport(0,0,t,n),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3)}function o(e,t){if(!T.test(e)||/^(?:gl_|webgl_|_webgl_)/i.test(e)||e.includes(`__`))throw Error(`effect "shader": ${t} "${e}" is not a legal GLSL identifier`);if(E.has(e))throw Error(`effect "shader": ${t} "${e}" is reserved by a builtin uniform`)}function s(e){if(e===void 0)return[];if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`effect "shader": params.textures must be an object keyed by sampler name`);let t=Object.entries(e);if(t.length>D)throw Error(`effect "shader": params.textures accepts at most ${D} named textures`);return t.map(([e,t])=>{var n,r;if(o(e,`texture`),!t||typeof t!=`object`||Array.isArray(t))throw Error(`effect "shader": texture "${e}" must be an object with an assetId`);let i=t,a=Object.keys(i).find(e=>![`assetId`,`wrap`,`filter`].includes(e));if(a)throw Error(`effect "shader": texture "${e}" has unsupported field "${a}"`);let s=i.assetId;if(typeof s!=`string`||s.trim()===``||N.test(s.trim()))throw Error(`effect "shader": texture "${e}" asset id must name a project asset, not a URL`);let c=(n=i.wrap)==null?`clamp`:n;if(c!==`clamp`&&c!==`repeat`&&c!==`mirror`)throw Error(`effect "shader": texture "${e}" wrap must be "clamp", "repeat", or "mirror"`);let l=(r=i.filter)==null?`linear`:r;if(l!==`linear`&&l!==`nearest`)throw Error(`effect "shader": texture "${e}" filter must be "linear" or "nearest"`);return[e,{assetId:s.trim(),wrap:c,filter:l}]})}function c(e,t,n=[]){let r=t.map(e=>`uniform float u_${e};`);return`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform vec2 u_resolution;
uniform float u_time;
${[...n.map(e=>`uniform sampler2D u_${e};`),...r].join(`
`)}
in vec2 v_uv;
out vec4 outColor;
${e}
void main() { outColor = pixel(v_uv); }
`}function l(e){let t=e.glsl;if(typeof t!=`string`||t.trim()===``)throw Error('effect "shader": params.glsl must be GLSL source defining `vec4 pixel(vec2 uv)`');if(!/vec4\s+pixel\s*\(/.test(t))throw Error('effect "shader": the GLSL must define `vec4 pixel(vec2 uv)` — the wrapper owns main()');let n=s(e.textures),r=new Set(n.map(([e])=>e)),i=[];for(let[t,n]of Object.entries(e))if(t!==`glsl`&&t!==`textures`){if(o(t,`param`),r.has(t))throw Error(`effect "shader": float/sampler collision for uniform u_${t}`);if(typeof n!=`number`||!Number.isFinite(n))throw Error(`effect "shader": param "${t}" must be a finite number — every param becomes a float uniform u_${t}`);i.push([t,n])}return{glsl:t,floats:i,textures:n}}function u(e){return`${e.assetId}\u0000${e.wrap}\u0000${e.filter}`}function d(e,t){let n=e=>Number.isInteger(e)&&e>0&&e<=j;if(!n(t.width)||!n(t.height)||t.width*t.height>M)throw Error(`effect "shader": texture asset "${e}" has invalid dimensions ${t.width}x${t.height}; maximum is ${j}px per side and ${M} pixels`)}function f(e){let t=0,n=[];for(let r of e.split(/\r?\n/)){let e=r.trim();if(e===``||e.startsWith(`#`)||e.startsWith(`TITLE`))continue;if(e.startsWith(`LUT_1D_SIZE`))throw Error(`lut: 1D .cube files are not supported — export a 3D LUT`);if(e.startsWith(`LUT_3D_SIZE`)){t=Number(e.split(/\s+/)[1]);continue}if(e.startsWith(`DOMAIN_MIN`)||e.startsWith(`DOMAIN_MAX`)){let t=e.split(/\s+/).slice(1).map(Number),n=+!e.startsWith(`DOMAIN_MIN`);if(t.some(e=>e!==n))throw Error(`lut: ${e.split(/\s+/)[0]} other than ${n} ${n} ${n} is not supported`);continue}let i=e.split(/\s+/);if(i.length===3&&i.every(e=>/^[-+0-9.eE]+$/.test(e)))for(let e of i)n.push(Number(e))}if(!Number.isInteger(t)||t<2||t>256)throw Error(`lut: LUT_3D_SIZE must be an integer 2..256, got ${t||`nothing`}`);if(n.length!==t*t*t*3)throw Error(`lut: expected ${t*t*t} rgb rows for LUT_3D_SIZE ${t}, got ${n.length/3}`);let r=new Uint8Array(t*t*t*4),i=0;for(let e=0;e<t;e++)for(let a=0;a<t;a++)for(let o=0;o<t;o++){let s=e*t+o,c=(a*t*t+s)*4;r[c]=Math.round(Math.min(Math.max(n[i++],0),1)*255),r[c+1]=Math.round(Math.min(Math.max(n[i++],0),1)*255),r[c+2]=Math.round(Math.min(Math.max(n[i++],0),1)*255),r[c+3]=255}return{size:t,pixels:r}}function p(e){if(typeof e!=`string`)return null;let t=e.trim().replace(/^#/,``),n=t.length===3?t.split(``).map(e=>e+e).join(``)+`ff`:t.length===6?`${t}ff`:t.length===8?t:null;if(!n||!/^[0-9a-fA-F]{8}$/.test(n))return null;let r=e=>Number.parseInt(n.slice(e*2,e*2+2),16)/255;return[r(0),r(1),r(2),r(3)]}function m(e,t){var n,r;let i=e[t.id],a=typeof t.default==`number`?t.default:0,o=typeof i==`number`&&Number.isFinite(i)?i:typeof i==`boolean`?Number(i):a,s=(n=t.min)==null?-1/0:n,c=(r=t.max)==null?1/0:r;return Math.min(c,Math.max(s,o))}function h(e,t){var n,r;let i=new Map,a=new Map;for(let o of e)if(o.kind===`color`)a.set(o.uniform,(n=(r=p(t[o.id]))==null?p(o.default):r)==null?[1,1,1,1]:n);else if(o.kind===`boolean`){let e=t[o.id],n=typeof e==`boolean`?e:typeof e==`number`?e>.5:o.default===!0;i.set(o.uniform,+!!n)}else i.set(o.uniform,m(t,o));return{colors:a,floats:i}}function g(e,t){if(e===`film-grain`){let{floats:e}=h(B,t);return e.get(`u_grainAmount`)===0&&e.get(`u_scratchIntensity`)===0&&e.get(`u_vignetteStrength`)===0&&e.get(`u_fadeToSepia`)===0}return!1}function _(e){return async t=>{let n=globalThis.createImageBitmap;if(!n)throw Error(`effect "shader": createImageBitmap is unavailable in this host`);let r=await e.assets.readBlob(t),i=await r.arrayBuffer(),a=await n(new Blob([i],{type:r.type||`application/octet-stream`}));return{source:a,width:a.width,height:a.height,close:()=>a.close()}}}function v(e,t={}){var n;let r=(n=t.loadTexture)==null?_(e):n,i=[...W.map(n=>e.extensions.register(`effect`,n,new U(n,t.makeCanvas))),e.extensions.register(`effect`,`shader`,new P(t.makeCanvas,r)),e.extensions.register(`effect`,`lut`,new R)];return{dispose(){for(let e of i)e.dispose()}}}function y(){}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{t(),b=`#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_src;
uniform vec2 u_resolution;
uniform float u_time_ms;
`,x=`${b}
uniform float u_contrast;
uniform float u_threshold;
uniform float u_softness;
uniform float u_invertLuma;
uniform vec4 u_fillColor;

const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

void main() {
  vec4 src = texture(u_src, v_uv);
  if (src.a < 0.0001) {
    fragColor = vec4(0.0);
    return;
  }
  vec3 rgb = src.rgb;
  float luma = dot(rgb, LUMA);
  luma = clamp((luma - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  float edge0 = u_threshold - u_softness * 0.5;
  float edge1 = u_threshold + u_softness * 0.5;
  float mask = edge1 > edge0 ? smoothstep(edge0, edge1, luma) : step(u_threshold, luma);
  if (u_invertLuma > 0.5) mask = 1.0 - mask;
  float outA = src.a * mask;
  vec3 fillStraight = u_fillColor.rgb * u_fillColor.a;
  fragColor = vec4(fillStraight * outA, outA);
}
`,S=`${b}
uniform float u_grainAmount;
uniform float u_grainSize;
uniform float u_scratchIntensity;
uniform float u_vignetteStrength;
uniform float u_fadeToSepia;

float hashf(float n) { return fract(sin(n) * 43758.5453123); }
float scratchHash(float n) { return fract(sin(n * 127.3) * 43758.5453123); }

/**
 * OUR grain, standing in for a builtin we do not have: value noise on a cell
 * grid whose size is grainSize pixels, resampled every 1/24s so it crawls the
 * way film does instead of shimmering every frame. Mean 0.5, so a zero amount
 * leaves the picture alone.
 */
float grain(vec2 localUv, vec2 res, float timeMs, float size) {
  vec2 cell = floor(localUv * res / max(size, 0.5));
  float slot = floor(timeMs / (1000.0 / 24.0));
  float a = hashf(dot(cell, vec2(127.1, 311.7)) + slot * 13.77);
  float b = hashf(dot(cell + 1.0, vec2(269.5, 183.3)) + slot * 7.31);
  return clamp(a * 0.65 + b * 0.35, 0.0, 1.0);
}

float organicScratch(vec2 localUv, float frameSlot, float seed, float threshold,
                     float baseWidth, float wobbleAmp, float wobbleFreq) {
  float alive = step(threshold, scratchHash(frameSlot * 7.13 + seed));
  float xBase = scratchHash(frameSlot * 3.71 + seed + 10.0);
  float width = baseWidth + scratchHash(frameSlot * 2.31 + seed + 20.0) * baseWidth * 1.5;
  float wobble1 = scratchHash(frameSlot * 5.17 + seed + 30.0) * wobbleAmp;
  float wobble2 = scratchHash(frameSlot * 3.43 + seed + 35.0) * wobbleAmp * 0.5;
  float phase1 = scratchHash(frameSlot + seed + 1.0) * 6.28318;
  float phase2 = scratchHash(frameSlot + seed + 2.0) * 6.28318;
  float xPos = xBase
    + sin(localUv.y * wobbleFreq + phase1) * wobble1
    + sin(localUv.y * wobbleFreq * 2.3 + phase2) * wobble2;
  float mask = smoothstep(width, 0.0, abs(localUv.x - xPos));
  float bright = 0.4 + scratchHash(frameSlot * 1.91 + seed + 40.0) * 0.7;
  return mask * alive * bright;
}

float scratchSegment(vec2 localUv, float frameSlot, float seed, float yStart, float yEnd,
                     float threshold, float baseWidth, float wobbleAmp, float wobbleFreq) {
  float inRange = step(yStart, localUv.y) * step(localUv.y, yEnd);
  float alive = step(threshold, scratchHash(frameSlot * 4.67 + seed));
  float xBase = scratchHash(frameSlot * 2.19 + seed + 50.0);
  float width = baseWidth * (0.5 + scratchHash(frameSlot * 3.51 + seed + 60.0));
  float phase = scratchHash(frameSlot + seed + 5.0) * 6.28318;
  float xPos = xBase + sin(localUv.y * wobbleFreq + phase) * wobbleAmp;
  float mask = smoothstep(width, 0.0, abs(localUv.x - xPos));
  float bright = 0.3 + scratchHash(frameSlot * 2.83 + seed + 70.0) * 0.8;
  return mask * alive * bright * inRange;
}

void main() {
  vec2 localUv = v_uv;
  vec4 src = texture(u_src, localUv);
  float timeSec = u_time_ms / 1000.0;

  float grainVal = grain(localUv, u_resolution, u_time_ms, u_grainSize);
  float grainLift = (grainVal - 0.5) * u_grainAmount * 0.55;
  vec3 col = src.rgb + vec3(grainLift);

  vec3 sepiaCol = vec3(
    dot(src.rgb, vec3(0.393, 0.769, 0.189)),
    dot(src.rgb, vec3(0.349, 0.686, 0.168)),
    dot(src.rgb, vec3(0.272, 0.534, 0.131)));
  col = mix(col, sepiaCol, u_fadeToSepia);

  float frameSlot = floor(timeSec * 16.0);
  float slowSlot = floor(timeSec * 6.0);
  float scratchBlend = 0.0;
  scratchBlend += organicScratch(localUv, frameSlot, 0.0, 1.0 - u_scratchIntensity * 0.55, 0.0012, 0.009, 18.0);
  scratchBlend += organicScratch(localUv, frameSlot, 1.0, 1.0 - u_scratchIntensity * 0.35, 0.0008, 0.007, 24.0);
  scratchBlend += organicScratch(localUv, frameSlot, 2.0, 1.0 - u_scratchIntensity * 0.25, 0.0005, 0.005, 30.0);
  scratchBlend += organicScratch(localUv, frameSlot, 3.0, 1.0 - u_scratchIntensity * 0.45, 0.0006, 0.012, 14.0);
  scratchBlend += organicScratch(localUv, frameSlot, 4.0, 1.0 - u_scratchIntensity * 0.30, 0.0010, 0.006, 22.0);
  scratchBlend += scratchSegment(localUv, slowSlot, 10.0, 0.1, 0.55, 1.0 - u_scratchIntensity * 0.6, 0.0015, 0.013, 10.0);
  scratchBlend += scratchSegment(localUv, slowSlot, 11.0, 0.4, 0.9, 1.0 - u_scratchIntensity * 0.5, 0.0010, 0.010, 16.0);
  scratchBlend += scratchSegment(localUv, slowSlot, 12.0, 0.05, 0.7, 1.0 - u_scratchIntensity * 0.4, 0.0007, 0.008, 20.0);
  scratchBlend += scratchSegment(localUv, slowSlot, 13.0, 0.3, 0.75, 1.0 - u_scratchIntensity * 0.35, 0.0005, 0.006, 28.0);

  float hairSlot = floor(timeSec * 10.0);
  float h0Active = step(1.0 - u_scratchIntensity * 0.7, scratchHash(hairSlot * 8.11 + 20.0));
  float h0Width = 0.0003 + scratchHash(hairSlot * 2.09 + 23.0) * 0.0006;
  float h0Pos = scratchHash(hairSlot * 5.53 + 21.0) + localUv.y * (scratchHash(hairSlot * 3.17 + 22.0) - 0.5) * 0.04;
  scratchBlend += smoothstep(h0Width, 0.0, abs(localUv.x - h0Pos)) * h0Active
    * (0.6 + scratchHash(hairSlot + 24.0) * 0.5);

  float h1Active = step(1.0 - u_scratchIntensity * 0.5, scratchHash(hairSlot * 6.37 + 30.0));
  float h1Width = 0.0002 + scratchHash(hairSlot * 1.77 + 33.0) * 0.0004;
  float h1Pos = scratchHash(hairSlot * 4.71 + 31.0) + localUv.y * (scratchHash(hairSlot * 2.83 + 32.0) - 0.5) * 0.03;
  scratchBlend += smoothstep(h1Width, 0.0, abs(localUv.x - h1Pos)) * h1Active
    * (0.4 + scratchHash(hairSlot + 34.0) * 0.6);

  scratchBlend = clamp(scratchBlend * u_scratchIntensity, 0.0, 1.0);
  col = mix(col, vec3(0.92, 0.90, 0.82), scratchBlend);

  vec2 vigUv = localUv - vec2(0.5);
  float vigValue = 1.0 - clamp(dot(vigUv, vigUv) * 2.8 * u_vignetteStrength, 0.0, 1.0);
  col *= vigValue;

  col = clamp(col, vec3(0.0), vec3(1.0));
  fragColor = vec4(col * src.a, src.a);
}
`,C=`#version 300 es
precision highp float;
out vec2 v_uv;
void main() {
  // One oversized triangle: no buffers, no attributes, no vertex data to bind.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  v_uv = vec2(p.x, 1.0 - p.y);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,w=(e,t)=>{let n=globalThis.OffscreenCanvas;return n?new n(e,t):null},T=/^[A-Za-z_][A-Za-z0-9_]*$/,E=new Set([`src`,`time`,`resolution`,`u_src`,`u_time`,`u_resolution`]),D=8,O=32,k=64,A=268435456,j=16384,M=67108864,N=/^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/,P=class{constructor(e=w,t){n(this,`ctx`,null),n(this,`gl`,null),n(this,`canvas`,null),n(this,`frameTexture`,null),n(this,`programs`,new Map),n(this,`textureCache`,new Map),n(this,`textureBytes`,0),n(this,`makeCanvas`,void 0),n(this,`loadTexture`,void 0),this.makeCanvas=e,this.loadTexture=t==null?null:t}init(e){this.ctx=e}describe(){return null}apply(e,t,n){let i=this.ctx;if(!i)return e;let{glsl:a,floats:o,textures:s}=l(t),{frames:u}=i,d=u.info(e),f=u.toNative(e);if(!d||!f)return e;let p=this.prepare(d.width,d.height);if(!p)return e;let m=this.canvas,h=c(a,o.map(([e])=>e),s.map(([e])=>e)),g=this.programs.get(h);if(!g)try{var _;(_=m.makeCurrent)==null||_.call(m),g={program:r(p,C,h),locations:new Map},this.programs.set(h,g),this.trimProgramCache(p,m,h)}catch(e){try{this.resetGpu()}catch(t){throw AggregateError([e,t],e instanceof Error?e.message:`effect-shader: shader compilation failed`)}throw e}return s.length===0?this.render(i,e,f,d.width,d.height,n,p,m,g,o,[]):this.renderTextured(i,e,f,d.width,d.height,n,p,m,g,o,s)}async renderTextured(e,t,n,r,i,a,o,s,c,l,u){let d=await this.ensureTextures(o,s,u);return this.canvas!==s||this.gl!==o?t:this.render(e,t,n,r,i,a,o,s,c,l,d)}render(e,t,n,r,o,s,c,l,u,d,f){var p;(p=l.makeCurrent)==null||p.call(l);let m=e=>{let t=u.locations.get(e);if(t!==void 0)return t;let n=c.getUniformLocation(u.program,e);return u.locations.set(e,n),n};c.useProgram(u.program),i(c,this.frameTexture,n),c.uniform1i(m(`u_src`),0),c.uniform2f(m(`u_resolution`),r,o),c.uniform1f(m(`u_time`),s);for(let[e,t]of d)c.uniform1f(m(`u_${e}`),t);for(let e=0;e<f.length;e++){let[t,n]=f[e],r=e+1;c.activeTexture(c.TEXTURE0+r),c.bindTexture(c.TEXTURE_2D,n),c.uniform1i(m(`u_${t}`),r)}c.activeTexture(c.TEXTURE0),a(c,r,o);let{surfaces:h}=e,g=h.acquire({height:o,width:r});try{var _,v,y;let e=(_=h.toNative(g))==null?void 0:_.getContext(`2d`);return e?(e.clearRect(0,0,r,o),e.drawImage((v=(y=l.readback)==null?void 0:y.call(l))==null?l:v,0,0),h.toFrame(g)):t}finally{h.release(g)}}dispose(){try{this.resetGpu()}finally{this.ctx=null}}async ensureTextures(e,t,n){if(n.length===0)return[];if(!this.loadTexture)throw Error(`effect "shader": image textures are unavailable in this host`);let r=new Set(n.map(([,e])=>u(e)));for(let e of r){let t=this.textureCache.get(e);t&&(this.textureCache.delete(e),this.textureCache.set(e,t))}let i=n.filter(([,e])=>!this.textureCache.has(u(e))),a=[...new Set(i.map(([,e])=>e.assetId))],o=new Map,s=[];try{var c;for(let e of a)o.set(e,await this.loadTexture(e));if(this.canvas!==t||this.gl!==e)return[];for(let[e,t]of o)d(e,t);let l=[...r].reduce((e,t)=>{let r=this.textureCache.get(t);if(r)return e+r.bytes;let i=n.find(([,e])=>u(e)===t)[1],a=o.get(i.assetId);return e+a.width*a.height*4},0);if(l>A)throw Error(`effect "shader": textures in one draw require ${l} bytes; the per-instance GPU texture budget is ${A} bytes (256 MiB)`);(c=t.makeCurrent)==null||c.call(t);for(let[,n]of i){let i=u(n);if(this.textureCache.has(i))continue;let a=o.get(n.assetId),c=a.width*a.height*4;this.reserveTextureSpace(e,t,r,c);let l=e.createTexture();if(!l)throw Error(`effect "shader": could not create texture for asset "${n.assetId}"`);s.push([i,l]),e.bindTexture(e.TEXTURE_2D,l),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,0);let d=n.filter===`nearest`?e.NEAREST:e.LINEAR,f=n.wrap===`repeat`?e.REPEAT:n.wrap===`mirror`?e.MIRRORED_REPEAT:e.CLAMP_TO_EDGE;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,d),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,f),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,a.source),this.textureCache.set(i,{texture:l,bytes:c}),this.textureBytes+=c}}catch(n){let r=[],i=e=>{try{e()}catch(e){r.push(e)}};if(s.length>0&&this.canvas===t&&this.gl===e){i(()=>{var e;return(e=t.makeCurrent)==null?void 0:e.call(t)});for(let[t,n]of s){let r=this.textureCache.get(t);r&&r.texture===n&&(this.textureCache.delete(t),this.textureBytes-=r.bytes),i(()=>e.deleteTexture(n))}}throw r.length>0?AggregateError([n,...r],n instanceof Error?n.message:`effect-shader: texture upload failed`):n}finally{var l;for(let e of o.values())(l=e.close)==null||l.call(e)}return n.map(([e,t])=>[e,this.textureCache.get(u(t)).texture])}trimProgramCache(e,t,n){for(;this.programs.size>O;){var r;let i=[...this.programs.keys()].find(e=>e!==n);if(!i)return;let a=this.programs.get(i);(r=t.makeCurrent)==null||r.call(t),e.deleteProgram(a.program),this.programs.delete(i)}}reserveTextureSpace(e,t,n,r){for(;this.textureCache.size>=k||this.textureBytes+r>A;){var i;let r=[...this.textureCache.keys()].find(e=>!n.has(e));if(!r)throw Error(`effect "shader": current texture bindings leave no evictable space in the 256 MiB GPU budget`);let a=this.textureCache.get(r);(i=t.makeCurrent)==null||i.call(t),e.deleteTexture(a.texture),this.textureCache.delete(r),this.textureBytes-=a.bytes}}prepare(e,t){var n,r,i,a;if(!this.canvas){let n=this.makeCanvas(e,t);if(!n)return null;let r=!1;try{var o,s;(o=n.makeCurrent)==null||o.call(n);let e=n.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0});if(!e)return r=!0,(s=n.dispose)==null||s.call(n),null;if(this.canvas=n,this.gl=e,this.frameTexture=e.createTexture(),!this.frameTexture)throw Error(`effect-shader: could not create the source texture`)}catch(e){try{var c;this.canvas?this.resetGpu():r||(c=n.dispose)==null||c.call(n)}catch(t){throw AggregateError([e,t],e instanceof Error?e.message:`effect-shader: canvas setup failed`)}throw e}}return(n=(r=this.canvas).makeCurrent)==null||n.call(r),(this.canvas.width!==e||this.canvas.height!==t)&&(this.canvas.width=e,this.canvas.height=t,(i=(a=this.canvas).makeCurrent)==null||i.call(a)),this.gl}resetGpu(){let e=this.gl,t=this.canvas,n=[],r=e=>{try{e()}catch(e){n.push(e)}};if(e&&t){r(()=>{var e;return(e=t.makeCurrent)==null?void 0:e.call(t)}),this.frameTexture&&r(()=>e.deleteTexture(this.frameTexture));for(let{texture:t}of this.textureCache.values())r(()=>e.deleteTexture(t));for(let{program:t}of this.programs.values())r(()=>e.deleteProgram(t))}if(this.textureCache.clear(),this.textureBytes=0,this.programs.clear(),this.frameTexture=null,this.gl=null,this.canvas=null,r(()=>{var e;return t==null||(e=t.dispose)==null?void 0:e.call(t)}),n.length===1)throw n[0];if(n.length>1){let e=n[0];throw AggregateError(n,e instanceof Error?e.message:`effect-shader: GPU cleanup failed`)}}},F=`#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform sampler2D u_lut;
uniform float u_size;
uniform float u_amount;
in vec2 v_uv;
out vec4 outColor;

vec3 grade(vec3 c) {
  float n = u_size;
  float b = clamp(c.b, 0.0, 1.0) * (n - 1.0);
  float b0 = floor(b);
  float b1 = min(b0 + 1.0, n - 1.0);
  vec2 inSlice = vec2(
    (clamp(c.r, 0.0, 1.0) * (n - 1.0) + 0.5) / (n * n),
    (clamp(c.g, 0.0, 1.0) * (n - 1.0) + 0.5) / n
  );
  vec3 lo = texture(u_lut, vec2(b0 * n / (n * n) + inSlice.x, inSlice.y)).rgb;
  vec3 hi = texture(u_lut, vec2(b1 * n / (n * n) + inSlice.x, inSlice.y)).rgb;
  return mix(lo, hi, b - b0);
}

void main() {
  vec4 src = texture(u_src, v_uv);
  vec3 graded = mix(src.rgb, grade(src.rgb), clamp(u_amount, 0.0, 1.0));
  outColor = vec4(graded * src.a, src.a);
}
`,I=(e,t)=>{let n=globalThis.OffscreenCanvas;return n?new n(e,t):null},L=async e=>{let t=globalThis.fetch;if(!t)throw Error(`lut: no fetch in this host`);let n=`/fs/${e.replace(/^\/+/,``)}`,r=await t(n);if(!r.ok)throw Error(`lut: could not load ${n} (${r.status}) — is the .cube inside the project?`);return r.text()},R=class{constructor(e=I,t=L){n(this,`ctx`,null),n(this,`gl`,null),n(this,`canvas`,null),n(this,`program`,null),n(this,`frameTexture`,null),n(this,`locations`,new Map),n(this,`luts`,new Map),n(this,`makeCanvas`,void 0),n(this,`fetchCube`,void 0),this.makeCanvas=e,this.fetchCube=t}init(e){this.ctx=e}describe(){return null}async apply(e,t,n){let r=this.ctx;if(!r)return e;let o=t.file;if(typeof o!=`string`||o.trim()===``)throw Error(`lut: params.file must name a .cube inside the project, e.g. "luts/kodak.cube"`);let s=typeof t.amount==`number`?t.amount:1;if(s<=0)return e;let{frames:c,surfaces:l}=r,u=c.info(e),d=c.toNative(e);if(!u||!d)return e;let f=this.prepare(u.width,u.height);if(!f)return e;let p=await this.lutTexture(f,o);f.useProgram(this.program),i(f,this.frameTexture,d),f.activeTexture(f.TEXTURE1),f.bindTexture(f.TEXTURE_2D,p.texture),f.activeTexture(f.TEXTURE0),f.uniform1i(this.location(f,`u_src`),0),f.uniform1i(this.location(f,`u_lut`),1),f.uniform1f(this.location(f,`u_size`),p.size),f.uniform1f(this.location(f,`u_amount`),s),a(f,u.width,u.height);let m=l.acquire({height:u.height,width:u.width});try{var h;let t=(h=l.toNative(m))==null?void 0:h.getContext(`2d`);return t?(t.clearRect(0,0,u.width,u.height),t.drawImage(this.canvas,0,0),l.toFrame(m)):e}finally{l.release(m)}}dispose(){let e=this.gl;if(e){this.frameTexture&&e.deleteTexture(this.frameTexture),this.program&&e.deleteProgram(this.program);for(let{texture:t}of this.luts.values())e.deleteTexture(t)}this.luts.clear(),this.locations.clear(),this.frameTexture=null,this.program=null,this.gl=null,this.canvas=null,this.ctx=null}async lutTexture(e,t){let n=this.luts.get(t);if(n)return n;let{size:r,pixels:i}=f(await this.fetchCube(t)),a=e.createTexture();e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,a),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r*r,r,0,e.RGBA,e.UNSIGNED_BYTE,i),e.activeTexture(e.TEXTURE0);let o={texture:a,size:r};return this.luts.set(t,o),o}prepare(e,t){if(!this.canvas){let n=this.makeCanvas(e,t);if(!n)return null;let i=n.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0});if(!i)return null;this.canvas=n,this.gl=i,this.program=r(i,C,F),this.frameTexture=i.createTexture()}return(this.canvas.width!==e||this.canvas.height!==t)&&(this.canvas.width=e,this.canvas.height=t),this.gl}location(e,t){let n=this.locations.get(t);if(n!==void 0)return n;let r=e.getUniformLocation(this.program,t);return this.locations.set(t,r),r}},z=[{default:1.25,id:`contrast`,kind:`float`,max:4,min:0,uniform:`u_contrast`},{default:.5,id:`threshold`,kind:`float`,max:1,min:0,uniform:`u_threshold`},{default:.12,id:`softness`,kind:`float`,max:1,min:0,uniform:`u_softness`},{default:!1,id:`invertLuma`,kind:`boolean`,uniform:`u_invertLuma`},{default:`#FFE9B0FF`,id:`fillColor`,kind:`color`,uniform:`u_fillColor`}],B=[{default:.55,id:`grainAmount`,kind:`float`,max:1,min:0,uniform:`u_grainAmount`},{default:1.5,id:`grainSize`,kind:`float`,max:6,min:.5,uniform:`u_grainSize`},{default:.7,id:`scratchIntensity`,kind:`float`,max:1,min:0,uniform:`u_scratchIntensity`},{default:.55,id:`vignetteStrength`,kind:`float`,max:1.5,min:0,uniform:`u_vignetteStrength`},{default:.45,id:`fadeToSepia`,kind:`float`,max:1,min:0,uniform:`u_fadeToSepia`}],V={"film-grain":{fragment:S,params:B},"threshold-key":{fragment:x,params:z}},H=(e,t)=>{let n=globalThis.OffscreenCanvas;return n?new n(e,t):null},U=class{constructor(e,t=H){n(this,`ctx`,null),n(this,`gl`,null),n(this,`canvas`,null),n(this,`program`,null),n(this,`texture`,null),n(this,`locations`,new Map),n(this,`name`,void 0),n(this,`makeCanvas`,void 0),this.name=e,this.makeCanvas=t}init(e){this.ctx=e}describe(){return null}apply(e,t,n){var r;let o=this.ctx;if(!o)return e;let s=t;if(g(this.name,s))return e;let{frames:c,surfaces:l}=o,u=c.info(e),d=c.toNative(e);if(!u||!d)return e;let f=this.prepare(u.width,u.height);if(!f)return e;let{colors:p,floats:m}=h(V[this.name].params,s),_=this.canvas;(r=_.makeCurrent)==null||r.call(_),f.useProgram(this.program),i(f,this.texture,d),f.uniform1i(this.location(f,`u_src`),0),f.uniform2f(this.location(f,`u_resolution`),u.width,u.height),f.uniform1f(this.location(f,`u_time_ms`),n*1e3);for(let[e,t]of m)f.uniform1f(this.location(f,e),t);for(let[e,t]of p)f.uniform4f(this.location(f,e),t[0],t[1],t[2],t[3]);a(f,u.width,u.height);let v=l.acquire({height:u.height,width:u.width});try{var y,b,x;let t=(y=l.toNative(v))==null?void 0:y.getContext(`2d`);return t?(t.clearRect(0,0,u.width,u.height),t.drawImage((b=(x=_.readback)==null?void 0:x.call(_))==null?_:b,0,0),l.toFrame(v)):e}finally{l.release(v)}}dispose(){try{this.resetGpu()}finally{this.ctx=null}}prepare(e,t){var n,i,a,o;if(!this.canvas){let n=this.makeCanvas(e,t);if(!n)return null;let i=!1;try{var s,c;(s=n.makeCurrent)==null||s.call(n);let e=n.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0});if(!e)return i=!0,(c=n.dispose)==null||c.call(n),null;if(this.canvas=n,this.gl=e,this.program=r(e,`#version 300 es
precision highp float;
out vec2 v_uv;
void main() {
  // One oversized triangle: no buffers, no attributes, no vertex data to bind.
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  v_uv = vec2(p.x, 1.0 - p.y);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,V[this.name].fragment),this.texture=e.createTexture(),!this.texture)throw Error(`effect-shader: could not create the source texture`)}catch(e){try{var l;this.canvas?this.resetGpu():i||(l=n.dispose)==null||l.call(n)}catch(t){throw AggregateError([e,t],e instanceof Error?e.message:`effect-shader: canvas setup failed`)}throw e}}return(n=(i=this.canvas).makeCurrent)==null||n.call(i),(this.canvas.width!==e||this.canvas.height!==t)&&(this.canvas.width=e,this.canvas.height=t,(a=(o=this.canvas).makeCurrent)==null||a.call(o)),this.gl}resetGpu(){let e=this.gl,t=this.canvas,n=[],r=e=>{try{e()}catch(e){n.push(e)}};if(e&&t&&(r(()=>{var e;return(e=t.makeCurrent)==null?void 0:e.call(t)}),this.texture&&r(()=>e.deleteTexture(this.texture)),this.program&&r(()=>e.deleteProgram(this.program))),this.locations.clear(),this.texture=null,this.program=null,this.gl=null,this.canvas=null,r(()=>{var e;return t==null||(e=t.dispose)==null?void 0:e.call(t)}),n.length===1)throw n[0];if(n.length>1){let e=n[0];throw AggregateError(n,e instanceof Error?e.message:`effect-shader: GPU cleanup failed`)}}location(e,t){let n=this.locations.get(t);if(n!==void 0)return n;let r=e.getUniformLocation(this.program,t);return this.locations.set(t,r),r}},W=[`threshold-key`,`film-grain`]})))()}export{C as _,m as a,g as c,S as d,l as f,z as g,p as h,U as i,W as l,G as m,v as n,h as o,x as p,P as r,R as s,B as t,y as u,f as v,c as y};
//# debugId=558bb000-d3eb-50f1-9d49-185f9f5f2bde

//# chunkId=558bb000-d3eb-50f1-9d49-185f9f5f2bde