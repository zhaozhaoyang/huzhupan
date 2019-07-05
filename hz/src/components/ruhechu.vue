<template>
  <div>
    <q-head></q-head>
    <div class="s_7"></div>
    <div class="rhc_1">
      <q-list :list="getList"></q-list>
    </div>
    <!-- <h4 class="rhc_2">匹配金额：{{mes.money}}</h4> -->
    <div class="s_1"></div>
    <div
      class="lis"
      style="width:90%;margin:0 auto;"
      v-for="(item,ind) in mes.dataList"
      v-bind:Key="ind"
    >
      <q-panel>
        <van-collapse v-model="activeNames">
          <van-collapse-item :name="ind">
            <div slot="title" class="rhc_3">
              <span class="rhc_4">订单号：{{item.orderNum}}</span>
              <div class="rhc_5">
                <span class="rhc_6">{{item.status==1?"待上传凭证":item.status==2?"待确认":"已完成"}}</span>
                <div class="rhc_7">
                  <span class="rhc_8">{{item.nickName1}}><span style="font-size:.4rem;color:#3377ff">{{item.money}}</span>>{{item.nickName2}}</span>
                  <!-- <span class="rhc_8">您>{{item.money}}>{{item.nickName2}}</span> -->
                  <span class="rhc_8">创建时间：{{mes.time}}</span>
                </div>
              </div>
              <div v-if="item.status==1" style="color:#338cff;font-size:.24rem;">请于14点之前完成</div>
            </div>
            <div slot="right-icon" class="rhc_15">
              详情
              <van-icon name="arrow-down"/>
            </div>
            <div class="rhc_9">
              <h4
                class="rhc_10"
              >打款人:{{item.nickName1}}（{{item.phone1.replace(/^([\d]{3})([\d]{4})([\d]{4})$/,"$1****$3")}}）</h4>
              <h4
                class="rhc_10"
              >打款人领导人：{{item.parentName1}}（{{item.parentPhone1.replace(/^([\d]{3})([\d]{4})([\d]{4})$/,"$1****$3")}}）</h4>
              <div class="rhc_11">
                <h4 class="rhc_10">银行：{{item.bankName}}</h4>
                <h4 class="rhc_10">卡号：{{item.bankNumber}}</h4>
                <h4 class="rhc_10">支行：{{item.branch}}</h4>
                <h4 class="rhc_10">持有人：{{item.userName}}</h4>
                <h4 class="rhc_10">备注：{{item.remark}}</h4>
              </div>
              <h4
                class="rhc_10"
              >收款人：{{item.nickName2}}（{{item.phone2.replace(/^([\d]{3})([\d]{4})([\d]{4})$/,"$1****$3")}}）</h4>
              <h4
                class="rhc_10"
              >收款人领导人:{{item.parentName2?item.parentName2.replace(/^([\d]{3})([\d]{4})([\d]{4})$/,"$1****$3"):"暂无"}}{{item.parentPhone2?'（'+item.parentPhone2.replace(/^([\d]{3})([\d]{4})([\d]{4})$/,"$1****$3")+')':''}}</h4>
              <h4 class="rhc_10">打款时间：{{item.paytime?item.paytime:"暂无"}}</h4>
              <div class="rhc_12" v-if="isclick">
                <div class="rhc_13" v-if="item.status!=1" @click="upImg(item.image)">查看打印凭证</div>
                <div class="rhc_13" v-if="mes.type==1 && item.status!=3">
                  <label :for="'up'+ind">
                    <input
                      type="file"
                      :id="'up'+ind"
                      @change="getImg($event,item.id,ind)"
                      :data-i="ind"
                    >
                    <span v-if="item.status!=1">已上传</span>
                    <span v-if="item.status==1">上传打款凭证</span>
                  </label>
                </div>
                <div
                  class="rhc_14"
                  v-if="mes.type==2 && item.status==2"
                  v-on:click="quren(item.id,ind)"
                >确认收款</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </q-panel>
      <div class="s_2"></div>
    </div>
    <van-image-preview v-model="show" :images="images"></van-image-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      mes: "",
      show: false,
      images: [],
      isclick: false,
      // 上传时做个已上传
      isUp: false
    };
  },
  created() {
    this._getList();
    // console.log(typeof this.mes.dataList)
  },
  computed: {
    isclick() {
      return;
    }
  },
  methods: {
    _getList() {
      this.showLoading()
        .$post({
          cmd: "getGoodsDetail",
          id: this.$route.params.id
        })
        .then(res => {
          if (res.result == 0) {
            this.mes = res;
            this.$toast.clear();
            this.isclick =
              window.sessionStorage.getItem("uid") == this.mes.uid ||
              this.$store.state.uid == this.mes.id;
            this.mes.dataList.forEach((item, index) => {
              if (item.status == 1 || item.status == 2) {
                this.activeNames.push(index);
              }
            });
          } else {
            this.showLoading(res.resultNote);
          }
        });
    },
    upImg(img) {
      this.show = true;
      this.images = [];
      this.images.push(img);
    },
    quren(id, ind) {
      this.$dialog
        .confirm({
          title: "提现",
          message: "是否确认收款"
        })
        .then(() => {
          this.showLoading("确认中")
            .$post({
              cmd: "confirmOrder",
              uid:
                this.$store.state.uid || window.sessionStorage.getItem("uid"), //
              id: id //订单id
            })
            .then(res => {
              if (res.result == 0) {
                this.showToast("确认收款成功");
                this.mes.dataList[ind - 0].status = 3;
              } else {
                this.showLoading(res.resultNote);
              }
            });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
      return;
    },
    getImg(e, id, ind) {
      // let ind=e.target.dataset.i;
      console.log(ind);
      var formdata = new FormData();
      // var formData = new FormData();
      let img = e.target.files[0];
      formdata.append("file", img);
      let imgurl = "";
      this.showLoading("上传中")
        .$post1("/addimg", formdata)
        .then(res => {
          if (res.result == 0) {
            imgurl = res.object;
            return this.$post({
              cmd: "uploadCertificate",
              uid:
                this.$store.state.uid || window.sessionStorage.getItem("uid"),
              image: res.object,
              id: id
            });
          } else {
            this.showToast(res.resultNote);
          }
        })
        .then(res => {
          if (res.result == 0) {
            // console.log(ind)
            // console.log(this.mes.dataList[ind])
            this._getList();
            this.mes.dataList[ind].status = "2";
            this.showToast("上传成功");
          } else {
            this.showToast(res.resultNote);
          }
        });
      // console.log(e.target.files[0])
    }
  },
  computed: {
    getList() {
      const list = [{}];
      // list[0]={};
      list[0].id = "";
      list[0].money = this.mes.money;
      list[0].nickName = this.mes.nickName;
      list[0].num = this.mes.num;
      list[0].number = this.mes.number;
      list[0].status = this.mes.status;
      list[0].time = this.mes.time;
      list[0].type = this.mes.type;
      return list;
    }
  }
};
</script>


<style scoped>
.lis [class*="van-hairline"]::after {
  border-bottom: none;
}
.rhc_2 {
  text-align: center;
  font-size: 0.28rem;
  color: rgba(26, 26, 25, 1);
  line-height: 0.6rem;
}
.rhc_4 {
  font-size: 0.24rem;
  color: rgba(51, 119, 255, 1);
}
.rhc_5 {
  display: flex;
  align-items: center;
  padding-top: 0.2rem;
}
.rhc_6 {
  white-space: nowrap;
  font-size: 0.28rem;
  color: rgba(111, 111, 111, 1);
  padding: 0 0.3rem 0 0;
}
.rhc_7 {
  display: flex;
  flex-direction: column;
}
.rhc_8 {
  font-size: 0.24rem;
  color: rgba(111, 111, 111, 1);
  line-height: 0.4rem;
}
.rhc_10 {
  font-size: 0.22rem;
  color: rgba(111, 111, 111, 1);
  line-height: 0.4rem;
}
.rhc_11 {
  background: rgba(237, 243, 255, 1);
  border-radius: 8px;
  padding: 0.2rem 0.3rem;
  margin: 0.3rem 0;
}
.rhc_12 {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.4rem;
}
.rhc_13 {
  position: relative;
  width: 1.8rem;
  height: 0.52rem;
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  border-radius: 1rem;
  color: #fff;
  text-align: center;
  line-height: 0.52rem;
  font-size: 0.24rem;
  margin: 0 0.6rem 0 0;
}
.rhc_13 input {
  width: 100%;
  height: 100%;
  display: none;
}
.rhc_13 label {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 0.52rem;
}
.rhc_14 {
  width: 1.8rem;
  height: 0.52rem;
  background: #ff8454;
  border-radius: 1rem;
  color: #fff;
  text-align: center;
  line-height: 0.52rem;
  font-size: 0.24rem;
}
.rhc_15 {
  width: 1.6rem;
  height: 0.52rem;
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  border-radius: 1rem;
  text-align: center;
  line-height: 0.52rem;
  color: #fff;
  margin-top: 0.8rem;
}
</style>

