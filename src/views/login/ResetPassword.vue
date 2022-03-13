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
                    placeholder="请输入旧密码"
                    v-model="oldPass"
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
                <input
                    type="password"
                    class="formItem__input"
                    placeholder="请输入新密码"
                    v-model="newPass"
                />
            </template>
        </login-form-item>
        <login-form-item>
            <template #input>
                <input
                    type="password"
                    class="formItem__input"
                    placeholder="请再次输入新密码"
                    v-model="reNewPass"
                />
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
    <button class="pushForm" @click="toResetPassword">确定</button>
    <Teleport to="body">
        <tip-window :show="ShowTip">
            <template #content>{{ alertTip }}</template>
        </tip-window>
    </Teleport>
</template>

<script setup>
import LoginFormItem from '../../components/LoginFormItem.vue'
import { onMounted, ref } from 'vue'
import { getCode, resetPassword } from '../../service/getData'
import { useRouter } from 'vue-router'

//展示验证码
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


// 控制表单
const vModelData = () => {
    let account = ref('')
    let oldPass = ref('')
    let newPass = ref('')
    let reNewPass = ref('')
    let code = ref('')
    return {
        account,
        oldPass,
        newPass,
        reNewPass,
        code
    }
}
const {
    account,
    oldPass,
    newPass,
    reNewPass,
    code
} = vModelData()


// 提交表单
const putForm = () => {
    let alertTip = ref('')
    let ShowTip = ref(false)
    const toResetPassword = async () => {
        if (!account.value) {
            alertTip.value = '不能为空'
            ShowTip.value = true
            setTimeout(() => {
                ShowTip.value = false
                alertTip.value = ''
            }, 3000)
            return;
        }
        const router = useRouter()
        try {
            let res = await resetPassword()
            if (res.status === 1) {
                alertTip.value = '重置成功'
                ShowTip.value = true
                setTimeout(() => {
                    ShowTip.value = false
                    alertTip.value = ''
                    router.push({
                        name: 'index'
                    })
                }, 3000)

            } else {
                alertTip.value = '重置失败'
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
        alertTip,
        ShowTip,
        toResetPassword
    }
}
const {
    alertTip,
    ShowTip,
    toResetPassword
} = putForm()



//是否展示密码
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
</style>