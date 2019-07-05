<template>
  <div>
    <q-head></q-head>
    <div class="s_7"></div>
    <div class="zhmm_1">
        <img :src="img" alt="">
    </div>
    <div class="xgmm_1">
      <van-row>
        <van-col span="20" offset="2">
          <van-cell-group>
            <van-field v-model.trim="phone" type="number" placeholder="请输入手机号">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/4.png" alt>
            </van-field>
            <van-field v-model.trim="code" type="number" placeholder="请输入验证码">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/6.png" alt>
              <div slot="button" class="xgmm_3" @click="setTime">{{time}}</div>
            </van-field>
            <van-field v-model.trim="new1" type="password" placeholder="请输入新密码">
              <img slot="left-icon" class="xgmm_2" src="../../static/images/2.png" alt>
            </van-field>
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <div class="s_2"></div>
    <div class="s_6"></div>
    <q-button text="提交" @click="sub"></q-button>
  </div>
</template>

<script>
import md5 from '../util/md5.js'
export default {
  data() {
    return {
      new1: "",
      code: "",
      codemes:"",
      // 倒计时显示
      time: "获取验证码",
      // 是否可点击获取验证码按钮
      clickCode: true,
      // 手机号
      phone: "",
    //   默认头像
        img:require("../../static/images/10.png")
    };
  },
  methods: {
      sub(){
        if(!this.phone || this.phone.length<11){
          this.showToast("请填写正确的手机号码");
          return;
        }
        if(!this.code || this.code.length<6 || this.code!=this.codemes){
          this.showToast("请填写正确的验证码")
          return;
        }
        if(!this.new1 || !/^[\w_-]{6,16}$/.test(this.new1)){
          this.showToast("请填写正确的新密码")
          return;
        }
        this.showLoading("正在提交").$post({
          cmd:"forgetPassWord",
			    phone:this.phone,//用户手机号
			    password:this.new1//密码
        }).then((res)=>{
          if(res.result==0){
            this.showToast("修改成功");
            this.$router.push("/login");
          }else{
            this.showToast(res.resultNote);
          }
        })
      },
    setTime() {
      // 是否可点击
      if (!this.clickCode) {
        return;
      }
      // 是否手机正确
      if (this.phone.length < 11) {
        this.showToast("请填写正确的手机号码")
        return;
      }
      
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
.zhmm_1{
    width:1.68rem;
    height:1.68rem;
    margin:0 auto;
    overflow:hidden;
}
.zhmm_1 img{width:100%;height:100%;}
</style>


