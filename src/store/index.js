import { defineStore } from 'pinia'
import { get, set, getAll } from '../config/storage'
export const useStore = defineStore('index', {
    state: () => {
        return {
            //地质数据
            addressData: {},
            //
            storesData: {},
            //城市信息
            cityData: {},
            //
            storeInfoData: {},
            //当前商店信息
            currentStoreData: {},
            //当前城市的排序
            currentShopIndex: undefined,
            //当前购物车
            storageShop: {},
            specObj: {},
            //当前商店的id,因为结算是按店铺来分开算的
            currentShopId: undefined,
            //已购商品，用来展示购物车，所以去掉了中间反复嵌套的内容
            itemsObj: getAll('itemsObj') || {}
        }
    },
    actions: {
    },
    getters: {

    }
})