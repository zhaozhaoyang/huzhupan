<template>
    <input 
    type="text"
    :value="value"
    @input="handleInput"
    @blut="handleBlur"
    >
</template>

<script>
export default {
    props:{
        value:{
            type:String,
            default:""
        }   
    },
    data(){
        return{
            currentValue:this.value
        }
    },
    methods:{
        handleInput(event){
            const value=event.target.value;
            this.$emit("input",value);
            this.dispatch('iFromItem',"on-form-change",value);
        },
        handleBlur(event){
            this.dispatch('iFromItem',"on-form-blur",event.target.value)
        }
    }
}
</script>

