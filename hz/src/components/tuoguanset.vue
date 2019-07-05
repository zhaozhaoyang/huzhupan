<template>
  <div>
    <head-top text="托管设置"></head-top>
    <div class="s_8"></div>
    <van-row>
      <van-col span="22" offset="1">
        <panel>
          <van-cell title="托管开关">
            <switch-box size=".4rem" v-model="checked" @change="getNew"/>
          </van-cell>
        </panel>
      </van-col>
    </van-row>
    <div class="s_1"></div>
    <van-row>
        <van-col span="22" offset="2">
            <span class="tgs_1">开启后你的直接领导人将可以帮助你进行操作</span>
        </van-col>
    </van-row>
  </div>
</template>

<script>
//头部
import headTop from "./commons/header";

//版块
import panel from "./commons/panel";
import { Cell, Switch, Row, Col } from "vant";
export default {
  data() {
    return {
      checked: false
    };
  },
  created(){
    this.checked=this.$store.state.geren.isHost==1?true:false
  },
  methods:{
    getNew(item){
      this.showLoading("正在修改").$post({
        cmd:"editUserInfo",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
		    isHost:item?1:0//是否托管(1:是0:否)
      }).then((res)=>{
        if(res.result==0){
          this.showToast("修改成功");
        }else{
          this.showToast(res.resultNote);
        }
      })
      // if(){}
    }
  },
  watch:{},
  components: {
    headTop,
    panel,
    Cell,
    SwitchBox: Switch,
    Row,
    Col
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
    .tgs_1{font-size:.22rem;color:rgba(111,111,111,1);}
</style>