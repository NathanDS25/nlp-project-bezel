!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="b92bf13c-3085-5c1d-82cb-257f6e6854ed")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Lf as r,Rf as i}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{g as a,l as o}from"./1a2c0e3d-RXMFpnCHih4po08F.js";import{_ as s,n as c}from"./1a2c0e3d-yEUD4lq8e7_10Gkp.js";import{a as l,n as u,o as d,r as f,t as p}from"./1a2c0e3d-gUP-nPfpkmYV7FTx.js";var m;function h(){return(h=e((()=>{m={aspectRatio:`1:1`,background:`paper`,bgColor:`#0D0D12`,grain:.5,ink:`#FDC1BF`,kick:.5,paper:`#FC0503`,scale:1,seed:7,speed:1,word1:`HOPE`,word2:`NOPE`}})))()}function g({value:e,onChange:t}){let{_:n}=i(),r=(0,_.useMemo)(()=>({effectId:`hope-vortex`,title:n({id:`Zr38I-`}),prompt:null,ui:{advancedSectionGap:`compact`,mobilePresetControlId:`background`,panelSectionGap:`compact`,primarySectionPlacement:`advanced`},primarySection:{id:`motion`,label:n({id:`itfxKl`}),surface:`card`,controls:[{type:`slider`,id:`speed`,label:n({id:`l9wI00`}),defaultValue:1,min:.25,max:3,step:.05}]},advancedSections:[{id:`background`,label:n({id:`GtJbUa`}),surface:`card`,controlBlockGap:`spacious`,controls:[{type:`choice`,id:`background`,label:n({id:`GtJbUa`}),defaultValue:`paper`,variant:`sound`,gridColumns:2,options:[{id:`paper`,label:n({id:`xAt6Nj`})},{id:`custom`,label:n({id:`S05wWG`})},{id:`media`,label:n({id:`xYilR2`})},{id:`none`,label:n({id:`sQyiWm`})}]},{type:`color`,id:`ink`,label:n({id:`MapzEo`}),defaultValue:`#FDC1BF`,variant:`surface`},...e.background===`paper`?[{type:`color`,id:`paper`,label:n({id:`PWXDu-`}),defaultValue:`#FC0503`,variant:`surface`}]:[],...e.background===`custom`?[{type:`color`,id:`bgColor`,label:n({id:`WpGbDy`}),defaultValue:`#0D0D12`,variant:`surface`}]:[]]},{id:`vortex`,label:n({id:`xQCKPo`}),surface:`card`,controlGroupGap:`compact`,controls:[{type:`slider`,id:`scale`,label:n({id:`bifv6N`}),defaultValue:1,min:.4,max:1.8,step:.01},{type:`slider`,id:`kick`,label:n({id:`LQgAmn`}),defaultValue:.5,min:0,max:2,step:.01},{type:`slider`,id:`grain`,label:n({id:`e3-65S`}),defaultValue:.5,min:0,max:1,step:.01},{type:`slider`,id:`seed`,label:n({id:`gq6UJs`}),defaultValue:7,min:0,max:99,step:1}]}]}),[n,e.background]),a=(0,_.useMemo)(()=>({speed:e.speed,background:e.background,bgColor:e.bgColor,ink:e.ink,paper:e.paper,scale:e.scale,kick:e.kick,grain:e.grain,seed:e.seed}),[e]),o=(0,_.useCallback)((n,r)=>{t({...e,[n]:r})},[t,e]);return(0,v.jsx)(c,{definition:r,values:a,onValueChange:o})}var _,v;function y(){return(y=e((()=>{s(),r(),_=n(),v=t()})))()}function b(){let e=173.5,t=.42,n=Math.log(1/t)/233.5,r=[1,.93,.85,.774,.687,.638,.604,.581,.566,.558,.551,.547,.543],i=.543,a=[.016,.042,.093,.15,.206,.289,.428,.564,.667,.743,.8,.847,.885,.913,.937,.956,.97,.982,.99,.994,.998,1,1],o=[.005,.04,.075,.12,.16,.19,.215,.24,.27,.3,.35,.42,.52,.61,.7,.76,.82,.87,.92,.97],s=[0,2,4,6,7,8,9,10,11,12,13,14,16,18,20,22,24,26,28,30,32,35,38,41,43],c=[0,-3,-8,-10.5,-9.5,-5.5,2.5,19.5,47.5,77.5,100.5,118,141.5,157,168,175.5,181,184.5,187,188.5,189,186.5,183,181,180],l=[6,74],u=(e,t,n)=>e<t?t:e>n?n:e,d=e=>(e=u(e,0,1),e*e*(3-2*e)),p=e=>{let t=Math.sin(e*12.9898+78.233)*43758.5453;return t-Math.floor(t)};function m(e){if(e<=0)return 0;if(e>=43)return 180;let t=0;for(;t<s.length-1&&s[t+1]<e;)t++;let n=s[t],r=s[t+1],i=(e-n)/(r-n),a=c[Math.max(0,t-1)],o=c[t],l=c[t+1],u=c[Math.min(c.length-1,t+2)],d=i*i,f=d*i;return .5*(2*o+(-a+l)*i+(2*a-5*o+4*l-u)*d+(-a+3*o-3*l+u)*f)}function h(e,t){if(t<=0)return e[0];if(t>=e.length-1)return e[e.length-1];let n=Math.floor(t),r=t-n;return e[n]+(e[n+1]-e[n])*r}function g(e){let t=e,n=0,s=1,c=0,u=0;if(!(t<21)){if(t<33){let e=t-21+1;s=h(r,e),c=d(e/3.5)}else if(t<34)s=i,c=1;else if(t<57){let e=t-21-12-1,r=h(a,e);n=r**.78,s=i+.45699999999999996*r,c=1}else if(t<184){n=1,s=1,c=1;let e=t-57;for(let t of l)u+=m(e-t)}else if(t<204){let e=t-57-127,r=h(o,e);n=(1-r)**1.05,s=(1+.075*r)*(1+.022*Math.sin(Math.PI*Math.min(r/.55,1)**.9)),c=1-r,u=360}else{let e=t-57-127-20;n=0,c=0,u=360,s=1+.075*Math.exp(-e/3.5)}}return{b:n,S:s,anch:c,spin:u}}let _=null,v=null,y=``,b=0,S=!1,C=!1,w=null;function T(){return S||C||(C=!0,w=(async()=>{try{let e=await new FontFace(`AntonFX`,`url(${x})`,{weight:`400`}).load();document.fonts.add(e),S=!0,y=``}catch(e){}})()),w}let E=1024,D=1024;function O(e){return`400 ${e}px ${S?`AntonFX`:`sans-serif`}, sans-serif`}function k(e,t){let n=`${e}¦${t}¦${S}`;if(y===n&&_)return!1;y=n,_||(_=new OffscreenCanvas(E,D),v=_.getContext(`2d`,{willReadFrequently:!1}));let r=v;r.clearRect(0,0,E,D);let i=new OffscreenCanvas(8,8).getContext(`2d`);i.font=O(100),r.font=O(50296.470588235294/Math.max(1,i.measureText(`H`).actualBoundingBoxAscent||73)),r.fillStyle=`#fff`,r.textBaseline=`alphabetic`,b=31/E;let a=(e,t,n)=>{let i=[...e];if(!i.length)return;let a=i.map(e=>r.measureText(e).width),o=i.map(e=>{let t=r.measureText(e);return[t.actualBoundingBoxLeft||0,t.actualBoundingBoxRight||t.width]}),s=a.reduce((e,t)=>e+t,0),c=o[o.length-1][0]+o[o.length-1][1],l=a[a.length-1],u=952.964705882353,d=s-l+c,f=Math.min(1,u/d),p=f<1||i.length===1?1:(u-c)/Math.max(1,s-l);r.save(),n&&(r.translate(E/2,t+256),r.rotate(Math.PI),r.translate(-512,-(t+256))),f<1&&(r.translate(E/2,0),r.scale(f,1),r.translate(-512,0));let m=9.035294117647059,h=[[0,0]];for(let e=0;e<8;e++)h.push([Math.cos(e*Math.PI/4)*m,Math.sin(e*Math.PI/4)*m]);for(let e=0;e<4;e++)h.push([Math.cos(e*Math.PI/2+.6)*m*.55,Math.sin(e*Math.PI/2+.6)*m*.55]);let g=f<1?(E-d)/2+o[0][0]:31+o[0][0]+m/2,_=t+512-m/2;for(let e=0;e<i.length;e++){for(let[t,n]of h)r.fillText(i[e],g+t,_+n);g+=a[e]*p}r.restore()};return a(e,0,!1),a(t,512,!0),!0}let A=null,j=null,M=null,N=null,P=null,F={},I=`#version 300 es
  precision highp float;
  out vec4 O;
  uniform vec2 uRes;
  uniform vec2 uC;
  uniform float uK;
  uniform float uS[6];
  uniform float uSpin[6];
  uniform float uBB[6];
  uniform float uM[6];
  uniform float uRhoC[6];
  uniform float uBA[6];
  uniform float uVis[6];
  uniform vec3 uInk;
  uniform float uGrain;
  uniform float uFrame;
  uniform float uSeed;
  uniform sampler2D uTex;
  uniform float uInsetX;

  const float WORDW = 265.0;
  const float ROWH  = 170.0;
  const float PI = 3.14159265;
  const float TEX_Y_GUARD = 4.0 / 1024.0;

  float hash12(vec2 p){
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float hemi(vec2 p, float side, float B, float M, float RC, float BA){
    float ccy = side * (B - RC);
    vec2 d = vec2(p.x, p.y - ccy);
    float rho = length(d);
    float ang = atan(d.x, -side * d.y);
    float x = ang * WORDW / (PI * max(BA, 1e-6));
    if (abs(x) > WORDW * 0.5) return 0.0;
    float y = log(max(rho, 1e-6) / B) / M;
    if (y < -0.5 || y > ROWH + 0.5) return 0.0;
    float tx = uInsetX + (x / WORDW + 0.5) * (1.0 - 2.0 * uInsetX);
    float yn = clamp(y / ROWH, 0.0, 1.0);
    float ty = side > 0.0
      ? mix(0.5 - TEX_Y_GUARD, TEX_Y_GUARD, yn)
      : mix(0.5 + TEX_Y_GUARD, 1.0 - TEX_Y_GUARD, yn);
    float sideFeather = max(fwidth(x) * 1.5, 0.75);
    float sideMask = smoothstep(0.0, sideFeather, WORDW * 0.5 - abs(x));
    float rowFeather = max(fwidth(y) * 1.5, 0.75);
    float rowMask = smoothstep(0.0, rowFeather, min(y, ROWH - y));
    return texture(uTex, vec2(tx, ty)).a * sideMask * rowMask;
  }

  void main(){
    vec2 pix = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
    vec2 p0 = (pix - uC) / uK;
    float a = 0.0;
    float lvl = 1.0;
    for (int k = 0; k < 6; k++) {
      float Sk = uS[k];
      if (uVis[k] > 0.003) {
        float cs = cos(uSpin[k]), sn = sin(uSpin[k]);
        vec2 pk = (mat2(cs, -sn, sn, cs) * p0) / (Sk * lvl);
        float ak = max(hemi(pk, 1.0, uBB[k], uM[k], uRhoC[k], uBA[k]),
                       hemi(pk, -1.0, uBB[k], uM[k], uRhoC[k], uBA[k]));
        ak *= uVis[k];
        ak *= smoothstep(2.0, 4.5, ROWH * Sk * lvl * uK);
        a = max(a, ak);
      }
      lvl *= ${t.toFixed(2)};
      if (lvl * uK * ROWH < 1.2) break;
    }

    float g1 = hash12(pix * 0.9 + vec2(uSeed * 17.0, floor(uFrame) * 7.0));
    float rough = (g1 - 0.5) * 0.5 * uGrain;
    a = smoothstep(0.42, 0.58, a + rough * (1.0 - abs(a - 0.5) * 1.2));
    float g2 = hash12(pix * 1.7 + vec2(floor(uFrame) * 3.1, uSeed * 5.0));
    vec3 ink = uInk * (1.0 - (g2 - 0.5) * 0.10 * uGrain);

    O = vec4(ink * a, a);
  }`;function L(e,t){if(!A){if(A=new OffscreenCanvas(e,t),j=A.getContext(`webgl2`,{premultipliedAlpha:!0,alpha:!0,antialias:!1}),!j)return!1;let n=j,r=(e,t)=>{let r=n.createShader(e);if(n.shaderSource(r,t),n.compileShader(r),!n.getShaderParameter(r,n.COMPILE_STATUS))throw Error(n.getShaderInfoLog(r)||`sh`);return r};if(M=n.createProgram(),n.attachShader(M,r(n.VERTEX_SHADER,`#version 300 es
  layout(location=0) in vec2 aP;
  void main(){ gl_Position = vec4(aP,0.,1.); }`)),n.attachShader(M,r(n.FRAGMENT_SHADER,I)),n.linkProgram(M),!n.getProgramParameter(M,n.LINK_STATUS))throw Error(n.getProgramInfoLog(M)||`ln`);N=n.createVertexArray(),n.bindVertexArray(N);let i=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,i),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0);for(let e of[`uRes`,`uC`,`uK`,`uBA`,`uSpin`,`uBB`,`uM`,`uRhoC`,`uS`,`uVis`,`uInk`,`uGrain`,`uFrame`,`uSeed`,`uTex`,`uInsetX`])F[e]=n.getUniformLocation(M,e);P=n.createTexture(),n.bindTexture(n.TEXTURE_2D,P),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR)}return(A.width!==e||A.height!==t)&&(A.width=e,A.height=t),!0}let R=null,z=``;function ee(e,t,n,r){let i=`${e}x${t}¦${n}¦${r.toFixed(2)}`;if(z===i&&R)return;z=i,R||(R=new OffscreenCanvas(e,t)),(R.width!==e||R.height!==t)&&(R.width=e,R.height=t);let a=R.getContext(`2d`);if(a.clearRect(0,0,e,t),r<=0)return;let o=Math.round(420*r*(e*t)/518400);for(let i=0;i<o;i++){let o=p(n*31+i*7.1),s=p(n*31+i*7.1+2.3),c=p(n*31+i*7.1+4.7),l=p(n*31+i*7.1+6.1);if(a.globalAlpha=.1+l*.25*r,a.fillStyle=`#fff`,c<.72){let n=.5+c*1.6;a.fillRect(o*e,s*t,n,n)}else{a.strokeStyle=`#fff`,a.lineWidth=.8;let n=o*e,r=s*t,i=4+l*14,u=c*6.283;a.beginPath(),a.moveTo(n,r),a.lineTo(n+Math.cos(u)*i,r+Math.sin(u)*i),a.stroke()}}a.globalAlpha=1}let B=null,V=null;return{duration(e){return 9/u(+e.uSpeed||1,.25,3)},async prepareFonts(){await T()},process(r,i){var a,o;let{width:s,height:c,time:l,params:p}=i;B||(B=new OffscreenCanvas(s,c),V=B.getContext(`2d`)),(B.width!==s||B.height!==c)&&(B.width=s,B.height=c);let m=V;T();let h=u(+p.uSpeed||1,.25,3),v=l*24*h,y=(v%216+216)%216,x=[];for(let e=0;e<6;e++)x.push(g(((y-2.2*e)%216+216)%216));let S=String((a=p.uWord1)==null?`HOPE`:a).trim().toUpperCase()||`HOPE`,C=k(S,String((o=p.uWord2)==null?`NOPE`:o).trim().toUpperCase()||S),w=Math.min(s,c)/720,E=u(+p.uScale||1,.4,1.8),D=s/2,O=c/2,I=new Float32Array(6),z=new Float32Array(6),H=new Float32Array(6),U=new Float32Array(6),W=new Float32Array(6),G=new Float32Array(6),K=new Float32Array(6),te=u(+p.uKick,0,2)/.5,ne=(e,t,n)=>{let r=u((n-e)/(t-e),0,1);return r*r*(3-2*r)},q=1,J=1e9;for(let r=0;r<6;r++){let i=x[r],a=Math.max(i.b,.0015),o=n*a,s=(1-(1-e*n)*d(i.b))/o,c=1+(Math.PI*e/265-1)*d(i.b),l=i.S*E,u=e*i.b**1.05+31.75*(1-i.anch);I[r]=l,z[r]=i.spin*Math.PI/180*te,H[r]=s,U[r]=o,W[r]=u,G[r]=265*c/(Math.PI*s);let f=(s*(Math.exp(170*o)-1)+u)*l*q;K[r]=r===0?1:ne(-6,10,J-.92*f),J=u*l*q,q*=t}if(!L(s,c)){let e=p.uPaper||[.988,.02,.012];return m.fillStyle=`rgb(${Math.round(e[0]*255)},${Math.round(e[1]*255)},${Math.round(e[2]*255)})`,m.fillRect(0,0,s,c),B}let Y=j;C&&_&&(Y.bindTexture(Y.TEXTURE_2D,P),Y.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),Y.texImage2D(Y.TEXTURE_2D,0,Y.RGBA,Y.RGBA,Y.UNSIGNED_BYTE,_)),Y.viewport(0,0,s,c),Y.disable(Y.BLEND),Y.clearColor(0,0,0,0),Y.clear(Y.COLOR_BUFFER_BIT),Y.useProgram(M),Y.bindVertexArray(N),Y.activeTexture(Y.TEXTURE0),Y.bindTexture(Y.TEXTURE_2D,P),Y.uniform1i(F.uTex,0),Y.uniform2f(F.uRes,s,c),Y.uniform2f(F.uC,D,O),Y.uniform1f(F.uK,w),Y.uniform1fv(F.uS,I),Y.uniform1fv(F.uSpin,z),Y.uniform1fv(F.uBB,H),Y.uniform1fv(F.uM,U),Y.uniform1fv(F.uRhoC,W),Y.uniform1fv(F.uBA,G),Y.uniform1fv(F.uVis,K);let X=p.uInk||[.992,.757,.749];Y.uniform3f(F.uInk,u(X[0],0,1),u(X[1],0,1),u(X[2],0,1)),Y.uniform1f(F.uGrain,u(+p.uGrain,0,1)),Y.uniform1f(F.uFrame,Math.floor(v)),Y.uniform1f(F.uSeed,(p.uSeed|0)+1),Y.uniform1f(F.uInsetX,b),Y.drawArrays(Y.TRIANGLES,0,3);let Z=p.uBg|0,Q=u(+p.uGrain,0,1);m.clearRect(0,0,s,c);let $=!1;if(Z===1){let e=p.uBgColor||[.05,.05,.07];m.fillStyle=`rgb(${Math.round(e[0]*255)},${Math.round(e[1]*255)},${Math.round(e[2]*255)})`,m.fillRect(0,0,s,c),$=!0}else if(Z===2&&r)f(m,r,s,c);else if(Z!==3){let e=p.uPaper||[.988,.02,.012];m.fillStyle=`rgb(${Math.round(e[0]*255)},${Math.round(e[1]*255)},${Math.round(e[2]*255)})`,m.fillRect(0,0,s,c),$=!0}return $&&Q>0&&(ee(s,c,(p.uSeed|0)+1,Q),m.drawImage(R,0,0)),m.drawImage(A,0,0),B},dispose(){try{var e;j==null||(e=j.getExtension(`WEBGL_lose_context`))==null||e.loseContext()}catch(e){}A=j=M=N=P=null,_=v=null,R=B=null,V=null,y=z=``}}}var x;function S(){return(S=e((()=>{x=`/viral-hub/presets/hope-vortex/fonts/anton-400.woff2`})))()}function C(e,t){let n=/^#?([0-9a-f]{6})$/i.exec(e.trim());if(!n)return[t[0],t[1],t[2]];let r=Number.parseInt(n[1],16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function w(e){return{uWord1:e.word1.slice(0,10),uWord2:e.word2.slice(0,10),uSpeed:e.speed,uInk:C(e.ink,[.992,.757,.749]),uPaper:C(e.paper,[.988,.02,.012]),uBg:{paper:0,custom:1,media:2,none:3}[e.background],uBgColor:C(e.bgColor,[.05,.05,.07]),uScale:e.scale,uGrain:e.grain,uKick:e.kick,uSeed:e.seed}}function T(e,t){let n=w(t),r=D[t.aspectRatio],i=e.engine.duration(n),a=p({engine:e.engine,media:e.media,mediaImage:e.mediaImage,params:n,size:r,time:e=>e/E});return{kind:`frames`,width:r.width,height:r.height,fps:E,totalFrames:Math.max(1,Math.ceil(i*E)),...a}}var E,D;function O(){return(O=e((()=>{u(),E=30,D={"1:1":{width:1080,height:1080},"9:16":{width:1080,height:1920},"4:5":{width:1080,height:1350},"16:9":{width:1920,height:1080}}})))()}var k;function A(){return(A=e((()=>{l(),o(),y(),S(),O(),h(),k={id:`hope-vortex`,kind:`code`,name:`Hope Vortex`,description:`Two words curl into a log-polar spiral medallion and whip around with elastic spin kicks — 1:1 to the HOPE/NOPE riso reference.`,thumbnailUrl:`https://static.higgsfield.ai/public/viral-hub/presets/hope-vortex/thumbnail.webp`,defaultSettings:m,Settings:g,inputs:[{id:`word1`,kind:`text`,label:`Upper arc`,placeholder:`Upper arc`,placeholderOverride:!0,defaultValue:``,maxLength:10,affects:`render`,mobilePosition:`first`,required:!0},{id:`word2`,kind:`text`,label:`Lower arc`,placeholder:`Lower arc`,placeholderOverride:!0,defaultValue:``,maxLength:10,affects:`render`,mobilePosition:`first`},{id:`media`,kind:`media`,label:`Background media (optional)`,accept:`media`,min:0,max:1,affects:`apply`},{id:`aspectRatio`,kind:`select`,label:`Aspect ratio`,defaultValue:`1:1`,options:[{id:`1:1`,name:`1:1`},{id:`9:16`,name:`9:16`},{id:`4:5`,name:`4:5`},{id:`16:9`,name:`16:9`}],affects:`render`}],async apply({inputs:e,signal:t}){let n=b();await n.prepareFonts();let r=Array.isArray(e.media)?e.media[0]:void 0,i=await d(r,t,()=>n.dispose());return{artifact:{engine:n,...i.artifact},initialSettings:{...m,word1:typeof e.word1==`string`&&e.word1.trim()?e.word1:m.word1,word2:typeof e.word2==`string`?e.word2:m.word2,background:r?`media`:m.background},applySettings:a(r),Settings:g,dispose(){i.dispose(),n.dispose()},render({artifact:e,inputs:t,settings:n}){return T(e,{...n,word1:typeof t.word1==`string`&&t.word1.trim()?t.word1:n.word1,word2:typeof t.word2==`string`?t.word2:n.word2,aspectRatio:t.aspectRatio||n.aspectRatio})}}}}})))()}export{A as n,k as t};
//# debugId=b92bf13c-3085-5c1d-82cb-257f6e6854ed

//# chunkId=b92bf13c-3085-5c1d-82cb-257f6e6854ed