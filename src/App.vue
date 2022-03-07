<template>
  <router-view></router-view>
  <HomeFooter />
</template>

<script setup>
import { onMounted } from 'vue';
import getLocation from './utils/getLocation'
import HomeFooter from './components/HomeFooter.vue';

onMounted(() => {
  getLocation()
})


</script>

<style lang="scss">
@import "./style/index.scss";
</style>