<template>
  <router-view></router-view>
  <HomeFooter />
</template>

<script setup>
import { onMounted } from 'vue';
import { getLocation } from './service/getData'
import HomeFooter from './components/HomeFooter.vue';

//获取地址信息即其他初始化信息
onMounted(() => {
  getLocation()
})
</script>

<style lang="scss">
@import "./style/index.scss";
</style>