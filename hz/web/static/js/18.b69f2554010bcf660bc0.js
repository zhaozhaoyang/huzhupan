webpackJsonp([18],{dAjm:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={data:function(){return{isLoading:!1,show:[!1,!1,!1,!1,!1],checked:!1,list:[],totalPage:0,isload:!0,page:1,buy:"",buyNum:0,isfast:2,mes:"",sellzh:1,tixian:"",bankId:"",yuyueList:[],yuyueTime:"",zdmoney:"",upmoney:"",yuyueData:[],flag:!1,lastBuy:0,sel1:!1,selMay:["买入/卖出","",!1,[{name:"买入/卖出",num:""},{name:"买入",num:1},{name:"卖出",num:2}]],sel2:!1,selTai:["进行中",1,!0,[{name:"进行中",num:1},{name:"已完成",num:3},{name:"全部",num:""}]],gonggao:{content:"",time:""}}},created:function(){this._getList(this.selMay[1],this.selTai[1]),this._getMes(),window.onscroll=function(){this.isload&&!this.isend&&((document.body.scrollTop||document.documentElement.scrollTop)+(("CSS1Compat"==document.compatMode?document.documentElement.clientHeight:document.body.clientHeight)-0)+100>=(document.body.scrollHeight||document.documentElement.scrollHeight)-0&&this._getList(this.selMay[1],this.selTai[1]))}.bind(this)},computed:{},watch:{checked:function(){var t=this;this.$post({cmd:"editUserInfo",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),phone:"",icon:"",nickName:"",drawsNumber:"",email:"",flag:"",time:"",isOpen:this.checked?1:0,isHost:""}).then(function(s){0==s.result?t.mes.isOpen=t.checked?1:0:t.showToast(s.resultNote)})}},methods:{SBkehu:function(){var t=this;1==this.mes.hitStatus&&this.$dialog.confirm({title:"提示",message:"默认防撞，一旦开启预约功能会有多笔订单入场"}).then(function(s){t.checked=!0,t.mes.hitStatus=2}).catch(function(){t.checked=!1})},click1:function(){this.sel2=!1,this.sel1=!this.sel1},click2:function(){this.sel1=!1,this.sel2=!this.sel2},select1:function(t){this.sel1=!1;var s=this.selTai[1];this.selMay[0]=t.name,this.selMay[1]=t.num,this.list=[],this.totalPage=0,this.isload=!0,this.page=1,this._getList(t.num,s)},select2:function(t){this.sel2=!1;var s=this.selMay[1];this.selTai[0]=t.name,this.selTai[1]=t.num,this.list=[],this.totalPage=0,this.isload=!0,this.page=1,this._getList(s,t.num)},isLa:function(){this.list=[],this.totalPage=0,this.isload=!0,this.page=1,this._getList(this.selMay[1],this.selTai[1])},gojh:function(){var t=this;this.showLoading("正在激活").$post({cmd:"activationUser",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),childId:""}).then(function(s){0==s.result?(t.flag=!1,t.showToast("激活成功"),t._getMes(),t.hideBox(2)):(t.showToast(s.resultNote),t.showBox(2))})},gotoyuyue:function(){var t=this;this.checked?this.buy.length>3&&this.buy%1e3!=0?this.showToast("请输入1000的倍数"):this.showLoading("正在提交排单").$post({cmd:"reservationOrder",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),settingId:this.yuyueTime,money:this.buy}).then(function(s){0==s.result?(t.showToast("自动排单成功"),t.lastBuy=t.buy,t.yuyue()):t.showToast(s.resultNote)}):this.showToast("您还未开启自动排单功能")},yuyue:function(t){var s=this;0==this.yuyueList.length?this.showLoading().$post({cmd:"getSettingList"}).then(function(t){0==t.result?(s.yuyueList=t.dataList,s.yuyueTime=s.yuyueTime?s.yuyueTime:t.dataList[0].id):s.showToast(t.resultNote)}):this.showBox(3),this.$post({cmd:"getReservationList",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(t){s.yuyueData=t.dataList?t.dataList:[],s.$toast.clear(),s.showBox(3)})},buyIn:function(t){this.flag?this.showBox(2):(this.isfast=t,this.showBox(1))},changetx:function(){var t=this;if(""!=this.tixian){if(1==this.sellzh){if(this.tixian-0<2e3)return void this.showToast("下限为2000");if(this.tixian.length-0>2&&this.tixian%100!=0)return void this.showToast("请输入100的倍数")}if(2==this.sellzh){if(this.tixian-0<200)return void this.showToast("下限为200");if(this.tixian.length-0>2&&this.tixian%100!=0)return void this.showToast("请输入100的倍数")}this.showLoading("正在提交").$post({cmd:"sellOut",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),type:this.sellzh,bankId:this.bankId,money:this.tixian}).then(function(s){0==s.result&&(t.hideBox(4),t.list=[],t.page=1,t._getList(t.selMay[1],t.selTai[1]),t._getMes()),t.showToast(s.resultNote)})}else this.showToast("请输入提现金额")},buypuer:function(){var t=this;0==this.mes.size&&(this.buy-0>5e3||this.buy-0<2e3)?this.showToast("购买金额不能低于上次金额"):this.buy.length>3&&this.buy%1e3!=0?this.showToast("请输入1000的倍数"):this.showLoading("正在购买").$post({cmd:"buyIn",uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),type:this.isfast,money:this.buy}).then(function(s){0==s.result?(t.hideBox(1),t.showBox(0),t.list=[],t.page=1,t._getList(t.selMay[1],t.selTai[1]),t._getMes()):t.showToast(s.resultNote)})},canBuy:function(){this.buy-0>this.upmoney-0?this.buy=this.buy.slice(0,this.buy.length-1):(this.buy.length>2&&this.buy,this.buyNum=parseInt(this.buy/100))},_buypuer:function(t,s,i){},_getMes:function(){var t=this;this.$post({cmd:"getUserInfo",uid:this.$store.state.uid||window.sessionStorage.getItem("uid")}).then(function(s){0==s.result?(t.mes=s,s.content&&!window.sessionStorage.getItem("ad")&&(window.sessionStorage.setItem("ad",1),t.$dialog.alert({title:"公告",message:s.content})),t.upmoney=s.money.split(".")[0],t.$toast.clear(),t.yuyueTime=s.reservationId,t.checked=0!=s.isOpen,t.lastBuy=s.reservationMoney):t.showToast(s.resultNote)})},hideBox:function(t){this.$set(this.show,t,!1)},showBox:function(t){1==t&&(this.buy="",this.buyNum=0),3==t&&(this.buy=this.lastBuy,this.buyNum=0),4==t&&(this.sellzh=1,this.tixian=""),this.$set(this.show,t,!0)},_getList:function(t,s){var i=this;this.isload&&(2!=arguments.length&&1!=this.page&&this.page>this.totalPage||(this.isload=!1,this.showLoading().$post({cmd:"getHomeData",nowPage:this.page,uid:this.$store.state.uid||window.sessionStorage.getItem("uid"),type:t||"",status:s||""}).then(function(t){0==t.result?(i.page=i.page+1,i.isload=!0,i.bankId=t.bankId,i.list=i.list.concat(t.dataList),i.totalPage=t.totalPage,2==t.flag&&(i.flag=2==t.flag),i.$toast.clear(),i.isLoading=!1):i.showLoading(t.resultNote)})))}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("q-head",{staticClass:"i_new",attrs:{noleft:!1}},[e("div",{staticClass:"td_1",attrs:{slot:"right"},on:{click:function(s){return t.$router.push("/zhuanshukefu")}},slot:"right"},[e("img",{attrs:{src:i("qSSc"),alt:""}})])]),t._v(" "),e("van-pull-refresh",{on:{refresh:t.isLa},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[e("div",{staticClass:"s_5"}),t._v(" "),e("div",{staticClass:"i_1"},[e("div",[e("div",{staticClass:"i_7 i_3",on:{click:function(s){return t.buyIn(2)}}},[t._v("买入")]),t._v(" "),e("span",{staticStyle:{display:"block","text-align":"center",color:"#7d7d7d","line-height":".5rem"}},[t._v("买入普洱茶")])]),t._v(" "),e("div",[e("div",{staticClass:"i_7 i_2",on:{click:t.yuyue}},[t._v("预约订单")])]),t._v(" "),e("div",[e("div",{staticClass:"i_7 i_4",on:{click:function(s){return t.showBox(4)}}},[t._v("卖出")]),t._v(" "),e("span",{staticStyle:{display:"block","text-align":"center",color:"#7d7d7d","line-height":".5rem"}},[t._v("卖出普洱茶")])])]),t._v(" "),e("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center"}},[e("span",[t._v("筛选   ")]),t._v(" "),e("van-button",{attrs:{type:"default",size:"small"},on:{click:t.click1}},[t._v(t._s(t.selMay[0]))]),t._v(" "),e("span",[t._v("   ")]),t._v(" "),e("van-button",{attrs:{type:"default",size:"small"},on:{click:t.click2}},[t._v(t._s(t.selTai[0]))])],1),t._v(" "),e("div",{staticClass:"s_2"}),t._v(" "),e("div",{staticClass:"i_5"},[t.list[0]?t._e():e("div",{staticStyle:{"text-align":"center"}},[t._v("\n      暂无订单\n    ")]),t._v(" "),t.list[0]?e("div",{staticClass:"i_6"},[e("q-list",{attrs:{list:t.list}})],1):t._e()])]),t._v(" "),e("div",{staticClass:"i_8",on:{click:function(s){return t.buyIn(1)}}},[e("div",{staticClass:"i_9"},[t._v("抢单")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show[0],expression:"show[0]"}],staticClass:"i_10",attrs:{title:"排单成功"}},[e("q-confirm",{attrs:{text:"排单成功",show:t.show[0]},on:{click:function(s){return t.hideBox(0)}}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"i_11"},[e("span",{staticClass:"i_12"},[t._v("排单普洱茶")]),t._v(" "),e("span",{staticClass:"i_13"},[t._v("X"+t._s(t.buyNum))])]),t._v(" "),e("h4",{staticClass:"i_14"},[t._v("请及时关注排单进展")])]),t._v(" "),e("div",{staticClass:"i_16",attrs:{slot:"btn"},slot:"btn"},[e("div",{staticClass:"i_15",on:{click:function(s){return t.hideBox(0)}}},[t._v("确定")])])])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show[1],expression:"show[1]"}],staticClass:"i_10",attrs:{title:"买入普洱茶"}},[e("q-confirm",{attrs:{text:"买入普洱茶",show:t.show[1]},on:{click:function(s){return t.hideBox(1)}}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"i_11"},[e("div",{staticClass:"i_18"},[e("span",{staticClass:"i_19"},[t._v("金额:")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.buy,expression:"buy",modifiers:{trim:!0}}],staticClass:"i_22",attrs:{type:"number"},domProps:{value:t.buy},on:{input:[function(s){s.target.composing||(t.buy=s.target.value.trim())},t.canBuy],blur:function(s){return t.$forceUpdate()}}})]),t._v(" "),e("span",{staticClass:"i_13"},[t._v("X"+t._s(t.buyNum))])]),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("\n          金额必须是1000的倍数\n          "),e("br"),t._v("您当前的排单下限是2000元，上限是"+t._s(t.upmoney)+"元排单每100元消耗1个手续费\n        ")]),t._v(" "),e("div",{staticClass:"s_2"}),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("\n          您当前拥有手续费：\n          "),e("span",{staticClass:"i_21"},[t._v(t._s(this.mes.integrityCoin))])])]),t._v(" "),e("div",{staticClass:"i_23",attrs:{slot:"btn"},slot:"btn"},[e("div",{staticClass:"i_17",on:{click:function(s){return t.hideBox(1)}}},[t._v("取消")]),t._v(" "),e("div",{staticClass:"i_15",on:{click:t.buypuer}},[t._v("确定")])])])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show[2],expression:"show[2]"}],staticClass:"i_10",attrs:{title:"购买诚信券"}},[e("q-confirm",{attrs:{text:"购买诚信券",show:t.show[2]},on:{click:function(s){return t.hideBox(2)}}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"i_11"},[e("span",{staticClass:"i_19"},[t._v("诚信券数量:"+t._s(t.mes.number))])]),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("\n          您需要购买诚信券才能够入场\n        ")])]),t._v(" "),e("div",{staticClass:"i_23",attrs:{slot:"btn"},slot:"btn"},[e("div",{staticClass:"i_15",on:{click:function(s){return t.$router.push("/zhanghu")}}},[t._v("购买")]),t._v(" "),0!=t.mes.number?e("div",{staticClass:"i_15",on:{click:t.gojh}},[t._v("激活")]):t._e()])])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show[3],expression:"show[3]"}],staticClass:"i_10",attrs:{title:"预约订单"}},[e("q-confirm",{attrs:{text:"预约订单",show:t.show[3]},on:{click:function(s){return t.hideBox(3)}}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"i_11",on:{click:t.SBkehu}},[e("span",{staticClass:"i_19 i_21"},[t._v("是否开启自动排单")]),t._v(" "),e("van-switch",{attrs:{size:"20px",disabled:1==t.mes.hitStatus},model:{value:t.checked,callback:function(s){t.checked=s},expression:"checked"}})],1),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("开启后每隔指定天数系统会自动为您排单，请确保账户中的手续费充足，手续费不足时，无法预约排单！")]),t._v(" "),e("div",{staticClass:"i_11",staticStyle:{"padding-top":".4rem"}},[e("div",{staticClass:"i_18 i_25"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.yuyueTime,expression:"yuyueTime"}],staticClass:"i_28",on:{change:function(s){var i=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.yuyueTime=s.target.multiple?i:i[0]}}},t._l(t.yuyueList,function(s,i){return e("option",{key:i,attrs:{selected:""},domProps:{value:s.id}},[t._v(t._s(s.name))])}),0),t._v(" "),e("van-icon",{attrs:{name:"arrow-down",size:"0.2rem",color:"#3377FF"}})],1),t._v(" "),e("div",{staticClass:"i_18 i_25"},[e("span",{staticClass:"i_19"},[t._v("金额")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.buy,expression:"buy"}],staticClass:"i_22",attrs:{type:"number"},domProps:{value:t.buy},on:{input:[function(s){s.target.composing||(t.buy=s.target.value)},t.canBuy]}})]),t._v(" "),e("div",{staticClass:"i_26",on:{click:t.gotoyuyue}},[t._v("预约")])]),t._v(" "),e("div",{staticClass:"i_27"},[e("div",{staticClass:"s_2"}),t._v(" "),e("div",{staticClass:"i_29"},[e("van-row",[e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v("预约日期")])]),t._v(" "),e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v("预约金额")])]),t._v(" "),e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v("状态")])])],1)],1),t._v(" "),t._l(t.yuyueData,function(s,i){return e("div",{key:i},[e("div",{staticClass:"s_1"}),t._v(" "),e("van-row",[e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v(t._s(s.time))])]),t._v(" "),e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v(t._s(s.money))])]),t._v(" "),e("van-col",{attrs:{span:"8"}},[e("div",{staticClass:"i_30"},[t._v(t._s(1==s.status?"已执行":"未执行"))])])],1)],1)})],2)])])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show[4],expression:"show[4]"}],staticClass:"i_10",attrs:{title:"卖出普洱茶"}},[e("q-confirm",{attrs:{text:"卖出普洱茶",show:t.show[4]},on:{click:function(s){return t.hideBox(4)}}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",[e("div",{staticClass:"s_1"}),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("银行卡:")]),t._v(" "),e("div",{staticClass:"i_31"},[e("select",{staticClass:"i_32",attrs:{name:"",id:"card"}},[e("option",{attrs:{value:"1"}},[t._v(t._s(t.mes.bankName)+t._s(t.mes.bankNumber))])])]),t._v(" "),e("div",{staticClass:"s_2"}),t._v(" "),e("h4",{staticClass:"i_20"},[t._v("提现账号:")]),t._v(" "),e("div",{staticClass:"i_31"},[e("select",{directives:[{name:"model",rawName:"v-model.number",value:t.sellzh,expression:"sellzh",modifiers:{number:!0}}],staticClass:"i_32",attrs:{name:"",id:"card"},on:{change:[function(s){var i=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(s){var i="_value"in s?s._value:s.value;return t._n(i)});t.sellzh=s.target.multiple?i:i[0]},function(s){t.tixian=""}]}},[e("option",{attrs:{value:"1"}},[t._v("本息账户(余额："+t._s(t.mes.principal)+")")]),t._v(" "),e("option",{attrs:{value:"2"}},[t._v("奖励账户(余额："+t._s(t.mes.reward)+")")])])]),t._v(" "),e("div",{staticClass:"s_2"}),t._v(" "),e("div",{staticClass:"i_18 i_33"},[e("span",{staticClass:"i_19"},[t._v("提现金额:")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.tixian,expression:"tixian",modifiers:{trim:!0}}],staticClass:"i_22",attrs:{type:"number"},domProps:{value:t.tixian},on:{input:function(s){s.target.composing||(t.tixian=s.target.value.trim())},blur:function(s){return t.$forceUpdate()}}})]),t._v(" "),e("h4",{staticClass:"i_34"},[2!=t.sellzh?e("div",[t._v(" ")]):t._e(),t._v(" "),2==t.sellzh?e("div",[t._v("\n              提现手续费：\n              "),e("span",{staticClass:"i_35"},[t._v("1000")]),t._v(" 将自动转入积分账户\n            ")]):t._e()])])]),t._v(" "),e("div",{staticClass:"i_23",attrs:{slot:"btn"},slot:"btn"},[e("div",{staticClass:"i_17",on:{click:function(s){return t.hideBox(4)}}},[t._v("取消")]),t._v(" "),e("div",{staticClass:"i_15",on:{click:t.changetx}},[t._v("提交")])])])],1),t._v(" "),e("div",[e("van-actionsheet",{attrs:{actions:t.selMay[3]},on:{select:t.select1},model:{value:t.sel1,callback:function(s){t.sel1=s},expression:"sel1"}})],1),t._v(" "),e("div",[e("van-actionsheet",{attrs:{actions:t.selTai[3]},on:{select:t.select2},model:{value:t.sel2,callback:function(s){t.sel2=s},expression:"sel2"}})],1)],1)},staticRenderFns:[]};var n=i("VU/8")(e,a,!1,function(t){i("oZkG")},"data-v-5f35ceb6",null);s.default=n.exports},oZkG:function(t,s){}});
//# sourceMappingURL=18.b69f2554010bcf660bc0.js.map