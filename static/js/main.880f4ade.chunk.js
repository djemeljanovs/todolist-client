(this["webpackJsonptodolist-client"]=this["webpackJsonptodolist-client"]||[]).push([[0],{49:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var r,i=n(0),o=n.n(i),c=n(40),u=n.n(c),s=(n(49),n(9)),a=n(2),d=n(43),l=n(23),b=n(42),f=n.n(b),j=n(1);!function(e){e.INITIALIZING="Initializing",e.CONNECTED="Connected",e.DISCONNECTED="Disconnected",e.ERROR="Connection Error"}(r||(r={}));var m={userId:"",status:r.INITIALIZING,createItem:function(){return{}},focusItem:function(){return{}},blurItem:function(){return{}},updateItem:function(){return{}},removeItem:function(){return{}},items:[]},O=o.a.createContext(m);function h(){var e=o.a.useContext(O);if(!e)throw new Error("useApi must be used within ApiProvider");return e}var I,p=f()("https://ubiquity-todolist-server.herokuapp.com/");function g(e){var t=e.children,n=Object(i.useState)(r.INITIALIZING),o=Object(l.a)(n,2),c=o[0],u=o[1],s=Object(i.useState)([]),a=Object(l.a)(s,2),b=a[0],f=a[1];Object(i.useEffect)((function(){p.on("connect",(function(){u(r.CONNECTED)})),p.on("connect_error",(function(e){u(r.ERROR)})),p.on("disconnect",(function(){u(r.DISCONNECTED)})),p.on(I.LIST,(function(e){f(e)})),p.on(I.CREATE,(function(e){f((function(t){return t.concat(e)}))})),p.on(I.UPDATE,(function(e){console.log("update received: "+JSON.stringify(e)),f((function(t){var n=Object(d.a)(t),r=t.findIndex((function(t){return t._id===e._id}));return r>-1?n[r]=e:n.push(e),n}))})),p.on(I.REMOVE,(function(e){f((function(t){return t.filter((function(t){return t._id!==e._id}))}))}))}),[]);var m=Object(i.useCallback)((function(e,t){p.emit(e,{id:t})}),[]),h=Object(i.useCallback)((function(){p.emit(I.CREATE)}),[]),g=Object(i.useCallback)((function(e,t){p.emit(I.UPDATE,{id:e,text:t})}),[]);return Object(j.jsx)(O.Provider,{value:{userId:p.id,status:c,createItem:h,updateItem:g,focusItem:function(e){return m(I.FOCUS,e)},blurItem:function(e){return m(I.BLUR,e)},removeItem:function(e){return m(I.REMOVE,e)},items:b},children:t})}function x(e){return Object(j.jsx)("svg",Object(s.a)(Object(s.a)({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"},e),{},{children:Object(j.jsx)("path",{fill:e.color,d:"M28 22.398L19.594 14 28 5.602 22.398 0 14 8.402 5.598 0 0 5.602 8.398 14 0 22.398 5.598 28 14 19.598 22.398 28z"})}))}!function(e){e.LIST="item/list",e.CREATE="item/create",e.FOCUS="item/focus",e.BLUR="item/blur",e.UPDATE="item/update",e.REMOVE="item/remove"}(I||(I={}));var C=Object(a.a)({button:{display:"flex",alignItems:"center",color:"white",padding:20,background:function(e){return e.disabled?"grey":"#5071FD"},border:"none",fontSize:24,fontWeight:"bold",width:"fit-content",borderRadius:10,textTransform:"uppercase",userSelect:"none",cursor:"pointer",minWidth:0}});function v(e){var t=C(e);return Object(j.jsx)("button",Object(s.a)(Object(s.a)({className:t.button},e),{},{children:e.children}))}var E=n(44),N=Object(a.a)({root:{position:"relative",marginRight:10,minWidth:0},badge:{position:"absolute",top:-25,left:10,color:"white",zIndex:100,borderTopLeftRadius:5,borderTopRightRadius:5,padding:5,background:function(e){return e.isControlledByCurrentUser?"#5071FD":"grey"}},input:{height:70,boxSizing:"border-box",border:"3px solid lightgrey",borderRadius:10,fontSize:26,background:"none",paddingLeft:10,"&:focus":{border:"3px solid #5071FD"},"&:disabled":{background:"#EEEEEE",border:"3px solid grey"}}});function y(e){var t=e.isControlled,n=e.isControlledByCurrentUser,r=Object(E.a)(e,["isControlled","isControlledByCurrentUser"]),i=N({isControlled:t,isControlledByCurrentUser:n});return Object(j.jsxs)("div",{className:i.root,children:[t&&Object(j.jsx)("div",{className:i.badge,children:n?"You are editing":"Someone else is typing"}),Object(j.jsx)("input",Object(s.a)({maxLength:15,type:"text",className:i.input,placeholder:"Empty item"},r))]})}var R=Object(a.a)({root:{display:"flex"}});function T(e){var t=h(),n=t.userId,r=t.removeItem,i=t.focusItem,o=t.blurItem,c=t.updateItem,u=null!=e.controlledBy&&e.controlledBy!==n,s=null!=e.controlledBy&&e.controlledBy===n,a=R(e);return Object(j.jsxs)("div",{className:a.root,children:[Object(j.jsx)(y,{disabled:u,value:e.text,onChange:function(t){return n=t.target.value,void c(e._id,n);var n},onFocus:function(){i(e._id)},onBlur:function(){o(e._id)},isControlled:null!=e.controlledBy,isControlledByCurrentUser:s}),Object(j.jsx)(v,{onClick:function(){r(e._id)},disabled:u,tabIndex:-1,children:Object(j.jsx)(x,{width:30,height:30,color:"white"})})]})}var w=Object(a.a)({item:{marginBottom:15}});function D(){var e=w(),t=h().items;return Object(j.jsx)(j.Fragment,{children:t.map((function(t,n){return Object(j.jsx)("div",{className:e.item,children:Object(j.jsx)(T,Object(s.a)({},t))},"item-".concat(n))}))})}var S=Object(a.a)({status:{display:"flex",flexDirection:"row",alignItems:"center"},icon:{height:20,width:20,borderRadius:"50%",background:function(e){return e.color},marginRight:5}});function B(e){switch(e){case r.INITIALIZING:return"yellow";case r.CONNECTED:return"green";case r.DISCONNECTED:return"black";case r.ERROR:return"red"}}function k(){var e=h().status,t=S({color:B(e)});return Object(j.jsxs)("div",{className:t.status,children:[Object(j.jsx)("div",{className:t.icon}),Object(j.jsx)("h4",{children:e.toString().toUpperCase()})]})}var L=Object(a.a)({wrapper:{maxWidth:600,margin:"0 auto"}});function U(){var e=L(),t=h(),n=t.status,i=t.createItem;return Object(j.jsxs)("div",{className:e.wrapper,children:[Object(j.jsx)("h2",{children:"Multiplayer todo list \ud83d\uddd2\ufe0f"}),Object(j.jsx)(k,{}),Object(j.jsx)(D,{}),Object(j.jsx)(v,{disabled:n!==r.CONNECTED,onClick:i,children:"New item"})]})}var A=function(){return Object(j.jsx)(g,{children:Object(j.jsx)(U,{})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,88)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),o(e),c(e)}))};u.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(A,{})}),document.getElementById("root")),F()}},[[87,1,2]]]);
//# sourceMappingURL=main.880f4ade.chunk.js.map