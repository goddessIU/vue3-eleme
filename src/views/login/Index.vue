<template>
    <common-header class="order__head">
        <template #icon>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-left" />
            </svg>
        </template>

        <template #title @click="goBack">密码登录</template>
    </common-header>
    <div class="view">
        <router-view></router-view>
    </div>
    
</template>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute()
const headTitle = computed(() => {
    if (route.path.includes('login')) {
        return '密码登录'
    } else if (route.path.includes('resetpassword')) {
        return '重置密码'
    }
})
</script>

<style lang="scss" scoped>

@import '../../style/config.scss';
.view {
    background-color: $commonGray;
    height: 100vh;
    padding: 0.2rem 0;
}
</style>