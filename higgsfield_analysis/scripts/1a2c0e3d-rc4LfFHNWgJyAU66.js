!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="c2783635-97bc-5e3d-8e20-e9b04744f2d9")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";function t(e){let t=e.getContext(`webgl2`,{premultipliedAlpha:!1,preserveDrawingBuffer:!0,alpha:!1});if(!t)throw Error(`WebGL2 not supported`);if(!t.getExtension(`EXT_color_buffer_float`))throw Error(`EXT_color_buffer_float not supported`);return t.getExtension(`OES_texture_float_linear`),t}function n(e,t,n){let r=e.createShader(t);if(!r)throw Error(`Failed to create shader`);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`Shader compile error: ${t}`)}return r}function r(e,t,r){let i=n(e,e.VERTEX_SHADER,t),a=n(e,e.FRAGMENT_SHADER,r),o=e.createProgram();if(!o)throw Error(`Failed to create program`);if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o);throw e.deleteProgram(o),Error(`Program link error: ${t}`)}return e.deleteShader(i),e.deleteShader(a),o}function i(e,t,n){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,t,n,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER);if(a!==e.FRAMEBUFFER_COMPLETE)throw Error(`Framebuffer incomplete: ${a}`);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null),{framebuffer:i,texture:r,width:t,height:n}}function a(e,t){e.deleteFramebuffer(t.framebuffer),e.deleteTexture(t.texture)}function o(e,t){let n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,e.RGBA,e.FLOAT,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null),n}function s(e){let t=e.createVertexArray();e.bindVertexArray(t);let n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n);let r=new Float32Array([-1,-1,3,-1,-1,3]);return e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),{vao:t,positionBuffer:n}}function c(e,t){e.bindVertexArray(t.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}function l(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t.framebuffer),e.viewport(0,0,t.width,t.height)}function u(e,t,n){e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,t)}function d(e,t,n){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,t,n)}var f,p,m,h;function g(){return(g=e((()=>{f=`#version 300 es
precision highp float;
layout(location = 0) in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_position.x * 0.5 + 0.5, a_position.y * 0.5 + 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,p=`
float luminance(vec3 c) {
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}
`,m=`
vec3 rgb2hsv(vec3 c) {
  float cMax = max(c.r, max(c.g, c.b));
  float cMin = min(c.r, min(c.g, c.b));
  float delta = cMax - cMin;
  float h = 0.0;
  float s = (cMax > 0.0) ? delta / cMax : 0.0;
  float v = cMax;
  if (delta > 0.00001) {
    if (cMax == c.r) {
      h = 60.0 * mod((c.g - c.b) / delta, 6.0);
    } else if (cMax == c.g) {
      h = 60.0 * ((c.b - c.r) / delta + 2.0);
    } else {
      h = 60.0 * ((c.r - c.g) / delta + 4.0);
    }
  }
  if (h < 0.0) h += 360.0;
  return vec3(h, s, v);
}

vec3 hsv2rgb(vec3 c) {
  float h = c.x;
  float s = c.y;
  float v = c.z;
  float C = v * s;
  float X = C * (1.0 - abs(mod(h / 60.0, 2.0) - 1.0));
  float m = v - C;
  vec3 rgb;
  if      (h < 60.0)  rgb = vec3(C, X, 0.0);
  else if (h < 120.0) rgb = vec3(X, C, 0.0);
  else if (h < 180.0) rgb = vec3(0.0, C, X);
  else if (h < 240.0) rgb = vec3(0.0, X, C);
  else if (h < 300.0) rgb = vec3(X, 0.0, C);
  else                 rgb = vec3(C, 0.0, X);
  return rgb + m;
}
`,h=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
out vec4 fragColor;
void main() {
  fragColor = texture(u_input, v_uv);
}
`})))()}function _(e){let t=Math.max(e/3,1e-4),n=Math.min(Math.ceil(e),63),r=n+1,i=new Float32Array(64),a=new Float32Array(64),o=0;for(let e=0;e<=n;e++){let n=Math.exp(-(e*e)/(2*t*t));i[e]=n,a[e]=e,o+=e===0?n:n*2}for(let e=0;e<=n;e++)i[e]/=o;return{weights:i,offsets:a,size:r}}var v,y;function b(){return(b=e((()=>{v=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_weights[64];
uniform float u_offsets[64];
uniform int u_kernelSize;
uniform vec2 u_texelSize;
out vec4 fragColor;
void main() {
  vec4 sum = texture(u_input, v_uv) * u_weights[0];
  for (int i = 1; i < 64; i++) {
    if (i >= u_kernelSize) break;
    vec2 off = vec2(u_offsets[i] * u_texelSize.x, 0.0);
    sum += texture(u_input, v_uv + off) * u_weights[i];
    sum += texture(u_input, v_uv - off) * u_weights[i];
  }
  fragColor = sum;
}
`,y=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_weights[64];
uniform float u_offsets[64];
uniform int u_kernelSize;
uniform vec2 u_texelSize;
out vec4 fragColor;
void main() {
  vec4 sum = texture(u_input, v_uv) * u_weights[0];
  for (int i = 1; i < 64; i++) {
    if (i >= u_kernelSize) break;
    vec2 off = vec2(0.0, u_offsets[i] * u_texelSize.y);
    sum += texture(u_input, v_uv + off) * u_weights[i];
    sum += texture(u_input, v_uv - off) * u_weights[i];
  }
  fragColor = sum;
}
`})))()}function x(e,t){let n=r(e,f,S),o=r(e,f,v),s=r(e,f,y),d=r(e,f,C),p=null,m=null,h=0,g=0;function b(t,n){let r=Math.min(1,w/Math.max(t,n)),o=Math.max(1,Math.round(t*r)),s=Math.max(1,Math.round(n*r));(o!==h||s!==g)&&(p&&a(e,p),m&&a(e,m),p=i(e,o,s),m=i(e,o,s),h=o,g=s)}function x(t,n,r,i){e.uniform1fv(e.getUniformLocation(t,`u_weights`),n.weights),e.uniform1fv(e.getUniformLocation(t,`u_offsets`),n.offsets),e.uniform1i(e.getUniformLocation(t,`u_kernelSize`),n.size),e.uniform2f(e.getUniformLocation(t,`u_texelSize`),1/r,1/i),e.uniform1i(e.getUniformLocation(t,`u_input`),0)}return{execute(r,i,a,f){if(b(i.width,i.height),!p||!m)return;let h=Math.min(1,w/Math.max(i.width,i.height)),g=_(Math.max(3,Math.round(f.blurRadius*h)));l(e,p),e.useProgram(n),u(e,r,0),e.uniform1i(e.getUniformLocation(n,`u_input`),0),e.uniform1f(e.getUniformLocation(n,`u_brightness`),f.highlightsBrightness),c(e,t),l(e,m),e.useProgram(o),u(e,p.texture,0),x(o,g,p.width,p.height),c(e,t),l(e,p),e.useProgram(s),u(e,m.texture,0),x(s,g,m.width,m.height),c(e,t),l(e,i),e.useProgram(d),u(e,a,0),e.uniform1i(e.getUniformLocation(d,`u_original`),0),u(e,p.texture,1),e.uniform1i(e.getUniformLocation(d,`u_blurred`),1),e.uniform1f(e.getUniformLocation(d,`u_fade`),f.fade),e.uniform1i(e.getUniformLocation(d,`u_blendMode`),f.blendMode===`screen`?0:1),c(e,t)},dispose(){e.deleteProgram(n),e.deleteProgram(o),e.deleteProgram(s),e.deleteProgram(d),p&&a(e,p),m&&a(e,m)}}}var S,C,w;function T(){return(T=e((()=>{g(),b(),S=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_brightness;
out vec4 fragColor;

${p}

const float LOW_THRESHOLD = 0.7;
const float HIGH_THRESHOLD = 0.97;

void main() {
  vec3 c = texture(u_input, v_uv).rgb;
  float luma = luminance(c);
  float mask = (luma >= LOW_THRESHOLD && luma <= HIGH_THRESHOLD) ? 1.0 : 0.0;
  fragColor = vec4(c * mask * u_brightness, 1.0);
}
`,C=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_original;
uniform sampler2D u_blurred;
uniform float u_fade;
uniform int u_blendMode; // 0 = screen, 1 = soft_light
out vec4 fragColor;

