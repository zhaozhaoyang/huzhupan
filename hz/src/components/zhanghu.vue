<template>
  <div>
    <q-head :noleft="false">
      <div slot="right" class="td_1" @click="$router.push('/zhuanshukefu')">
        <img src="../../static/images/11.png" alt>
      </div>
    </q-head>
    <div class="s_5"></div>
    <h4 class="zh_1">
      <span class="zh_2"></span>
      <em class="zh_3">账户信息</em>
    </h4>
    <van-row>
      <van-col span="22" offset="1">
        <q-panel>
          <div class="ldr_1">
            <van-cell-group>
              <van-field
                v-model="mes.integrityCoin"
                label="手续费："
                disabled
                label-align="right"
                input-align="left"
              >
                <div class="zh_4" slot="button" v-on:click="open(0)">兑换</div>
              </van-field>
              <van-field
                v-model="mes.principal"
                label="本息账户："
                disabled
                label-align="right"
                input-align="left"
              >
                <!-- <div class="zh_4" slot="button" v-on:click="$router.push('/jiaoyitixing')">充值</div> -->
              </van-field>
              <van-field
                v-model="mes.reward"
                label="奖励账户："
                disabled
                label-align="right"
                input-align="left"
              />
              <van-field
                v-model="mes.integrityValue"
                label="诚信值："
                disabled
                label-align="right"
                input-align="left"
              />
              <van-field
                v-model="mes.score"
                label="积分："
                disabled
                label-align="right"
                input-align="left"
              />
              <van-field
                v-model="mes.number"
                label="诚信券："
                disabled
                label-align="right"
                input-align="left"
              >
                <div slot="button">
                  <!-- <span class="zh_4" @click="open(2)">转账</span> -->
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="zh_4" @click="open(1)">兑换</span>
                </div>
                <!-- <div class="zh_4" slot="button" @click="open(1)">兑换</div> -->
              </van-field>
            </van-cell-group>
          </div>
        </q-panel>
      </van-col>
    </van-row>
    <div class="s_1"></div>
    <h4 class="zh_1">
      <span class="zh_2"></span>
      <em class="zh_3">数据信息</em>
    </h4>
    <div class="zh_5">
      <q-panel>
        <van-cell title="银行卡" is-link to="/yinhangka"/>
      </q-panel>
      <div class="s_1"></div>
      <q-panel>
        <van-cell title="利息明细" is-link to="/liximingxi"/>
      </q-panel>
      <div class="s_1"></div>
      <q-panel>
        <van-cell title="奖励明细" is-link to="/jianglimingxi"/>
      </q-panel>
      <div class="s_1"></div>
      <q-panel>
        <van-cell title="积分明细" is-link to="/jifenmingxi"/>
      </q-panel>
      <div class="s_1"></div>
      <q-panel>
        <van-cell title="诚信值明细" is-link to="/chengxinmingxi"/>
      </q-panel>
      <div class="s_1"></div>
      <q-panel>
        <van-cell title="诚信商城" is-link to="/shoplist"/>
      </q-panel>
      <div class="s_1"></div>
    </div>
    <div v-show="show[0]">
      <q-confirm text="购买手续费" :show="show[0]" @click="close(0)">
        <div class slot="content">
          <div class="pay">
            <h5>支付账户</h5>
            <select name id class="selBox">
              <option value="1">本息账户(余额：{{mes.principal}})</option>
            </select>
          </div>
          <div class="cishu">
            <input type="number" placeholder="金额" v-model.trim="num1">
            <!-- <span>&nbsp;</span> -->
          </div>
        </div>
        <div slot="btn" class="btnBox">
          <div v-on:click="close(0)">取消</div>
          <div @click="buymoney">确定</div>
        </div>
      </q-confirm>
    </div>
    <div v-show="show[1]">
      <q-confirm text="购买诚信券" :show="show[1]" @click="close(1)">
        <div class slot="content">
          <div class="confirm_title">
            <span>费用</span>
            <span>50/个</span>
          </div>
          <div class="pay">
            <h5>支付账户</h5>
            <select name id class="selBox" v-model="choose2">
              <option value="1">本息账户(余额：{{mes.principal}})</option>
              <option value="2">奖励账户(余额：{{mes.reward}})</option>
              <option value="3">积分(余额：{{mes.score}})</option>
            </select>
          </div>
          <div class="cishu">
            <input type="number" v-model.number="num2" placeholder="购买数量">
            <span>&nbsp;个</span>
          </div>
        </div>
        <div slot="btn" class="btnBox">
          <div v-on:click="close(1)">取消</div>
          <div @click="buyquan">确定</div>
        </div>
      </q-confirm>
    </div>
    <div v-show="show[2]">
      <q-confirm text="转账诚信券" :show="show[2]" @click="close(2)">
        <div class slot="content">
          <!-- <div class="confirm_title">
            <span>费用</span>
            <span>100/个</span>
          </div> -->
          <div class="cishu" style="display:flex;flex-direction:column;">
            <h4>接收人:{{people}}</h4>
            <input type="number" v-model="phone" placeholder="请输入诚信券接收人手机号" @input="cnm">
          </div>
          <div class="cishu">
            <input type="number" v-model.number="num3" placeholder="转账数量">
            <span>&nbsp;个</span>
          </div>
        </div>
        <div slot="btn" class="btnBox">
          <div v-on:click="close(2)">取消</div>
          <div @click="zhuanzhang">确定</div>
        </div>
      </q-confirm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mes: "",
      show: [false, false, false],
      choose2: "1",
      num1: "",
      num2: "",
      phone: "",
      num3: "",
      people:""
    };
  },
  created() {
    this._getMes();
  },
  methods: {
    cnm() {
      if (this.phone.length == 11) {
        this.$post({
          cmd: "getUserInfoByPhone",
          phone: this.phone
        }).then(res => {
          if (res.result == 0) {
            this.people=res.nickName;
          } else {
            this.showToast(res.resultNote);
          }
        });
      }
    },
    zhuanzhang() {
      this.showLoading("正在转诚信券")
        .$post({
          cmd: "couponTransfer",
          uid: this.$store.state.uid || window.sessionStorage.getItem("uid"),
          phone: this.phone,
          number: this.num3
        })
        .then(res => {
          if (res.result == 0) {
            this.close(2);
            (this.phone = ""), (this.num3 = "");
            this._getMes();
            this.showToast("转账成功");
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    goshang() {
      this.showToast("正在开发中...");
    },
    close(ind) {
      this.$set(this.show, ind, false);
    },
    open(ind) {
      if (ind == 1) {
        if (
          this.mes.score - 0 < 100 &&
          this.mes.principal - 0 < 100 &&
          this.mes.reward - 0 < 100
        ) {
          this.showToast("余额不足");
          return;
        }
      }
      if (ind == 0) {
        if (this.mes.principal - 0 <= 0) {
          this.showToast("余额不足");
          return;
        }
      }
      this.$set(this.show, ind, true);
    },
    _getMes() {
      this.showLoading()
        .$post({
          cmd: "getUserInfo",
          uid: this.$store.state.uid || window.sessionStorage.getItem("uid")
        })
        .then(res => {
          if (res.result == 0) {
            this.mes = res;
            this.$toast.clear();
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    buyquan() {
      if (!this.num2) {
        this.showToast("请填写购买数量");
        return;
      }
      if (this.num2 - 0 < 1) {
        this.showToast("请输入正整数");
        return;
      }
      if (this.num2 - 0 < 2) {
        this.showToast("2个起买");
        return;
      }
      this.showLoading("购买中")
        .$post({
          cmd: "exchangeActivation",
          uid: this.$store.state.uid || window.sessionStorage.getItem("uid"),
          type: this.choose2 - 0,
          number: this.num2 //数量
        })
        .then(res => {
          if (res.result == 0) {
            this.showToast("购买成功");
            this.num2 = "";
            this.choose2 = "1";
            this.$set(this.show, 1, false);
            this._getMes();
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    buymoney() {
      if (!this.num1) {
        this.showToast("请填写购买金额");
        return;
      }
      if (this.num1 - 0 < 1) {
        this.showToast("请输入正整数");
        return;
      }
      this.showLoading("购买中")
        .$post({
          cmd: "exchangeIntegrity",
          uid: this.$store.state.uid || window.sessionStorage.getItem("uid"),
          money: this.num1 - 0
        })
        .then(res => {
          if (res.result == 0) {
            this.showToast("购买成功");
            this.num1 = "";
            this.$set(this.show, 0, false);
            this._getMes();
          } else {
            this.showToast(res.resultNote);
          }
        });
    }
  }
};
</script>

<style scoped>
.td_1 {
  width: 0.42rem;
}
.td_1 img {
  width: 100%;
}
.ldr_1 [class*="van-hairline"]::after {
  border: none;
}
.ldr_1 {
  padding-right: 0.3rem;
}
.zh_1 {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.4rem 0.2rem;
}
.zh_2 {
  display: block;
  width: 0.08rem;
  height: 0.38rem;
  background: rgba(51, 119, 255, 1);
  border-radius: 0.04rem;
  margin-right: 0.1rem;
}
.zh_3 {
  font-size: 0.34rem;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.zh_4 {
  font-size: 0.24rem;
  color: rgba(51, 119, 255, 1);
}
.zh_5 {
  width: 90%;
  margin: 0 auto;
}
.confirm_title {
  display: flex;
  justify-content: space-between;
  line-height: 0.5rem;
}
.confirm_title span:nth-of-type(1) {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.confirm_title span:nth-of-type(2) {
  font-size: 0.24rem;
  color: rgba(255, 98, 61, 1);
}
.pay h5 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.24rem;
}
.selBox {
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.24rem;
  height: 0.48rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 4px;
}
.cishu {
  display: flex;
  justify-content: space-between;
  padding-top: 0.24rem;
}
.cishu input {
  width: 3.8rem;
  height: 0.48rem;
  padding-left: 0.24rem;
  height: 0.48rem;
  border: 1px solid rgba(51, 119, 255, 1);
  border-radius: 4px;
}
.cishu span {
  display: block;
  line-height: 0.48rem;
  color: rgba(51, 51, 51, 1);
  font-size: 0.24rem;
}
.btnBox {
  display: flex;
  justify-content: space-around;
  padding-top: 0.48rem;
}
.btnBox > div {
  width: 1.6rem;
  height: 0.52rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 0.52rem;
  font-size: 0.24rem;
}
.btnBox > div:nth-of-type(1) {
  background: linear-gradient(
    180deg,
    rgba(217, 217, 217, 1),
    rgba(207, 207, 207, 1)
  );

  color: #fff;
}
.btnBox > div:nth-of-type(2) {
  background: linear-gradient(
    180deg,
    rgba(115, 200, 255, 1),
    rgba(49, 146, 255, 1)
  );
  color: #fff;
}
</style>


