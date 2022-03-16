<template>
    <div class="addressBlock">
        <div
            class="addressBlock__bar"
            v-for="(address, index) in store.addressArrays"
            :class="{ 'addressBlock__bar--isChosed': isChoosed === index }"
            @click="changeChoosedAddress(index)"
        >
            <span>
                {{ address.name }}
                <span v-if="address.sex === 1">先生</span>
                <span v-else>女士</span>
                {{ address.address }}
            </span>
            <span>{{ address.phone }}</span>
        </div>
    </div>
    <div class="addressBlock__add" @click="goAddAddress">新增收获地址</div>
</template>

<style lang="scss" scope>
@import "../../style/mixin.scss";
@import "../../style/config.scss";
.addressBlock {
    width: 100vw;
    background-color: #fff;
    .addressBlock__bar {
        height: 5rem;
        @include displayFlex(start, space-around, column);
    }
    .addressBlock__bar--isChosed {
        background-color: #eaea5b;
    }
}
.addressBlock__add {
    width: 12rem;
    height: 3rem;
    position: absolute;
    background-color: $commonColor;
    bottom: 3rem;
    left: 50vw;
    transform: translateX(-50%);
    text-align: center;
    line-height: 3rem;
    color: #fff;
    font-size: 1.5rem;
}
</style>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAddressList } from '../../service/getData'
import { useStore } from '../../store/index'
import { ref } from 'vue';

const store = useStore()

const useRouterEffect = () => {
    const router = useRouter()
    const goAddAddress = () => {
        router.push({
            name: 'fillAddress'
        })
    }

    return {
        router,
        goAddAddress
    }
}
const {
    router,
    goAddAddress
} = useRouterEffect()



//获取地址信息列表
const toGetAddressList = async () => {
    try {
        let data = await getAddressList();
        store.addressArrays = data
        console.log(data)
    } catch (err) {
        console.error(err)
    }
}
onMounted(() => {
    toGetAddressList()
})

//选择地址逻辑
const useChooseAddress = () => {
    //选择地址
    let isChoosed = ref(0)
    const changeChoosedAddress = (index) => {
        isChoosed.value = index
        store.finalAddress = store.addressArrays[index]
        router.back()
    }

    return {
        isChoosed,
        changeChoosedAddress
    }
}
const {
    isChoosed,
    changeChoosedAddress
} = useChooseAddress()

</script>