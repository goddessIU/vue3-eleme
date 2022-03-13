<template>
    <!-- 首页店铺部分 -->
    <div class="recommend">
        <h1 class="recommend__title">——推荐商家——</h1>
        <div class="recommend__options">
            <div class="recommend__sort">
                综合排序
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sort-down" />
                </svg>
            </div>
            <div class="recommend__filter">
                筛选
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-filter" />
                </svg>
            </div>
        </div>
        <div class="recommend__stores" v-if="store?.storesData?.status !== 0">
            <Store v-for="(storeData, index) in store.storesData" :key="index" :store-data="storeData"
            :index="index"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixin.scss';
.recommend {
    margin-top: 10vw;
    margin-bottom: 5rem;
    .recommend__title {
        font-size: 1.125rem;
        text-align: center;
        font-weight: bold;
    }
    .recommend__options {
        @include displayFlex(center, center);
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        .recommend__sort {
            width: 80vw;
        }
        .recommend__filter {
            width: 20vw;
        }
    }
    .recommend__stores {
        overflow: hidden;
        overflow-y: scroll;
    }
}
</style>

<script setup>
import Store from './Store.vue';
import { useStore } from '../store';

const store = useStore()

// import useSticky from '../hooks/useSticky';
// import { onMounted, onUnmounted } from 'vue';

// const { useStickyEffect, isSticky } = useSticky('')

// onMounted(() => {
//     window.addEventListener('scroll', useStickyEffect)
// })

// onUnmounted(() => {
//     window.removeEventListener('scroll', useStickyEffect)
// })
</script>