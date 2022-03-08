<template>
    <div class="shopCart">
        <div class="shopCart__detail">
            <div class="shopCart__detail__price">￥160.00</div>
            <div class="shopCart__detail__delivery">配送费￥5</div>
            <div class="shopCart__detail__icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shop-cart-1" />
                </svg>
                <span
                class="shopCart__detail__number">
                    8
                </span>
            </div>
        </div>
        <button class="shopCart__settlement">去结算</button>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
@import "../style/config.scss";
.shopCart {
    width: 100vw;
    height: 3rem;
    background-color: #2c2929;
    opacity: 1;
    z-index: 20;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    font-weight: bold;
    @include displayFlex();

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
                font-size: 0.3rem;
                text-align: center;
                line-height: 1.2rem;
            }
        }
    }
    .shopCart__settlement {
        width: 30vw;
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        background-color: $butColor;
        font-size: 1rem;
        outline: none;
        border: none;
        color: #fff;
        font-weight: bold;
    }
}
</style>