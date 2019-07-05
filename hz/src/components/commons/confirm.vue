<template>
  <div class="confirmBox" v-show="show">
    <div class="confirm">
      <h6 class="title">{{text}}</h6>
      <div class="close" v-on:click="close">
        <img src="../../../static/images/t1.png" alt>
      </div>
      <div class="confirm_padding">
        <slot name="content"></slot>
      </div>
      <div class="confirm_padding">
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    show: {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      // show: false
    };
  },
  created() {
    // this.show = this.isshow;
  },
  computed: {
    showBox() {
    }
  },
  watch: {
    // isshow() {
    //   if(isshow){
    //       this.show=this.isshow;
    //   }else{
    //       this.show=!this.isshow
    //   }
    // },
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
  methods: {
    close() {
      this.$emit('click')
      // this.show = false;
    }
  }
};
</script>


<style lang="">
.confirmBox {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  
}
.confirm {
  width: 80%;
  margin: 0 auto;
  background-color:#fff;
  border-radius:10px;
  position: relative;
  box-sizing:border-box;
  padding:0 .4rem .4rem;
}
.confirm .title{
  text-align:center;
  line-height:1rem;
  font-size:.36rem;
  color:rgba(51,51,51,1);
/* margin:0 1rem; */
border-bottom:1px solid #F6F6F6;
}
.close {
  position: absolute;
  right: .08rem;
  top: -0.93rem;
  width:0.62rem;
  height:1rem;
}
.close img{width:100%;}
/* .confirm_padding{
  padding:
} */
</style>