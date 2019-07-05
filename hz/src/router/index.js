import Vue from 'vue'
import Router from 'vue-router'
import routers from './routerList'

Vue.use(Router)


const router=new Router({
  routes:routers
})

router.beforeEach((to,from,next)=>{
  if(to.name=="zhuanpan"){
    document.documentElement.style.fontSize = ""
  }else{
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 750*100 + 'px'
  }
  next();
})
router.afterEach((to, from) => {
  document.title = to.meta.title;
  window.onscroll="";
})

export default router;
