<template>
    <div>
        <div class="gr_1">
            <div class="gr_2">
                <div class="gr_3"><img :src="message.icon" alt=""></div>
                <div class="gr_4">
                    <span class="gr_5">{{message.nickName}}</span>
                    <em class="gr_6">{{message.phone}}</em>
                </div>
            </div>
            <div class="gr_7">
                <div class="gr_8" v-on:click="$router.push('/zhuanshukefu')"><img src="../../static/images/11.png" alt=""></div>
                <div class="gr_9" @click="$router.push('/zhuanpan')"><span>抽奖次数：{{message.drawsNumber?message.drawsNumber:0}}</span></div>
            </div>
        </div>
        <div>
            <van-cell title="个人信息" is-link to="/gerenmes">
                <img src="../../static/images/g1.png" slot="icon" class="gr_10">
            </van-cell>
            <!-- <van-cell title="诚信值排行" is-link to="/chengxinpaihang">
                <img src="../../static/images/g2.png" slot="icon" class="gr_10">
            </van-cell> -->
            <van-cell title="托管设置" is-link to="/tuoguanset">
                <img src="../../static/images/g3.png" slot="icon" class="gr_10">
            </van-cell>
            <van-cell title="领导人信息" is-link to="/lingdaoren">
                <img src="../../static/images/g4.png" slot="icon" class="gr_10">
            </van-cell>
            <van-cell title="新会员注册" is-link to="/xinvip">
                <img src="../../static/images/g5.png" slot="icon" class="gr_10">
            </van-cell>
            <van-cell title="公告信息" is-link to="/gonggaomes">
                <img src="../../static/images/g6.png" slot="icon" class="gr_10">
            </van-cell>
            <van-cell title="常见问题" is-link to="/wentilist">
                <img src="../../static/images/g6.png" slot="icon" class="gr_10">
            </van-cell>
        </div>
        <!-- <h4 class="gr_11">客服电话:<a :href="'tel:'+kefu" class="gr_12">{{kefu}}</a></h4> -->
        <div class="s_3"></div>
        <q-button text="退出登录" @click="logout"></q-button>
        <div class="s_2"></div>
        <q-button text="切换自己账号" @click="gomy" v-if="istg"></q-button>
        <div class="s_2" v-if="istg"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            icon:"../../static/images/10.png",
            message:"",
            kefu:"XXXXXXXXXX",
            // 是否为托管状态
            istg:false
        }
    },
    created(){
        if(window.sessionStorage.getItem("olduid")){
            this.istg=true
        }
        this.showLoading().$post({
            cmd:"getUserInfo",
		    uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
        }).then((res)=>{
            if(res.result==0){
                this.message=res;
                this.$store.commit("setgeren",res)
                this.$toast.clear();
            }else{
                this.showToast(res.resultNote);
            }
            return this.$post({
                cmd:"getHelp",	
                uid:this.$store.state.uid || window.sessionStorage.getItem("uid")
            })
        }).then((res1)=>{
            if(res1.result==0){
                this.kefu=res1.phone
            }else{
                this.showToast(res.resultNote)
            }
        })
    },
    methods:{
        gomy(){
            let olduid=window.sessionStorage.getItem('olduid');
            this.$store.commit("setuid", olduid);
            window.sessionStorage.setItem("uid",olduid);
            window.sessionStorage.setItem("olduid","")
            
            this.$router.push("/index");
        },
        logout(){
            this.$store.commit('setuid',"");
            window.sessionStorage.setItem("uid","")
            this.$router.push("/login")
        }
    }
}
</script>

<style>
.gr_1{display:flex;background-image:url('../../static/images/9.png');background-repeat:no-repeat;background-position: left top;background-size:contain;width:100%;height:2.9rem;padding-top:.6rem;justify-content:space-between;}
.gr_2{display:flex;align-items:center;}
.gr_3{width:1.3rem;height:1.3rem;border-radius:3rem;padding:.2rem;flex:0 0 auto;}
.gr_3 img{width:100%;}
.gr_4{display:flex;flex-direction:column;}
.gr_5{font-size:.34rem;
color:rgba(255,255,255,1);}
.gr_6{background-color:#3678EA;padding:0 .2rem;border-radius: 2rem;font-size:.22rem;
color:rgba(255,255,255,1);margin-top:.3rem;}
.gr_7{display:flex;flex-direction:column;align-items:flex-end;}
.gr_8{width:.42rem;height:.42rem;margin-right:.4rem;}
.gr_8 img{width:.42rem;height:.42rem;}
.gr_9{margin-top:.6rem;min-width:1.9rem;height:.52rem;border-radius:2rem 0 0 2rem;background-color:#ff8454;color:#fff;text-align:center;line-height:.52rem;padding-left:.2rem;}
.gr_10{width:.36rem;height:.36rem;padding:.05rem .1rem 0 .2rem;}
.gr_11{text-align:center;padding-top:.4rem;font-size:.24rem;
color:rgba(51,51,51,1);}
.gr_12{color:#3377FF;}
</style>


