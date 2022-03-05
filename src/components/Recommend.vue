<template>
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
        <div class="recommend__stores"></div>
        <Store />
        <Store />
        <Store />
        <Store />
        <Store />
        <Store />
        <Store />
    </div>
</template>

<style lang="scss" scoped>
.recommend {
    margin-top: 10vw;
    overflow: hidden;
    overflow-y: scroll;
    .recommend__title {
        font-size: 1.125rem;
        text-align: center;
        font-weight: bold;
    }
    .recommend__options {
        display: flex;
        align-items: center;
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
}
</style>

<script setup>
import Store from './Store.vue';
</script>