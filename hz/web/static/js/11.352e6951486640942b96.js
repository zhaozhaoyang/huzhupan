webpackJsonp([11],{"2rdY":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("q-head"),t._v(" "),a("div",{staticClass:"s_5"}),t._v(" "),a("div",{staticClass:"jytx_1"},[a("div",{staticClass:"jytx_2"},[a("span",[t._v("官方客服微信号->")]),t._v(" "),a("span",[t._v(t._s(t.mes.weiXin))])]),t._v(" "),a("div",{staticClass:"jytx_2"},[a("span",[t._v("收款人->")]),t._v(" "),a("span",[t._v(t._s(t.mes.userName))])]),t._v(" "),a("div",{staticClass:"jytx_2"},[a("span",[t._v("收款银行->")]),t._v(" "),a("span",[t._v(t._s(t.mes.bankName))])]),t._v(" "),a("div",{staticClass:"jytx_2"},[a("span",[t._v("收款账号->")]),t._v(" "),a("span",[t._v(t._s(t.mes.bankNumber))])])]),t._v(" "),a("div",{staticClass:"jytx_3"},[a("img",{staticClass:"jytx_4",attrs:{src:t.mes.image,alt:""}}),t._v(" "),a("span",{staticClass:"jytx_5"},[t._v("微信收款码")])]),t._v(" "),t._m(0),t._v(" "),a("q-button",{attrs:{text:"完成"},on:{click:function(s){return t.$router.go(-1)}}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"jytx_6"},[s("h4",{staticClass:"jytx_7"},[this._v("打款时请备注账号，打款用途")]),this._v(" "),s("h4",{staticClass:"jytx_7"},[this._v("打款后如长时间未到账，请及时与客服联系")])])}]};var i=a("VU/8")({data:function(){return{mes:""}},created:function(){var t=this;this.showLoading().$post({cmd:"getPlatMessage"}).then(function(s){0==s.result?(t.mes=s,t.$toast.clear()):t.showLoading(s.resultNote)})}},e,!1,function(t){a("4Hgx")},"data-v-d0be8dca",null);s.default=i.exports},"4Hgx":function(t,s){}});
//# sourceMappingURL=11.352e6951486640942b96.js.map