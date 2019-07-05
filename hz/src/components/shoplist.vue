<template>
  <div>
    <q-head></q-head>
    <div class="s_5"></div>
    <div v-if="!list[0]" style="text-align:center;line-height:2rem;">暂无商品</div>
    <div v-if="list[0]">
      <van-card
        v-for="(item,index) in list"
        v-bind:key="index"
        :price="item.price"
        desc=" "
        :title="item.name"
        :thumb="item.image"
        @click="gotoIn"
      />
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
      page: 1,
      imageURL: "../static/images/10.png"
    };
  },
  created() {
    this._getList();
    window.onscroll = function() {
      if (!this.isload || this.isend) {
        return;
      }
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      var clientHeight =
        document.compatMode == "CSS1Compat"
          ? document.documentElement.clientHeight
          : document.body.clientHeight;
      var scrollHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      if (scrollTop + (clientHeight - 0) + 100 >= scrollHeight - 0) {
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
          cmd: "getCommodityList",
          nowPage: this.page
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
    },
    gotoIn() {
      this.showToast("正在开发中");
    }
  }
};
</script>

