<template>
  <div class="btn" v-bind:class="[size==1?'large':size==2?'middle':'small']" v-on:click="ck">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "提交"
    },
    size: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {};
  },
  methods:{
      ck(){
          this.$emit("click")
      }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.btn {
    color:#fff;
    text-align:center;
    line-height:0.8rem;
    font-size:0.3rem;
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  box-shadow: 0px 10px 24px 0px rgba(55, 151, 255, 0.3);
  margin:0 auto;
}
.large {
  width: 5.78rem;
  height: 0.8rem;
  border-radius:.8rem;
}
</style>