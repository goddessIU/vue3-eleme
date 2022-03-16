<template>
    <!-- 地址页面 -->
    <div class="searchPage">
        <common-header class="stickyHeader" :class="{ 'sticky': isSticky }">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title @click="goBack">选择收获地址</template>
        </common-header>
        <search-address :isSticky="isSticky"></search-address>
        <div class="currentAddress">
            <div class="currentAddress__title">当前地址</div>
            <div class="currentAddress__content">
                <div
                    class="currentAddress__title--left"
                    @click="goIndex"
                >{{ store.addressData.address }}</div>
                <div class="currentAddress__title--right" @click="reAddress">
                    <svg class="icon" :class="{ ' icon--rotate': isReaddress }">
                        <use xlink:href="#icon-Target" />
                    </svg>
                    重新定位
                </div>
            </div>
        </div>
        <!-- 需要得到用户信息，即登录才可以继续 -->
        <!-- <div class="harvestAddress">
            <div class="harvestAddress__title">售后地址</div>
            <div class="harvestAddress__content">
                <span class="harvestAddress__content__name">george</span>
                <span class="harvestAddress__content__sex">先生</span>
                <span class="harvestAddress__content__phone">110</span>
                <span class="harvestAddress__content__location">北京</span>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';
import CommonHeader from '../../components/CommonHeader.vue';
import SearchAddress from './SearchAddress.vue';
import useSticky from '../../hooks/useSticky';
import { getLocation } from '../../service/getData';
const store = useStore()
const router = useRouter()

//重新定位功能
const useReAddress = () => {
    let isReaddress = ref(false)
    const reAddress = async () => {
        try {
            isReaddress.value = true
            const {
                addressData
            } = await getLocation()
            isReaddress.value = false
            return {
                addressData
            }
        } catch (err) {
            console.error(err)
        }
    }
    return {
        isReaddress,
        reAddress
    }
}
const {
    isReaddress,
    reAddress
} = useReAddress()

//路由跳转页面
const changeRoute = () => {
    const goIndex = () => {
        router.push({
            name: 'index'
        })
    }
    return {
        goIndex
    }
}

const {
    goIndex
} = changeRoute()

//吸附功能实现
const {
    useStickyEffect,
    isSticky
} = useSticky(0)
onMounted(() => {
    window.addEventListener('scroll', useStickyEffect)
})
onUnmounted(() => {
    window.removeEventListener('scroll', useStickyEffect)
})

</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
@import "../../style/config.scss";

.searchPage {
    background-color: $commonGray;
    height: 100vh;
    width: 100vw;
    .sticky {
        @include displaySticky();
        z-index: 90;
    }
    .currentAddress {
        .currentAddress__title {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.125rem;
            color: $fontColor;
            padding-left: 0.5rem;
        }
        .currentAddress__content {
            @include displayFlex();
            height: 3rem;
            line-height: 3rem;
            background-color: $bgColor;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            font-weight: bold;
            font-size: 1rem;
            .currentAddress__title--right {
                color: $commonColor;
                font-weight: normal;
                font-size: 1rem;
                .icon--rotate {
                    @include animation-rotate();
                }
            }
        }
    }
    .harvestAddress {
        .harvestAddress__title {
            height: 3rem;
            line-height: 3rem;
            padding: 0.5rem;
            font-size: 1.125rem;
            color: $fontColor;
        }
        .harvestAddress__content {
            // height: 3rem;
            // line-height: 3rem;
            background-color: $bgColor;
            font-size: 1rem;
            font-weight: bold;
            padding-left: 0.5rem;
            .harvestAddress__content__name {
                font-size: 1.25rem;
                margin-right: 0.1875rem;
                height: 3rem;
                line-height: 3rem;
            }
            .harvestAddress__content__sex {
                font-size: 0.75rem;
                font-weight: normal;
                margin-right: 0.625rem;
            }
            .harvestAddress__content__phone {
                font-size: 0.75rem;
                font-weight: normal;
            }
            .harvestAddress__content__location {
                font-size: 0.75rem;
                font-weight: normal;
                display: block;
                height: 1.5rem;
                line-height: 1.5rem;
            }
        }
    }
}
</style>