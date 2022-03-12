<template>
    <common-header>
        <template #icon>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-left" />
            </svg>
        </template>

        <template #title @click="goBack">{{ title }}</template>
    </common-header>
    <div class="view">
        <router-view></router-view>
    </div>
</template>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute()
let title = ref('')
console.log(route.path)
if (route.path.includes('userpage')) {
    title.value = '我的'
}
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
.view {
    background-color: $commonGray;
    height: 100vh;
}
</style>