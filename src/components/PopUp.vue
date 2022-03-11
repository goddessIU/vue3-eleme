<template>
    <!-- 这个是点击出现的选项卡，他会从下方划出来 -->
    <transition>
        <div class="block--mask" v-if="props.show">
            <div class="block">
                <div class="head">aaa</div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['show'])
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.block--mask {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: fixed;
    background-color: $maskColor;
    .block {
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>