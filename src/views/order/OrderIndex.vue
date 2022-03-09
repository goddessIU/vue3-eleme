<template>
    <div class="order">
        <common-header>
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title @click="goBack">确认订单</template>
            <template #application>
                <svg class="icon options__icon" aria-hidden="true">
                    <use xlink:href="#icon-user" />
                </svg>
            </template>
        </common-header>
        <AddAddressBlock />
    </div>
</template>

<style lang="scss" scoped>
@import '../../style/config.scss';
.order {
    background-color: $commonGray;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
}
</style>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import AddAddressBlock from '../../components/AddAddressBlock.vue';
</script>