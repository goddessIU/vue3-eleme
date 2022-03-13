<template>
    <div class="formBlock">
        <login-form-item>
            <template #input>
                <input type="text" class="formItem__input" placeholder="账号" v-model="account" />
            </template>
        </login-form-item>
        <login-form-item>
            <template #input>
                <input
                    :type="passwordType"
                    class="formItem__input"
                    placeholder="密码"
                    v-model="password"
                />
                <div class="formItem__showPassword" @click="showPassword">
                    <div
                        class="showPassword__bar"
                        :class="{ 'showPassword__bar--final': passwordType === 'text' }"
                    >
                        abc
                        <div
                            class="showPassword__bar__circle"
                            :class="{ 'showPassword__bar__circle--final': passwordType === 'text' }"
                        ></div>
                    </div>
                </div>
            </template>
        </login-form-item>
        <login-form-item>
            <template #input>
                <input type="text" class="formItem__input" placeholder="验证码" v-model="code" />
                <img :src="codeImg" class="formItem__code" />
                <div class="formItem__changeCode" @click="useGetCode">
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
    <button class="pushForm" @click="putLogin">确定</button>
    <div class="goReset">
        <span @click="goReset">重置密码？</span>
    </div>
    <Teleport to="body">
        <tip-window :show="ShowTip">
            <template #content>{{ alertTip }}</template>
        </tip-window>
    </Teleport>
</template>

<script setup>
import LoginFormItem from '../../components/LoginFormItem.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCode, goLogin } from '../../service/getData'
import TipWindow from '../../components/TipWindow.vue';
const router = useRouter()

// 控制登录信息
const useLoginEffect = () => {
    let account = ref('')
    let password = ref('')
    let code = ref('')
    let alertTip = ref('')
    let ShowTip = ref(false)
    const putLogin = async () => {
        //如果内容为空
        if (account.value === '' || password.value === '' || code.value === '') {
            alertTip.value = '内容不能为空'
            ShowTip.value = true
            setTimeout(() => {
                ShowTip.value = false
                alertTip.value = ''
            }, 3000)
            return
        }
        //如果网络或者服务端报错，进入catch
        //否则为用户问题报错登录失败
        try {
            let data = await goLogin({ username: account.value, password: password.value, captcha_code: code.value })
            if (data.status === 1) {
                alertTip.value = '登录成功'
                ShowTip.value = true
                setTimeout(() => {
                    ShowTip.value = false
                    alertTip.value = ''
                    router.push({
                        name: 'index'
                    })
                }, 3000)

            } else {
                alertTip.value = '登录失败'
                ShowTip.value = true
                setTimeout(() => {
                    ShowTip.value = false
                    alertTip.value = ''
                }, 3000)
            }
        } catch (err) {
            alertTip.value = err.name
            ShowTip.value = true
            setTimeout(() => {
                ShowTip.value = false
                alertTip.value = ''
            }, 3000)
            return;
        }

    }
    return {
        account,
        password,
        code,
        alertTip,
        putLogin,
        ShowTip
    }
}
const {
    account,
    password,
    code,
    putLogin,
    alertTip,
    ShowTip
} = useLoginEffect()


// 控制是否展示密码
const usePasswordType = () => {
    let passwordType = ref('password')
    const showPassword = () => {
        if (passwordType.value === 'password') {
            passwordType.value = 'text'
        } else {
            passwordType.value = 'password'
        }
    }
    return {
        passwordType,
        showPassword
    }
}
const {
    passwordType,
    showPassword
} = usePasswordType()



// 获取验证码
const useCodeEffect = () => {
    let codeImg = ref('')
    const useGetCode = async () => {
        try {
            let data = await getCode()
            if (data.status === 1) {
                codeImg.value = data.code
            } else {
                alertTip.value = '获取二维码失败'
                ShowTip.value = true
                setTimeout(() => {
                    ShowTip.value = false
                    alertTip.value = ''
                }, 3000)
            }
        } catch (err) {
            alertTip.value = err.name
            ShowTip.value = true
            setTimeout(() => {
                ShowTip.value = false
                alertTip.value = ''
            }, 3000)
            return;
        }
    }
    return {
        codeImg,
        useGetCode
    }
}
const {
    codeImg,
    useGetCode
} = useCodeEffect()
onMounted(() => {
    useGetCode()
})



// 去往修改密码页面
const goReset = () => {
    router.push({
        name: 'resetpassword'
    })
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
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
        width: 5rem;
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
            transition: all 0.2s linear;

            .showPassword__bar__circle {
                height: 1.5rem;
                width: 1.5rem;
                background-color: #1e80ff;
                border-radius: 1.5rem;
                position: absolute;
                top: -0.25rem;
                left: -0.25rem;
                transition: all 0.2s linear;
            }
            .showPassword__bar__circle--final {
                left: 4.25rem;
                transition: all 0.2s linear;
            }
        }
        .showPassword__bar--final {
            background-color: #46f046;
            transition: all 0.2s linear;
        }
    }
}
.tips {
    color: red;
    font-size: 0.8rem;
    padding: 0.3rem;
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