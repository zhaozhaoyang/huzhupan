<template>
  <div>
    <q-head></q-head>
    <div class="s_6"></div>
    <div style="width:90%;margin:0 auto;border-left:1px solid #ebedf0;border-right:1px solid #ebedf0;">
      <van-cell-group>
        <van-cell title="我的分享链接(点击复制)" :label="url" @click="save"/>
      </van-cell-group>
      
    </div>
    <input type="text" style="height:0;padding:0;margin:0;border:none;visibility:none;opacity:0;" :value="url" ref="inp" readonly>
    <div class="s_2"></div>
    <div class="xv_1">
      <q-panel>
        <div class="xv_2">会员信息</div>
        <div class="s_2"></div>
        <van-cell-group>
          <van-field v-model.trim="name" label="姓名(昵称)：" label-align="right" input-align="left"/>
          <van-field v-model.trim="email" label="邮箱(账号)：" label-align="right" input-align="left"/>
          <van-field
            v-model.trim="phone"
            type="number"
            label="手机号："
            label-align="right"
            input-align="left"
            max-length="11"
          />
          <van-field
            v-model.trim="password"
            type="password"
            label="密码："
            label-align="right"
            input-align="left"
          />
          <van-field type="number" readonly v-model.trim="time" label="推荐人：" label-align="right" input-align="left"/>
        </van-cell-group>
        <div class="s_2"></div>
      </q-panel>
    </div>
    <div class="s_4"></div>
    <div class="xv_1">
      <q-panel>
        <div class="xv_2">银行卡信息</div>
        <div class="s_2"></div>
        <van-cell-group>
          <van-field v-model.trim="cardName" label="选择银行卡：" readonly label-align="right" right-icon="arrow-down" @click="showList" input-align="left"/>
          <van-field v-model.trim="card" type="number" label="卡号：" label-align="right" input-align="left"/>
          <van-field
            v-model.trim="cardTitle"
            type="text"
            label="支行名称："
            label-align="right"
            input-align="left"
          />
          <van-field
            v-model.trim="people"
            label="持卡人："
            label-align="right"
            input-align="left"
          />
          <van-field v-model.trim="zfb" label="支付宝：" placeholder="选填，不填写也可以注册" label-align="right" input-align="left"/>
          <van-field v-model.trim="remark" label="备注：" placeholder="选填，不填写也可以注册" label-align="right" input-align="left"/>
        </van-cell-group>
        <div class="s_2"></div>
      </q-panel>
    </div>
    <div class="s_3"></div>
    <div class="xv_3">
        <van-checkbox shape="square" v-model="checked"></van-checkbox>
        <div class="xv_4">我已同意警告，已完全了解风险的存在并愿意承担可能的风险.</div>
    </div>
    <div class="s_3"></div>
    <q-button text="提交注册" @click="sub"></q-button>
    <div class="s_4"></div>
    <div>
      <van-actionsheet v-model="show" :actions="actions" @select="onSelect"/>
    </div>
  </div>
</template>

<script>
import md5 from '../util/md5.js'
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phone: "",
      time: "",
      cardName:"",
      cardId:"",
      card:"",
      cardTitle:"",
      people:"",
      zfb:"",
      remark:"",
      checked:true,
      // 展示下拉
      show: false,
      actions: [],
      url:""
    };
  },
  created(){
    // console.log(this.axios.defaults.baseURL)
    this.time=this.$store.state.geren.phone
    this.url="http://www.cxzjpec.com/#/zhuce/"+this.time
    this.showLoading().$post({
      cmd:"getBankList"
    }).then((res)=>{
      if(res.result==0){
        this.$toast.clear();
        this.actions=res.dataList;
        this.cardName=res.dataList[0].name
        this.cardId=res.dataList[0].id
      }
      return this.$post({
        cmd:"getUserInfo",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      })
    }).then(res=>{
      if(res.result==0){
        this.time=res.phone
        this.url="http://www.cxzjpec.com/#/zhuce/"+res.phone
      }
    })
  },
  methods: {
    save(){
      let inp=this.$refs.inp;
      inp.select();
      inp.setSelectionRange(0,9999);
      if(document.execCommand('copy')){
        document.execCommand("copy")
        this.showToast("复制成功")
      }
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.cardName=item.name;
      this.cardId=item.id
    //   Toast(item.name);
    },
    showList(){
        this.show=true;
    },
    sub(){
      if(!this.name || 
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)|| 
        !this.phone|| 
        !this.password|| 
        !/^[\w_-]{6,16}$/.test(this.password)||
        !/^[0-9]{11}$/.test(this.phone)||
        !/^([1-9]{1})(\d{14}|\d{18})$/.test(this.card)||
        !this.time||
        !/^[0-9]{11}$/.test(this.time)||
        !this.card||
        !this.people){
        this.showToast("请填写完整或者正确信息，方便后面操作")
        return;
      }
      if(!this.checked){
        this.showToast("请勾选同意警告")
        return;
      }
      this.showLoading("正在提交信息").$post({
        cmd:"register",
			  nickName:this.name,
			  email:this.email,//邮箱
			  phone:this.phone,//用户手机号
			  password:this.password,//密码
			  parentPhone:this.time,//推荐人手机号
			  bankId:this.cardId,//银行id
			  bankNumber:this.card,//银行卡号
			  branch:this.cardTitle,		// 支行名字      
			  userName:this.people,		// 用户名字  
			  alipay:this.zfb,		// 支付宝账号     
			  remark:this.remark,		// 备注 
      }).then((res)=>{
        this.$toast.clear();
        if(res.result==0){
          this.showToast("注册成功");
          this.$router.go(-1);
        }else{
          this.showToast(res.resultNote);
        }
        // console.log(res)
      })
    }
  }
};
</script>


<style scoped>
.xv_1 {
  padding: 0 0.5rem;
}
.xv_2 {
  text-align: center;
  font-size: 0.34rem;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
}
.xv_3 {
    width:80%;margin:0 auto;display:flex;
}
.xv_4 {
    width:80%;display:inline-block;font-size:.24rem;color:#666666;margin-left:.2rem;flex:1 1 auto;
}
</style>

