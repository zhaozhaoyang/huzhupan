// import Vue from 'vue';
import button from './button.vue';
import confirm from './confirm.vue';
import header from './header.vue';
import panel from './panel.vue';
import list from './list.vue';

const install=function(Vue){
    Vue.component("QButton",button);
    Vue.component("QConfirm",confirm);
    Vue.component("QHead",header);
    Vue.component("QPanel",panel);
    Vue.component("QList",list);
}

export default install;