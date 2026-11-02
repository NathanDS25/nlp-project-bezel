!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="def065e1-efad-57dc-a028-83c913f83584")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";function n({background:e,overlay:t=!1,blur:n=!1}){return(0,r.jsx)(`style`,{type:`text/css`,children:`
        #header-visual {
          background-color: transparent !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }
        @media (min-width: 768px) {
          #header {
            position: ${t?`fixed`:`sticky`} !important;
            top: 0 !important;${t?`left: 0 !important; right: 0 !important;`:``}
          }${t?`#header-promotion { display: none !important; }`:``}
          html[data-header-animate] #header-visual {
            transition:
              height 300ms ease-in-out,
              background-color 200ms ease,
              backdrop-filter 200ms ease,
              -webkit-backdrop-filter 200ms ease;
          }
          html[data-header-scrolled] #header-visual {
            background-color: ${e} !important;${n?`
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;`:``}
          }
        }
      `})}var r;function i(){return(i=e((()=>{r=t()})))()}export{i as n,n as t};
//# debugId=def065e1-efad-57dc-a028-83c913f83584

//# chunkId=def065e1-efad-57dc-a028-83c913f83584