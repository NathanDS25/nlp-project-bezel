!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="b72c48d2-766e-5ecd-adee-aaa5c70d2357")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{g as t,h as n}from"./1a2c0e3d-Pf8INxYMCRI-tPPR.js";import{i as r,n as i,s as a}from"./1a2c0e3d-c4wa3JdPY5MK4a2G.js";import{i as o,r as s}from"./1a2c0e3d-vGOIeQ3YhD05xjTl.js";import{r as c,t as l}from"./1a2c0e3d-jkE8L3Q_XomcLDQg.js";function u(e){return e<0?0:e>1?1:e}function d(e,t,n){let r=1-e;return 3*r*r*e*t+3*r*e*e*n+e*e*e}function f(e,t,n,r,i){if(i<=0)return 0;if(i>=1)return 1;let a=i;for(let o=0;o<8;o++){let o=d(a,e,n)-i;if(Math.abs(o)<1e-5)return d(a,t,r);let s=1-a,c=3*s*s*e+6*s*a*(n-e)+3*a*a*(1-n);if(Math.abs(c)<1e-6)break;a=Math.min(1,Math.max(0,a-o/c))}let o=0,s=1;for(let t=0;t<24;t++)a=(o+s)/2,d(a,e,n)<i?o=a:s=a;return d(a,t,r)}function p(e){let t=u(e),n=7.5625,r=2.75;if(t<1/r)return n*t*t;if(t<2/r){let e=t-1.5/r;return n*e*e+.75}if(t<2.5/r){let e=t-2.25/r;return n*e*e+.9375}let i=t-2.625/r;return n*i*i+.984375}function m(e,t,n=1){switch(e.kind){case`linear`:return t;case`hold`:return 0;case`steps`:return e.count>0?Math.min(1,Math.floor(t*e.count)/e.count):t;case`cubic-bezier`:return f(e.x1,e.y1,e.x2,e.y2,t);case`bounce`:return p(t);case`back`:return l(t,e.overshoot);case`spring`:return c(t,n,e.stiffness,e.damping,e.mass);case`custom`:return t}}function h(e,t){let n=e.length;if(n===0)return 0;let r=e[0];if(n===1||t<=r.time)return Math.max(0,r.value);let i=e[n-1];if(t>=i.time)return Math.max(0,i.value);let a=0;for(;a+1<n&&e[a+1].time<=t;)a++;let o=e[a],s=e[a+1],c=s.time-o.time,l=c>1e-9?(t-o.time)/c:1,u=m(o.easing,l,c),d=Math.max(0,o.value),f=Math.max(0,s.value);return Math.max(0,d+(f-d)*u)}function g(e,t){return e.keyframes.length>0?h(e.keyframes,t):Math.max(0,e.volume)}function _(e,t,n,r){for(let i=0;i<r.length;i++)r[i]=g(e,t+i*n);return r}function v(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function y(e){return typeof e==`object`&&e&&!Array.isArray(e)?e:null}function b(e){let t=y(e);if(t){let e=t.kind;switch(e){case`hold`:case`bounce`:case`linear`:return{kind:e};case`steps`:return{kind:e,count:v(t.count,0)};case`cubic-bezier`:return{kind:e,x1:v(t.x1,0),y1:v(t.y1,0),x2:v(t.x2,1),y2:v(t.y2,1)}}}return{kind:`linear`}}function x(e){let t=[],n=e.keyframes;if(Array.isArray(n)){for(let e of n){let n=y(e);if(!n)continue;let r=n.time;if(typeof r!=`number`||!Number.isFinite(r))continue;let i=typeof n.value==`number`?n.value:Number(n.value);t.push({time:r,value:Number.isFinite(i)?Math.max(0,i):0,easing:b(n.easing)})}t.sort((e,t)=>e.time-t.time)}return{volume:Math.max(0,v(e.volume,1)),keyframes:t,origin:v(e.origin,0)}}function S(e){return e.muted===!0||e.anySolo===!0&&e.solo!==!0?0:Math.max(0,v(e.volume,1))}function C(e){return t=>{e.audio=t.audio}}function w(e,t){return e.retain(t),t}function T(e,t){return e.map(e=>{let n=new Float32Array(e.length);for(let r=0;r<e.length;r++)n[r]=e[r]*t;return n})}function E(){let e={audio:null},t=new WeakMap,n=e=>{let n=t.get(e);return n||(n=x(e),t.set(e,n)),n};return{init:C(e),process(t,r,i){let a=e.audio;if(!a||!t)return null;let o=n(r);if(o.keyframes.length===0){if(o.volume<=0)return null;if(o.volume===1)return w(a,t);let e=a.toPlanar(t),n=a.info(t);return!e||!n?null:a.fromPlanar(T(e,o.volume),n.sampleRate,i)}let s=a.toPlanar(t),c=a.info(t);if(!s||!c||c.frames<=0||c.sampleRate<=0)return null;let l=i-o.origin,u=1/c.sampleRate,d=s.map(e=>new Float32Array(e.length)),f=g(o,l);for(let e=0;e<c.frames;e+=128){let t=Math.min(128,c.frames-e),n=g(o,l+(e+t)*u),r=(n-f)/t;for(let n=0;n<s.length;n++){let i=s[n],a=d[n];for(let n=0;n<t&&e+n<i.length;n++)a[e+n]=i[e+n]*(f+r*n)}f=n}return a.fromPlanar(d,c.sampleRate,i)},dispose(){e.audio=null}}}function D(){let e={audio:null};return{init:C(e),process(t,n,r){let i=e.audio;if(!i||!t)return null;let a=S(n);if(a<=0)return null;if(a===1)return w(i,t);let o=i.toPlanar(t),s=i.info(t);return!o||!s?null:i.fromPlanar(T(o,a),s.sampleRate,r)},dispose(){e.audio=null}}}function O(e){let t={audio:null};return{init:C(t),process(n,r,i){let a=t.audio;if(!a)return null;let o=typeof r.bus==`string`&&r.bus!==``?r.bus:P;if(!n)return e.record(o,0,i),null;let s=a.toPlanar(n),c=0;if(s)for(let e=0;e<s.length;e++){let t=s[e];for(let e=0;e<t.length;e++){let n=t[e]<0?-t[e]:t[e];n>c&&(c=n)}}let l=a.info(n),u=l&&l.sampleRate>0?l.frames/l.sampleRate:void 0;return e.record(o,c,i,u),w(a,n)},dispose(){t.audio=null}}}function k(e,t){var n,r;let i=e.snapshot();return i?(n=(r=i.scenes.find(e=>e.id===(t==null?i.activeSceneId:t)))==null?i.scenes[0]:r)==null?null:n:null}function A(e,t){let n=!1,r=null,o=null,c=null,l=null,u=null,d=null,f=null,p=null,m=!1,h=0,g=null,_=null,v=!1,y=!1,b=!1,x=0,S=0,C=new Map,w=[];function T(e){var t;let r=e.data;if(n||r.type!==`pos`||r.epoch!==h)return;let i=(t=r.played)==null?0:t;b=i>x,i>0&&(y=!0),x=i,S=performance.now()/1e3,j()}async function E(){return n||!l?null:(u||(u=new AudioContext({latencyHint:`interactive`,sampleRate:l.sampleRate}),u.onstatechange=()=>{!n&&(u==null?void 0:u.state)===`running`&&r!=null&&r.playing.get()&&(D(r.currentTime.get()),j())}),u.state===`suspended`&&u.resume(),f!=null||(f=(async()=>{try{p=URL.createObjectURL(new Blob([V],{type:`text/javascript`})),await u.audioWorklet.addModule(p);let e=new AudioWorkletNode(u,B,{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[Math.max(1,l.channels)]});return e.port.onmessage=T,e.connect(u.destination),e.port.postMessage({type:`reset`,epoch:h}),d=e,e}catch(t){return m||(m=!0,e.log.warn(`audio playout worklet unavailable — playback is silent: ${t instanceof Error?t.message:String(t)}`)),p&&(p=(URL.revokeObjectURL(p),null)),f=null,null}})()),f)}function D(e){h++,y=!1,b=!1,x=0,_=null,t==null||t.clear(),l&&(g!=null||(g=new z(l.sampleRate)),g.reset(e)),d==null||d.port.postMessage({type:`reset`,epoch:h})}function O(e){if(!l)return;let t=new Set([P]);for(let n of e.tracks)t.add(n.id);for(let[e,n]of C)t.has(e)||(n.dispose(),C.delete(e));for(let e of t)C.has(e)||C.set(e,l.insertNode(e===`master`?`master`:e,`fable.audio-basic.meter`,{bus:e}))}async function A(e,t,r){if(!l||!c)return null;let i=h,a=await l.mix(e,t,r);if(i!==h||n)return a&&c.release(a),null;let o=Math.max(1,l.channels),s=[],u=a?c.toPlanar(a):null;for(let e=0;e<o;e++){let t=new Float32Array(r),n=u==null?void 0:u[Math.min(e,u.length-1)];n&&t.set(n.length>r?n.subarray(0,r):n),s.push(t.buffer)}return a&&c.release(a),s}async function j(){if(n||v||!r||!o||!l||!r.playing.get())return;let e=await E();if(!e||!g)return;v=!0;let t=!1;try{let i=l.sampleRate,a=Math.round(W*i),s=Math.round(U*i);for(;!n&&r.playing.get()&&g.scheduledFrames-x<a;){let a=h,c=k(o,r.activeSceneId.get());if(!c)break;if(O(c),_!==null&&_!==c.id){D(r.currentTime.get()),t=!0;break}if(_=c.id,c.duration<=0)break;let l=g.nextBlockTime();l>=c.duration-K&&(g.mark(0),l=0);let u=Math.min(s,Math.max(1,Math.round((c.duration-l)*i))),d=await A(c.id,l,u);if(a!==h||n){t=!n;break}if(!d)break;e.port.postMessage({type:`blocks`,epoch:h,planes:d},d),g.scheduledFrames+=u}}finally{v=!1}t&&!n&&r.playing.get()&&j()}let M={now(){if(n||!y||!g||!u||u.state!==`running`||!(r!=null&&r.playing.get()))return null;let e=g.timeAt(x);b&&(e+=Math.min(Math.max(performance.now()/1e3-S,0),G));let t=u.outputLatency;return Math.max(0,e-(typeof t==`number`&&Number.isFinite(t)?t:0))}};return Promise.all([e.require(s),e.require(i),e.require(a),e.require(H)]).then(([i,a,s,u])=>{n||(r=i,o=a,c=s,l=u,t==null||t.setClock(()=>M.now()),w.push(e.provide(`capability:audio/clock`,M),i.playing.subscribe(e=>{e?(D(i.currentTime.get()),j()):D(i.currentTime.get())}),e.bus.subscribe(`session/seek`,()=>{D(i.currentTime.get()),i.playing.get()&&j()})),i.playing.get()&&(D(i.currentTime.get()),j()))}).catch(t=>{e.log.info(`realtime audio playout unavailable: ${t instanceof Error?t.message:String(t)}`)}),{dispose(){n=!0,h++,t==null||t.setClock(null);for(let e of w)e.dispose();for(let e of C.values())e.dispose();C.clear(),d&&(d=(d.port.onmessage=null,d.disconnect(),null)),p&&(p=(URL.revokeObjectURL(p),null)),u&&(u=(u.onstatechange=null,u.close().catch(()=>void 0),null))}}}function j(e){let t=new L,n=[e.extensions.register(`audio-node`,`${e.plugin.id}.gain`,E()),e.extensions.register(`audio-node`,`${e.plugin.id}.bus`,D()),e.extensions.register(`audio-node`,`${e.plugin.id}.meter`,O(t)),e.provide(N,{trackPeak:e=>t.trackPeak(e),masterPeak:()=>t.masterPeak()}),A(e,t)];return{dispose(){for(let e of n)e.dispose();t.clear()}}}function M(){}var N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{r(),o(),t(),N=`capability:audio/meters`,P=`master`,F=32,I=.001,L=class{constructor(){n(this,`peaks`,new Map),n(this,`rings`,new Map),n(this,`clock`,null)}setClock(e){this.clock=e}record(e,t,n,r){if(this.peaks.set(e,t),n===void 0)return;let i=this.rings.get(e);i||(i=[],this.rings.set(e,i)),i.push({t:n,dur:r==null?.25:r,peak:t}),i.length>F&&i.shift()}read(e){var t,n,r;let i=(t=(n=this.clock)==null?void 0:n.call(this))==null?null:t;if(i===null)return(r=this.peaks.get(e))==null?0:r;let a=this.rings.get(e);if(!a)return 0;for(let e=a.length-1;e>=0;e--){let t=a[e];if(i>=t.t-I&&i<t.t+t.dur+I)return t.peak}return 0}trackPeak(e){return this.read(e)}masterPeak(){return this.read(P)}clear(){this.peaks.clear(),this.rings.clear()}},R=128,z=class{constructor(e){n(this,`sampleRate`,void 0),n(this,`anchors`,[{frame:0,time:0}]),n(this,`scheduledFrames`,0),this.sampleRate=e}reset(e){this.anchors=[{frame:0,time:e}],this.scheduledFrames=0}mark(e){this.anchors.push({frame:this.scheduledFrames,time:e})}nextBlockTime(){let e=this.anchors[this.anchors.length-1];return e.time+(this.scheduledFrames-e.frame)/this.sampleRate}timeAt(e){for(;this.anchors.length>1&&this.anchors[1].frame<=e;)this.anchors.shift();let t=this.anchors[0];return t.time+(e-t.frame)/this.sampleRate}},B=`fable-playout`,V=`
class FablePlayoutProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.queue = [];
    this.queuedFrames = 0;
    this.playedFrames = 0;
    this.epoch = 0;
    this.quantum = 0;
    this.wasPlaying = false;
    this.port.onmessage = (e) => {
      const m = e.data;
      if (m.type === "reset") {
        this.epoch = m.epoch;
        this.queue.length = 0;
        this.queuedFrames = 0;
        this.playedFrames = 0;
      } else if (m.type === "blocks" && m.epoch === this.epoch) {
        const planes = m.planes.map((p) => new Float32Array(p));
        this.queue.push({ planes, read: 0 });
        this.queuedFrames += planes[0].length;
      }
    };
  }
  post() {
    this.port.postMessage({
      type: "pos",
      epoch: this.epoch,
      played: this.playedFrames,
      queued: this.queuedFrames,
    });
  }
  process(inputs, outputs) {
    const out = outputs[0];
    if (!out || out.length === 0) return true;
    const need = out[0].length;
    let written = 0;
    while (written < need && this.queue.length > 0) {
      const head = this.queue[0];
      const len = head.planes[0].length;
      const n = Math.min(need - written, len - head.read);
      for (let c = 0; c < out.length; c++) {
        const src = head.planes[Math.min(c, head.planes.length - 1)];
        out[c].set(src.subarray(head.read, head.read + n), written);
      }
      head.read += n;
      written += n;
      if (head.read >= len) this.queue.shift();
    }
    this.playedFrames += written;
    this.queuedFrames -= written;
    const playing = written > 0;
    // ~1/8 of the quantum rate while audio flows, plus one beacon on drain so
    // the producer sees the underrun (or the end of scheduled audio).
    if ((playing && (this.quantum++ & 7) === 0) || (!playing && this.wasPlaying)) this.post();
    this.wasPlaying = playing;
    return true;
  }
}
registerProcessor("${B}", FablePlayoutProcessor);
`,H=`capability:engine.mixer`,U=.2,W=.6,G=.05,K=1e-6})))()}export{x as _,M as a,S as b,m as c,O as d,E as f,p as g,u as h,R as i,h as l,g as m,H as n,A as o,_ as p,j as r,N as s,D as t,q as u,L as v,P as y};
//# debugId=b72c48d2-766e-5ecd-adee-aaa5c70d2357

//# chunkId=b72c48d2-766e-5ecd-adee-aaa5c70d2357