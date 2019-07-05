<template>
  <div>
    <head-top text="领导人信息"></head-top>
    <div class="s_7"></div>
    <van-row>
      <van-col span="22" offset="1">
        <panel>
          <div class="ldr_1">
            <van-cell-group>
              <van-field :value="mes.parentName?mes.parentName:'暂无'" label="会员昵称：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
              <van-field :value="mes.parentEmail?mes.parentEmail:'暂无'" label="会员账户：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
              <van-field :value="mes.parentPhone?mes.parentPhone:'暂无'" label="手机号：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
            </van-cell-group>
          </div>
        </panel>
      </van-col>
    </van-row>
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
            mes:''
        }
    },
    created(){
      this.mes=this.$store.state.geren;
    },
    methods:{
      
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
</style>