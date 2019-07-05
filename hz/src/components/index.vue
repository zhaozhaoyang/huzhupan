<template>
  <div>
    <!-- <embed ref="bed" src="" type=""> -->
    <q-head :noleft="false" class="i_new">
      <div slot="right" class="td_1" @click="$router.push('/zhuanshukefu')">
        <img src="../../static/images/11.png" alt>
      </div>
    </q-head>
    <van-pull-refresh v-model="isLoading" @refresh="isLa">
      <div class="s_5"></div>
    <!-- <input type="file" ref="up" @change="getData($event)"> -->
    <div class="i_1">
      <div>
        <div class="i_7 i_3" @click="buyIn(2)">买入</div>
        <span style="display:block;text-align:center;color:#7d7d7d;line-height:.5rem;">买入普洱茶</span>
      </div>
      <div>
        <div class="i_7 i_2" @click="yuyue">预约订单</div>
      </div>
      <div>
        <div class="i_7 i_4" @click="showBox(4)">卖出</div>
        <span style="display:block;text-align:center;color:#7d7d7d;line-height:.5rem;">卖出普洱茶</span>
      </div>
    </div>
    <div class="" style="display:flex;justify-content:center;align-items:center;">
      <span>筛选&nbsp;&nbsp;&nbsp;</span>
      <van-button type="default" size="small" @click="click1">{{selMay[0]}}</van-button>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <van-button type="default" size="small" @click="click2">{{selTai[0]}}</van-button>
    </div>
    <div class="s_2"></div>
    <div class="i_5">
      <div v-if="!list[0]" style="text-align:center;">
        暂无订单
      </div>
      <div class="i_6" v-if="list[0]">
        <q-list :list="list"></q-list>
      </div>
    </div>
    </van-pull-refresh>
    
    <div class="i_8" @click="buyIn(1)">
      <div class="i_9">抢单</div>
    </div>
    <div class="i_10" title="排单成功" v-show="show[0]">
      <q-confirm text="排单成功" @click="hideBox(0)" :show="show[0]">
        <div slot="content">
          <div class="i_11">
            <span class="i_12">排单普洱茶</span>
            <span class="i_13">X{{buyNum}}</span>
          </div>
          <h4 class="i_14">请及时关注排单进展</h4>
        </div>
        <div slot="btn" class="i_16">
          <div class="i_15" @click="hideBox(0)">确定</div>
        </div>
      </q-confirm>
    </div>
    <div class="i_10" title="买入普洱茶" v-show="show[1]">
      <q-confirm text="买入普洱茶" @click="hideBox(1)" :show="show[1]">
        <div slot="content">
          <div class="i_11">
            <div class="i_18">
              <span class="i_19">金额:</span>
              <input type="number" class="i_22" v-model.trim="buy" @input="canBuy">
            </div>
            <span class="i_13">X{{buyNum}}</span>
          </div>
          <h4 class="i_20">
            金额必须是1000的倍数
            <br>您当前的排单下限是2000元，上限是{{upmoney}}元排单每100元消耗1个手续费
          </h4>
          <div class="s_2"></div>
          <h4 class="i_20">
            您当前拥有手续费：
            <span class="i_21">{{this.mes.integrityCoin}}</span>
          </h4>
        </div>
        <div slot="btn" class="i_23">
          <div class="i_17" v-on:click="hideBox(1)">取消</div>
          <div class="i_15" v-on:click="buypuer">确定</div>
        </div>
      </q-confirm>
    </div>
    <div class="i_10" title="购买诚信券" v-show="show[2]">
      <q-confirm text="购买诚信券" @click="hideBox(2)"  :show="show[2]">
        <div slot="content">
          <div class="i_11">
            <span class="i_19">诚信券数量:{{mes.number}}</span>
            <!-- <span class="i_19">当前的诚信券数量</span> -->
            <!-- <input type="number" class="i_24"> -->
          </div>
          <h4 class="i_20">
            您需要购买诚信券才能够入场
          </h4>
          <!-- <h4 class="i_20">
            当前拥有诚信券数量
          </h4> -->
        </div>
        <div slot="btn" class="i_23">
          <div class="i_15" @click="$router.push('/zhanghu')">购买</div>
          <div class="i_15" @click="gojh" v-if="mes.number!=0">激活</div>
        </div>
      </q-confirm>
    </div>
    <div class="i_10" title="预约订单" v-show="show[3]">
      <q-confirm text="预约订单" @click="hideBox(3)" :show="show[3]">
        <div slot="content">
          <div class="i_11" @click="SBkehu">
            <span class="i_19 i_21">是否开启自动排单</span>
            <van-switch v-model="checked" size="20px" :disabled="mes.hitStatus==1"/>
          </div>
          <h4 class="i_20">开启后每隔指定天数系统会自动为您排单，请确保账户中的手续费充足，手续费不足时，无法预约排单！</h4>
          <div class="i_11" style="padding-top:.4rem;">
            <div class="i_18 i_25">
              <select class="i_28" v-model="yuyueTime">
                <option
                  v-for="(item,index) in yuyueList"
                  v-bind:key="index"
                  :value="item.id"
                  selected
                >{{item.name}}</option>
              </select>
              <!-- <span></span> -->
              <van-icon name="arrow-down" size="0.2rem" color="#3377FF"/>
            </div>
            <div class="i_18 i_25">
              <span class="i_19">金额</span>
              <input type="number" class="i_22" v-model="buy" v-on:input="canBuy">
            </div>
            <div class="i_26" v-on:click="gotoyuyue">预约</div>
          </div>
          <div class="i_27">
            <div class="s_2"></div>
            <div class="i_29">
              <van-row>
                <van-col span="8">
                  <div class="i_30">预约日期</div>
                </van-col>
                <van-col span="8">
                  <div class="i_30">预约金额</div>
                </van-col>
                <van-col span="8">
                  <div class="i_30">状态</div>
                </van-col>
              </van-row>
            </div>
            <div v-for="(item,index) in yuyueData" v-bind:key="index">
              <div class="s_1"></div>
              <van-row>
                <van-col span="8">
                  <div class="i_30">{{item.time}}</div>
                </van-col>
                <van-col span="8">
                  <div class="i_30">{{item.money}}</div>
                </van-col>
                <van-col span="8">
                  <div class="i_30">{{item.status==1?"已执行":"未执行"}}</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </q-confirm>
    </div>
    <div class="i_10" title="卖出普洱茶" v-show="show[4]">
      <q-confirm text="卖出普洱茶" @click="hideBox(4)" :show="show[4]">
        <div slot="content">
          <div>
            <div class="s_1"></div>
            <h4 class="i_20">银行卡:</h4>
            <div class="i_31">
              <select name id="card" class="i_32">
                <option value="1">{{mes.bankName}}{{mes.bankNumber}}</option>
              </select>
            </div>
            <div class="s_2"></div>
            <h4 class="i_20">提现账号:</h4>
            <div class="i_31">
              <select name id="card" class="i_32" v-model.number="sellzh" @change="tixian=''">
                <option value="1">本息账户(余额：{{mes.principal}})</option>
                <option value="2">奖励账户(余额：{{mes.reward}})</option>
              </select>
            </div>
            <div class="s_2"></div>
            <div class="i_18 i_33">
              <span class="i_19">提现金额:</span>
              <input type="number" class="i_22" v-model.trim="tixian">
            </div>
            <h4 class="i_34">
              <div v-if="sellzh!=2">&nbsp;</div>
              <div v-if="sellzh==2">
                提现手续费：
                <span class="i_35">1000</span> 将自动转入积分账户
              </div>
            </h4>
          </div>
        </div>
        <div slot="btn" class="i_23">
          <div class="i_17" v-on:click="hideBox(4)">取消</div>
          <div class="i_15" v-on:click="changetx">提交</div>
        </div>
      </q-confirm>
    </div>
    <div>
      <van-actionsheet v-model="sel1" :actions="selMay[3]" @select="select1"/>
    </div>
    <div>
      <van-actionsheet v-model="sel2" :actions="selTai[3]" @select="select2"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      show: [false, false, false, false, false],
      // 预约订单按钮
      checked: false,
      list: [],
      totalPage: 0,
      // 是否加载完成
      isload: true,
      // 列表当前页数
      page: 1,
      // 买入数
      buy: "",
      // 买入普洱数
      buyNum: 0,
      // 是否为快速排单
      isfast: 2,
      mes: "",
      //卖出账户
      sellzh: 1,
      // 卖出提现金额
      tixian: "",
      // 银行id
      bankId: "",
      // 预约天数列表
      yuyueList: [],
      // 选中的预约天数id
      yuyueTime: "",
      //自动排单钱
      zdmoney:"",
      // 排单上限
      upmoney:"",
      //预约排单列表
      yuyueData:[],
      // 是否展示激活
      flag:false,
      // 记录上传购买数量
      lastBuy:0,
      // 公告
      // 选择买入卖出
      sel1:false,
      selMay:["买入/卖出","",false,[{
        name:"买入/卖出",
        num:""
      },{
        name:"买入",
        num:1
      },{
        name:"卖出",
        num:2
      }]],
      sel2:false,
      // 选择状态
      selTai:["进行中",1,true,[{
        name:"进行中",
        num:1,
      },{
        name:"已完成",
        num:3
      },{
        name:"全部",
        num:""
      }]],
      gonggao:{
        content:"",
        time:""
      }
    };
  },
  created() {
    this._getList(this.selMay[1],this.selTai[1]);
    this._getMes();
    window.onscroll = function() {
      if (!this.isload || this.isend) {
        return;
      }
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var clientHeight = document.compatMode == "CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;
      var scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      // console.log(document.body.scrollTop,document.documentElement.scrollTop,1)
      // console.log(document.documentElement.clientHeight,document.body.clientHeight,2)
      // console.log(document.body.scrollHeight,document.documentElement.scrollHeight,3)
      // console.log(scrollTop + (clientHeight - 0),5)
      // console.log(scrollHeight - 0,6)
      if (
        scrollTop + (clientHeight - 0) + 100 >=scrollHeight - 0
      ) {
        this._getList(this.selMay[1],this.selTai[1]);
      }
    }.bind(this);
  },
  computed: {},
  watch:{
    checked(){
      // return;
      this.$post({
        cmd:"editUserInfo",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
		    phone:"",//用户手机号
		    icon:"",//头像
		    nickName:"",//昵称
		    drawsNumber:"",//抽奖次数
		    email:"",//邮箱
		    flag:"",//是否激活(1:是2：否)
		    time:"",//注册时间
		    isOpen:this.checked?1:0,//是否开启自动预约(1：是，0：否)
		    isHost:""//是否托管(1:是0:否)
      }).then(res=>{
        if(res.result==0){
          this.mes.isOpen=this.checked?1:0
        }else{
          this.showToast(res.resultNote);
        }
      })
    }
  },
  methods: {
    // getData(e){
    //   console.log(this.$refs.up.files[0])
    //   let _this=this;
    //   let file=this.$refs.up.files[0];
    //   const readFile=new FileReader();
    //   readFile.readAsDataURL(file);
    //   readFile.onload=(e)=>{
    //     this.$refs.bed.src=readFile.result;
    //   }
    // },
    SBkehu(){
      if(this.mes.hitStatus==1){
        this.$dialog.confirm({
          title:"提示",
          message:"默认防撞，一旦开启预约功能会有多笔订单入场"
        }).then((res)=>{
          this.checked=true;
          this.mes.hitStatus=2;
        }).catch(()=>{
          this.checked=false;
        })
      }
      
    },
    click1(){
      this.sel2=false;
      this.sel1=!this.sel1;
      
    },
    click2(){
      this.sel1=false;
      this.sel2=!this.sel2;
    },
    select1(item){
      this.sel1=false;
      let id=this.selTai[1];
      this.selMay[0]=item.name
      this.selMay[1]=item.num
      this.list=[],
      this.totalPage=0,
      // 是否加载完成
      this.isload=true,
      // 列表当前页数
      this.page=1,
      this._getList(item.num,id)
    },
    select2(item){
      this.sel2=false;
      let id=this.selMay[1];
      this.selTai[0]=item.name
      this.selTai[1]=item.num
      this.list=[],
      this.totalPage=0,
      // 是否加载完成
      this.isload=true,
      // 列表当前页数
      this.page=1,
      this._getList(id,item.num)
    },
    isLa(){
      this.list=[],
      this.totalPage= 0,
      // 是否加载完成
      this.isload=true,
      // 列表当前页数
      this.page= 1,
      this._getList(this.selMay[1],this.selTai[1]);
    },
    gojh(){
      this.showLoading("正在激活").$post({
        cmd:"activationUser",
        uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
		    childId:""//子用户id
      }).then(res=>{
        if(res.result==0){
          this.flag=false;
          this.showToast("激活成功");
          this._getMes();
          this.hideBox(2);
        }else{
          this.showToast(res.resultNote);
          this.showBox(2);
        }
      })
    },
    gotoyuyue(){
      if(!this.checked){
        this.showToast("您还未开启自动排单功能");
        return;
      }
      // if (this.buy - 0 > this.upmoney-0 || this.buy - 0 < 2000) {
      //   this.showToast("您的下限为2000,上限为"+this.upmoney);
      //   return;
      // }
      if (this.buy.length > 3 && this.buy % 1000 != 0) {
        this.showToast("请输入1000的倍数");
        return;
      }
      this.showLoading("正在提交排单").$post({
        cmd:"reservationOrder",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
		    settingId:this.yuyueTime,
		    money:this.buy
      }).then(res=>{
        if(res.result==0){
          this.showToast("自动排单成功")
          this.lastBuy=this.buy;
          this.yuyue()
          // this.hideBox(3);
        }else{
          this.showToast(res.resultNote);
        }
      })
    },
    yuyue(ind) {
      if (this.yuyueList.length == 0) {
        this.showLoading()
          .$post({
            cmd: "getSettingList"
          })
          .then(res => {
            if (res.result == 0) {
              this.yuyueList = res.dataList;
              this.yuyueTime = this.yuyueTime?this.yuyueTime:res.dataList[0].id;
            } else {
              this.showToast(res.resultNote);
            }
          })
      }else{
        this.showBox(3);
      }
      this.$post({
          cmd:"getReservationList",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      }).then(res=>{
        this.yuyueData=res.dataList?res.dataList:[];
        this.$toast.clear();
        this.showBox(3);
      })
    },
    buyIn(ind) {
      if(this.flag){
        this.showBox(2);
        return;
      }
      // if(this.mes.isOpen==1){
      //   this.showToast("请先关闭预约排单后再进行手动排单");
      //   return;
      // }
      // if(this){}
      this.isfast = ind;
      this.showBox(1);
    },
    changetx() {
      if (this.tixian == "") {
        this.showToast("请输入提现金额");
        return;
      }
      if (this.sellzh == 1) {
        if (this.tixian - 0 < 2000) {
          this.showToast("下限为2000");
          return;
        }
        if (this.tixian.length - 0 > 2 && this.tixian % 100 != 0) {
          this.showToast("请输入100的倍数");
          return;
        }
      }
      if (this.sellzh == 2) {
        if (this.tixian - 0 < 200) {
          this.showToast("下限为200");
          return;
        }
        if (this.tixian.length - 0 > 2 && this.tixian % 100 != 0) {
          this.showToast("请输入100的倍数");
          return;
        }
      }
      this.showLoading("正在提交")
        .$post({
          cmd: "sellOut",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          type: this.sellzh, //1:本息账户2:奖励账户
          bankId: this.bankId,
          money: this.tixian //
        })
        .then(res => {
          if (res.result == 0) {
            this.hideBox(4);
            this.list = [];
            this.page = 1;
            this._getList(this.selMay[1],this.selTai[1]);
            this._getMes();
          }
          this.showToast(res.resultNote);
        });
    },
    buypuer() {
      if(this.mes.size==0){
        if (this.buy - 0 > 5000 || this.buy - 0 < 2000) {
          this.showToast("购买金额不能低于上次金额");
          // this.buy=this.buy.slice(0,this.buy.length-1);
          return;
        }
      }
      // if (this.buy - 0 > this.upmoney-0 || this.buy - 0 < 2000) {
      //   this.showToast("您的下限为2000,上限为"+this.upmoney);
      //   // this.buy=this.buy.slice(0,this.buy.length-1);
      //   return;
      // }
      if (this.buy.length > 3 && this.buy % 1000 != 0) {
        this.showToast("请输入1000的倍数");
        return;
      }
      this.showLoading("正在购买")
        .$post({
          cmd: "buyIn",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          type: this.isfast, //是否是快速匹配(1:是2：不是)
          money: this.buy
        })
        .then(res => {
          if (res.result == 0) {
            this.hideBox(1);
            this.showBox(0);
            this.list = [];
            this.page = 1;
            this._getList(this.selMay[1],this.selTai[1]);
            this._getMes();
            // this.showToast(res.resultNote)
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    canBuy() {
      if (this.buy - 0 > this.upmoney-0) {
        // this.showToast("您的上限为"+this.upmoney);
        this.buy = this.buy.slice(0, this.buy.length - 1);
        return;
      }
      if (this.buy.length > 2 && this.buy % 100 != 0) {
        // this.showToast("请输入100的倍数");
      }
      this.buyNum = parseInt(this.buy / 100);
    },
    _buypuer(type, money, callback) {},
    _getMes() {
      this.$post({
        cmd: "getUserInfo",
        uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      }).then(res => {
        if (res.result == 0) {
          this.mes = res;
          if(res.content && !window.sessionStorage.getItem("ad")){
            window.sessionStorage.setItem("ad",1);
            this.$dialog.alert({
              title: '公告',
              message: res.content
            })
            // this.gonggao.content=res.content;
            // this.gonggao.time=res.time1;
            // this.gonggao.show=true;
          }
          this.upmoney=res.money.split(".")[0];
          this.$toast.clear();
          this.yuyueTime=res.reservationId;
          this.checked=res.isOpen==0?false:true;
          this.lastBuy=res.reservationMoney;
          // this.
        } else {
          this.showToast(res.resultNote);
        }
      });
    },
    hideBox(ind) {
      this.$set(this.show, ind, false);
    },
    showBox(ind) {
      if (ind == 1) {
        this.buy = "";
        // 买入普洱数
        this.buyNum = 0;
      }
      if(ind==3){
        this.buy = this.lastBuy;
        // 买入普洱数
        this.buyNum = 0;
        // this.checked=false;
        // this.yuyueTime=this.yuyueList[0].id;
      }
      if (ind == 4) {
        //卖出账户
        this.sellzh = 1;
        // 卖出提现金额
        this.tixian = "";
      }
      this.$set(this.show, ind, true);
    },
    _getList(id1,id2) {
      if (!this.isload) {
        return;
      }
      // console.log(id2)
      if(arguments.length!=2){
        if (this.page != 1 && this.page > this.totalPage) {
          return;
        }
      }
      this.isload = false;
      this.showLoading()
        .$post({
          cmd: "getHomeData",
          nowPage: this.page,
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          type:id1?id1:"",
          status:id2?id2:""
        })
        .then(res => {
          if (res.result == 0) {
            this.page = this.page + 1;
            this.isload = true;
            this.bankId = res.bankId;
            this.list = this.list.concat(res.dataList);
            this.totalPage = res.totalPage;
            if(res.flag==2){
              this.flag=res.flag==2?true:false
              // this.showBox(2)
              // return;
            }
            this.$toast.clear();
            this.isLoading = false;
          } else {
            this.showLoading(res.resultNote);
          }
        });
    }
  }
};
</script>


<style scoped>
.td_1 {
  width: 0.42rem;
}
.td_1 img {
  width: 100%;
}
.i_1 {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0.4rem auto;
}
.i_7 {
  width: 2rem;
  height: 0.7rem;
  border-radius: 6px;
  text-align: center;
  line-height: 0.7rem;
  color: #fff;
  font-size: 0.32rem;
}
.i_2 {
  background: linear-gradient(180deg, #84fdd9, #25f7e6);
  box-shadow: 1px 1px 3px 2px rgba(37, 247, 230, 0.3);
}
.i_3 {
  background: linear-gradient(180deg, #a2d4ff, #458fff);
  box-shadow: 1px 1px 3px 2px rgba(69, 143, 255, 0.3);
}
.i_4 {
  background: linear-gradient(180deg, #ffb6a2, #ff6e91);
  box-shadow: 1px 1px 3px 2px rgba(255, 110, 145, 0.3);
}
.i_8 {
  position: fixed;
  bottom: 1.3rem;
  right: 0.2rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 2rem;
}
.i_9 {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 2rem;
  background: linear-gradient(180deg, #a2d4ff, #458fff);
  box-shadow: 1px 1px 3px 2px rgba(69, 143, 255, 0.3);
  text-align: center;
  line-height: 1.4rem;
  color: #fff;
  font-size: 0.32rem;
}
/* .i_10 {
  position:fixed;
    width:100%;
    height:100vh;
} */
.i_11 {
  display: flex;
  justify-content: space-around;
  line-height: 1rem;
  align-items: center;
}
.i_12 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.i_13 {
  padding-left: 0.4rem;
  background-image: url("../../static/images/14.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0.4rem;
  font-size: 0.24rem;
  color: rgba(51, 119, 255, 1);
}
.i_14 {
  font-size: 0.24rem;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  line-height: 0.4rem;
}
.i_15 {
  width: 1.6rem;
  height: 0.52rem;
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  border-radius: 0.26rem;
  text-align: center;
  line-height: 0.52rem;
  color: #fff;
}
.i_16 {
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;
}
.i_17 {
  width: 1.6rem;
  height: 0.52rem;
  background: linear-gradient(
    180deg,
    rgba(217, 217, 217, 1),
    rgba(207, 207, 207, 1)
  );
  border-radius: 0.26rem;
  text-align: center;
  line-height: 0.52rem;
  color: #fff;
}
.i_18 {
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 0.1rem;
  height: 0.48rem;
  width: 2.6rem;
  line-height: 0.48rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.i_19 {
  padding: 0 0.1rem;
  flex: 0 0 auto;
}
.i_20 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.i_21 {
  color: #3377ff;
}
.i_22 {
  flex: 1 1 auto;
  width: 100%;
  border: none;
  margin-right: 0.1rem;
  padding: 0;
}
.i_23 {
  display: flex;
  justify-content: space-around;
  padding-top: 0.4rem;
}
.i_24 {
  width: 0.8rem;
  height: 0.48rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 0.1rem;
  padding-left: 0.1rem;
}
.i_25 {
  width: 1.6rem;
}
.i_26 {
  width: 1rem;
  height: 0.48rem;
  text-align: center;
  line-height: 0.48rem;
  background: rgba(51, 119, 255, 1);
  border-radius: 0.1rem;
  color: #fff;
}
.i_28 {
  border: none;
  padding: 0;
  background-color: #fff;
}
.i_29 {
  border-bottom: 1px solid #f6f6f6;
  padding-bottom: 0.2rem;
}
.i_30 {
  text-align: center;
  color: #333333;
  font-size: 0.22rem;
}
.i_31 {
  margin-top: 0.2rem;
  width: 100%;
  height: 0.48rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 0.1rem;
  position: relative;
}
.i_32 {
  width: 96%;
  height: 100%;
  border: none;
  margin: 0 2%;
  box-sizing: border-box;
  padding-right: 0.4rem;
  background-image: url("../../static/images/15.png");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 0.2rem;
  background-color: #fff;
}
.i_33 {
  width: 100%;
}
.i_34 {
  font-size: 0.22rem;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.4rem;
}
.i_35 {
  color: #ff6068;
}
.i_new{
  background-image:url('../../static/images/top1.png');
  background-repeat:no-repeat;
  background-position:center top;
  background-size:cover;
}
</style>

