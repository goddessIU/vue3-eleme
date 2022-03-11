<template>
    <!-- 本页面为order主体部分 -->
    <AddAddressBlock />
    <div class="order__time">
        <div class="order__time__title">送达时间</div>
        <div class="order__time__content">
            <div class="time__content__firstLine">
                <span
                    class="time__content__rule"
                    v-if="!store?.orderData?.cart?.is_address_too_far"
                >尽快送达</span> |
                <span
                    class="time__content__prediction"
                >预计{{ store?.orderData?.delivery_reach_time }}</span>
            </div>
            <div class="time__content__secondLine">
                <span
                    class="time__content__company"
                    v-if="store?.orderData?.cart?.is_deliver_by_fengniao"
                >蜂鸟专送</span>
            </div>
        </div>
    </div>
    <div class="order__pay">
        <div class="order__pay__way">
            <h3>支付方式</h3>
            <span @click="openBlock">
                <span>在线支付</span>
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-right" />
                    </svg>
                </span>
            </span>
        </div>
        <div class="order__pay__redBag">
            <h3>红包</h3>
            <span>暂时只支持在饿了么APP中支付</span>
        </div>
    </div>
    <div class="order__detail">
        <div class="order__detail__storeInfo">
            <span>{{ store?.orderData?.cart?.restaurant_info?.name }}</span>
        </div>
        <div class="order__detail__bars">
            <div class="order__detail__bar" v-for="(item, index) in store?.orderData?.cart?.groups?.[0]">
                <span class="order__detail__name">{{ item.name }}</span>
                <span class="order__detail__num">x{{ item.quantity }}</span>
                <span
                    class="order__detail__money"
                >￥{{ parseInt(item.quantity) * parseInt(item.price) }}</span>
            </div>
        </div>
        <div class="order__detail__fee">
            <div class="order__detail__bar">
                <span class="order__detail__name">配送费</span>
                <span class="order__detail__money">￥{{ store?.orderData?.cart?.deliver_amount }}</span>
            </div>
            <div class="order__detail__bar" v-for="(otherData) in store?.orderData?.cart?.extra">
                <span class="order__detail__name">{{ otherData?.name }}</span>
                <span class="order__detail__money">￥{{ otherData?.price }}</span>
            </div>
        </div>
        <div class="order__detail__totalFee">
            <div class="order__detail__bar">
                <span class="order__detail__needpay">订单 ￥{{ store?.orderData?.cart?.total }}</span>
                <span class="order__detail__unpay">待支付 ￥{{ store?.orderData?.cart?.total }}</span>
            </div>
        </div>
        <div class="order__detail__requests">
            <div class="order__detail__bar">
                <span class="order__detail__name">订单备注</span>
                <span class="order__detail__intro" @click="goReMark">口味、偏好等></span>
            </div>
            <div class="order__detail__bar" v-if="store?.orderData?.invoice?.is_available">
                <span class="order__detail__name">发票抬头</span>
                <span class="order__detail__intro">{{ store?.orderData?.invoice?.status_text }}></span>
            </div>
        </div>
    </div>
    <div class="orderFoot">
        <div class="orderFoot__left">待支付￥{{ store?.orderData?.cart?.total }}</div>
        <button class="orderFoot__right">确认下单</button>
    </div>
    <Teleport to="body">
        <PopUp :show="showBlock" @closeBlock="closeBlock" />
    </Teleport>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";

