!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="1428b1a1-799a-50d9-abfe-673d2c507b06")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Gt as t,Kt as n}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";import{Ir as r,Lr as i}from"./1a2c0e3d-hu4uXBiL-IQJn9o2.js";import{rf as a}from"./1a2c0e3d-o7fPGNWZmdWvgxmx.js";import{i as o,n as s,r as c,t as l}from"./1a2c0e3d-g4CI66BgWDEb_DU4.js";var u;function d(){return(d=e((()=>{u=`html:has([data-explore-layout]) {
  scroll-behavior: auto;
}

[data-explore-layout] {
  container-type: inline-size;
  overflow-anchor: none;
  column-count: auto;
  --explore-columns: 2;
  --explore-gap: var(--spacing-q-400, 1rem);
  --explore-row-gap: var(--spacing-q-400, 1rem);
}

[data-explore-layout='2'] {
  --explore-gap: var(--spacing-q-200, 0.5rem);
}

[data-explore-layout='5'],
[data-explore-layout='6'] {
  --explore-gap: var(--spacing-q-200, 0.5rem);
  --explore-row-gap: var(--spacing-q-200, 0.5rem);
}

[data-explore-layout] > [data-explore-grid] {
  --explore-column-width: calc((100cqw - (var(--explore-columns) - 1) * var(--explore-gap)) / var(--explore-columns));
  position: relative;
  column-gap: var(--explore-gap);
  row-gap: var(--explore-row-gap);
  height: var(--explore-height-2);
}

[data-explore-grid] > [data-explore-item] {
  position: absolute;
  width: var(--explore-column-width);
  left: calc(var(--explore-x-2) * (var(--explore-column-width) + var(--explore-gap)));
  top: var(--explore-y-2);
}

@container (max-width: 24rem) {
  [data-explore-layout] > [data-explore-grid] {
    --explore-columns: 1;
    height: var(--explore-height-1);
  }

  [data-explore-layout] > [data-explore-grid] > [data-explore-item] {
    left: 0;
    top: var(--explore-y-1);
  }
}

@container (min-width: 40rem) {
  :is([data-explore-layout='4'], [data-explore-layout='5'], [data-explore-layout='6']) > [data-explore-grid] {
    --explore-columns: 3;
    height: var(--explore-height-3);
  }

  :is([data-explore-layout='4'], [data-explore-layout='5'], [data-explore-layout='6']) > [data-explore-grid] > [data-explore-item] {
    left: calc(var(--explore-x-3) * (var(--explore-column-width) + var(--explore-gap)));
    top: var(--explore-y-3);
  }
}

@container (min-width: 64rem) {
  [data-explore-layout='4'] > [data-explore-grid] {
    --explore-columns: 4;
    height: var(--explore-height-4);
  }

  [data-explore-layout='5'] > [data-explore-grid] {
    --explore-columns: 5;
    height: var(--explore-height-5);
  }

  [data-explore-layout='4'] > [data-explore-grid] > [data-explore-item] {
    left: calc(var(--explore-x-4) * (var(--explore-column-width) + var(--explore-gap)));
    top: var(--explore-y-4);
  }

  [data-explore-layout='5'] > [data-explore-grid] > [data-explore-item] {
    left: calc(var(--explore-x-5) * (var(--explore-column-width) + var(--explore-gap)));
    top: var(--explore-y-5);
  }
}

