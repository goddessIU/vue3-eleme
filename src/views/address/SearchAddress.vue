<template>
    <!-- 地址页面中搜索部分 -->
    <div class="searchAddress">
        <div class="searchAddress__options">
            北京
            <svg class="icon headTop__address__down" aria-hidden="true">
                <use xlink:href="#icon-down" />
            </svg>
        </div>
        <div class="searchAddress__input">
            <input type="text" placeholder="请输入地址" @input="toSearch" v-model="keyword" />
        </div>
    </div>
    <div class="searchInfo" :class="{ 'position--absolute': props.isSticky }">
        <!-- 搜索时让下面html内容为absolute浮动在最上面，盖住下面 -->
        <SearchBar
            v-show="showBar"
            v-for="(item, index) in searchData"
            :key="index"
            :name="item.name"
            :address="item.address"
            :latitude="item.latitude"
            :longitude="item.longitude"
            :keyword="keyword"
        />
        <div class="noAddress" v-show="showBar">
            <h3 class="noAddress__tile">找不到地址？</h3>
            <p class="noAddress__content">请尝试只输入小区、写字楼或学校名</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import instance from '../../config/fetchData';
import _ from 'lodash';
import { useStore } from '../../store';
import SearchBar from './SearchBar.vue';
//用于输入地址，获取本城市该地址信息
const props = defineProps(['isSticky'])
const useSearchEffect = () => {
    const store = useStore()
    let keyword = ref('')
    let searchData = ref([])
    let showBar = ref(false)
    const getSearchInfo = async () => {
        if (!keyword.value) {
            showBar.value = false
            return
        }
        searchData.value = await instance.get(`/v1/pois?city_id=${store.cityData.id}&keyword=${keyword.value}&type=search`)
        showBar.value = true
        console.log(searchData.value)
    }
    const toSearch = _.debounce(getSearchInfo, 500)

    return {
        toSearch,
        keyword,
        store,
        searchData,
        showBar
    }
}

const {
    toSearch,
    keyword,
    searchData,
    showBar
} = useSearchEffect()
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.searchAddress {
    width: 100vw;
    height: 3rem;
    background-color: $bgColor;
    @include displayFlex();
    .searchAddress__options {
        height: 3rem;
        line-height: 3rem;
        width: 30vw;
        text-align: center;
        font-size: 1rem;
        color: $fontColor;
    }
    .searchAddress__input {
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        width: 70vw;
        box-sizing: border-box;
        input {
            width: 80%;
            height: 2rem;
            outline: none;
            background-color: $commonGray;
            border: none;
            padding-left: 0.625rem;
        }
    }
}
.searchInfo {
    background-color: $bgColor;
    .noAddress {
        height: 5rem;
        width: 100vw;
        text-align: center;
        color: $fontBlackColor;
        margin-bottom: 5rem;
        .noAddress__tile {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.125rem;
        }
        .noAddress__content {
            height: 2rem;
            font-size: 1rem;
        }
    }
}
.position--absolute {
    position: absolute;
    z-index: 1;
}
</style>