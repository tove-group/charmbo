(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a02ed3b"],{"43e1":function(t,s,e){"use strict";e("efe8")},"4ef5":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"max-width"},[i("div",{staticClass:"po-relative text-align-center"},[i("div",{staticClass:"po-absolute ml-8 mt-3",on:{click:function(s){return t.$router.push({name:"profile"})}}},[i("v-img",{attrs:{src:e("a11e"),height:"56",width:"56"}})],1),i("div",{staticClass:"fw-semi-bold fs-20 py-6"},[t._v("設定")])]),i("div",{staticClass:"charmbo-bgcolor-gray"},[i("div",{staticClass:"charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow"},[t._v("已連結帳號")]),i("div",{staticClass:"pl-12 py-4"},[i("div",{staticClass:"fw-semi-bold"},[t._v(t._s(t.user.provider))]),i("div",{staticClass:"fw-semi-bold charmbo-text-color3"},[t._v(t._s(t.user.email))])]),i("div",{staticClass:"charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow"},[t._v("通知")]),i("div",{staticClass:"pl-12 pr-8 py-4"},[i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("訊息通知")]),i("charmbo-switch")],1),i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("系統通知")]),i("charmbo-switch")],1)]),i("div",{staticClass:"charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow"},[t._v("法務")]),i("div",{staticClass:"pl-12 pr-8 py-4"},[i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("使用者條款")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1),i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("隱私權政策")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1)]),i("div",{staticClass:"charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow"},[t._v("分享與問題回報")]),i("div",{staticClass:"pl-12 pr-8 py-4"},[i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("分享Charmbo")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1),i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("問題舉報")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1),i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("檢舉申訴")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1)]),i("div",{staticClass:"charmbo-bgcolor-white fs14 pl-8 py-1 charmbo-header-shadow"},[t._v("其他")]),i("div",{staticClass:"pl-12 pr-8 py-4"},[i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{on:{click:t.logout}},[t._v("登出")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1),i("div",{staticClass:"d-flex justify-space-between align-center py-2"},[i("div",{},[t._v("刪除帳號")]),i("v-icon",{attrs:{color:"black"}},[t._v("mdi-chevron-right")])],1)])])])},a=[],c=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("label",{staticClass:"switch"},[e("input",{attrs:{type:"checkbox"}}),e("span",{staticClass:"slider round"})])}],r={},l=r,n=(e("43e1"),e("2877")),d=Object(n["a"])(l,c,o,!1,null,"6ca81baa",null),v=d.exports,h={components:{CharmboSwitch:v},data:function(){return{}},created:function(){},computed:{user:function(){return this.$store.state.userinfo}},methods:{logout:function(){var t=this;window.socketConnect=!1,this.$socket.client.disconnect(),this.$store.dispatch("actionLogout").then((function(){t.$router.push({name:"login"})}))}}},p=h,u=e("6544"),b=e.n(u),f=e("132d"),m=e("adda"),w=Object(n["a"])(p,i,a,!1,null,null,null);s["default"]=w.exports;b()(w,{VIcon:f["a"],VImg:m["a"]})},a11e:function(t,s,e){t.exports=e.p+"img/back.0fc8ccc9.svg"},efe8:function(t,s,e){}}]);
//# sourceMappingURL=chunk-3a02ed3b.32736391.js.map