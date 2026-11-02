!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="175cdb96-9f33-5a8a-8882-9a8a0dc6e00a")}catch(e){}}();import{n as e,o as t}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{n,t as r}from"./1a2c0e3d-cDDL42W-rICdDKa-.js";import{Gt as i,Kt as a}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{qr as o}from"./1a2c0e3d-KNPZJj8fQZaYwEZk.js";import{n as s,t as c}from"./1a2c0e3d-pRoiYrIns9gM_1bf.js";import{c as l,t as u}from"./1a2c0e3d-0E3keQGS02Q_sX6y.js";import{n as d,t as f}from"./1a2c0e3d-Rr3fMrpj4w56bzop.js";import{a as p,i as m,n as h}from"./1a2c0e3d-F4RCTZIC3D8GqxLi.js";function g(e){let{auth:t,isReady:r}=s(),i=n({queries:e.map(e=>({...f(e,t),enabled:r,staleTime:18e5}))});return(0,_.useMemo)(()=>{let t={};return e.forEach((e,n)=>{var r,a;let o=(r=i[n])==null?void 0:r.data,s=o==null||(a=o.profile)==null?void 0:a[`color-palette`];t[e]={name:o&&u(o)||null,coverColor:h(s)}}),t},[e,i])}var _;function v(){return(v=e((()=>{r(),_=a(),c(),m(),l(),d()})))()}function y(e,t,n){return Math.min(n,Math.max(t,e))}function b(e,t){let n=e+1^Math.imul(w.indexOf(t)+1,73244475),r=()=>{n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296};return[r(),r(),r(),r()]}function x(e,t,n=e.seed){let r=b(n,t),i=O[t],a=(r[2]-.5)*.65,o=e.points.map((t,n)=>{let o=n>=3,s=i.anchors[n%3],c=(e.points.length===1?50:s[0])-50,l=(e.points.length===1?50:s[1])-50;return{...t,x:y(Math.round(50+c*Math.cos(a)-l*Math.sin(a)+(r[0]-.5)*24+(o?Math.sin(n*2.4)*22:0)),0,100),y:y(Math.round(50+c*Math.sin(a)+l*Math.cos(a)+(r[1]-.5)*24+(o?Math.cos(n*2.4)*22:0)),0,100),spread:Math.round(i.spread*(.82+r[3]*.38))}});return{...e,style:t,seed:n,points:o}}function S(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t>>>0}function C(e){let t=S(e);return{style:w[t%w.length],seed:Math.floor(t/w.length)%D}}function ee(e,t){let n=e.filter(e=>p(e)!==null).slice(0,8);if(n.length===0)return null;let r=C(t),i={...E,...r};return x({...i,points:n.map(e=>({color:e,x:50,y:50,spread:100,strength:100}))},i.style,i.seed)}var w,T,E,D,O;function k(){return(k=e((()=>{m(),w=[`veil`,`bloom`,`drift`,`horizon`,`arc`,`slit`,`diagonal`,`edge`,`band`,`folds`],T=[{id:`classic`,chars:` .:-=+*#%@`},{id:`technical`,chars:` .:/+xX#%@`},{id:`binary`,chars:` 010101010`}],E={background:`#0F1113`,treatment:`pigment`,softness:80,coverage:50,glow:40,flow:70,depth:70,scale:100,angle:-50,seed:4,style:`veil`,quiet:0,texture:`dither`,grain:20,ascii:!0,asciiSet:`binary`,asciiSize:20,asciiDensity:30,asciiContrast:24},D=1e4,O={veil:{anchors:[[12,80],[82,20],[60,75]],spread:80},bloom:{anchors:[[18,22],[83,76],[70,9]],spread:70},drift:{anchors:[[16,16],[54,53],[84,88]],spread:76},horizon:{anchors:[[10,77],[83,96],[90,25]],spread:104},arc:{anchors:[[14,92],[90,14],[80,78]],spread:84},slit:{anchors:[[46,24],[58,87],[12,68]],spread:68},diagonal:{anchors:[[16,82],[58,46],[87,16]],spread:94},edge:{anchors:[[80,45],[92,14],[72,84]],spread:100},band:{anchors:[[14,52],[50,45],[86,54]],spread:90},folds:{anchors:[[18,82],[71,24],[87,76]],spread:92}}})))()}function te(){let e=document.createElement(`canvas`);e.width=640,e.height=192;let t=e.getContext(`2d`);if(!t)throw Error(`Canvas rendering is unavailable.`);return t.fillStyle=`#fff`,t.font=`500 48px monospace`,t.textAlign=`center`,t.textBaseline=`middle`,T.forEach((e,n)=>[...e.chars].forEach((e,r)=>t.fillText(e,r*64+32,n*64+32))),e}function A(e){var t;let n=(t=p(e))==null?[0,0,0]:t;return[n[0],n[1],n[2],1]}function ne([e,t,n]){let[r,i,a]=[e,t,n].map(e=>e/255<=.04045?e/255/12.92:((e/255+.055)/1.055)**2.4),o=Math.cbrt(.4122214708*r+.5363325363*i+.0514459929*a),s=Math.cbrt(.2119034982*r+.6806995451*i+.1073969566*a),c=Math.cbrt(.0883024619*r+.2817188376*i+.6299787005*a);return[.2104542553*o+.793617785*s-.0040720468*c,1.9779984951*o-2.428592205*s+.4505937099*c,.0259040371*o+.7827717662*s-.808675766*c]}function j(){let e=document.createElement(`canvas`),t=e.getContext(`webgl`,{alpha:!1,depth:!1,antialias:!1,preserveDrawingBuffer:!0});if(!t)throw Error(`WebGL is unavailable.`);let n=(e,n)=>{let r=t.createShader(e);if(!r)throw Error(`Shader creation failed`);if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){let e=t.getShaderInfoLog(r);throw t.deleteShader(r),Error(e||`Shader compilation failed`)}return r},r=n(t.VERTEX_SHADER,F),i;try{i=n(t.FRAGMENT_SHADER,I)}catch(e){throw t.deleteShader(r),e}let a=t.createProgram();if(!a)throw Error(`Program creation failed`);if(t.attachShader(a,r),t.attachShader(a,i),t.linkProgram(a),t.deleteShader(r),t.deleteShader(i),!t.getProgramParameter(a,t.LINK_STATUS)){let e=t.getProgramInfoLog(a);throw t.deleteProgram(a),Error(e||`Shader linking failed`)}let o=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.useProgram(a);let s=t.getAttribLocation(a,`position`);t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0);let c=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,te()),t.uniform1i(t.getUniformLocation(a,`glyphs`),0);let l=new Map;for(let e of L)l.set(e,t.getUniformLocation(a,e));return{canvas:e,draw(n,r,i,o){if(t.isContextLost())throw z=void 0,Error(`The graphics context was lost.`);let s=t.getParameter(t.MAX_RENDERBUFFER_SIZE);if(r>s||i>s)throw Error(`The cover exceeds the graphics size the browser supports.`);e.width<r&&(e.width=r),e.height<i&&(e.height=i),t.viewport(0,0,r,i),t.useProgram(a),t.uniform2f(l.get(`resolution`),r,i);let c=new Float32Array(32),u=new Float32Array(32);n.points.forEach((e,t)=>{let n=A(e.color);c.set([...ne(n),n[3]],t*4),u.set([e.x/100,e.y/100,e.spread/100,e.strength/100],t*4)}),t.uniform4fv(l.get(`pigments[0]`),c),t.uniform4fv(l.get(`anchors[0]`),u);let[d,f,p]=A(n.background);t.uniform3f(l.get(`base`),d/255,f/255,p/255),t.uniform1f(l.get(`count`),n.points.length),t.uniform1f(l.get(`style`),w.indexOf(n.style)),t.uniform4fv(l.get(`variation`),b(n.seed,n.style)),t.uniform1f(l.get(`texture`),n.texture===`dither`?2:+(n.texture===`grain`)),t.uniform1f(l.get(`ascii`),+!!n.ascii),t.uniform1f(l.get(`asciiSet`),Math.max(0,T.findIndex(e=>e.id===n.asciiSet))),t.uniform1f(l.get(`treatment`),n.treatment===`light`?0:1);for(let e of R)t.uniform1f(l.get(e),n[e]);t.uniform1f(l.get(`seed`),n.seed+o),t.drawArrays(t.TRIANGLES,0,3)},dispose(){var e;t.deleteTexture(c),t.deleteBuffer(o),t.deleteProgram(a),(e=t.getExtension(`WEBGL_lose_context`))==null||e.loseContext()}}}function M(){try{return z!=null||(z=j()),!0}catch(e){return!1}}function N(){z==null||z.dispose(),z=void 0}function P(e,t,n,r,i=0){z!=null||(z=j()),z.draw(t,n,r,i),e.width!==n&&(e.width=n),e.height!==r&&(e.height=r);let a=e.getContext(`2d`);if(!a)throw Error(`Canvas rendering is unavailable.`);a.drawImage(z.canvas,0,z.canvas.height-r,n,r,0,0,n,r)}var F,I,L,R,z;function B(){return(B=e((()=>{m(),k(),F=`attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`,I=`
precision highp float;
uniform vec2 resolution;
uniform vec4 pigments[8], anchors[8];
uniform vec3 base;
uniform float count, style, seed, flow, depth, scale, angle, softness, grain, quiet, texture;
uniform sampler2D glyphs;
uniform float ascii, asciiSet, asciiSize, asciiDensity, asciiContrast;
uniform vec4 variation;
uniform float coverage, glow, treatment;
const float PI = 3.14159265359;
float square(float v) { return v*v; }
vec3 fromLab(vec3 c) {
  vec3 lms = mat3(1.,1.,1.,.3963377774,-.1055613458,-.0894841775,.2158037573,-.0638541728,-1.291485548)*c;
  vec3 linear = max(mat3(4.0767416621,-1.2684380046,-.0041960863,-3.3077115913,2.6097574011,-.7034186147,.2309699292,-.3413193965,1.707614701)*(lms*lms*lms),0.);
  return mix(linear*12.92,1.055*pow(linear,vec3(1./2.4))-.055,step(vec3(.0031308),linear));
}
vec3 shadowColor() {
  // The first brand color gives the negative space a quiet hue. Limit both
  // lightness and chroma so even neon palettes keep a deep, restrained shadow.
  vec3 primary = pigments[0].rgb;
  float chroma = length(primary.yz);
  primary.x = .24;
  primary.yz *= min(.2,.03/max(.0001,chroma));
  float influence = .72*smoothstep(.008,.06,chroma)*pigments[0].a*clamp(anchors[0].w,0.,1.);
  return mix(base*.36,fromLab(primary),influence);
}
vec4 pigment(vec2 uv) {
  // Broad, eased spatial blending; Softness affects the actual color transition.
  float total = 0.; float coverage = 0.; float chroma = 0.; vec3 color = vec3(0.);
  float soft = softness/100.;
  for (int i=0; i<8; i++) {
    if (float(i) < count) {
      vec2 d = uv - anchors[i].xy;
      float weight = exp(-dot(d,d) / max(.008, anchors[i].z * anchors[i].z * mix(.1,.28,soft))) * anchors[i].w * pigments[i].a;
      coverage = max(coverage, weight);
      float influence = pow(weight, mix(1.85,1.,soft));
      total += influence;
      color += pigments[i].rgb * influence;
      chroma += length(pigments[i].gb)*influence;
    }
  }
  vec3 blended = color/max(1.e-20,total);
  float averageChroma = chroma/max(1.e-20,total);
  // Opposing hues can cancel into a muddy midtone. A small neutral light bridge
  // opens that overlap without rotating either of the user's source colors.
  float cancellation = clamp(1.-length(blended.yz)/max(.0001,averageChroma),0.,1.);
  float bridge = smoothstep(.22,.85,cancellation)*smoothstep(.025,.12,averageChroma);
  blended.x += bridge*.11*(1.-blended.x);
  blended.yz *= 1.-bridge*.14;
  return vec4(blended,smoothstep(0.,.12,coverage));
}
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
float bell(float d, float width) { return exp(-square(d/width)); }
float ease(float t) { t=clamp(t,0.,1.); return t*t*t*(t*(t*6.-15.)+10.); }
vec3 field(vec2 uv) {
  vec2 p = (uv-.5) * vec2(resolution.x/resolution.y,1.);
  float turnRange = style > 8.5 ? PI*1.6 : style > 5.5 ? .65 : 1.1;
  float rad = angle*PI/180.+(variation.z-.5)*turnRange;
  p = mat2(cos(rad),-sin(rad),sin(rad),cos(rad))*p*100./scale;
  float s = variation.w*PI*2.;
  p += (variation.xy-.5)*.38;
  float warp = flow/100.; float relief = depth/100.; float soft = softness/100.;
  vec2 painted = uv + warp*.12*vec2(sin(p.y*2.1+s*.2),sin(p.x*2.4-s*.13));
  float area = mix(.5,1.6,coverage/100.);
  float width = (.065+soft*.12)*area*(.85+variation.w*.3);
  float illumination = 0.; float highlight = 0.;
  if (style < .5) {
    // One wide S-shaped sheet; a soft shadow cuts into one side of the fold.
    float w = p.y + warp*.42*sin(p.x*2.8+s*.25);
    float sheet = bell(w+.08,width*1.8);
    float fold = smoothstep(-width*.7,width*.9,w);
    illumination = .025+sheet*(.26+.74*fold)+.3*bell(w+.39,width*.9);
    highlight = .6*bell(w-.08,width*.72);
  } else if (style < 1.5) {
    // Separate islands of diffuse color, with a darker river between them.
    vec2 q = p + warp*.18*vec2(sin(p.y*3.1+s*.2),sin(p.x*2.5));
    vec2 a = (q-vec2(-.44,-.27))/vec2(.28+width*.9,.22+width*.6);
    vec2 b = (q-vec2(.46,.32))/vec2(.26+width*.6,.27+width);
    vec2 c = (q-vec2(.38,-.48))/vec2(.3+width*.5,.17+width*.45);
    float cloudA = exp(-dot(a,a)); float cloudB = exp(-dot(b,b));
    float cloudC = exp(-dot(c,c));
    illumination = .05+.9*cloudA+.72*cloudB+.65*cloudC;
    highlight = .48*cloudA+.35*cloudC;
  } else if (style < 2.5) {
    // Three tapered beams form a fan, rather than parallel copies of one fold.
    float spread = .18+variation.x*.18;
    float bend = warp*.055*sin(p.x*3.+s);
    float taper = .55+.55*ease((p.x+1.)/2.);
    float a = bell(p.y+.30+(p.x+.7)*spread+bend,width*.35*taper);
    float b = bell(p.y+.02+bend,width*.68*taper);
    float c = bell(p.y-.30-(p.x+.7)*spread*.55+bend,width*.44*taper);
    illumination = .012+.8*a+.95*b+.58*c;
    highlight = .8*a+.45*b;
    painted += vec2(warp*.06*sin(p.y*4.),0.);
  } else if (style < 3.5) {
    // A luminous rising horizon, fading through color into a quiet dark field.
    float w = p.y + .12*square(p.x) + warp*.15*sin(p.x*1.9+s*.12);
    float lift = ease((w+.12+width)/(width*2.3+.22));
    illumination = .02+.98*lift;
    highlight = .7*lift*lift;
    painted += vec2(0.,.12*lift);
  } else if (style < 4.5) {
    // A large cropped ellipse leaves a calm dark field above a luminous crescent.
    vec2 q = (p-vec2(-.22,-.76))*vec2(.8,1.);
    float d = length(q)-(.92+variation.y*.16);
    float arc = bell(d,width*.75);
    float haze = bell(d-.22,width*1.5);
    illumination = .01+.84*arc+.38*haze;
    highlight = .82*arc;
    painted += vec2(warp*.12*sin(d*3.),warp*.08);
  } else if (style < 5.5) {
    // A narrow seam of light and its defocused spill, surrounded by negative space.
    float w = p.x+warp*.17*sin(p.y*2.6+s*.3);
    float seam = bell(w,width*.19);
    float spill = bell(w-.07,width*.95);
    float falloff = .45+.55*bell(p.y+.05,.65);
    illumination = .004+(.9*seam+.27*spill)*falloff;
    highlight = .85*seam*falloff;
  } else if (style < 6.5) {
    // One diagonal light plane, with a long feathered transition into shadow.
    float edge = dot(p,vec2(.62,.78))+(variation.x-.5)*.3;
    edge += warp*.06*square(p.x);
    float light = ease((edge+.22)/(width*3.+.28));
    illumination = .015+.95*light;
    highlight = .42*light*light;
    painted += vec2(edge*.06,0.);
  } else if (style < 7.5) {
    // A single diffuse source outside the frame: no rings or interior islands.
    vec2 center = vec2(.48+resolution.x/resolution.y*.22,(variation.y-.5)*.65);
    vec2 radius = vec2(.35+width*2.1,.35+width*1.6+warp*.22);
    vec2 q = (p-center)/radius;
    float light = exp(-dot(q,q));
    illumination = .012+.98*light;
    highlight = .55*light*light;
  } else if (style < 8.5) {
    // One broad, gently bowed band, tapering softly at the ends.
    float distance = p.y+(variation.y-.5)*.28+warp*.06*square(p.x);
    float band = bell(distance,width*1.55+.06);
    float taper = .68+.32*bell(p.x,.85+variation.x*.4);
    illumination = .02+.9*band*taper;
    highlight = .5*band*band*taper;
  } else {
    // Overlapping broad fabric planes, a soft crease, and a tucked-under shadow.
    float turn = (variation.x-.5)*1.1;
    vec2 q = mat2(cos(turn),-sin(turn),sin(turn),cos(turn))*p;
    float crease = q.y+warp*.22*sin(q.x*(1.3+variation.y*1.3)+s);
    float feather = width*(.6+soft*.4);
    float upper = ease((crease+.42)/(feather*3.2+.4));
    float lower = bell(crease+.28,feather*1.7);
    float tuck = q.x*.65+q.y*.35-(variation.y-.5)*.5;
    float overlap = ease((tuck+.15)/(feather*2.4+.2));
    float shadow = bell(crease+.03,feather*.75)*(.35+.4*overlap);
    illumination = .06+upper*(.35+.5*overlap)+lower*.52-shadow*.45;
    highlight = .48*bell(crease-.15,feather*1.2)*overlap;
    painted += vec2(crease*.15,tuck*.12);
  }
  illumination = clamp(illumination,0.,1.);
  vec4 palette = pigment(painted);
  vec3 ink = mix(shadowColor(),fromLab(palette.rgb),palette.a);
  float shade = pow(illumination,.85+relief*.7);
  vec3 ambient = shadowColor();
  vec3 color = mix(ambient,ink,shade);
  // A broad, tinted white lift replaces the previous thin specular highlights.
  vec3 light = mix(ink,vec3(1.),.84);
  color = mix(color,light,clamp(highlight*glow/100.*1.25,0.,.85));
  // A restrained primary-colored ambient field eases into the brighter light.
  color = mix(ambient,color,ease(.25+illumination*2.));
  if (treatment > .5) {
    // Pigment: the primary is the material, secondary colors are localized in
    // the lit folds. A wide irregular pool fills the space between the folds.
    float primaryWeight = pigments[0].a*clamp(anchors[0].w,0.,1.);
    vec3 primary = mix(palette.rgb,pigments[0].rgb,smoothstep(0.,.35,primaryWeight));
    vec2 poolPosition = p-vec2(.3*sin(s),-.25*cos(s));
    poolPosition.y += warp*.3*sin(poolPosition.x*2.+s*.2);
    float pool = exp(-dot(poolPosition*vec2(.65,1.15),poolPosition*vec2(.65,1.15))*1.4);
    float energy = clamp(illumination*.88+pool*.18,0.,1.);
    float accent = smoothstep(.14,.85,illumination)*.8;
    vec3 dye = mix(primary,palette.rgb,accent);
    // Work in perceptual lightness instead of adding a white RGB highlight.
    // This keeps lime, cobalt, red and near-neutral palettes recognizably different.
    float sourceLight = clamp(dye.x,.18,.9);
    float low = mix(.2,.12,relief)+sourceLight*.04;
    dye.x = mix(low,.63+sourceLight*.23,pow(energy,.84));
    dye.x += highlight*glow/100.*.14;
    // A restrained cool undertone adds tonal separation to the shadows while
    // keeping the brightest pigment close to its supplied hue.
    dye.yz = mix(dye.yz,vec2(-.5,-.866)*length(dye.yz),.18*(1.-smoothstep(.05,.65,energy)));
    dye.yz *= mix(.42,1.08,smoothstep(0.,.6,energy));
    dye.yz *= min(1.,dye.x*.34/max(.0001,length(dye.yz)));
    float substrate = mix(.88,1.,smoothstep(0.,.65,energy));
    color = mix(base*.36,fromLab(dye),max(palette.a,primaryWeight)*substrate);
  }
  float rest = exp(-dot((uv-vec2(.02,.95))*vec2(1.2,1.5),(uv-vec2(.02,.95))*vec2(1.2,1.5))*3.);
  color *= 1.-rest*quiet/100.*.65;
  float vignette = smoothstep(.2,1.,length((uv-.5)*vec2(.8,1.)));
  color *= 1.-vignette*.1;
  return color;
}
void main() {
  vec2 uv = vec2(gl_FragCoord.x/resolution.x,1.-gl_FragCoord.y/resolution.y);
  vec3 color = field(uv);
  // Texture is applied after the gradient. Its normalized scale is stable in export.
  vec2 pixel = uv*vec2(1000.,1000.*resolution.y/resolution.x);
  float noise = hash(floor(pixel*1.6))-.5;
  float amount = grain/100.;
  if (texture > 1.5) {
    // Fine ordered dots with a faint woven structure, not a heavy noise overlay.
    vec2 cell = floor(pixel/2.);
    float threshold = fract((mod(cell.x,4.)*2.+mod(cell.y,4.)*3.)/8.);
    float luminance = clamp(dot(color,vec3(.2126,.7152,.0722)),0.,1.);
    // Zero-mean pattern with continuous tonal modulation. Quantizing luminance
    // here introduces visible contour bands, even when the underlying field is soft.
    float dots = (threshold-.4375)*(.35+.65*sin(luminance*PI));
    float weave = sin(pixel.x*PI)*sin(pixel.y*PI)*.12;
    color += (dots*.18+weave+noise*.16)*amount;
  } else if (texture > .5) color += noise*amount*.45;
  color += noise/255.;
  if (ascii > .5 && asciiDensity > 0. && asciiContrast > 0.) {
    // Sample the continuous field once at each cell's center. Every pixel in a
    // glyph then agrees on its character and opacity, avoiding split letters.
    vec2 grid = vec2(1000.,1000.*resolution.y/resolution.x)/asciiSize;
    vec2 cell = floor(uv*grid);
    vec2 local = fract(uv*grid);
    vec3 sampleColor = clamp(field((cell+.5)/grid),0.,1.);
    float tone = dot(sampleColor,vec3(.2126,.7152,.0722));
    float random = hash(cell+seed*.13);
    float coverage = asciiDensity/100.*smoothstep(.035,.68,tone);
    float visibility = smoothstep(random,random+.18,coverage)*smoothstep(0.,.12,coverage);
    float character = floor(clamp(tone*.85+random*.15,.1,.999)*10.);
    float mask = texture2D(glyphs,vec2((character+local.x)/10.,(asciiSet+local.y)/3.)).a;
    // Bright ink in the shadows, dark ink on very light paper-like areas.
    vec3 ink = mix(mix(sampleColor,vec3(1.),.82),base*.25,smoothstep(.5,.78,tone));
    float titleRest = exp(-dot((uv-vec2(.02,.95))*vec2(1.2,1.5),(uv-vec2(.02,.95))*vec2(1.2,1.5))*3.);
    color = mix(color,ink,mask*visibility*asciiContrast/100.*(1.-titleRest*min(1.,quiet/100.*2.5)));
  }
  gl_FragColor = vec4(clamp(color,0.,1.),1.);
}`,L=[`resolution`,`pigments[0]`,`anchors[0]`,`base`,`count`,`style`,`seed`,`flow`,`depth`,`scale`,`angle`,`softness`,`grain`,`quiet`,`texture`,`ascii`,`asciiSet`,`asciiSize`,`asciiDensity`,`asciiContrast`,`variation`,`coverage`,`glow`,`treatment`],R=[`seed`,`flow`,`depth`,`scale`,`angle`,`softness`,`grain`,`quiet`,`asciiSize`,`asciiDensity`,`asciiContrast`,`coverage`,`glow`]})))()}function V(e,t,n){return e+(t-e)*n}function re(e,t){return t<=0?e:{...e,glow:V(e.glow,X.glow,t),depth:V(e.depth,X.depth,t)}}function H(){return typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}function U({palette:e,seed:t,hovered:n=!1,className:r}){let i=(0,G.useMemo)(()=>ee(e,t),[e,t]),[a,o]=(0,G.useState)(i?`canvas`:`neutral`),[s,c]=(0,G.useState)(!1),l=(0,G.useRef)(null),u=(0,G.useRef)(0),d=(0,G.useRef)(0),f=(0,G.useRef)(()=>{});(0,G.useEffect)(()=>{if(!i){o(`neutral`);return}if(s||!M()){o(`css`);return}if(a!==`canvas`){o(`canvas`);return}let e=l.current;if(!e)return;Y+=1;let t=0,n=()=>{let t=e.getBoundingClientRect();if(!t.width||!t.height)return;let n=Math.min(Math.min(window.devicePixelRatio||1,J),Math.sqrt(q/(t.width*t.height)));try{P(e,re(i,u.current),Math.round(t.width*n),Math.round(t.height*n),d.current)}catch(e){c(!0)}};f.current=n;let r=()=>{cancelAnimationFrame(t),t=requestAnimationFrame(n)},p=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return p==null||p.observe(e),r(),()=>{p==null||p.disconnect(),cancelAnimationFrame(t),f.current=()=>{},--Y,Y===0&&N()}},[i,s,a]),(0,G.useEffect)(()=>{if(a!==`canvas`||!i)return;let e=u.current,t=+!!n;if(!n&&e===0&&d.current===0)return;let r=H(),o=performance.now(),s=d.current,c=0,l=i=>{let a=r?1:Math.min(1,(i-o)/Z),p=1-(1-a)**3;u.current=V(e,t,p);let m=n&&!r?Math.floor((i-o)/Q)+1:0;(a<1||m!==s)&&(s=m,d.current=m,f.current()),(a<1||n&&!r)&&(c=requestAnimationFrame(l))};return c=requestAnimationFrame(l),()=>cancelAnimationFrame(c)},[i,n,a]);let p=a===`css`?{backgroundColor:e[0]}:void 0;return(0,K.jsx)(`span`,{"aria-hidden":!0,"data-ads-brand-cover":a,className:(0,W.default)(`block overflow-hidden`,a===`neutral`&&`bg-q-transparent-light-05`,r),style:p,children:a===`canvas`&&(0,K.jsx)(`canvas`,{ref:l,className:`block size-full`})})}var W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{W=t(o()),G=a(),k(),B(),K=i(),q=22e5,J=2,Y=0,X={glow:65,depth:50},Z=320,Q=90})))()}export{g as i,$ as n,v as r,U as t};
//# debugId=175cdb96-9f33-5a8a-8882-9a8a0dc6e00a

//# chunkId=175cdb96-9f33-5a8a-8882-9a8a0dc6e00a