!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="62f9479c-e8c9-59b2-8ed1-68ed259c7408")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{ap as n,op as r}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";function i({children:e}){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`style`,{type:`text/css`,children:o}),e]})}var a,o;function s(){return(s=e((()=>{a=t(),o=`
  #header { display: none !important; }

  /* CEP ships CEF 99. Tailwind's individual translate property is newer, so
     critical centering uses the legacy transform property in this route. */
  @media (min-width: 768px) {
    html[data-supercomputer-plugin] [cmdk-dialog] {
      transform: translateX(-50%) !important;
    }
  }
  html[data-supercomputer-plugin] .sc-plugin-center-x {
    transform: translateX(-50%) !important;
  }
  html[data-supercomputer-plugin] .sc-plugin-center-y {
    transform: translateY(-50%) !important;
  }
  html[data-supercomputer-plugin] .sc-plugin-center-xy {
    transform: translate(-50%, -50%) !important;
  }

  /* Backdrop filters are unreliable and expensive in CEP. Plugin surfaces
     that used glass styling get an opaque fill instead. */
  html[data-supercomputer-plugin] [class*="backdrop-blur"] {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
  html[data-supercomputer-plugin] .sc-plugin-solid-surface {
    background-color: var(--color-sc-composer-shell-bg) !important;
    background-image: none !important;
  }
  html[data-supercomputer-plugin] [cmdk-overlay] {
    display: block !important;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  html[data-supercomputer-plugin] [cmdk-dialog] > [cmdk-root] > div {
    background-color: #212123 !important;
    background-image: none !important;
    height: calc(100vh - 24px) !important;
    max-height: calc(100vh - 24px) !important;
  }
  html[data-supercomputer-plugin] .sc-plugin-model-surface {
    background-color: #23262a !important;
    background-image: none !important;
  }
  html[data-supercomputer-plugin] body[data-theme="supercomputer-light"] [cmdk-dialog] > [cmdk-root] > div {
    background-color: #fff !important;
  }
  html[data-supercomputer-plugin] body[data-theme="supercomputer-light"] .sc-plugin-model-surface {
    background-color: #fff !important;
  }
  @media (min-width: 768px) {
    html[data-supercomputer-plugin] [cmdk-dialog] > [cmdk-root] > div {
      height: calc(90vh - 12px) !important;
      max-height: calc(90vh - 12px) !important;
    }
  }
`})))()}function c(){return(0,l.jsx)(i,{children:(0,l.jsx)(n,{})})}var l;function u(){return(u=e((()=>{s(),r(),l=t()})))()}export{u as n,c as t};
//# debugId=62f9479c-e8c9-59b2-8ed1-68ed259c7408

//# chunkId=62f9479c-e8c9-59b2-8ed1-68ed259c7408