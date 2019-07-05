<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" type="text/scss" scoped>
    .panel{
        width:100%;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 7px 1px rgba(0, 0, 0, 0.1);
        border-radius:.25rem;
        box-sizing:border-box;
        padding:.04rem .04rem .1rem;
    }
</style>