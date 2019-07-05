<template>
  <div>
    <q-head text="常见问题"></q-head>
    <div class="s_7"></div>
    <iframe :src="''+url" frameborder="0" class="askList"></iframe>
    <!-- <h4 class="wt_1">{{title}}</h4>
        <div class="s_2"></div>
    <p class="wt_2">{{text}}</p>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // title:"如何举报？怎样正确使用举报功能？",
      // text:"如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？如何举报？怎样正确使用举报功能？"
      url: ""
    };
  },
  created() {
    this.url = this.$route.params.id;
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.wt_1 {
  font-size: 0.32rem;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding: 0 0.4rem;
  word-wrap: break-word;
  word-break: break-all;
}
.wt_2 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
  text-align: left;
  padding: 0 0.4rem;
  word-wrap: break-word;
  word-break: break-all;
  text-indent: 0.48rem;
  line-height: 0.5rem;
}
.askList {
  display: block;
  width: 100%;
  min-height: 100vh;
}
</style>


