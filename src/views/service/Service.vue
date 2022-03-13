<template>
    <div class="service">
        <common-header class="service__head">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title>{{ headTitle }}</template>
        </common-header>
        <router-view></router-view>
    </div>
</template>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import { ref } from 'vue'
let headTitle = ref('客服中心')
</script>

<style lang="scss" scoped>
@import '../../style/config.scss';
.service {
    width: 100vw;
    height: 100vh;
    background-color: $commonGray;
}
</style>