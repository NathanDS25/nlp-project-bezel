!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="224c2664-a2d6-573f-99a9-d362877e16c3")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{n,t as r}from"./1a2c0e3d-JAZSpnRZkNiOuBGb.js";function i({children:e}){return(0,a.jsxs)(`div`,{className:`size-full min-h-0 min-w-0 overflow-hidden`,children:[(0,a.jsx)(`div`,{"data-theme":`default-dark`,className:`flex size-full min-h-0 min-w-0 flex-col overflow-hidden`,children:(0,a.jsx)(`main`,{className:`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden`,children:e})}),(0,a.jsx)(r,{background:`rgba(19, 20, 22, 0.8)`,blur:!0}),(0,a.jsx)(`style`,{children:`
          /* Bound the whole app shell to the viewport so the ONLY scroller is the
             page's own children root — mirrors /generate's GeneratePageGlobalStyle.
             #main is a grid item (default min-height:auto = min-content); without
             min-height:0 its 1fr track grows to fit tall content and the body
             scrolls as one. */
          html, body {
            height: 100%;
            overflow: hidden;
          }
          /* globals.css sets min-height: 100vh on body; on iOS Safari 100vh is
             the large viewport (bottom bar collapsed), so the body grid's last
             row (the mobile bottom nav) lands under the toolbar. With the shell
             locked, height: 100% must win.

             WORKAROUND(bakdaulet.zh, 2026-08-02): !important, because the
             production CSS pipeline downlevels the bundle past @layer support
             (docs/legacy-css.md) and flattens the layered body rule into a
             body:not(#id)-x8 selector — specificity (8,0,1). The plain
             unlayered min-height: 0 this block relied on (0,0,1) silently lost
             the cascade, and the bottom nav went back under Safari's toolbar.
             Cannot fix at source because raising the CSS floor so layers
             survive changes delivery for every legacy browser — not a hotfix.
             Remove when the shipped CSS keeps native @layer. */
          body {
            min-height: 0 !important;
          }
          #main {
            min-height: 0;
            min-width: 0;
          }
          body {
            background: var(--qc-background-primary, #131416) !important;
          }
          #header-visual {
            box-shadow: none !important;
            background-color: transparent !important;
          }
          /* Full-bleed: header content spans the page (drop the container cap). */
          #header-visual .container {
            max-width: none !important;
          }
          html[data-header-compact] #header {
            padding-bottom: 0 !important;
          }
          #footer {
            display: none;
          }
        `})]})}var a;function o(){return(o=e((()=>{n(),a=t()})))()}export{o as n,i as t};
//# debugId=224c2664-a2d6-573f-99a9-d362877e16c3

//# chunkId=224c2664-a2d6-573f-99a9-d362877e16c3