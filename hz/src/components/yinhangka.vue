<template>
  <div>
    <head-top></head-top>
    <div class="s_7"></div>
    <van-row>
      <van-col span="22" offset="1">
        <panel>
          <div class="ldr_1">
            <van-cell-group>
              <van-field v-model="mes.bankName" label="开户银行：" disabled label-align="right" input-align="left"/>
              <van-field v-model="mes.bankNumber" label="银行卡号：" disabled label-align="right" input-align="left"/>
              <van-field v-model="mes.branch" label="支行名称：" disabled label-align="right" input-align="left"/>
              <van-field v-model="mes.userName" label="持卡人：" disabled label-align="right" input-align="left"/>
              <van-field v-model="mes.alipay" label="支付宝：" disabled label-align="right" input-align="left"/>
            </van-cell-group>
          </div>
        </panel>
      </van-col>
    </van-row>
    <div class="s_2"></div>
    <div class="yhk_1">为了保障您的账户安全，银行卡添加后您不可编辑或删除。<br>如需更改银行卡信息请联系客服操作。</div>
    <!-- <div></div> -->
    <!-- <tips text="111" :show="true" @click="aaa"></tips> -->
  </div>
</template>

<script>
import panel from "./commons/panel";
import headTop from "./commons/header";
import { Row, Col, Field } from "vant";

export default {
    data(){
        return{
            cardName:"",
            card:"",
            cardTitle:"",
            people:"",
            zfb:"",
            mes:""
        }
    },
    created(){
      this.showLoading()
        .$post({
          cmd: "getUserInfo",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
        })
        .then(res => {
          if (res.result == 0) {
            this.mes = res;
            this.$toast.clear();
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    methods:{
      aaa(){
      }
    },
  components: {
    panel,
    Row,
    Col,
    Field,
    headTop
  }
};
</script>

<style scoped>
    .ldr_1 [class*=van-hairline]::after{
        border:none;
    }
    .yhk_1{
        width:85%;margin:0 auto;
font-size:.22rem;
color:rgba(111,111,111,1);}
</style>
