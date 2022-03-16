<template>
    <div class="block__option">
        <div class="block__option__name">不需要开发票</div>
        <div
            class="block__option__icon"
            :class="{ 'block__option__icon--click': needInvoice }"
            @click="changeChoice"
        >
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yes" />
            </svg>
        </div>
    </div>
    <button class="confirmRemark" @click="pushForm">确定</button>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.confirmRemark {
    outline: none;
    border: none;
    width: 70vw;
    height: 3rem;
    display: block;
    margin: 0 auto 0 auto;
    border-radius: 2vw;
    background-color: $butColor;
    color: #fff;
    font-size: 1.2rem;
}
.block__option {
    background-color: #fff;
    height: 3.5rem;
    line-height: 3.5rem;
    padding: 0 0.8rem;
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
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//是否开发票
const useNeedInvoice = () => {
    let needInvoice = ref(false)
    const changeChoice = () => {
        needInvoice.value = !needInvoice.value
    }

    return {
        needInvoice,
        changeChoice
    }
}
const {
    needInvoice,
    changeChoice
} = useNeedInvoice()


const useRouterEffect = () => {
    const router = useRouter()

    //提交表单
    const pushForm = () => {
        router.back()
    }

    return {
        router,
        pushForm
    }
}
const {
    router,
    pushForm
} = useRouterEffect()
</script>