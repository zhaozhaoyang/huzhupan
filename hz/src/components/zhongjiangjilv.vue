<template>
  <div>
    <q-head text="中奖纪录"></q-head>
    <div class="s_5"></div>
    <div class="zjj_1">
      <van-row>
        <van-col span="12">
          <span class="zjj_2">时间</span>
        </van-col>
        <van-col span="12">
          <span class="zjj_2">奖项</span>
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
    <div v-if="list[0]">
      <div v-for="(item,index) in list" v-bind:key="index">
        <van-row>
          <van-col span="12">
            <span class="zjj_3">{{item.time}}</span>
          </van-col>
          <van-col span="12">
            <span class="zjj_3">{{item.name}}</span>
          </van-col>
        </van-row>
      </div>
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
          cmd: "getLotteryList",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          nowPage: this.page,
          pageCount: 20
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
.zjj_1 {
  height: 1rem;
  border-bottom: 1px solid #efefef;
}
.zjj_2 {
  display: block;
  text-align: center;
  font-size: 0.32rem;
  color: rgba(51, 51, 51, 1);
  line-height: 1rem;
  /* border-left:1px solid #EFEFEF; */
}
.zjj_3 {
  display: block;
  text-align: center;
  font-size: 0.32rem;
  color: #6f6f6f;
  line-height: 0.7rem;
  /* border-left:1px solid #EFEFEF; */
}
</style>