import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        uid:"",
        kefu:"",
        geren:"",
        ask:"",
    },
    getters:{},
    mutations:{
        setuid(state,newstate){
            state.uid=newstate;
        },
        setkefu(state,newstate){
            state.kefu=newstate;
        },
        setgeren(state,newstate){
            state.geren=newstate;
        },
        setask(state,newstate){
            state.ask=newstate;
        },
        setchouNum(state,newstate){
            state.geren.drawsNumber=newstate;
        }
    },
    actions:{}
})