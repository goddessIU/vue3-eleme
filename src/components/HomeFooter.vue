<template>
    <!-- 最下方底部 -->
    <div class="options" v-show="route.meta.showFoot===true">
        <div class="options__index options__choosed">
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-index" />
            </svg>
            首页
        </div>
        <div class="options__order">
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-order" />
            </svg>
            订单
        </div>
        <div class="options__user" @click="goUser">
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-user" />
            </svg>
            我的
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const goUser = () => {
    router.push({
        name: 'user'
    })
}
</script>

<style lang="scss" scoped>
@import '../style/config.scss';
@import '../style/mixin.scss';
.options {
    z-index: 100;
    background-color: $bgColor;
    height: 3rem;
    width: 100vw;
    position: fixed;
    bottom: 0;
    @include displayFlex(center, center);
    box-shadow: 0 -0.0625rem .3125rem #bebdbd;
    .options__index,
    .options__order,
    .options__user {
        width: 33.3vw;
        font-size: 0.875rem;
        text-align: center;
        
        @include displayFlex(center, center, column);
        .options__icon {
            font-size: 1.2rem;
        }
    }
    .options__choosed {
        color: $commonColor;
    }
}
</style>