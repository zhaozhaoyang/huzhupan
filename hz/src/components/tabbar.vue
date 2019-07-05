<template>
    <div>
        <router-view style="padding-bottom:1.1rem;"></router-view>
        <ul class="tabBox">
            <router-link tag="li" to="/index" class="link" active-class="activelink">
                <span>首页</span>
            </router-link>
            <router-link tag="li" to="/tuandui" class="link" active-class="activelink">
                <span>团队</span>
            </router-link>
            <router-link tag="li" to="/zhanghu" class="link" active-class="activelink">
                <span>账户</span>
            </router-link>
            <router-link tag="li" to="/geren" class="link" active-class="activelink">
                <span>我的</span>
            </router-link>
        </ul>
        
    </div>
</template>

<style scoped type="text/scss" lang="scss">
.tabBox{
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
    height:1.1rem;
    display:flex;
    box-shadow:0px 6px 14px 2px rgba(29,29,29,0.3);
    background:#fff;
    @at-root .link{
        width:25%;
        padding-top:.7rem;
        text-align:center;
        color:#333333;
        background-repeat:no-repeat;
        background-position:center .2rem;
        background-size:25%;
        &:nth-of-type(1){
            background-image:url('../../static/images/i1.png')
        }
        &:nth-of-type(2){
            background-image:url('../../static/images/td1.png')
        }
        &:nth-of-type(3){
            background-image:url('../../static/images/zh1.png')
        }
        &:nth-of-type(4){
            background-image:url('../../static/images/m1.png')
        }
    }
    @at-root .activelink{
        color:#3377FF;
        &:nth-of-type(1){
            background-image:url('../../static/images/i2.png')
        }
        &:nth-of-type(2){
            background-image:url('../../static/images/td2.png')
        }
        &:nth-of-type(3){
            background-image:url('../../static/images/zh2.png')
        }
        &:nth-of-type(4){
            background-image:url('../../static/images/m2.png')
        }
    }
}
</style>

