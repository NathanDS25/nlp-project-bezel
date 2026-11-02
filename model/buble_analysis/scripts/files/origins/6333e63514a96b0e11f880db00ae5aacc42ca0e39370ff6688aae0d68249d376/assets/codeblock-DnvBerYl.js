import{B as me,E as H,c as E,A as N,j as b,bk as fe,cy as ve,bE as ge,cz as ye,cA as be,cB as we,cC as ke,bS as xe}from"./index-D_m2ltZj.js";import{M as re}from"./index-BMSQkwth.js";import{B as Le}from"./index-CQ4oX9Ud.js";const Se=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],Ce=me("ellipsis",Se),Ee=t=>{const e=E.c(8);let n,r;e[0]!==t?({className:n,...r}=t,e[0]=t,e[1]=n,e[2]=r):(n=e[1],r=e[2]);let o;e[3]!==n?(o=N("mx-auto flex w-full",n),e[3]=n,e[4]=o):o=e[4];let i;return e[5]!==r||e[6]!==o?(i=b.jsx("nav",{role:"navigation","aria-label":"pagination",className:o,...r}),e[5]=r,e[6]=o,e[7]=i):i=e[7],i};Ee.displayName="Pagination";const Te=H.forwardRef((t,e)=>{const n=E.c(9);let r,o;n[0]!==t?({className:r,...o}=t,n[0]=t,n[1]=r,n[2]=o):(r=n[1],o=n[2]);let i;n[3]!==r?(i=N("flex flex-row items-center gap-1",r),n[3]=r,n[4]=i):i=n[4];let s;return n[5]!==o||n[6]!==e||n[7]!==i?(s=b.jsx("ul",{ref:e,className:i,...o}),n[5]=o,n[6]=e,n[7]=i,n[8]=s):s=n[8],s});Te.displayName="PaginationContent";const Me=H.forwardRef((t,e)=>{const n=E.c(9);let r,o;n[0]!==t?({className:r,...o}=t,n[0]=t,n[1]=r,n[2]=o):(r=n[1],o=n[2]);let i;n[3]!==r?(i=N("",r),n[3]=r,n[4]=i):i=n[4];let s;return n[5]!==o||n[6]!==e||n[7]!==i?(s=b.jsx("li",{ref:e,className:i,...o}),n[5]=o,n[6]=e,n[7]=i,n[8]=s):s=n[8],s});Me.displayName="PaginationItem";const D=t=>{const e=E.c(13);let n,r,o,i;e[0]!==t?({className:n,isActive:r,size:i,...o}=t,e[0]=t,e[1]=n,e[2]=r,e[3]=o,e[4]=i):(n=e[1],r=e[2],o=e[3],i=e[4]);const s=i===void 0?"icon":i,l=r?"page":void 0;let a;e[5]!==n||e[6]!==r||e[7]!==s?(a=N(fe({variant:r?"outline":"ghost",size:s}),n),e[5]=n,e[6]=r,e[7]=s,e[8]=a):a=e[8];let p;return e[9]!==o||e[10]!==l||e[11]!==a?(p=b.jsx("a",{"aria-current":l,className:a,...o}),e[9]=o,e[10]=l,e[11]=a,e[12]=p):p=e[12],p};D.displayName="PaginationLink";const Pe=t=>{const e=E.c(9);let n,r;e[0]!==t?({className:n,...r}=t,e[0]=t,e[1]=n,e[2]=r):(n=e[1],r=e[2]);let o;e[3]!==n?(o=N("gap-1 pl-2.5",n),e[3]=n,e[4]=o):o=e[4];let i;e[5]===Symbol.for("react.memo_cache_sentinel")?(i=b.jsx(ve,{className:"h-4 w-4"}),e[5]=i):i=e[5];let s;return e[6]!==r||e[7]!==o?(s=b.jsx(D,{"aria-label":"Go to previous page",size:"default",className:o,...r,children:i}),e[6]=r,e[7]=o,e[8]=s):s=e[8],s};Pe.displayName="PaginationPrevious";const $e=t=>{const e=E.c(9);let n,r;e[0]!==t?({className:n,...r}=t,e[0]=t,e[1]=n,e[2]=r):(n=e[1],r=e[2]);let o;e[3]!==n?(o=N("gap-1 pr-2.5",n),e[3]=n,e[4]=o):o=e[4];let i;e[5]===Symbol.for("react.memo_cache_sentinel")?(i=b.jsx(ge,{className:"h-4 w-4"}),e[5]=i):i=e[5];let s;return e[6]!==r||e[7]!==o?(s=b.jsx(D,{"aria-label":"Go to next page",size:"default",className:o,...r,children:i}),e[6]=r,e[7]=o,e[8]=s):s=e[8],s};$e.displayName="PaginationNext";const Ne=t=>{const e=E.c(10);let n,r;e[0]!==t?({className:n,...r}=t,e[0]=t,e[1]=n,e[2]=r):(n=e[1],r=e[2]);let o;e[3]!==n?(o=N("flex h-9 w-9 items-center justify-center",n),e[3]=n,e[4]=o):o=e[4];let i,s;e[5]===Symbol.for("react.memo_cache_sentinel")?(i=b.jsx(Ce,{className:"h-4 w-4"}),s=b.jsx("span",{className:"sr-only",children:"More pages"}),e[5]=i,e[6]=s):(i=e[5],s=e[6]);let l;return e[7]!==r||e[8]!==o?(l=b.jsxs("span",{"aria-hidden":!0,className:o,...r,children:[i,s]}),e[7]=r,e[8]=o,e[9]=l):l=e[9],l};Ne.displayName="PaginationEllipsis";function Ae(t){return typeof t=="string"?t:t.src}const He=H.forwardRef((t,e)=>{const n=E.c(21);let r,o,i,s,l,a,p,c;n[0]!==t?({src:a,alt:r,width:c,height:i,style:p,loading:s,decoding:o,...l}=t,n[0]=t,n[1]=r,n[2]=o,n[3]=i,n[4]=s,n[5]=l,n[6]=a,n[7]=p,n[8]=c):(r=n[1],o=n[2],i=n[3],s=n[4],l=n[5],a=n[6],p=n[7],c=n[8]);let d;n[9]!==a?(d=Ae(a),n[9]=a,n[10]=d):d=n[10];const h=s??"lazy",u=o??"async";let f;return n[11]!==r||n[12]!==i||n[13]!==l||n[14]!==e||n[15]!==p||n[16]!==d||n[17]!==h||n[18]!==u||n[19]!==c?(f=b.jsx("img",{...l,ref:e,src:d,alt:r,width:c,height:i,loading:h,decoding:u,style:p}),n[11]=r,n[12]=i,n[13]=l,n[14]=e,n[15]=p,n[16]=d,n[17]=h,n[18]=u,n[19]=c,n[20]=f):f=n[20],f});He.displayName="Image";function Ie(t){return t.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g,"-").replace(/(^-|-$)/g,"")}const q=new re({html:!0,linkify:!0,breaks:!0});q.renderer.rules.heading_open=function(t,e){const r=t[e].markup.length,o=t[e+1];if(o&&o.type==="inline"){const i=o.content,s=Ie(i);return`<h${r} id="${s}">`}return`<h${r}>`};q.renderer.rules.link_open=function(t,e,n,r,o){const i=t[e];if(i.attrIndex("href")>=0){const l=i.attrGet("href");i.attrSet("rel","nofollow"),l&&(l.startsWith("http://")||l.startsWith("https://"))&&i.attrSet("target","_blank")}return o.renderToken(t,e,n)};function Lt(t){const e=E.c(4),{content:n}=t;let r;e[0]!==n?(r=n?q.render(n):"",e[0]=n,e[1]=r):r=e[1];const o=r;let i;return e[2]!==o?(i=b.jsx("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:o}}),e[2]=o,e[3]=i):i=e[3],i}const oe=new re({html:!0,linkify:!0,breaks:!0});function Be(t){return!!t&&(t.startsWith("http://")||t.startsWith("https://"))}oe.renderer.rules.heading_open=function(t,e,n,r){const i=t[e].markup.length,s=t[e+1];if(s&&s.type==="inline"){const l=s.content,c=((r||{}).slugger||new Le).slug(l||"section");return`<h${i} id="${c}">`}return`<h${i}>`};oe.renderer.rules.link_open=function(t,e,n,r,o){const i=t[e];if(i.attrIndex("href")>=0){const l=i.attrGet("href"),a=r||{},p=l&&(a.linkMap?.[l]||l),c=a.linkRel||"nofollow-all",d=Be(p);p&&p!==l&&i.attrSet("href",p),(c==="nofollow-all"||c==="external-only"&&d)&&i.attrSet("rel",d?"nofollow noopener noreferrer":"nofollow"),d&&i.attrSet("target","_blank")}return o.renderToken(t,e,n)};var je=Object.defineProperty,_e=(t,e,n)=>e in t?je(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,I=(t,e,n)=>(_e(t,typeof e!="symbol"?e+"":e,n),n),C=class{static resetLinkIndex(){this.linkIndex=0}static escapeHtml(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return t.replace(/[&<>"']/g,n=>e[n])}static preserveIndentation(t,e){const r=e.match(/^(\s*)/)[1].replace(/ /g,"&nbsp;");return t.replace(/^\s*/,r)}static parseHeader(t){return t.replace(/^(#{1,3})\s(.+)$/,(e,n,r)=>{const o=n.length;return`<h${o}><span class="syntax-marker">${n} </span>${r}</h${o}>`})}static parseHorizontalRule(t){return t.match(/^(-{3,}|\*{3,}|_{3,})$/)?`<div><span class="hr-marker">${t}</span></div>`:null}static parseBlockquote(t){return t.replace(/^&gt; (.+)$/,(e,n)=>`<span class="blockquote"><span class="syntax-marker">&gt;</span> ${n}</span>`)}static parseBulletList(t){return t.replace(/^((?:&nbsp;)*)([-*])\s(.+)$/,(e,n,r,o)=>`${n}<li class="bullet-list"><span class="syntax-marker">${r} </span>${o}</li>`)}static parseNumberedList(t){return t.replace(/^((?:&nbsp;)*)(\d+\.)\s(.+)$/,(e,n,r,o)=>`${n}<li class="ordered-list"><span class="syntax-marker">${r} </span>${o}</li>`)}static parseCodeBlock(t){return/^`{3}[^`]*$/.test(t)?`<div><span class="code-fence">${t}</span></div>`:null}static parseBold(t){return t=t.replace(/\*\*(.+?)\*\*/g,'<strong><span class="syntax-marker">**</span>$1<span class="syntax-marker">**</span></strong>'),t=t.replace(/__(.+?)__/g,'<strong><span class="syntax-marker">__</span>$1<span class="syntax-marker">__</span></strong>'),t}static parseItalic(t){return t=t.replace(new RegExp("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)","g"),'<em><span class="syntax-marker">*</span>$1<span class="syntax-marker">*</span></em>'),t=t.replace(new RegExp("(?<=^|\\s)_(?!_)(.+?)(?<!_)_(?!_)(?=\\s|$)","g"),'<em><span class="syntax-marker">_</span>$1<span class="syntax-marker">_</span></em>'),t}static parseStrikethrough(t){return t=t.replace(new RegExp("(?<!~)~~(?!~)(.+?)(?<!~)~~(?!~)","g"),'<del><span class="syntax-marker">~~</span>$1<span class="syntax-marker">~~</span></del>'),t=t.replace(new RegExp("(?<!~)~(?!~)(.+?)(?<!~)~(?!~)","g"),'<del><span class="syntax-marker">~</span>$1<span class="syntax-marker">~</span></del>'),t}static parseInlineCode(t){return t.replace(new RegExp("(?<!`)(`+)(?!`)((?:(?!\\1).)+?)(\\1)(?!`)","g"),'<code><span class="syntax-marker">$1</span>$2<span class="syntax-marker">$3</span></code>')}static sanitizeUrl(t){const e=t.trim(),n=e.toLowerCase(),o=["http://","https://","mailto:","ftp://","ftps://"].some(s=>n.startsWith(s)),i=e.startsWith("/")||e.startsWith("#")||e.startsWith("?")||e.startsWith(".")||!e.includes(":")&&!e.includes("//");return o||i?t:"#"}static parseLinks(t){return t.replace(/\[(.+?)\]\((.+?)\)/g,(e,n,r)=>{const o=`--link-${this.linkIndex++}`;return`<a href="${this.sanitizeUrl(r)}" style="anchor-name: ${o}"><span class="syntax-marker">[</span>${n}<span class="syntax-marker url-part">](${r})</span></a>`})}static identifyAndProtectSanctuaries(t){const e=new Map;let n=0,r=t;const o=[],i=/\[([^\]]+)\]\(([^)]+)\)/g;let s;for(;(s=i.exec(t))!==null;){const d=s.index+s[0].indexOf("](")+2,h=d+s[2].length;o.push({start:d,end:h})}const l=new RegExp("(?<!`)(`+)(?!`)((?:(?!\\1).)+?)(\\1)(?!`)","g");let a;const p=[];for(;(a=l.exec(t))!==null;){const c=a.index,d=a.index+a[0].length;o.some(u=>c>=u.start&&d<=u.end)||p.push({match:a[0],index:a.index,openTicks:a[1],content:a[2],closeTicks:a[3]})}return p.sort((c,d)=>d.index-c.index),p.forEach(c=>{const d=`${n++}`;e.set(d,{type:"code",original:c.match,openTicks:c.openTicks,content:c.content,closeTicks:c.closeTicks}),r=r.substring(0,c.index)+d+r.substring(c.index+c.match.length)}),r=r.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(c,d,h)=>{const u=`${n++}`;return e.set(u,{type:"link",original:c,linkText:d,url:h}),u}),{protectedText:r,sanctuaries:e}}static restoreAndTransformSanctuaries(t,e){return Array.from(e.keys()).sort((r,o)=>{const i=t.indexOf(r),s=t.indexOf(o);return i-s}).forEach(r=>{const o=e.get(r);let i;if(o.type==="code")i=`<code><span class="syntax-marker">${o.openTicks}</span>${this.escapeHtml(o.content)}<span class="syntax-marker">${o.closeTicks}</span></code>`;else if(o.type==="link"){let s=o.linkText;e.forEach((p,c)=>{if(s.includes(c)&&p.type==="code"){const d=`<code><span class="syntax-marker">${p.openTicks}</span>${this.escapeHtml(p.content)}<span class="syntax-marker">${p.closeTicks}</span></code>`;s=s.replace(c,d)}}),s=this.parseStrikethrough(s),s=this.parseBold(s),s=this.parseItalic(s);const l=`--link-${this.linkIndex++}`;i=`<a href="${this.sanitizeUrl(o.url)}" style="anchor-name: ${l}"><span class="syntax-marker">[</span>${s}<span class="syntax-marker url-part">](${this.escapeHtml(o.url)})</span></a>`}t=t.replace(r,i)}),t}static parseInlineElements(t){const{protectedText:e,sanctuaries:n}=this.identifyAndProtectSanctuaries(t);let r=e;return r=this.parseStrikethrough(r),r=this.parseBold(r),r=this.parseItalic(r),r=this.restoreAndTransformSanctuaries(r,n),r}static parseLine(t){let e=this.escapeHtml(t);e=this.preserveIndentation(e,t);const n=this.parseHorizontalRule(e);if(n)return n;const r=this.parseCodeBlock(e);return r||(e=this.parseHeader(e),e=this.parseBlockquote(e),e=this.parseBulletList(e),e=this.parseNumberedList(e),e=this.parseInlineElements(e),e.trim()===""?"<div>&nbsp;</div>":`<div>${e}</div>`)}static parse(t,e=-1,n=!1){this.resetLinkIndex();const r=t.split(`
`);let o=!1;const s=r.map((l,a)=>{if(n&&a===e)return`<div class="raw-line">${this.escapeHtml(l)||"&nbsp;"}</div>`;if(/^```[^`]*$/.test(l))return o=!o,this.parseLine(l);if(o){const c=this.escapeHtml(l);return`<div>${this.preserveIndentation(c,l)||"&nbsp;"}</div>`}return this.parseLine(l)}).join("");return this.postProcessHTML(s)}static postProcessHTML(t){if(typeof document>"u"||!document)return this.postProcessHTMLManual(t);const e=document.createElement("div");e.innerHTML=t;let n=null,r=null,o=null,i=!1;const s=Array.from(e.children);for(let l=0;l<s.length;l++){const a=s[l];if(!a.parentNode)continue;const p=a.querySelector(".code-fence");if(p){const d=p.textContent;if(d.startsWith("```"))if(i){i=!1,o=null;continue}else{i=!0,o=document.createElement("pre");const h=document.createElement("code");o.appendChild(h),o.className="code-block";const u=d.slice(3).trim();u&&(h.className=`language-${u}`),e.insertBefore(o,a.nextSibling),o._codeElement=h;continue}}if(i&&o&&a.tagName==="DIV"&&!a.querySelector(".code-fence")){const d=o._codeElement||o.querySelector("code");d.textContent.length>0&&(d.textContent+=`
`);const h=a.textContent.replace(/\u00A0/g," ");d.textContent+=h,a.remove();continue}let c=null;if(a.tagName==="DIV"&&(c=a.querySelector("li")),c){const d=c.classList.contains("bullet-list"),h=c.classList.contains("ordered-list");if(!d&&!h){n=null,r=null;continue}const u=d?"ul":"ol";(!n||r!==u)&&(n=document.createElement(u),e.insertBefore(n,a),r=u);const f=[];for(const m of a.childNodes)if(m.nodeType===3&&m.textContent.match(/^\u00A0+$/))f.push(m.cloneNode(!0));else if(m===c)break;f.forEach(m=>{c.insertBefore(m,c.firstChild)}),n.appendChild(c),a.remove()}else n=null,r=null}return e.innerHTML}static postProcessHTMLManual(t){let e=t;e=e.replace(/((?:<div>(?:&nbsp;)*<li class="bullet-list">.*?<\/li><\/div>\s*)+)/gs,r=>{const o=r.match(/<div>(?:&nbsp;)*<li class="bullet-list">.*?<\/li><\/div>/gs)||[];return o.length>0?"<ul>"+o.map(s=>{const l=s.match(/<div>((?:&nbsp;)*)<li/),a=s.match(/<li class="bullet-list">.*?<\/li>/);if(l&&a){const p=l[1];return a[0].replace(/<li class="bullet-list">/,`<li class="bullet-list">${p}`)}return a?a[0]:""}).filter(Boolean).join("")+"</ul>":r}),e=e.replace(/((?:<div>(?:&nbsp;)*<li class="ordered-list">.*?<\/li><\/div>\s*)+)/gs,r=>{const o=r.match(/<div>(?:&nbsp;)*<li class="ordered-list">.*?<\/li><\/div>/gs)||[];return o.length>0?"<ol>"+o.map(s=>{const l=s.match(/<div>((?:&nbsp;)*)<li/),a=s.match(/<li class="ordered-list">.*?<\/li>/);if(l&&a){const p=l[1];return a[0].replace(/<li class="ordered-list">/,`<li class="ordered-list">${p}`)}return a?a[0]:""}).filter(Boolean).join("")+"</ol>":r});const n=/<div><span class="code-fence">(```[^<]*)<\/span><\/div>(.*?)<div><span class="code-fence">(```)<\/span><\/div>/gs;return e=e.replace(n,(r,o,i,s)=>{const a=(i.match(/<div>(.*?)<\/div>/gs)||[]).map(h=>h.replace(/<div>(.*?)<\/div>/s,"$1").replace(/&nbsp;/g," ")).join(`
`),p=o.slice(3).trim(),c=p?` class="language-${p}"`:"";let d=`<div><span class="code-fence">${o}</span></div>`;return d+=`<pre class="code-block"><code${c}>${a}</code></pre>`,d+=`<div><span class="code-fence">${s}</span></div>`,d}),e}static getListContext(t,e){const n=t.split(`
`);let r=0,o=0,i=0;for(let d=0;d<n.length;d++){const h=n[d].length;if(r+h>=e){o=d,i=r;break}r+=h+1}const s=n[o],l=i+s.length,a=s.match(this.LIST_PATTERNS.checkbox);if(a)return{inList:!0,listType:"checkbox",indent:a[1],marker:"-",checked:a[2]==="x",content:a[3],lineStart:i,lineEnd:l,markerEndPos:i+a[1].length+a[2].length+5};const p=s.match(this.LIST_PATTERNS.bullet);if(p)return{inList:!0,listType:"bullet",indent:p[1],marker:p[2],content:p[3],lineStart:i,lineEnd:l,markerEndPos:i+p[1].length+p[2].length+1};const c=s.match(this.LIST_PATTERNS.numbered);return c?{inList:!0,listType:"numbered",indent:c[1],marker:parseInt(c[2]),content:c[3],lineStart:i,lineEnd:l,markerEndPos:i+c[1].length+c[2].length+2}:{inList:!1,listType:null,indent:"",marker:null,content:s,lineStart:i,lineEnd:l,markerEndPos:i}}static createNewListItem(t){switch(t.listType){case"bullet":return`${t.indent}${t.marker} `;case"numbered":return`${t.indent}${t.marker+1}. `;case"checkbox":return`${t.indent}- [ ] `;default:return""}}static renumberLists(t){const e=t.split(`
`),n=new Map;let r=!1;return e.map(i=>{const s=i.match(this.LIST_PATTERNS.numbered);if(s){const l=s[1],a=l.length,p=s[3];r||n.clear();const c=(n.get(a)||0)+1;n.set(a,c);for(const[d]of n)d>a&&n.delete(d);return r=!0,`${l}${c}. ${p}`}else return(i.trim()===""||!i.match(/^\s/))&&(r=!1,n.clear()),i}).join(`
`)}};I(C,"linkIndex",0);I(C,"LIST_PATTERNS",{bullet:/^(\s*)([-*+])\s+(.*)$/,numbered:/^(\s*)(\d+)\.\s+(.*)$/,checkbox:/^(\s*)-\s+\[([ x])\]\s+(.*)$/});var ze=Object.defineProperty,G=Object.getOwnPropertySymbols,Re=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,Q=(t,e,n)=>e in t?ze(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,J=(t,e)=>{for(var n in e||(e={}))Re.call(e,n)&&Q(t,n,e[n]);if(G)for(var n of G(e))Oe.call(e,n)&&Q(t,n,e[n]);return t},L={bold:{prefix:"**",suffix:"**",trimFirst:!0},italic:{prefix:"_",suffix:"_",trimFirst:!0},code:{prefix:"`",suffix:"`",blockPrefix:"```",blockSuffix:"```"},link:{prefix:"[",suffix:"](url)",replaceNext:"url",scanFor:"https?://"},bulletList:{prefix:"- ",multiline:!0,unorderedList:!0},numberedList:{prefix:"1. ",multiline:!0,orderedList:!0},quote:{prefix:"> ",multiline:!0,surroundWithNewlines:!0},taskList:{prefix:"- [ ] ",multiline:!0,surroundWithNewlines:!0},header1:{prefix:"# "},header2:{prefix:"## "},header3:{prefix:"### "},header4:{prefix:"#### "},header5:{prefix:"##### "},header6:{prefix:"###### "}};function Ve(){return{prefix:"",suffix:"",blockPrefix:"",blockSuffix:"",multiline:!1,replaceNext:"",prefixSpace:!1,scanFor:"",surroundWithNewlines:!1,orderedList:!1,unorderedList:!1,trimFirst:!1}}function T(t){return J(J({},Ve()),t)}var Fe=!1;function De(){return Fe}var A=null;function M(t,{text:e,selectionStart:n,selectionEnd:r}){const o=De();t.focus();const i=t.selectionStart,s=t.selectionEnd,l=t.value.slice(0,i),a=t.value.slice(s),p=t.value;if(A===null||A===!0){t.contentEditable="true";try{A=document.execCommand("insertText",!1,e)}catch{A=!1}t.contentEditable="false"}if(A&&t.value,!A&&t.value===p){try{document.execCommand("ms-beginUndoUnit")}catch{}t.value=l+e+a;try{document.execCommand("ms-endUndoUnit")}catch{}t.dispatchEvent(new CustomEvent("input",{bubbles:!0,cancelable:!0}))}n!=null&&r!=null?t.setSelectionRange(n,r):t.setSelectionRange(i,t.selectionEnd)}function X(t){return t.trim().split(`
`).length>1}function qe(t,e){let n=e;for(;t[n]&&t[n-1]!=null&&!t[n-1].match(/\s/);)n--;return n}function Ue(t,e,n){let r=e;const o=n?/\n/:/\s/;for(;t[r]&&!t[r].match(o);)r++;return r}function ie(t){const e=t.value.split(`
`);let n=0;for(let r=0;r<e.length;r++){const o=e[r].length+1;t.selectionStart>=n&&t.selectionStart<n+o&&(t.selectionStart=n),t.selectionEnd>=n&&t.selectionEnd<n+o&&(r===e.length-1?t.selectionEnd=Math.min(n+e[r].length,t.value.length):t.selectionEnd=n+o-1),n+=o}}function We(t,e,n,r=!1){if(t.selectionStart===t.selectionEnd)t.selectionStart=qe(t.value,t.selectionStart),t.selectionEnd=Ue(t.value,t.selectionEnd,r);else{const o=t.selectionStart-e.length,i=t.selectionEnd+n.length,s=t.value.slice(o,t.selectionStart)===e,l=t.value.slice(t.selectionEnd,i)===n;s&&l&&(t.selectionStart=o,t.selectionEnd=i)}return t.value.slice(t.selectionStart,t.selectionEnd)}function U(t){const e=t.value.slice(0,t.selectionStart),n=t.value.slice(t.selectionEnd),r=e.match(/\n*$/),o=n.match(/^\n*/),i=r?r[0].length:0,s=o?o[0].length:0;let l="",a="";return e.match(/\S/)&&i<2&&(l=`
`.repeat(2-i)),n.match(/\S/)&&s<2&&(a=`
`.repeat(2-s)),{newlinesToAppend:l,newlinesToPrepend:a}}function O(t,e,n={}){const r=t.selectionStart,o=t.selectionEnd,i=r===o,s=t.value;let l=r;for(;l>0&&s[l-1]!==`
`;)l--;if(i){let p=r;for(;p<s.length&&s[p]!==`
`;)p++;t.selectionStart=l,t.selectionEnd=p}else ie(t);const a=e(t);if(n.adjustSelection){const c=t.value.slice(t.selectionStart,t.selectionEnd).startsWith(n.prefix),d=n.adjustSelection(c,r,o,l);a.selectionStart=d.start,a.selectionEnd=d.end}else if(n.prefix){const c=t.value.slice(t.selectionStart,t.selectionEnd).startsWith(n.prefix);i?c?(a.selectionStart=Math.max(r-n.prefix.length,l),a.selectionEnd=a.selectionStart):(a.selectionStart=r+n.prefix.length,a.selectionEnd=a.selectionStart):c?(a.selectionStart=Math.max(r-n.prefix.length,l),a.selectionEnd=Math.max(o-n.prefix.length,l)):(a.selectionStart=r+n.prefix.length,a.selectionEnd=o+n.prefix.length)}return a}function V(t,e){let n,r;const{prefix:o,suffix:i,blockPrefix:s,blockSuffix:l,replaceNext:a,prefixSpace:p,scanFor:c,surroundWithNewlines:d,trimFirst:h}=e,u=t.selectionStart,f=t.selectionEnd;let m=t.value.slice(t.selectionStart,t.selectionEnd),v=X(m)&&s&&s.length>0?`${s}
`:o,y=X(m)&&l&&l.length>0?`
${l}`:i;if(p){const x=t.value[t.selectionStart-1];t.selectionStart!==0&&x!=null&&!x.match(/\s/)&&(v=` ${v}`)}m=We(t,v,y,e.multiline);let g=t.selectionStart,k=t.selectionEnd;const P=a&&a.length>0&&y.indexOf(a)>-1&&m.length>0;if(d){const x=U(t);n=x.newlinesToAppend,r=x.newlinesToPrepend,v=n+o,y+=r}if(m.startsWith(v)&&m.endsWith(y)){const x=m.slice(v.length,m.length-y.length);if(u===f){let S=u-v.length;S=Math.max(S,g),S=Math.min(S,g+x.length),g=k=S}else k=g+x.length;return{text:x,selectionStart:g,selectionEnd:k}}else if(P)if(c&&c.length>0&&m.match(c)){y=y.replace(a,m);const x=v+y;return g=k=g+v.length,{text:x,selectionStart:g,selectionEnd:k}}else{const x=v+m+y;return g=g+v.length+m.length+y.indexOf(a),k=g+a.length,{text:x,selectionStart:g,selectionEnd:k}}else{let x=v+m+y;g=u+v.length,k=f+v.length;const S=m.match(/^\s*|\s*$/g);if(h&&S){const K=S[0]||"",Z=S[1]||"";x=K+v+m.trim()+y+Z,g+=K.length,k-=Z.length}return{text:x,selectionStart:g,selectionEnd:k}}}function se(t,e){const{prefix:n,suffix:r,surroundWithNewlines:o}=e;let i=t.value.slice(t.selectionStart,t.selectionEnd),s=t.selectionStart,l=t.selectionEnd;const a=i.split(`
`);if(a.every(c=>c.startsWith(n)&&(!r||c.endsWith(r))))i=a.map(c=>{let d=c.slice(n.length);return r&&(d=d.slice(0,d.length-r.length)),d}).join(`
`),l=s+i.length;else if(i=a.map(c=>n+c+(r||"")).join(`
`),o){const{newlinesToAppend:c,newlinesToPrepend:d}=U(t);s+=c.length,l=s+i.length,i=c+i+d}return{text:i,selectionStart:s,selectionEnd:l}}function Y(t){const e=t.split(`
`),n=/^\d+\.\s+/,r=e.every(i=>n.test(i));let o=e;return r&&(o=e.map(i=>i.replace(n,""))),{text:o.join(`
`),processed:r}}function ee(t){const e=t.split(`
`),n="- ",r=e.every(i=>i.startsWith(n));let o=e;return r&&(o=e.map(i=>i.slice(n.length))),{text:o.join(`
`),processed:r}}function B(t,e){return e?"- ":`${t+1}. `}function Ke(t,e){let n,r,o;return t.orderedList?(n=Y(e),r=ee(n.text),o=r.text):(n=ee(e),r=Y(n.text),o=r.text),[n,r,o]}function Ze(t,e){const n=t.selectionStart===t.selectionEnd;let r=t.selectionStart,o=t.selectionEnd;ie(t);const i=t.value.slice(t.selectionStart,t.selectionEnd),[s,l,a]=Ke(e,i),p=a.split(`
`).map((m,v)=>`${B(v,e.unorderedList)}${m}`),c=p.reduce((m,v,y)=>m+B(y,e.unorderedList).length,0),d=p.reduce((m,v,y)=>m+B(y,!e.unorderedList).length,0);if(s.processed)return n?(r=Math.max(r-B(0,e.unorderedList).length,0),o=r):(r=t.selectionStart,o=t.selectionEnd-c),{text:a,selectionStart:r,selectionEnd:o};const{newlinesToAppend:h,newlinesToPrepend:u}=U(t),f=h+p.join(`
`)+u;return n?(r=Math.max(r+B(0,e.unorderedList).length+h.length,0),o=r):l.processed?(r=Math.max(t.selectionStart+h.length,0),o=t.selectionEnd+h.length+c-d):(r=Math.max(t.selectionStart+h.length,0),o=t.selectionEnd+h.length+c),{text:f,selectionStart:r,selectionEnd:o}}function ae(t,e){const n=O(t,r=>Ze(r,e),{adjustSelection:(r,o,i,s)=>{const l=t.value.slice(s,t.selectionEnd),a=/^\d+\.\s+/,p=/^- /,c=a.test(l),d=p.test(l),h=e.orderedList&&c||e.unorderedList&&d;if(o===i)if(h){const u=l.match(e.orderedList?a:p),f=u?u[0].length:0;return{start:Math.max(o-f,s),end:Math.max(o-f,s)}}else if(c||d){const u=l.match(c?a:p),f=u?u[0].length:0,v=(e.unorderedList?2:3)-f;return{start:o+v,end:o+v}}else{const u=e.unorderedList?2:3;return{start:o+u,end:o+u}}else if(h){const u=l.match(e.orderedList?a:p),f=u?u[0].length:0;return{start:Math.max(o-f,s),end:Math.max(i-f,s)}}else if(c||d){const u=l.match(c?a:p),f=u?u[0].length:0,v=(e.unorderedList?2:3)-f;return{start:o+v,end:i+v}}else{const u=e.unorderedList?2:3;return{start:o+u,end:i+u}}}});M(t,n)}function Ge(t){if(!t)return[];const e=[],{selectionStart:n,selectionEnd:r,value:o}=t,i=o.split(`
`);let s=0,l="";for(const d of i){if(n>=s&&n<=s+d.length){l=d;break}s+=d.length+1}l.startsWith("- ")&&(l.startsWith("- [ ] ")||l.startsWith("- [x] ")?e.push("task-list"):e.push("bullet-list")),/^\d+\.\s/.test(l)&&e.push("numbered-list"),l.startsWith("> ")&&e.push("quote"),l.startsWith("# ")&&e.push("header"),l.startsWith("## ")&&e.push("header-2"),l.startsWith("### ")&&e.push("header-3");const a=Math.max(0,n-10),p=Math.min(o.length,r+10),c=o.slice(a,p);if(c.includes("**")){const d=o.slice(Math.max(0,n-100),n),h=o.slice(r,Math.min(o.length,r+100)),u=d.lastIndexOf("**"),f=h.indexOf("**");u!==-1&&f!==-1&&e.push("bold")}if(c.includes("_")){const d=o.slice(Math.max(0,n-100),n),h=o.slice(r,Math.min(o.length,r+100)),u=d.lastIndexOf("_"),f=h.indexOf("_");u!==-1&&f!==-1&&e.push("italic")}if(c.includes("`")){const d=o.slice(Math.max(0,n-100),n),h=o.slice(r,Math.min(o.length,r+100));d.includes("`")&&h.includes("`")&&e.push("code")}if(c.includes("[")&&c.includes("]")){const d=o.slice(Math.max(0,n-100),n),h=o.slice(r,Math.min(o.length,r+100)),u=d.lastIndexOf("["),f=h.indexOf("]");u!==-1&&f!==-1&&o.slice(r+f+1,r+f+10).startsWith("(")&&e.push("link")}return e}function le(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.bold),n=V(t,e);M(t,n)}function ce(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.italic),n=V(t,e);M(t,n)}function Qe(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.code),n=V(t,e);M(t,n)}function pe(t,e={}){if(!t||t.disabled||t.readOnly)return;const n=t.value.slice(t.selectionStart,t.selectionEnd);let r=T(L.link);if(n&&n.match(/^https?:\/\//)&&!e.url?(r.suffix=`](${n})`,r.replaceNext=""):e.url&&(r.suffix=`](${e.url})`,r.replaceNext=""),e.text&&!n){const s=t.selectionStart;t.value=t.value.slice(0,s)+e.text+t.value.slice(s),t.selectionStart=s,t.selectionEnd=s+e.text.length}const i=V(t,r);M(t,i)}function de(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.bulletList);ae(t,e)}function ue(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.numberedList);ae(t,e)}function Je(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.quote),n=O(t,r=>se(r,e),{prefix:e.prefix});M(t,n)}function Xe(t){if(!t||t.disabled||t.readOnly)return;const e=T(L.taskList),n=O(t,r=>se(r,e),{prefix:e.prefix});M(t,n)}function W(t,e=1,n=!1){if(!t||t.disabled||t.readOnly)return;(e<1||e>6)&&(e=1),`${t.selectionStart}${t.selectionEnd}`;const r=`header${e===1?"1":e}`,o=T(L[r]||L.header1);`${o.prefix}`;const i=t.value,s=t.selectionStart,l=t.selectionEnd;let a=s;for(;a>0&&i[a-1]!==`
`;)a--;let p=l;for(;p<i.length&&i[p]!==`
`;)p++;const d=i.slice(a,p).match(/^(#{1,6})\s*/),h=d?d[1].length:0,u=d?d[0].length:0;d&&`${d[0]}`;const f=n&&h===e,m=O(t,v=>{const g=v.value.slice(v.selectionStart,v.selectionEnd).replace(/^#{1,6}\s*/,"");let k;return f?k=g:(h>0,k=o.prefix+g),{text:k,selectionStart:v.selectionStart,selectionEnd:v.selectionEnd}},{prefix:o.prefix,adjustSelection:(v,y,g,k)=>{if(f){const P=Math.max(y-u,k);return{start:P,end:y===g?P:Math.max(g-u,k)}}else if(u>0){const P=o.prefix.length-u;return{start:y+P,end:g+P}}else return`${o.prefix.length}`,{start:y+o.prefix.length,end:g+o.prefix.length}}});`${m.text}${m.selectionStart}${m.selectionEnd}`,M(t,m)}function Ye(t){W(t,1,!0)}function et(t){W(t,2,!0)}function tt(t){W(t,3,!0)}function nt(t){return Ge(t)}var he=class{constructor(t){this.editor=t,this.textarea=t.textarea}handleKeydown(t){if(!(navigator.platform.toLowerCase().includes("mac")?t.metaKey:t.ctrlKey))return!1;let r=null;switch(t.key.toLowerCase()){case"b":t.shiftKey||(r="toggleBold");break;case"i":t.shiftKey||(r="toggleItalic");break;case"k":t.shiftKey||(r="insertLink");break;case"7":t.shiftKey&&(r="toggleNumberedList");break;case"8":t.shiftKey&&(r="toggleBulletList");break}return r?(t.preventDefault(),this.editor.toolbar?this.editor.toolbar.handleAction(r):this.handleAction(r),!0):!1}async handleAction(t){const e=this.textarea;if(e){e.focus();try{switch(t){case"toggleBold":le(e);break;case"toggleItalic":ce(e);break;case"insertLink":pe(e);break;case"toggleBulletList":de(e);break;case"toggleNumberedList":ue(e);break}e.dispatchEvent(new Event("input",{bubbles:!0}))}catch(n){console.error("Error in markdown action:",n)}}}destroy(){}},$={name:"solar",colors:{bgPrimary:"#faf0ca",bgSecondary:"#ffffff",text:"#0d3b66",h1:"#f95738",h2:"#ee964b",h3:"#3d8a51",strong:"#ee964b",em:"#f95738",link:"#0d3b66",code:"#0d3b66",codeBg:"rgba(244, 211, 94, 0.4)",blockquote:"#5a7a9b",hr:"#5a7a9b",syntaxMarker:"rgba(13, 59, 102, 0.52)",cursor:"#f95738",selection:"rgba(244, 211, 94, 0.4)",listMarker:"#ee964b",toolbarBg:"#ffffff",toolbarBorder:"rgba(13, 59, 102, 0.15)",toolbarIcon:"#0d3b66",toolbarHover:"#f5f5f5",toolbarActive:"#faf0ca"}},te={name:"cave",colors:{bgPrimary:"#141E26",bgSecondary:"#1D2D3E",text:"#c5dde8",h1:"#d4a5ff",h2:"#f6ae2d",h3:"#9fcfec",strong:"#f6ae2d",em:"#9fcfec",link:"#9fcfec",code:"#c5dde8",codeBg:"#1a232b",blockquote:"#9fcfec",hr:"#c5dde8",syntaxMarker:"rgba(159, 207, 236, 0.73)",cursor:"#f26419",selection:"rgba(51, 101, 138, 0.4)",listMarker:"#f6ae2d",toolbarBg:"#1D2D3E",toolbarBorder:"rgba(197, 221, 232, 0.1)",toolbarIcon:"#c5dde8",toolbarHover:"#243546",toolbarActive:"#2a3f52"}},ne={solar:$,cave:te,light:$,dark:te};function j(t){return typeof t=="string"?{...ne[t]||ne.solar,name:t}:t}function F(t){const e=[];for(const[n,r]of Object.entries(t)){const o=n.replace(/([A-Z])/g,"-$1").toLowerCase();e.push(`--${o}: ${r};`)}return e.join(`
`)}function rt(t,e={}){return{...t,colors:{...t.colors,...e}}}function ot(t={}){const{fontSize:e="14px",lineHeight:n=1.6,fontFamily:r='"SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", Consolas, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Ubuntu Mono", "DejaVu Sans Mono", "Liberation Mono", "Courier New", Courier, monospace',padding:o="20px",theme:i=null,mobile:s={}}=t,l=Object.keys(s).length>0?`
    @media (max-width: 640px) {
      .overtype-wrapper .overtype-input,
      .overtype-wrapper .overtype-preview {
        ${Object.entries(s).map(([p,c])=>`${p.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${c} !important;`).join(`
        `)}
      }
    }
  `:"",a=i&&i.colors?F(i.colors):"";return`
    /* OverType Editor Styles */
    
    /* Middle-ground CSS Reset - Prevent parent styles from leaking in */
    .overtype-container * {
      /* Box model - these commonly leak */
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      
      /* Layout - these can break our layout */
      /* Don't reset position - it breaks dropdowns */
      float: none !important;
      clear: none !important;
      
      /* Typography - only reset decorative aspects */
      text-decoration: none !important;
      text-transform: none !important;
      letter-spacing: normal !important;
      
      /* Visual effects that can interfere */
      box-shadow: none !important;
      text-shadow: none !important;
      
      /* Ensure box-sizing is consistent */
      box-sizing: border-box !important;
      
      /* Keep inheritance for these */
      /* font-family, color, line-height, font-size - inherit */
    }
    
    /* Container base styles after reset */
    .overtype-container {
      display: grid !important;
      grid-template-rows: auto 1fr auto !important;
      width: 100% !important;
      height: 100% !important;
      position: relative !important; /* Override reset - needed for absolute children */
      overflow: visible !important; /* Allow dropdown to overflow container */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      text-align: left !important;
      ${a?`
      /* Theme Variables */
      ${a}`:""}
    }
    
    /* Force left alignment for all elements in the editor */
    .overtype-container .overtype-wrapper * {
      text-align: left !important;
    }
    
    /* Auto-resize mode styles */
    .overtype-container.overtype-auto-resize {
      height: auto !important;
      grid-template-rows: auto auto auto !important;
    }
    
    .overtype-container.overtype-auto-resize .overtype-wrapper {
      height: auto !important;
      min-height: 60px !important;
      overflow: visible !important;
    }
    
    .overtype-wrapper {
      position: relative !important; /* Override reset - needed for absolute children */
      width: 100% !important;
      height: 100% !important; /* Take full height of grid cell */
      min-height: 60px !important; /* Minimum usable height */
      overflow: hidden !important;
      background: var(--bg-secondary, #ffffff) !important;
      grid-row: 2 !important; /* Always second row in grid */
      z-index: 1; /* Below toolbar and dropdown */
    }

    /* Critical alignment styles - must be identical for both layers */
    .overtype-wrapper .overtype-input,
    .overtype-wrapper .overtype-preview {
      /* Positioning - must be identical */
      position: absolute !important; /* Override reset - required for overlay */
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      
      /* Font properties - any difference breaks alignment */
      font-family: ${r} !important;
      font-variant-ligatures: none !important; /* keep metrics stable for code */
      font-size: var(--instance-font-size, ${e}) !important;
      line-height: var(--instance-line-height, ${n}) !important;
      font-weight: normal !important;
      font-style: normal !important;
      font-variant: normal !important;
      font-stretch: normal !important;
      font-kerning: none !important;
      font-feature-settings: normal !important;
      
      /* Box model - must match exactly */
      padding: var(--instance-padding, ${o}) !important;
      margin: 0 !important;
      border: none !important;
      outline: none !important;
      box-sizing: border-box !important;
      
      /* Text layout - critical for character positioning */
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
      word-break: normal !important;
      overflow-wrap: break-word !important;
      tab-size: 2 !important;
      -moz-tab-size: 2 !important;
      text-align: left !important;
      text-indent: 0 !important;
      letter-spacing: normal !important;
      word-spacing: normal !important;
      
      /* Text rendering */
      text-transform: none !important;
      text-rendering: auto !important;
      -webkit-font-smoothing: auto !important;
      -webkit-text-size-adjust: 100% !important;
      
      /* Direction and writing */
      direction: ltr !important;
      writing-mode: horizontal-tb !important;
      unicode-bidi: normal !important;
      text-orientation: mixed !important;
      
      /* Visual effects that could shift perception */
      text-shadow: none !important;
      filter: none !important;
      transform: none !important;
      zoom: 1 !important;
      
      /* Vertical alignment */
      vertical-align: baseline !important;
      
      /* Size constraints */
      min-width: 0 !important;
      min-height: 0 !important;
      max-width: none !important;
      max-height: none !important;
      
      /* Overflow */
      overflow-y: auto !important;
      overflow-x: auto !important;
      /* overscroll-behavior removed to allow scroll-through to parent */
      scrollbar-width: auto !important;
      scrollbar-gutter: auto !important;
      
      /* Animation/transition - disabled to prevent movement */
      animation: none !important;
      transition: none !important;
    }

    /* Input layer styles */
    .overtype-wrapper .overtype-input {
      /* Layer positioning */
      z-index: 1 !important;
      
      /* Text visibility */
      color: transparent !important;
      caret-color: var(--cursor, #f95738) !important;
      background-color: transparent !important;
      
      /* Textarea-specific */
      resize: none !important;
      appearance: none !important;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
      
      /* Prevent mobile zoom on focus */
      touch-action: manipulation !important;
      
      /* Disable autofill and spellcheck */
      autocomplete: off !important;
      autocorrect: off !important;
      autocapitalize: off !important;
      spellcheck: false !important;
    }

    .overtype-wrapper .overtype-input::selection {
      background-color: var(--selection, rgba(244, 211, 94, 0.4));
    }

    /* Preview layer styles */
    .overtype-wrapper .overtype-preview {
      /* Layer positioning */
      z-index: 0 !important;
      pointer-events: none !important;
      color: var(--text, #0d3b66) !important;
      background-color: transparent !important;
      
      /* Prevent text selection */
      user-select: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
    }

    /* Defensive styles for preview child divs */
    .overtype-wrapper .overtype-preview div {
      /* Reset any inherited styles */
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      text-align: left !important;
      text-indent: 0 !important;
      display: block !important;
      position: static !important;
      transform: none !important;
      min-height: 0 !important;
      max-height: none !important;
      line-height: inherit !important;
      font-size: inherit !important;
      font-family: inherit !important;
    }

    /* Markdown element styling - NO SIZE CHANGES */
    .overtype-wrapper .overtype-preview .header {
      font-weight: bold !important;
    }

    /* Header colors */
    .overtype-wrapper .overtype-preview .h1 { 
      color: var(--h1, #f95738) !important; 
    }
    .overtype-wrapper .overtype-preview .h2 { 
      color: var(--h2, #ee964b) !important; 
    }
    .overtype-wrapper .overtype-preview .h3 { 
      color: var(--h3, #3d8a51) !important; 
    }

    /* Semantic headers - flatten in edit mode */
    .overtype-wrapper .overtype-preview h1,
    .overtype-wrapper .overtype-preview h2,
    .overtype-wrapper .overtype-preview h3 {
      font-size: inherit !important;
      font-weight: bold !important;
      margin: 0 !important;
      padding: 0 !important;
      display: inline !important;
      line-height: inherit !important;
    }

    /* Header colors for semantic headers */
    .overtype-wrapper .overtype-preview h1 { 
      color: var(--h1, #f95738) !important; 
    }
    .overtype-wrapper .overtype-preview h2 { 
      color: var(--h2, #ee964b) !important; 
    }
    .overtype-wrapper .overtype-preview h3 { 
      color: var(--h3, #3d8a51) !important; 
    }

    /* Lists - remove styling in edit mode */
    .overtype-wrapper .overtype-preview ul,
    .overtype-wrapper .overtype-preview ol {
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important; /* Lists need to be block for line breaks */
    }

    .overtype-wrapper .overtype-preview li {
      display: block !important; /* Each item on its own line */
      margin: 0 !important;
      padding: 0 !important;
      /* Don't set list-style here - let ul/ol control it */
    }

    /* Bold text */
    .overtype-wrapper .overtype-preview strong {
      color: var(--strong, #ee964b) !important;
      font-weight: bold !important;
    }

    /* Italic text */
    .overtype-wrapper .overtype-preview em {
      color: var(--em, #f95738) !important;
      text-decoration-color: var(--em, #f95738) !important;
      text-decoration-thickness: 1px !important;
      font-style: italic !important;
    }

    /* Strikethrough text */
    .overtype-wrapper .overtype-preview del {
      color: var(--del, #ee964b) !important;
      text-decoration: line-through !important;
      text-decoration-color: var(--del, #ee964b) !important;
      text-decoration-thickness: 1px !important;
    }

    /* Inline code */
    .overtype-wrapper .overtype-preview code {
      background: var(--code-bg, rgba(244, 211, 94, 0.4)) !important;
      color: var(--code, #0d3b66) !important;
      padding: 0 !important;
      border-radius: 2px !important;
      font-family: inherit !important;
      font-size: inherit !important;
      line-height: inherit !important;
      font-weight: normal !important;
    }

    /* Code blocks - consolidated pre blocks */
    .overtype-wrapper .overtype-preview pre {
      padding: 0 !important;
      margin: 0 !important;
      border-radius: 4px !important;
      overflow-x: auto !important;
    }
    
    /* Code block styling in normal mode - yellow background */
    .overtype-wrapper .overtype-preview pre.code-block {
      background: var(--code-bg, rgba(244, 211, 94, 0.4)) !important;
    }

    /* Code inside pre blocks - remove background */
    .overtype-wrapper .overtype-preview pre code {
      background: transparent !important;
      color: var(--code, #0d3b66) !important;
    }

    /* Blockquotes */
    .overtype-wrapper .overtype-preview .blockquote {
      color: var(--blockquote, #5a7a9b) !important;
      padding: 0 !important;
      margin: 0 !important;
      border: none !important;
    }

    /* Links */
    .overtype-wrapper .overtype-preview a {
      color: var(--link, #0d3b66) !important;
      text-decoration: underline !important;
      font-weight: normal !important;
    }

    .overtype-wrapper .overtype-preview a:hover {
      text-decoration: underline !important;
      color: var(--link, #0d3b66) !important;
    }

    /* Lists - no list styling */
    .overtype-wrapper .overtype-preview ul,
    .overtype-wrapper .overtype-preview ol {
      list-style: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }


    /* Horizontal rules */
    .overtype-wrapper .overtype-preview hr {
      border: none !important;
      color: var(--hr, #5a7a9b) !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .overtype-wrapper .overtype-preview .hr-marker {
      color: var(--hr, #5a7a9b) !important;
      opacity: 0.6 !important;
    }

    /* Code fence markers - with background when not in code block */
    .overtype-wrapper .overtype-preview .code-fence {
      color: var(--code, #0d3b66) !important;
      background: var(--code-bg, rgba(244, 211, 94, 0.4)) !important;
    }
    
    /* Code block lines - background for entire code block */
    .overtype-wrapper .overtype-preview .code-block-line {
      background: var(--code-bg, rgba(244, 211, 94, 0.4)) !important;
    }
    
    /* Remove background from code fence when inside code block line */
    .overtype-wrapper .overtype-preview .code-block-line .code-fence {
      background: transparent !important;
    }

    /* Raw markdown line */
    .overtype-wrapper .overtype-preview .raw-line {
      color: var(--raw-line, #5a7a9b) !important;
      font-style: normal !important;
      font-weight: normal !important;
    }

    /* Syntax markers */
    .overtype-wrapper .overtype-preview .syntax-marker {
      color: var(--syntax-marker, rgba(13, 59, 102, 0.52)) !important;
      opacity: 0.7 !important;
    }

    /* List markers */
    .overtype-wrapper .overtype-preview .list-marker {
      color: var(--list-marker, #ee964b) !important;
    }

    /* Stats bar */
    
    /* Stats bar - positioned by grid, not absolute */
    .overtype-stats {
      height: 40px !important;
      padding: 0 20px !important;
      background: #f8f9fa !important;
      border-top: 1px solid #e0e0e0 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 0.85rem !important;
      color: #666 !important;
      grid-row: 3 !important; /* Always third row in grid */
    }
    
    /* Dark theme stats bar */
    .overtype-container[data-theme="cave"] .overtype-stats {
      background: var(--bg-secondary, #1D2D3E) !important;
      border-top: 1px solid rgba(197, 221, 232, 0.1) !important;
      color: var(--text, #c5dde8) !important;
    }
    
    .overtype-stats .overtype-stat {
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
      white-space: nowrap !important;
    }
    
    .overtype-stats .live-dot {
      width: 8px !important;
      height: 8px !important;
      background: #4caf50 !important;
      border-radius: 50% !important;
      animation: overtype-pulse 2s infinite !important;
    }
    
    @keyframes overtype-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.2); }
    }
    

    /* Toolbar Styles */
    .overtype-toolbar {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      padding: 8px !important; /* Override reset */
      background: var(--toolbar-bg, var(--bg-primary, #f8f9fa)) !important; /* Override reset */
      overflow-x: auto !important; /* Allow horizontal scrolling */
      overflow-y: hidden !important; /* Hide vertical overflow */
      -webkit-overflow-scrolling: touch !important;
      flex-shrink: 0 !important;
      height: auto !important;
      grid-row: 1 !important; /* Always first row in grid */
      position: relative !important; /* Override reset */
      z-index: 100 !important; /* Ensure toolbar is above wrapper */
      scrollbar-width: thin; /* Thin scrollbar on Firefox */
    }
    
    /* Thin scrollbar styling */
    .overtype-toolbar::-webkit-scrollbar {
      height: 4px;
    }
    
    .overtype-toolbar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .overtype-toolbar::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }

    .overtype-toolbar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--toolbar-icon, var(--text-secondary, #666));
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .overtype-toolbar-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .overtype-toolbar-button:hover {
      background: var(--toolbar-hover, var(--bg-secondary, #e9ecef));
      color: var(--toolbar-icon, var(--text-primary, #333));
    }

    .overtype-toolbar-button:active {
      transform: scale(0.95);
    }

    .overtype-toolbar-button.active {
      background: var(--toolbar-active, var(--primary, #007bff));
      color: var(--toolbar-icon, var(--text-primary, #333));
    }

    .overtype-toolbar-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .overtype-toolbar-separator {
      width: 1px;
      height: 24px;
      background: var(--border, #e0e0e0);
      margin: 0 4px;
      flex-shrink: 0;
    }

    /* Adjust wrapper when toolbar is present */
    .overtype-container .overtype-toolbar + .overtype-wrapper {
    }

    /* Mobile toolbar adjustments */
    @media (max-width: 640px) {
      .overtype-toolbar {
        padding: 6px;
        gap: 2px;
      }

      .overtype-toolbar-button {
        width: 36px;
        height: 36px;
      }

      .overtype-toolbar-separator {
        margin: 0 2px;
      }
    }
    
    /* Plain mode - hide preview and show textarea text */
    .overtype-container.plain-mode .overtype-preview {
      display: none !important;
    }
    
    .overtype-container.plain-mode .overtype-input {
      color: var(--text, #0d3b66) !important;
      /* Use system font stack for better plain text readability */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                   "Helvetica Neue", Arial, sans-serif !important;
    }
    
    /* Ensure textarea remains transparent in overlay mode */
    .overtype-container:not(.plain-mode) .overtype-input {
      color: transparent !important;
    }

    /* Dropdown menu styles */
    .overtype-toolbar-button {
      position: relative !important; /* Override reset - needed for dropdown */
    }

    .overtype-toolbar-button.dropdown-active {
      background: var(--toolbar-active, var(--hover-bg, #f0f0f0));
    }

    .overtype-dropdown-menu {
      position: fixed !important; /* Fixed positioning relative to viewport */
      background: var(--bg-secondary, white) !important; /* Override reset */
      border: 1px solid var(--border, #e0e0e0) !important; /* Override reset */
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important; /* Override reset */
      z-index: 10000; /* Very high z-index to ensure visibility */
      min-width: 150px;
      padding: 4px 0 !important; /* Override reset */
      /* Position will be set via JavaScript based on button position */
    }

    .overtype-dropdown-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 8px 12px;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      color: var(--text, #333);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .overtype-dropdown-item:hover {
      background: var(--hover-bg, #f0f0f0);
    }

    .overtype-dropdown-item.active {
      font-weight: 600;
    }

    .overtype-dropdown-check {
      width: 16px;
      margin-right: 8px;
      color: var(--h1, #007bff);
    }

    /* Preview mode styles */
    .overtype-container.preview-mode .overtype-input {
      display: none !important;
    }

    .overtype-container.preview-mode .overtype-preview {
      pointer-events: auto !important;
      user-select: text !important;
      cursor: text !important;
    }

    /* Hide syntax markers in preview mode */
    .overtype-container.preview-mode .syntax-marker {
      display: none !important;
    }
    
    /* Hide URL part of links in preview mode - extra specificity */
    .overtype-container.preview-mode .syntax-marker.url-part,
    .overtype-container.preview-mode .url-part {
      display: none !important;
    }
    
    /* Hide all syntax markers inside links too */
    .overtype-container.preview-mode a .syntax-marker {
      display: none !important;
    }

    /* Headers - restore proper sizing in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h1, 
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h2, 
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h3 {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 600 !important;
      margin: 0 !important;
      display: block !important;
      color: inherit !important; /* Use parent text color */
      line-height: 1 !important; /* Tight line height for headings */
    }
    
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h1 { 
      font-size: 2em !important; 
    }
    
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h2 { 
      font-size: 1.5em !important; 
    }
    
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview h3 { 
      font-size: 1.17em !important; 
    }

    /* Lists - restore list styling in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview ul {
      display: block !important;
      list-style: disc !important;
      padding-left: 2em !important;
      margin: 1em 0 !important;
    }

    .overtype-container.preview-mode .overtype-wrapper .overtype-preview ol {
      display: block !important;
      list-style: decimal !important;
      padding-left: 2em !important;
      margin: 1em 0 !important;
    }
    
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview li {
      display: list-item !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Links - make clickable in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview a {
      pointer-events: auto !important;
      cursor: pointer !important;
      color: var(--link, #0066cc) !important;
      text-decoration: underline !important;
    }

    /* Code blocks - proper pre/code styling in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview pre.code-block {
      background: #2d2d2d !important;
      color: #f8f8f2 !important;
      padding: 1.2em !important;
      border-radius: 3px !important;
      overflow-x: auto !important;
      margin: 0 !important;
      display: block !important;
    }
    
    /* Cave theme code block background in preview mode */
    .overtype-container[data-theme="cave"].preview-mode .overtype-wrapper .overtype-preview pre.code-block {
      background: #11171F !important;
    }

    .overtype-container.preview-mode .overtype-wrapper .overtype-preview pre.code-block code {
      background: transparent !important;
      color: inherit !important;
      padding: 0 !important;
      font-family: ${r} !important;
      font-size: 0.9em !important;
      line-height: 1.4 !important;
    }

    /* Hide old code block lines and fences in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview .code-block-line {
      display: none !important;
    }

    .overtype-container.preview-mode .overtype-wrapper .overtype-preview .code-fence {
      display: none !important;
    }

    /* Blockquotes - enhanced styling in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview .blockquote {
      display: block !important;
      border-left: 4px solid var(--blockquote, #ddd) !important;
      padding-left: 1em !important;
      margin: 1em 0 !important;
      font-style: italic !important;
    }

    /* Typography improvements in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview {
      font-family: Georgia, 'Times New Roman', serif !important;
      font-size: 16px !important;
      line-height: 1.8 !important;
      color: var(--text, #333) !important; /* Consistent text color */
    }

    /* Inline code in preview mode - keep monospace */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview code {
      font-family: ${r} !important;
      font-size: 0.9em !important;
      background: rgba(135, 131, 120, 0.15) !important;
      padding: 0.2em 0.4em !important;
      border-radius: 3px !important;
    }

    /* Strong and em elements in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview strong {
      font-weight: 700 !important;
      color: inherit !important; /* Use parent text color */
    }

    .overtype-container.preview-mode .overtype-wrapper .overtype-preview em {
      font-style: italic !important;
      color: inherit !important; /* Use parent text color */
    }

    /* HR in preview mode */
    .overtype-container.preview-mode .overtype-wrapper .overtype-preview .hr-marker {
      display: block !important;
      border-top: 2px solid var(--hr, #ddd) !important;
      text-indent: -9999px !important;
      height: 2px !important;
    }

    ${l}
  `}var it=`<svg viewBox="0 0 18 18">
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path>
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path>
</svg>`,st=`<svg viewBox="0 0 18 18">
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7" x2="13" y1="4" y2="4"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="11" y1="14" y2="14"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8" x2="10" y1="14" y2="4"></line>
</svg>`,at=`<svg viewBox="0 0 18 18">
  <path fill="currentColor" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"></path>
</svg>`,lt=`<svg viewBox="0 0 18 18">
  <path fill="currentColor" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"></path>
</svg>`,ct=`<svg viewBox="0 0 18 18">
  <path fill="currentColor" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"></path>
</svg>`,pt=`<svg viewBox="0 0 18 18">
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7" x2="11" y1="7" y2="11"></line>
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
</svg>`,dt=`<svg viewBox="0 0 18 18">
  <polyline stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="5 7 3 9 5 11"></polyline>
  <polyline stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" points="13 7 15 9 13 11"></polyline>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10" x2="8" y1="5" y2="13"></line>
</svg>`,ut=`<svg viewBox="0 0 18 18">
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6" x2="15" y1="4" y2="4"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6" x2="15" y1="9" y2="9"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6" x2="15" y1="14" y2="14"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="3" y1="4" y2="4"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="3" y1="9" y2="9"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="3" y1="14" y2="14"></line>
</svg>`,ht=`<svg viewBox="0 0 18 18">
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7" x2="15" y1="4" y2="4"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7" x2="15" y1="9" y2="9"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7" x2="15" y1="14" y2="14"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line>
  <path fill="currentColor" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path>
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path>
  <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path>
</svg>`,mt=`<svg viewBox="2 2 20 20">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 10.8182L9 10.8182C8.80222 10.8182 8.60888 10.7649 8.44443 10.665C8.27998 10.5651 8.15181 10.4231 8.07612 10.257C8.00043 10.0909 7.98063 9.90808 8.01922 9.73174C8.0578 9.55539 8.15304 9.39341 8.29289 9.26627C8.43275 9.13913 8.61093 9.05255 8.80491 9.01747C8.99889 8.98239 9.19996 9.00039 9.38268 9.0692C9.56541 9.13801 9.72159 9.25453 9.83147 9.40403C9.94135 9.55353 10 9.72929 10 9.90909L10 12.1818C10 12.664 9.78929 13.1265 9.41421 13.4675C9.03914 13.8084 8.53043 14 8 14"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.8182L15 10.8182C14.8022 10.8182 14.6089 10.7649 14.4444 10.665C14.28 10.5651 14.1518 10.4231 14.0761 10.257C14.0004 10.0909 13.9806 9.90808 14.0192 9.73174C14.0578 9.55539 14.153 9.39341 14.2929 9.26627C14.4327 9.13913 14.6109 9.05255 14.8049 9.01747C14.9989 8.98239 15.2 9.00039 15.3827 9.0692C15.5654 9.13801 15.7216 9.25453 15.8315 9.40403C15.9414 9.55353 16 9.72929 16 9.90909L16 12.1818C16 12.664 15.7893 13.1265 15.4142 13.4675C15.0391 13.8084 14.5304 14 14 14"></path>
</svg>`,ft=`<svg viewBox="0 0 18 18">
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8" x2="16" y1="4" y2="4"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8" x2="16" y1="9" y2="9"></line>
  <line stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8" x2="16" y1="14" y2="14"></line>
  <rect stroke="currentColor" fill="none" stroke-width="1.5" x="2" y="3" width="3" height="3" rx="0.5"></rect>
  <rect stroke="currentColor" fill="none" stroke-width="1.5" x="2" y="13" width="3" height="3" rx="0.5"></rect>
  <polyline stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" points="2.65 9.5 3.5 10.5 5 8.5"></polyline>
</svg>`,vt=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none"></path>
  <circle cx="12" cy="12" r="3" fill="none"></circle>
</svg>`,gt=class{constructor(t,e=null){this.editor=t,this.container=null,this.buttons={},this.buttonConfig=e}create(){var t;this.container=document.createElement("div"),this.container.className="overtype-toolbar",this.container.setAttribute("role","toolbar"),this.container.setAttribute("aria-label","Text formatting"),((t=this.buttonConfig)!=null?t:[{name:"bold",icon:it,title:"Bold (Ctrl+B)",action:"toggleBold"},{name:"italic",icon:st,title:"Italic (Ctrl+I)",action:"toggleItalic"},{separator:!0},{name:"h1",icon:at,title:"Heading 1",action:"insertH1"},{name:"h2",icon:lt,title:"Heading 2",action:"insertH2"},{name:"h3",icon:ct,title:"Heading 3",action:"insertH3"},{separator:!0},{name:"link",icon:pt,title:"Insert Link (Ctrl+K)",action:"insertLink"},{name:"code",icon:dt,title:"Code (Ctrl+`)",action:"toggleCode"},{separator:!0},{name:"quote",icon:mt,title:"Quote",action:"toggleQuote"},{separator:!0},{name:"bulletList",icon:ut,title:"Bullet List",action:"toggleBulletList"},{name:"orderedList",icon:ht,title:"Numbered List",action:"toggleNumberedList"},{name:"taskList",icon:ft,title:"Task List",action:"toggleTaskList"},{separator:!0},{name:"viewMode",icon:vt,title:"View mode",action:"toggle-view-menu",hasDropdown:!0}]).forEach(o=>{if(o.separator){const i=document.createElement("div");i.className="overtype-toolbar-separator",i.setAttribute("role","separator"),this.container.appendChild(i)}else{const i=this.createButton(o);this.buttons[o.name]=i,this.container.appendChild(i)}});const n=this.editor.element.querySelector(".overtype-container"),r=this.editor.element.querySelector(".overtype-wrapper");return n&&r&&n.insertBefore(this.container,r),this.container}createButton(t){const e=document.createElement("button");return e.className="overtype-toolbar-button",e.type="button",e.title=t.title,e.setAttribute("aria-label",t.title),e.setAttribute("data-action",t.action),e.innerHTML=t.icon,t.hasDropdown&&(e.classList.add("has-dropdown"),t.name==="viewMode"&&(this.viewModeButton=e)),e.addEventListener("click",n=>{n.preventDefault(),this.handleAction(t.action,e)}),e}async handleAction(t,e){const n=this.editor.textarea;if(n){if(t==="toggle-view-menu"){this.toggleViewDropdown(e);return}n.focus();try{switch(t){case"toggleBold":le(n);break;case"toggleItalic":ce(n);break;case"insertH1":Ye(n);break;case"insertH2":et(n);break;case"insertH3":tt(n);break;case"insertLink":pe(n);break;case"toggleCode":Qe(n);break;case"toggleBulletList":de(n);break;case"toggleNumberedList":ue(n);break;case"toggleQuote":Je(n);break;case"toggleTaskList":Xe(n);break;case"toggle-plain":const r=this.editor.container.classList.contains("plain-mode");this.editor.showPlainTextarea(!r);break}n.dispatchEvent(new Event("input",{bubbles:!0}))}catch(r){console.error("Error loading markdown-actions:",r)}}}async updateButtonStates(){const t=this.editor.textarea;if(t)try{const e=nt(t);Object.entries(this.buttons).forEach(([n,r])=>{let o=!1;switch(n){case"bold":o=e.includes("bold");break;case"italic":o=e.includes("italic");break;case"code":o=!1;break;case"bulletList":o=e.includes("bullet-list");break;case"orderedList":o=e.includes("numbered-list");break;case"quote":o=e.includes("quote");break;case"taskList":o=e.includes("task-list");break;case"h1":o=e.includes("header");break;case"h2":o=e.includes("header-2");break;case"h3":o=e.includes("header-3");break;case"togglePlain":o=!this.editor.container.classList.contains("plain-mode");break}r.classList.toggle("active",o),r.setAttribute("aria-pressed",o.toString())})}catch{}}toggleViewDropdown(t){const e=document.querySelector(".overtype-dropdown-menu");if(e){e.remove(),t.classList.remove("dropdown-active"),document.removeEventListener("click",this.handleDocumentClick);return}const n=this.createViewDropdown(),r=t.getBoundingClientRect();n.style.top=`${r.bottom+4}px`,n.style.left=`${r.left}px`,document.body.appendChild(n),t.classList.add("dropdown-active"),this.handleDocumentClick=o=>{!t.contains(o.target)&&!n.contains(o.target)&&(n.remove(),t.classList.remove("dropdown-active"),document.removeEventListener("click",this.handleDocumentClick))},setTimeout(()=>{document.addEventListener("click",this.handleDocumentClick)},0)}createViewDropdown(){const t=document.createElement("div");t.className="overtype-dropdown-menu";const e=this.editor.container.classList.contains("plain-mode"),r=this.editor.container.classList.contains("preview-mode")?"preview":e?"plain":"normal";return[{id:"normal",label:"Normal Edit",icon:"✓"},{id:"plain",label:"Plain Textarea",icon:"✓"},{id:"preview",label:"Preview Mode",icon:"✓"}].forEach(i=>{const s=document.createElement("button");s.className="overtype-dropdown-item",s.type="button";const l=document.createElement("span");l.className="overtype-dropdown-check",l.textContent=r===i.id?i.icon:"";const a=document.createElement("span");a.textContent=i.label,s.appendChild(l),s.appendChild(a),r===i.id&&s.classList.add("active"),s.addEventListener("click",p=>{p.stopPropagation(),this.setViewMode(i.id),t.remove(),this.viewModeButton.classList.remove("dropdown-active"),document.removeEventListener("click",this.handleDocumentClick)}),t.appendChild(s)}),t}setViewMode(t){switch(this.editor.container.classList.remove("plain-mode","preview-mode"),t){case"plain":this.editor.showPlainTextarea(!0);break;case"preview":this.editor.showPreviewMode(!0);break;default:this.editor.showPlainTextarea(!1),typeof this.editor.showPreviewMode=="function"&&this.editor.showPreviewMode(!1);break}}destroy(){this.container&&(this.handleDocumentClick&&document.removeEventListener("click",this.handleDocumentClick),this.container.remove(),this.container=null,this.buttons={})}},yt=class{constructor(t){this.editor=t,this.tooltip=null,this.currentLink=null,this.hideTimeout=null,this.init()}init(){CSS.supports("position-anchor: --x")&&CSS.supports("position-area: center")&&(this.createTooltip(),this.editor.textarea.addEventListener("selectionchange",()=>this.checkCursorPosition()),this.editor.textarea.addEventListener("keyup",e=>{(e.key.includes("Arrow")||e.key==="Home"||e.key==="End")&&this.checkCursorPosition()}),this.editor.textarea.addEventListener("input",()=>this.hide()),this.editor.textarea.addEventListener("scroll",()=>this.hide()),this.tooltip.addEventListener("mouseenter",()=>this.cancelHide()),this.tooltip.addEventListener("mouseleave",()=>this.scheduleHide()))}createTooltip(){this.tooltip=document.createElement("div"),this.tooltip.className="overtype-link-tooltip";const t=document.createElement("style");t.textContent=`
      @supports (position-anchor: --x) and (position-area: center) {
        .overtype-link-tooltip {
          position: absolute;
          position-anchor: var(--target-anchor, --link-0);
          position-area: block-end center;
          margin-top: 8px !important;
          
          background: #333 !important;
          color: white !important;
          padding: 6px 10px !important;
          border-radius: 16px !important;
          font-size: 12px !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
          display: none !important;
          z-index: 10000 !important;
          cursor: pointer !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
          max-width: 300px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          
          position-try: most-width block-end inline-end, flip-inline, block-start center;
          position-visibility: anchors-visible;
        }
        
        .overtype-link-tooltip.visible {
          display: flex !important;
        }
      }
    `,document.head.appendChild(t),this.tooltip.innerHTML=`
      <span style="display: flex; align-items: center; gap: 6px;">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" style="flex-shrink: 0;">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
        <span class="overtype-link-tooltip-url"></span>
      </span>
    `,this.tooltip.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),this.currentLink&&(window.open(this.currentLink.url,"_blank"),this.hide())}),this.editor.container.appendChild(this.tooltip)}checkCursorPosition(){const t=this.editor.textarea.selectionStart,e=this.editor.textarea.value,n=this.findLinkAtPosition(e,t);n?(!this.currentLink||this.currentLink.url!==n.url||this.currentLink.index!==n.index)&&this.show(n):this.scheduleHide()}findLinkAtPosition(t,e){const n=/\[([^\]]+)\]\(([^)]+)\)/g;let r,o=0;for(;(r=n.exec(t))!==null;){const i=r.index,s=r.index+r[0].length;if(e>=i&&e<=s)return{text:r[1],url:r[2],index:o,start:i,end:s};o++}return null}show(t){this.currentLink=t,this.cancelHide();const e=this.tooltip.querySelector(".overtype-link-tooltip-url");e.textContent=t.url,this.tooltip.style.setProperty("--target-anchor",`--link-${t.index}`),this.tooltip.classList.add("visible")}hide(){this.tooltip.classList.remove("visible"),this.currentLink=null}scheduleHide(){this.cancelHide(),this.hideTimeout=setTimeout(()=>this.hide(),300)}cancelHide(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}destroy(){this.cancelHide(),this.tooltip&&this.tooltip.parentNode&&this.tooltip.parentNode.removeChild(this.tooltip),this.tooltip=null,this.currentLink=null}},_=class w{constructor(e,n={}){let r;if(typeof e=="string"){if(r=document.querySelectorAll(e),r.length===0)throw new Error(`No elements found for selector: ${e}`);r=Array.from(r)}else if(e instanceof Element)r=[e];else if(e instanceof NodeList)r=Array.from(e);else if(Array.isArray(e))r=e;else throw new Error("Invalid target: must be selector string, Element, NodeList, or Array");return r.map(i=>{if(i.overTypeInstance)return i.overTypeInstance.reinit(n),i.overTypeInstance;const s=Object.create(w.prototype);return s._init(i,n),i.overTypeInstance=s,w.instances.set(i,s),s})}_init(e,n={}){this.element=e,this.instanceTheme=n.theme||null,this.options=this._mergeOptions(n),this.instanceId=++w.instanceCount,this.initialized=!1,w.injectStyles(),w.initGlobalListeners();const r=e.querySelector(".overtype-container"),o=e.querySelector(".overtype-wrapper");if(r||o?this._recoverFromDOM(r,o):this._buildFromScratch(),this.shortcuts=new he(this),this.linkTooltip=new yt(this),this.options.toolbar){const i=typeof this.options.toolbar=="object"?this.options.toolbar.buttons:null;this.toolbar=new gt(this,i),this.toolbar.create(),this.textarea.addEventListener("selectionchange",()=>{this.toolbar.updateButtonStates()}),this.textarea.addEventListener("input",()=>{this.toolbar.updateButtonStates()})}this.initialized=!0,this.options.onChange&&this.options.onChange(this.getValue(),this)}_mergeOptions(e){const n={fontSize:"14px",lineHeight:1.6,fontFamily:'"SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", Consolas, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Ubuntu Mono", "DejaVu Sans Mono", "Liberation Mono", "Courier New", Courier, monospace',padding:"16px",mobile:{fontSize:"16px",padding:"12px",lineHeight:1.5},textareaProps:{},autofocus:!1,autoResize:!1,minHeight:"100px",maxHeight:null,placeholder:"Start typing...",value:"",onChange:null,onKeydown:null,showActiveLineRaw:!1,showStats:!1,toolbar:!1,statsFormatter:null,smartLists:!0},{theme:r,colors:o,...i}=e;return{...n,...i}}_recoverFromDOM(e,n){if(e&&e.classList.contains("overtype-container"))this.container=e,this.wrapper=e.querySelector(".overtype-wrapper");else if(n){this.wrapper=n,this.container=document.createElement("div"),this.container.className="overtype-container";const r=this.instanceTheme||w.currentTheme||$,o=typeof r=="string"?r:r.name;if(o&&this.container.setAttribute("data-theme",o),this.instanceTheme){const i=typeof this.instanceTheme=="string"?j(this.instanceTheme):this.instanceTheme;if(i&&i.colors){const s=F(i.colors);this.container.style.cssText+=s}}n.parentNode.insertBefore(this.container,n),this.container.appendChild(n)}if(!this.wrapper){e&&e.remove(),n&&n.remove(),this._buildFromScratch();return}if(this.textarea=this.wrapper.querySelector(".overtype-input"),this.preview=this.wrapper.querySelector(".overtype-preview"),!this.textarea||!this.preview){this.container.remove(),this._buildFromScratch();return}this.wrapper._instance=this,this.options.fontSize&&this.wrapper.style.setProperty("--instance-font-size",this.options.fontSize),this.options.lineHeight&&this.wrapper.style.setProperty("--instance-line-height",String(this.options.lineHeight)),this.options.padding&&this.wrapper.style.setProperty("--instance-padding",this.options.padding),this._configureTextarea(),this._applyOptions()}_buildFromScratch(){const e=this._extractContent();this.element.innerHTML="",this._createDOM(),(e||this.options.value)&&this.setValue(e||this.options.value),this._applyOptions()}_extractContent(){const e=this.element.querySelector(".overtype-input");return e?e.value:this.element.textContent||""}_createDOM(){this.container=document.createElement("div"),this.container.className="overtype-container";const e=this.instanceTheme||w.currentTheme||$,n=typeof e=="string"?e:e.name;if(n&&this.container.setAttribute("data-theme",n),this.instanceTheme){const r=typeof this.instanceTheme=="string"?j(this.instanceTheme):this.instanceTheme;if(r&&r.colors){const o=F(r.colors);this.container.style.cssText+=o}}this.wrapper=document.createElement("div"),this.wrapper.className="overtype-wrapper",this.options.fontSize&&this.wrapper.style.setProperty("--instance-font-size",this.options.fontSize),this.options.lineHeight&&this.wrapper.style.setProperty("--instance-line-height",String(this.options.lineHeight)),this.options.padding&&this.wrapper.style.setProperty("--instance-padding",this.options.padding),this.wrapper._instance=this,this.textarea=document.createElement("textarea"),this.textarea.className="overtype-input",this.textarea.placeholder=this.options.placeholder,this._configureTextarea(),this.options.textareaProps&&Object.entries(this.options.textareaProps).forEach(([r,o])=>{r==="className"||r==="class"?this.textarea.className+=" "+o:r==="style"&&typeof o=="object"?Object.assign(this.textarea.style,o):this.textarea.setAttribute(r,o)}),this.preview=document.createElement("div"),this.preview.className="overtype-preview",this.preview.setAttribute("aria-hidden","true"),this.wrapper.appendChild(this.textarea),this.wrapper.appendChild(this.preview),this.container.appendChild(this.wrapper),this.options.showStats&&(this.statsBar=document.createElement("div"),this.statsBar.className="overtype-stats",this.container.appendChild(this.statsBar),this._updateStats()),this.element.appendChild(this.container),window.location.pathname.includes("demo.html")&&console.log("_createDOM completed:",{elementId:this.element.id,autoResize:this.options.autoResize,containerClasses:this.container.className,hasStats:!!this.statsBar,hasToolbar:this.options.toolbar}),this.options.autoResize?this._setupAutoResize():(this.container.classList.remove("overtype-auto-resize"),window.location.pathname.includes("demo.html")&&console.log("Removed auto-resize class from:",this.element.id))}_configureTextarea(){this.textarea.setAttribute("autocomplete","off"),this.textarea.setAttribute("autocorrect","off"),this.textarea.setAttribute("autocapitalize","off"),this.textarea.setAttribute("spellcheck","false"),this.textarea.setAttribute("data-gramm","false"),this.textarea.setAttribute("data-gramm_editor","false"),this.textarea.setAttribute("data-enable-grammarly","false")}_applyOptions(){this.options.autofocus&&this.textarea.focus(),this.options.autoResize?this.container.classList.contains("overtype-auto-resize")||this._setupAutoResize():this.container.classList.remove("overtype-auto-resize"),this.updatePreview()}updatePreview(){const e=this.textarea.value,n=this.textarea.selectionStart,r=this._getCurrentLine(e,n),o=C.parse(e,r,this.options.showActiveLineRaw);this.preview.innerHTML=o||'<span style="color: #808080;">Start typing...</span>',this._applyCodeBlockBackgrounds(),this.options.showStats&&this.statsBar&&this._updateStats(),this.options.onChange&&this.initialized&&this.options.onChange(e,this)}_applyCodeBlockBackgrounds(){const e=this.preview.querySelectorAll(".code-fence");for(let n=0;n<e.length-1;n+=2){const r=e[n],o=e[n+1],i=r.parentElement,s=o.parentElement;!i||!s||(r.style.display="block",o.style.display="block",i.classList.add("code-block-line"),s.classList.add("code-block-line"))}}_getCurrentLine(e,n){return e.substring(0,n).split(`
`).length-1}handleInput(e){this.updatePreview()}handleKeydown(e){if(e.key==="Tab"){e.preventDefault();const r=this.textarea.selectionStart,o=this.textarea.selectionEnd,i=this.textarea.value;if(r!==o&&e.shiftKey){const s=i.substring(0,r),l=i.substring(r,o),a=i.substring(o),c=l.split(`
`).map(d=>d.replace(/^  /,"")).join(`
`);document.execCommand?(this.textarea.setSelectionRange(r,o),document.execCommand("insertText",!1,c)):(this.textarea.value=s+c+a,this.textarea.selectionStart=r,this.textarea.selectionEnd=r+c.length)}else if(r!==o){const s=i.substring(0,r),l=i.substring(r,o),a=i.substring(o),c=l.split(`
`).map(d=>"  "+d).join(`
`);document.execCommand?(this.textarea.setSelectionRange(r,o),document.execCommand("insertText",!1,c)):(this.textarea.value=s+c+a,this.textarea.selectionStart=r,this.textarea.selectionEnd=r+c.length)}else document.execCommand?document.execCommand("insertText",!1,"  "):(this.textarea.value=i.substring(0,r)+"  "+i.substring(o),this.textarea.selectionStart=this.textarea.selectionEnd=r+2);this.textarea.dispatchEvent(new Event("input",{bubbles:!0}));return}if(e.key==="Enter"&&!e.shiftKey&&!e.metaKey&&!e.ctrlKey&&this.options.smartLists&&this.handleSmartListContinuation()){e.preventDefault();return}!this.shortcuts.handleKeydown(e)&&this.options.onKeydown&&this.options.onKeydown(e,this)}handleSmartListContinuation(){const e=this.textarea,n=e.selectionStart,r=C.getListContext(e.value,n);return!r||!r.inList?!1:r.content.trim()===""&&n>=r.markerEndPos?(this.deleteListMarker(r),!0):(n>r.markerEndPos&&n<r.lineEnd?this.splitListItem(r,n):this.insertNewListItem(r),r.listType==="numbered"&&this.scheduleNumberedListUpdate(),!0)}deleteListMarker(e){this.textarea.setSelectionRange(e.lineStart,e.markerEndPos),document.execCommand("delete"),this.textarea.dispatchEvent(new Event("input",{bubbles:!0}))}insertNewListItem(e){const n=C.createNewListItem(e);document.execCommand("insertText",!1,`
`+n),this.textarea.dispatchEvent(new Event("input",{bubbles:!0}))}splitListItem(e,n){const r=e.content.substring(n-e.markerEndPos);this.textarea.setSelectionRange(n,e.lineEnd),document.execCommand("delete");const o=C.createNewListItem(e);document.execCommand("insertText",!1,`
`+o+r);const i=this.textarea.selectionStart-r.length;this.textarea.setSelectionRange(i,i),this.textarea.dispatchEvent(new Event("input",{bubbles:!0}))}scheduleNumberedListUpdate(){this.numberUpdateTimeout&&clearTimeout(this.numberUpdateTimeout),this.numberUpdateTimeout=setTimeout(()=>{this.updateNumberedLists()},10)}updateNumberedLists(){const e=this.textarea.value,n=this.textarea.selectionStart,r=C.renumberLists(e);if(r!==e){let o=0;const i=e.split(`
`),s=r.split(`
`);let l=0;for(let p=0;p<i.length&&l<n;p++){if(i[p]!==s[p]){const c=s[p].length-i[p].length;l+i[p].length<n&&(o+=c)}l+=i[p].length+1}this.textarea.value=r;const a=n+o;this.textarea.setSelectionRange(a,a),this.textarea.dispatchEvent(new Event("input",{bubbles:!0}))}}handleScroll(e){this.preview.scrollTop=this.textarea.scrollTop,this.preview.scrollLeft=this.textarea.scrollLeft}getValue(){return this.textarea.value}setValue(e){this.textarea.value=e,this.updatePreview(),this.options.autoResize&&this._updateAutoHeight()}getRenderedHTML(e={}){const n=this.getValue();let r=C.parse(n);return e.cleanHTML&&(r=r.replace(/<span class="syntax-marker[^"]*">.*?<\/span>/g,""),r=r.replace(/\sclass="(bullet-list|ordered-list|code-fence|hr-marker|blockquote|url-part)"/g,""),r=r.replace(/\sclass=""/g,"")),r}getPreviewHTML(){return this.preview.innerHTML}getCleanHTML(){return this.getRenderedHTML({cleanHTML:!0})}focus(){this.textarea.focus()}blur(){this.textarea.blur()}isInitialized(){return this.initialized}reinit(e={}){this.options=this._mergeOptions({...this.options,...e}),this._applyOptions(),this.updatePreview()}_updateStats(){if(!this.statsBar)return;const e=this.textarea.value,n=e.split(`
`),r=e.length,o=e.split(/\s+/).filter(c=>c.length>0).length,i=this.textarea.selectionStart,l=e.substring(0,i).split(`
`),a=l.length,p=l[l.length-1].length+1;this.options.statsFormatter?this.statsBar.innerHTML=this.options.statsFormatter({chars:r,words:o,lines:n.length,line:a,column:p}):this.statsBar.innerHTML=`
          <div class="overtype-stat">
            <span class="live-dot"></span>
            <span>${r} chars, ${o} words, ${n.length} lines</span>
          </div>
          <div class="overtype-stat">Line ${a}, Col ${p}</div>
        `}_setupAutoResize(){this.container.classList.add("overtype-auto-resize"),this.previousHeight=null,this._updateAutoHeight(),this.textarea.addEventListener("input",()=>this._updateAutoHeight()),window.addEventListener("resize",()=>this._updateAutoHeight())}_updateAutoHeight(){if(!this.options.autoResize)return;const e=this.textarea,n=this.preview,r=this.wrapper,o=window.getComputedStyle(e);parseFloat(o.paddingTop),parseFloat(o.paddingBottom);const i=e.scrollTop;e.style.setProperty("height","auto","important");let s=e.scrollHeight;if(this.options.minHeight){const p=parseInt(this.options.minHeight);s=Math.max(s,p)}let l="hidden";if(this.options.maxHeight){const p=parseInt(this.options.maxHeight);s>p&&(s=p,l="auto")}const a=s+"px";e.style.setProperty("height",a,"important"),e.style.setProperty("overflow-y",l,"important"),n.style.setProperty("height",a,"important"),n.style.setProperty("overflow-y",l,"important"),r.style.setProperty("height",a,"important"),e.scrollTop=i,n.scrollTop=i,this.previousHeight!==s&&(this.previousHeight=s)}showStats(e){this.options.showStats=e,e&&!this.statsBar?(this.statsBar=document.createElement("div"),this.statsBar.className="overtype-stats",this.container.appendChild(this.statsBar),this._updateStats()):!e&&this.statsBar&&(this.statsBar.remove(),this.statsBar=null)}showPlainTextarea(e){if(e?this.container.classList.add("plain-mode"):this.container.classList.remove("plain-mode"),this.toolbar){const n=this.container.querySelector('[data-action="toggle-plain"]');n&&(n.classList.toggle("active",!e),n.title=e?"Show markdown preview":"Show plain textarea")}return e}showPreviewMode(e){return e?this.container.classList.add("preview-mode"):this.container.classList.remove("preview-mode"),e}destroy(){if(this.element.overTypeInstance=null,w.instances.delete(this.element),this.shortcuts&&this.shortcuts.destroy(),this.wrapper){const e=this.getValue();this.wrapper.remove(),this.element.textContent=e}this.initialized=!1}static init(e,n={}){return new w(e,n)}static getInstance(e){return e.overTypeInstance||w.instances.get(e)||null}static destroyAll(){document.querySelectorAll("[data-overtype-instance]").forEach(n=>{const r=w.getInstance(n);r&&r.destroy()})}static injectStyles(e=!1){if(w.stylesInjected&&!e)return;const n=document.querySelector("style.overtype-styles");n&&n.remove();const r=w.currentTheme||$,o=ot({theme:r}),i=document.createElement("style");i.className="overtype-styles",i.textContent=o,document.head.appendChild(i),w.stylesInjected=!0}static setTheme(e,n=null){let r=typeof e=="string"?j(e):e;n&&(r=rt(r,n)),w.currentTheme=r,w.injectStyles(!0),document.querySelectorAll(".overtype-container").forEach(o=>{const i=typeof r=="string"?r:r.name;i&&o.setAttribute("data-theme",i)}),document.querySelectorAll(".overtype-wrapper").forEach(o=>{if(!o.closest(".overtype-container")){const s=typeof r=="string"?r:r.name;s&&o.setAttribute("data-theme",s)}const i=o._instance;i&&i.updatePreview()})}static initGlobalListeners(){w.globalListenersInitialized||(document.addEventListener("input",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("overtype-input")){const n=e.target.closest(".overtype-wrapper"),r=n?._instance;r&&r.handleInput(e)}}),document.addEventListener("keydown",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("overtype-input")){const n=e.target.closest(".overtype-wrapper"),r=n?._instance;r&&r.handleKeydown(e)}}),document.addEventListener("scroll",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("overtype-input")){const n=e.target.closest(".overtype-wrapper"),r=n?._instance;r&&r.handleScroll(e)}},!0),document.addEventListener("selectionchange",e=>{const n=document.activeElement;if(n&&n.classList.contains("overtype-input")){const r=n.closest(".overtype-wrapper"),o=r?._instance;o&&(o.options.showStats&&o.statsBar&&o._updateStats(),clearTimeout(o._selectionTimeout),o._selectionTimeout=setTimeout(()=>{o.updatePreview()},50))}}),w.globalListenersInitialized=!0)}};I(_,"instances",new WeakMap);I(_,"stylesInjected",!1);I(_,"globalListenersInitialized",!1);I(_,"instanceCount",0);var z=_;z.MarkdownParser=C;z.ShortcutsManager=he;z.themes={solar:$,cave:j("cave")};z.getTheme=j;z.currentTheme=$;const R="size-5 -me-0.5 fill-(--callout-color) text-fd-card",bt=H.forwardRef(({className:t,children:e,title:n,type:r="info",icon:o,...i},s)=>(r==="warn"&&(r="warning"),r==="tip"&&(r="info"),b.jsxs("div",{ref:s,className:xe("flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md",t),...i,style:{"--callout-color":`var(--color-fd-${r}, var(--color-fd-muted))`,...i.style},children:[b.jsx("div",{role:"none",className:"w-0.5 bg-(--callout-color)/50 rounded-sm"}),o??{info:b.jsx(ke,{className:R}),warning:b.jsx(we,{className:R}),error:b.jsx(be,{className:R}),success:b.jsx(ye,{className:R})}[r],b.jsxs("div",{className:"flex flex-col gap-2 min-w-0 flex-1",children:[n&&b.jsx("p",{className:"font-medium !my-0",children:n}),b.jsx("div",{className:"text-fd-muted-foreground prose-no-margin empty:hidden",children:e})]})]})));bt.displayName="Callout";H.createContext(null);H.createContext(null);export{Ce as E,He as I,Lt as M,z as O,Me as P,D as a,Ne as b,Pe as c,$e as d,Te as e,Ee as f};
