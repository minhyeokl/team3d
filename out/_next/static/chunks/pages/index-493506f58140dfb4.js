(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(3678)}])},3678:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var i=t(5893),r=t(7294),a=t(9008),c=t(214),s=t.n(c),o=t(2627),u=t(9299);function l(){var e=(0,r.useState)(4),n=e[0],t=e[1],c=(0,r.useState)(5),l=c[0],f=c[1],h=(0,r.useState)(),p=h[0],d=h[1],g=(0,r.useState)(!0),m=g[0],_=g[1],j=(0,r.useState)(!0),v=j[0],x=j[1],k=(0,r.useState)(""),b=k[0],w=k[1];return(0,i.jsxs)("div",{className:s().container,children:[(0,i.jsxs)(a.default,{children:[(0,i.jsx)("title",{children:"Team3D"}),(0,i.jsx)("meta",{name:"description",content:"Get the TABLE!"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsxs)("main",{className:s().main,children:[(0,i.jsx)("div",{className:s().div,children:(0,i.jsxs)("form",{children:[(0,i.jsxs)("p",{children:["\ubaa9\ucc28 \uc2dc\uc791 \ud398\uc774\uc9c0:",(0,i.jsx)(o.Z,{min:4,step:1,value:n,onChange:t}),(0,i.jsx)("br",{}),"\ubaa9\ucc28 \ub05d \ud398\uc774\uc9c0:",(0,i.jsx)(o.Z,{min:4,step:1,value:l,onChange:f})]}),(0,i.jsx)("input",{type:"file",id:"files",accept:"application/pdf",onChange:function(e){d(e.target.files[0])}}),(0,i.jsxs)("p",{children:[(0,i.jsx)("input",{type:"checkbox",checked:v,onChange:function(e){return x(e.target.checked)}}),"\uc138\ubd80\uc808(1.1.1) \ud3ec\ud568",(0,i.jsx)("br",{}),(0,i.jsx)("input",{type:"checkbox",checked:m,onChange:function(e){return _(e.target.checked)}}),"\ud398\uc774\uc9c0 \ud3ec\ud568",(0,i.jsx)("br",{})]}),(0,i.jsx)("input",{type:"submit",value:"\ubaa9\ucc28 \ucd94\ucd9c\ud558\uae30",onClick:function(e){e.preventDefault();var t=new FileReader,i=[];t.onload=function(){var e=new Uint8Array(this.result);u.getDocument(e).promise.then((function(e){for(var t=e,r=[],a=n-1;a<l;a++)!function(e){var n,i;r.push((n=e,i=t,new Promise((function(e,t){i.getPage(n).then((function(n){n.getTextContent().then((function(n){for(var t=n.items,i=[],r="",a=0,c=/\s/g,s=/^PART /gi,o=/^CHAPTER /gi,u=/^\d+\.\d+ /gi,l=/^\d+\.\d+\.\d+ /gi,f=/\.{5,} \d+/g,h=0;h<t.length;h++){var p=t[h];if(Math.abs(p.transform[5]-a)>=10||h==t.length-1){if(a=p.transform[5],""!=r.trim()){var d=null;if(r.replace(c," "),r.match(s)?d="part":r.match(o)?d="chapter":r.match(u)?d="section":r.match(l)?d="subsection":r.match(f)&&(d="hasPage"),null!=d){var g=r.split(/\.{5,} /g),m=g[0],_=g[1];i.push({category:d,title:m.toUpperCase(),page:null|_})}}r=""}r+=p.str}e(i)}))}))}))))}(a+1);Promise.all(r).then((function(e){for(var n=0;n<e.length;n++)for(var t=0;t<e[n].length;t++)i.push(e[n][t]);var r="";for(n=0;n<i.length;n++)"subsection"==i[n].category&&0==v||("part"==i[n].category||"chapter"==i[n].category?r+="\n":"section"==i[n].category?r+="_":"subsection"==i[n].category&&(r+="__"),r+=i[n].title,1==m&&0!=i[n].page&&(r+=" ",r+=i[n].page),r+="\n");console.log(i),w(r)}))}))},t.readAsArrayBuffer(p)}})]})}),(0,i.jsx)("div",{className:s().result,children:b})]})]})}u.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(u.version,"/pdf.worker.min.js")},214:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",title:"Home_title__T09hD",result:"Home_result__d_VPl",description:"Home_description__41Owk"}},3414:function(){},172:function(){},2001:function(){},3779:function(){},2258:function(){}},function(e){e.O(0,[577,460,774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);