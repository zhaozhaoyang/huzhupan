import Vue from 'vue';
import { Toast } from 'vant';

export default{
    utils(){
        Vue.prototype.pr = function (path) {
            this.$router.push(path);
        },
        Vue.prototype.showLoading=function(mes="加载中..."){
            Toast.loading({
                mask: true,
                message: mes,
                duration:0
              });
            return this;
        },
        Vue.prototype.showToast=function(mes){
            Toast({
                message:mes,
                duration:1500,
                mask:true
            })
            return this;
        }
    }
}