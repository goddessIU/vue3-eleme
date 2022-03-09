import { defineStore } from 'pinia'
// import { get, set } from '../config/storage'
export const useStore = defineStore('index', {
    state: () => {
        return {
            addressData: {},
            storesData: {},
            cityData: {},
            storeInfoData: {},
            currentStoreData: {},
            currentShopIndex: undefined,
            storageShop: {},
            specObj: {}
        }
    },
    actions: {

    },
    getters: {

    }
})