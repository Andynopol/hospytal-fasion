(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{109:function(e,t,n){},122:function(e,t,n){},123:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(10),r=n.n(c),s=(n(109),n(74)),o=n(75),l=n(95),j=n(93),d=n(17),b=n(44),u=n(13),p=n(172),O=n(2),x=function(e){var t=e.showNav;return Object(a.useEffect)((function(){return t(!1),function(){t(!0)}}),[]),Object(O.jsx)(O.Fragment,{children:"No page on this path!"})},m=n(11),h=n(4),g=n(40),f=n(164),v=n(166),N=n(167),k=n(168),y=n(169),S=n(36),w=n(170),C=n(171),L=n(84),I=n.n(L),E=n(161),F=n(85),P=n.n(F),T=n(86),R=n.n(T),W=n(82),D=n.n(W),B=n(59),_=n(83),M=n.n(_),A=Object(E.a)((function(e){return{root:Object(m.a)({width:"100%"},e.breakpoints.up("md"),{maxWidth:345}),media:{display:"flex",height:0,paddingTop:"56.25%",justifyContent:"center",alignItems:"center"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:B.a[500]},description:{overflow:"hidden"}}})),H=function(e){var t=Object(g.c)((function(e){return e.isLogged})),n=A(),i=e.name,c=e.description,r=e.details,s=(e.promotion,e.price),o=(e.piecesLeft,e.src),l=Object(a.useState)(!1),j=Object(d.a)(l,2),b=j[0],u=j[1];return Object(O.jsxs)(f.a,{className:n.root,children:[Object(O.jsx)(v.a,{action:Object(O.jsx)(N.a,{"aria-label":"settings",children:Object(O.jsx)(D.a,{})}),title:i,subheader:"".concat(s," RON")}),Object(O.jsx)(k.a,{className:n.media,children:o?null:Object(O.jsx)(M.a,{}),image:o,title:"asd"}),Object(O.jsx)(y.a,{className:n.description,children:Object(O.jsx)(S.a,{variant:"body2",display:"block",color:"textSecondary",component:"p",children:c})}),Object(O.jsxs)(w.a,{disableSpacing:!0,children:[t?Object(O.jsx)(N.a,{"aria-label":"add to favorites",children:Object(O.jsx)(I.a,{})}):null,Object(O.jsx)(N.a,{"aria-label":"share",children:Object(O.jsx)(P.a,{})}),r?Object(O.jsx)(N.a,{className:Object(h.a)(n.expand,Object(m.a)({},n.expandOpen,b)),onClick:function(){u(!b)},"aria-expanded":b,"aria-label":"show more",children:Object(O.jsx)(R.a,{})}):null]}),Object(O.jsx)(C.a,{in:b,timeout:"auto",unmountOnExit:!0,children:Object(O.jsx)(y.a,{children:Object(O.jsx)(S.a,{variant:"body2",component:"p",gutterBottom:!0,display:"block",color:"textSecondary",children:r})})})]})},G=Object(E.a)((function(){return{root:{paddingTop:20},item:{textAlign:"center"}}})),U=function(e){var t=G();return Object(O.jsxs)(p.a,{className:t.root,container:!0,spacing:2,children:[Object(O.jsx)(p.a,{item:!0,xs:12,md:4,className:t.item,children:Object(O.jsx)(H,{name:"test",price:100,details:"asd"})}),Object(O.jsx)(p.a,{item:!0,xs:12,md:4,className:t.item,children:Object(O.jsx)(H,{name:"test",price:100,details:"asd"})}),Object(O.jsx)(p.a,{item:!0,xs:12,md:4,className:t.item,children:Object(O.jsx)(H,{name:"test",price:100,details:"asd"})})]})},V=n(177),X=n(178),z=n(5),J=n(50),q=n(94),K=n(174),Q=n(87),Y=n.n(Q),Z=Object(E.a)((function(e){return{icon:{color:"#fafafa"}}})),$=function(){var e=Object(g.c)((function(e){return e.isLogged})),t=(Object(g.b)(),e?["Account","Logout"]:["Login","Sign up"]),n=i.a.useState(null),a=Object(d.a)(n,2),c=a[0],r=a[1],s=Boolean(c),o=Z(),l=function(e){j()},j=function(){r(null)},b=Object(z.a)({paper:{border:"1px solid #d3d4d5"}})((function(e){return Object(O.jsx)(q.a,Object(J.a)({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},open:!1},e))}));return Object(O.jsxs)("div",{children:[Object(O.jsx)(N.a,{"aria-label":"more","aria-controls":"long-menu","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)},children:Object(O.jsx)(Y.a,{className:o.icon})}),Object(O.jsx)(b,{id:"long-menu",anchorEl:c,keepMounted:!0,open:s,onClose:j,PaperProps:{style:{maxHeight:216,width:"20ch"}},children:t.map((function(e){return Object(O.jsx)(K.a,{value:e,selected:"Pyxis"===e,onClick:l,children:e},e)}))})]})},ee=Object(E.a)((function(e){var t;return{title:(t={display:"none"},Object(m.a)(t,e.breakpoints.up("sm"),{display:"block",minWidth:"180px",marginRight:"30px"}),Object(m.a)(t,"userSelect","none"),Object(m.a)(t,"fontWeight","bold"),t)}})),te=function(){var e=ee();return Object(O.jsx)(S.a,{variant:"h5",className:e.title,children:"Logo"})},ne=Object(E.a)((function(e){var t;return{List:(t={padding:0,display:"none"},Object(m.a)(t,e.breakpoints.up("md"),{display:"flex"}),Object(m.a)(t,"listStyle","none"),Object(m.a)(t,"margin",0),t),navLink:{"&:hover":{padding:"12px 12px 10px 12px",borderBottom:"2px solid #262626",cursor:"pointer"}},Link:{color:"#fafafa",textDecoration:"none",userSelect:"none",padding:"12px","&:hover":{padding:"12px 12px 10px 12px",borderBottom:"2px solid #fafafa",cursor:"pointer"}}}})),ae=function(){var e=ne();return Object(O.jsx)(p.a,{container:!0,children:Object(O.jsx)("ul",{className:e.List,children:Object(O.jsx)(b.b,{className:e.Link,to:"/",children:Object(O.jsx)("li",{children:"Home"})})})})},ie=n(88),ce=n.n(ie),re=Object(E.a)((function(e){return{menuButton:Object(m.a)({marginRight:e.spacing(2),display:"block"},e.breakpoints.up("md"),{display:"none"}),hide:{display:"none"}}})),se=function(e){var t=re();return Object(O.jsx)(N.a,{color:"inherit","aria-label":"open drawer",onClick:e.onClick,edge:"start",className:Object(h.a)(t.menuButton,e.open&&t.hide),children:Object(O.jsx)(ce.a,{})})},oe=n(19),le=n(182),je=n(173),de=n(175),be=n(89),ue=n.n(be),pe=n(90),Oe=n.n(pe),xe=n(124),me=n(176),he=240,ge=Object(E.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(he,"px)"),marginLeft:he,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:he,flexShrink:0},drawerPaper:{width:he},drawerHeader:Object(J.a)(Object(J.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},Link:{color:"#262626",textDecoration:"none",userSelect:"none"}}})),fe=function(e){var t=ge(),n=Object(oe.a)(),a=e.open,i=e.closeMenu;return Object(O.jsxs)(le.a,{className:t.drawer,variant:"persistent",anchor:"left",open:a,classes:{paper:t.drawerPaper},children:[Object(O.jsx)("div",{className:t.drawerHeader,children:Object(O.jsx)(N.a,{onClick:i,children:"ltr"===n.direction?Object(O.jsx)(ue.a,{}):Object(O.jsx)(Oe.a,{})})}),Object(O.jsx)(de.a,{}),Object(O.jsx)(je.a,{children:["Home","Services","Websites"].map((function(e){var n="";switch(e){case"Home":n="/";break;case"Services":n="/services";break;case"Websites":n="/websites";break;default:n="/nothing"}return Object(O.jsx)(b.b,{className:t.Link,to:n,children:Object(O.jsx)(xe.a,{button:!0,children:Object(O.jsx)(me.a,{primary:e})},e)},e)}))}),Object(O.jsx)(de.a,{}),Object(O.jsx)(je.a,{children:["Send mail","Account"].map((function(e){return Object(O.jsx)(xe.a,{button:!0,children:Object(O.jsx)(me.a,{primary:e})},e)}))})]})},ve=Object(E.a)((function(e){var t;return{grow:(t={display:"flex"},Object(m.a)(t,e.breakpoints.up("lg"),{display:"none"}),Object(m.a)(t,"flexGrow",1),t)}})),Ne=function(){var e=ve();return Object(O.jsx)("div",{className:e.grow})},ke=Object(E.a)((function(e){var t;return{relative:Object(m.a)({position:"relative"},e.breakpoints.up("lg"),{minHeight:"48px"}),grow:{flexGrow:1},growMobile:(t={display:"flex"},Object(m.a)(t,e.breakpoints.up("lg"),{display:"none"}),Object(m.a)(t,"flexGrow",1),t),menuButton:{marginRight:e.spacing(2)},sectionDesktop:Object(m.a)({display:"none"},e.breakpoints.up("md"),{display:"flex"}),sectionMobile:Object(m.a)({display:"flex"},e.breakpoints.up("md"),{display:"none"}),invisible:{display:"none"}}})),ye=Object(z.a)((function(e){return{root:{color:"#fafafa",backgroundColor:"#02203c",boxShadow:"none"}}}))(V.a),Se=function(e){var t=ke(),n=e.isVisible,a=i.a.useState(!1),c=Object(d.a)(a,2),r=c[0],s=c[1];return Object(O.jsx)("div",{className:n?"":t.invisible,color:"primary",children:Object(O.jsxs)(ye,{position:"sticky",children:[Object(O.jsxs)(X.a,{className:t.relative,children:[Object(O.jsx)(se,{open:r,onClick:function(){s(!0)}}),Object(O.jsx)(te,{}),Object(O.jsx)(ae,{}),Object(O.jsx)(Ne,{}),Object(O.jsx)($,{})]}),Object(O.jsx)(fe,{open:r,closeMenu:function(){s(!1)}})]})})},we=n(180),Ce=n(179),Le=n(92),Ie=n.n(Le),Ee=n(91),Fe=n.n(Ee),Pe=Object(E.a)((function(e){return{textFieldWrapper:{display:"flex",justifyContent:"center"},textField:Object(m.a)({width:"95%"},e.breakpoints.up("md"),{width:"100%"}),button:{margin:e.spacing(1),width:200},buttonWrapper:{display:"flex",justifyContent:"center"}}})),Te=function(e){var t=e.name,n=e.description,a=e.details,i=e.promotion,c=e.pieces,r=e.price,s=(e.src,e.change),o=e.clear,l=Pe();return Object(O.jsxs)(p.a,{container:!0,spacing:1,justify:"center",children:[Object(O.jsx)(p.a,{item:!0,xs:12,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Name",type:"text",value:t,onChange:function(e){return s(e,"NAME")}})}),Object(O.jsx)(p.a,{item:!0,xs:12,md:6,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Price(RON)",type:"number",InputLabelProps:{shrink:!0},value:r,onFocus:function(e){return e.target.select()},onChange:function(e){return s(e,"PRICE")}})}),Object(O.jsx)(p.a,{item:!0,xs:12,md:6,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Promotion(%)",type:"number",value:i,InputLabelProps:{shrink:!0},onFocus:function(e){return e.target.select()},onChange:function(e){return s(e,"PROMOTION")}})}),Object(O.jsx)(p.a,{item:!0,xs:12,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Pieces",type:"number",value:c,InputLabelProps:{shrink:!0},onFocus:function(e){return e.target.select()},onChange:function(e){return s(e,"PIECES")}})}),Object(O.jsx)(p.a,{item:!0,xs:12,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Description",value:n,onChange:function(e){return s(e,"DESCRIPTION")},rows:3,multiline:!0})}),Object(O.jsx)(p.a,{item:!0,xs:12,className:l.textFieldWrapper,children:Object(O.jsx)(we.a,{className:l.textField,label:"Details",value:a,onChange:function(e){return s(e,"DETAILS")},rows:3,multiline:!0})}),Object(O.jsx)(p.a,{item:!0,xs:12,className:l.textFieldWrapper,children:Object(O.jsxs)(Ce.a,{variant:"contained",component:"label",children:["Upload File",Object(O.jsx)("input",{type:"file",accept:"image/*",onChange:function(e){return s(e,"SRC")},hidden:!0})]})}),Object(O.jsxs)(p.a,{container:!0,children:[Object(O.jsx)(p.a,{item:!0,xs:6,className:l.buttonWrapper,children:Object(O.jsx)(Ce.a,{variant:"contained",color:"primary",className:l.button,startIcon:Object(O.jsx)(Fe.a,{}),children:"Save"})}),Object(O.jsx)(p.a,{item:!0,xs:6,className:l.buttonWrapper,children:Object(O.jsx)(Ce.a,{variant:"contained",color:"default",className:l.button,startIcon:Object(O.jsx)(Ie.a,{}),onClick:o,children:"Clear"})})]})]})},Re=Object(E.a)((function(e){return{root:{paddingTop:"3rem"}}})),We=function(e){var t=Re(),n=Object(a.useState)(""),i=Object(d.a)(n,2),c=i[0],r=i[1],s=Object(a.useState)(""),o=Object(d.a)(s,2),l=o[0],j=o[1],b=Object(a.useState)(""),u=Object(d.a)(b,2),x=u[0],m=u[1],h=Object(a.useState)(0),g=Object(d.a)(h,2),f=g[0],v=g[1],N=Object(a.useState)(0),k=Object(d.a)(N,2),y=k[0],S=k[1],w=Object(a.useState)(0),C=Object(d.a)(w,2),L=C[0],I=C[1],E=Object(a.useState)(""),F=Object(d.a)(E,2),P=F[0],T=F[1];return Object(O.jsxs)(p.a,{container:!0,spacing:3,className:t.root,children:[Object(O.jsx)(p.a,{item:!0,xs:12,md:7,children:Object(O.jsx)(H,{name:c,description:l,details:x,promotion:f,price:y,piecesLeft:L,src:P})}),Object(O.jsx)(p.a,{item:!0,xs:12,md:5,children:Object(O.jsx)(Te,{name:c,description:l,details:x,promotion:f,price:y,pieces:L,src:P,change:function(e,t){switch(t){case"NAME":r(e.target.value);break;case"DESCRIPTION":j(e.target.value);break;case"DETAILS":m(e.target.value);break;case"PROMOTION":if(""===e.target.value){v(0);break}v(parseInt(e.target.value));break;case"PRICE":if(""===e.target.value){S(0);break}S(parseInt(e.target.value));break;case"PIECES":if(""===e.target.value){I(0);break}I(parseInt(e.target.value));break;case"SRC":console.log(e.target.value),T(e.target.value)}},clear:function(){r(""),S(0),I(0),v(0),j(""),m(""),T("")}})})]})},De=function(){var e=Object(a.useState)(!0),t=Object(d.a)(e,2),n=t[0],i=t[1];return Object(O.jsxs)(b.a,{children:[Object(O.jsx)(Se,{isVisible:n}),Object(O.jsxs)(p.a,{container:!0,children:[Object(O.jsx)(p.a,{item:!0,xs:!1,md:1,lg:2}),Object(O.jsx)(p.a,{item:!0,xs:12,md:10,lg:8,children:Object(O.jsxs)(u.c,{children:[Object(O.jsx)(u.a,{exact:!0,path:"/",component:U}),Object(O.jsx)(u.a,{exact:!0,path:"/admin/add-product",component:We}),Object(O.jsx)(u.a,{children:Object(O.jsx)(x,{showNav:i})})]})}),Object(O.jsx)(p.a,{item:!0,xs:!1,md:1,lg:2})]})]})},Be=(n(122),function(e){Object(l.a)(n,e);var t=Object(j.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(O.jsx)("div",{id:"anchor",children:Object(O.jsx)(De,{})})}}]),n}(a.Component)),_e=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,183)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),c(e),r(e)}))},Me=n(43),Ae=Object(Me.b)({isLogged:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":e=!0;break;case"LOGOUT":e=!1}return e}}),He=Object(Me.c)(Ae,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());r.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(g.a,{store:He,children:Object(O.jsx)(Be,{})})}),document.getElementById("root")),_e()}},[[123,1,2]]]);
//# sourceMappingURL=main.925a55d9.chunk.js.map