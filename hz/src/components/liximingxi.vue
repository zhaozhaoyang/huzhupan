<template>
  <div>
    <q-head></q-head>
    <div class="s_6"></div>
    <div class="jf_2">
      <van-row>
        <van-col span="2">
          <div class="jf_1">类型</div>
        </van-col>
        <van-col span="6">
          <div class="jf_1">交易号</div>
        </van-col>
        <van-col span="5">
          <div class="jf_1">金额</div>
        </van-col>
        <van-col span="2">
          <div class="jf_1">获利</div>
        </van-col>
        <van-col span="6">
          <div class="jf_1">解冻日期</div>
        </van-col>
        <van-col span="3">
          <div class="jf_1">状态</div>
        </van-col>
      </van-row>
    </div>
    <div v-if="!list[0]">
      <div class="s_2"></div>
      <van-row>
        <van-col span="20" offset="2">
          <div style="text-align:center;">暂无</div>
        </van-col>
      </van-row>
    </div>
    <div class="jf_4" v-if="list[0]">
      <van-row v-for="(item,index) in list" v-bind:key="index">
        <van-col span="2">
          <div class="jf_3">{{item.name?item.name:""}}</div>
        </van-col>
        <van-col span="6">
          <div class="jf_3">{{item.orderNum?item.orderNum:""}}</div>
        </van-col>
        <van-col span="5">
          <div class="jf_3">{{item.money}}</div>
        </van-col>
        <van-col span="2">
          <div class="jf_3">{{item.reward}}</div>
        </van-col>
        <van-col span="6">
          <div class="jf_3">{{item.time?item.time:"未来"}}</div>
        </van-col>
        <van-col span="3">
          <div class="jf_3">{{item.status==1?"已生效":"未解冻"}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      totalPage: 0,
      // 是否加载完成
      isload: true,
      // 列表当前页数
      page: 1
    };
  },
  created() {
    this._getList();
    window.onscroll = function() {
      if (!this.isload || this.isend) {
        return;
      }
      var scrollTop =document.body.scrollTop || document.documentElement.scrollTop;
      var clientHeight=document.compatMode == "CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;
      var scrollHeight=document.body.scrollHeight|| document.documentElement.scrollHeight;
      if (
        scrollTop + (clientHeight - 0) + 100 >=scrollHeight - 0
      ) {
        this._getList();
      }
    }.bind(this);
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
          cmd: "getInterestList",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          nowPage: this.page,
          pageCount: 40
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
  }
};
</script>

<style scoped>
.jf_1 {
  font-size: 0.28rem;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  line-height: 0.8rem;
}
.jf_2 {
  border-bottom: 1px solid #efefef;
}
.jf_3 {
  font-size: 0.24rem;
  color: rgba(111, 111, 111, 1);
  text-align: center;
  line-height: 0.6rem;
}
</style>