<template>
    <div class="head">
        <div class="headTop">
            <div class="headTop__address">
                <svg class="icon headTop__address__icon" aria-hidden="true">
                    <use xlink:href="#icon-address" />
                </svg>
                北京丰台科技园
            </div>
            <div class="headTop__application">
                <div class="headTop__shopCart">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shop-cart-" />
                    </svg>
                </div>
                <div class="headTop__message">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiaoxi" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="headSearch" :class="{ 'sticky': isSticky }">
            <input type="text" class="headSearch__input" placeholder="输入商家名称" />
            <button class="headSearch__button">搜索</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import useSticky from '../hooks/useSticky.js'

const { useStickyEffect, isSticky } = useSticky('.headTop');

onMounted(() => {
    window.addEventListener('scroll', useStickyEffect)
})
onUnmounted(() => {
    window.removeEventListener('scroll', useStickyEffect)
})



</script>

<style lang="scss" scoped>
@import '../style/config.scss';
@import '../style/mixin.scss';
.head {
    background-color: $commonColor;
    .headTop {
        @include displayFlex(center, space-between);
        .headTop__address {
            width: 60vw;
            height: 2rem;
            font-size: 1.25rem;
            line-height: 2rem;
            font-weight: bold;
            .headTop__address__icon {
                padding-top: 0.2rem;
                font-size: 1.5rem;
            }
        }
        .headTop__application {
            width: 20vw;
            @include displayFlex(center, space-around);
            .headTop__shopCart {
                font-size: 1.25rem;
            }
            .headTop__message {
                font-size: 1.25rem;
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
    }

    .sticky {
        @include displaySticky();
    }
}
</style>