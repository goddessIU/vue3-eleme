<template>
    <!-- 首页头部 -->
    <div class="head">
        <div class="headTop">
            <div class="headTop__address" @click="toAddress">
                <svg class="icon headTop__address__icon" aria-hidden="true">
                    <use xlink:href="#icon-address" />
                </svg>
                <div class="headTop__address__text">{{ store.addressData.address }}</div>
                <svg class="icon headTop__address__down" aria-hidden="true">
                    <use xlink:href="#icon-down" />
                </svg>
            </div>
            <div class="headTop__application">
                <div
                    class="headTop__application__signup"
                    @click="toSignUp"
                    v-if="!store.userData"
                >登录|注册</div>
                <div class="headTop__application__signup" @click="goUser" v-else>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="headSearch" :class="{ 'sticky': isSticky }">
            <div class="headSearch__brand">
                欢迎来到饿了么
            </div>
            
            <!-- <input type="text" class="headSearch__input" placeholder="输入商家名称" />
            <button class="headSearch__button">搜索</button> -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '../store/index'
import { useRouter } from 'vue-router';
import useSticky from '../hooks/useSticky.js'

const store = useStore()
//设置吸附功能
const { useStickyEffect, isSticky } = useSticky('.headTop');

onMounted(() => {
    window.addEventListener('scroll', useStickyEffect)
})
onUnmounted(() => {
    window.removeEventListener('scroll', useStickyEffect)
})


// 相关路由跳转
const useRouterEffect = () => {
    const router = useRouter()
    const toAddress = () => {
        router.push({
            name: 'address'
        })
    }
    const toSignUp = () => {
        router.push({
            name: 'signup'
        })
    }
    const goUser = () => {
        router.push({
            name: 'user'
        })
    }
    return {
        goUser,
        toSignUp,
        toAddress,
        router
    }
}
const {
    goUser,
    toSignUp,
    toAddress,
    router
} = useRouterEffect()

</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/mixin.scss";
.head {
    background-color: $commonColor;
    // padding: 0 0.8rem;
    max-width: 100vw;
    box-sizing: border-box;
    overflow-x: hidden;
    .headTop {
        @include displayFlex(center, space-between);
        .headTop__address {
            color: #fff;
            // width: 60vw;
            height: 2rem;
            font-size: 1.25rem;
            line-height: 2rem;
            font-weight: bold;
            @include displayFlex();

            .headTop__address__icon {
                padding-top: 0.2rem;
                font-size: 1.5rem;
            }
            .headTop__address__text {
                @include ellipsis();
                max-width: 45vw;
            }
            .headTop__address__down {
                padding-top: 0.2rem;
                font-size: 1.5rem;
                color: #fff;
            }
        }
        .headTop__application {
            width: 20vw;
            min-width: 5rem;
            @include displayFlex(center, space-around);
            .headTop__shopCart {
                font-size: 1.25rem;
            }
            .headTop__message {
                font-size: 1.25rem;
            }
            .headTop__application__signup {
                font-size: 1rem;
                color: #fff;
            }
        }
    }

    .headSearch {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        width: 100vw;
        display: flex;

        .headSearch__input {
            box-sizing: border-box;
            width: 80vw;
            outline: none;
            border: 0.0625rem solid $commonColor;
            padding: 0.3125rem 0 0.3125rem 1.25rem;
        }
        .headSearch__button {
            width: 20vw;
            outline: none;
            border: none;
            background-color: $commonColor;
        }
        .headSearch__brand {
            color: #fff;
            background-color: $commonColor;
            width: 100vw;
        }
    }

    .sticky {
        @include displaySticky();
    }
}
</style>