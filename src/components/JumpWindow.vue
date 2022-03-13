<template>
    <Transition name="fade">
        <div class="tip" v-if="props.show">
            <div class="tip__icon">
                <slot name="icon"></slot>
            </div>
            <div class="tip__content">
                <slot name="content"></slot>
            </div>

            <button class="tip__button" @click="closeWindow">
                <slot name="button">确定</slot>
            </button>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/mixin.scss";
.tip {
    width: 80vw;
    height: 30vh;
    background-color: rgba(255, 255, 255);
    border-radius: 0.3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -60%);
    @include displayFlex(center, space-between, column);
    .tip__icon {
        width: 100vw;
        height: 30%;
        font-size: 5rem;
        margin: 0.5rem 0;
    }
    .tip__content {
        font-size: 1.2rem;
        color: $fontColor;
    }
    .tip__button {
        @include button();
        width: 100%;
    }
}
.fade-enter-active,
.fade-leave-active {
    animation: bounce-in 0.5s;
}

@keyframes bounce-in {
    0% {
        transform: translate(-50%, -60%) scale(0);
    }
    25% {
        transform: translate(-50%, -60%) scale(1.2);
    }
    50% {
        transform: translate(-50%, -60%) scale(0.8);
    }
    75% {
        transform: translate(-50%, -60%) scale(1.2);
    }
    100% {
        transform: translate(-50%, -60%) scale(1);
    }
}
</style>

<script setup>
const props = defineProps(['show'])
const emit = defineEmits(['closeJumpWindow'])
const closeWindow = () => {
    emit('closeJumpWindow')
}
</script>