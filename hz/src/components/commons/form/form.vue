<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
import Emitter from "../mixins/emitter.js"
export default {
    name:"iform",
    mixins:[Emitter],
    provide(){
        return{
            form:this
        }
    },
    props:{
        model:{
            type:Object
        },
        rules:{
            type:Object
        }
    },
    data(){
        return{
            fields:[]
        }
    },
    mounted(){

    },
    created(){
        this.$on("on-form-item-add",(field)=>{
            if(field) this.fields.push(field)
        })

        this.$on("on-from-item-remove",(field)=>{
            if(field.prop) this.fields.splice(this.fields.indexOf(field),1);
        })
    }
}
</script>

