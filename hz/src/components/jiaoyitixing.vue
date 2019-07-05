<template>
    <div>
        <q-head></q-head>
        <div class="s_5"></div>
        <div class="jytx_1">
            <div class="jytx_2">
                <span>官方客服微信号-></span>
                <span>{{mes.weiXin}}</span>
            </div>
            <div class="jytx_2">
                <span>收款人-></span>
                <span>{{mes.userName}}</span>
            </div>
            <div class="jytx_2">
                <span>收款银行-></span>
                <span>{{mes.bankName}}</span>
            </div>
            <div class="jytx_2">
                <span>收款账号-></span>
                <span>{{mes.bankNumber}}</span>
            </div>
        </div>
        <div class="jytx_3">
            <img :src="mes.image" alt="" class="jytx_4">
            <span class="jytx_5">微信收款码</span>
        </div>
        <div class="jytx_6">
            <h4 class="jytx_7">打款时请备注账号，打款用途</h4>
            <h4 class="jytx_7">打款后如长时间未到账，请及时与客服联系</h4>
        </div>
        <q-button text="完成" @click="$router.go(-1)"></q-button>
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
        this.showLoading().$post({
            cmd:"getPlatMessage"
        }).then(res=>{
            // console.log(res)
            if(res.result==0){
                this.mes=res;
                this.$toast.clear();
            }else{
                this.showLoading(res.resultNote);
            }
        })
    }
}
</script>


<style scoped>
.jytx_1{padding:.4rem;}
.jytx_2{display:flex;justify-content:space-between;font-size:.28rem;
color:rgba(111,111,111,1);line-height:.8rem;}
.jytx_3{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:.6rem 0;}
.jytx_4{width:2.6rem;height:2.6rem;background-color:#E9E9E9;}
.jytx_5{font-size:.28rem;
color:rgba(111,111,111,1);padding-top:.3rem;}
.jytx_7{text-align:center;font-size:.28rem;
color:rgba(111,111,111,1);line-height:.5rem;}
.jytx_6{padding-bottom:.5rem;}
</style>

