(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1d35382"],{"0591":function(t,e,s){var a={"./00.svg":"6550","./01.svg":"1b86","./02.svg":"ad68","./03.svg":"3d47","./04.svg":"2fb5","./05.svg":"7a3d","./06.svg":"2652","./07.svg":"e6dd","./08.svg":"9276","./09.svg":"9959","./10.svg":"7feb","./avatars/b0.svg":"784b","./avatars/b1.svg":"5069","./avatars/b2.svg":"6f51","./avatars/b3.svg":"357d","./avatars/b4.svg":"b2f1","./avatars/b5.svg":"8d5b","./avatars/b6.svg":"c687","./avatars/b7.svg":"aee2","./avatars/b8.svg":"c467","./avatars/b9.svg":"1085","./avatars/ba.svg":"09dc","./avatars/bb.svg":"aa4d","./avatars/bc.svg":"7a6b","./avatars/bd.svg":"8975","./avatars/be.svg":"cccd","./avatars/bf.svg":"c2cd","./avatars/g0.svg":"94bb","./avatars/g1.svg":"a072","./avatars/g2.svg":"0645","./avatars/g3.svg":"c552","./avatars/g4.svg":"93cb","./avatars/g5.svg":"b121","./avatars/g6.svg":"c72a","./avatars/g7.svg":"609f","./avatars/g8.svg":"031a","./avatars/g9.svg":"f8df","./avatars/ga.svg":"1cf8","./avatars/gb.svg":"ac97","./avatars/gc.svg":"444a","./avatars/gd.svg":"d101","./avatars/ge.svg":"d91e","./avatars/gf.svg":"8fc6","./back.svg":"a11e","./charmbo-x.svg":"39d5","./chatroom/emoji-back.svg":"3140","./chatroom/emoji.svg":"b14d","./chatroom/end.svg":"6b9a","./chatroom/image.svg":"d7b6","./chatroom/send-back.svg":"9ff6","./chatroom/send.svg":"1e4a","./dotlist.svg":"dfb3","./down.svg":"134f","./filter.svg":"c86e","./footer/charmbo-active.svg":"ae71","./footer/charmbo-bar.svg":"382d","./footer/charmbo.svg":"d5ed","./footer/chat-active.svg":"1ee5","./footer/chat-bar.svg":"eec0","./footer/chat.svg":"eba5","./footer/member-active.svg":"9245","./footer/member-bar.svg":"3999","./footer/member.svg":"bfa3","./footer/pair-active.svg":"36a4","./footer/pair-bar.svg":"e515","./footer/pair.svg":"06f3","./google.svg":"ccc8","./hart.svg":"9e1c","./information.svg":"425c","./location.svg":"e496","./man.svg":"d41c","./nonsexual.svg":"18f7","./pen-white.svg":"f83c","./pen.svg":"562b","./search.svg":"6f6b","./star.svg":"d8e7","./woman.svg":"8e4c","./x.svg":"8540"};function i(t){var e=n(t);return s(e)}function n(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=n,t.exports=i,i.id="0591"},"134f":function(t,e,s){t.exports=s.p+"img/down.2d9942d2.svg"},"16b7":function(t,e,s){"use strict";s("a9e3");var a=s("2b0e");e["a"]=a["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var s=this;this.clearDelay();var a=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){s.isActive={open:!0,close:!1}[t]},a)}}})},"18f7":function(t,e,s){t.exports=s.p+"img/nonsexual.3c53db28.svg"},"1b86":function(t,e,s){t.exports=s.p+"img/01.9fc76b29.svg"},"1e4a":function(t,e,s){t.exports=s.p+"img/send.4842cc79.svg"},"21be":function(t,e,s){"use strict";var a=s("2909"),i=(s("99af"),s("caad"),s("2532"),s("2b0e")),n=s("80d2");e["a"]=i["a"].extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"===typeof window)return 0;var t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(n["q"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.$el,s=[this.stackMinZIndex,Object(n["q"])(e)],i=[].concat(Object(a["a"])(document.getElementsByClassName("v-menu__content--active")),Object(a["a"])(document.getElementsByClassName("v-dialog__content--active"))),o=0;o<i.length;o++)t.includes(i[o])||s.push(Object(n["q"])(i[o]));return Math.max.apply(Math,s)}}})},2652:function(t,e,s){t.exports=s.p+"img/06.e073fe55.svg"},"2a37":function(t,e,s){"use strict";s("5ccf")},"2fb5":function(t,e,s){t.exports=s.p+"img/04.a9e0fc1e.svg"},3140:function(t,e,s){t.exports=s.p+"img/emoji-back.1c05a03c.svg"},"382d":function(t,e,s){t.exports=s.p+"img/charmbo-bar.fe0fe756.svg"},3999:function(t,e,s){t.exports=s.p+"img/member-bar.e7e41c32.svg"},"3d47":function(t,e,s){t.exports=s.p+"img/03.f7b03d21.svg"},"425c":function(t,e,s){t.exports=s.p+"img/information.88b0646b.svg"},"480e":function(t,e,s){"use strict";s("7db0");var a=s("7560");e["a"]=a["a"].extend({name:"v-theme-provider",props:{root:Boolean},computed:{isDark:function(){return this.root?this.rootIsDark:a["a"].options.computed.isDark.call(this)}},render:function(){return this.$slots.default&&this.$slots.default.find((function(t){return!t.isComment&&" "!==t.text}))}})},"4ad4":function(t,e,s){"use strict";var a=s("53ca"),i=(s("caad"),s("b64b"),s("b0c0"),s("16b7")),n=s("f2e7"),o=s("58df"),r=s("80d2"),c=s("d9bd"),u=Object(o["a"])(i["a"],n["a"]);e["a"]=u.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(a["a"])(t))}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean,openOnFocus:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave","focus"],listeners:{}}},watch:{activator:"resetActivator",openOnFocus:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(r["p"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(c["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=Object.keys(this.listeners),e=0,s=t;e<s.length;e++){var a=s[e];this.getActivator().addEventListener(a,this.listeners[a])}}},genActivator:function(){var t=Object(r["o"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):e.click=function(e){var s=t.getActivator(e);s&&s.focus(),e.stopPropagation(),t.isActive=!t.isActive},this.openOnFocus&&(e.focus=function(e){t.getActivator(e),e.stopPropagation(),t.isActive=!t.isActive}),e},getActivator:function(t){var e;if(this.activatorElement)return this.activatorElement;var s=null;if(this.activator){var a=this.internalActivator?this.$el:document;s="string"===typeof this.activator?a.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var i=this.activatorNode[0].componentInstance;s=i&&i.$options.mixins&&i.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?i.getActivator():this.activatorNode[0].elm}else t&&(s=t.currentTarget||t.target);return this.activatorElement=(null==(e=s)?void 0:e.nodeType)===Node.ELEMENT_NODE?s:null,this.activatorElement},getContentSlot:function(){return Object(r["o"])(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=Object.keys(this.listeners),e=0,s=t;e<s.length;e++){var a=s[e];this.activatorElement.removeEventListener(a,this.listeners[a])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},"562b":function(t,e,s){t.exports=s.p+"img/pen.b978da78.svg"},"5ccf":function(t,e,s){},6550:function(t,e,s){t.exports=s.p+"img/00.51769663.svg"},"6b9a":function(t,e,s){t.exports=s.p+"img/end.5b6791c6.svg"},"6f6b":function(t,e,s){t.exports=s.p+"img/search.33ec9171.svg"},"75eb":function(t,e,s){"use strict";var a=s("ade3"),i=s("53ca"),n=(s("159b"),s("9d65")),o=s("80d2"),r=s("58df"),c=s("d9bd");function u(t){var e=Object(i["a"])(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}e["a"]=Object(r["a"])(n["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:u},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){if(t.activatorNode){var e=Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode];e.forEach((function(e){if(e.elm&&t.$el.parentNode){var s=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,s)}}))}}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode){var t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}}catch(e){console.log(e)}},methods:{getScopeIdAttrs:function(){var t=Object(o["m"])(this.$vnode,"context.$options._scopeId");return t&&Object(a["a"])({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||(t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(c["c"])("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},"7a3d":function(t,e,s){t.exports=s.p+"img/05.f1af9de1.svg"},"7feb":function(t,e,s){t.exports=s.p+"img/10.c297544b.svg"},"8e4c":function(t,e,s){t.exports=s.p+"img/woman.606a8b66.svg"},9276:function(t,e,s){t.exports=s.p+"img/08.35169da2.svg"},"94af":function(t,e,s){"use strict";s("fcc7")},9959:function(t,e,s){t.exports=s.p+"img/09.5a435bdc.svg"},"9d65":function(t,e,s){"use strict";var a=s("d9bd"),i=s("2b0e");e["a"]=i["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:function(){return{isBooted:!1}},computed:{hasContent:function(){return this.isBooted||this.eager||this.isActive}},watch:{isActive:function(){this.isBooted=!0}},created:function(){"lazy"in this.$attrs&&Object(a["d"])("lazy",this)},methods:{showLazyContent:function(t){return this.hasContent&&t?t():[this.$createElement()]}}})},"9ff6":function(t,e,s){t.exports=s.p+"img/send-back.25ba3e2b.svg"},a293:function(t,e,s){"use strict";var a=s("53ca"),i=s("dd89");function n(){return!0}function o(t,e,s){if(!t||!1===r(t,s))return!1;var n=Object(i["a"])(e);if(n instanceof ShadowRoot&&n.host===t.target)return!1;var o=("object"===Object(a["a"])(s.value)&&s.value.include||function(){return[]})();return o.push(e),!o.some((function(e){return e.contains(t.target)}))}function r(t,e){var s="object"===Object(a["a"])(e.value)&&e.value.closeConditional||n;return s(t)}function c(t,e,s){var a="function"===typeof s.value?s.value:s.value.handler;e._clickOutside.lastMousedownWasOutside&&o(t,e,s)&&setTimeout((function(){r(t,s)&&a&&a(t)}),0)}function u(t,e){var s=Object(i["a"])(t);e(document.body),s instanceof ShadowRoot&&e(s)}var l={inserted:function(t,e){var s=function(s){return c(s,t,e)},a=function(s){t._clickOutside.lastMousedownWasOutside=o(s,t,e)};u(t,(function(t){t.addEventListener("click",s,!0),t.addEventListener("mousedown",a,!0)})),t._clickOutside={lastMousedownWasOutside:!0,onClick:s,onMousedown:a}},unbind:function(t){t._clickOutside&&(u(t,(function(e){e&&t._clickOutside&&(e.removeEventListener("click",t._clickOutside.onClick,!0),e.removeEventListener("mousedown",t._clickOutside.onMousedown,!0))})),delete t._clickOutside)}};e["a"]=l},ad68:function(t,e,s){t.exports=s.p+"img/02.734ad3b0.svg"},b14d:function(t,e,s){t.exports=s.p+"img/emoji.50d4ae1a.svg"},b848:function(t,e,s){"use strict";var a=s("2909"),i=s("58df");function n(t){for(var e=[],s=0;s<t.length;s++){var i=t[s];i.isActive&&i.isDependent?e.push(i):e.push.apply(e,Object(a["a"])(n(i.$children)))}return e}e["a"]=Object(i["a"])().extend({name:"dependent",data:function(){return{closeDependents:!0,isActive:!1,isDependent:!0}},watch:{isActive:function(t){if(!t)for(var e=this.getOpenDependents(),s=0;s<e.length;s++)e[s].isActive=!1}},methods:{getOpenDependents:function(){return this.closeDependents?n(this.$children):[]},getOpenDependentElements:function(){for(var t=[],e=this.getOpenDependents(),s=0;s<e.length;s++)t.push.apply(t,Object(a["a"])(e[s].getClickableDependentElements()));return t},getClickableDependentElements:function(){var t=[this.$el];return this.$refs.content&&t.push(this.$refs.content),this.overlay&&t.push(this.overlay.$el),t.push.apply(t,Object(a["a"])(this.getOpenDependentElements())),t}}})},c66d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"member-container max-width"},[a("div",{staticClass:"charmbo-scroll"},[a("div",{staticClass:"profile-bg pt-7 pb-3 charmbo-header-shadow"},[a("div",{staticClass:"rel",on:{click:function(e){return t.$router.push({name:"photoEditor"})}}},[a("v-img",{staticClass:"rounded-circle mx-auto img-avatar cursor-pointer",class:{isAvatarHovering:t.isAvatarHovering},staticStyle:{border:"2px solid #F2C611"},attrs:{width:"120",height:"120",src:t.getImg},on:{mouseover:function(e){t.isAvatarHovering=!0},mouseout:function(e){t.isAvatarHovering=!1}}}),a("v-icon",{staticClass:"rounded-circle plus-icon",attrs:{size:"30",color:"#F2C611"}},[t._v("mdi-plus-circle")])],1),a("div",{staticClass:"d-flex justify-center align-center py-3"},[a("div",{staticClass:"mx-1 profile-name d-inline-flex align-center"},[a("div",{staticClass:"flex-grow-1 my-2 ml-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"fs-14",staticStyle:{"text-align":"center"},attrs:{size:2*t.userName.length},domProps:{value:t.userName},on:{blur:function(e){return t.update("userName")},change:function(e){t.hasChange=!0},input:function(e){e.target.composing||(t.userName=e.target.value)}}})]),a("div",{staticClass:"flex-grow-0 ma-3"},[a("v-img",{attrs:{src:s("562b"),height:"14",width:"14"}})],1)]),a("div",{staticClass:"fs-14 mx-1 py-3"},[t._v(t._s(t.age))])]),a("div",{staticClass:"d-flex justify-center py-3"},[a("div",{staticClass:"mx-2"},[a("charmbo-button",{attrs:{outline:""},on:{click:function(e){return t.$router.push({name:"setting"})}}},[a("div",{staticClass:"fs-16 fw-semi-bold"},[t._v("設定")])])],1),a("div",{staticClass:"mx-2"},[a("charmbo-button",{on:{click:function(e){t.infoDialog=!0}}},[a("div",{staticClass:"fs-16 fw-semi-bold"},[t._v("檔案預覽")])])],1)])]),a("div",{staticClass:"charmbo-bgcolor-gray pa-8 fs-14"},[a("div",{staticClass:"fw-medium mb-1"},[t._v("自我介紹")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.user.summary,expression:"user.summary"}],staticClass:"inputClass input-border charmbo-input py-2 px-3",attrs:{placeholder:"寫下你的自我介紹，平時喜歡做什麼？想認識什麼樣的朋友？可以讓人更快速地認識你喔！",disabled:!t.isEdit},domProps:{value:t.user.summary},on:{input:function(e){e.target.composing||t.$set(t.user,"summary",e.target.value)}}}),t._v(" "),a("div",{staticClass:"fw-medium mt-6 mb-1 d-flex align-center"},[a("div",{staticClass:"mr-1"},[t._v("興趣愛好")]),a("div",[a("v-img",{attrs:{src:t.countImg,height:"16",width:"16"}})],1)]),a("div",{staticClass:"input-border d-flex flex-wrap pa-2",class:t.isEdit?"charmbo-bgcolor-white":"",on:{click:function(e){t.isEdit&&t.$router.push({name:"interestSetting"})}}},[0===t.user.interestlist.length?a("div",{staticClass:"ma-1 charmbo-text-color6"},[t._v("點擊選擇你的愛好！")]):t._e(),t._l(t.user.interestlist,(function(e,s){return a("div",{key:s,staticClass:"my-1 mx-1 px-3 py-1 charmbo-bgcolor-chat interest-border"},[t._v(" "+t._s(e)+" ")])}))],2),a("div",{staticClass:"d-flex"},[a("div",{staticClass:"flex-basis-1 mr-3"},[a("div",{staticClass:"fw-medium mt-6 mb-1"},[t._v("我常出現在")]),a("charmbo-select",{attrs:{label:"縣市",items:t.locationItems,disabled:!t.isEdit},model:{value:t.user.location,callback:function(e){t.$set(t.user,"location",e)},expression:"user.location"}})],1),a("div",{staticClass:"flex-basis-1 ml-3"},[a("div",{staticClass:"fw-medium mt-6 mb-1"},[t._v("職業")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.job,expression:"user.job"}],staticClass:"input-border charmbo-input py-2 px-3",attrs:{placeholder:"工作",disabled:!t.isEdit},domProps:{value:t.user.job},on:{input:function(e){e.target.composing||t.$set(t.user,"job",e.target.value)}}})])]),a("div",{staticClass:"d-flex"},[a("div",{staticClass:"flex-basis-1 mr-3"},[a("div",{staticClass:"fw-medium mt-6 mb-1"},[t._v("戀愛取向")]),a("charmbo-select",{attrs:{label:"性別",items:t.sexItems,disabled:!t.isEdit},model:{value:t.user.expectationSex,callback:function(e){t.$set(t.user,"expectationSex",e)},expression:"user.expectationSex"}})],1),a("div",{staticClass:"flex-basis-1 ml-3"})]),a("div",{staticClass:"d-flex"},[a("div",{staticClass:"flex-basis-1 mr-3"},[a("div",{staticClass:"fw-medium mt-6 mb-1"},[t._v("感情狀態")]),a("charmbo-select",{attrs:{label:"狀態",items:t.relationItems,disabled:!t.isEdit},model:{value:t.user.status,callback:function(e){t.$set(t.user,"status",e)},expression:"user.status"}})],1),a("div",{staticClass:"flex-basis-1 ml-3"},[a("div",{staticClass:"fw-medium mt-6 mb-1"},[t._v("我想尋找")]),a("charmbo-select",{attrs:{label:"關係",items:t.findItems,disabled:!t.isEdit},model:{value:t.user.lookingFor,callback:function(e){t.$set(t.user,"lookingFor",e)},expression:"user.lookingFor"}})],1)]),a("div",{staticClass:"text-center mt-8"},[t.isEdit?t._e():a("charmbo-button",{on:{click:function(e){t.isEdit=!0}}},[a("div",{staticClass:"fs-16 fw-semi-bold"},[t._v("更改")])]),t.isEdit&&t.showClearAll?a("span",{staticClass:"fs-16 fw-semi-bold mr-5 charmbo-color-primary",on:{click:t.clearAll}},[t._v("全部清除")]):t._e(),t.isEdit?a("charmbo-button",{on:{click:function(e){t.isEdit=!1}}},[a("div",{staticClass:"fs-16 fw-semi-bold",on:{click:t.updateAll}},[t._v("確認")])]):t._e()],1)]),a("v-dialog",{attrs:{"content-class":"user-dialog","overlay-color":"#000000","overlay-opacity":"0.6"},model:{value:t.infoDialog,callback:function(e){t.infoDialog=e},expression:"infoDialog"}},[a("user-detail-card",{attrs:{user:t.user}}),a("div",{staticClass:"d-flex align-center justify-center rounded-circle charmbo-bgcolor-white mx-auto my-8",staticStyle:{width:"48px",height:"48px"},on:{click:function(e){t.infoDialog=!1}}},[a("img",{attrs:{src:s("39d5"),height:"16",width:"16"}})])],1)],1),a("footer-bar",{attrs:{activeTab:"profile"}})],1)},i=[],n=(s("d3b7"),s("25f0"),s("fb6a"),s("ac1f"),s("1276"),s("fd2d")),o=s("a62f"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"charmbo-select",class:t.disabled?"":"charmbo-select-active"},[a("div",{staticClass:"d-flex align-center justify-space-between px-3",on:{click:t.clickHandle}},[a("div",{staticClass:"py-2",class:t.hasValue?"":"charmbo-text-color6"},[t._v(t._s(t.selectString))]),a("div",[a("v-img",{attrs:{src:s("134f"),height:"7",width:"13"}})],1)]),t.isShowList?a("div",{staticClass:"charmbo-list charmbo-scroll charmbo-bgcolor-white mt-1"},t._l(t.items,(function(e){return a("div",{key:e.value,staticClass:"px-3 py-2",staticStyle:{"border-bottom":"1px solid #D6D5D1"},on:{click:function(s){return t.selectItem(e)}}},[t._v(t._s(e.text))])})),0):t._e()])},c=[],u=(s("a9e3"),s("7db0"),{model:{prop:"value",event:"change"},props:{items:{type:Array,default:function(){return[]}},label:{type:String,default:""},disabled:{type:Boolean,default:!1},value:[String,Number]},data:function(){return{isShowList:!1}},computed:{selectString:function(){var t,e=this;return(null===(t=this.items.find((function(t){return t.value==e.value})))||void 0===t?void 0:t.text)||this.label},hasValue:function(){var t=this;return!!this.items.find((function(e){return e.value==t.value}))}},methods:{selectItem:function(t){this.$emit("change",t.value),this.isShowList=!1},clickHandle:function(){this.disabled||(this.isShowList=!this.isShowList)}},watch:{disabled:function(){this.disabled&&(this.isShowList=!1)}}}),l=u,v=(s("94af"),s("2877")),d=s("6544"),h=s.n(d),f=s("adda"),m=Object(v["a"])(l,r,c,!1,null,null,null),g=m.exports;h()(m,{VImg:f["a"]});var p=s("0ee9"),b={components:{FooterBar:n["a"],CharmboButton:o["a"],CharmboSelect:g,UserDetailCard:p["a"]},data:function(){return{userName:"",sexItems:[{value:0,text:"異性戀"},{value:1,text:"同性戀"},{value:2,text:"雙性戀"}],relationItems:[{value:0,text:"戀愛中"},{value:1,text:"單身中"},{value:2,text:"開放式關係中"}],findItems:[{value:"男女朋友",text:"男女朋友"},{value:"朋友",text:"朋友"},{value:"不拘",text:"不拘"},{value:"炮友",text:"炮友"}],locationItems:[{value:"台北市",text:"台北市"},{value:"新北市",text:"新北市"},{value:"桃園市",text:"桃園市"},{value:"台中市",text:"台中市"},{value:"台南市",text:"台南市"},{value:"高雄市",text:"高雄市"},{value:"基隆市",text:"基隆市"},{value:"新竹市",text:"新竹市"},{value:"嘉義市",text:"嘉義市"},{value:"新竹縣",text:"新竹縣"},{value:"苗栗縣",text:"苗栗縣"},{value:"彰化縣",text:"彰化縣"},{value:"南投縣",text:"南投縣"},{value:"雲林縣",text:"雲林縣"},{value:"嘉義縣",text:"嘉義縣"},{value:"屏東縣",text:"屏東縣"},{value:"宜蘭縣",text:"宜蘭縣"},{value:"花蓮縣",text:"花蓮縣"},{value:"台東縣",text:"台東縣"},{value:"澎湖縣",text:"澎湖縣"},{value:"金門縣",text:"金門縣"},{value:"連江縣",text:"連江縣"}],hasChange:!1,interestString:"",isAvatarHovering:!1,infoDialog:!1,isEdit:!1}},created:function(){var t=this;this.$store.dispatch("actionUserinfo").then((function(e){t.interestString=e.interestlist.toString(),t.userName=e.userName}))},computed:{user:function(){return this.$store.state.userinfo},getImg:function(){var t=this.$store.state.userinfo;if(t&&t.pictures&&t.pictures.main&&t.pictures.main.url)return t.pictures.main.url;var e=t._id||"1234567890abcdef".charAt(Math.floor(16*Math.random())),a=t.sex;"undefined"!=typeof a&&null!=a||(a="01".charAt(Math.floor(2*Math.random())));var i=0==a?"g":"b",n=e.charAt(e.length-1);return t.pictures.main.url=s("2cbd")("./"+i+n+".svg"),t.pictures.main.url},age:function(){if(this.user.birthday){var t=new Date,e=new Date(this.user.birthday);return parseInt((t-e)/31536e6)}return"秘密"},horoscope:function(){var t=new Date(this.user.birthday),e=t.getMonth()+1,s=t.getDate(),a="aquarius";return(1==e&&s>=20||2==e&&s<=18)&&(a="aquarius"),(2==e&&s>=19||3==e&&s<=20)&&(a="pisces"),(3==e&&s>=21||4==e&&s<=19)&&(a="aries"),(4==e&&s>=20||5==e&&s<=20)&&(a="taurus"),(5==e&&s>=21||6==e&&s<=21)&&(a="gemini"),(6==e&&s>=22||7==e&&s<=22)&&(a="cancer"),(7==e&&s>=23||8==e&&s<=22)&&(a="leo"),(8==e&&s>=23||9==e&&s<=22)&&(a="virgo"),(9==e&&s>=23||10==e&&s<=22)&&(a="libra"),(10==e&&s>=23||11==e&&s<=21)&&(a="scorpio"),(11==e&&s>=22||12==e&&s<=21)&&(a="sagittarius"),(12==e&&s>=22||1==e&&s<=19)&&(a="capricorn"),a},countImg:function(){var t=("0"+this.user.interestlist.length).slice(-2);return s("0591")("./"+t+".svg")},showClearAll:function(){return""!=this.user.summary||0!=this.user.interestlist.length||""!=this.user.location||""!=this.user.job||null!=this.user.expectationSex||null!=this.user.status||""!=this.user.lookingFor}},methods:{update:function(t){var e=this;if(this.hasChange){var s={userData:{}};switch(t){case"userName":if(""==this.userName)return void(this.userName=this.user.userName);this.userName=this.userName.substr(0,15),this.user.userName=this.userName,s.userData[t]=this.user[t];break;case"summary":s.userData[t]=this.user[t];break;case"job":s.userData[t]=this.user[t];break;case"location":s.userData[t]=this.user[t];break;case"expectationSex":s.userData[t]=this.user[t];break;case"status":s.userData[t]=this.user[t];break;case"lookingFor":s.userData[t]=this.user[t];break;case"interest":s.userData.interestlist=this.interestString.split(",");break}this.$store.dispatch("actionUserUpdate",s).then((function(t){console.log("ok",t),e.hasChange=!1}))}},clearAll:function(){this.user.summary="",this.user.interestlist=[],this.user.location="",this.user.job="",this.user.expectationSex=null,this.user.status=null,this.user.lookingFor=""},updateAll:function(){var t=this,e={userData:{summary:this.user.summary,location:this.user.location,job:this.user.job,expectationSex:this.user.expectationSex,status:this.user.status,lookingFor:this.user.lookingFor}};this.$store.dispatch("actionUserUpdate",e).then((function(){t.$store.dispatch("actionUserinfo")}))}}},x=b,y=(s("2a37"),s("169a")),C=s("132d"),k=Object(v["a"])(x,a,i,!1,null,null,null);e["default"]=k.exports;h()(k,{VDialog:y["a"],VIcon:C["a"],VImg:f["a"]})},c86e:function(t,e,s){t.exports=s.p+"img/filter.902161f1.svg"},ccc8:function(t,e,s){t.exports=s.p+"img/google.5fede944.svg"},d41c:function(t,e,s){t.exports=s.p+"img/man.bf1a5603.svg"},d7b6:function(t,e,s){t.exports=s.p+"img/image.ce57ab28.svg"},d8e7:function(t,e,s){t.exports=s.p+"img/star.4a038c3c.svg"},dd89:function(t,e,s){"use strict";function a(t){if("function"!==typeof t.getRootNode){while(t.parentNode)t=t.parentNode;return t!==document?null:document}var e=t.getRootNode();return e!==document&&e.getRootNode({composed:!0})!==document?null:e}s.d(e,"a",(function(){return a}))},e4d3:function(t,e,s){"use strict";var a=s("2b0e");e["a"]=a["a"].extend({name:"returnable",props:{returnValue:null},data:function(){return{isActive:!1,originalValue:null}},watch:{isActive:function(t){t?this.originalValue=this.returnValue:this.$emit("update:return-value",this.originalValue)}},methods:{save:function(t){var e=this;this.originalValue=t,setTimeout((function(){e.isActive=!1}))}}})},e515:function(t,e,s){t.exports=s.p+"img/pair-bar.869f8ec0.svg"},e6dd:function(t,e,s){t.exports=s.p+"img/07.f695b1d5.svg"},eec0:function(t,e,s){t.exports=s.p+"img/chat-bar.19825025.svg"},f83c:function(t,e,s){t.exports=s.p+"img/pen-white.f14a4c6f.svg"},fcc7:function(t,e,s){}}]);
//# sourceMappingURL=chunk-e1d35382.755d3122.js.map