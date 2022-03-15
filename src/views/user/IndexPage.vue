<template>
    <div class="userBlock">
        <div class="userBlock__unLogin" v-if="store.userData">
            <div class="userBlock__login" @click="goLogin">
                <div>
                    <img :src="`https://elm.cangdu.org/img/${store.userData.avatar}`">
                    {{store.userData.username}}
                </div>
            </div>
            <div class="userBlock__phone">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-phone" />
                </svg>暂无绑定的手机号
            </div>
        </div>
        <div v-else>
            <div class="userBlock__login" @click="goLogin">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user-circle" />
                    </svg>登录注册
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-right" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="serviceBlock">
        <div class="serviceBlock__download" @click="goChooseAddress">
            <span>收货地址</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right" />
            </svg>
        </div>
        <div class="serviceBlock__download" @click="goService">
            <span>服务中心</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right" />
            </svg>
        </div>
        <div class="serviceBlock__download" @click="goDownLoad">
            <span>下载饿了么App</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right" />
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.userBlock {
    width: 100vw;
    height: 5rem;
    background-color: $commonColor;
    padding: 0.3rem 0.3rem;
    color: #fff;
    .userBlock__login {
        font-size: 1.2rem;
        height: 3rem;
        line-height: 3rem;
        img {
            width: 2rem;
            height: 2rem;
        }
    }
    .userBlock__phone {
        font-size: 1rem;
        height: 2rem;
    }
}
.serviceBlock {
    background-color: #fff;
    margin-top: 1rem;
    width: 100vw;
    padding: 0 0.3rem;
    .serviceBlock__download {
        height: 3rem;
        line-height: 3rem;
        @include displayFlex();
    }
}
</style>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '../../store';

const router = useRouter()
const store = useStore()
const goLogin = () => {
    router.push({
        name: 'login'
    })
}
const goDownLoad = () => {
    router.push({
        name: 'download'
    })
}
const goService = () => {
    router.push({
        name: 'service'
    })
}
const goChooseAddress = () => {
    router.push({
        name: 'chooseAddress'
    })
}
</script>