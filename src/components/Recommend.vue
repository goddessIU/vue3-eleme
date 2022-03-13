<template>
    <!-- 首页店铺部分 -->
    <div class="recommend">
        <h1 class="recommend__title">——推荐商家——</h1>
        <div class="recommend__options">
            <div class="recommend__sort">
                <div class="recommend__sort__currentOption" @click="changeShowOptionsValue">
                    {{optionsArr[curIndex]}}
                    <svg class="icon" aria-hidden="true" >
                        <use xlink:href="#icon-sort-down" />
                    </svg>
                    <div class="recommend__sort__sortOptions" v-if="showOptionsValue">
                        <div class="recommend__sort__option" v-for="(option, index) in optionsArr" @click="chooseOption(index)">{{option}}</div>
                    </div>
                </div>
                
            </div>
            <!-- <div class="recommend__filter">
                筛选
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-filter" />
                </svg>
            </div> -->
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
                width: 40vw;
                margin-left: 30vw;
                .recommend__sort__sortOptions {
                position: absolute;
                top: 2.5rem;
                left: -12vw;
                background-color: #fff;
                border: .125rem solid $commonGray;
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
import Store from './Store.vue';
import { useStore } from '../store';
import { onMounted, onUnmounted, ref } from 'vue';
import { getRecommend } from '../service/getData'
const store = useStore()
let showOptionsValue = ref(false)
const changeShowOptionsValue = () => {
    showOptionsValue.value = !showOptionsValue.value
}
let optionsArr = ref(['按起送价排序', '按配送速度排序', '按评分排序', '综合排序', '按距离排序', '按销量排序', '综合排序'])
let curIndex = ref(3)
const chooseOption = async (index, offset = 0) => {
    curIndex.value = index
    await getRecommend(index + 1, offset)
    showOptionsValue.value = false
}
</script>