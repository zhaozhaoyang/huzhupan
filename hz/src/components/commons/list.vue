<template>
  <div>
    <div
      class="list_1"
      v-for="(item,index) in list"
      v-bind:key="index"
      :style="{backgroundImage:'url('+setImg(item.type)+')'}"
    >
      <div class="list_2">
        <h4 class="list_4">
          <span>{{item.type==1?"买入申请":"卖出申请"}}</span> &nbsp;&nbsp;
          <span v-if="item.type==1" class="list_9">第{{item.number}}轮</span>
        </h4>
        <span class="list_5" style="display:block;width:3rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">参与者：{{item.nickName}}</span>
        <span class="list_6">
          状态：{{item.status==1?'待匹配':item.status==2?'部分完成':'已完成'}}&nbsp;
          <em class="list_3" v-if="item.id!=='' && (item.status==2 || item.status==3)" v-on:click="$router.push('/ruhechu/'+item.id)">点击查看</em>
        </span>
        <span class="list_6">日期:{{item.time}}</span>
      </div>
      <div class="list_2">
        <div :class="['list_7',item.type==1?'list_10':'list_11']">单号：{{item.num}}</div>
        <div class="list_8">金额：{{item.money}}RMB</div>
        <div class="list_8">(数量{{parseInt(item.money/100)}})</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      // imgUrl: "../../../static/images/12.png",
      data: 1
    };
  },
  methods:{
    setImg(type){
      return type==1?require('../../../static/images/12.png'):require('../../../static/images/13.png')
    }
  },
  computed:{
    imgUrl(){

    }
  },
};
</script>


<style scoped>
.list_1 {
  width: 6.9rem;
  height: 2.6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 0.5rem;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  padding-left: 0.2rem;
}
.list_2 {
  display: flex;
  flex-direction: column;
}
.list_3 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.list_4 {
  font-size: 0.36rem;
  color: rgba(254, 254, 254, 1);
  line-height: 1rem;
}
.list_5 {
  font-size: 0.28rem;
  color: rgba(254, 254, 254, 1);
  line-height: 0.6rem;
}
.list_6 {
  font-size: 0.24rem;
  color: rgba(254, 254, 254, 1);
  line-height: 0.4rem;
}
.list_7 {
  height: 0.44rem;
  line-height: 0.44rem;
  padding: 0 0.2rem;
  border-radius: 0.44rem 0 0 0.44rem;

  font-size: 0.24rem;
  color: rgba(254, 254, 254, 1);
  margin: 0.3rem 0;
}
.list_8 {
  font-size: 0.3rem;
  color: rgba(255, 255, 255, 1);
  line-height: 0.5rem;
  text-align: center;
}
.list_9 {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 1);
}
.list_10 {
  background: linear-gradient(
    90deg,
    rgba(49, 145, 255, 1) 0%,
    rgba(119, 201, 255, 1) 100%
  );
}
.list_11 {
  background: linear-gradient(-90deg, #ffb6a2, #ff6e91);
}
</style>