void main() {
  vec3 base = texture(u_original, v_uv).rgb;
  vec3 bloom = texture(u_blurred, v_uv).rgb;

  vec3 composited;
  if (u_blendMode == 0) {
    // Screen
    composited = 1.0 - (1.0 - base) * (1.0 - bloom);
  } else {
    // Soft light
    composited = (1.0 - 2.0 * bloom) * base * base + 2.0 * bloom * base;
  }

  fragColor = vec4(clamp(mix(base, composited, u_fade), 0.0, 1.0), 1.0);
}
`,w=2048})))()}function E(e,t){let n=r(e,f,D),i={input:e.getUniformLocation(n,`u_input`),temperature:e.getUniformLocation(n,`u_temperature`),hue:e.getUniformLocation(n,`u_hue`),saturation:e.getUniformLocation(n,`u_saturation`),contrast:e.getUniformLocation(n,`u_contrast`),splitTone:e.getUniformLocation(n,`u_splitTone`)};return{execute(r,a,o){l(e,a),e.useProgram(n),u(e,r,0),e.uniform1i(i.input,0),e.uniform1f(i.temperature,o.temperature),e.uniform1f(i.hue,o.hue),e.uniform1f(i.saturation,o.saturation),e.uniform1f(i.contrast,o.contrast),e.uniform1f(i.splitTone,o.splitTone),c(e,t)},dispose(){e.deleteProgram(n)}}}var D;function O(){return(O=e((()=>{g(),D=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_temperature;
uniform float u_hue;
uniform float u_saturation;
uniform float u_contrast;
uniform float u_splitTone;
out vec4 fragColor;

${m}
${p}

void main() {
  vec3 c = texture(u_input, v_uv).rgb;

  // 1. Temperature — shift R and B
  float t = (6500.0 - u_temperature) / 35.0;
  c.r = clamp(c.r + (t / 100.0) * 0.1, 0.0, 1.0);
  c.b = clamp(c.b - (t / 100.0) * 0.1, 0.0, 1.0);

  // 2. Saturation — in HSV
  vec3 hsv = rgb2hsv(c);
  hsv.y = clamp(hsv.y * (1.0 + u_saturation / 100.0), 0.0, 1.0);

  // 3. Hue rotation
  hsv.x = mod(hsv.x + u_hue, 360.0);
  if (hsv.x < 0.0) hsv.x += 360.0;

  c = hsv2rgb(hsv);

  // 4. Contrast — around midpoint
  c = clamp((c - 0.5) * (1.0 + u_contrast / 100.0) + 0.5, 0.0, 1.0);

  // 5. Split tone — cool/blue shadows + warm/amber highlights
  if (u_splitTone > 0.0) {
    float luma = luminance(c);
    float shadowMask = clamp((0.30 - luma) / 0.25, 0.0, 1.0);
    float highlightMask = clamp((luma - 0.70) / 0.25, 0.0, 1.0);

    // Shadow tint: cool blue
    vec3 shadowColor = vec3(-0.07, 0.01, 0.07);
    // Highlight tint: warm amber
    vec3 highlightColor = vec3(0.07, -0.01, -0.07);

    c += u_splitTone * (shadowMask * shadowColor + highlightMask * highlightColor);
    c = clamp(c, 0.0, 1.0);
  }

  fragColor = vec4(c, 1.0);
}
`})))()}function k(e,t){let n=r(e,f,A),i={input:e.getUniformLocation(n,`u_input`),stops:e.getUniformLocation(n,`u_stops`)};return{execute(r,a,o){l(e,a),e.useProgram(n),u(e,r,0),e.uniform1i(i.input,0),e.uniform1f(i.stops,o.stops),c(e,t)},dispose(){e.deleteProgram(n)}}}var A;function j(){return(j=e((()=>{g(),A=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_stops;
out vec4 fragColor;

void main() {
  vec3 c = texture(u_input, v_uv).rgb;

  // sRGB to linear
  c = pow(c, vec3(2.2));

  // Apply exposure
  c *= pow(2.0, u_stops);

  // Linear to sRGB
  c = clamp(pow(c, vec3(1.0 / 2.2)), 0.0, 1.0);

  fragColor = vec4(c, 1.0);
}
`})))()}function M(e,t){let n=r(e,f,N),i={input:e.getUniformLocation(n,`u_input`),strength:e.getUniformLocation(n,`u_strength`),grainSize:e.getUniformLocation(n,`u_grainSize`),bias:e.getUniformLocation(n,`u_bias`),seed:e.getUniformLocation(n,`u_seed`),resolution:e.getUniformLocation(n,`u_resolution`)};return{execute(r,a,o){l(e,a),e.useProgram(n),u(e,r,0),e.uniform1i(i.input,0),e.uniform1f(i.strength,o.strength),e.uniform1f(i.grainSize,o.size),e.uniform1f(i.bias,o.bias),e.uniform1f(i.seed,Math.random()*1e3),e.uniform2f(i.resolution,a.width,a.height),c(e,t)},dispose(){e.deleteProgram(n)}}}var N;function P(){return(P=e((()=>{g(),N=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_strength;
uniform float u_grainSize;   // 1=35mm, 2=16mm, 3=8mm
uniform float u_bias;
uniform float u_seed;
uniform vec2 u_resolution;
out vec4 fragColor;

${p}

// Hash-based pseudo-random (produces [-1, 1] range)
float hash(vec2 p, float seed) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973) + seed);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z) * 2.0 - 1.0;
}

float hashChannel(vec2 p, float seed, float channel) {
  return hash(p, seed + channel * 17.31);
}

void main() {
  vec3 c = texture(u_input, v_uv).rgb;
  float luma = luminance(c);

  // Luminance response mask — beta distribution approximation.
  // Clamp off the endpoints: at bias 0 (or 1) an exponent goes to 0 and peakVal
  // hits pow(0.0, 0.0), which GLSL leaves undefined (NaN on most drivers). The
  // NaN propagates through the mask into the final clamp and blacks out the frame.
  float bias = clamp(u_bias, 0.001, 0.999);
  float a = 2.0 * bias;
  float b = 2.0 * (1.0 - bias);
  float peakVal = pow(bias, a) * pow(1.0 - bias, b) + 1e-10;
  float baseCurve = pow(luma, a) * pow(max(1.0 - luma, 0.0), b) / peakVal;

  float response = 0.9;
  float midtoneCurve = pow(baseCurve, 0.5 + response * 1.5);
  float mask = 1.0 - response * (1.0 - midtoneCurve);

  // Dual-octave per-channel noise
  vec2 pixelCoord = v_uv * u_resolution;

  // Octave 1 — coarser
  vec2 grainCoord1 = floor(pixelCoord / u_grainSize) * u_grainSize;
  vec2 grainFrac1 = fract(pixelCoord / u_grainSize);

  // Bilinear interpolation for octave 1
  vec3 n1_00 = vec3(hashChannel(grainCoord1, u_seed, 0.0),
                     hashChannel(grainCoord1, u_seed, 1.0),
                     hashChannel(grainCoord1, u_seed, 2.0));
  vec3 n1_10 = vec3(hashChannel(grainCoord1 + vec2(u_grainSize, 0.0), u_seed, 0.0),
                     hashChannel(grainCoord1 + vec2(u_grainSize, 0.0), u_seed, 1.0),
                     hashChannel(grainCoord1 + vec2(u_grainSize, 0.0), u_seed, 2.0));
  vec3 n1_01 = vec3(hashChannel(grainCoord1 + vec2(0.0, u_grainSize), u_seed, 0.0),
                     hashChannel(grainCoord1 + vec2(0.0, u_grainSize), u_seed, 1.0),
                     hashChannel(grainCoord1 + vec2(0.0, u_grainSize), u_seed, 2.0));
  vec3 n1_11 = vec3(hashChannel(grainCoord1 + vec2(u_grainSize), u_seed, 0.0),
                     hashChannel(grainCoord1 + vec2(u_grainSize), u_seed, 1.0),
                     hashChannel(grainCoord1 + vec2(u_grainSize), u_seed, 2.0));
  vec3 noise1 = mix(mix(n1_00, n1_10, grainFrac1.x),
                     mix(n1_01, n1_11, grainFrac1.x),
                     grainFrac1.y);

  // Octave 2 — finer (half grain size)
  float gs2 = u_grainSize * 0.5;
  vec2 grainCoord2 = floor(pixelCoord / gs2) * gs2;
  vec2 grainFrac2 = fract(pixelCoord / gs2);
  float seed2 = u_seed + 100.0;
  vec3 n2_00 = vec3(hashChannel(grainCoord2, seed2, 0.0),
                     hashChannel(grainCoord2, seed2, 1.0),
                     hashChannel(grainCoord2, seed2, 2.0));
  vec3 n2_10 = vec3(hashChannel(grainCoord2 + vec2(gs2, 0.0), seed2, 0.0),
                     hashChannel(grainCoord2 + vec2(gs2, 0.0), seed2, 1.0),
                     hashChannel(grainCoord2 + vec2(gs2, 0.0), seed2, 2.0));
  vec3 n2_01 = vec3(hashChannel(grainCoord2 + vec2(0.0, gs2), seed2, 0.0),
                     hashChannel(grainCoord2 + vec2(0.0, gs2), seed2, 1.0),
                     hashChannel(grainCoord2 + vec2(0.0, gs2), seed2, 2.0));
  vec3 n2_11 = vec3(hashChannel(grainCoord2 + vec2(gs2), seed2, 0.0),
                     hashChannel(grainCoord2 + vec2(gs2), seed2, 1.0),
                     hashChannel(grainCoord2 + vec2(gs2), seed2, 2.0));
  vec3 noise2 = mix(mix(n2_00, n2_10, grainFrac2.x),
                     mix(n2_01, n2_11, grainFrac2.x),
                     grainFrac2.y);

  // Blend octaves
  vec3 grainRGB = noise1 * 0.7 + noise2 * 0.3;

  // Color/mono blend (saturation = 0.2)
  float grainMono = dot(grainRGB, vec3(1.0 / 3.0));
  float saturation = 0.2;
  vec3 grain = grainMono + saturation * (grainRGB - grainMono);

  // Normalize grain to unit variance (approx) then apply mask and strength
  // The hash-based noise has ~0.33 std dev; after dual-octave blend ~0.35
  // Python normalizes explicitly: grain / (grain.std() + 1e-6) * mask * strength * 0.15
  // With normalization, effective amplitude = strength * 0.15 / 0.35 ≈ strength * 0.43
  float grainAmp = u_strength * 0.4;
  grain = grain * mask * grainAmp;

  // Highlight headroom — pull down bright areas so grain can fluctuate both ways
  float peakAmp = grainAmp * 0.5;
  float brightRamp = clamp((luma - 0.85) / 0.15, 0.0, 1.0);
  c -= brightRamp * peakAmp;

  // Final blend
  c = clamp(c + grain, 0.0, 1.0);

  fragColor = vec4(c, 1.0);
}
`})))()}function F(e,t){let n=r(e,f,I),o=r(e,f,v),s=r(e,f,y),d=r(e,f,L),p=null,m=null,h=0,g=0;function b(t,n){let r=Math.min(1,R/Math.max(t,n)),o=Math.max(1,Math.round(t*r)),s=Math.max(1,Math.round(n*r));(o!==h||s!==g)&&(p&&a(e,p),m&&a(e,m),p=i(e,o,s),m=i(e,o,s),h=o,g=s)}function x(t,n,r,i){e.uniform1fv(e.getUniformLocation(t,`u_weights`),n.weights),e.uniform1fv(e.getUniformLocation(t,`u_offsets`),n.offsets),e.uniform1i(e.getUniformLocation(t,`u_kernelSize`),n.size),e.uniform2f(e.getUniformLocation(t,`u_texelSize`),1/r,1/i),e.uniform1i(e.getUniformLocation(t,`u_input`),0)}return{execute(r,i,a){if(b(i.width,i.height),!p||!m)return;let f=Math.min(1,R/Math.max(i.width,i.height)),h=Math.max(3,Math.round(a.radius*f)),g=_(Math.min(h,63));l(e,p),e.useProgram(n),u(e,r,0),e.uniform1i(e.getUniformLocation(n,`u_input`),0),e.uniform1f(e.getUniformLocation(n,`u_threshold`),a.threshold),c(e,t),l(e,m),e.useProgram(o),u(e,p.texture,0),x(o,g,p.width,p.height),c(e,t),l(e,p),e.useProgram(s),u(e,m.texture,0),x(s,g,m.width,m.height),c(e,t),l(e,i),e.useProgram(d),u(e,r,0),e.uniform1i(e.getUniformLocation(d,`u_original`),0),u(e,p.texture,1),e.uniform1i(e.getUniformLocation(d,`u_glow`),1),e.uniform1f(e.getUniformLocation(d,`u_strength`),a.strength),c(e,t)},dispose(){e.deleteProgram(n),e.deleteProgram(o),e.deleteProgram(s),e.deleteProgram(d),p&&a(e,p),m&&a(e,m)}}}var I,L,R;function z(){return(z=e((()=>{g(),b(),I=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_threshold;
out vec4 fragColor;

${p}

// Film halation tint — warm red/orange
const vec3 HALATION_TINT = vec3(1.0, 0.3, 0.1);

void main() {
  vec3 c = texture(u_input, v_uv).rgb;
  float luma = luminance(c);
  float mask = clamp((luma - u_threshold) / (1.0 - u_threshold + 1e-6), 0.0, 1.0);
  vec3 bright = c * mask;
  fragColor = vec4(bright * HALATION_TINT, 1.0);
}
`,L=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_original;
uniform sampler2D u_glow;
uniform float u_strength;
out vec4 fragColor;

void main() {
  vec3 base = texture(u_original, v_uv).rgb;
  vec3 glow = texture(u_glow, v_uv).rgb;
  fragColor = vec4(clamp(base + glow * u_strength, 0.0, 1.0), 1.0);
}
`,R=1024})))()}function B(e,t){let n=r(e,f,V),o=r(e,f,H),s=r(e,f,v),d=r(e,f,y),p=r(e,f,U),m=null,h=null,g=null,b=0,x=0,S=0,C=0;function w(t,n){let r=Math.min(1,W/Math.max(t,n)),o=Math.max(1,Math.round(t*r)),s=Math.max(1,Math.round(n*r));(o!==b||s!==x)&&(m&&a(e,m),h&&a(e,h),m=i(e,o,s),h=i(e,o,s),b=o,x=s)}function T(t,n){(t!==S||n!==C)&&(g&&a(e,g),g=i(e,t,n),S=t,C=n)}function E(t,n,r,i){e.uniform1fv(e.getUniformLocation(t,`u_weights`),n.weights),e.uniform1fv(e.getUniformLocation(t,`u_offsets`),n.offsets),e.uniform1i(e.getUniformLocation(t,`u_kernelSize`),n.size),e.uniform2f(e.getUniformLocation(t,`u_texelSize`),1/r,1/i),e.uniform1i(e.getUniformLocation(t,`u_input`),0)}return{execute(r,i,a){let f=i.width,v=i.height,y=r,b=Math.abs(a.distortion)>1e-6;if(b){if(T(f,v),!g)return;l(e,g),e.useProgram(n),u(e,r,0),e.uniform1i(e.getUniformLocation(n,`u_input`),0),e.uniform1f(e.getUniformLocation(n,`u_distortion`),a.distortion),c(e,t),y=g.texture}let x=a.strength>0,S=a.vignetteStrength>0;if(!x&&!S)b&&(l(e,i),e.useProgram(p),u(e,y,0),e.uniform1i(e.getUniformLocation(p,`u_original`),0),u(e,y,1),e.uniform1i(e.getUniformLocation(p,`u_haze`),1),e.uniform1f(e.getUniformLocation(p,`u_strength`),0),e.uniform1f(e.getUniformLocation(p,`u_vignetteStrength`),0),c(e,t));else if(w(f,v),m&&h){if(x){let n=Math.min(1,W/Math.max(f,v)),r=Math.max(3,Math.round(a.radius*n)),i=_(Math.min(r,63));l(e,m),e.useProgram(o),u(e,y,0),e.uniform1i(e.getUniformLocation(o,`u_input`),0),c(e,t),l(e,h),e.useProgram(s),u(e,m.texture,0),E(s,i,m.width,m.height),c(e,t),l(e,m),e.useProgram(d),u(e,h.texture,0),E(d,i,h.width,h.height),c(e,t)}l(e,i),e.useProgram(p),u(e,y,0),e.uniform1i(e.getUniformLocation(p,`u_original`),0),u(e,x?m.texture:y,1),e.uniform1i(e.getUniformLocation(p,`u_haze`),1),e.uniform1f(e.getUniformLocation(p,`u_strength`),x?a.strength:0),e.uniform1f(e.getUniformLocation(p,`u_vignetteStrength`),a.vignetteStrength),c(e,t)}},dispose(){e.deleteProgram(n),e.deleteProgram(o),e.deleteProgram(s),e.deleteProgram(d),e.deleteProgram(p),m&&a(e,m),h&&a(e,h),g&&a(e,g)}}}var V,H,U,W;function G(){return(G=e((()=>{g(),b(),V=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
uniform float u_distortion;
out vec4 fragColor;

void main() {
  vec2 centered = v_uv * 2.0 - 1.0;
  float r = length(centered);
  float k = u_distortion * 0.5;
  float rDistorted = r * (1.0 + k * r * r);
  float scale = (r > 1e-6) ? rDistorted / r : 1.0;

  // Auto-zoom for barrel distortion to eliminate black edges
  if (k > 0.0) {
    float barrelZoom = 1.0 + 2.0 * k;
    float zoom = min(barrelZoom, 1.4);
    scale /= zoom;
  }

  vec2 distorted = centered * scale * 0.5 + 0.5;

  if (distorted.x < 0.0 || distorted.x > 1.0 || distorted.y < 0.0 || distorted.y > 1.0) {
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    fragColor = vec4(texture(u_input, distorted).rgb, 1.0);
  }
}
`,H=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_input;
out vec4 fragColor;

${p}

const float THRESHOLD = 0.25;
const float INTENSITY = 10.0;

void main() {
  vec3 c = texture(u_input, v_uv).rgb;
  float luma = luminance(c);
  float mask = clamp((luma - THRESHOLD) / (1.0 - THRESHOLD), 0.0, 1.0);
  mask = mask * mask; // quadratic falloff
  fragColor = vec4(c * mask * INTENSITY, 1.0);
}
`,U=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_original;
uniform sampler2D u_haze;
uniform float u_strength;
uniform float u_vignetteStrength;
out vec4 fragColor;

${p}

const float BIAS = 0.9;

void main() {
  vec3 base = texture(u_original, v_uv).rgb;
  vec3 haze = texture(u_haze, v_uv).rgb;

  // Bias suppression — concentrate haze in shadows
  float luma = luminance(base);
  float protect = pow(1.0 - luma, BIAS * 3.0);
  haze *= protect;

  vec3 result = clamp(base + haze * u_strength, 0.0, 1.0);

  // Vignette — radial darkening with quadratic falloff
  if (u_vignetteStrength > 0.0) {
    vec2 centered = v_uv * 2.0 - 1.0;
    float radiusSq = dot(centered, centered);
    float vignette = clamp(1.0 - u_vignetteStrength * radiusSq, 0.0, 1.0);
    result *= vignette;
  }

  fragColor = vec4(result, 1.0);
}
`,W=1024})))()}function K(e,t){let n=r(e,f,v),o=r(e,f,y),s=r(e,f,q),d=null,p=null,m=0,h=0;function g(t,n){let r=Math.min(1,J/Math.max(t,n)),o=Math.max(1,Math.round(t*r)),s=Math.max(1,Math.round(n*r));(o!==m||s!==h)&&(d&&a(e,d),p&&a(e,p),d=i(e,o,s),p=i(e,o,s),m=o,h=s)}function b(t,n,r,i){e.uniform1fv(e.getUniformLocation(t,`u_weights`),n.weights),e.uniform1fv(e.getUniformLocation(t,`u_offsets`),n.offsets),e.uniform1i(e.getUniformLocation(t,`u_kernelSize`),n.size),e.uniform2f(e.getUniformLocation(t,`u_texelSize`),1/r,1/i),e.uniform1i(e.getUniformLocation(t,`u_input`),0)}function x(e){return Math.max(3,Math.round(e*15))}return{execute(r,i,a){if(g(i.width,i.height),!d||!p)return;let f=x(a.filterRadius),m=Math.min(1,J/Math.max(i.width,i.height)),h=Math.max(3,Math.round(f*m)),v=_(Math.min(h,63));l(e,d),e.useProgram(n),u(e,r,0),b(n,v,d.width,d.height),c(e,t),l(e,p),e.useProgram(o),u(e,d.texture,0),b(o,v,d.width,d.height),c(e,t),l(e,i),e.useProgram(s),u(e,r,0),e.uniform1i(e.getUniformLocation(s,`u_original`),0),u(e,p.texture,1),e.uniform1i(e.getUniformLocation(s,`u_blurred`),1),e.uniform1f(e.getUniformLocation(s,`u_detailMult`),a.detailMult),c(e,t)},dispose(){e.deleteProgram(n),e.deleteProgram(o),e.deleteProgram(s),d&&a(e,d),p&&a(e,p)}}}var q,J;function Y(){return(Y=e((()=>{g(),b(),q=`#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_original;
uniform sampler2D u_blurred;
uniform float u_detailMult;
out vec4 fragColor;

void main() {
  vec3 orig = texture(u_original, v_uv).rgb;
  vec3 blurred = texture(u_blurred, v_uv).rgb;
  vec3 detail = orig - blurred;
  vec3 result = blurred + detail * u_detailMult;
  fragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`,J=1024})))()}var X;function Z(){return(Z=e((()=>{g(),T(),O(),j(),P(),z(),G(),Y(),X=class{constructor(){this.gl=null,this.quad=null,this.inputTexture=null,this.fboA=null,this.fboB=null,this.passthroughProg=null,this.colorCorrect=null,this.softenDetails=null,this.bloom=null,this.halation=null,this.lensHaze=null,this.exposure=null,this.filmGrain=null,this.width=0,this.height=0}init(e){let n=t(e);this.gl=n,this.quad=s(n),this.passthroughProg=r(n,f,h),this.colorCorrect=E(n,this.quad),this.softenDetails=K(n,this.quad),this.bloom=x(n,this.quad),this.halation=F(n,this.quad),this.lensHaze=B(n,this.quad),this.exposure=k(n,this.quad),this.filmGrain=M(n,this.quad)}loadImage(e){let t=this.gl;this.inputTexture&&t.deleteTexture(this.inputTexture),this.inputTexture=o(t,e),this.resize(e.naturalWidth,e.naturalHeight)}resize(e,t){let n=this.gl;(e!==this.width||t!==this.height)&&(this.fboA&&a(n,this.fboA),this.fboB&&a(n,this.fboB),this.fboA=i(n,e,t),this.fboB=i(n,e,t),this.width=e,this.height=t)}process(e,t){if(!this.gl||!this.inputTexture||!this.fboA||!this.fboB||!this.quad)return;let n=this.inputTexture,r=this.fboA,i=this.fboB,a=()=>{n=r.texture;let e=r;r=i,i=e};t.colorCorrect&&(this.colorCorrect.execute(n,r,e.colorCorrect),a()),t.softenDetails&&(this.softenDetails.execute(n,r,e.softenDetails),a()),t.bloom&&(this.bloom.execute(n,r,n,e.bloom),a()),t.halation&&(this.halation.execute(n,r,e.halation),a()),t.lensHaze&&(this.lensHaze.execute(n,r,e.lensHaze),a()),t.exposure&&(this.exposure.execute(n,r,e.exposure),a()),t.filmGrain&&(this.filmGrain.execute(n,r,e.filmGrain),a()),this.renderToScreen(n)}renderToScreen(e){let t=this.gl,n=t.canvas;d(t,n.width,n.height),t.useProgram(this.passthroughProg),u(t,e,0),t.uniform1i(t.getUniformLocation(this.passthroughProg,`u_input`),0),c(t,this.quad)}dispose(){var e,t,n,r,i,o,s;(e=this.colorCorrect)==null||e.dispose(),(t=this.softenDetails)==null||t.dispose(),(n=this.bloom)==null||n.dispose(),(r=this.halation)==null||r.dispose(),(i=this.lensHaze)==null||i.dispose(),(o=this.exposure)==null||o.dispose(),(s=this.filmGrain)==null||s.dispose();let c=this.gl;c&&(this.inputTexture&&c.deleteTexture(this.inputTexture),this.fboA&&a(c,this.fboA),this.fboB&&a(c,this.fboB),this.passthroughProg&&c.deleteProgram(this.passthroughProg),this.quad&&(c.deleteVertexArray(this.quad.vao),c.deleteBuffer(this.quad.positionBuffer)),this.gl=null)}}})))()}export{Z as n,X as t};
//# debugId=c2783635-97bc-5e3d-8e20-e9b04744f2d9

//# chunkId=c2783635-97bc-5e3d-8e20-e9b04744f2d9