<template>
    <div>
        <q-head text="个人信息"></q-head>
        <div class="s_7"></div>
        <van-row>
            <van-col span="22" offset="1">
            <q-panel>
            <div class="ldr_1">
                <van-cell-group>
                <van-field v-model="mes.nickName" label="会员昵称：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
                <van-field v-model="mes.email" label="会员账户：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
                <van-field :value="mes.flag==1?'已激活':'未激活'" label="状态：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
                <van-field v-model="mes.phone" label="手机号：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
                <van-field v-model="mes.time" label="注册时间：" readonly placeholder="请输入用户名" label-align="right" input-align="left"/>
                </van-cell-group>
            </div>
            </q-panel>
            </van-col>
        </van-row>
        <div class="s_4"></div>
        <q-button text="修改登录密码" @click="$router.push('/xiugaimima')"></q-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mes:""
        }
    },
    created(){
        this.mes=this.$store.state.geren;
    }
}
</script>

<style scoped>
.ldr_1 [class*=van-hairline]::after{
        border:none;
    }
    .grm_1{color:#969799;text-align:justify;overflow:hidden;height:.5rem;}
    .grm_1:after{
        content:"";
        display:inline-block;
        width:100%;height:0;
        overflow:hidden;
    }
    .ldr_1{padding-right:0.4rem;}
</style>


