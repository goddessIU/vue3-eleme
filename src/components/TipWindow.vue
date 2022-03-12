<template>
    <Transition name="fade">
        <div class="tip" v-if="props.show">
            <slot name="content"></slot>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.tip {
    width: 30vw;
    height: 3rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    position: fixed;
    top: 5vh;
    left: 50vw;
    transform: translateX(-50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from
{
  opacity: 0;
  height: 0vh;
}
.fade-leave-to  {
    opacity: 0;
}
</style>

<script setup>
const props = defineProps(['show'])
</script>