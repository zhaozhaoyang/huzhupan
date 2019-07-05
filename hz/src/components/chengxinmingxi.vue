<template>
    <div>
        <q-head></q-head>
        <div class="s_6"></div>
        <div class="jf_2">
            <van-row>
                <van-col span="5" offset="1"><div class="jf_1">时间</div></van-col>
                <van-col span="7"><div class="jf_1">数值</div></van-col>
                <van-col span="11"><div class="jf_1">原因</div></van-col>
            </van-row>
        </div>
        <div v-if="!list[0]">
            <div class="s_2"></div>
            <van-row >
                <van-col span="20" offset="2"><div style="text-align:center;">暂无</div></van-col>
            </van-row>
        </div>
        <div class="jf_4" v-if="list[0]">
            <van-row v-for="(item,index) in list" v-bind:key="index">
                <van-col span="5" offset="1"><div class="jf_3">{{item.time}}</div></van-col>
                <van-col span="7"><div class="jf_3">{{item.point}}</div></van-col>
                <van-col span="11"><div class="jf_3">{{item.title}}</div></van-col>
            </van-row>
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
          cmd:"getDetailList",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
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
};
</script>

<style scoped>
.jf_1{font-size:.28rem;
color:rgba(51,51,51,1);text-align:center;line-height:.8rem;}
.jf_2{border-bottom:1px solid #EFEFEF;}
.jf_3{font-size:.24rem;
color:rgba(111,111,111,1);text-align:center;line-height:.6rem;}
</style>
