(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4913)}])},4913:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return q}});var i=n(5893),o=n(7294),s=n(2293),r=n(7357),c=n(155),l=n(3946),a=n(5861),u=n(7948),d=n(3321),h=n(1496),f=n(1265),p=n(1927),m=n(6305),x=n(4994),b=n(6420),v=n(3454),g=n(6886),j=n(1658),w=n(1713),y=n(9628),Z=n(7171),k=n(4721),O=n(5449),C=n(657),S=n(1425),_=n(6514),D=n(8951),M=n(7645),P=n(6447),E=n(9411),N=n(2288),z=n(4005),U="/_next/static/media/logo.a1b89a69.png";function H(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),i.forEach((function(t){R(e,t,n[t])}))}return e}function T(e,t){return!t||"object"!==V(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var V=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function W(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=I(e);if(t){var o=I(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return T(this,n)}}var A=(0,h.ZP)("img")({top:0,width:"100%",height:"100%",objectFit:"scale-down",position:"absolute"}),G=(y.Z,Z.Z,(0,f.Z)({palette:{mode:"light",white:"#fff",whiteTrans:"rgba(255,255,255,0.3)",hover:"rgba(76, 203, 76, 0.3)",primary:{main:"#1976d2"}}})),q=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(y,e);var t,n,h,f=W(y);function y(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y),(t=f.call(this,e)).canvasRef=o.createRef(),t.state={stencils:[],components:[],componentsData:{},componentBaseUrl:"",mostRight:0,zoomValue:30,zoomHidden:!0,view:"list",infoIconDisabled:!0,viewDisabled:!0,infoOpen:!1,quickStartOpen:!1,stencilMetaName:"",stencilMetaDescription:"",stencilMetaHomePage:"",stencilMetaLicenseUrl:"",stencilMetaAuthor:""},t}return t=y,(n=[{key:"componentDidMount",value:function(){var e=this;fetch("/stencils.json",{}).then((function(e){return e.json()})).then((function(t){e.setState({stencils:t})}))}},{key:"selectStencil",value:function(e){if(e){var t=this;fetch(e.url+"/stencil-meta.json",{}).then((function(e){return e.json()})).then((function(e){t.setState({stencilMetaName:e.name,stencilMetaDescription:e.description,stencilMetaHomePage:e.homepage,stencilMetaLicenseUrl:e.license,stencilMetaAuthor:e.author})})),fetch(e.url+"/stencil-components.json",{}).then((function(e){return e.json()})).then((function(n){if(n.components_data){var i=t,o=0,s=0;n.components.forEach((function(e,t,r){s++,n.components_data[e].right>o&&(o=n.components_data[e].right),s===r.length&&i.setState({mostRight:o})})),t.setState({componentBaseUrl:e.url,view:"canvas",viewDisabled:!1,zoomHidden:!1,infoIconDisabled:!1,components:n.components,componentsData:n.components_data})}else t.setState({componentBaseUrl:e.url,view:"list",viewDisabled:!0,zoomHidden:!0,infoIconDisabled:!1,components:n.components,componentsData:null})}))}else this.setState({componentBaseUrl:"",stencilMetaName:"",stencilMetaDescription:"",stencilMetaHomePage:"",stencilMetaLicenseUrl:"",stencilMetaAuthor:"",infoIconDisabled:!0,components:[],view:"list",zoomHidden:!0,viewDisabled:!0,componentsData:null})}},{key:"handleChangeView",value:function(e){var t=!1;"list"===e&&(t=!0),this.setState({view:e,zoomHidden:t})}},{key:"renderComponentsCanvas",value:function(){var e=this,t=this.state,n=t.components,o=t.componentsData,s=3e3/this.state.mostRight*this.state.zoomValue/100,c=n.map((function(t){if(o[t]){var n=o[t],c=n.top*s,l=n.left*s,a=(n.right-n.left)*s;return(0,i.jsx)(r.Z,{position:"absolute",top:c+"px",left:l+"px",sx:{cursor:"grab",padding:"2px","&:hover":{border:"solid 2px green",padding:"0"}},children:(0,i.jsx)("img",{src:e.state.componentBaseUrl+"/"+t,style:{width:a+"px"}})},t)}return null}));return(0,i.jsx)(u.Z,{maxWidth:"xl",children:(0,i.jsx)(r.Z,{my:2,position:"relative",children:c})})}},{key:"renderComponentsList",value:function(){var e=this,t=this.state.components.map((function(t){return(0,i.jsx)(g.ZP,{item:!0,xs:2,sm:4,md:4,style:{border:"1px solid green",marginLeft:"-1px",marginTop:"-1px"},children:(0,i.jsx)(r.Z,{sx:{cursor:"grab",pt:"100%",position:"relative","&:hover":{backgroundColor:"hover"}},children:(0,i.jsx)(A,{src:e.state.componentBaseUrl+"/"+t})})},t)}));return(0,i.jsx)(u.Z,{maxWidth:"xl",children:(0,i.jsx)(g.ZP,{container:!0,my:2,columns:{xs:4,sm:8,md:12},children:t})})}},{key:"render",value:function(){var e,t=this;return(0,i.jsxs)(p.Z,{theme:G,children:[(0,i.jsx)(s.Z,(e={position:"static",color:"white"},R(e,"position","sticky"),R(e,"style",{minWidth:"850px"}),R(e,"children",(0,i.jsx)(u.Z,{maxWidth:"xl",children:(0,i.jsxs)(c.Z,{disableGutters:!0,children:[(0,i.jsxs)(r.Z,{mx:1,sx:{flexGrow:1,display:"flex"},bgColor:"#fff",children:[(0,i.jsx)(w.Z,{multiple:!1,id:"checkboxes-tags-demo",options:this.state.stencils,disableCloseOnSelect:!1,size:"small",onChange:function(e,n){t.selectStencil(n)},getOptionLabel:function(e){return e.name},renderOption:function(e,t,n){return n.selected,(0,i.jsx)("li",L({},e,{children:t.name}))},style:{minWidth:"250px"},renderInput:function(e){return(0,i.jsx)(j.Z,L({},e,{label:"Stencil",placeholder:"Select stencils to work with"}))}}),(0,i.jsx)(l.Z,{onClick:function(){return t.setState({infoOpen:!0})},"aria-label":"info",disabled:this.state.infoIconDisabled,color:"primary",children:(0,i.jsx)(k.Z,{})})]}),(0,i.jsx)(r.Z,{mx:1,sx:{flexGrow:1,display:"flex"},bgColor:"#fff",children:(0,i.jsxs)(v.Z,{disabled:this.state.viewDisabled,value:this.state.view,exclusive:!0,size:"small",onChange:function(e,n){return t.handleChangeView(n)},children:[(0,i.jsx)(b.Z,{value:"list","aria-label":"list",children:(0,i.jsx)(m.Z,{})}),(0,i.jsx)(b.Z,{value:"canvas","aria-label":"canvas",children:(0,i.jsx)(x.Z,{})})]})}),!0===this.state.zoomHidden?null:(0,i.jsx)(r.Z,{mx:1,sx:{flexGrow:1,display:"flex"},bgColor:"#fff",children:(0,i.jsx)(r.Z,{sx:{width:150},children:(0,i.jsxs)(P.Z,{spacing:2,direction:"row",sx:{mb:1},alignItems:"center",children:[(0,i.jsx)(N.Z,{}),(0,i.jsx)(E.ZP,{"aria-label":"Volume",value:this.state.zoomValue,onChange:function(e,n){t.setState({zoomValue:n})}}),(0,i.jsx)(z.Z,{})]})})}),(0,i.jsx)(r.Z,{mx:1,sx:{flexGrow:0},children:(0,i.jsx)("img",{src:U,alt:"Logo SVG Stencils",width:"200"})})]})})),e)),"list"===this.state.view?this.renderComponentsList():this.renderComponentsCanvas(),(0,i.jsxs)(C.Z,{open:this.state.infoOpen,onClose:function(){t.setState({infoOpen:!1})},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,i.jsx)(M.Z,{id:"alert-dialog-title",children:this.state.stencilMetaName}),(0,i.jsxs)(_.Z,{children:[(0,i.jsxs)(a.Z,{variant:"subtitle2",gutterBottom:!0,component:"div",px:1,children:["author: ",this.state.stencilMetaAuthor]}),(0,i.jsx)(d.Z,{onClick:function(){window.open(t.state.stencilMetaHomePage,"_blank").focus()},children:"Homepage"}),(0,i.jsx)(d.Z,{onClick:function(){window.open(t.state.stencilMetaLicenseUrl,"_blank").focus()},children:"License"}),(0,i.jsx)(a.Z,{variant:"body1",component:"div",px:1,children:this.state.stencilMetaDescription})]}),(0,i.jsx)(S.Z,{children:(0,i.jsx)(d.Z,{onClick:function(){t.setState({infoOpen:!1})},children:"Close"})})]}),(0,i.jsxs)(C.Z,{open:this.state.quickStartOpen,onClose:function(){t.setState({quickStartOpen:!1})},maxWidth:"lg",fullWidth:!0,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,i.jsx)(M.Z,{id:"alert-dialog-title",children:"Quick Start"}),(0,i.jsx)(_.Z,{children:(0,i.jsx)(D.Z,{id:"alert-dialog-description",children:(0,i.jsxs)("video",{controls:!0,width:"750",children:[(0,i.jsx)("source",{src:"/videos/svg-stencils-quickstart.webm",type:"video/webm"}),"Sorry, your browser doesn't support embedded videos."]})})}),(0,i.jsx)(S.Z,{children:(0,i.jsx)(d.Z,{onClick:function(){t.setState({quickStartOpen:!1})},children:"Close"})})]}),(0,i.jsx)(s.Z,{position:"fixed",color:"white",sx:{top:"auto",bottom:"0"},style:{minWidth:"850px"},children:(0,i.jsxs)(c.Z,{variant:"dense",children:[(0,i.jsx)(d.Z,{onClick:function(){t.setState({quickStartOpen:!0})},children:"Quick start movie"}),(0,i.jsx)(r.Z,{sx:{flexGrow:1}}),(0,i.jsx)(d.Z,{onClick:function(){window.location.href="https://github.com/svg-stencils/svg-stencils.github.io/blob/main/DOCUMENTATION.md"},children:"Documentation"}),(0,i.jsx)(d.Z,{onClick:function(){window.location.href="https://github.com/svg-stencils/svg-stencils.github.io/blob/main/DOCUMENTATION.md#how-to-add-my-stencil-to-the-svg-stencils-library"},children:"Add your Stencil"}),(0,i.jsx)(d.Z,{onClick:function(){window.location.href="https://inkscape.org/~mipmip/%E2%98%85svg-stencil-export"},children:"Inkscape Extension"}),(0,i.jsx)(l.Z,{onClick:function(){window.location.href="https://github.com/svg-stencils/svg-stencils.github.io"},children:(0,i.jsx)(O.Z,{})})]})})]})}}])&&H(t.prototype,n),h&&H(t,h),y}(o.Component)}},function(e){e.O(0,[140,774,888,179],(function(){return t=5557,e(e.s=t);var t}));var t=e.O();_N_E=t}]);