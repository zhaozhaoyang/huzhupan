<template>
  <div>
    <q-head text="公告信息"></q-head>
    <div class="s_7"></div>
    <div class="ggm_4" v-for="item in list" v-bind:key="item.id">
      <q-panel>
        <div class="ggm_1">
          <div class="ggm_2">
            <img src="../../static/images/8.png" alt>
          </div>
          <div class="ggm_3">
            <h4 class="ggm_5">{{item.content}}</h4>
            <h4 class="ggm_6">{{item.time}}</h4>
          </div>
        </div>
      </q-panel>
      <div class="s_1"></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list: [],
      totalPage: 0,
      // 是否加载完成
      isload: true,
      // 列表当前页数
      page: 1,
    }
  },
  created(){
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
  methods:{
    _getList() {
      if(!this.isload){
        return;
      }
      if(this.page!=1 && this.page>this.totalPage){
        return;
      }
      this.isload = false;
      this.showLoading()
        .$post({
          cmd: "getMessageList",
          nowPage: this.page
        })
        .then(res => {
          if (res.result == 0) {
            this.page=this.page+1;
            this.isload=true;
            this.$toast.clear();
            this.list =this.list.concat(res.dataList);
            this.totalPage = res.totalPage;
          } else {
            this.showToast(res.resultNote);
          }
        });
    }
  }
}
</script>

<style scoped>
.ggm_1 {
    display:flex;
    align-items:center;
    justify-content:space-between;
}
.ggm_2 {
    width:.54rem;
    height:.54rem;
    padding:.3rem;
    flex:0 0 auto;
}
.ggm_2 img{width:100%;height:100%;}
.ggm_3 {
    width:100%;
    box-sizing:border-box;
    padding-right:1rem;
}
.ggm_4 {
    width:90%;
    margin:0 auto;
}
.ggm_5 {
    font-size:.28rem;;
color:rgba(51,51,51,1);
}
.ggm_6 {
    font-size:.24rem;padding-top:.2rem;
color:rgba(111,111,111,1);
}
</style>

