<template>
    <div class="options">
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
        <div class="options__user">
            <svg class="icon options__icon" aria-hidden="true">
                <use xlink:href="#icon-user" />
            </svg>
            我的
        </div>
    </div>
</template>

<style lang="scss" scoped>
.options {
    background-color: #fff;
    height: 3rem;
    width: 100vw;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 -0.0625rem .3125rem #bebdbd;
    .options__index,
    .options__order,
    .options__user {
        width: 33.3vw;
        font-size: 0.875rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .options__icon {
            font-size: 1.2rem;
        }
    }
    .options__choosed {
        color: #12e0f9;
    }
}
</style>