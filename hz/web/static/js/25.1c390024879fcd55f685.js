webpackJsonp([25],{"4h3m":function(s,t){},MHiK:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{active:0,value:"",activeNames:1,showInd:[],list1:[],list2:[],searchVal:"",seachSuc:"",isjh:!1,num:0}},computed:{},created:function(){var s=this;this.showLoading().$post({cmd:"getFirstChilds",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(t){0==t.result?(s.list1=t.dataList?t.dataList:[],s.isjh=0!=t.number,s.$toast.clear()):s.showToast(t.resultNote)}),this.getNew(1)},methods:{jihuo:function(s,t){var a=this;this.showLoading("正在激活").$post({cmd:"activationUser",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),childId:s}).then(function(s){0==s.result?(a.list1[t].flag=1,a.showToast("已激活")):a.showToast(s.resultNote)})},getNew:function(s){var t=this;console.log(s),1==s&&this.list2.length<=0&&this.showLoading().$post({cmd:"myAllChilds",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(s){0==s.result?(t.list2=s.dataList?s.dataList:[],t.num=s.number,t.$toast.clear()):t.showToast(s.resultNote)})},login:function(s,t,a){if(0!=a){this.$store.commit("setuid",s);var i=window.sessionStorage.getItem("uid");window.sessionStorage.setItem("olduid",i),window.sessionStorage.setItem("uid",s),this.$router.push("/index")}else this.showToast("该用户暂无托管")},onSearch:function(){var s=this;/^[0-9]{11}$/.test(this.searchVal)?this.list2.forEach(function(t,a){if(t.phone==s.searchVal)return-1==s.showInd.indexOf("a"+a)&&s.showInd.push("a"+a),void(s.seachSuc="a"+a);t.secondChilds.forEach(function(t,i){if(t.phone==s.searchVal)return-1==s.showInd.indexOf("a"+a)&&s.showInd.push("a"+a),-1==s.showInd.indexOf("a"+a+"b"+i)&&s.showInd.push("a"+a+"b"+i),void(s.seachSuc="a"+a+"b"+i);t.threeChilds.forEach(function(t,n){if(t.phone==s.searchVal)return-1==s.showInd.indexOf("a"+a)&&s.showInd.push("a"+a),-1==s.showInd.indexOf("a"+a+"b"+i)&&s.showInd.push("a"+a+"b"+i),void(s.seachSuc="a"+a+"b"+i+"c"+n);s.showToast("未查找到该手机号")})})}):this.showToast("请输入正确的手机号")},isshow:function(s){return-1!=this.showInd.indexOf(s)},listshow:function(s){-1==this.showInd.indexOf(s)?this.showInd.push(s):this.showInd.splice(this.showInd.indexOf(s),1)}}},n={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",[i("q-head",{attrs:{noleft:!1}},[i("div",{staticClass:"td_1",attrs:{slot:"right"},on:{click:function(t){return s.$router.push("/zhuanshukefu")}},slot:"right"},[i("img",{attrs:{src:a("qSSc"),alt:""}})])]),s._v(" "),i("div",{staticClass:"s_5"}),s._v(" "),i("van-tabs",{attrs:{color:"#3377FF","title-active-color":"#3377FF","title-inactive-color":"#333333"},on:{change:s.getNew},model:{value:s.active,callback:function(t){s.active=t},expression:"active"}},[i("van-tab",{attrs:{title:"直推("+s.list1.length+")"}},[i("van-row",[i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_2"},[s._v("昵称")])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_2"},[s._v("手机号")])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_2"},[s._v("注册时间")])]),s._v(" "),i("van-col",{attrs:{span:"2"}},[i("div",{staticClass:"td_2"},[s._v("奖励")])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_2"},[s._v("状态")])]),s._v(" "),i("van-col",{attrs:{span:"4"}},[i("div",{staticClass:"td_2"},[s._v("操作")])])],1),s._v(" "),s.list1[0]?s._e():i("div",[i("div",{staticClass:"s_2"}),s._v(" "),i("van-row",[i("van-col",{attrs:{span:"20",offset:"2"}},[i("div",{staticStyle:{"text-align":"center"}},[s._v("暂无")])])],1)],1),s._v(" "),s.list1[0]?i("div",s._l(s.list1,function(t,a){return i("van-row",{key:a},[i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.nickName))])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.phone))])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.time))])]),s._v(" "),i("van-col",{attrs:{span:"2"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.money))])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_3"},[s._v(s._s(1==t.flag?"已激活":"未激活"))])]),s._v(" "),i("van-col",{attrs:{span:"4"}},[i("div",{staticClass:"td_3"},[1==t.isHost?i("span",{staticClass:"td_4",on:{click:function(i){return s.login(t.id,a,t.isHost)}}},[s._v("登录")]):s._e(),s._v("  \n              "),2==t.flag&&s.isjh?i("span",{staticClass:"td_4",on:{click:function(i){return s.jihuo(t.id,a)}}},[s._v("激活")]):s._e()])])],1)}),1):s._e()],1),s._v(" "),i("van-tab",{attrs:{title:"团队("+s.num+")"}},[i("van-search",{attrs:{placeholder:"请输入搜索关键词","show-action":"",shape:"round"},on:{search:s.onSearch},model:{value:s.searchVal,callback:function(t){s.searchVal=t},expression:"searchVal"}},[i("div",{attrs:{slot:"action"},on:{click:s.onSearch},slot:"action"},[s._v("搜索")])]),s._v(" "),i("van-row",[i("van-col",{attrs:{span:"2",offset:"1"}},[i("div",{staticClass:"td_2"},[s._v("层级")])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_2"},[s._v("昵称")])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_2"},[s._v("手机号")])]),s._v(" "),i("van-col",{attrs:{span:"7"}},[i("div",{staticClass:"td_2"},[s._v("注册时间")])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_2"},[s._v("状态")])])],1),s._v(" "),s.list2[0]?s._e():i("div",[i("div",{staticClass:"s_2"}),s._v(" "),i("van-row",[i("van-col",{attrs:{span:"20",offset:"2"}},[i("div",{staticStyle:{"text-align":"center"}},[s._v("暂无")])])],1)],1),s._v(" "),s.list2[0]?i("div",s._l(s.list2,function(t,a){return i("div",{key:a,staticClass:"a1"},[i("van-row",[i("van-col",{attrs:{span:"2",offset:"1"}},[i("div",{staticClass:"td_3"},[i("span",{directives:[{name:"show",rawName:"v-show",value:!s.isshow("a"+a),expression:"!isshow('a'+index1)"}],on:{click:function(t){return s.listshow("a"+a)}}},[s._v("+1")]),s._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:s.isshow("a"+a),expression:"isshow('a'+index1)"}],on:{click:function(t){return s.listshow("a"+a)}}},[s._v("-1")])])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.nickName))])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3",class:[s.seachSuc=="a"+a?"rc":""]},[s._v(s._s(t.phone))])]),s._v(" "),i("van-col",{attrs:{span:"7"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.time))])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_3"},[s._v(s._s(1==t.flag?"已激活":"未激活"))])])],1),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:s.isshow("a"+a),expression:"isshow('a'+index1)"}],staticClass:"b1_list"},s._l(t.secondChilds,function(t,n){return i("div",{key:"a"+n,staticClass:"b1_box"},[i("van-row",[i("van-col",{attrs:{span:"2",offset:"2"}},[i("div",{staticClass:"td_3"},[i("span",{directives:[{name:"show",rawName:"v-show",value:!s.isshow("a"+a+"b"+n),expression:"!isshow('a'+index1+'b'+index2)"}],on:{click:function(t){return s.listshow("a"+a+"b"+n)}}},[s._v("+2")]),s._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:s.isshow("a"+a+"b"+n),expression:"isshow('a'+index1+'b'+index2)"}],on:{click:function(t){return s.listshow("a"+a+"b"+n)}}},[s._v("-2")])])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.nickName))])]),s._v(" "),i("van-col",{attrs:{span:"4"}},[i("div",{staticClass:"td_3",class:[s.seachSuc=="a"+a+"b"+n?"rc":""]},[s._v(s._s(t.phone))])]),s._v(" "),i("van-col",{attrs:{span:"7"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.time))])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_3"},[s._v(s._s(1==t.flag?"已激活":"未激活"))])])],1),s._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:s.isshow("a"+a+"b"+n),expression:"isshow('a'+index1+'b'+index2)"}],staticClass:"c3_list"},s._l(t.threeChilds,function(t,e){return i("van-row",{key:"b"+e},[i("van-col",{attrs:{span:"2",offset:"3"}},[i("div",{staticClass:"td_3"},[s._v("3")])]),s._v(" "),i("van-col",{attrs:{span:"4"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.nickName))])]),s._v(" "),i("van-col",{attrs:{span:"5"}},[i("div",{staticClass:"td_3",class:[s.seachSuc=="a"+a+"b"+n+"c"+e?"rc":""]},[s._v(s._s(t.phone))])]),s._v(" "),i("van-col",{attrs:{span:"6"}},[i("div",{staticClass:"td_3"},[s._v(s._s(t.time))])]),s._v(" "),i("van-col",{attrs:{span:"3"}},[i("div",{staticClass:"td_3"},[s._v(s._s(1==t.flag?"已激活":"未激活"))])])],1)}),1)],1)}),0)],1)}),0):s._e()],1)],1)],1)},staticRenderFns:[]};var e=a("VU/8")(i,n,!1,function(s){a("4h3m")},"data-v-1604a3fa",null);t.default=e.exports}});
//# sourceMappingURL=25.1c390024879fcd55f685.js.map