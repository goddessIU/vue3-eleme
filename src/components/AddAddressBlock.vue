<template>
    <!-- 增加收获地址方块 -->
    <div class="addAddress" @click="goChooseAddress">
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
    <tip-window :show="show">
        <template #content>请先登录</template>
    </tip-window>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import TipWindow from './TipWindow.vue';
import { ref } from 'vue';
const router = useRouter()
const store = useStore()
//判断是否可以去添加地址
let show = ref(false)
//前往填写地址的页面
const goChooseAddress = () => {
    if (!store.userData) {
        show.value = true
        return;
    }
    router.push({
        name: 'chooseAddress'
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