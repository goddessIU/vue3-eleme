<template>
    <div class="addaddress">
        <div class="form">
            <form-item>
                <template #name>联系人</template>
                <template #input>
                    <input type="text" class="form__input" placeholder="姓名" v-model="name"/>
                </template>
                <!-- <div class="form__labels">
                    <options-block>
                        <template #content>家</template>
                    </options-block>
                    <options-block>
                        <template #content>学校</template>
                    </options-block>
                    <options-block>
                        <template #content>公司</template>
                    </options-block>
                </div> -->
            </form-item>
            <form-item>
                <template #name>电话</template>
                <template #input>
                    <input type="number" class="form__input" placeholder="手机号码" v-model="phone"/>
                </template>
            </form-item>
            <form-item>
                <template #name>备用电话</template>
                <template #input>
                    <input type="number" class="form__input" placeholder="手机号码" v-model="otherPhone"/>
                </template>
            </form-item>
            <form-item>
                <template #name>地址</template>
                <template #input>
                    <input type="text" class="form__input" placeholder="小区/写字楼/学校等" @focus="goSearchAddress" v-model="address"/>
                </template>
            </form-item>
            <form-item>
                <template #name>详细地址</template>
                <template #input>
                    <input type="text" class="form__input" placeholder="10号楼5层501室222" v-model="detailAddress"/>
                </template>
            </form-item>
            <div class="form__button">
                <button @click="putAddress">确定</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";

.addaddress {
    background-color: $commonGray;
    height: 100vh;
    .form {
        .form__button {
            width: 100vw;
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            button {
                width: 80vw;
                height: 3rem;
                border-radius: 0.3125rem;
                outline: none;
                border: none;
                background-color: $butColor;
                color: #fff;
                font-size: 1rem;
                font-weight: bold;
            }
        }
        .form__input {
            width: 100%;
            height: 2rem;
            outline: none;
            border: none;
            padding-left: 0.3125rem;
            // border-bottom: .0625rem solid $shadowColor;
        }
        .form__labels {
            @include displayFlex(center, space-around);
        }
    }
}
</style>

<script setup>
import CommonHeader from '../../components/CommonHeader.vue';
import FormItem from '../../components/FormItem.vue';
import OptionsBlock from '../../components/OptionsBlock.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { ref } from 'vue';
const router = useRouter()
const goSearchAddress = () => {
    router.push('searchAddress')
}
const store = useStore()
let address= ref(store.tempAddAddress.address)
let name = ref('')
let phone = ref('')
let otherPhone = ref('')
let detailAddress = ref('')
const putAddress = () => {
    // 相关逻辑
    router.back()
}
</script>