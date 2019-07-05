<template>
  <div>
    <div class="lg_1">
      <img src="./../../../static/images/1.png" alt>
    </div>
    <div class="s_4"></div>
    <van-row>
      <van-col span="18" offset="2">
        <div class="lg_2">
          <van-cell-group>
            <van-field v-model.trim="phone" type="number" left-icon="contact" placeholder="请输入手机号"/>
            <van-field v-model.trim="password" type="password" left-icon="bag-o" placeholder="请输入密码"/>
          </van-cell-group>
        </div>
      </van-col>
    </van-row>
    <div class="s_5"></div>
    <van-row>
      <van-col span="24">
        <btn text="登陆" @click="login"></btn>
      </van-col>
    </van-row>
    <div class="s_2"></div>
    <van-row>
        <van-col span="8" offset="4">
          <span class="lg_3" @click="pr('/zhuce/no')">没有账号，去注册</span>
        </van-col>
        <van-col span="8" offset="4">
          <span class="lg_3" @click="$router.push('/zhaohuimima')">忘记密码?</span>
        </van-col>
    </van-row>
    <div class="s_5"></div>
    <van-row>
        <van-col offset="4">
            <van-checkbox :label-disabled="true" v-model="checked">
              <span class="lg_4">我已阅读并同意，</span>
              <span class="lg_5" @click="$router.push('/xieyi')">《诚信之家用户协议》</span>
            </van-checkbox>
        </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Field,Checkbox } from "vant";
import btn from "../commons/button";
import md5 from '../../util/md5.js'
export default {
  data() {
    return {
      phone: "",
      password: "",
      checked:true
    };
  },
  methods:{
      login(){
          if(!this.phone){
            this.showToast("请填写手机号码");
            return;
          }
          if(!this.password || this.password.length<6){
            this.showToast("请填写正确密码");
            return;
          }
          if(!this.checked){
            this.showToast("请勾选协议");
            return;
          }
          this.showLoading("正在登陆").$post({
            cmd:"userLogin",
            phone:this.phone,//用户手机号
			      password:this.password
          }).then((res)=>{
            this.$toast.clear();
            if(res.result==0){
              this.$store.commit("setuid",res.uid);
              window.sessionStorage.setItem("uid",res.uid);
              this.$router.push("/index");
            }else{
              this.showToast(res.resultNote)
            }
          })
      }
  },
  components: {
    Row,
    Col,
    Field,btn,Checkbox
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.lg_1 {
  width: 100%;
  img {
    width: 100%;
  }
}
.lg_3{
    color:#666666;
}
.lg_4{
    font-size:.24rem;
    color:#666666;
}
.lg_5{
    color:#3377FF;
}
</style>
<style>
    .lg_2 [class*=van-hairline]::after{
        border-top:none;
    }
</style>