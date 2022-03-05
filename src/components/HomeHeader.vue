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
        <div class="headSearch">
            <input type="text" class="headSearch__input" placeholder="输入商家名称" />
            <button class="headSearch__button">搜索</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const scrollHead = document.querySelector('.headTop')
    console.log(scrollHead.clientHeight)
})
</script>

<style lang="scss" scoped>
.head {
    background-color: #0085ff;
    .headTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
            display: flex;
            justify-content: space-around;
            align-items: center;
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
        background-color: blue;
        text-align: center;
        width: 100vw;
        display: flex;
        .headSearch__input {
            box-sizing: border-box;
            width: 80vw;
            outline: none;
            border: 0.0625rem solid #12e0f9;
            padding: 0.3125rem 0 0.3125rem 1.25rem;
        }
        .headSearch__button {
            width: 20vw;
            outline: none;
            border: none;
            background-color: #12e0f9;
        }
    }
}
</style>