.order__time {
    width: 100vw;
    height: 8rem;
    background-color: #fff;
    margin-top: 1rem;
    @include displayFlex();
    padding: 0 0.8rem;
    border-left: 0.1875rem solid $commonColor;
    .order__time__title {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .order__time__content {
        @include displayFlex(end, center, column);
        .time__content__firstLine {
            color: $commonColor;
            font-size: 1rem;
        }
        .time__content__secondLine {
            .time__content__company {
                margin-top: 0.3rem;
                display: block;
                background-color: $commonColor;
                height: 2rem;
                line-height: 2rem;
                border-radius: 0.5rem;
                color: #fff;
                font-size: 1rem;
            }
        }
    }
}
.order__pay {
    background-color: #fff;
    margin-top: 1.5rem;
    height: 8rem;
    width: 100vw;
    padding: 0 1rem;
    .order__pay__way {
        height: 5rem;
        line-height: 5rem;
        font-weight: bold;
        @include displayFlex();
    }
    .order__pay__redBag {
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        @include displayFlex();
    }
}
.order__detail {
    background-color: #fff;
    margin-top: 2rem;
    padding: 0 0.3rem;
    .order__detail__storeInfo {
        height: 3rem;
        line-height: 3rem;
        font-size: 1.2rem;
        border-bottom: 0.0625rem solid #a79e9e21;
    }
    .order__detail__bars {
        border-bottom: 0.125rem solid #a79e9e21;
        .order__detail__bar {
            @include detailBar();
            .order__detail__name {
                width: 60vw;
            }
            .order__detail__num {
                width: 15vw;
                text-align: center;
                color: $priceColor;
            }
            .order__detail__money {
                width: 25vw;
                text-align: center;
            }
        }
    }
    .order__detail__fee {
        .order__detail__bar {
            @include detailBar();
            .order__detail__name {
                width: 60vw;
            }
            .order__detail__money {
                width: 25vw;
                text-align: center;
            }
        }
    }
}
.order__detail__totalFee {
    margin-top: 0.3rem;
    box-sizing: border-box;

    .order__detail__bar {
        @include detailBar();
        .order__detail__needpay {
            padding-left: 1vw;
        }
        .order__detail__unpay {
            padding-right: 3vw;
            text-align: center;
            color: $priceColor;
        }
    }
}
.order__detail__requests {
    margin-bottom: 5rem;
    .order__detail__bar {
        @include detailBar();
        padding: 0 0.5rem;
    }
}
.orderFoot {
    height: 3rem;
    width: 100vw;
    background-color: black;
    position: fixed;
    bottom: 0;
    @include displayFlex();
    line-height: 3rem;
    .orderFoot__left {
        color: #fff;
        width: 70vw;
        padding-left: 0.5rem;
    }
    .orderFoot__right {
        @include button();
    }
}
</style>

<script setup>
import { ref } from 'vue';
import instance from '../../config/fetchData';
import AddAddressBlock from '../../components/AddAddressBlock.vue';
import PopUp from '../../components/PopUp.vue';
import { useStore } from '../../store/index'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()

const currentShopId = store.currentShopId
const itemsObj = store.itemsObj[currentShopId]
const arr = []
for (let foodId in itemsObj) {
    const foodObj = itemsObj[foodId]
    for (let itemId in foodObj) {
        const item = foodObj[itemId]
        arr.push({
            attrs: item.attrs || [],
            extra: item.extra || {},
            id: item.foodId,
            name: item.name,
            packing_fee: item.packing_fee,
            price: item.price,
            quantity: item.quantity,
            sku_id: item.sku_id,
            specs: [item.specs],
            stock: item.stock
        })
    }

}
instance.post('/v1/carts/checkout', {
    geohash: store.addressData.geohash,
    restaurant_id: currentShopId,
    entities: [arr]
}).then(data => {
    store.getOrderData(data)
}).catch(err => {
    console.error(err)
}) 

const goReMark = () => {
    router.push({ name: 'remark' })
}

// 展示payment block
const useShowBlock = () => {
    let showBlock = ref(false)
    const openBlock = () => {
        showBlock.value = true
    }
    const closeBlock = () => {
        showBlock.value = false
    }
    return {
        showBlock,
        openBlock,
        closeBlock
    }
}
const {
    showBlock,
    openBlock,
    closeBlock
} = useShowBlock()
</script>