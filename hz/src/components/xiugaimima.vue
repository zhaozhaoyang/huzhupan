<template>
  <div>
    <q-head text="修改密码"></q-head>
    <div class="s_7"></div>
    <div class="xgmm_1">
      <van-row>
        <van-col span="20" offset="2">
          <van-cell-group>
            <van-field v-model.trim="new1" placeholder="请输入新密码" type="password">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/2.png" alt>
            </van-field>
            <van-field v-model.trim="new2" placeholder="请确认新密码" type="password">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/2.png" alt>
            </van-field>
            <van-field v-model.trim="code" type="number" placeholder="请输入验证码">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/6.png" alt>
              <div slot="button" class="xgmm_3" @click="setTime">{{time}}</div>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <div class="s_2"></div>
    <h6 class="xgmm_4">如果您的手机号无法接受短信请联系客服</h6>
    <div class="s_6"></div>
    <q-button text="确认修改" @click="sub"></q-button>
  </div>
</template>

<script>
import md5 from '../util/md5.js'
export default {
  data() {
    return {
      new1: "",
      new2: "",
      // 倒计时显示
      time: "获取验证码",
      // 是否可点击获取验证码按钮
      clickCode: true,
      code:"",
      codemes:"",
      // 手机号
      phone:this.$store.state.geren.phone
    };
  },
  methods: {
      sub(){
        if(!/^[\w_-]{6,16}$/.test(this.new1)){
          this.showToast("密码不能低于六位数");
          return;
        }
        if(this.new1!=this.new2){
          this.showToast("两次密码不一致");
          return;
        }
        if(this.code=="" || this.code!=this.codemes){
          this.showToast("请填写正确的验证码");
          return;
        }
        this.showLoading("正在修改").$post({
          cmd:"editPassword",
		      uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
		      password:this.new1//密码
        }).then((res)=>{
          if(res.result==0){
            this.showToast("修改成功");
            this.$router.go(-1);
          }else{
            this.showToast(res.resultNote)
          }
        })
      },
    setTime() {
      // 是否可点击
      if (!this.clickCode) {
        return;
      }
      // 是否手机正确
      // if (this.phone.length < 11) {
      //   // wx.showToast({
      //   //   title: "请输入正确的手机号码",
      //   //   icon: "none"
      //   // });
      //   return;
      // }
      this.showLoading("获取验证码").$post({
        cmd:"sendSms",
        phone:this.phone//用户手机号
      }).then((res)=>{
        this.$toast.clear();
        if(res.result==0){
          this.codemes=res.code;
          this._timeout(60);
        }else{
          this.showToast(res.resultNote)
        }
      })
    //   wx.showToast({
    //     title: "正在获取验证码",
    //     icon: "none",
    //     mask: true
    //   });
    },
    _timeout(time) {
    const text="S"
    let si=setInterval(()=>{
      time--;
      if(time<=0){
          this.time="获取验证码";
          this.clickCode=true;
        clearInterval(si);
        return;
      }
      const t=time<10?`0${time}`:time;
      this.time=`${t}${text}`;
      this.clickCode=false;
    },1000)
  },
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.xgmm_1 [class*="van-hairline"]::after {
  border-top: none;
}
.xgmm_1 .van-cell--large {
  padding-bottom: 8px;
}
.xgmm_2 {
  width: 0.4rem;
}
.xgmm_3 {
  width: 1.4rem;
  height: 0.34rem;
  font-size: 0.2rem;
  color: rgba(51, 119, 255, 1);
  border: 1px solid rgba(55, 123, 255, 1);
  border-radius: 4px;
  text-align: center;
  line-height: 0.34rem;
}
.xgmm_4{
    font-size:.22rem;
color:rgba(111,111,111,1);
text-align:center;
}
</style>

