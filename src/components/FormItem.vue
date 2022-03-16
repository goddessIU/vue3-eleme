<template>
    <!-- 本页面为表单页面还没有完成 -->
    <div class="request">
        <div class="request__name">
            <slot name="name"></slot>
        </div>
        <div class="request__input" v-if="true">
            <slot name="input">
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixin.scss';
@import '../style/config.scss';
.request {
    @include displayFlex();
    box-shadow: 0 0 2px #e5e6eb;
    background-color: $bgColor;
    .request__name {
        width: 30vw;
        font-size: 0.8rem;
        height: 3rem;
        line-height: 3rem;
        font-weight: bold;
        padding-left: .3125rem;
        box-sizing: border-box;
    }
    .request__input {
        width: 70vw;
    }
}
</style>

<script setup></script>