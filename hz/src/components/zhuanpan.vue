<template>
  <keep-alive>
  <div class="container" style="width:100%;overflow:hidden;">
    <div class="head-box">
      <div class="head-left">
        <van-icon color="#fff" size="1.4rem" name="arrow-left" v-on:click="goBack"/>
      </div>
      <span class="head-text">幸运大转盘</span>
      <div class="head-right" style="font-size:1rem;" @click="$router.push('/zhongjiangjilv')">中奖纪录</div>
    </div>
    <div style="padding-top:4rem;"></div>
    <div class="luck-top">
      <div class="lt_1">
        <span class="lt_2" style="color:#6261FE;">次数</span>
        <div class="lt_3">{{lottery_ticket}}</div>
      </div>
      <div class="lt_4">
        <span>抽奖费用:</span>
        <em>{{money}}/次</em>
      </div>
    </div>
    <div class="lucky-wheel">
      <div class="jls"></div>
      <div class="wheel-main">
        <div class="wheel-pointer-box">
          <div
            class="wheel-pointer"
            @click="rotate_handle()"
            :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"
          ></div>
        </div>
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
              <div class="prize-pic">
                <div class="top"></div>
              </div>
              <!-- <div class="prize-count" v-if="item.count">
                                {{item.count}}
              </div>-->
              <div class="prize-type">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <div class="toast-title">{{toast_title}}</div>
        <div class="toast-btn">
          <div class="toast-cancel" style="font-size:1rem" @click="close_toast">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
    <div style="height:10rem;padding:1rem;">
      <div class="zp_1">
        <span class="zp_2">中奖纪录</span>
        <em class="zp_3" @click="$router.push('/guize')">抽奖规则</em>
      </div>
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        class="swiper-no-swiping"
        style="padding:0 1rem;height:8rem;overflow:hidden;"
      >
        <div v-if="!choujiang[0]" style="text-align:center;">暂无中奖记录</div>
        <swiper-slide  v-for="(item,index) in choujiang" v-bind:key="index">
          <div class="zp_4">
            <span>恭喜用户{{item.phone}}获得{{item.name}}</span>
            <span>{{item.time}}</span>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="confirmBox" v-show="show">
      <div class="confirm">
        <h6>购买次数</h6>
        <div class="closeBtn" v-on:click="close">
          <img src="../../static/images/t1.png" alt>
        </div>
        <div class="confirm_padding">
          <div class="confirm_title">
            <span>抽奖费用</span>
            <span>{{money}}/次</span>
          </div>
          <div class="pay">
            <h5>支付账户</h5>
            <select name id class="selBox" v-model="selectVal">
              <option value="1">本息账户(余额：{{$store.state.geren.principal}})</option>
              <option value="2">奖励账户(余额：{{$store.state.geren.reward}})</option>
              <option value="3">积分(余额：{{$store.state.geren.score}})</option>
            </select>
          </div>
          <div class="cishu">
            <input type="number" placeholder="购买次数" v-model="buyNum">
            <span>&nbsp;次</span>
          </div>
          <div class="btnBox">
            <div v-on:click="close">取消</div>
            <div @click="buy">确定</div>
          </div>
          <!-- <slot name="content"></slot> -->
        </div>
        <div class="confirm_padding">
          <!-- <slot name="btn"></slot> -->
        </div>
      </div>
    </div>
  </div>
  </keep-alive>
