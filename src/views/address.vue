<template>
    <div class="searchPage">
        <CommonHeader />
        <div class="searchAddress">
            <div class="searchAddress__options">
                北京
                <svg class="icon headTop__address__down" aria-hidden="true">
                    <use xlink:href="#icon-down" />
                </svg>
            </div>
            <div class="searchAddress__input">
                <input type="text" placeholder="请输入地址">
            </div>
        </div>
    </div>
</template>

<script setup>
import CommonHeader from '../components/CommonHeader.vue';
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
@import '../style/config.scss';
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
            color: gray;
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
                padding-left: .625rem;
            }
        }
    }
}
</style>