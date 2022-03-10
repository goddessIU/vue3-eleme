<template>
    <!-- 本页面为通用头部 -->
    <div class="commonHead">
        <div class="commOnHead__icon" @click="goBack">
            <slot name="icon">
            </slot>
        </div>
        <div class="commOnHead__title">
            <slot name="title">
            </slot>
        </div>
        <div class="commOnHead__application" @click="props.func">
            <slot name="application">
            </slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['func'])
const goBack = () => {
    router.back()
}


</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import '../style/mixin.scss';
.commonHead {
    padding: 0 0.5rem;
    color: $bgColor;
    height: 3rem;
    background-color: $commonColor;
    @include displayFlex();
    width: 100vw;
    box-sizing: border-box;
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