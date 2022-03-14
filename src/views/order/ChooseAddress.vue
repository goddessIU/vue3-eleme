<template>
    <div class="addressBlock">
        <div class="addressBlock__bar addressBlock__bar--isChosed">
            <span>聚宝源</span>
            <span>111</span>
        </div>
    </div>
    <div class="addressBlock__add" @click="goAddAddress">
        新增收获地址
    </div>
</template>

<style lang="scss" scope>
@import '../../style/mixin.scss';
@import '../../style/config.scss';
.addressBlock {
    width: 100vw;
    background-color: #fff;
    .addressBlock__bar {
        height: 5rem;
        @include displayFlex(start, space-around, column);
    }
    .addressBlock__bar--isChosed {
        background-color: #eaea5b;
    }
}
.addressBlock__add {
    width: 12rem;
    height: 3rem;
    position: absolute;
    background-color: $commonColor;
    bottom: 3rem;
    left: 50vw;
    transform: translateX(-50%);
    text-align: center;
    line-height: 3rem;
    color: #fff;
    font-size: 1.5rem;
}
</style>

<script setup> 
import { useRouter } from 'vue-router';
const router = useRouter()
const goAddAddress = () => {
    router.push({
        name: 'fillAddress'
    })
}
</script>