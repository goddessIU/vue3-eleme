<template>
    <div class="store" @click="goStoreIndex">
        <div class="store__img">
            <img :src="`https://elm.cangdu.org/img/${storeData.image_path}`" onerror="this.classList.add('store__img__onerror')">
        </div>
        <div class="store__intro">
            <h1 class="store__title">{{storeData.name}}</h1>
            <div class="store__rate">评分：{{storeData.rating}}  月售{{storeData.recent_order_num}}单</div>
            <div class="store__service">{{storeData?.piecewise_agent_fee?.tips}} {{storeData.distance}}|{{storeData.order_lead_time}}</div>
            <!-- <div class="store__activity">
                <span>活动</span>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const props = defineProps(['storeData', 'index'])
const store = useStore()
const router = useRouter()

//点击之后去往store商家页面需要处理的逻辑
const goStoreIndex = () => {
    store.currentShopIndex = props.index
    store.currentShopId = props.storeData.id

    router.push({
        name: 'shopIndex',
        query: {
            shopId: props.storeData.id
        }
    })
}
</script>

<style scoped lang="scss">
.store {
    overflow-y: scroll;
    width: 100vw;
    min-height: 30vw;
    display: flex;
    box-sizing: border-box;
    border-bottom: .0625rem solid rgb(224, 224, 224);
    margin-top: .3125rem;
    .store__img {
        width: 30vw;
        height: 30vw;
        margin-right: 5vw;
        text-align: center;
        padding-top: 5vw;
        box-sizing: border-box;
        img {
            width: 20vw;
            height: 20vw;
        }
        .store__img__onerror {
            background: url(../assets/images/userIcon.png) no-repeat center;
            background-size: contain;
        }
    }
    .store__intro {
        .store__title {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .store__rate, .store__service, .store__activity {
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }
    }
}
</style>