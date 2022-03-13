<template>
    <div class="order">
        <common-header class="order__head">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title @click="goBack">{{ headTitle }}</template>
            <template #application>
                <span v-html="headApp" @click="goLogin"></span>
            </template>
        </common-header>
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.order {
    background-color: $commonGray;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
    .order__head {
        position: sticky;
        top: 0;
    }
}
</style>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import router from '../../router';
const route = useRoute()
const headTitle = computed(() => {
    if (route.path.includes('orderpage')) {
        return '确认订单'
    } else if (route.path.includes('remark')) {
        return '订单备注'
    } else if (route.path.includes('invoice')) {
        return '选择发票抬头'
    }
})
const goLogin = () => {
    if (route.path === '/order/orderpage') {
        router.push({
            name: 'login'
        })
    }

}
const headApp = computed(() => {
    if (route.path.includes('orderpage')) {
        return `<span>登录|注册</span>`
    } else {
        return ''
    }
})
</script>