import{r as i}from"./index.CMQ3OGCn.js";import{u as m,a as h}from"./index.ws-AkMl3.js";import{u as g,P as R,d as _}from"./index.BUSt7gCi.js";import{j as x}from"./jsx-runtime.SN7vRHW2.js";function U(n,e=globalThis?.document){const t=m(n);i.useEffect(()=>{const o=s=>{s.key==="Escape"&&t(s)};return e.addEventListener("keydown",o,{capture:!0}),()=>e.removeEventListener("keydown",o,{capture:!0})},[t,e])}var j="DismissableLayer",p="dismissableLayer.update",z="dismissableLayer.pointerDownOutside",H="dismissableLayer.focusOutside",C,T=i.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),K=i.forwardRef((n,e)=>{const{disableOutsidePointerEvents:t=!1,onEscapeKeyDown:o,onPointerDownOutside:s,onFocusOutside:u,onInteractOutside:f,onDismiss:d,...E}=n,a=i.useContext(T),[c,F]=i.useState(null),l=c?.ownerDocument??globalThis?.document,[,I]=i.useState({}),S=g(e,r=>F(r)),b=Array.from(a.layers),[W]=[...a.layersWithOutsidePointerEventsDisabled].slice(-1),k=b.indexOf(W),D=c?b.indexOf(c):-1,A=a.layersWithOutsidePointerEventsDisabled.size>0,P=D>=k,N=Y(r=>{const v=r.target,L=[...a.branches].some(y=>y.contains(v));!P||L||(s?.(r),f?.(r),r.defaultPrevented||d?.())},l),O=q(r=>{const v=r.target;[...a.branches].some(y=>y.contains(v))||(u?.(r),f?.(r),r.defaultPrevented||d?.())},l);return U(r=>{D===a.layers.size-1&&(o?.(r),!r.defaultPrevented&&d&&(r.preventDefault(),d()))},l),i.useEffect(()=>{if(c)return t&&(a.layersWithOutsidePointerEventsDisabled.size===0&&(C=l.body.style.pointerEvents,l.body.style.pointerEvents="none"),a.layersWithOutsidePointerEventsDisabled.add(c)),a.layers.add(c),w(),()=>{t&&a.layersWithOutsidePointerEventsDisabled.size===1&&(l.body.style.pointerEvents=C)}},[c,l,t,a]),i.useEffect(()=>()=>{c&&(a.layers.delete(c),a.layersWithOutsidePointerEventsDisabled.delete(c),w())},[c,a]),i.useEffect(()=>{const r=()=>I({});return document.addEventListener(p,r),()=>document.removeEventListener(p,r)},[]),x.jsx(R.div,{...E,ref:S,style:{pointerEvents:A?P?"auto":"none":void 0,...n.style},onFocusCapture:h(n.onFocusCapture,O.onFocusCapture),onBlurCapture:h(n.onBlurCapture,O.onBlurCapture),onPointerDownCapture:h(n.onPointerDownCapture,N.onPointerDownCapture)})});K.displayName=j;var M="DismissableLayerBranch",X=i.forwardRef((n,e)=>{const t=i.useContext(T),o=i.useRef(null),s=g(e,o);return i.useEffect(()=>{const u=o.current;if(u)return t.branches.add(u),()=>{t.branches.delete(u)}},[t.branches]),x.jsx(R.div,{...n,ref:s})});X.displayName=M;function Y(n,e=globalThis?.document){const t=m(n),o=i.useRef(!1),s=i.useRef(()=>{});return i.useEffect(()=>{const u=d=>{if(d.target&&!o.current){let E=function(){B(z,t,a,{discrete:!0})};const a={originalEvent:d};d.pointerType==="touch"?(e.removeEventListener("click",s.current),s.current=E,e.addEventListener("click",s.current,{once:!0})):E()}else e.removeEventListener("click",s.current);o.current=!1},f=window.setTimeout(()=>{e.addEventListener("pointerdown",u)},0);return()=>{window.clearTimeout(f),e.removeEventListener("pointerdown",u),e.removeEventListener("click",s.current)}},[e,t]),{onPointerDownCapture:()=>o.current=!0}}function q(n,e=globalThis?.document){const t=m(n),o=i.useRef(!1);return i.useEffect(()=>{const s=u=>{u.target&&!o.current&&B(H,t,{originalEvent:u},{discrete:!1})};return e.addEventListener("focusin",s),()=>e.removeEventListener("focusin",s)},[e,t]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function w(){const n=new CustomEvent(p);document.dispatchEvent(n)}function B(n,e,t,{discrete:o}){const s=t.originalEvent.target,u=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:t});e&&s.addEventListener(n,e,{once:!0}),o?_(s,u):s.dispatchEvent(u)}export{K as D};
