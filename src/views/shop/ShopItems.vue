<template>
    <div>
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
            <div class="right__item" v-for="(item1, index) in store.storeInfoData" :key="index">
                <div class="right__item__title1">{{ item1.name }}</div>
                <div class="right__item__contents" v-for="(item2, index) in item1.foods">
                    <div class="right__item__content">
                        <div class="right__content__img">
                            <img src="../../assets/images/icon.png" alt />
                        </div>
                        <div class="right__content__intro">
                            <h1 class="right__content__title">{{ item2.name }}</h1>
                            <p
                                class="right__content__detail"
                            >月售{{ item2.month_sales }}份&nbsp;好评率{{ item2.satisfy_rate }}%</p>
                            <p class="right__content_price">￥{{ item2.specfoods[0].price }}</p>
                            <div class="right__content__controlNum">
                                <div class="right__controlNum__subtract">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-Subtract" />
                                    </svg>
                                </div>
                                <div class="right__controlNum__showNum">1</div>
                                <div class="right__controlNum__add">
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
import { onMounted, ref, toRaw, watch, readonly } from 'vue';
import { useStore } from '../../store/index'
import _ from 'lodash'
import ShopCart from '../../components/ShopCart.vue';
const store = useStore()
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



</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.left {
    width: 30vw;
    background-color: $commonGray;
    overflow-y: scroll;
    height: calc(100% - 11rem);

    overflow-x: hidden;

    position: absolute;
    top: 9rem;
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
                }
            }
        }
    }
}
</style>