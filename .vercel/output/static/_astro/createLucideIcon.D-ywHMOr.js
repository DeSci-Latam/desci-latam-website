import{r as a,R as C}from"./index.CMQ3OGCn.js";import{b as g,u as m}from"./index.ws-AkMl3.js";var w=C.useId||(()=>{}),b=0;function y(e){const[t,o]=a.useState(w());return g(()=>{e||o(r=>r??String(b++))},[e]),e||(t?`radix-${t}`:"")}function L({prop:e,defaultProp:t,onChange:o=()=>{}}){const[r,s]=h({defaultProp:t,onChange:o}),n=e!==void 0,l=n?e:r,u=m(o),f=a.useCallback(c=>{if(n){const d=typeof c=="function"?c(e):c;d!==e&&u(d)}else s(c)},[n,e,s,u]);return[l,f]}function h({defaultProp:e,onChange:t}){const o=a.useState(e),[r]=o,s=a.useRef(r),n=m(t);return a.useEffect(()=>{s.current!==r&&(n(r),s.current=r)},[r,s,n]),o}/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),v=(...e)=>e.filter((t,o,r)=>!!t&&r.indexOf(t)===o).join(" ");/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:s="",children:n,iconNode:l,...u},f)=>a.createElement("svg",{ref:f,...k,width:t,height:t,stroke:e,strokeWidth:r?Number(o)*24/Number(t):o,className:v("lucide",s),...u},[...l.map(([c,i])=>a.createElement(c,i)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=(e,t)=>{const o=a.forwardRef(({className:r,...s},n)=>a.createElement(S,{ref:n,iconNode:t,className:v(`lucide-${R(e)}`,r),...s}));return o.displayName=`${e}`,o};export{y as a,$ as c,L as u};
