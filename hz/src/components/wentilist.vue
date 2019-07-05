<template>
    <div>
        <q-head text="常见问题"></q-head>
        <div class="s_6"></div>
        <van-cell :title="item.question" is-link v-for="(item,index) in ask" v-bind:key="index" :to="'/wentiask/'+encodeURIComponent(item.url)">
            <img src="../../static/images/7.png" slot="icon" class="wtl_1">
        </van-cell>
        <!-- <van-cell title="如何举报？怎样正确使用举报功能？" is-link>
            <img src="../../static/images/7.png" slot="icon" class="wtl_1">
        </van-cell>
        <van-cell title="如何举报？怎样正确使用举报功能？" is-link>
            <img src="../../static/images/7.png" slot="icon" class="wtl_1">
        </van-cell>
        <van-cell title="如何举报？怎样正确使用举报功能？" is-link>
            <img src="../../static/images/7.png" slot="icon" class="wtl_1">
        </van-cell> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            ask:""
        }
    },
    created(){
        this.showLoading().$post({
            cmd:"getQuestion"
        }).then((res)=>{
            if(res.result==0){
                this.ask=res.dataList;
                // this.$store.commit("setask",res.dataList);
                this.$toast.clear();
            }else{
                this.showToast(res.resultNote)
            }
        })
    }
}
</script>

<style scoped>
.wtl_1{
    width:.32rem;
height:.32rem;
padding-top:.1rem;
padding-right:.2rem;
}
</style>


