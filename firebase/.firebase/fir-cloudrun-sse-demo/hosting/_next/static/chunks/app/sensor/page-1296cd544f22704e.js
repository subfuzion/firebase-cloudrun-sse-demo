(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[420],{3124:function(e,t,n){Promise.resolve().then(n.bind(n,1383))},1383:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var r=n(9268),s=n(5006),o=n.n(s);function a(){let e=Date.now();async function t(t){if(Date.now()-e<50)return;e=Date.now();let n={method:"POST",headers:{"Content-Type":"application/json",Connection:"close"},body:JSON.stringify({value:t})};try{console.log("post value: ".concat(t));let e=await fetch("/api/data",n);e.ok||console.error(e.statusText)}catch(e){console.log(e)}}return(0,r.jsx)("main",{className:"flex min-h-screen flex-col items-center justify-between p-24 ".concat(o().className),children:(0,r.jsxs)("div",{className:"z-10 w-full max-w-5xl items-center justify-between font-mono text-sm",children:[(0,r.jsx)("p",{className:"fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit",children:"Sensor App Demo\xa0"}),(0,r.jsx)("div",{className:"text-center",children:(0,r.jsxs)("div",{className:"mt-40",children:[(0,r.jsx)("label",{htmlFor:"sensor",children:"Adjust the slider to simulate a sensor collecting data. Sensor data is sent to the server every 20th of a second."}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("input",{type:"range",min:"20",max:"200",step:"1",id:"sensor",onInput:e=>{let{value:n}=e.target;return t(n)}})]})}),(0,r.jsx)("br",{}),(0,r.jsx)("div",{className:"fixed bottom-0 left-0 flex h-48 w-full items-end justify-center",children:(0,r.jsx)("p",{className:"place-items-center gap-2 p-8 lg:pointer-events-auto",children:"\xa9 2023, Cormac Pujals"})})]})})}},5006:function(e){e.exports={style:{fontFamily:"'__Inter_0ec1f4', '__Inter_Fallback_0ec1f4'",fontStyle:"normal"},className:"__className_0ec1f4"}},3177:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(6006),s=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,c={},i=null,f=null;for(r in void 0!==n&&(i=""+n),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(f=t.ref),t)o.call(t,r)&&!l.hasOwnProperty(r)&&(c[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===c[r]&&(c[r]=t[r]);return{$$typeof:s,type:e,key:i,ref:f,props:c,_owner:a.current}}t.jsx=c,t.jsxs=c},9268:function(e,t,n){"use strict";e.exports=n(3177)}},function(e){e.O(0,[667,139,744],function(){return e(e.s=3124)}),_N_E=e.O()}]);