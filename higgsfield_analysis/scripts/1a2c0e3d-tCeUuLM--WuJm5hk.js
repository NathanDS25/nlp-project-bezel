!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="27689483-cbeb-5a54-98eb-656e1b32361a")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Lf as n,Rf as r}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{_ as i,n as a}from"./1a2c0e3d-yEUD4lq8e7_10Gkp.js";import{n as o}from"./1a2c0e3d-fCot7O4lYn2fsKWy.js";import{n as s,t as c}from"./1a2c0e3d-HY-0Usdq8vS2tC7Q.js";function l(){let e=null,t=null,n=null,r=null,i=null,a={},o=null,s=!1;function c(e,t){if(s)return!1;if(!n){n=new OffscreenCanvas(e,t);try{if(r=n.getContext(`webgl2`,{premultipliedAlpha:!0,antialias:!1}),!r)throw Error(`no webgl2`);let e=r,t=(t,n)=>{let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(r)||`shader`);return r};if(i=e.createProgram(),e.attachShader(i,t(e.VERTEX_SHADER,`#version 300 es
  out vec2 vUV;
  void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    vUV = p;
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  }`)),e.attachShader(i,t(e.FRAGMENT_SHADER,`#version 300 es
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uTime;
  in vec2 vUV;
  out vec4 outColor;

  uniform int   uMode;          // 0 = pixels, 1 = triangles, 2 = both
  uniform float uPixelSize;     // pixel block size, px
  uniform float uTriSize;      // triangle cell size, px
  uniform float uFacet;         // 1 = flat facets, <1 = gradient inside facets
  uniform int   uColorLevels;   // levels per channel
  uniform float uDither;        // dither strength 0..1
  uniform int   uDitherPattern; // 0 = 2x2, 1 = 4x4, 2 = 8x8
  uniform float uSmooth;        // texture softness 0..1
  uniform float uSaturation;
  uniform float uContrast;
  uniform float uBrightness;
  uniform float uOutline;       // facet darkening 0..1
  uniform float uJitter;        // PS1 raster jitter 0..1

  const float B2[4] = float[4](0.0, 2.0, 3.0, 1.0);

  const float B4[16] = float[16](
     0.0,  8.0,  2.0, 10.0,
    12.0,  4.0, 14.0,  6.0,
     3.0, 11.0,  1.0,  9.0,
    15.0,  7.0, 13.0,  5.0);

  const float B8[64] = float[64](
     0.0, 32.0,  8.0, 40.0,  2.0, 34.0, 10.0, 42.0,
    48.0, 16.0, 56.0, 24.0, 50.0, 18.0, 58.0, 26.0,
    12.0, 44.0,  4.0, 36.0, 14.0, 46.0,  6.0, 38.0,
    60.0, 28.0, 52.0, 20.0, 62.0, 30.0, 54.0, 22.0,
     3.0, 35.0, 11.0, 43.0,  1.0, 33.0,  9.0, 41.0,
    51.0, 19.0, 59.0, 27.0, 49.0, 17.0, 57.0, 25.0,
    15.0, 47.0,  7.0, 39.0, 13.0, 45.0,  5.0, 37.0,
    63.0, 31.0, 55.0, 23.0, 61.0, 29.0, 53.0, 21.0);

  // Bayer threshold in (0..1) for a raster cell.
  float bayer(vec2 cell) {
    if (uDitherPattern == 0) {
      ivec2 p = ivec2(mod(cell, 2.0));
      return (B2[p.y * 2 + p.x] + 0.5) / 4.0;
    }
    if (uDitherPattern == 2) {
      ivec2 p = ivec2(mod(cell, 8.0));
      return (B8[p.y * 8 + p.x] + 0.5) / 64.0;
    }
    ivec2 p = ivec2(mod(cell, 4.0));
    return (B4[p.y * 4 + p.x] + 0.5) / 16.0;
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

  // Triangle mosaic: position (px) -> centroid of the containing triangle.
  // A square cell splits along a diagonal into 2 triangles; the diagonal
  // direction alternates checkerboard-style for the "diamond" low poly look.
  vec2 triCentroid(vec2 px) {
    float ts = max(uTriSize, 2.0);
    vec2 g = px / ts;
    vec2 cell = floor(g);
    vec2 f = g - cell;
    bool flip = mod(cell.x + cell.y, 2.0) >= 1.0;
    vec2 cen;
    if (flip) {
      cen = (f.x + f.y < 1.0) ? vec2(1.0 / 3.0) : vec2(2.0 / 3.0);
    } else {
      cen = (f.x > f.y) ? vec2(2.0 / 3.0, 1.0 / 3.0) : vec2(1.0 / 3.0, 2.0 / 3.0);
    }
    return (cell + cen) * ts;
  }

  // Soft 5-tap average — imitates the bilinear smear of low-res N64/PS1
  // textures.
  vec3 sampleSmooth(vec2 uv, float radiusPx) {
    vec3 c = texture(uTexture, uv).rgb;
    if (uSmooth > 0.001) {
      vec2 r = radiusPx / uResolution;
      vec3 s = texture(uTexture, clamp(uv + vec2( r.x,  r.y), 0.0, 1.0)).rgb
             + texture(uTexture, clamp(uv + vec2(-r.x,  r.y), 0.0, 1.0)).rgb
             + texture(uTexture, clamp(uv + vec2( r.x, -r.y), 0.0, 1.0)).rgb
             + texture(uTexture, clamp(uv + vec2(-r.x, -r.y), 0.0, 1.0)).rgb;
      c = mix(c, (c + s) / 5.0, clamp(uSmooth, 0.0, 1.0));
    }
    return c;
  }

  void main() {
    float pixel = max(uPixelSize, 1.0);
    vec2 px = vUV * uResolution;

    // PS1 jitter: stepped (12 Hz) subpixel shift of the whole raster —
    // a deterministic function of uTime, no per-frame randomness.
    if (uJitter > 0.001) {
      float tq = floor(uTime * 12.0) / 12.0;
      float a = hash12(vec2(tq, 7.13)) * 6.2831853;
      px += uJitter * pixel * 0.45 * vec2(cos(a), sin(a));
    }

    bool doPixel = (uMode != 1);
    bool doTri   = (uMode >= 1);

    // 1) Geometry: pixel raster -> triangle mosaic.
    vec2 blockId = doPixel ? floor(px / pixel) : floor(px);
    vec2 sp      = doPixel ? (blockId + 0.5) * pixel : px;
    vec2 spPix   = sp;              // pre-mosaic position, for the facet gradient
    if (doTri) sp = triCentroid(sp);

    vec2 uv = clamp(sp / uResolution, 0.0, 1.0);

    // 2) Color with softness.
    float smoothR = doPixel ? pixel * 0.6 : max(uTriSize, 2.0) * 0.1;
    vec3 c = sampleSmooth(uv, smoothR);

    // Gouraud shading: mix in the color right under the point so a gradient
    // appears inside a facet instead of a flat fill.
    if (doTri && uFacet < 0.999) {
      vec2 uvPix = clamp(spPix / uResolution, 0.0, 1.0);
      vec3 cDetail = texture(uTexture, uvPix).rgb;
      c = mix(cDetail, c, clamp(uFacet, 0.0, 1.0));
    }

    // 3) Contour shadow: luminance gradient between neighboring cells.
    if (uOutline > 0.001) {
      float st = doPixel ? pixel : max(uTriSize, 2.0) * 0.5;
      vec2 dx = vec2(st, 0.0) / uResolution;
      vec2 dy = vec2(0.0, st) / uResolution;
      float gx = luma(texture(uTexture, clamp(uv + dx, 0.0, 1.0)).rgb)
               - luma(texture(uTexture, clamp(uv - dx, 0.0, 1.0)).rgb);
      float gy = luma(texture(uTexture, clamp(uv + dy, 0.0, 1.0)).rgb)
               - luma(texture(uTexture, clamp(uv - dy, 0.0, 1.0)).rgb);
      float edge = smoothstep(0.12, 0.5, length(vec2(gx, gy)));
      c *= 1.0 - uOutline * edge;
    }

    // 4) Grade: brightness -> contrast -> saturation.
    c *= uBrightness;
    c = (c - 0.5) * uContrast + 0.5;
    c = mix(vec3(luma(c)), c, uSaturation);
    c = clamp(c, 0.0, 1.0);

    // 5) Posterization with Bayer dithering at the pixel-block scale.
    float levels = float(max(uColorLevels, 2));
    float d = (bayer(blockId) - 0.5) * uDither;
    c = floor(c * (levels - 1.0) + d + 0.5) / (levels - 1.0);

    outColor = vec4(clamp(c, 0.0, 1.0), 1.0);
  }`)),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))throw Error(e.getProgramInfoLog(i)||`link`);let s=[`uTexture`,`uResolution`,`uTime`,`uMode`,`uPixelSize`,`uTriSize`,`uFacet`,`uColorLevels`,`uDither`,`uDitherPattern`,`uSmooth`,`uSaturation`,`uContrast`,`uBrightness`,`uOutline`,`uJitter`];a={};for(let t of s)a[t]=e.getUniformLocation(i,t);o=e.createTexture(),e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}catch(e){return s=!0,!1}}return(n.width!==e||n.height!==t)&&(n.width=e,n.height=t),!0}function l(e,t,n,r){let i=t.videoWidth||t.width||0,a=t.videoHeight||t.height||0;if(!i||!a)return!1;let o=Math.max(n/i,r/a);return e.drawImage(t,(n-i*o)/2,(r-a*o)/2,i*o,a*o),!0}let u=null,d=null;return{process(s,{width:f,height:p,time:m,params:h}){e||(e=new OffscreenCanvas(f,p),t=e.getContext(`2d`)),(e.width!==f||e.height!==p)&&(e.width=f,e.height=p);let g=t;if(!c(f,p)||!r||!s)return g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,f,p),s&&l(g,s,f,p),e;let _=r;u||(u=new OffscreenCanvas(f,p),d=u.getContext(`2d`)),(u.width!==f||u.height!==p)&&(u.width=f,u.height=p);let v=d;return v.setTransform(1,0,0,1,0,0),v.clearRect(0,0,f,p),l(v,s,f,p),_.viewport(0,0,f,p),_.disable(_.DEPTH_TEST),_.disable(_.BLEND),_.useProgram(i),_.activeTexture(_.TEXTURE0),_.bindTexture(_.TEXTURE_2D,o),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,!0),_.texImage2D(_.TEXTURE_2D,0,_.RGBA8,_.RGBA,_.UNSIGNED_BYTE,u),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,!1),_.uniform1i(a.uTexture,0),_.uniform2f(a.uResolution,f,p),_.uniform1f(a.uTime,Math.max(0,m)),_.uniform1i(a.uMode,h.uMode|0),_.uniform1f(a.uPixelSize,h.uPixelSize),_.uniform1f(a.uTriSize,h.uTriSize),_.uniform1f(a.uFacet,h.uFacet),_.uniform1i(a.uColorLevels,h.uColorLevels|0),_.uniform1f(a.uDither,h.uDither),_.uniform1i(a.uDitherPattern,h.uDitherPattern|0),_.uniform1f(a.uSmooth,h.uSmooth),_.uniform1f(a.uSaturation,h.uSaturation),_.uniform1f(a.uContrast,h.uContrast),_.uniform1f(a.uBrightness,h.uBrightness),_.uniform1f(a.uOutline,h.uOutline),_.uniform1f(a.uJitter,h.uJitter),_.drawArrays(_.TRIANGLES,0,3),g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,f,p),g.drawImage(n,0,0),e},dispose(){try{var s;r==null||(s=r.getExtension(`WEBGL_lose_context`))==null||s.loseContext()}catch(e){}e=null,t=null,n=null,r=null,i=null,a={},o=null,u=null,d=null}}}var u;function d(){return(d=e((()=>{u={aspectRatio:`source`,brightness:1.03,colorLevels:14,contrast:1.08,dither:.55,ditherPattern:`4x4`,facet:.7,jitter:0,mode:`both`,outline:.12,pixelSize:4,saturation:1.25,smooth:.35,triSize:18}})))()}function f({value:e,onChange:t}){let{_:n}=r(),i={effectId:`low-poly-y2k`,title:n({id:`1VKCHO`}),prompt:null,ui:{mobilePresetControlId:null},primarySection:{id:`look`,label:n({id:`YXrlL6`}),controls:[{type:`choice`,id:`mode`,label:n({id:`zz_Wd_`}),defaultValue:`both`,options:[{id:`pixels`,label:n({id:`UneuSH`})},{id:`triangles`,label:n({id:`Jo8rsw`})},{id:`both`,label:n({id:`iiU0h_`})}]},{type:`slider`,id:`pixelSize`,label:n({id:`z6icaK`}),defaultValue:4,min:1,max:24,step:1},{type:`slider`,id:`triSize`,label:n({id:`UGaEeL`}),defaultValue:18,min:6,max:120,step:1},{type:`slider`,id:`facet`,label:n({id:`pfEQ_w`}),defaultValue:.7,min:0,max:1,step:.01},{type:`slider`,id:`colorLevels`,label:n({id:`I5jZOi`}),defaultValue:14,min:2,max:32,step:1},{type:`slider`,id:`dither`,label:n({id:`E-3Wur`}),defaultValue:.55,min:0,max:1,step:.01}]},advancedSections:[{id:`grade`,label:n({id:`ZtKYrn`}),controls:[{type:`choice`,id:`ditherPattern`,label:n({id:`4Z5Kgs`}),defaultValue:`4x4`,options:[{id:`2x2`,label:n({id:`Z89-MP`})},{id:`4x4`,label:n({id:`qlr82h`})},{id:`8x8`,label:n({id:`FGuqgv`})}]},{type:`slider`,id:`smooth`,label:n({id:`jugtD1`}),defaultValue:.35,min:0,max:1,step:.01},{type:`slider`,id:`saturation`,label:n({id:`bMlX24`}),defaultValue:1.25,min:0,max:2,step:.01},{type:`slider`,id:`contrast`,label:n({id:`6TvYiw`}),defaultValue:1.08,min:.5,max:1.6,step:.01},{type:`slider`,id:`brightness`,label:n({id:`w0C2AZ`}),defaultValue:1.03,min:.5,max:1.5,step:.01},{type:`slider`,id:`outline`,label:n({id:`suigo1`}),defaultValue:.12,min:0,max:1,step:.01},{type:`slider`,id:`jitter`,label:n({id:`4B-Mu2`}),defaultValue:0,min:0,max:1,step:.01}]}]},o={mode:e.mode,pixelSize:e.pixelSize,triSize:e.triSize,facet:e.facet,colorLevels:e.colorLevels,dither:e.dither,ditherPattern:e.ditherPattern,smooth:e.smooth,saturation:e.saturation,contrast:e.contrast,brightness:e.brightness,outline:e.outline,jitter:e.jitter};return(0,p.jsx)(a,{definition:i,values:o,onValueChange:(n,r)=>t({...e,[n]:r})})}var p;function m(){return(m=e((()=>{i(),n(),p=t()})))()}function h(e){var t,n,r,i,a,o,s,c;let l=(t=(n=(r=e.media)==null?void 0:r.width)==null?(i=e.mediaImage)==null?void 0:i.width:n)==null?1080:t,u=(a=(o=(s=e.media)==null?void 0:s.height)==null?(c=e.mediaImage)==null?void 0:c.height:o)==null?1080:a,d=Math.min(1,1920/Math.max(l,u));return{width:Math.max(2,Math.round(l*d/2)*2),height:Math.max(2,Math.round(u*d/2)*2)}}function g(e){return{uMode:{pixels:0,triangles:1,both:2}[e.mode],uPixelSize:e.pixelSize,uTriSize:e.triSize,uFacet:e.facet,uColorLevels:e.colorLevels,uDither:e.dither,uDitherPattern:{"2x2":0,"4x4":1,"8x8":2}[e.ditherPattern],uSmooth:e.smooth,uSaturation:e.saturation,uContrast:e.contrast,uBrightness:e.brightness,uOutline:e.outline,uJitter:e.jitter}}function _(e,t){var n,r;let i=g(t),a=t.aspectRatio===`source`?h(e):b[t.aspectRatio],s=e.media?Math.max(e.media.duration,1/v):y,c=(n=(r=e.media)==null?void 0:r.video)==null?e.mediaImage:n;return{kind:`frames`,width:a.width,height:a.height,fps:v,totalFrames:Math.max(1,Math.ceil(s*v)),audio:e.media?{kind:`source`,source:e.media.sourceUrl}:void 0,async draw(t,n){var r;(r=e.media)!=null&&r.video&&await o(e.media.video,n/v);let s=e.engine.process(c,{width:a.width,height:a.height,time:n/v,params:i});t.clearRect(0,0,a.width,a.height),t.drawImage(s,0,0)}}}var v,y,b;function x(){return(x=e((()=>{v=30,y=4,b={"9:16":{width:1080,height:1920},"1:1":{width:1080,height:1080},"4:5":{width:1080,height:1350},"16:9":{width:1920,height:1080}}})))()}var S;function C(){return(C=e((()=>{c(),m(),x(),d(),S={id:`low-poly-y2k`,kind:`code`,name:`Low Poly Y2K`,description:`PS1-era retro 3D: pixel raster, low poly triangle mosaic, Bayer-dithered posterization and soft N64 textures.`,thumbnailUrl:`https://static.higgsfield.ai/public/viral-hub/presets/low-poly-y2k/thumbnail.webp`,defaultSettings:u,Settings:f,inputs:[{id:`media`,kind:`media`,label:`Source video or photo`,accept:`media`,min:1,max:1,affects:`apply`,required:!0},{id:`aspectRatio`,kind:`select`,label:`Aspect ratio`,defaultValue:`source`,options:[{id:`source`,name:`Source`},{id:`9:16`,name:`9:16`},{id:`1:1`,name:`1:1`},{id:`4:5`,name:`4:5`},{id:`16:9`,name:`16:9`}],affects:`render`}],async apply({inputs:e,signal:t}){let n=Array.isArray(e.media)?e.media[0]:void 0;if(!n)throw Error(`Add a source video or photo`);let r=l(),i=null,a=null,o;if(n.type.startsWith(`image/`))a=await createImageBitmap(n);else{let e=await s(n,t);i=e.artifact,o=e.dispose}return{artifact:{engine:r,media:i,mediaImage:a},initialSettings:{...u},Settings:f,dispose(){o==null||o(),a==null||a.close(),r.dispose()},render({artifact:e,inputs:t,settings:n}){return _(e,{...n,aspectRatio:t.aspectRatio||n.aspectRatio})}}}}})))()}export{S as n,C as t};
//# debugId=27689483-cbeb-5a54-98eb-656e1b32361a

//# chunkId=27689483-cbeb-5a54-98eb-656e1b32361a