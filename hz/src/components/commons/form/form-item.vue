<template>
    <div>
        <label v-if="label" for="">{{label}}</label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Emitter from "../mixins/emitter.js"
import AsyncValidator from 'async-validator'
export default {
    name:"iFromItem",
    mixins:[Emitter],
    inject:["form"],
    props:{
        label:{
            type:String,
            default:""
        },
        prop:{
            type:String
        }
    },
    data(){
        return{
            validateState: '',  // 校验状态
            validateMessage: '',  // 校验不通过时的提示信息
        }
    },
    mounted(){
        if(this.prop){
            this.dispatch("iFrom","on-form-item-add",this);
            this.setRules();
        }
    },
    computed:{
        fieldValue(){
            return this.form.model[this.prop]
        }
    },
    methods:{
        getRules(){
           let formRules=this.form.rules;
           formRules=formRules?formRules[this.prop]:[]
           return [].concat(formRules||[]); 
        },
        setRules(){
            this.$on("on-form-blur",this.onFieldBlur);
            this.$on("on-form-change",this.onFieldChange)
        }
    },
    beforeDestroy(){
        this.dispatch("iFrom","on-form-item-remove",this)
    }
}
</script>

