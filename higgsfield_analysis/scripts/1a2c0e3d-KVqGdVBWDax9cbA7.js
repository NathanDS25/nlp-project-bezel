!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._posthogChunkIds=e._posthogChunkIds||{},e._posthogChunkIds[n]="0791ffaa-e156-5bb3-aeee-ef940911a79c")}catch(e){}}();import{n as e}from"./1a2c0e3d-WT7-FZ22RLi5rJnW.js";import{Kt as t}from"./1a2c0e3d-qkEQVTOfhOQDK3h0.js";function n(){return`(function(){
  try{
    var min=${h.minExpanded};
    var max=${h.maxExpanded};
    var fallback=${h.defaultExpanded};
    var collapsed=${h.collapsed};
    var saved=Number.parseFloat(localStorage.getItem(${JSON.stringify(d)})||'');
    var width=Number.isFinite(saved)?Math.min(max,Math.max(min,saved)):fallback;
    var isProject=/[?&](projectId|cinematicProjectId|workflowProjectId)=/.test(window.location.search);
    if(!isProject){
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i);
        if(k&&k.indexOf(${JSON.stringify(`${f}:`)})===0&&localStorage.getItem(k)==='collapsed'){
          width=collapsed;
          break;
        }
      }
    }
    document.documentElement.style.setProperty(${JSON.stringify(u)},width+'px');
    document.documentElement.setAttribute(${JSON.stringify(p)},'');
  }catch(e){}
})();`}function r(e){return Math.min(h.maxExpanded,Math.max(h.minExpanded,e))}function i(){var e;if(typeof window>`u`)return h.defaultExpanded;let t=Number.parseFloat((e=localStorage.getItem(`accessible-folder-sidebar-expanded-width`))==null?``:e);return Number.isFinite(t)?r(t):h.defaultExpanded}function a(e){let t=r(e);return typeof window<`u`&&localStorage.setItem(d,`${t}`),t}function o(e){return e===`collapsed`?h.collapsed:i()}function s(e){return typeof window>`u`?!1:(document.documentElement.style.setProperty(u,`${e}px`),!0)}function c(){typeof document<`u`&&document.documentElement.removeAttribute(p)}function l(e,t){let n=o(e);return s(n),n===t?(c(),null):n}var u,d,f,p,m,h,g;function _(){return(_=e((()=>{t(),u=`--accessible-folder-sidebar-width`,d=`accessible-folder-sidebar-expanded-width`,f=`accessible-folder-sidebar-mode`,p=`data-afs-sidebar-prehydration`,m={collapsed:52,expanded:200},h={collapsed:m.collapsed,minExpanded:231,defaultExpanded:231,maxExpanded:320},g=`html[${p}] [data-folder-sidebar]{width:var(${u})!important}`})))()}export{m as a,o as c,a as d,l as f,h as i,_ as l,g as n,n as o,u as r,i as s,f as t,s as u};
//# debugId=0791ffaa-e156-5bb3-aeee-ef940911a79c

//# chunkId=0791ffaa-e156-5bb3-aeee-ef940911a79c