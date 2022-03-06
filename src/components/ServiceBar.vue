<template>
<div class="service">
    <div class="service__item">
        <img src="../assets/images/yummy.png" class="service__img" alt="">
        美食
    </div>
    <div class="service__item">
        <img src="../assets/images/dinner.png" class="service__img" alt="">
        夜宵
    </div>
    <div class="service__item">
        <img src="../assets/images/daigou.png" class="service__img" alt="">
        跑腿代购
    </div>
    <div class="service__item">
        <img src="../assets/images/hambu.png" class="service__img" alt="">
        汉堡披萨
    </div>
    <div class="service__item">
        <img src="../assets/images/xiaochi.png" class="service__img" alt="">
        地方小吃
    </div>
</div>
</template>

<style lang="scss" scoped>
@import '../style/mixin.scss';
.service {
    @include displayFlex(center);
    height: 15vw;
    width: 100vw;
    .service__item {
        @include displayFlex(center, center, column);
        width: 20vw;
        font-size: .75rem;
        .service__img {
            width: 50%;
        }
    }
}
</style>