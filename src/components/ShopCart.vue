<template>
    <!-- 底方购物车 -->
    <div class="mask" v-if="isShowCart && sumNum" @click.prevent="closeShowCart"></div>
    <div class="shopCart" @click.prevent="closeShowCart">
        <div class="shopCart__content" v-show="isShowCart" v-if="sumNum">
            <div class="shopCart__content__head">
                <h1>购物车</h1>
                <div @click="clearItems">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-ashbin" />
                    </svg>清空
                </div>
            </div>
            <div
                class="shopCart__content__bar"
                v-for="(itemObj, index) in store.itemsObj[store.currentShopId]"
            >
                <div v-for="(specObj, index) in itemObj">
                    <div class="shopCart__content__middleBar" v-if="specObj.quantity">
                        <div class="shopCart__bar__specName">
                            <div class="shopCart__bar__name">{{ specObj.name }}</div>
                            <div class="shopCart__bar__spec">{{ specObj.specs }}</div>
                        </div>
                        <div class="shopCart__bar__price">￥{{ specObj.price }}</div>
                        <div class="right__content__controlNum">
                            <div
                                class="right__controlNum__subtract"
                                @click="addOrDel({
                                    secondIndex: specObj.secondIndex,
                                    firstIndex: specObj.firstIndex,
                                    operator: '-',
                                    spec: specObj.specIndex
                                })"
                            >
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-Subtract" />
                                </svg>
                            </div>
                            <div class="right__controlNum__showNum">{{ specObj.quantity }}</div>
                            <div
                                class="right__controlNum__add"
                                @click="addOrDel({
                                    secondIndex: specObj.secondIndex,
                                    firstIndex: specObj.firstIndex,
                                    operator: '+',
                                    spec: specObj.specIndex
                                })"
                            >
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-add" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopCart__detail" @click="changeshowCart">
            <div class="shopCart__detail__price">￥{{ sum }}</div>
            <div
                class="shopCart__detail__delivery"
            >配送费￥{{ store.currentStoreData['float_delivery_fee'] }}</div>
            <div class="shopCart__detail__icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shop-cart-1" />
                </svg>
                <span class="shopCart__detail__number">{{ sumNum }}</span>
            </div>
        </div>
        <button class="shopCart__settlement" @click="goOrder" v-if="canDelivery <= 0">去结算</button>
        <button class="shopCart__unsettlement" v-else>还差{{ canDelivery }}</button>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import { del, getAll } from '../config/storage';
import changeNum from '../utils/addItem.js'

const router = useRouter()
const store = useStore()

//跳转到订单页面
const goOrder = () => {
    router.push({
        name: 'order'
    })
}

//是否将购物车完全展示
const useShowCartEffect = () => {
    //切换购物车是否展示详情内容
    let isShowCart = ref(false)
    const changeshowCart = () => {
        console.log('22222222222222222')
        isShowCart.value = !isShowCart.value
    }
    const closeShowCart = (e) => {
        if (e.target.className === 'mask') {
            isShowCart.value = !isShowCart.value
        }
    }
    return {
        isShowCart,
        changeshowCart,
        closeShowCart
    }
}
const {
    isShowCart,
    changeshowCart,
    closeShowCart
} = useShowCartEffect()

//改变购物车数量，现在问题是加减之后购物车自动关闭
const addOrDel = ({
    firstIndex,
    secondIndex,
    operator,
    spec
}) => {
    changeNum({
        secondIndex,
        firstIndex,
        operator,
        spec
    })
    store.itemsObj = getAll('itemsObj')
}

//清空购物车
const clearItems = () => {
    del('itemsObj', store.currentShopId)
    store.itemsObj[store.currentShopId] = {}
    del('shopCart', store.currentShopId)
    store.storageShop[store.currentShopId] = {}
    changeshowCart()
}

