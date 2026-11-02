!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="fa8d9ba9-a197-5b1b-a859-e8bf965eddc7")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{f as t}from"./1a2c0e3d--3fz7e5oL5WguLUy.js";function n(e){let t=e*100/1e3;return`
class VoiceInputPcm extends AudioWorkletProcessor {
  constructor() {
    super()
    this.ratio = sampleRate / ${e}
    this.frame = new Int16Array(${t})
    this.filled = 0
    this.sum = 0
    this.count = 0
    this.progress = 0
    this.port.onmessage = () => {
      if (this.filled > 0)
        this.post(this.frame.slice(0, this.filled))
      this.filled = 0
      this.port.postMessage('flushed')
    }
  }
  post(frame) {
    this.port.postMessage(frame.buffer, [frame.buffer])
  }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0]
    if (!channel)
      return true
    for (let i = 0; i < channel.length; i++) {
      this.sum += channel[i]
      this.count += 1
      this.progress += 1
      if (this.progress < this.ratio)
        continue
      this.progress -= this.ratio
      const sample = Math.max(-1, Math.min(1, this.sum / this.count))
      this.sum = 0
      this.count = 0
      this.frame[this.filled++] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF
      if (this.filled === this.frame.length) {
        this.post(this.frame)
        this.frame = new Int16Array(${t})
        this.filled = 0
      }
    }
    return true
  }
}
registerProcessor('${c}', VoiceInputPcm)
`}async function r(e,t){let r=URL.createObjectURL(new Blob([n(t)],{type:`text/javascript`}));try{await e.audioWorklet.addModule(r)}finally{URL.revokeObjectURL(r)}}async function i(e,t){let n=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1}}),i=new AudioContext,l=!1,u=()=>{l||(l=!0,n.getTracks().forEach(e=>e.stop()),i.close().catch(()=>{}))},d,f;try{await r(i,t);let e=i.createMediaStreamSource(n);d=i.createAnalyser(),d.fftSize=1024,e.connect(d),f=new AudioWorkletNode(i,c,{numberOfInputs:1,numberOfOutputs:1,channelCount:1,channelCountMode:`explicit`}),e.connect(f);let a=i.createGain();a.gain.value=0,f.connect(a).connect(i.destination)}catch(e){throw u(),e}let p=null;f.port.onmessage=t=>{t.data===`flushed`?p==null||p():l||e(t.data)},i.resume().catch(()=>{});let m=new Float32Array(d.fftSize);return{getLevel:()=>{if(l)return 0;d.getFloatTimeDomainData(m);let e=0;for(let t=0;t<m.length;t++)e+=m[t]*m[t];let t=Math.sqrt(e/m.length);if(t===0)return 0;let n=20*Math.log10(t);return Math.min(1,Math.max(0,(n-a)/o))},stop:async()=>{l||(await new Promise(e=>{let t=setTimeout(e,s);p=()=>{clearTimeout(t),e()},f.port.postMessage(`flush`)}),f.port.onmessage=null,u())},onEnded:e=>{var t;(t=n.getAudioTracks()[0])==null||t.addEventListener(`ended`,e,{once:!0})}}}var a,o,s,c;function l(){return(l=e((()=>{t(),a=-55,o=45,s=300,c=`voice-input-pcm`})))()}export{i as n,l as t};
//# debugId=fa8d9ba9-a197-5b1b-a859-e8bf965eddc7

//# chunkId=fa8d9ba9-a197-5b1b-a859-e8bf965eddc7