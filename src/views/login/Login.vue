<template>
    <div class="formBlock">
        <login-form-item>
            <template #input>
                <input type="text" class="formItem__input" placeholder="账号" />
            </template>
        </login-form-item>
        <login-form-item>
            <template #input>
                <input type="text" class="formItem__input" placeholder="密码" />
                <div class="formItem__showPassword">
                    <div class="showPassword__bar showPassword__bar--final">
                        abc

                        <div class="showPassword__bar__circle showPassword__bar__circle--final"></div>
                    </div>
                </div>
            </template>
        </login-form-item>
        <login-form-item>
            <template #input>
                <input type="text" class="formItem__input" placeholder="验证码" />
                <img src="../../assets/images/icon.png" class="formItem__code">
                <div class="formItem__changeCode">
                    <span>看不清</span>
                    <span>换一张</span>
                </div>
            </template>
        </login-form-item>
    </div>
    <div class="tips">
        温馨提示：未注册过的账号，登录时将自动注册
        注册过的用户可凭账号密码登录
    </div>
    <button class="pushForm">确定</button>
    <div class="goReset">
        <span @click="goReset">重置密码？</span>
    </div>
</template>

<script setup>
import LoginFormItem from '../../components/LoginFormItem.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const goReset = () => {
    router.push({
        name: 'resetpassword'
    })
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.formBlock {
    margin-top: 1rem;
    .formItem__input {
        box-sizing: border-box;
        overflow: hidden;
        width: 60vw;
        height: 3rem;
        outline: none;
        border: none;
    }
    .formItem__code {
        width: 10vw;
        height: 2.8rem;
        line-height: 3rem;
    }
    .formItem__changeCode {
        font-size: 0.8rem;
        height: 3rem;
        @include displayFlex(center, start, column);
        span {
            display: inline-block;
            width: 3rem;
            height: 1.5rem;
            line-height: 1.5rem;
        }
    }
    .formItem__showPassword {
        padding-right: 2rem;
        .showPassword__bar {
            width: 5rem;
            height: 1rem;
            background-color: $commonGray;
            border-radius: 0.8rem;
            position: relative;
            line-height: 1rem;
            padding: 0 1rem;
            font-size: 0.5rem;
            color: #fff;
            .showPassword__bar__circle {
                height: 1.5rem;
                width: 1.5rem;
                background-color: #1e80ff;
                border-radius:1.5rem;
                position: absolute;
                top: -0.25rem;
                left: -0.25rem;
            }
            .showPassword__bar__circle--final {
                left: 4.25rem;
            }
        }
        .showPassword__bar--final {
            background-color: #46f046;
        }
    }
}
.tips {
    color: red;
    font-size: 0.8rem;
    padding: 0.3rem
}
.pushForm {
    @include button();
    width: 80vw;
    margin: 0.5rem 10vw;
}
.goReset {
    margin-top: 0.3rem;
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    span {
        float: right;
        padding-right: 0.5rem;
        color: $commonColor;
    }
}
</style>