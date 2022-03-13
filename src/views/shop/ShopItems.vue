<template>
    <div class="ScrollComponent" @click="closeShowSpec">
        <SpecFoods v-if="showSpec" class="specFoods" @closeSpec="showSpec = !showSpec" />
        <!-- 实现左右联动滚动 -->
        <div class="left" ref="leftWrapper">
            <div
                class="left__item"
                v-for="(item, index) in store.storeInfoData"
                :key="index"
                :class="{ 'left__item--isChosed': choosedIndex === index }"
                @click="clickLeftScrollRight(index)"
            >{{ item.name }}</div>
        </div>
        <div class="right" ref="rightWrapper" @scroll="bindScrollEvent">
            <div
                class="right__item"
                v-for="(item1, firstIndex) in store.storeInfoData"
                :key="firstIndex"
            >
                <div class="right__item__title1">{{ item1.name }}</div>
                <div
                    class="right__item__contents"
                    v-for="(item2, secondIndex) in item1.foods"
                    :key="secondIndex"
                >
                    <div class="right__item__content">
                        <div class="right__content__img">
                            <img :src="`https://elm.cangdu.org/img/${item2.image_path}`" alt />
                        </div>
                        <div class="right__content__intro">
                            <h1 class="right__content__title">{{ item2.name }}</h1>
                            <p
                                class="right__content__detail"
                            >月售{{ item2.month_sales }}份&nbsp;好评率{{ item2.satisfy_rate }}%</p>
                            <p class="right__content_price">￥{{ item2.specfoods[0].price }}</p>
                            <button
                                class="right__content__spec"
                                v-if="item2.specfoods.length > 1"
                                @click="changeShowSpec(secondIndex, firstIndex)"
                            >选规格</button>
                            <!-- @blur="changeShowSpec(secondIndex, firstIndex)" -->
                            <div class="right__content__controlNum" v-else>
                                <div
                                    class="right__controlNum__subtract"
                                    @click="changeNum({ secondIndex, firstIndex, operator: '-', spec: null })"
                                    :secondIndex="secondIndex"
                                    :firstIndex="firstIndex"
                                >
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-Subtract" />
                                    </svg>
                                </div>
                                <div
                                    class="right__controlNum__showNum"
                                >{{ store.storageShop?.[item2['restaurant_id']]?.[item2['category_id']]?.[item2['item_id']]?.[item2.specfoods[0]['sku_id']]?.quantity || 0 }}</div>
                                <div
                                    class="right__controlNum__add"
                                    @click="changeNum({ secondIndex, firstIndex, operator: '+', spec: null })"
                                    :secondIndex="secondIndex"
                                    :firstIndex="firstIndex"
                                >
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-add" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ShopCart />
</template>

<script setup>
import { onMounted, ref, toRaw, watch, readonly, reactive } from 'vue';
import { useStore } from '../../store/index'
import _ from 'lodash'
import ShopCart from '../../components/ShopCart.vue';
import SpecFoods from '../../components/SpecFoods.vue'
import changeNum from '../../utils/addItem';

import {
    getAll,
} from '../../config/storage'

//当前购物车
const store = useStore()
store.storageShop = getAll('shopCart')

//左右联合滚动效果
const useScrollEffect = () => {
    //左侧整体的ref
    const leftWrapper = ref(null)
    //右侧整体的ref
    const rightWrapper = ref(null)
    //右侧每一段高度
    let rightHightArr = ref([])
    //右侧该段到最上端滚动的距离
    let rightHightSumArr = ref([])
    //左侧选中的那个
    let choosedIndex = ref(0)

    //左侧滚动效果实现
    const useLeftScroll = () => {
        //左侧点击右侧跳转
        const clickLeftScrollRight = (index) => {
            choosedIndex.value = index
            rightWrapper.value.scrollTop = rightHightSumArr.value[index - 1] * 16
        }
        return {
            clickLeftScrollRight
        }
    }
    const useRightScroll = () => {
        //得到上面两个数组
        const getRightHightArr = () => {
            const copy = readonly(store.storeInfoData)
            const storeInfoData = toRaw(copy)
            let tempArr = []
            let totalSumArr = []
            let totalSum = 0
            for (let i = 0; i < storeInfoData.length; i++) {
                let sum = 3
                sum += storeInfoData[i].foods.length * 10
                totalSum += sum
                tempArr.push(sum)
                totalSumArr.push(totalSum)
            }
            rightHightArr.value = tempArr
            rightHightSumArr.value = totalSumArr
        }

        //右侧滚动事件，以及防抖
        const scrollEvent = () => {
            const scrollTop = rightWrapper.value.scrollTop
            let scrollIndex = undefined
            if (scrollTop === 0) {
                scrollIndex = 0
            }
            scrollIndex = rightHightSumArr.value.findIndex((val, index) => {
                return (
                    scrollTop >= rightHightSumArr.value[index] * 16 &&
                    scrollTop < rightHightSumArr.value[index + 1] * 16
                )
            })
            if (scrollIndex >= 0) {
                choosedIndex.value = scrollIndex + 1
            } else {
                choosedIndex.value = 0
            }
            const leftScrollTop = leftWrapper.value.scrollTop
            const nowDis = choosedIndex.value * 5 * 16
            if (nowDis - leftScrollTop > 240) {
                leftWrapper.value.scrollTop += 80
            } else if (nowDis - leftScrollTop < 0) {
                leftWrapper.value.scrollTop -= 80
            }
        }
        const bindScrollEvent = _.debounce(scrollEvent)

        return {
            bindScrollEvent,
            getRightHightArr
        }
    }


    const { clickLeftScrollRight } = useLeftScroll()
    const {
        bindScrollEvent,
        getRightHightArr
    } = useRightScroll()

    return {
        clickLeftScrollRight,
        bindScrollEvent,
        getRightHightArr,
        leftWrapper,
        rightWrapper,
        rightHightArr,
        rightHightSumArr,
        choosedIndex
    }
}
const {
    clickLeftScrollRight,
    bindScrollEvent,
    getRightHightArr,
    leftWrapper,
    rightWrapper,
    choosedIndex
} = useScrollEffect()

