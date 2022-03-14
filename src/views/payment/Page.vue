<template>
    <div class="paymentTime">
        <div class="paymentTime__title">剩余时间</div>
        <div class="paymentTime__time">15:00</div>
    </div>
    <div class="paymentWay">
        <div class="paymentWay__title">支付方式</div>
        <div class="paymentWay__ways">
            <div class="paymentWay__way">阿里</div>
            <div class="paymentWay__way">微信</div>
        </div>
    </div>
    <div class="paymentConfirm">确认</div>
</template>

<style lang="scss" scoped>
@import '../../style/config.scss';
@import '../../style/mixin.scss';
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
            height: 3rem;
            line-height: 3rem;
            background-color: #fff;
        }
    }
}
.paymentConfirm {
    @include button();
    width: 100vw;
    margin-top: 3rem;
}
</style>