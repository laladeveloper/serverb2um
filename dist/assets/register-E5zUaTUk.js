import{r as t,j as e,H as W,F as $,u as j,a as q,b as z,A as n,c as y,L as G}from"./index-ChFFMl3H.js";/* empty css             */import{r as J}from"./userAction-ByL_PvKL.js";function K({continuesignup:Q}){const o=j(s=>s.user.success),l=j(s=>s.user.failure),[v,a]=t.useState(!1),i=q(),C=z(),[c,S]=t.useState(""),[m,b]=t.useState(""),[u,N]=t.useState(""),[d,P]=t.useState(""),[p,D]=t.useState(""),[r,E]=t.useState(""),[f,L]=t.useState(""),[g,X]=t.useState(null),[x,F]=t.useState(!1),[h,T]=t.useState(!1),A=()=>{F(!x),T(!h)},I=s=>{S(s.target.value)},R=s=>{b(s.target.value)},U=s=>{N(s.target.value)},k=s=>{P(s.target.value)},H=s=>{D(s.target.value)},M=s=>{E(s.target.value)},B=s=>{L(s.target.value)},O={fname:c,lname:m,username:u,email:d,password:r},V=async s=>{a(!0),s.preventDefault();try{if(!c||!u||!d||!p||!r){n.error("Please fill all the fields"),setTimeout(()=>{a(!1)},800);return}if(r!==f){n.error("Confirm password should be same as password"),setTimeout(()=>{a(!1)},800);return}i(J(O)),setTimeout(()=>{a(!1)},800)}catch(w){console.log(`register ${w}`),n.error(w.message||"Registration failed. Please try again."),setTimeout(()=>{a(!1)},800)}};return t.useEffect(()=>{o&&(n.success(o),C("/")),l&&n.error(l),i(y())},[o,l,i,y]),e.jsxs("div",{className:"authcont",children:[e.jsx("h2",{children:"Create an account"}),e.jsxs("form",{action:"",children:[e.jsxs("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:"0.5em",width:"100%",marginBottom:"1.5em"},children:[e.jsx("input",{onChange:I,value:c,type:"text",name:"fname",className:"auth-input",placeholder:"First name"}),e.jsx("input",{onChange:R,value:m,type:"text",name:"lname",className:"auth-input",placeholder:"Last name"})]}),e.jsx("input",{onChange:U,value:u,type:"text",name:"username",className:"auth-input",placeholder:"Username"}),e.jsx("input",{onChange:k,value:d,type:"email",name:"email",className:"auth-input",placeholder:"Email address"}),e.jsx("label",{htmlFor:"date",className:" m-[8px]",children:"Date of birth"}),e.jsx("input",{onChange:H,value:p,type:"date",name:"date",className:"auth-input",id:"date"}),e.jsx("input",{onChange:M,value:r,type:x?"text":"password",name:"password",className:"auth-input",placeholder:"Password"}),e.jsx("input",{onChange:B,value:f,type:h?"text":"password",name:"confirmPassword",className:"auth-input",placeholder:"Confirm password"}),e.jsx("span",{className:"showpassword flex float-right cursor-pointer select-none",onClick:A,children:h?e.jsx("h4",{children:"Hide Password "}):e.jsx("h4",{children:"Show Password"})}),g&&e.jsx("p",{style:{color:"red",textAlign:"center"},children:g}),e.jsx("button",{onClick:V,className:"auth-trigger hover:bg-cyan-300",children:v?"loading ... ":" Sign Up"})]}),e.jsx("p",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",paddingBottom:"10px"},children:e.jsx("span",{style:{cursor:"pointer",fontWeight:600,color:"rgba(10,10,10,0.7)"},children:"Or"})}),e.jsx("p",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",padding:0},children:e.jsx(G,{to:"/login",className:"already-h-a-n hover:text-white",children:"Already have an account? Login"})})]})}function ee(){return t.useState(1),e.jsxs("div",{className:"authbody",children:[e.jsx(W,{hidefooter:!0}),e.jsx(K,{}),e.jsx($,{})]})}export{ee as default};