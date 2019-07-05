<template>
  <div>
    <q-head :noleft="false">
      <div slot="right" class="td_1" @click="$router.push('/zhuanshukefu')">
        <img src="../../static/images/11.png" alt>
      </div>
    </q-head>
    <div class="s_5"></div>
    <van-tabs
      v-model="active"
      color="#3377FF"
      title-active-color="#3377FF"
      title-inactive-color="#333333"
      @change="getNew"
    >
      <!-- 直推 -->
      <van-tab :title="'直推('+list1.length+')'">
        <van-row>
          <van-col span="5">
            <div class="td_2">昵称</div>
          </van-col>
          <van-col span="5">
            <div class="td_2">手机号</div>
          </van-col>
          <van-col span="5">
            <div class="td_2">注册时间</div>
          </van-col>
          <van-col span="2">
            <div class="td_2">奖励</div>
          </van-col>
          <van-col span="3">
            <div class="td_2">状态</div>
          </van-col>
          <van-col span="4">
            <div class="td_2">操作</div>
          </van-col>
        </van-row>
        <div v-if="!list1[0]">
          <div class="s_2"></div>
          <van-row>
            <van-col span="20" offset="2">
              <div style="text-align:center;">暂无</div>
            </van-col>
          </van-row>
        </div>
        <div v-if="list1[0]">
          <van-row v-for="(item,index) in list1" v-bind:key="index">
            <van-col span="5">
              <div class="td_3">{{item.nickName}}</div>
            </van-col>
            <van-col span="5">
              <div class="td_3">{{item.phone}}</div>
            </van-col>
            <van-col span="5">
              <div class="td_3">{{item.time}}</div>
            </van-col>
            <van-col span="2">
              <div class="td_3">{{item.money}}</div>
            </van-col>
            <van-col span="3">
              <div class="td_3">{{item.flag==1?"已激活":"未激活"}}</div>
            </van-col>
            <van-col span="4">
              <div class="td_3">
                <span class="td_4" v-if="item.isHost==1" @click="login(item.id,index,item.isHost)">登录</span>&nbsp;&nbsp;
                <span class="td_4" v-if="item.flag==2 && isjh" @click="jihuo(item.id,index)">激活</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>

      <!-- 团队 -->
      <van-tab :title="'团队('+num+')'">
        <van-search
          v-model="searchVal"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-row>
          <van-col span="2" offset="1">
            <div class="td_2">层级</div>
          </van-col>
          <van-col span="5">
            <div class="td_2">昵称</div>
          </van-col>
          <van-col span="5">
            <div class="td_2">手机号</div>
          </van-col>
          <van-col span="7">
            <div class="td_2">注册时间</div>
          </van-col>
          <van-col span="3">
            <div class="td_2">状态</div>
          </van-col>
        </van-row>
        <div v-if="!list2[0]">
          <div class="s_2"></div>
          <van-row>
            <van-col span="20" offset="2">
              <div style="text-align:center;">暂无</div>
            </van-col>
          </van-row>
        </div>
        <div v-if="list2[0]">
          <div class="a1" v-for="(item1,index1) in list2" v-bind:key="index1">
            <van-row>
              <van-col span="2" offset="1">
                <div class="td_3">
                  <span v-show="!isshow('a'+index1)" v-on:click="listshow('a'+index1)">+1</span>
                  <span v-show="isshow('a'+index1)" v-on:click="listshow('a'+index1)">-1</span>
                </div>
              </van-col>
              <van-col span="5">
                <div class="td_3">{{item1.nickName}}</div>
              </van-col>
              <van-col span="5">
                <div class="td_3" :class="[seachSuc=='a'+index1?'rc':'']">{{item1.phone}}</div>
              </van-col>
              <van-col span="7">
                <div class="td_3">{{item1.time}}</div>
              </van-col>
              <van-col span="3">
                <div class="td_3">{{item1.flag==1?"已激活":"未激活"}}</div>
              </van-col>
            </van-row>
            <div class="b1_list" v-show="isshow('a'+index1)">
              <div class="b1_box" v-for="(item2,index2) in item1.secondChilds" v-bind:key="'a'+index2">
                <van-row>
                  <van-col span="2" offset="2">
                    <div class="td_3">
                      <span v-show="!isshow('a'+index1+'b'+index2)" v-on:click="listshow('a'+index1+'b'+index2)">+2</span>
                      <span v-show="isshow('a'+index1+'b'+index2)" v-on:click="listshow('a'+index1+'b'+index2)">-2</span>
                    </div>
                  </van-col>
                  <van-col span="5">
                    <div class="td_3">{{item2.nickName}}</div>
                  </van-col>
                  <van-col span="4">
                    <div class="td_3" :class="[seachSuc=='a'+index1+'b'+index2?'rc':'']">{{item2.phone}}</div>
                  </van-col>
                  <van-col span="7">
                    <div class="td_3">{{item2.time}}</div>
                  </van-col>
                  <van-col span="3">
                    <div class="td_3">{{item2.flag==1?"已激活":"未激活"}}</div>
                  </van-col>
                </van-row>
                <div class="c3_list" v-show="isshow('a'+index1+'b'+index2)">
                  <van-row v-for="(item3,index3) in item2.threeChilds" v-bind:key="'b'+index3">
                    <van-col span="2" offset="3">
                      <div class="td_3">3</div>
                    </van-col>
                    <van-col span="4">
                      <div class="td_3">{{item3.nickName}}</div>
                    </van-col>
                    <van-col span="5">
                      <div class="td_3" :class="[seachSuc=='a'+index1+'b'+index2+'c'+index3?'rc':'']">{{item3.phone}}</div>
                    </van-col>
                    <van-col span="6">
                      <div class="td_3">{{item3.time}}</div>
                    </van-col>
                    <van-col span="3">
                      <div class="td_3">{{item3.flag==1?"已激活":"未激活"}}</div>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      value: "",
      activeNames: 1,
      //这里放是否展示的索引
      showInd: [],
      list1: [],
      list2: [],
      searchVal:"",
      // 搜索成功的索引值
      seachSuc:"",
      // 是否有诚信券
      isjh:false,
      num:0
    };
  },
  computed: {},
  created() {
    this.showLoading()
      .$post({
        cmd: "getFirstChilds",
        uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
      })
      .then(res => {
        if (res.result == 0) {
          this.list1 = res.dataList?res.dataList:[];
          this.isjh=res.number==0?false:true;
          this.$toast.clear();
        } else {
          this.showToast(res.resultNote);
        }
      });
      this.getNew(1)
  },
  methods: {
    jihuo(id, ind) {
      this.showLoading("正在激活")
        .$post({
          cmd: "activationUser",
          uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
          childId: id
        })
        .then(res => {
          if (res.result == 0) {
            this.list1[ind].flag = 1;
            this.showToast("已激活");
          } else {
            this.showToast(res.resultNote);
          }
        });
    },
    getNew(index) {
      console.log(index);
      if (index == 1 && this.list2.length <= 0) {
        this.showLoading()
          .$post({
            cmd: "myAllChilds",
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
          })
          .then(res => {
            if (res.result == 0) {
              this.list2 = res.dataList?res.dataList:[];
              this.num=res.number;
              this.$toast.clear();
            } else {
              this.showToast(res.resultNote);
            }
          });
      }
    },
    login(id, ind, isHost) {
      if (isHost == 0) {
        this.showToast("该用户暂无托管");
        return;
      }
      this.$store.commit("setuid", id);
      let olduid=window.sessionStorage.getItem('uid');
      window.sessionStorage.setItem("olduid",olduid)
      window.sessionStorage.setItem("uid",id);
      this.$router.push("/index");
    },
    onSearch() {
      if(!/^[0-9]{11}$/.test(this.searchVal)){
        this.showToast("请输入正确的手机号")
        return;
      }
      this.list2.forEach((item,index)=>{
        if(item.phone==this.searchVal){
          if(this.showInd.indexOf("a"+index)==-1){
            this.showInd.push("a"+index);
          }
          this.seachSuc="a"+index;
          return;
        }else{
          item.secondChilds.forEach((item1,index1)=>{
            if(item1.phone==this.searchVal){
              if(this.showInd.indexOf("a"+index)==-1){
                this.showInd.push("a"+index);
              }
              if(this.showInd.indexOf("a"+index+"b"+index1)==-1){
                this.showInd.push("a"+index+"b"+index1);
              }
              this.seachSuc="a"+index+"b"+index1;
              return;
            }else{
              item1.threeChilds.forEach((item2,index2)=>{
                if(item2.phone==this.searchVal){
                  if(this.showInd.indexOf("a"+index)==-1){
                    this.showInd.push("a"+index);
                  }
                  if(this.showInd.indexOf("a"+index+"b"+index1)==-1){
                    this.showInd.push("a"+index+"b"+index1);
                  }
                  this.seachSuc="a"+index+"b"+index1+"c"+index2;
                  return;
                }else{
                  this.showToast("未查找到该手机号")
                }
              })
            }
          })
        }
      })
    },
    isshow(ind) {
      // console.log(this.showInd.indexOf(1))
      return this.showInd.indexOf(ind) != -1;
    },
    listshow(ind) {
      if (this.showInd.indexOf(ind) == -1) {
        this.showInd.push(ind);
      } else {
        this.showInd.splice(this.showInd.indexOf(ind), 1);
      }
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
.td_2 {
  text-align: center;
  padding-top: 0.4rem;
  line-height: 0.3rem;
  font-size: 0.28rem;
  color: rgba(111, 111, 111, 1);
  padding-bottom: 0.1rem;
}
.td_3 {
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: rgba(111, 111, 111, 1);
}
.td_4 {
  color: #3377ff;
}
.rc{
  color:red;
}
</style>

