<template>
    <div class="downloadBlock">
        <img class="downloadBlock__img" src="../../assets/images/app.png" alt="">
        <span class="downloadBlock__title">下载饿了么App</span>
        <button class="downloadBlock__button" @click="toDownLoad">下载</button>
    </div>
    <Teleport to="body">
        <jump-window 
        @closeJumpWindow="closeJumpWindowFunc"
        :show="ShowTip">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-exclamation-circle-copy" />
                    </svg>
            </template>
            <template #content>
                ios用户请前往应用商店下载
            </template>
            <template #button>
                确定
            </template>
        </jump-window>
    </Teleport>
</template>

<script setup>
import judgeClient from '../../utils/judgeClient';
import JumpWindow from '../../components/JumpWindow.vue';
import { ref } from 'vue';
let ShowTip = ref(false)
const toDownLoad = () => {
    let res = judgeClient()
    if (res) {
        ShowTip.value = true
    }
}
const closeJumpWindowFunc = () => {
    ShowTip.value = false
}

</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.downloadBlock {
    width: 100vw;
    height: 20rem;
    background-color: #fff;
    padding-top: 3rem;
    text-align: center;
    @include displayFlex(center, start, column);
    .downloadBlock__img {
        width: 10rem;
        height: 10rem;
        border-radius: 3rem;
        margin-bottom: 1rem;
    }
    .downloadBlock__title {
        font-size: 1.2rem;
    }
    .downloadBlock__button {
        @include button();
        margin-top: 1.2rem;
        width: 80vw;
        border-radius: 0.3rem;
    }
}
</style>