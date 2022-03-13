<template>
    <div class="shopHeader">
        <div class="shopHeader__logo">
            <img src="../assets/images/daigou.png" />
        </div>
        <div class="shopHeader__intro">
            <div class="shopHeader__title">{{ storeCurrentData.name }}</div>
            <!-- <div class="shopHeader__tip">{{storeCurrentData.}}</div> -->
            <div class="shopHeader__annoucement">公告：{{ storeCurrentData.promotion_info }}</div>
        </div>
        <div class="shopHeader__icon" @click="goBack">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right" />
            </svg>
        </div>
        <!-- <div class="shopHeader_activities"></div> -->
    </div>
</template>

<style lang="scss" scoped>
@import "../style/mixin.scss";
@import "../style/config.scss";
.shopHeader {
    height: 6rem;
    background: linear-gradient(blue, pink);;
    // background: url(../assets/images/dinner.png) no-repeat center;
    background-size: contain;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    @include displayFlex(center, start);
    .shopHeader__logo {
        width: 5rem;
        height: 5rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .shopHeader__intro {
        margin-left: 2rem;
        height: 5rem;
        color: #fff;
        .shopHeader__title {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .shopHeader__tip {
            margin-top: 0.5rem;
            font-size: 0.875rem;
        }
        .shopHeader__annoucement {
            margin-top: 0.5rem;
            font-size: 0.875rem;
        }
    }
    .shopHeader__icon {
        height:5rem;
        line-height: 5rem;
        font-size: 3rem;
        color: #fff;
    }
    .shopHeader_activities {
    }
}
</style>

<script setup>
import { useStore } from '../store';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const storeCurrentData = computed(() => {
    return store.currentStoreData
})

const goBack = () => {
    router.back();
}
// watch(
//     () => store.storesData[props.shopId],
//     (newValue) => {
//         store.currentStoreData = newValue || {}
//         console.log(store.currentStoreData)
//     }
// )
</script>