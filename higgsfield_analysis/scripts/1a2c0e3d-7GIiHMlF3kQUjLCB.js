!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="9915c0c4-6aaa-5026-b23e-a28766a5266b")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Qc as r,el as i}from"./1a2c0e3d-vpQWWKdBwslpL-5u.js";import{Bd as a,Rx as o}from"./1a2c0e3d-hu4uXBiL-IQJn9o2.js";import{If as s,Lf as c,Rf as l,ap as u,op as d}from"./1a2c0e3d-35HuCA9ZunOlmIga.js";import{n as f,t as p}from"./1a2c0e3d-PP0_UwltnXZrtC0b.js";import{a as m,f as h,i as g,l as _,m as v,n as y,o as b,p as x,r as S,t as C,u as w}from"./1a2c0e3d-vZQb2k_SPI8MO6ob.js";function T(){let e=v();return(0,O.jsx)(E,{},`${e.userId}:${e.workspaceId}`)}function E(){let{_:e}=l(),t=w(),n=h(),[i,a]=(0,D.useState)(!1),[c,u]=(0,D.useState)(!1),[d,f]=(0,D.useState)(null),[p,g]=(0,D.useState)(null),_=(0,D.useRef)(!1),v=n.recoveryInputs[0],y=()=>{_.current||(a(!1),u(!1))},b=async()=>{let e=t.recoveryInput;if(!e||_.current)return;_.current=!0,f(null);let[,n]=await o(t.mutateAsync(e));_.current=!1,n===null?u(!0):f(n)};return!t.recoveryInput&&!v&&!i&&!p?null:(0,O.jsxs)(`section`,{"aria-label":e({id:`33sahr`}),className:`flex flex-wrap gap-2`,children:[t.recoveryInput&&(0,O.jsx)(r,{variant:`secondary`,onClick:()=>a(!0),children:(0,O.jsx)(s,{id:`mCc00M`})}),v&&(0,O.jsx)(r,{variant:`secondary`,onClick:()=>g({id:v.id}),children:(0,O.jsx)(s,{id:`youG81`})}),(0,O.jsx)(m,{isOpen:i,queueKey:`recover-workspace-credit-request`,title:e({id:`r7_7US`}),onClose:y,busy:t.isPending,size:`result`,children:(0,O.jsx)(`div`,{className:`flex flex-col gap-4 px-4 pb-4`,children:c?(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`p`,{role:`status`,className:`text-sm text-font-primary`,children:(0,O.jsx)(s,{id:`SjB2_b`})}),(0,O.jsx)(r,{variant:`secondary`,onClick:y,children:(0,O.jsx)(s,{id:`76gPWk`})})]}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`p`,{className:`text-sm text-font-secondary`,children:(0,O.jsx)(s,{id:`wPIt09`})}),d!==null&&(0,O.jsx)(S,{error:d}),(0,O.jsx)(r,{variant:`secondary`,disabled:t.isPending||!t.recoveryInput,onClick:()=>void b(),children:(0,O.jsx)(s,{id:`X4XTIE`})})]})})}),(0,O.jsx)(C,{target:p,onClose:()=>g(null),recoveryOnly:!0})]})}var D,O;function k(){return(k=e((()=>{_(),x(),i(),c(),D=n(),y(),b(),g(),O=t()})))()}function A(e){var t;let{strategy:n,onLoad:r,onReady:i,onError:a,children:o,dangerouslySetInnerHTML:s,...c}=e;return o?(0,j.jsx)(`script`,{...c,dangerouslySetInnerHTML:{__html:o}}):s?(0,j.jsx)(`script`,{...c,dangerouslySetInnerHTML:s}):(0,j.jsx)(`script`,{...c,async:(t=c.async)==null?n!==`beforeInteractive`:t})}var j;function M(){return(M=e((()=>{j=t()})))()}function N({children:e}){return(0,P.jsxs)(`div`,{className:`container pr-0 pt-0 pb-0 pl-4 md:pl-3 flex flex-col md:flex-row gap-0 md:gap-4 xl:gap-0 relative min-h-full md:h-full py-8`,children:[(0,P.jsx)(`div`,{id:`widget-account-layout-menu`,className:`
          flex shrink-0 flex-col items-start
          min-w-full md:min-w-59 md:max-w-59
          max-h-[calc(100vh-64px)] h-auto md:h-[calc(100vh-4rem)]
          justify-between
          shadow-[0_0.25rem_0.5rem_0_rgba(0,0,0,0.2)] md:shadow-none z-2
          sticky top-0 md:top-16 md:self-start
          pr-0 md:pr-3 pl-8 md:pl-0 pt-2 md:pt-3.5 pb-2 md:pb-3
          -translate-x-8 w-[calc(100%+2rem)]
          md:translate-x-0 md:w-full
          overflow-hidden rounded-none md:rounded-3xl
          bg-surface-tertiary
        `,children:(0,P.jsx)(`div`,{className:`w-full min-h-0 flex-1`,children:(0,P.jsx)(p,{className:`md:min-h-full`})})}),(0,P.jsxs)(`div`,{id:`account-layout-content`,className:`space-y-6 w-full max-w-184 md:h-full mx-auto pt-0 pr-4 md:pt-8 xl:pr-0 pb-10`,children:[(0,P.jsx)(T,{}),e]}),(0,P.jsx)(A,{src:`https://assets.churnkey.co/js/app.js?appId=9ajhwpllf`,strategy:`afterInteractive`})]})}var P;function F(){return(F=e((()=>{k(),M(),f(),P=t()})))()}function I({children:e,modal:t}){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`style`,{type:`text/css`,children:`
          html, body, #header-visual, #header-mobile {
            background: var(--color-surface-tertiary) !important;
            box-shadow: none !important;
          }

          #footer {
            display: none !important;
          }
        `}),t,(0,L.jsx)(N,{children:e})]})}var L;function R(){return(R=e((()=>{F(),a(),L=t()})))()}function z(){return(0,B.jsx)(I,{modal:null,children:(0,B.jsx)(u,{})})}var B;function V(){return(V=e((()=>{R(),d(),B=t()})))()}export{V as n,z as t};
//# debugId=9915c0c4-6aaa-5026-b23e-a28766a5266b

//# chunkId=9915c0c4-6aaa-5026-b23e-a28766a5266b