(()=>{var e={};e.id=931,e.ids=[931],e.modules={5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},7310:e=>{"use strict";e.exports=require("url")},6715:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>l.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>d});var a=s(7096),r=s(6132),i=s(7284),l=s.n(i),o=s(2564),n={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>o[e]);s.d(t,n);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,8203)),"C:\\Users\\Raj\\wallofadvice\\src\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,9113)),"C:\\Users\\Raj\\wallofadvice\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\Raj\\wallofadvice\\src\\app\\page.tsx"],u="/page",h={require:s,loadChunk:()=>Promise.resolve()},x=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3602:(e,t,s)=>{Promise.resolve().then(s.bind(s,7429))},7429:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>Home});var a=s(784),r=s(9885),i=s(5236),l=s(1137);let o=(0,r.memo)(({message:e})=>(0,a.jsxs)("div",{className:"absolute p-4 bg-white rounded-lg shadow-lg max-w-sm message cursor-default hover:shadow-xl transition-shadow duration-200",style:{left:e.position.x,top:e.position.y,backgroundColor:e.color,transform:"translate(-50%, -50%)",opacity:"0.9"},children:[(0,a.jsxs)("div",{className:"absolute -top-3 left-4 text-gray-600",style:{fontSize:"50%",opacity:"0.6"},children:["#",e.messageNumber]}),a.jsx("p",{className:"text-gray-800 text-base",children:e.content}),e.author&&(0,a.jsxs)("p",{className:"text-sm text-gray-600 mt-2 italic opacity-70",style:{fontSize:"80%"},children:["~ ",e.author," was here"]})]}));function Home(){let[e,t]=(0,r.useState)([]),[s,n]=(0,r.useState)(!1),[d,c]=(0,r.useState)({x:0,y:0}),[u,h]=(0,r.useState)({width:1e4,height:1e4}),x=(0,r.useRef)(null),m=(0,r.useRef)(null),[p]=(0,r.useState)(()=>{let e=localStorage.getItem("wall-user-id");if(e)return e;let t=Math.random().toString(36).substring(2);return localStorage.setItem("wall-user-id",t),t}),[g,f]=(0,r.useState)(!1),[b,y]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let fetchMessages=async()=>{try{let e=await fetch("/api/messages"),s=await e.json();Array.isArray(s)&&(t(s),w(s))}catch(e){console.error("Failed to fetch messages:",e)}};fetchMessages()},[]);let w=(0,r.useCallback)(e=>{let t=Math.max(...e.map(e=>e.position.x),0),s=Math.max(...e.map(e=>e.position.y),0);h(e=>({width:Math.max(e.width,t+2e3),height:Math.max(e.height,s+2e3)}))},[]),v=(0,r.useCallback)((e,t)=>{h(s=>{let a=e>s.width-1e3?s.width+2e3:s.width,r=t>s.height-1e3?s.height+2e3:s.height;return a!==s.width||r!==s.height?{width:a,height:r}:s})},[]),j=(0,r.useCallback)(e=>{if(e.target.closest(".message"))return;let t=e.currentTarget.getBoundingClientRect(),s=e.clientX-t.left,a=e.clientY-t.top;c({x:s,y:a}),n(!0),v(s,a)},[v]),N=(0,r.useCallback)(async s=>{if("Enter"===s.key&&!s.shiftKey){s.preventDefault();let a=s.currentTarget.value.trim();if(a){let s=a.match(/(.*?)(?:#(\w+))?$/),r=s?.[1]?.trim()||a,i=s?.[2]||void 0,l={content:r,author:i,id:Date.now(),createdAt:Date.now(),position:d,color:`hsl(${360*Math.random()}, 70%, 80%)`,messageNumber:e.length+1,ownerId:p};try{let e=await fetch("/api/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});e.ok&&(t(e=>[...e,l]),v(d.x,d.y))}catch(e){console.error("Failed to save message:",e)}n(!1)}}},[d,v,e.length,p]),k=(0,r.useCallback)(({state:e})=>{if(!m.current)return;let{positionX:t,positionY:s,scale:a}=e,r=Math.abs(t/a)+window.innerWidth/a,i=Math.abs(s/a)+window.innerHeight/a;v(r,i)},[v]);return(0,a.jsxs)("div",{className:"fixed inset-0 bg-gray-50",children:[a.jsx("div",{className:"fixed top-6 inset-x-0 z-50",children:a.jsx("div",{className:"container mx-auto px-4",children:(0,a.jsxs)("div",{className:"relative flex justify-center",children:[a.jsx("div",{className:"absolute left-4",children:a.jsx("button",{onClick:()=>f(!0),className:"text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors",children:"What is Wall of Advice?"})}),(0,a.jsxs)("div",{className:"flex flex-col items-center space-y-2",children:[a.jsx("h1",{className:"text-3xl font-semibold text-gray-800 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg",children:"Words of Advice"}),a.jsx("div",{className:"text-sm bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full shadow-md",style:{opacity:"0.6"},children:"made with ❤️"})]}),a.jsx("div",{className:"absolute right-8",children:a.jsx("button",{onClick:()=>y(!0),className:"text-sm bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md hover:bg-white/60 transition-colors",children:"How to Use?"})})]})})}),a.jsx(l.V,{open:g,onClose:()=>f(!1),className:"fixed inset-0 z-50 overflow-y-auto",children:(0,a.jsxs)("div",{className:"min-h-screen px-4 text-center",children:[a.jsx(l.V.Overlay,{className:"fixed inset-0 bg-black opacity-30"}),(0,a.jsxs)("div",{className:"inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl",style:{background:"linear-gradient(to bottom right, #ffffff, #f8f9fa)",border:"1px solid rgba(255,255,255,0.5)"},children:[a.jsx(l.V.Title,{className:"text-2xl font-medium text-gray-900 mb-4",children:"Welcome to Wall of Advice ✨"}),(0,a.jsxs)("div",{className:"space-y-4 text-gray-600 leading-relaxed",children:[a.jsx("p",{children:"This is your cozy corner of the internet where strangers leave little nuggets of wisdom for each other. Like finding notes in your favorite book, or stumbling upon exactly the words you needed to hear."}),a.jsx("p",{children:"Click anywhere, share your thoughts, and maybe your words will be just what someone else needs today. No logins, no fuss - just humans being human."}),a.jsx("p",{className:"italic",children:"Leave a piece of your story, take a piece of inspiration. Welcome home! ✨"})]}),a.jsx("div",{className:"mt-6 text-right",children:a.jsx("button",{type:"button",className:"inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",onClick:()=>f(!1),children:"Got it, thanks!"})})]})]})}),a.jsx(l.V,{open:b,onClose:()=>y(!1),className:"fixed inset-0 z-50 overflow-y-auto",children:(0,a.jsxs)("div",{className:"min-h-screen px-4 text-center",children:[a.jsx(l.V.Overlay,{className:"fixed inset-0 bg-black opacity-30"}),(0,a.jsxs)("div",{className:"inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl",style:{background:"linear-gradient(to bottom right, #ffffff, #f8f9fa)",border:"1px solid rgba(255,255,255,0.5)"},children:[a.jsx(l.V.Title,{className:"text-2xl font-medium text-gray-900 mb-4",children:"How to Share Your Thoughts \uD83D\uDCDD"}),(0,a.jsxs)("div",{className:"space-y-4 text-gray-600 leading-relaxed",children:[(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[a.jsx("span",{className:"text-blue-500 font-bold",children:"1."}),a.jsx("p",{children:"Click anywhere on the wall to add your message (yep, literally anywhere!)"})]}),(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[a.jsx("span",{className:"text-blue-500 font-bold",children:"2."}),a.jsx("p",{children:"Write whatever's on your mind - advice, thoughts, or maybe just a kind word"})]}),(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[a.jsx("span",{className:"text-blue-500 font-bold",children:"3."}),a.jsx("p",{children:"Want to sign it? Just add #yourname at the end of your message"})]}),a.jsx("p",{className:"italic mt-4 text-sm text-gray-500",children:"Press Enter to save your message, or click away to cancel ✨"})]}),a.jsx("div",{className:"mt-6 text-right",children:a.jsx("button",{type:"button",className:"inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",onClick:()=>y(!1),children:"Ready to Write!"})})]})]})}),a.jsx(i.d$,{initialScale:1,minScale:.1,maxScale:3,limitToBounds:!1,wheel:{step:.02,disabled:!1},centerZoomedOut:!1,centerOnInit:!1,panning:{velocityDisabled:!0},onTransformed:k,children:a.jsx(i.Uv,{wrapperStyle:{width:"100%",height:"100%"},children:(0,a.jsxs)("div",{ref:m,className:"relative cursor-default",onClick:j,style:{width:`${u.width}px`,height:`${u.height}px`,background:`
                linear-gradient(to right, #f8fafc 1px, transparent 1px),
                linear-gradient(to bottom, #f8fafc 1px, transparent 1px)
              `,backgroundSize:"60px 60px",backgroundColor:"#ffffff",backgroundPosition:"center center",boxShadow:"inset 0 0 100px rgba(0, 0, 0, 0.03)",transition:"width 0.2s ease-out, height 0.2s ease-out"},children:[e.map(e=>a.jsx(o,{message:e},e.id)),s&&a.jsx("textarea",{ref:x,autoFocus:!0,className:"absolute p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg max-w-sm resize-none cursor-text",style:{left:d.x,top:d.y,transform:"translate(-50%, -50%)",minWidth:"200px",minHeight:"100px",border:"none",outline:"none",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},placeholder:"Type your message here... (Add #yourname at the end)",onKeyDown:N,onBlur:()=>n(!1)})]})})})]})}o.displayName="MessageItem"},8203:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>l,__esModule:()=>i,default:()=>n});var a=s(5153);let r=(0,a.createProxy)(String.raw`C:\Users\Raj\wallofadvice\src\app\page.tsx`),{__esModule:i,$$typeof:l}=r,o=r.default,n=o}};var t=require("../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[303,619,670],()=>__webpack_exec__(6715));module.exports=s})();