//计算属性： 商品总数， 商品总价值, 是否到达配送价格
const computeNum = () => {
    //商品总数
    const sumNum = computed(() => {
        let num = 0
        for (let foodId in store.itemsObj[store.currentShopId]) {
            for (let skuId in store.itemsObj[store.currentShopId][foodId]) {
                num += parseInt(store.itemsObj[store.currentShopId][foodId][skuId].quantity)
            }
        }
        isShowCart.value = false
        return num || 0
    })
    //计算当前总价
    const sum = computed(() => {
        let tempSum = 0
        for (let foodId in store.itemsObj[store.currentShopId]) {
            for (let skuId in store.itemsObj[store.currentShopId][foodId]) {
                tempSum += parseInt(store.itemsObj[store.currentShopId][foodId][skuId].quantity * parseInt(store.itemsObj[store.currentShopId][foodId][skuId].price))
            }
        }
        return tempSum || 0
    })
    //能否配送
    const canDelivery = computed(() => {
        return parseInt(store.currentStoreData['float_minimum_order_amount']) - sum.value
    })
    return {
        sum,
        sumNum,
        canDelivery
    }
}
const {
    sum,
    sumNum,
    canDelivery
} = computeNum()
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
@import "../style/config.scss";
.mask {
    overflow-y: hidden;
    width: 100vw;
    height: calc(100vh - 9rem);
    background-color: $maskColor;
    z-index: 100;
    position: absolute;
}
.shopCart {
    width: 100vw;
    height: 3rem;
    background-color: #2c2929;
    opacity: 1;
    z-index: 200;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    font-weight: bold;
    @include displayFlex();
    .shopCart__content {
        position: absolute;
        width: 100vw;
        bottom: 3rem;
        max-height: 70vh;
        overflow-y: scroll;

        .shopCart__content__head {
            @include displayFlex();
            background-color: #cac8c8;
            width: 100vw;
            height: 2rem;
            padding: 0 0.3rem;
            color: $fontBlackColor;
        }
        .shopCart__content__bar {
            width: 100vw;
            background-color: #fff;
            color: $fontBlackColor;
            .shopCart__content__middleBar {
                height: 3rem;
                @include displayFlex();
                .shopCart__bar__specName {
                    width: 45vw;
                    @include displayFlex(start, start, column);
                    .shopCart__bar__spec {
                        font-size: 0.75rem;
                    }
                }
                .shopCart__bar__price {
                    width: 25vw;
                }
                .right__content__controlNum {
                    @include displayFlex(center, space-around);
                    width: 30vw;
                    height: 2rem;
                    line-height: 2rem;
                    padding-right: 0.5rem;
                    box-sizing: border-box;
                    .right__controlNum__subtract,
                    .right__controlNum__add {
                        color: $commonColor;
                    }
                    .right__controlNum__showNum {
                        max-width: 5rem;
                        overflow: hidden;
                        @include ellipsis();
                    }
                }
            }
        }
    }

    .shopCart__detail {
        padding-left: 6rem;
        .shopCart__detail__price {
            font-size: 1.2rem;
        }
        .shopCart__detail__delivery {
            font-size: 0.5rem;
            padding-top: 0.3rem;
        }
        .shopCart__detail__icon {
            position: absolute;
            top: 0;
            left: 1rem;
            font-size: 2rem;
            transform: translateY(-20%);
            background-color: $commonColor;
            width: 3rem;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            border-radius: 3rem;
            .shopCart__detail__number {
                width: 1.2rem;
                height: 1.2rem;
                position: absolute;
                top: 0;
                background-color: red;
                border-radius: 1.2rem;
                left: 2.2rem;
                color: #fff;
                font-size: 0.6rem;
                text-align: center;
                line-height: 1.2rem;
            }
        }
    }
    .shopCart__settlement,
    .shopCart__unsettlement {
        @include button();
    }
    .shopCart__unsettlement {
        background-color: #504c4c;
    }
    .shopCart__settlement {
        background-color: $butColor;
    }
}
</style>