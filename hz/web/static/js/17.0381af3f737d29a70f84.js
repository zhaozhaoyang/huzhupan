webpackJsonp([17],{"/oti":function(t,s){},px9k:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={data:function(){return{list:[],totalPage:0,isload:!0,page:1}},created:function(){this._getList(),window.onscroll=function(){this.isload&&!this.isend&&((document.body.scrollTop||document.documentElement.scrollTop)+(("CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight)-0)+100>=(document.body.scrollHeight||document.documentElement.scrollHeight)-0&&this._getList())}.bind(this)},methods:{_getList:function(){var t=this;this.isload&&(1!=this.page&&this.page>this.totalPage||(this.isload=!1,this.showLoading().$post({cmd:"getPointsList",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),nowPage:this.page,pageCount:40}).then(function(s){0==s.result?(t.page=t.page+1,t.isload=!0,t.$toast.clear(),t.list=t.list.concat(s.dataList),t.totalPage=s.totalPage):t.showToast(s.resultNote)})))}}},i={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("q-head"),t._v(" "),a("div",{staticClass:"s_6"}),t._v(" "),a("div",{staticClass:"jf_2"},[a("van-row",[a("van-col",{attrs:{span:"2",offset:"1"}},[a("div",{staticClass:"jf_1"},[t._v("类型")])]),t._v(" "),a("van-col",{attrs:{span:"10"}},[a("div",{staticClass:"jf_1"},[t._v("交易号")])]),t._v(" "),a("van-col",{attrs:{span:"4"}},[a("div",{staticClass:"jf_1"},[t._v("获取积分")])]),t._v(" "),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"jf_1"},[t._v("时间")])])],1)],1),t._v(" "),t.list[0]?t._e():a("div",[a("div",{staticClass:"s_2"}),t._v(" "),a("van-row",[a("van-col",{attrs:{span:"20",offset:"2"}},[a("div",{staticStyle:{"text-align":"center"}},[t._v("暂无")])])],1)],1),t._v(" "),t.list[0]?a("div",{staticClass:"jf_4"},t._l(t.list,function(s,e){return a("van-row",{key:e},[a("van-col",{attrs:{span:"4"}},[a("div",{staticClass:"jf_3"},[t._v(t._s(s.name))])]),t._v(" "),a("van-col",{attrs:{span:"10"}},[a("div",{staticClass:"jf_3"},[t._v(t._s(s.orderNum))])]),t._v(" "),a("van-col",{attrs:{span:"4"}},[a("div",{staticClass:"jf_3"},[t._v(t._s(s.score))])]),t._v(" "),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"jf_3"},[t._v(t._s(s.time))])])],1)}),1):t._e()],1)},staticRenderFns:[]};var o=a("VU/8")(e,i,!1,function(t){a("/oti")},"data-v-6eac96fe",null);s.default=o.exports}});
//# sourceMappingURL=17.0381af3f737d29a70f84.js.map