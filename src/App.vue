<template>
  <router-view></router-view>
  <HomeFooter />
  <vue-simple-spinner size="medium" v-show="store.showLoading" />
</template>

<script setup>
import { onMounted } from 'vue';
import { getLocation } from './service/getData'
import { useStore } from './store';
import HomeFooter from './components/HomeFooter.vue';

const store = useStore()
const useInitialEffect = async () => {
  store.openLoading()
  await getLocation()
  store.closeLoading()
}

//获取地址信息即其他初始化信息
onMounted(() => {
  useInitialEffect()
})

</script>

<style lang="scss">
@import "./style/index.scss";
</style>