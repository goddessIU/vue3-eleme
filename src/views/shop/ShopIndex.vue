
<template>
    
    <div class="shopTotal" :style="{ backgroundImage: `url(${bgcImg})` }">
        <!-- 本页面为店铺首页 -->
        <ShopHeader :shopId="route.query.shopId" />
        <vue-simple-spinner size="medium" v-show="store.showLoading" />
        <div class="options">
            <div class="options__items">
                <span
                    class="displayInlineBlock"
                    :class="{ 'options__option--isChosed': isChoosed === 0 }"
                    @click="goItems"
                >商品</span>
            </div>
            <div class="options__evaluations">
                <span
                    class
                    @click="goEvaluation"
                    :class="{ 'options__option--isChosed': isChoosed === 1 }"
                >评价</span>
            </div>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../../store';
import ShopHeader from '../../components/ShopHeader.vue';
import { getShopInfo } from '../../service/getData';

const route = useRoute()
const store = useStore()

//获取商店信息以及图片
const useToGetShopInfo = () => {
    //得到当前商店的全部信息
    let bgcImg = ref('')


    const useGetShopInfo = async () => {
        try {
            store.openLoading()

            let data = await getShopInfo()

            store.storeInfoData = data
            store.currentStoreData = store.storesData[store.currentShopIndex] || {}
            bgcImg.value = `https://elm.cangdu.org/img/${store.currentStoreData.image_path}`

            store.closeLoading()
        } catch (err) {
            console.error(err)
        }
    }
    return {
        bgcImg,
        useGetShopInfo
    }
}
const {
    bgcImg,
    useGetShopInfo
} = useToGetShopInfo()
onMounted(() => {
    useGetShopInfo()
})

//路由逻辑
const useRouterEffect = () => {
    let isChoosed = ref(0)
    const router = useRouter()

    //去往评价页面
    const goEvaluation = () => {
        isChoosed.value = 1
        router.push({
            name: 'shopEvaluation'
        })
    }

    //去往商品页面
    const goItems = () => {
        isChoosed.value = 0
        router.push({
            name: 'shopItems'
        })
    }

    return {
        router,
        goEvaluation,
        goItems,
        isChoosed
    }
}
const {
    router,
    goEvaluation,
    goItems,
    isChoosed
} = useRouterEffect()


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
    .view {
        height: 100%;
        background-color: #fff;
    }
}
</style>