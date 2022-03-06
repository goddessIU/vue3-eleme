<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import getLocation from './utils/getLocation'

onMounted(() => {
  getLocation()
})


</script>

<style lang="scss">
@import "./style/index.scss";
</style>