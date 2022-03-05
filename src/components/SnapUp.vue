<template>
<div class="block">
    <h1 class="block__title">品质套餐</h1>
    <p class="block__content">搭配齐全吃得好</p>
    <a href="javascript:;" class="block__arrow">立即抢购></a>
    <div class="block__position">
        <img src="../assets/images/taocan.png" alt="" class="block__img">
    </div>
    
</div>
</template>

<style lang="scss" scoped>
.block {
    margin-top: 10vw;
    position: relative;
    height: 25vw;
    background-color: #f4f4f4;
    width: 100vw;
    
    .block__title {
         font-weight: bold;
         font-size: 1.2rem;
         height: 8vw;
         line-height: 8vw;
         padding-left: 5vw;
    }
    .block__content {
        font-size: 1rem;
        color: #777;
        line-height: 8vw;
        padding-left: 5vw;
    }
    .block__arrow {
        text-decoration: none;
        color: #af8260;
        font-size: 1rem;
        padding-left: 5vw;
    }
    .block__position {
        position: absolute;
        top: 0;
        right: 0;
        width:  40vw;
        height: 25vw;
        .block__img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>