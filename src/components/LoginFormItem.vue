<template>
    <div class="formItemBar">
        <slot name="input"></slot>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/mixin.scss';
.formItemBar {
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    padding: 0 0.3rem;
    @include displayFlex();
}
</style>

<script setup>

</script>