onMounted(() => {
    getRightHightArr()
})

//监听store中相关数据，从而辅助滚动效果
watch(
    () => store.storeInfoData,
    () => {
        getRightHightArr()
    }
)




//打开选择规格页面
const useShowSpecEffect = () => {
    //控制变量
    let showSpec = ref(false)
    //关闭spec
    const closeShowSpec = (e) => {
        if (e.target.className === 'mask specFoods') {
            showSpec.value = !showSpec.value
        }
    }
    //改变spec是否展示
    const changeShowSpec = (secondIndex, firstIndex) => {
        showSpec.value = !showSpec.value
        const firstLayer = store.storeInfoData[firstIndex]
        //获得餐馆id
        const restaurantId = firstLayer['restaurant_id']
        const classId = firstLayer['id']
        //获取该分类下的事物列表
        const foodsArr = firstLayer['foods']
        //获取点击的事物
        const chosedFood = foodsArr[secondIndex]
        //事物Id
        const foodId = chosedFood['item_id']
        //最细致的事物id
        const foodRealId = chosedFood['specfoods'][0]['food_id']
        store.specObj = {
            classId: firstIndex,
            foodId: secondIndex
        }
    }
    return {
        changeShowSpec,
        closeShowSpec,
        showSpec
    }
}
const {
    changeShowSpec,
    closeShowSpec,
    showSpec
} = useShowSpecEffect()







</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.ScrollComponent {
    .specFoods {
        z-index: 600;
        position: absolute;
        top: 9rem;
        left: 0;
        width: 100vw;
        height: calc(100% - 9rem);
        background-color: #80808096;
    }

    .left {
        width: 30vw;
        background-color: $commonGray;
        overflow-y: scroll;
        height: calc(100% - 11rem);
        position: absolute;
        top: 9rem;
        overflow-x: hidden;

        .left__item {
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            color: $fontBlackColor;
        }
        .left__item--isChosed {
            background-color: #fff;
            font-weight: bold;
            border-left: 0.125rem solid $commonColor;
        }
    }
    .right {
        overflow-x: hidden;
        position: absolute;
        top: 9rem;
        left: 30vw;
        overflow-y: scroll;
        height: calc(100% - 11rem);
        .right__item {
            .right__item__title1 {
                width: 70vw;
                background-color: $commonGray;
                height: 3rem;
                line-height: 3rem;
                padding-left: 0.3125rem;
                font-size: 1.125rem;
                font-weight: bold;
            }
            .right__item__contents {
                .right__item__content {
                    height: 10rem;
                    width: 70vw;
                    padding: 3%;
                    box-sizing: border-box;
                    @include displayFlex(start);
                    position: relative;
                    .right__content__img {
                        width: 30%;
                        height: 50%;
                        img {
                            width: 80%;
                            height: 80%;
                        }
                    }
                    .right__content__intro {
                        width: 70%;
                        .right__content__title {
                            font-weight: bold;
                        }
                        .right__content__detail {
                            padding-top: 0.1875rem;
                            font-size: 0.875rem;
                        }
                        .right__content_price {
                            padding-top: 3.125rem;
                            font-size: 1.25rem;
                            font-weight: bold;
                            color: $priceColor;
                        }
                        .right__content__controlNum {
                            width: 5rem;
                            height: 2rem;
                            line-height: 2rem;
                            position: absolute;
                            bottom: 2rem;
                            right: 1rem;
                            @include displayFlex();
                            .right__controlNum__subtract,
                            .right__controlNum__add {
                                color: $commonColor;
                            }
                            .right__controlNum__showNum {
                                max-width: 5rem;
                                overflow: hidden;
                                @include ellipsis();
                            }
                        }
                        .right__content__spec {
                            width: 4rem;
                            height: 2rem;
                            line-height: 2rem;
                            position: absolute;
                            bottom: 2rem;
                            right: 1rem;
                            background-color: $commonColor;
                            border-radius: 0.2rem;
                            font-size: 1rem;
                            text-align: center;
                            color: #fff;
                            outline: none;
                            border: none;
                        }
                    }
                }
            }
        }
    }
}
</style>