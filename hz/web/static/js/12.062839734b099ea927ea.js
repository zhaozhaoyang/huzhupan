webpackJsonp([12],{"10pv":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o={data:function(){return{show:!0,mes:""}},created:function(){this._getkefu()},methods:{showBox:function(){this.show=!1},_getkefu:function(){var t=this;this.$post({cmd:"getHelp",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(s){0==s.result?t.mes=s:t.showToast(s.resultNote)})},changeK:function(){var t=this;this.showLoading("正在更换").$post({cmd:"changeHelp",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(s){if(0==s.result)return t.$post({cmd:"getHelp",uid:t.$store.state.uid||window.sessionStorage.getItem("uid")});t.showToast(s.resultNote)}).then(function(s){0==s.result?(t.mes=s,t.showToast("更换成功")):t.showToast(s.resultNote)})}}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("q-head",{attrs:{text:"专属客服"}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[e("q-confirm",{attrs:{text:"专属客服",show:t.show},on:{click:t.showBox}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("h4",{staticClass:"zskf_1"},[t._v("官方客服微信号-> "+t._s(t.mes.weiXin))]),t._v(" "),e("h6",{staticClass:"zskf_2"},[t._v("请仔细核对微信号，防止骗子")])]),t._v(" "),e("div",{attrs:{slot:"btn"},slot:"btn"},[e("div",{staticClass:"zskf_3"},[e("div",{staticClass:"zskf_4 zskf_6",on:{click:t.changeK}},[t._v("更换客服")]),t._v(" "),e("div",{staticClass:"zskf_5 zskf_6",on:{click:function(s){return t.$router.go(-1)}}},[t._v("确定")])])])])],1)],1)},staticRenderFns:[]};var i=e("VU/8")(o,n,!1,function(t){e("J+nv")},"data-v-9a43c5ec",null);s.default=i.exports},"J+nv":function(t,s){}});
//# sourceMappingURL=12.062839734b099ea927ea.js.map