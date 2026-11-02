!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="f6439927-3f01-5012-b291-a6aca2aeb861")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Lf as n,Rf as r}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{_ as i,n as a}from"./1a2c0e3d-yEUD4lq8e7_10Gkp.js";import{n as o}from"./1a2c0e3d-fCot7O4lYn2fsKWy.js";import{n as s,t as c}from"./1a2c0e3d-HY-0Usdq8vS2tC7Q.js";function l(){let e=null,t=null,n=null,r=null,i=[],a=[],o=null,s=0,c=0,l=!1,u=null,g=null,_=`uTexture.uSourceFrame.uResolution.uTime.uChrome.uSpecular.uRoughness.uTintShadow.uTintHighlight.uTintAmount.uContrast.uBlackLift.uPointCloud.uDotScale.uVoxel.uVoxelSize.uEdgeGlow.uSeamAmount.uSeamSpeed.uSeamWidth.uSeamColor.uCircuit.uBloomThreshold.uBloomRadius.uBloomIntensity.uHalation.uAberration.uScanlines.uGrain.uVignette`.split(`.`);function v(e,t){if(l)return!1;if(!n){n=new OffscreenCanvas(e,t);try{if(r=n.getContext(`webgl2`,{premultipliedAlpha:!0,antialias:!1}),!r)throw Error(`no webgl2`);let e=r,t=(t,n)=>{let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(r)||`shader`);return r},a=t(e.VERTEX_SHADER,d);i=[f,p,m,h].map(n=>{let r=e.createProgram();if(e.attachShader(r,a),e.attachShader(r,t(e.FRAGMENT_SHADER,n)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw Error(e.getProgramInfoLog(r)||`link`);let i={};for(let t of _)i[t]=e.getUniformLocation(r,t);return{prog:r,uni:i}}),o=e.createTexture(),e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}catch(e){return l=!0,!1}}let u=r;if((n.width!==e||n.height!==t)&&(n.width=e,n.height=t),s!==e||c!==t){s=e,c=t;for(let e of a)u.deleteFramebuffer(e.fbo),u.deleteTexture(e.tex);a=[];for(let n=0;n<3;n++){let n=u.createTexture();u.bindTexture(u.TEXTURE_2D,n),u.texImage2D(u.TEXTURE_2D,0,u.RGBA8,e,t,0,u.RGBA,u.UNSIGNED_BYTE,null),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE);let r=u.createFramebuffer();u.bindFramebuffer(u.FRAMEBUFFER,r),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,n,0),a.push({tex:n,fbo:r})}u.bindFramebuffer(u.FRAMEBUFFER,null)}return!0}function y(e,t,n,r){let i=t.videoWidth||t.width||0,a=t.videoHeight||t.height||0;if(!i||!a)return!1;let o=Math.max(n/i,r/a);return e.drawImage(t,(n-i*o)/2,(r-a*o)/2,i*o,a*o),!0}return{process(s,{width:c,height:l,time:d,params:f}){e||(e=new OffscreenCanvas(c,l),t=e.getContext(`2d`)),(e.width!==c||e.height!==l)&&(e.width=c,e.height=l);let p=t;if(!v(c,l)||!r||!s)return p.setTransform(1,0,0,1,0,0),p.clearRect(0,0,c,l),s&&y(p,s,c,l),e;let m=r;u||(u=new OffscreenCanvas(c,l),g=u.getContext(`2d`)),(u.width!==c||u.height!==l)&&(u.width=c,u.height=l);let h=g;h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,c,l),y(h,s,c,l),m.viewport(0,0,c,l),m.disable(m.DEPTH_TEST),m.disable(m.BLEND),m.activeTexture(m.TEXTURE0),m.bindTexture(m.TEXTURE_2D,o),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,!0),m.texImage2D(m.TEXTURE_2D,0,m.RGBA8,m.RGBA,m.UNSIGNED_BYTE,u),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,!1);let _=Math.max(0,d),b=(e,t,n)=>{m.useProgram(e.prog),m.uniform1i(e.uni.uTexture,t),m.uniform1i(e.uni.uSourceFrame,n),m.uniform2f(e.uni.uResolution,c,l),m.uniform1f(e.uni.uTime,_)},x=(e,t,n)=>{e.uni[t]&&m.uniform1f(e.uni[t],n)},S=(e,t,n)=>{e.uni[t]&&m.uniform3f(e.uni[t],n[0],n[1],n[2])},C=i[0];m.bindFramebuffer(m.FRAMEBUFFER,a[0].fbo),b(C,0,0),x(C,`uChrome`,f.uChrome),x(C,`uSpecular`,f.uSpecular),x(C,`uRoughness`,f.uRoughness),S(C,`uTintShadow`,f.uTintShadow),S(C,`uTintHighlight`,f.uTintHighlight),x(C,`uTintAmount`,f.uTintAmount),x(C,`uContrast`,f.uContrast),x(C,`uBlackLift`,f.uBlackLift),m.drawArrays(m.TRIANGLES,0,3);let w=i[1];m.bindFramebuffer(m.FRAMEBUFFER,a[1].fbo),m.activeTexture(m.TEXTURE1),m.bindTexture(m.TEXTURE_2D,a[0].tex),b(w,1,1),x(w,`uPointCloud`,f.uPointCloud),x(w,`uDotScale`,f.uDotScale),x(w,`uVoxel`,f.uVoxel),x(w,`uVoxelSize`,f.uVoxelSize),x(w,`uEdgeGlow`,f.uEdgeGlow),x(w,`uSeamAmount`,f.uSeamAmount),x(w,`uSeamSpeed`,f.uSeamSpeed),x(w,`uSeamWidth`,f.uSeamWidth),S(w,`uSeamColor`,f.uSeamColor),x(w,`uCircuit`,f.uCircuit),m.drawArrays(m.TRIANGLES,0,3);let T=i[2];m.bindFramebuffer(m.FRAMEBUFFER,a[2].fbo),m.activeTexture(m.TEXTURE2),m.bindTexture(m.TEXTURE_2D,a[1].tex),b(T,2,2),x(T,`uBloomThreshold`,f.uBloomThreshold),x(T,`uBloomRadius`,f.uBloomRadius),m.drawArrays(m.TRIANGLES,0,3);let E=i[3];return m.bindFramebuffer(m.FRAMEBUFFER,null),m.activeTexture(m.TEXTURE3),m.bindTexture(m.TEXTURE_2D,a[2].tex),b(E,3,2),x(E,`uBloomRadius`,f.uBloomRadius),x(E,`uBloomIntensity`,f.uBloomIntensity),x(E,`uHalation`,f.uHalation),x(E,`uAberration`,f.uAberration),x(E,`uScanlines`,f.uScanlines),x(E,`uGrain`,f.uGrain),x(E,`uVignette`,f.uVignette),m.drawArrays(m.TRIANGLES,0,3),p.setTransform(1,0,0,1,0,0),p.clearRect(0,0,c,l),p.drawImage(n,0,0),e},dispose(){try{var l;r==null||(l=r.getExtension(`WEBGL_lose_context`))==null||l.loseContext()}catch(e){}e=null,t=null,n=null,r=null,i=[],a=[],o=null,s=0,c=0,u=null,g=null}}}var u,d,f,p,m,h;function g(){return(g=e((()=>{u=`#version 300 es
precision highp float;
uniform sampler2D uTexture;
uniform sampler2D uSourceFrame;
uniform vec2 uResolution;
uniform float uTime;
in vec2 vUV;
out vec4 outColor;
`,d=`#version 300 es
out vec2 vUV;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUV = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,f=`${u}
uniform float uChrome;
uniform float uSpecular;
uniform float uRoughness;
uniform vec3 uTintShadow;
uniform vec3 uTintHighlight;
uniform float uTintAmount;
uniform float uContrast;
uniform float uBlackLift;

float lum(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 px = 1.0 / uResolution;
  vec3 c = texture(uTexture, vUV).rgb;
  float l = lum(c);

  // Pseudo-normal from the luminance gradient: turns shading detail into
  // a foil-like relief the fake light can catch.
  float lx = lum(texture(uTexture, vUV + vec2(px.x, 0.0)).rgb)
           - lum(texture(uTexture, vUV - vec2(px.x, 0.0)).rgb);
  float ly = lum(texture(uTexture, vUV + vec2(0.0, px.y)).rgb)
           - lum(texture(uTexture, vUV - vec2(0.0, px.y)).rgb);
  vec3 n = normalize(vec3(-lx, -ly, 0.06 + uRoughness * 0.4));
  vec3 lightDir = normalize(vec3(0.35, 0.55, 0.75));
  float spec = pow(clamp(dot(n, lightDir), 0.0, 1.0), mix(24.0, 3.0, uRoughness));

  // Metallic tone curve: crushed mids, ringing highlights.
  float metal = pow(smoothstep(0.0, 1.0, l), 1.6);
  metal += spec * uSpecular * (0.35 + 0.65 * l);
  float g = clamp(mix(l, metal, uChrome), 0.0, 1.0);

  // Contrast around a low pivot keeps the murky floor of the reference.
  g = clamp((g - 0.45) * uContrast + 0.45, 0.0, 1.0);

  vec3 mono = vec3(g);
  vec3 duo = mix(uTintShadow, uTintHighlight, g);
  vec3 base = mix(c, mono, uChrome);
  vec3 col = mix(base, duo, uTintAmount);

  // Lift blacks toward the shadow tint, never toward gray.
  col = col + uBlackLift * (uTintShadow * 1.5 + 0.05) * (1.0 - col);

  outColor = vec4(col, 1.0);
}`,p=`${u}
uniform float uPointCloud;
uniform float uDotScale;
uniform float uVoxel;
uniform float uVoxelSize;
uniform float uEdgeGlow;
uniform float uSeamAmount;
uniform float uSeamSpeed;
uniform float uSeamWidth;
uniform vec3 uSeamColor;
uniform float uCircuit;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float lum(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 px = 1.0 / uResolution;

  // Voxel drop: some blocks sample from their quantized center.
  vec2 vs = max(uVoxelSize, 1.0) * px;
  vec2 cellId = floor(vUV / vs);
  vec2 quantized = (cellId + 0.5) * vs;
  float vmask = step(hash(cellId + 7.31), uVoxel * 0.8) * step(0.001, uVoxel);
  vec2 uv = mix(vUV, quantized, vmask);

  vec3 c = texture(uTexture, uv).rgb;

  // Sobel edge magnitude drives both the dissolve and the rim glow.
  float tl = lum(texture(uTexture, uv + vec2(-px.x,  px.y)).rgb);
  float tc = lum(texture(uTexture, uv + vec2( 0.0,   px.y)).rgb);
  float tr = lum(texture(uTexture, uv + vec2( px.x,  px.y)).rgb);
  float ml = lum(texture(uTexture, uv + vec2(-px.x,  0.0)).rgb);
  float mr = lum(texture(uTexture, uv + vec2( px.x,  0.0)).rgb);
  float bl = lum(texture(uTexture, uv + vec2(-px.x, -px.y)).rgb);
  float bc = lum(texture(uTexture, uv + vec2( 0.0,  -px.y)).rgb);
  float br = lum(texture(uTexture, uv + vec2( px.x, -px.y)).rgb);
  float gx = (tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl);
  float gy = (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br);
  float edge = clamp(length(vec2(gx, gy)) * 1.5, 0.0, 1.0);

  // Point cloud: edges and shadows lose returns, dot centers stay lit.
  vec2 dp = vUV * uResolution / max(uDotScale, 1.0);
  float cellRnd = hash(floor(dp));
  float dotDisk = smoothstep(0.52, 0.3, length(fract(dp) - 0.5));
  float darkness = 1.0 - lum(c);
  float missing = step(cellRnd, uPointCloud * (0.15 + 0.55 * edge + 0.4 * darkness * darkness));
  vec3 pc = mix(c, c * dotDisk * 1.6, missing);

  // Laser seam sweeping across x, wrapping like a repeating scan.
  float sx = fract(uTime * (0.02 + uSeamSpeed * 0.28));
  float d = abs(vUV.x - sx);
  d = min(d, 1.0 - d);
  float core = smoothstep(uSeamWidth, 0.0, d);
  float halo = exp(-d * 26.0) * 0.5;

  // Circuit blocks flicker in a band trailing the seam.
  float behind = fract(sx - vUV.x + 1.0);
  float wake = smoothstep(0.22, 0.0, behind) * step(0.0001, uSeamAmount);
  vec2 cg = floor(vUV * vec2(150.0, 84.0));
  float circ = step(1.0 - uCircuit * 0.4, hash(cg + floor(sx * 90.0)));

  vec3 col = pc;
  col += uSeamColor * (core * 1.7 + halo) * uSeamAmount;
  col += uSeamColor * circ * wake * uSeamAmount * 0.9;
  col += uSeamColor * edge * uEdgeGlow * 0.6;

  outColor = vec4(col, 1.0);
}`,m=`${u}
uniform float uBloomThreshold;
uniform float uBloomRadius;

void main() {
  vec2 stepX = vec2(1.0 / uResolution.x, 0.0) * (1.0 + uBloomRadius * 3.5);
  vec3 acc = vec3(0.0);
  float wsum = 0.0;
  for (int i = -6; i <= 6; i++) {
    float w = exp(-float(i * i) / 18.0);
    vec3 s = texture(uTexture, vUV + stepX * float(i)).rgb;
    float peak = max(max(s.r, s.g), s.b);
    s *= smoothstep(uBloomThreshold, min(uBloomThreshold + 0.25, 1.0), peak);
    acc += s * w;
    wsum += w;
  }
  outColor = vec4(acc / wsum, 1.0);
}`,h=`${u}
uniform float uBloomRadius;
uniform float uBloomIntensity;
uniform float uHalation;
uniform float uAberration;
uniform float uScanlines;
uniform float uGrain;
uniform float uVignette;

float lum(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
  vec2 stepY = vec2(0.0, 1.0 / uResolution.y) * (1.0 + uBloomRadius * 3.5);
  vec3 bloom = vec3(0.0);
  float wsum = 0.0;
  for (int i = -6; i <= 6; i++) {
    float w = exp(-float(i * i) / 18.0);
    bloom += texture(uTexture, vUV + stepY * float(i)).rgb * w;
    wsum += w;
  }
  bloom /= wsum;

  // Radial chromatic aberration on the ungained base.
  vec2 dir = vUV - 0.5;
  vec3 base;
  base.r = texture(uSourceFrame, vUV + dir * uAberration).r;
  base.g = texture(uSourceFrame, vUV).g;
  base.b = texture(uSourceFrame, vUV - dir * uAberration).b;

  // Screen blend keeps highlights from clipping flat.
  vec3 bl = clamp(bloom * uBloomIntensity, 0.0, 1.0);
  vec3 col = 1.0 - (1.0 - base) * (1.0 - bl);

  // Halation: a warm fringe riding on the glow.
  col += bl * vec3(1.0, 0.42, 0.22) * uHalation * 0.55;

  // Analog scanlines.
  float sl = sin(vUV.y * uResolution.y * 3.14159) * 0.5 + 0.5;
  col *= 1.0 - uScanlines * 0.25 * (1.0 - sl);

  // Deterministic grain: pure function of (uv, time).
  float g = fract(sin(dot(vUV * uResolution, vec2(12.9898, 78.233)) + fract(uTime) * 61.7) * 43758.5453);
  col += (g - 0.5) * uGrain * 0.14 * (0.35 + 0.65 * (1.0 - lum(col)));

  // Vignette.
  float v = smoothstep(0.95, 0.35, length(dir) * (1.0 + uVignette * 0.4));
  col = mix(col, col * v, uVignette);

  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`})))()}var _;function v(){return(v=e((()=>{_={aberration:.004,aspectRatio:`source`,blackLift:.18,bloomIntensity:.85,bloomRadius:.5,bloomThreshold:.72,chrome:.85,circuit:.45,contrast:1.2,dotScale:5,edgeGlow:.35,grain:.28,halation:.3,pointCloud:.35,roughness:.35,scanlines:.12,seamAmount:.6,seamColor:`#40FF66`,seamSpeed:.18,seamWidth:.015,specular:1,tintAmount:.85,tintHighlight:`#D1FFED`,tintShadow:`#08140E`,vignette:.45,voxel:.18,voxelSize:12}})))()}function y({value:e,onChange:t}){let{_:n}=r(),i={effectId:`lidar-chrome`,title:n({id:`KvYYEz`}),prompt:null,ui:{mobilePresetControlId:null},primarySection:{id:`chrome`,label:n({id:`ETLlnF`}),controls:[{type:`slider`,id:`chrome`,label:n({id:`RCn9IC`}),defaultValue:.85,min:0,max:1,step:.01},{type:`slider`,id:`specular`,label:n({id:`gnIf90`}),defaultValue:1,min:0,max:2,step:.01},{type:`slider`,id:`roughness`,label:n({id:`hB3YsI`}),defaultValue:.35,min:.05,max:1,step:.01},{type:`color`,id:`tintShadow`,label:n({id:`H77sTA`}),defaultValue:`#08140E`},{type:`color`,id:`tintHighlight`,label:n({id:`ejerel`}),defaultValue:`#D1FFED`},{type:`slider`,id:`tintAmount`,label:n({id:`i3jy0f`}),defaultValue:.85,min:0,max:1,step:.01},{type:`slider`,id:`contrast`,label:n({id:`6TvYiw`}),defaultValue:1.2,min:.5,max:2,step:.01},{type:`slider`,id:`blackLift`,label:n({id:`XVvznS`}),defaultValue:.18,min:0,max:.5,step:.01}]},advancedSections:[{id:`scan`,label:n({id:`I-FvbD`}),controls:[{type:`slider`,id:`pointCloud`,label:n({id:`LscymK`}),defaultValue:.35,min:0,max:1,step:.01},{type:`slider`,id:`dotScale`,label:n({id:`xNqU9d`}),defaultValue:5,min:2,max:14,step:.5},{type:`slider`,id:`voxel`,label:n({id:`_7_ZEk`}),defaultValue:.18,min:0,max:1,step:.01},{type:`slider`,id:`voxelSize`,label:n({id:`FFbAJD`}),defaultValue:12,min:2,max:40,step:1},{type:`slider`,id:`edgeGlow`,label:n({id:`Ngdyaj`}),defaultValue:.35,min:0,max:1,step:.01},{type:`slider`,id:`seamAmount`,label:n({id:`XcV1lC`}),defaultValue:.6,min:0,max:1,step:.01},{type:`slider`,id:`seamSpeed`,label:n({id:`cgZY3I`}),defaultValue:.18,min:0,max:1,step:.01},{type:`slider`,id:`seamWidth`,label:n({id:`HSPa1N`}),defaultValue:.015,min:.002,max:.08,step:.001},{type:`color`,id:`seamColor`,label:n({id:`7Igb95`}),defaultValue:`#40FF66`},{type:`slider`,id:`circuit`,label:n({id:`6ylC99`}),defaultValue:.45,min:0,max:1,step:.01}]},{id:`finish`,label:n({id:`JmZ_-d`}),controls:[{type:`slider`,id:`bloomThreshold`,label:n({id:`jwlk65`}),defaultValue:.72,min:0,max:1,step:.01},{type:`slider`,id:`bloomRadius`,label:n({id:`ZwOk3V`}),defaultValue:.5,min:0,max:1,step:.01},{type:`slider`,id:`bloomIntensity`,label:n({id:`u4P_rH`}),defaultValue:.85,min:0,max:2,step:.01},{type:`slider`,id:`halation`,label:n({id:`XiPjYD`}),defaultValue:.3,min:0,max:1,step:.01},{type:`slider`,id:`aberration`,label:n({id:`8bVhIi`}),defaultValue:.004,min:0,max:.02,step:5e-4},{type:`slider`,id:`scanlines`,label:n({id:`gAUA-g`}),defaultValue:.12,min:0,max:1,step:.01},{type:`slider`,id:`grain`,label:n({id:`nImEQv`}),defaultValue:.28,min:0,max:1,step:.01},{type:`slider`,id:`vignette`,label:n({id:`6WhJBB`}),defaultValue:.45,min:0,max:1,step:.01}]}]},o={chrome:e.chrome,specular:e.specular,roughness:e.roughness,tintShadow:e.tintShadow,tintHighlight:e.tintHighlight,tintAmount:e.tintAmount,contrast:e.contrast,blackLift:e.blackLift,pointCloud:e.pointCloud,dotScale:e.dotScale,voxel:e.voxel,voxelSize:e.voxelSize,edgeGlow:e.edgeGlow,seamAmount:e.seamAmount,seamSpeed:e.seamSpeed,seamWidth:e.seamWidth,seamColor:e.seamColor,circuit:e.circuit,bloomThreshold:e.bloomThreshold,bloomRadius:e.bloomRadius,bloomIntensity:e.bloomIntensity,halation:e.halation,aberration:e.aberration,scanlines:e.scanlines,grain:e.grain,vignette:e.vignette};return(0,b.jsx)(a,{definition:i,values:o,onValueChange:(n,r)=>t({...e,[n]:r})})}var b;function x(){return(x=e((()=>{i(),n(),b=t()})))()}function S(e){var t,n,r,i,a,o,s,c;let l=(t=(n=(r=e.media)==null?void 0:r.width)==null?(i=e.mediaImage)==null?void 0:i.width:n)==null?1080:t,u=(a=(o=(s=e.media)==null?void 0:s.height)==null?(c=e.mediaImage)==null?void 0:c.height:o)==null?1080:a,d=Math.min(1,1920/Math.max(l,u));return{width:Math.max(2,Math.round(l*d/2)*2),height:Math.max(2,Math.round(u*d/2)*2)}}function C(e,t){let n=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!n)return[t[0],t[1],t[2]];let r=Number.parseInt(n[1],16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function w(e){return{uChrome:e.chrome,uSpecular:e.specular,uRoughness:e.roughness,uTintShadow:C(e.tintShadow,[.031,.078,.055]),uTintHighlight:C(e.tintHighlight,[.82,1,.93]),uTintAmount:e.tintAmount,uContrast:e.contrast,uBlackLift:e.blackLift,uPointCloud:e.pointCloud,uDotScale:e.dotScale,uVoxel:e.voxel,uVoxelSize:e.voxelSize,uEdgeGlow:e.edgeGlow,uSeamAmount:e.seamAmount,uSeamSpeed:e.seamSpeed,uSeamWidth:e.seamWidth,uSeamColor:C(e.seamColor,[.25,1,.4]),uCircuit:e.circuit,uBloomThreshold:e.bloomThreshold,uBloomRadius:e.bloomRadius,uBloomIntensity:e.bloomIntensity,uHalation:e.halation,uAberration:e.aberration,uScanlines:e.scanlines,uGrain:e.grain,uVignette:e.vignette}}function T(e,t){var n,r;let i=w(t),a=t.aspectRatio===`source`?S(e):D[t.aspectRatio],s=Math.min(20,Math.max(4,Math.round(1/(.02+t.seamSpeed*.28)))),c=e.media?Math.max(e.media.duration,1/E):s,l=(n=(r=e.media)==null?void 0:r.video)==null?e.mediaImage:n;return{kind:`frames`,width:a.width,height:a.height,fps:E,totalFrames:Math.max(1,Math.ceil(c*E)),audio:e.media?{kind:`source`,source:e.media.sourceUrl}:void 0,async draw(t,n){var r;(r=e.media)!=null&&r.video&&await o(e.media.video,n/E);let s=e.engine.process(l,{width:a.width,height:a.height,time:n/E,params:i});t.clearRect(0,0,a.width,a.height),t.drawImage(s,0,0)}}}var E,D;function O(){return(O=e((()=>{E=30,D={"9:16":{width:1080,height:1920},"1:1":{width:1080,height:1080},"4:5":{width:1080,height:1350},"16:9":{width:1920,height:1080}}})))()}var k;function A(){return(A=e((()=>{c(),x(),g(),O(),v(),k={id:`lidar-chrome`,kind:`code`,name:`LiDAR Chrome`,description:`Liquid-metal duotone remap swept by a laser scan seam, with point-cloud dissolve, voxel glitches, bloom and film grain.`,thumbnailUrl:`https://static.higgsfield.ai/public/viral-hub/presets/lidar-chrome/thumbnail.webp`,defaultSettings:_,Settings:y,inputs:[{id:`media`,kind:`media`,label:`Source video or photo`,accept:`media`,min:1,max:1,affects:`apply`,required:!0},{id:`aspectRatio`,kind:`select`,label:`Aspect ratio`,defaultValue:`source`,options:[{id:`source`,name:`Source`},{id:`9:16`,name:`9:16`},{id:`1:1`,name:`1:1`},{id:`4:5`,name:`4:5`},{id:`16:9`,name:`16:9`}],affects:`render`}],async apply({inputs:e,signal:t}){let n=Array.isArray(e.media)?e.media[0]:void 0;if(!n)throw Error(`Add a source video or photo`);let r=l(),i=null,a=null,o;if(n.type.startsWith(`image/`))a=await createImageBitmap(n);else{let e=await s(n,t);i=e.artifact,o=e.dispose}return{artifact:{engine:r,media:i,mediaImage:a},initialSettings:{..._},Settings:y,dispose(){o==null||o(),a==null||a.close(),r.dispose()},render({artifact:e,inputs:t,settings:n}){return T(e,{...n,aspectRatio:t.aspectRatio||n.aspectRatio})}}}}})))()}export{k as n,A as t};
//# debugId=f6439927-3f01-5012-b291-a6aca2aeb861

//# chunkId=f6439927-3f01-5012-b291-a6aca2aeb861