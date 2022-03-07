<template>
    <div class="searchPage">
        <common-header>
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-left" />
                </svg>
            </template>
            <template #title>
                选择收获地址
            </template>
            <template #application>
                新增地址
            </template>
        </common-header>
        <div class="searchAddress">
            <div class="searchAddress__options">
                北京
                <svg class="icon headTop__address__down" aria-hidden="true">
                    <use xlink:href="#icon-down" />
                </svg>
            </div>
            <div class="searchAddress__input">
                <input type="text" placeholder="请输入地址" />
            </div>
        </div>
        <div class="currentAddress">
            <div class="currentAddress__title">当前地址</div>
            <div class="currentAddress__content">
                <div class="currentAddress__title--left">北京丰台科技园</div>
                <div class="currentAddress__title--right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-Target" />
                    </svg>
                    重新定位
                </div>
            </div>
        </div>
        <div class="harvestAddress">
            <div class="harvestAddress__title">售后地址</div>
            <div class="harvestAddress__content">
                <span class="harvestAddress__content__name">george</span>
                <span class="harvestAddress__content__sex">先生</span>
                <span class="harvestAddress__content__phone">110</span>
                <span class="harvestAddress__content__location">北京</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import CommonHeader from '../components/CommonHeader.vue';
</script>

<style lang="scss" scoped>
@import "../style/mixin.scss";
@import "../style/config.scss";
.searchPage {
    background-color: $commonGray;
    height: 100vh;
    width: 100vw;
    .searchAddress {
        width: 100vw;
        height: 3rem;
        background-color: #fff;
        @include displayFlex();
        .searchAddress__options {
            height: 3rem;
            line-height: 3rem;
            width: 30vw;
            text-align: center;
            font-size: 1rem;
            color: $fontColor;
        }
        .searchAddress__input {
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            width: 70vw;
            box-sizing: border-box;
            input {
                width: 80%;
                height: 2rem;
                outline: none;
                background-color: $commonGray;
                border: none;
                padding-left: 0.625rem;
            }
        }
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
            background-color: #fff;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            font-weight: bold;
            font-size: 1rem;
            .currentAddress__title--right {
                color: $commonColor;
                font-weight: normal;
                font-size: 1rem;
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
            background-color: #fff;
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