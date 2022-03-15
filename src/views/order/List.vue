<template>
    <div class="orderBlock" v-for="(orderObj, index) in store.orderList">
        <div class="orderBlock__first">
            <div class="orderBlock__first__left">
                <div class="orderBlock__shopName">{{orderObj?.restaurant_name}}</div>
                <div class="orderBlock__time">{{orderObj?.formatted_created_at}}</div>
            </div>
            <div class="orderBlock__first__right">{{orderObj?.status_bar?.sub_title}}</div>
        </div>
        <div class="orderBlock__money">￥{{orderObj?.total_amount}}</div>
    </div>
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
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { getOrderList } from '../../service/getData';
import { useStore } from '../../store';
import _ from 'lodash'
const store = useStore()
let offset = 0,
    limit = 10
const toGetOrderList = async () => {
    try {
        let data = await getOrderList({
            limit,
            offset
        })
        console.log(data)
        if (offset === 0) {
            store.orderList = data
        } else {
            store.orderList.push(...data)
        }
        offset += 10
    } catch (err) {
        console.error(err)
    }
}
const useGetOrderList = _.debounce(toGetOrderList, 1000)
onMounted(() => {
    useGetOrderList()
    window.addEventListener('scroll', function() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 1000) {
            useGetOrderList()
        }
    })
})
</script>