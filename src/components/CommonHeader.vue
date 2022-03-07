<template>
    <div class="commonHead">
        <div class="commOnHead__icon">
            <slot name="icon">
            </slot>
        </div>
        <div class="commOnHead__title">
            <slot name="title">
            </slot>
        </div>
        <div class="commOnHead__application">
            <slot name="application">
            </slot>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import '../style/mixin.scss';
.commonHead {
    padding: 0 0.5rem;
    color: #fff;
    height: 3rem;
    background-color: $commonColor;
    @include displayFlex();
    .commOnHead__icon {
        width: 20vw;
    }
    .commOnHead__title {
        width: 60vw;
        text-align: center;
    }
    .commOnHead__application {
        width: 20vw;
        text-align: center;
    }
}
</style>