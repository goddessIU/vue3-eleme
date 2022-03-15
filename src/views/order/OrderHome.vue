<template>
    <div class="order">
        <common-header class="order__head">
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const headTitle = computed(() => {
    if (route.path.includes('orderhome')) {
        return '订单列表'
    }
})
</script>

<style lang="scss" scoped>
@import '../../style/config.scss';
.order {
    background-color: $commonGray;
    height: 100vh;
}
</style>