</template>
<script>
//头部
// import headTop from "./commons/header";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      money:"",
      selectVal:"1",
      choujiang:[],
      swiperOption: {
        // loop: true,
        direction: "vertical",
        slidesPerView: 4,
        autoplay:{
          stopOnLastSlide: false,
          delay:1000
        },
        // autoplayStopOnLast: false,
      },
      buyNum: "",
      show: false,
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      index: 0
    };
  },
  created(){
    this.init_prize_list();
    this.lottery_ticket=this.$store.state.geren.drawsNumber;
    this.money=this.$store.state.geren.money1;
    this.showLoading().$post({
      cmd:"getLotteryList",
      nowPage:1,
      pageCount:30
    }).then((res)=>{
      if(res.result==0){
        this.$toast.clear();
        this.choujiang=res.dataList?res.dataList:[];
         if (this.choujiang.length <= 4) {
          this.$refs.mySwiper.swiper.autoplay.stop();
        }
        // this.$set(loop)
        
      }else{
        this.showToast(res.resultNote);
      }
      
      
      // return 
    })
    if(!this.$store.state.geren.drawsNumber){
      this.$post({
        cmd:"getUserInfo",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      }).then((res)=>{
        console.log(res)
        if(res.result==0){
          this.lottery_ticket=res.drawsNumber
          this.money=res.money1;
          this.$store.commit("setgeren",res)
        }else{
          this.showLoading(res.resultNote);
        }
      })
    }
    
    this.$post({
        cmd:"getPrizeList"
    }).then((res)=>{
      if(res.result==0){
        this.prize_list=res.dataList;
      }else{
        this.showToast(res.resultNote);
      }
    })
  },
  mounted() {
   
  },
  watch: {
    show: {
      handler() {
        if (this.show) {
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "";
        }
      },
      immediate: true
    }
  },
  computed: {
    toast_title() {
      return this.hasPrize==1 ? " " + this.prize_list[this.index].name : "未中奖";
    },
    toast_pictrue() {
      return this.hasPrize==1
        ? require("../assets/img/congratulation.png")
        : require("../assets/img/sorry.png");
    }
  },
  methods: {
    setNum(){
      this.$store.commit('setchouNum',this.lottery_ticket);
    },
    buy(){
      if(this.buyNum-0<1){
        this.showToast("请输入正整数")
        return;
      }
      this.showLoading("正在购买").$post({
        cmd:"payLottery",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
	  	  type:this.selectVal,
		    number:this.buyNum
      }).then((res)=>{
        if(res.result==0){
          this.lottery_ticket=this.buyNum-0;
          this.setNum();
          this.show=false;
          this.$toast.clear();
        }else{
          this.showToast(res.resultNote)
        }
      })
    },
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      if (this.lottery_ticket==0) {
        this.show = true;
        return;
      }
      if(!this.click_flag){
        return;
      }
      this.$post({
        cmd:"lottery",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      }).then((res)=>{
        this.prize_list.forEach((item,index)=>{
          if(item.id==res.id){
            this.lottery_ticket=this.lottery_ticket-1;
            this.setNum();
            this.index=index;
            this.hasPrize=res.flag
            this.rotating();
          }
        })
      })
    },
    rotating() {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          (this.start_rotating_degree % 360)+45 ;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        // // //转动指针
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over();
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over() {
      this.toast_control = true;
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    //购买弹窗关闭
    close() {
      this.show = false;
    }
  }
};
</script>
<style scoped>
html {
  font-size: 14px !important;
}
@media screen and (min-width: 321px) and (max-width: 375px) {
  html {
    font-size: 16px !important;
  }
}
@media screen and (min-width: 376px) and (max-width: 414px) {
  html {
    font-size: 18px !important;
  }
}
@media screen and (min-width: 415px) and (max-width: 639px) {
  html {
    font-size: 20px !important;
  }
}
@media screen and (min-width: 640px) and (max-width: 719px) {
  html {
    font-size: 24px !important;
  }
}
@media screen and (min-width: 720px) and (max-width: 749px) {
  html {
    font-size: 28px !important;
  }
}
@media screen and (min-width: 750px) and (max-width: 799px) {
  html {
    font-size: 30px !important;
  }
}
@media screen and (min-width: 800px) {
  html {
    font-size: 48px;
  }
}
.jls{position:absolute;right:1rem;top:0;width:3rem;height:4rem;background-image:url('../../static/images/hot.png');background-repeat:no-repeat;background-position: center center;background-size: contain;}
input::-webkit-input-placeholder{font-size:1rem;line-height:2rem;}
.container {
  width: 100%;
}
.lucky-wheel {
  width: 100%;
  height: 24.4625rem;
  position:relative;
  /* background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat
    center bottom; */

  background: url("../../static/images/c2.png") no-repeat center bottom;
  background-size: 80%;
  /* padding-top: 1.5625rem; */
}
.lucky-title {
  width: 100%;
  height: 8.125rem;
  /* background: url("../assets/img/lucky_title.png") no-repeat center top; */
  background-size: 100%;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 18.4375rem;
  height: 18.4375rem;
  background: url("../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 5.3125rem;
  height: 5.3125rem;
}
.wheel-pointer {
  width: 5.3125rem;
  height: 5.3125rem;
  background: url("../assets/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: -2rem;
  left: 6.1125rem;
  transform: rotate(-30deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 0.5rem;
  left: 10.7rem;
  transform: rotate(30deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 4.4rem;
  left: 13.1rem;
  transform: rotate(-300deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 9rem;
  left: 10.9125rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 10.7125rem;
  left: 6.3rem;
  transform: rotate(-207deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 9.3875rem;
  left: 1.7rem;
  transform: rotate(-158.2deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 4.8rem;
  left: -0.1875rem;
  transform: rotate(-120deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 1.5rem;
  transform: rotate(-73deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}
.prize-pic .top {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
  writing-mode: tb-rl;
  color: #6261fe;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  background: url("../assets/img/luck_bg.png") no-repeat center top;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
  padding-left: 6.75rem;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: #fff;
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fff;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #3377ff;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: linear-gradient(
    -90deg,
    rgba(51, 119, 255, 1) 0%,
    rgba(100, 165, 254, 1) 100%
  );
  /* box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7); */
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  background: url("../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
.head-box {
  position: fixed;
  top:0;
  left:0;
  display: flex;
  /* justify-content:space-between; */
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 3.4rem;
  /* padding-top: 1rem; */
  background: linear-gradient(
    -90deg,
    rgba(51, 119, 255, 1) 0%,
    rgba(100, 165, 254, 1) 100%
  );
}
.head-text {
  display: block;
  width: 100%;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.6rem;
}
.head-left {
  position: absolute;
  left: 0;
  box-sizing: border-box;
  width: 2.2rem;
  height: 2.2rem;
  padding-top: 0.6rem;
  /* line-height:.8rem; */
  text-align: center;
}
.head-right {
  position: absolute;
  right: 0;
  padding-right: 0.6rem;
  color: #fff;
}
.luck-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.lt_1 {
  display: flex;
  color: #3377ff;
  font-size: 1rem;
  line-height: 2rem;
}
.lt_3 {
  width: 2rem;
  height: 2rem;
  background-color: #6261FE;
  background-image:url('../../static/images/bck.png');
  background-repeat:no-repeat;
  background-position:center;
  background-size:contain;
  border-radius: 4rem;
  color: #6261FE;
  font-size:1rem;
  text-align: center;
  line-height: 2rem;
}
.lt_4 {
  font-size: 1rem;
  color: #6f6f6f;
}
.lt_4 em {
  color: #ff623d;
}
.zp_1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}
.zp_2 {
  font-size: 1rem;
  color: rgba(51, 51, 51, 1);
}
.zp_3 {
  font-size: 1rem;
  color: rgba(51, 119, 255, 1);
}
.zp_4 {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  color: rgba(111, 111, 111, 1);
}
.confirmBox {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.confirm {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  padding: 0 1rem 1rem;
}
.confirm h6 {
  text-align: center;
  line-height: 3rem;
  font-size: 1.2rem;
  color: rgba(51, 51, 51, 1);
  /* margin:0 1rem; */
  border-bottom: 1px solid #f6f6f6;
}
.closeBtn {
  position: absolute;
  right: 1rem;
  top: -2.6rem;
  width: 2rem;
  height: 3rem;
}
.closeBtn img {
  width: 100%;
}
.btnBox {
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
}
.btnBox > div {
  width: 5rem;
  height: 2rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1rem;
}
.btnBox > div:nth-of-type(1) {
  background: linear-gradient(
    180deg,
    rgba(217, 217, 217, 1),
    rgba(207, 207, 207, 1)
  );

  color: #fff;
}
.btnBox > div:nth-of-type(2) {
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  color: #fff;
}
.cishu {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
}
.cishu input {
  width: 17rem;
  height: 2rem;
  padding-left: 1rem;
  height: 2rem;
  font-size:1rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 4px;
}
.cishu span {
  display: block;
  line-height: 2rem;
  color: rgba(51, 51, 51, 1);
  font-size: 1rem;
}
.confirm_title {
  display: flex;
  justify-content: space-between;
  line-height: 3rem;
}
.confirm_title span:nth-of-type(1) {
  font-size: 1rem;
  color: rgba(51, 51, 51, 1);
}
.confirm_title span:nth-of-type(2) {
  font-size: 1rem;
  color: rgba(255, 98, 61, 1);
}
.pay h5 {
  font-size: 1rem;
  color: rgba(51, 51, 51, 1);
}
.selBox {
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
  height: 2rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 4px;
  background-image:url('../../static/images/15.png');
  background-repeat:no-repeat;
  background-position:96% center;
}
</style>