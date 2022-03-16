<template>
    
    <div class="orderBlock" v-for="orderObj in store.orderList">
        <div class="orderBlock__first">
            <div class="orderBlock__first__left">
                <div class="orderBlock__shopName">{{ orderObj?.restaurant_name }}</div>
                <div class="orderBlock__time">{{ orderObj?.formatted_created_at }}</div>
            </div>
            <div class="orderBlock__first__right">{{ orderObj?.status_bar?.sub_title }}</div>
        </div>
        <div class="orderBlock__money">￥{{ orderObj?.total_amount }}</div>
    </div>
    <vue-simple-spinner size="medium" v-show="store.showLoading" />
    <tip-window :show="ShowTip">
        <template #content>请先登录</template>
    </tip-window>
</template>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
@import "../../style/config.scss";
.orderBlock {
    width: 100vw;
    height: 8rem;
    background-color: #fff;
    padding: 0.3rem;
    margin-bottom: 3rem;
    .orderBlock__first {
        height: 3rem;
        @include displayFlex();
        .orderBlock__first__left {
            height: 3rem;
            @include displayFlex(center, space-between, column);
        }
        .orderBlock__shopName {
            font-size: 1.5rem;
        }
    }
    .orderBlock__money {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: $priceColor;
    }
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from '../../store';
import _ from 'lodash'
import { getOrderList } from '../../service/getData';
import TipWindow from '../../components/TipWindow.vue';

const store = useStore()

//下拉更新逻辑
const useToGetOrderList = () => {
    let offset = 0,
        limit = 10,
        //是否能继续下拉
        canGetOrderList = ref(true)

    const toGetOrderList = async () => {
        if (!store.userData) {
            toShowTip()
            return
        }

        try {
            //到底无法下拉
            if (!canGetOrderList.value) return

            store.openLoading()

            let data = await getOrderList({
                limit,
                offset
            })
            if (data.length === 0) {
                canGetOrderList.value = true
                return;
            }

            if (offset === 0) {
                store.orderList = data
            } else {
                store.orderList.push(...data)
            }

            store.closeLoading()
            offset += 10
        } catch (err) {
            console.error(err)
        }
    }
    const useGetOrderList = _.debounce(toGetOrderList, 1000)

    return {
        useGetOrderList,
        canGetOrderList
    }
}
const {
    useGetOrderList
} = useToGetOrderList()

onMounted(() => {
    if (!store.userData) {
        toShowTip()
        return
    }

    useGetOrderList()
    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 750) {
            useGetOrderList()
        }
    })
})

//展示showtip逻辑
const useToShowTip = () => {
    let ShowTip = ref(false)
    const toShowTip = () => {
        ShowTip.value = true
        setTimeout(() => {
            ShowTip.value = false
        }, 3000)
    }
    return {
        ShowTip,
        toShowTip
    }
}
const {
    ShowTip,
    toShowTip
} = useToShowTip()

</script>