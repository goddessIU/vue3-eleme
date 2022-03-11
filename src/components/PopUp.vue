<template>
    <!-- 这个是点击出现的选项卡，他会从下方划出来 -->
    <Transition name="fade">
        <div class="block--mask" v-if="props.show">
            <div class="block">
                <div class="block__head">
                    支付方式
                </div>
                <div class="block__options">
                    <div class="block__option" v-for="(payment, index) in store?.orderData?.payments">
                        <div class="block__option__name">{{payment.name}}<span>{{payment.description}}</span></div>
                        <div class="block__option__icon" :class="{'block__option__icon--click' : payment.select_state === 1}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yes" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from '../store';
const props = defineProps(['show'])
const emit = defineEmits(['closeBlock'])
const store = useStore()

// 关闭block
const closeBlock = (e) => {
    if (e.target.className === 'block--mask') {
        emit('closeBlock')
    }
}

// 绑定通过点击外部关闭block
onMounted(() => {
    document.addEventListener('click', closeBlock)
})
onUnmounted(() => {
    document.removeEventListener('click', closeBlock)
})
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import '../style/mixin.scss';

// 过渡效果
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
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
        min-height: 20rem;
        background-color: #fff;

        .block__head {
            height: 3rem;
            line-height: 3rem;
            background-color: $commonGray;
            box-sizing: border-box;
            padding-left: 0.5rem;
            text-align: center;
            font-size: 1.2rem;
        }
        .block__options {
            background-color: #fff;
            padding: 0 0.5rem;
            .block__option {
                height: 3.5rem;
                line-height: 3.5rem;
                @include displayFlex(center, space-between);
                .block__option__name {
                    font-size: 1.2rem;
                }
                .block__option__icon {
                    font-size: 1.2rem;
                }
                .block__option__icon--click {
                    color: $butColor;
                }
            }
        }
    }
}
</style>