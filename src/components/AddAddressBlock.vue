<template>
    <!-- 增加收获地址方块 -->
    <div class="addAddress" @click="goFillAddress">
        <div class="addAddress__icon">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-address" />
            </svg>
        </div>

        <div class="addAddress__content">请添加一个收获地址</div>
        <div class="addAddress__arrow">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
//前往填写地址的页面
const goFillAddress = () => {
    router.push({
        name: 'fillAddress'
    })
}
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
.addAddress {
    width: 100vw;
    height: 5rem;
    background-color: #fff;
    @include displayFlex();
    padding: 0 0.5rem;
    .addAddress__icon {
        font-size: 2rem;
    }
    .addAddress__content {
        font-size: 1.2rem;
    }
}
</style>