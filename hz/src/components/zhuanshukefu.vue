<template>
  <div>
    <q-head text="专属客服"></q-head>
    <div v-show="show">
      <q-confirm text="专属客服" :show="show" @click="showBox">
        <div slot="content">
          <h4 class="zskf_1">官方客服微信号-> {{mes.weiXin}}</h4>
          <!-- <h4 class="zskf_1">
            官方客服电话->
            <a :href="'tel:'+mes.phone">{{mes.phone}}</a>
          </h4> -->
          <h6 class="zskf_2">请仔细核对微信号，防止骗子</h6>
        </div>
        <div slot="btn">
          <div class="zskf_3">
            <div class="zskf_4 zskf_6" @click="changeK">更换客服</div>
            <div class="zskf_5 zskf_6" @click="$router.go(-1)">确定</div>
          </div>
        </div>
      </q-confirm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      mes: ""
    };
  },
  created() {
    this._getkefu();
  },
  methods: {
    showBox() {
      this.show = false;
    },
    _getkefu() {
      this.$post({
        cmd: "getHelp",
        uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      }).then(res => {
        if (res.result == 0) {
          this.mes = res;
        } else {
          this.showToast(res.resultNote);
        }
      });
    },
    changeK() {
      this.showLoading("正在更换")
        .$post({
          cmd: "changeHelp",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
        })
        .then(res => {
          if (res.result == 0) {
            // this.mes
            return this.$post({
              cmd: "getHelp",
              uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
            });
          } else {
            this.showToast(res.resultNote);
          }
        })
        .then(res1 => {
          if (res1.result == 0) {
            this.mes = res1;
            this.showToast("更换成功");
          } else {
            this.showToast(res1.resultNote);
          }
        });
    }
  }
};
</script>

<style scoped>
.zskf_1 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  line-height: 0.5rem;
}
.zskf_2 {
  font-size: 0.22rem;
  color: rgba(111, 111, 111, 1);
  text-align: center;
  line-height: 1.2rem;
}
.zskf_3 {
  display: flex;
  justify-content: space-around;
}
.zskf_4 {
  background-color: #ff8454;
}
.zskf_5 {
  background: rgba(51, 119, 255, 1);
}
.zskf_6 {
  width: 1.62rem;
  height: 0.54rem;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 0.52rem;
  font-size: 0.28rem;
  color: rgba(255, 255, 255, 1);
}
</style>


