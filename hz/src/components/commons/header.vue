<template>
  <div class="head-box">
    <div class="head-left" v-if="noleft">
      <van-icon color="#fff" size=".4rem" name="arrow-left" v-on:click="goBack"/>
    </div>
    <span class="head-text">{{text?text:$route.meta.title}}</span>
    <div class="head-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props: {
    text: {
      type: String
    },
    back:{
        type:[String,Number]
    },
    noleft:{
      type:Boolean,
      default:true
    }
  },
  components: {
    Icon
  },
  methods:{
      goBack(){
          if(this.back){
              this.$router.push(this.back);
          }else{
              this.$router.go(-1);
          }
      }
  }
};
</script>

<style lang="">
.head-box {
  position: fixed;
  top:0;
  left:0;
  z-index:888;
  display: flex;
  /* justify-content:space-between; */
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 1rem;
  /* padding-top: 0.4rem; */
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
  font-size: 0.36rem;
  text-align: center;
  line-height:.8rem;
}
.head-left {
  position: absolute;
  left: 0;
  box-sizing:border-box;
  width:.8rem;
  height:.8rem;
  padding-top:.2rem;
  /* line-height:.8rem; */
  text-align:center;
}
.head-right {
  position: absolute;
  right: 0;
  padding-right:.2rem;
  color:#fff;
}
</style>