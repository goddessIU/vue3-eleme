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
        <div class="request__label" v-if="false">
            <slot name="label">
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
        width: 20vw;
        height: 3rem;
        line-height: 3rem;
        font-weight: bold;
        padding-left: .3125rem;
        box-sizing: border-box;
    }
    .request__input {
        width: 80vw;
    }
    .request__label {
        width: 80vw;
    }
}
</style>

<script setup></script>