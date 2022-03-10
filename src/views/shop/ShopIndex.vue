
<template>
    <!-- 本页面为店铺首页 -->
    <ShopHeader :shopId="route.query.shopId" />
    <div class="options">
        <div class="options__items">
            <span class="options__option--isChosed displayInlineBlock">商品</span>
        </div>
        <div class="options__evaluations">
            <span class="">评价</span>
        </div>
    </div>
    <router-view></router-view>
</template>

<script setup>
import { useRoute } from 'vue-router';
import instance from '../../config/fetchData';
import ShopHeader from '../../components/ShopHeader.vue';
import { useStore } from '../../store';
const route = useRoute()
const store = useStore()
//得到当前商店的全部信息
instance.get(`/shopping/v2/menu`, {
    params: {
        restaurant_id: route.query.shopId
    }
}).then(data => {
    store.storeInfoData = data
    store.currentStoreData = store.storesData[store.currentShopIndex] || {}
})
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
@import "../../style/config.scss";
.options {
    @include displayFlex();
    height: 3rem;
    background-color: #fff;
    .options__items,
    .options__evaluations {
        width: 50%;
        text-align: center;
        font-size: 1.125rem;
        color: $fontColor;
        .displayInlineBlock {
            display: inline-block;
            padding-bottom: .1875rem;
        }
    }
    .options__option--isChosed {
        color: $commonColor;
        border-bottom: .1875rem solid $commonColor;

    }
}
</style>