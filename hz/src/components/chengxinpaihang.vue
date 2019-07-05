<template>
  <div>
    <head-top text="诚信值排行"></head-top>
    <div class="s_4"></div>
    <div class="cxph_2">
      <van-row>
        <van-col span="4" offset="1">
          <h1 class="cxph_1">排名</h1>
        </van-col>
        <van-col span="9">
          <h1 class="cxph_1">昵称</h1>
        </van-col>
        <van-col span="9">
          <h1 class="cxph_1">诚信值</h1>
        </van-col>
      </van-row>
    </div>
    <div v-for='(item,index) in list' v-bind:key="item.id">
      <van-row>
        <van-col span="4" offset="1">
          <h1 class="cxph_3">{{index+1}}</h1>
        </van-col>
        <van-col span="9">
          <h1 class="cxph_3">{{item.nickName}}</h1>
        </van-col>
        <van-col span="9">
          <h1 class="cxph_3">{{item.integrityValue}}</h1>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
//头部
import headTop from "./commons/header";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
      this.showLoading()
        .$post({
          cmd: "getIntegrityValueList",
          nowPage: this.page,
          pageCount:50
        })
        .then(res => {
          if (res.result == 0) {
            this.$toast.clear();
            this.list = res.dataList;
          } else {
            this.showToast(res.resultNote);
          }
        });
    // this._getList();
    // window.onscroll = function() {
    //   if (!this.isload || this.isend) {
    //     return;
    //   }
    //   var scrollTop =
    //     document.body.scrollTop || document.documentElement.scrollTop;
    //   if (
    //     scrollTop + (document.documentElement.clientHeight - 0) >=
    //     document.documentElement.scrollHeight - 0
    //   ) {
    //     this._getList();
    //   }
    // }.bind(this);
  },
  methods: {
    _getList() {
      if (!this.isload) {
        return;
      }
      if (this.page != 1 && this.page > this.totalPage) {
        return;
      }
      this.isload = false;
      this.showLoading()
        .$post({
          cmd: "getIntegrityValueList",
          nowPage: this.page,
          pageCount:50
        })
        .then(res => {
          if (res.result == 0) {
            this.page = this.page + 1;
            this.isload = true;
            this.$toast.clear();
            this.list = this.list.concat(res.dataList);
            this.totalPage = res.totalPage;
          } else {
            this.showToast(res.resultNote);
          }
        });
    }
  },
  components: {
    headTop
  }
};
</script>

<style scoped>
.cxph_1 {
  text-align: center;
  font-size: 0.32rem;
}
.cxph_2 {
  padding: 0.5rem 0 0.2rem;
  border-bottom: 1px solid #efefef;
}
.cxph_3 {
  line-height: 0.5rem;
  font-size: 0.28rem;
  color: rgba(111, 111, 111, 1);
  text-align: center;
}
</style>
