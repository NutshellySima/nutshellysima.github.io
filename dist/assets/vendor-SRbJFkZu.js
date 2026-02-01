/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e=(t,o,r=[])=>{const n=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(o).forEach(e=>{n.setAttribute(e,String(o[e]))}),r.length&&r.forEach(t=>{const o=e(...t);n.appendChild(o)}),n};var t=([t,o,r])=>e(t,o,r);
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=e=>"string"==typeof e?e:e&&e.class?e.class&&"string"==typeof e.class?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"":"",r=(e,{nameAttr:r,icons:n,attrs:a})=>{const c=e.getAttribute(r);if(null==c)return;const s=n[c.replace(/(\w)(\w*)(_|-|\s*)/g,(e,t,o)=>t.toUpperCase()+o.toLowerCase())];if(!s)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const i=(e=>Array.from(e.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}))(e),[l,u,d]=s,m={...u,"data-lucide":c,...a,...i},f=["lucide",`lucide-${c}`,i,a].flatMap(o).map(e=>e.trim()).filter(Boolean).filter((e,t,o)=>o.indexOf(e)===t).join(" ");f&&Object.assign(m,{class:f});const p=t([l,m,d]);return e.parentNode?.replaceChild(p,e)},n=({icons:e={},nameAttr:t="data-lucide",attrs:o={}}={})=>{if(!Object.values(e).length)throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if("undefined"==typeof document)throw new Error("`createIcons()` only works in a browser environment.");const n=document.querySelectorAll(`[${t}]`);if(Array.from(n).forEach(n=>r(n,{nameAttr:t,icons:e,attrs:o})),"data-lucide"===t){const t=document.querySelectorAll("[icon-name]");t.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(t).forEach(t=>r(t,{nameAttr:"icon-name",icons:e,attrs:o})))}};export{t as createElement,n as createIcons};
