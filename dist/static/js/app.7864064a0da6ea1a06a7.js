webpackJsonp([1],{K2sN:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":"1",router:"",mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},[t("el-menu-item",{attrs:{index:"/"}},[this._v("Home")]),this._v(" "),t("el-menu-item",{attrs:{index:"/Setting"}},[this._v("Setting")])],1),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var a=n("VU/8")({name:"App",data:function(){return{msg:"Welcome to Your Vue.js App"}}},o,!1,function(e){n("K2sN")},null,null).exports,s=n("/ocq"),u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}})])},staticRenderFns:[]};var i=n("VU/8")({name:"TextInput",computed:{text:{get:function(){return this.$store.state.text},set:function(e){this.$store.commit("updateText",e)}}}},u,!1,function(e){n("TRNy")},"data-v-75842dbc",null).exports,l=n("fZjL"),c=n.n(l),d=n("BO1k"),f=n.n(d),p={name:"ResultOutput",methods:{resultCopy:function(){document.getElementById("result").select(),document.execCommand("copy")}},computed:{formatting:function(){var e=this.$store.getters.getInputText.split(" "),t=[""],n=0,r=!0,o=!1,a=0,s={equal:{value:"=",noBreakWords:["#ALL"],spacedWords:[]},openParentheses:{value:"(",noBreakWords:[],spacedWords:[]},closeParentheses:{value:")",noBreakWords:["AS"],spacedWords:[]},as:{value:"AS",noBreakWords:["#ALL"],spacedWords:[]},select:{value:"SELECT",noBreakWords:["TOP","DISTINCT"],spacedWords:["UNION","ALL"]},from:{value:"FROM",noBreakWords:[],spacedWords:[]},where:{value:"WHERE",noBreakWords:[],spacedWords:["#ALL"]},inner:{value:"INNER",noBreakWords:["JOIN"],spacedWords:["#ALL"]},left:{value:"LEFT",noBreakWords:["OUTER","JOIN"],spacedWords:["#ALL"]},outer:{value:"OUTER",noBreakWords:["JOIN"],spacedWords:[]},top:{value:"TOP",noBreakWords:["#ALL"],spacedWords:[]},union:{value:"UNION",noBreakWords:["ALL"],spacedWords:["#ALL"]},full:{value:"FULL",noBreakWords:["OUTER","JOIN"],spacedWords:["#ALL"]},others:{value:"#ALL",noBreakWords:["=","AS"],spacedWords:[]}};return e.forEach(function(u,i,l){r=!0,o=!1;var d=!0,p=!1,v=void 0;try{for(var m,h=f()(c()(s));!(d=(m=h.next()).done);d=!0){var x=m.value;if(u===s[x].value||"#ALL"===s[x].value){var W=!0,L=!1,g=void 0;try{for(var T,y=f()(s[x].spacedWords);!(W=(T=y.next()).done);W=!0){var k=T.value;if(e[i-1]===k||"#ALL"===k){o=!0;break}}}catch(e){L=!0,g=e}finally{try{!W&&y.return&&y.return()}finally{if(L)throw g}}var _=!0,A=!1,N=void 0;try{for(var E,O=f()(s[x].noBreakWords);!(_=(E=O.next()).done);_=!0){var B=E.value;if(e[i+1]===B||"#ALL"===B){console.log("word:"+u),console.log("words[index + 1]:"+e[i+1]),console.log("index:"+i),u+=" ",r=!1;break}}}catch(e){A=!0,N=e}finally{try{!_&&O.return&&O.return()}finally{if(A)throw N}}if(!0===o||!1===r)break}}}catch(e){p=!0,v=e}finally{try{!d&&h.return&&h.return()}finally{if(p)throw v}}if(")"===e[i]&&a--,o&&(t[++n]=""),a>0){t[n]=t[n].replace(/^\t*/,"");for(var R=0;R<a;R++)t[n]="\t"+t[n]}"("===e[i]&&a++,t[n]=t[n]+u,r&&(t[++n]=""),console.log(t[n])}),console.log(t.join("\n")),t.join("\n")}}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.formatting,expression:"formatting"}],attrs:{id:"result",readonly:""},domProps:{value:e.formatting},on:{input:function(t){t.target.composing||(e.formatting=t.target.value)}}})])},staticRenderFns:[]};var m={name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}},methods:{resultCopy:function(){this.$refs.result.resultCopy()}},components:{"text-input":i,"result-output":n("VU/8")(p,v,!1,function(e){n("Qnyn")},"data-v-9e59af32",null).exports}},h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Home")]),this._v(" "),t("el-button",{attrs:{type:"primary",icon:"el-icon-document-copy"},on:{click:this.resultCopy}},[this._v("copy")]),this._v(" "),t("text-input"),this._v(" "),t("result-output",{ref:"result"})],1)},staticRenderFns:[]};var x=n("VU/8")(m,h,!1,function(e){n("TnQq")},"data-v-3fb33cc4",null).exports,W={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h1",[this._v("Setting")])])}]};var L=n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},W,!1,function(e){n("ROfY")},"data-v-34e67780",null).exports;r.default.use(s.a);var g=new s.a({routes:[{path:"/",name:"Home",component:x},{path:"/Setting",name:"Setting",component:L}]}),T=n("NYxO");r.default.use(T.a);var y=new T.a.Store({state:{inputText:"",outputText:""},mutations:{updateText:function(e,t){e.inputText=t}},getters:{formatting:function(e){e.outputText="";var t={select:{value:"SELECT",noBreakWords:["TOP","DISTINCT"]},from:{value:"FROM",noBreakWords:[]}};return e.inputText.split(" ").forEach(function(n,r,o){e.outputText=e.outputText+n+" ";var a=!0,s=!1,u=void 0;try{for(var i,l=f()(c()(t));!(a=(i=l.next()).done);a=!0){var d=i.value;if(console.log(t[d]),n===t[d].value){e.outputText=e.outputText+"\n";break}}}catch(e){s=!0,u=e}finally{try{!a&&l.return&&l.return()}finally{if(s)throw u}}}),e.outputText},getInputText:function(e){return e.inputText}},modules:{}}),k=n("zL8q"),_=n.n(k),A=n("znjY"),N=n.n(A);n("tvR6");r.default.config.productionTip=!1,r.default.use(_.a,{locale:N.a}),new r.default({el:"#app",router:g,store:y,components:{App:a},template:"<App/>"})},Qnyn:function(e,t){},ROfY:function(e,t){},TRNy:function(e,t){},TnQq:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.7864064a0da6ea1a06a7.js.map