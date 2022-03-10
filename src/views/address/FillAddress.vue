<template>
    <common-header class="stickyHeader" :class="{ 'sticky': isSticky }" :func="addAddress">
        <template #icon>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-left" />
            </svg>
        </template>

        <template #title @click="goBack">选择地址</template>
    </common-header>
</template>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
</script>