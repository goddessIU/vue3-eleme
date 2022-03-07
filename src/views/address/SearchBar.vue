<template>
    <!-- 搜索部分每个搜索结果组件 -->
    <div class="searchInfo__bar" @click="clickBar">
        <h1 class="searchInfo__bar__title" v-html="name"></h1>
        <span class="searchInfo__bar__distance">{{ distance }}km</span>
        <p class="searchInfo__bar__intro" v-html="address"></p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';
import changeSearchColor from '../../utils/changeSearchColor'
import getDistance from '../../utils/getDistance';

//用于得到渲染页面的值,以及路由，store，props
const getValues = () => {
    const props = defineProps(['name', 'address', 'latitude', 'longitude', 'keyword'])
    const store = useStore()
    const router = useRouter()
    const name = computed(() => {
        return changeSearchColor(props.name, props.keyword)
    })
    const address = computed(() => {
        return changeSearchColor(props.address, props.keyword)
    })
    const distance = computed(() => {
        return getDistance(parseFloat(store.addressData.latitude), parseFloat(store.addressData.longitude), parseFloat(props.latitude), parseFloat(props.longitude))
    })
    return {
        name,
        address,
        distance,
        store,
        props,
        router
    }
}

const {
    name,
    address,
    distance
} = getValues()

//用于处理点击搜索结果
const clickBar = () => {
    store.addressData.address = props.name
    router.push({
        name: 'index'
    })
}
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.searchInfo__bar {
    height: 5rem;
    width: 100vw;
    padding: 0 0.3125rem;
    box-sizing: border-box;
    .searchInfo__bar__title {
        font-size: 1.125rem;
        font-weight: 700;
        display: inline-block;
        height: 2rem;
        line-height: 2rem;
    }
    .searchInfo__bar__distance {
        height: 2rem;
        line-height: 2rem;
        font-size: 0.75rem;
        color: $fontBlackColor;
        float: right;
    }
    .searchInfo__bar__intro {
        display: block;
        box-sizing: border-box;
        padding-top: 0.3125rem;
        height: 3rem;
        font-size: 0.75rem;
        color: $fontBlackColor;
    }
}
</style>