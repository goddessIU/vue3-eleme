<template>
    <!-- 首页店铺部分 -->
    <vue-simple-spinner size="medium" v-show="store.showLoading" />
    <div class="recommend">
        <h1 class="recommend__title">——商家——</h1>
        <div class="recommend__options">
            <div class="recommend__sort">
                <div class="recommend__sort__currentOption" @click="changeShowOptionsValue">
                    {{ optionsArr[curIndex] }}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sort-down" />
                    </svg>
                    <div class="recommend__sort__sortOptions" v-if="showOptionsValue">
                        <div
                            class="recommend__sort__option"
                            v-for="(option, index) in optionsArr"
                            @click="chooseOption(index)"
                        >{{ option }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend__stores" v-if="store?.storesData?.status !== 0">
            <Store
                v-for="(storeData, index) in store.storesData"
                :key="index"
                :store-data="storeData"
                :index="index"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../style/mixin.scss";
.recommend {
    margin-top: 10vw;
    margin-bottom: 5rem;
    .recommend__title {
        font-size: 1.125rem;
        text-align: center;
        font-weight: bold;
    }
    .recommend__options {
        @include displayFlex(center, center);
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        .recommend__sort {
            width: 80vw;

            .recommend__sort__currentOption {
                height: 3rem;
                line-height: 3rem;
                position: relative;
                width: 50vw;
                font-size: 1rem;
                min-width: 50vw;
                left: 0;
                .recommend__sort__sortOptions {
                    position: absolute;
                    top: 2.5rem;
                    background-color: #fff;
                    border: 0.125rem solid $commonGray;
                    height: 9rem;
                    overflow-y: scroll;
                    .recommend__sort__option {
                        width: 50vw;
                        height: 3rem;
                        line-height: 3rem;
                    }
                }
            }
        }
        .recommend__filter {
            width: 20vw;
        }
    }
    .recommend__stores {
        overflow: hidden;
        overflow-y: scroll;
    }
}
</style>

<script setup>
import { useStore } from '../store';
import { ref } from 'vue';
import { getRecommend } from '../service/getData'
import Store from './Store.vue';

const store = useStore()

//展示排序选项框
const useShowOption = () => {
    let showOptionsValue = ref(false)

    const changeShowOptionsValue = () => {
        showOptionsValue.value = !showOptionsValue.value
    }

    return {
        showOptionsValue,
        changeShowOptionsValue
    }
}
const {
    showOptionsValue,
    changeShowOptionsValue
} = useShowOption()

//选择option之后进行相应逻辑功能
const useChooseOption = () => {
    
    let optionsArr = ref(['按起送价排序', '按配送速度排序', '按评分排序', '综合排序', '按距离排序', '按销量排序', '综合排序'])
    let curIndex = ref(3)

    const chooseOption = async (index, offset = 0) => {
        store.openLoading()
        curIndex.value = index
        await getRecommend(index + 1, offset)
        showOptionsValue.value = false
        store.closeLoading()
    }

    return {
        optionsArr,
        curIndex,
        chooseOption
    }
}
const {
    optionsArr,
    curIndex,
    chooseOption
} = useChooseOption()
</script>