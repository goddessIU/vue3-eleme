<template>
    <div class="paymentTime">
        <div class="paymentTime__title">剩余时间</div>
        <div class="paymentTime__time">{{ clockTime }}</div>
    </div>
    <div class="paymentWay">
        <div class="paymentWay__title">支付方式</div>
        <div class="paymentWay__ways">
            <div class="paymentWay__way" @click="changeWay">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhifubao" />
                    </svg>
                    支付宝
                </span>
                <span>
                    <svg
                        class="icon"
                        aria-hidden="true"
                        :class="{ 'paymentWay__icon--isChoosed': chooseWay === 0 }"
                    >
                        <use xlink:href="#icon-yes1" />
                    </svg>
                </span>
            </div>
            <div class="paymentWay__way" @click="changeWay">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin" />
                    </svg>
                    微信支付
                </span>
                <span>
                    <svg
                        class="icon"
                        aria-hidden="true"
                        :class="{ 'paymentWay__icon--isChoosed': chooseWay === 1 }"
                    >
                        <use xlink:href="#icon-yes1" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
    <div class="paymentConfirm" @click="payPayment">确认</div>
    <Teleport to="body">
        <jump-window @closeJumpWindow="closeJumpWindowFunc" :show="ShowTip">
            <template #icon>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-eleme" class="jump__Color" />
                </svg>
            </template>
            <template #content>{{ jumpWindowContent }}</template>
            <template #button>关闭</template>
        </jump-window>
    </Teleport>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.paymentTime {
    width: 100vw;
    height: 8rem;
    background-color: #fff;
    @include displayFlex(center, space-around, column);
    .paymentTime__title {
        height: 3rem;
        line-height: 3rem;
    }
    .paymentTime__time {
        height: 5rem;
        line-height: 5rem;
        font-size: 3rem;
    }
}
.paymentWay {
    .paymentWay__title {
        height: 3rem;
        line-height: 3rem;
    }
    .paymentWay__ways {
        .paymentWay__way {
            padding: 0 0.3rem;
            @include displayFlex();
            height: 3rem;
            line-height: 3rem;
            background-color: #fff;
            .paymentWay__icon--isChoosed {
                color: $butColor;
            }
        }
    }
}
.paymentConfirm {
    @include button();
    width: 100vw;
    margin-top: 3rem;
}
.jump__Color {
    color: $commonColor;
}
</style>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useStore } from '../../store/index'
import { useRouter } from 'vue-router'
import JumpWindow from '../../components/JumpWindow.vue'
import { makeCountDonw } from '../../utils/countDown.js'

const store = useStore()
const router = useRouter()

//选择哪种付费方式的逻辑
const useChooseWayEffect = () => {
    let chooseWay = ref(0)
    const changeWay = () => {
        if (chooseWay.value === 0) {
            chooseWay.value = 1
        } else {
            chooseWay.value = 0
        }
    }

    return {
        chooseWay,
        changeWay
    }
}
const {
    chooseWay,
    changeWay
} = useChooseWayEffect()

//支付逻辑
const payPayment = () => {
    jumpWindowContent.value = '支付成功'
    ShowTip.value = true
    clearInterval(timer)
    //支付成功，清除相关已付费的信息
    store.clearData()
    unwatch()
}

//弹框相关逻辑
const useJumpWindowEffect = () => {
    let jumpWindowContent = ref('')
    let ShowTip = ref(false)

    const closeJumpWindowFunc = () => {
        ShowTip.value = false
        router.push({
            name: 'index'
        })
    }

    return {
        jumpWindowContent,
        ShowTip,
        closeJumpWindowFunc
    }
}
const {
    jumpWindowContent,
    ShowTip,
    closeJumpWindowFunc
} = useJumpWindowEffect()


//制作倒计时
let timer = null
let useCountDown = () => {
    let clockTime = ref('15:00')

    //获取一个执行定时器的函数
    let execuateClock = () => {
        let timeClock = makeCountDonw(15, 0, clockTime)
        let timer = timeClock()
        return timer
    }

    return {
        clockTime,
        execuateClock
    }
}
const {
    clockTime,
    execuateClock
} = useCountDown()

onMounted(() => {
    timer = execuateClock()
})

const unwatch = watch(clockTime, (newVal) => {
    if (newVal === '00:00') {
        nextTick(() => {
            ShowTip.value = true
            jumpWindowContent.value = '时间已到，请重新下单'
        })
    }
})
</script>