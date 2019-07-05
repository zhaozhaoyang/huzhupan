// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import install from '@/components/commons/index';
import store from './store/index';
import {post,fetch,patch,put,post1,get} from './util/http';
import utils from './util/index'
import { Toast,Dialog } from 'vant';


//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$post1=post1;
Vue.prototype.$get=get;

Vue.use(Vant);
Vue.use(install);
Vue.use(utils.utils);
Vue.use(VueAxios, axios);
Vue.use(Toast);
Vue.use(Dialog);

Vue.config.productionTip = false;

// 环境区分不同的baseURL
if(process.env.API_HOST=='/api/'){
  axios.defaults.baseURL = '/api'
}else{
  axios.defaults.baseURL = 'https://www.cxzjpec.com/huzhu/api/'
}
// if(process.env.API_HOST=='/api/'){
//   axios.defaults.baseURL = 'http://192.168.3.198:8080/huzhu/api/'
// }else{
//   axios.defaults.baseURL = '/huzhu/api/'
// }

// axios.defaults.baseURL = '/api'

// var store1={
//   debug:true,
//   state:{
//     message:"hello"
//   }
// }



/* eslint-disable no-new */
const vue=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // data:{
  //   privateState: {},
  //   sharedState: store1.state
  // }
})

// 
var eventBus={
  install(Vue,options){
    Vue.prototype.$bus=vue
  }
}

Vue.use(eventBus);
