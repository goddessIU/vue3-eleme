
<template>
    <div
        class="shopTotal"
        :style="{ backgroundImage: `url(${bgcImg})` }"
    >
        <!-- 本页面为店铺首页 -->
        <ShopHeader :shopId="route.query.shopId" />
        <div class="options">
            <div class="options__items">
                <span class="options__option--isChosed displayInlineBlock">商品</span>
            </div>
            <div class="options__evaluations">
                <span class>评价</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import ShopHeader from '../../components/ShopHeader.vue';
import { useStore } from '../../store';
import { getShopInfo } from '../../service/getData';
import { ref } from 'vue';
const route = useRoute()
const store = useStore()

//得到当前商店的全部信息
let bgcImg = ref('')
const useGetShopInfo = async () => {
    try {
        let data = await getShopInfo()
        store.storeInfoData = data
        store.currentStoreData = store.storesData[store.currentShopIndex] || {}
        bgcImg.value = `https://elm.cangdu.org/img/${store.currentStoreData.image_path}`
    } catch (err) {
        console.error(err)
    }
}
useGetShopInfo();
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
@import "../../style/config.scss";

.shopTotal {
    background: linear-gradient(blue, pink);
    // background: url(../assets/images/dinner.png) no-repeat center;
    background-size: cover;
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
                padding-bottom: 0.1875rem;
            }
        }
        .options__option--isChosed {
            color: $commonColor;
            border-bottom: 0.1875rem solid $commonColor;
        }
    }
}
</style>