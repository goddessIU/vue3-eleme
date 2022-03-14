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
                <span @click="goLogin" v-if="!store.userData">{{headApp}}</span>
                <span v-else @click="goUser">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user" />
                    </svg>
                </span>
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
import { useStore } from '../../store';
import router from '../../router';
const route = useRoute()
const store = useStore()
const headTitle = computed(() => {
    if (route.path.includes('orderpage')) {
        return '确认订单'
    } else if (route.path.includes('remark')) {
        return '订单备注'
    } else if (route.path.includes('invoice')) {
        return '选择发票抬头'
    } else if (route.path.includes('fillAddress')) {
        return '编辑地址'
    } else if (route.path.includes('chooseAddress')) {
        return '选择地址'
    } else if (route.path.includes('searchAddress')) {
        return '搜索地址'
    }
})
const goLogin = () => {
    if (route.path === '/order/orderpage') {
        router.push({
            name: 'login'
        })
    }
}
const goUser = () => {
    if (route.path === '/order/orderpage') {
        router.push({
            name: 'user'
        })
    }
}
</script>