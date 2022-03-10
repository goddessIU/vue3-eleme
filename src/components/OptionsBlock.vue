<template>
    <!-- 表单条插槽 -->
    <div class="block">
        <slot name="content"></slot>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '../style/config.scss';
.block {
    width: 5rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    color: black;
    font-weight: normal;
    border: .125rem solid #f4f4f4;
    border-radius: .125rem;
    text-align: center;
}
</style>