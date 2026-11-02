!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="fb643453-40f2-5fbe-af2a-ec4c0ac74cac")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{If as r,Lf as i,Rf as a}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{i as o,n as s,r as c,t as l}from"./1a2c0e3d-4CWCf1MOF7KC_aeR.js";import{t as u}from"./1a2c0e3d-QjgW0dKlUqFVYLiR.js";import{n as d,t as f}from"./1a2c0e3d-h7350LilQFEHtP9T.js";function p(){return window.Babel?Promise.resolve(window.Babel):(v!=null||(v=new Promise((e,t)=>{let n=document.createElement(`script`);n.src=g,n.integrity=_,n.crossOrigin=`anonymous`,n.async=!0,n.onload=()=>{window.Babel?e(window.Babel):t(Error(`Babel standalone loaded but window.Babel is missing`))},n.onerror=()=>{v=null,t(Error(`Failed to load Babel standalone`))},document.head.appendChild(n)})),v)}function m(e,t){let{code:n}=e.transform(t,y);if(!n)throw Error(`Babel produced no output`);return n}function h(e){let t=new URL(`/jsx-artifact-runtime.js`,window.location.origin).toString();return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
${c({scriptSources:[t]})}
<style>${b}</style>
<script>
  // Surface every failure visibly: a sandboxed srcdoc iframe has no console
  // the user will look at, so an uncaught error otherwise renders as a
  // silent black panel.
  window.__jsxShowError = (message) => {
    const show = () => {
      const el = document.getElementById('root') || document.body
      if (!el) return
      el.style.cssText = 'padding:16px;font:12px/1.5 monospace;color:#f87171;white-space:pre-wrap'
      el.textContent = String(message)
    }
    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', show)
    else
      show()
  }
  window.onerror = (message, source, line) => {
    window.__jsxShowError(message + (source ? '\\n  at ' + source + ':' + line : ''))
  }
  window.onunhandledrejection = (event) => {
    const reason = event && event.reason
    window.__jsxShowError(String(reason && reason.stack || reason))
  }
<\/script>
<script src="${s}" onerror="window.__jsxShowError('Failed to load Tailwind from CDN: ' + this.src)"><\/script>
<script src="${t}" onerror="window.__jsxShowError('Failed to load JSX artifact runtime: ' + this.src)"><\/script>
</head>
<body>
<div id="root"></div>
<script type="module">
  if (!window.JsxArtifactRuntime)
    throw new Error('JSX artifact runtime is unavailable (jsx-artifact-runtime.js did not load or execute)')
  const { React, createRoot, modules } = window.JsxArtifactRuntime
  // lucide-react resolves standalone from esm.sh: it is hook-free, so its own
  // bundled React copy is safe to mix with the runtime's React tree.
  const loadModule = (id) => {
    if (id === 'lucide-react')
      return import('${l}')
    if (!(id in modules))
      return Promise.reject(new Error('Import not allowed in JSX artifacts: "' + id + '". Allowed: react, recharts, lucide-react, framer-motion'))
    return Promise.resolve(modules[id])
  }
  const compiledCode = ${JSON.stringify(e).replaceAll(`<`,`\\u003c`)}
  const rootEl = document.getElementById('root')
  try {
    // Preload only the modules the artifact actually requires.
    const used = [...new Set([...compiledCode.matchAll(/require\\((?:"|')([^"')]+)(?:"|')\\)/g)].map(m => m[1]))]
    const loaded = {}
    for (const id of used)
      loaded[id] = await loadModule(id)
    const require = (id) => {
      if (!(id in loaded))
        throw new Error('Module not preloaded: "' + id + '"')
      return loaded[id]
    }
    const module = { exports: {} }
    new Function('React', 'module', 'exports', 'require', compiledCode)(React, module, module.exports, require)
    const Component = module.exports.default
    if (typeof Component !== 'function')
      throw new TypeError('JSX artifact must \`export default\` a React component')
    createRoot(rootEl).render(React.createElement(Component))
  }
  catch (err) {
    window.__jsxShowError(String(err && err.stack || err))
  }
<\/script>
</body>
</html>`}var g,_,v,y,b;function x(){return(x=e((()=>{o(),g=`https://unpkg.com/@babel/standalone@7.26.4/babel.min.js`,_=`sha384-x/ilTFv/u/eu6YSmkFDZl5V5Mm/pkxxcVv2cVJOrr1J0rvILhMvRBCy6yA75wYBj`,v=null,y={filename:`artifact.jsx`,presets:[`react`],plugins:[`transform-modules-commonjs`]},b=`
  html, body { margin: 0; min-height: 100%; }
  body {
    background: #09090b;
    color: #fafafa;
    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #root { min-height: 100vh; }
`})))()}function S({url:e,label:t}){let n=d(e),{_:i}=a(),[o,s]=(0,w.useState)({status:`loading`}),c=n.status===`ready`&&!n.truncated?n.content:null;return(0,w.useEffect)(()=>{if(c===null)return;let e=!1;return s({status:`loading`}),p().then(t=>{let n=m(t,c);e||s({status:`ready`,srcDoc:h(n)})}).catch(t=>{e||s({status:`error`,message:t instanceof Error?t.message:String(t)})}),()=>{e=!0}},[c]),n.status===`error`?(0,T.jsx)(C,{message:n.message}):n.status===`ready`&&n.truncated?(0,T.jsx)(C,{message:i({id:`w4I7Zn`})}):n.status===`loading`||o.status===`loading`?(0,T.jsx)(`p`,{className:`text-sm text-font-primary/50`,children:(0,T.jsx)(r,{id:`Pwqkdw`})}):o.status===`error`?(0,T.jsx)(C,{message:o.message}):(0,T.jsx)(`iframe`,{srcDoc:u(o.srcDoc,t),title:t,sandbox:`allow-scripts`,allow:``,referrerPolicy:`no-referrer`,className:`size-full rounded-lg border-0 bg-[#09090b]`})}function C({message:e}){return(0,T.jsx)(`div`,{className:`flex size-full items-center justify-center p-4`,children:(0,T.jsx)(`p`,{className:`max-w-md whitespace-pre-wrap font-mono text-xs text-red-400`,children:e})})}var w,T;function E(){return(E=e((()=>{i(),w=n(),x(),f(),T=t()})))()}export{E as n,S as t};
//# debugId=fb643453-40f2-5fbe-af2a-ec4c0ac74cac

//# chunkId=fb643453-40f2-5fbe-af2a-ec4c0ac74cac