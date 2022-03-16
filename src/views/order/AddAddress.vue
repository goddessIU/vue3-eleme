<template>
    <div class="addaddress">
        <div class="form">
            <form-item>
                <template #name>联系人</template>
                <template #input>
                    <input type="text" class="form__input" placeholder="姓名" v-model="name" />
                </template>
            </form-item>
            <form-item>
                <template #name>电话</template>
                <template #input>
                    <input  class="form__input" placeholder="手机号码" v-model.number="phone"/>
                </template>
            </form-item>
            <form-item>
                <template #name>地址</template>
                <template #input>
                    <input
                        type="text"
                        class="form__input"
                        placeholder="小区/写字楼/学校等"
                        @focus="goSearchAddress"
                        v-model="address"
                    />
                </template>
            </form-item>
            <form-item>
                <template #name>详细地址</template>
                <template #input>
                    <input
                        type="text"
                        class="form__input"
                        placeholder="10号楼5层501室222"
                        v-model="detailAddress"
                    />
                </template>
            </form-item>
            <form-item>
                <template #name>标签</template>
                <template #input>
                    <input type="text" v-model="tagStr" class="form__input" placeholder="标签" />
                    <!-- <span v-for="(tag, index) in tagArr"><input type="radio" name="tag" @click="changeTagIndex(index)">{{tag}}</span> -->
                </template>
            </form-item>
            <form-item>
                <template #name>性别</template>
                <template #input>
                    <input
                        type="radio"
                        :checked="sex === 1"
                        value="1"
                        name="sex"
                        @click="chooseSex"
                    />男
                    <input
                        type="radio"
                        :checked="sex === 2"
                        value="2"
                        name="sex"
                        @click="chooseSex"
                    />女
                </template>
            </form-item>
            <div class="form__button">
                <button @click="toAddAddress">确定</button>
            </div>
        </div>
    </div>
    <tip-window :show="showTip">
        <template #content>添加失败</template>
    </tip-window>
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
import { postAddAddress } from '../../service/getData'
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { ref } from 'vue';
import xss from 'xss'
import TipWindow from '../../components/TipWindow.vue';

const useRouterEffect = () => {
    const router = useRouter()
    const goSearchAddress = () => {
        store.fillCurAddress({
            name: name.value,
            detailAddress: detailAddress.value,
            tag: tagStr.value,
            sex: sex.value,
            phone: phone.value
        })
        router.push('searchAddress')
    }

    return {
        router,
        goSearchAddress
    }
}
const {
    router,
    goSearchAddress
} = useRouterEffect()

const initalData = () => {
    const store = useStore()
    let address = ref(store.tempAddAddress.address)
    let name = ref(store.curAddress?.name || '')
    let phone = ref(store.curAddress?.phone || '')
    let detailAddress = ref(store.curAddress?.detailAddress || '')
    let sex = ref(store.curAddress?.sex || 1)
    let tagStr = ref(store.curAddress?.tag || '')

    return {
        store,
        address,
        name,
        phone,
        detailAddress,
        sex,
        tagStr
    }
}
const {
    store,
    address,
    name,
    phone,
    detailAddress,
    sex,
    tagStr
} = initalData()

const chooseSex = (e) => {
    if (e.target.type === 'radio') {
        sex.value = e.target.value
    }
}

//增加地址逻辑
const useAddAddress = () => {
    //增加收获地址
    let showTip = ref(false)
    const toAddAddress = async () => {
        let data = await postAddAddress({
            user_id: store.userData.user_id,
            address: xss(address.value),
            address_detail: xss(detailAddress.value),
            geohash: store.addressData.geohash,
            name: xss(name.value),
            phone: xss(phone.value),
            tag: xss(tagStr.value),
            sex: xss(sex.value),
            tag_type: 1,
            phone_bk: ''
        })
        if (data.status === 1) {
            router.back()
        } else {
            showTip.value = true
            setTimeout(() => {
                showTip.value = false
            }, 3000)
        }
    }

    return {
        showTip,
        toAddAddress
    }
}
const {
    showTip,
    toAddAddress
} = useAddAddress()
</script>