<template>
    <div class="payment">
        <common-header>
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title>在线支付</template>
        </common-header>
        <router-view></router-view>
    </div>
</template>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
</script>

<style lang="scss" scoped>
@import '../../style/config.scss';
.payment {
    height: 100vh;
    background-color: $commonGray;
}
</style>