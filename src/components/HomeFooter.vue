<template>
    <!-- 最下方底部 -->
    <div class="options" v-show="route.meta.showFoot === true">
        <div
            class="options__index"
            :class="{ 'options--choosed': choosedIndex === 0 }"
            @click="goHome"
        >
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-index" />
            </svg>
            首页
        </div>
        <div
            class="options__order"
            :class="{ 'options--choosed': choosedIndex === 1 }"
            @click="goOrder"
        >
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-order" />
            </svg>
            订单
        </div>
        <div
            class="options__user"
            @click="goUser"
            :class="{ 'options--choosed': choosedIndex === 2 }"
        >
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-user" />
            </svg>
            我的
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
const route = useRoute()
const router = useRouter()

//判断选择下方哪个部分
const useInitialIndex = () => {
    let choosedIndex = ref(0)
    const judgeChoosedIndex = () => {
        if (route.path === '/') {
            choosedIndex.value = 0
        } else if (route.path.includes('orderhome')) {
            choosedIndex.value = 1
        } else if (route.path.includes('user')) {
            choosedIndex.value = 2
        }
    }

    return {
        choosedIndex,
        judgeChoosedIndex
    }
}
const {
    choosedIndex,
    judgeChoosedIndex
} = useInitialIndex()
//监听以及挂载时初始化，随时调整选择哪个
watch(() => route.path, (newVal) => {
    judgeChoosedIndex()
})
onMounted(() => {
    judgeChoosedIndex()
})

//路由逻辑处理
const useRouterEffect = () => {
    const goUser = () => {
        choosedIndex.value = 2
        router.push({
            name: 'user'
        })
    }

    const goOrder = () => {
        choosedIndex.value = 1
        router.push({
            name: 'orderhome'
        })
    }

    const goHome = () => {
        choosedIndex.value = 0
        router.push({
            name: 'index'
        })
    }

    return {
        goHome,
        goUser,
        goOrder
    }
}
const {
    goHome,
    goUser,
    goOrder
} = useRouterEffect()


</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/mixin.scss";
.options {
    z-index: 100;
    background-color: $bgColor;
    height: 3rem;
    width: 100vw;
    position: fixed;
    bottom: 0;
    @include displayFlex(center, center);
    box-shadow: 0 -0.0625rem 0.3125rem #bebdbd;
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
    .options--choosed {
        color: $commonColor;
    }
}
</style>