/* The home's six columns, from the xl container width; below it the 40rem rule keeps three. */
@container (min-width: 72rem) {
  [data-explore-layout='6'] > [data-explore-grid] {
    --explore-columns: 6;
    height: var(--explore-height-6);
  }

  [data-explore-layout='6'] > [data-explore-grid] > [data-explore-item] {
    left: calc(var(--explore-x-6) * (var(--explore-column-width) + var(--explore-gap)));
    top: var(--explore-y-6);
  }
}
`})))()}function f(e,t){var n,i,a,l,u,d,f;let m=(0,p.useRef)(null),[h,g]=(0,p.useState)(null);(0,p.useLayoutEffect)(()=>{let e=m.current;if(!e||typeof ResizeObserver>`u`)return;let t=()=>{let t=e.getBoundingClientRect(),n=r(e),i=n instanceof HTMLElement?n:null,a=getComputedStyle(e),o={width:t.width,columns:Number.parseInt(a.getPropertyValue(`--explore-columns`))||2,gap:Number.parseFloat(a.columnGap)||8,rowGap:Number.parseFloat(a.rowGap)||16,margin:i?t.top-i.getBoundingClientRect().top+i.scrollTop:t.top+window.scrollY,root:i};g(e=>(e==null?void 0:e.width)===o.width&&e.columns===o.columns&&e.gap===o.gap&&e.rowGap===o.rowGap&&e.margin===o.margin&&e.root===o.root?e:o)};t();let n=new ResizeObserver(t);return n.observe(e),e.parentElement&&n.observe(e.parentElement),window.addEventListener(`resize`,t),()=>{n.disconnect(),window.removeEventListener(`resize`,t)}},[e.length]);let _=(n=h==null?void 0:h.columns)==null?2:n,v=Math.max(0,(((i=h==null?void 0:h.width)==null?0:i)-(_-1)*((a=h==null?void 0:h.gap)==null?0:a))/_),y=(0,p.useCallback)(t=>{var n,r;let[i,a]=((n=(r=e[t])==null?void 0:r.aspect)==null?`16/9`:n).split(`/`).map(Number);return v*a/i},[e,v]),b=(0,p.useCallback)(t=>e[t].id,[e]),x=e.findIndex(e=>e.id===t),S=(0,p.useCallback)(e=>{let t=o(e);return x<0||t.includes(x)?t:[...t,x].sort((e,t)=>e-t)},[x]),C=h!==null,w={count:e.length,lanes:_,estimateSize:y,getItemKey:b,rangeExtractor:S,gap:(l=h==null?void 0:h.rowGap)==null?16:l,scrollMargin:(u=h==null?void 0:h.margin)==null?0:u,overscan:2,useFlushSync:!1},T=s({...w,initialOffset:()=>{var e,t;return(e=h==null||(t=h.root)==null?void 0:t.scrollTop)==null?0:e},enabled:C&&v>0&&!!(h!=null&&h.root),getScrollElement:()=>{var e;return(e=h==null?void 0:h.root)==null?null:e}}),E=c({...w,enabled:C&&v>0&&!(h!=null&&h.root)}),D=h!=null&&h.root?T:E;return(0,p.useLayoutEffect)(()=>{C&&D.measure()},[C,v,_,D]),{enabled:C,gridRef:m,items:D.getVirtualItems(),totalHeight:D.getTotalSize(),columnWidth:v,gap:(d=h==null?void 0:h.gap)==null?0:d,scrollMargin:(f=h==null?void 0:h.margin)==null?0:f}}var p;function m(){return(m=e((()=>{i(),l(),p=n()})))()}function h(e){let t=e.map(()=>({})),n={},r=e.map((e,t)=>{var n;let[r,i]=((n=e.aspect)==null?`16/9`:n).split(`/`).map(Number);return{index:t,ratio:i/r}});for(let e of[1,2,3,4,5,6]){let i=a(r,e,e=>e.ratio).map((n,r)=>{let i=0;return n.forEach((n,a)=>{t[n.index][`--explore-x-${e}`]=r,t[n.index][`--explore-y-${e}`]=`calc(var(--explore-column-width) * ${i} + var(--explore-row-gap) * ${a})`,i+=n.ratio}),`calc(var(--explore-column-width) * ${i} + var(--explore-row-gap) * ${n.length})`});n[`--explore-height-${e}`]=`max(${i.join(`,`)})`}return{style:n,itemStyles:t}}function g(){return(g=e((()=>{})))()}function _({cards:e,children:t,className:n,maxColumns:r=4,keepMountedId:i}){let a=f(e,i),{style:o,itemStyles:s}=(0,v.useMemo)(()=>a.enabled?{style:void 0,itemStyles:[]}:h(e),[e,a.enabled]);return(0,y.jsxs)(`div`,{"data-explore-masonry":``,"data-explore-layout":r,className:n,children:[(0,y.jsx)(`style`,{href:`higgsfield-explore-masonry`,precedence:`default`,children:u}),(0,y.jsx)(`div`,{ref:a.gridRef,"data-explore-grid":``,style:a.enabled?{height:a.totalHeight}:o,children:a.enabled?a.items.map(e=>(0,y.jsx)(`div`,{"data-explore-item":``,style:{width:a.columnWidth,left:e.lane*(a.columnWidth+a.gap),top:e.start-a.scrollMargin},children:t[e.index]},e.key)):t.map((t,n)=>{var r;return(0,y.jsx)(`div`,{"data-explore-item":``,style:s[n],children:t},(r=e[n])==null?void 0:r.id)})})]})}var v,y;function b(){return(b=e((()=>{v=n(),m(),g(),d(),y=t()})))()}export{b as n,_ as t};
//# debugId=1428b1a1-799a-50d9-abfe-673d2c507b06

//# chunkId=1428b1a1-799a-50d9-abfe-673d2c507b06