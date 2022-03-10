<template>
    <div class="order">
        <common-header class="order__head">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>

            <template #title @click="goBack">确认订单</template>
            <template #application>
                <svg class="icon options__icon" aria-hidden="true">
                    <use xlink:href="#icon-user" />
                </svg>
            </template>
        </common-header>
        <AddAddressBlock />
        <div class="order__time">
            <div class="order__time__title">送达时间</div>
            <div class="order__time__content">
                <div class="time__content__firstLine">
                    <span class="time__content__rule">尽快送达</span> |
                    <span class="time__content__prediction">预计13:00</span>
                </div>
                <div class="time__content__secondLine">
                    <span class="time__content__company">蜂鸟专送</span>
                </div>
            </div>
        </div>
        <div class="order__pay">
            <div class="order__pay__way">
                <h3>支付方式</h3>
                <span>
                    <span>在线支付</span>
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-right" />
                        </svg>
                    </span>
                </span>
            </div>
            <div class="order__pay__redBag">
                <h3>红包</h3>
                <span>暂时只支持在饿了么APP中支付</span>
            </div>
        </div>
        <div class="order__detail">
            <div class="order__detail__storeInfo">
                <span>nb</span>
            </div>
            <div class="order__detail__bars">
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">巧克力</span>
                    <span class="order__detail__num">x2</span>
                    <span class="order__detail__money">￥80</span>
                </div>
            </div>
            <div class="order__detail__fee">
                <div class="order__detail__bar">
                    <span class="order__detail__name">配送费</span>
                    <span class="order__detail__money">￥80</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">餐盒</span>
                    <span class="order__detail__money">￥60</span>
                </div>
            </div>
            <div class="order__detail__totalFee">
                <div class="order__detail__bar">
                    <span class="order__detail__needpay">订单 ￥2902</span>
                    <span class="order__detail__unpay">待支付 ￥2902</span>
                </div>
            </div>
            <div class="order__detail__requests">
                <div class="order__detail__bar">
                    <span class="order__detail__name">订单备注</span>
                    <span class="order__detail__intro">不要啦 》</span>
                </div>
                <div class="order__detail__bar">
                    <span class="order__detail__name">不需要开发票</span>
                    <span class="order__detail__intro">不要啦 》</span>
                </div>
            </div>
        </div>
        <div class="orderFoot">
            <div class="orderFoot__left">待支付￥2902</div>
            <button class="orderFoot__right">确认下单</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.order {
    background-color: $commonGray;
    height: 100vh;
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
    .order__head {
        position: sticky;
        top: 0;
    }
    .order__time {
        width: 100vw;
        height: 8rem;
        background-color: #fff;
        margin-top: 1rem;
        @include displayFlex();
        padding: 0 0.8rem;
        border-left: 0.1875rem solid $commonColor;
        .order__time__title {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .order__time__content {
            @include displayFlex(end, center, column);
            .time__content__firstLine {
                color: $commonColor;
                font-size: 1rem;
            }
            .time__content__secondLine {
                .time__content__company {
                    margin-top: 0.3rem;
                    display: block;
                    background-color: $commonColor;
                    height: 2rem;
                    line-height: 2rem;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                }
            }
        }
    }
    .order__pay {
        background-color: #fff;
        margin-top: 1.5rem;
        height: 8rem;
        width: 100vw;
        padding: 0 1rem;
        .order__pay__way {
            height: 5rem;
            line-height: 5rem;
            font-weight: bold;
            @include displayFlex();
        }
        .order__pay__redBag {
            height: 3rem;
            line-height: 3rem;
            font-size: 1rem;
            @include displayFlex();
        }
    }
    .order__detail {
        background-color: #fff;
        margin-top: 2rem;
        padding: 0 0.3rem;
        .order__detail__storeInfo {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.2rem;
            border-bottom: 0.0625rem solid #a79e9e21;
        }
        .order__detail__bars {
            border-bottom: 0.125rem solid #a79e9e21;
            .order__detail__bar {
                @include detailBar();
                .order__detail__name {
                    width: 60vw;
                }
                .order__detail__num {
                    width: 15vw;
                    text-align: center;
                    color: $priceColor;
                }
                .order__detail__money {
                    width: 25vw;
                    text-align: center;
                }
            }
        }
        .order__detail__fee {
            .order__detail__bar {
                @include detailBar();
                .order__detail__name {
                    width: 60vw;
                }
                .order__detail__money {
                    width: 25vw;
                    text-align: center;
                }
            }
        }
    }
    .order__detail__totalFee {
        margin-top: 0.3rem;
        box-sizing: border-box;

        .order__detail__bar {
            @include detailBar();
            .order__detail__needpay {
                padding-left: 1vw;
            }
            .order__detail__unpay {
                padding-right: 3vw;
                text-align: center;
                color: $priceColor;
            }
        }
    }
    .order__detail__requests {
        margin-bottom: 5rem;
        .order__detail__bar {
            @include detailBar();
            padding: 0 0.5rem;
        }
    }
    .orderFoot {
        height: 3rem;
        width: 100vw;
        background-color: black;
        position: fixed;
        bottom: 0;
        @include displayFlex();
        line-height: 3rem;
        .orderFoot__left {
            color: #fff;
            width: 70vw;
            padding-left: 0.5rem;
        }
        .orderFoot__right {
            @include button();
        }
    }
}
</style>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import AddAddressBlock from '../../components/AddAddressBlock.vue';
</script>