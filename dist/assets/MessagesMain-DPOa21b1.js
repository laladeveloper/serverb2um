import{j as e,L as o,h as n,d as r}from"./index-ChFFMl3H.js";import{B as l,a as c,b as m}from"./index.esm-GXnXUvav.js";/* empty css                 */const h="Brenda Tchaka",d="2hr",x=[{whoami:"you",isseen:!0,time:"1:01 am",body:"Hi am intrested in your giftcards"},{whoami:"notme",isseen:!0,time:"1:05 am",body:"Hello are you talking of he recently posted one?"},{whoami:"notme",isseen:!0,time:"13:39 pm",body:"if its that,then its still available."},{whoami:"you",isseen:!1,time:"14:15 pm",body:"I will get back to yo shortly"},{whoami:"you",isseen:!1,time:"1:01 am",body:"Hello am available to purchase"}],i={name:h,lastseen:d,chats:x};function y({username:s}){return e.jsx("div",{className:"messagess-view2-footer-cont",children:e.jsxs("div",{className:"messagess-view2-footer-cont-support px-2",children:[e.jsx("textarea",{placeholder:`Reply to ${s}....`,className:"rounded-lg  border-2 p-1"}),e.jsx(l,{size:26})]})})}function u({data:s}){return e.jsxs("div",{className:"messages-view2-header",children:[e.jsx(o,{onClick:()=>window.history.back(),children:e.jsx(n,{size:26})}),e.jsx("span",{style:{fontWeight:700,fontSize:"18px",color:"rbga(0,0,0,0.7)"},children:s.id}),e.jsx("span",{style:{fontFamily:"nunito"},children:s.lastseen})]})}function j({data:s}){let a={backgroundColor:s.whoami==="you"?"#2AFFE2":"white",color:s.whoami==="you"?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.8)"};return e.jsx("div",{className:"messages-view2-chat-body",style:{justifyContent:s.whoami==="you"?"flex-end":"flex-start"},children:e.jsxs("div",{className:"messages-view2-chat-main-chat-cont",style:a,children:[e.jsx("div",{children:s.body}),e.jsxs("div",{className:"messages-view2-chat-main-chat-meta-cont",style:{justifyContent:s.whoami==="you"?"flex-end":"flex-start"},children:[e.jsx("span",{children:s.isseen?e.jsx(c,{size:20}):e.jsx(m,{size:20})}),e.jsx("span",{children:s.time})]})]})})}function b(){const{id:s}=r();return e.jsx("div",{children:e.jsxs("div",{style:{marginTop:"6em"},className:"messagess-view1-body",children:[e.jsx(u,{data:{id:s,...i}}),e.jsx("h2",{children:s}),i.chats.map((a,t)=>e.jsx(j,{data:a},t)),e.jsx(y,{username:s})]})})}export{b as default};