<template>
    <div class="store">
        <div class="store__img">
            <img src="../assets/images/taocan.png" alt="" class="store__img__pic">
        </div>
        <div class="store__intro">
            <h1 class="store__title">chaoshi</h1>
            <div class="store__rate">4.9 月售333单</div>
            <div class="store__service">￥20起送| 满39配送 1.6km|30分钟</div>
            <div class="store__activity">标超</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.store {
    overflow-y: scroll;
    width: 100vw;
    min-height: 30vw;
    display: flex;
    box-sizing: border-box;
    border-bottom: .0625rem solid rgb(224, 224, 224);
    margin-top: .3125rem;
    .store__img {
        width: 30vw;
        height: 30vw;
        margin-right: 5vw;
        text-align: center;
        padding-top: 5vw;
        box-sizing: border-box;
        img {
            width: 20vw;
            height: 20vw;
        }
    }
    .store__intro {
        .store__title {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .store__rate, .store__service, .store__activity {
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }
    }
}
</style>