<template>
    <!-- 地址页面中搜索部分 -->
    <div class="searchAddress">
        <div class="searchAddress__input">
            <input type="text" placeholder="请输入地址" @input="toSearch" v-model="keyword" />
        </div>
        <div class="searchAddress__info">输入地址</div>
    </div>

    <div class="searchInfo" :class="{ 'position--absolute': props.isSticky }">
        <!-- 搜索时让下面html内容为absolute浮动在最上面，盖住下面 -->
        <SearchBar
            v-if="showBar"
            v-for="(item, index) in searchData"
            :key="index"
            :name="item.name"
            :address="item.address"
            :latitude="item.latitude"
            :longitude="item.longitude"
            :keyword="keyword"
            @click="pushAddress(index)"
        />
        <div class="noAddress" v-show="showBar">
            <h3 class="noAddress__tile">找不到地址？</h3>
            <p class="noAddress__content">请尝试只输入小区、写字楼或学校名</p>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import _ from 'lodash';
import { useStore } from '../../store';
import SearchBar from '../address/SearchBar.vue';
import { searchKeyword } from '../../service/getData'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()

//用于输入地址，获取本城市该地址信息
const props = defineProps(['isSticky'])
const useSearchEffect = () => {
    const store = useStore()
    let keyword = ref('')
    let searchData = ref([])
    let showBar = ref(false)
    const getSearchInfo = async () => {
        try {
            if (keyword.value === '') {
                showBar.value = false
                return;
            }
            let data = await searchKeyword(store.cityData.id, keyword.value)
            if (data.name === "ERROR_GET_POSITION") {
                throw new Error('请求失败')
            }
            searchData.value = data
            showBar.value = true
        } catch (err) {
            console.error(err)
        }
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
    showBar,
    store
} = useSearchEffect()

const pushAddress = (index) => {
    const val = searchData?.value?.[index]?.name
    store.tempAddAddress.address = val
    router.back()
}
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.searchAddress {
    width: 100vw;
    height: 3rem;
    background-color: $bgColor;
    @include displayFlex();
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
    .searchAddress__info {
        @include button();
        width: 30vw;
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