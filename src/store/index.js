import { defineStore } from 'pinia'
import { get, set, getAll, del } from '../config/storage'
export const useStore = defineStore('index', {
    state: () => {
        return {
            //地质数据
            addressData: {},
            //
            storesData: {},
            //城市信息
            cityData: {},
            //店铺食物信息
            storeInfoData: {},
            //当前商店信息
            currentStoreData: {},
            //当前城市的排序
            currentShopIndex: undefined,
            //当前购物车
            storageShop: {},
            //规格选择
            specObj: {},
            //当前商店的id,因为结算是按店铺来分开算的
            currentShopId: undefined,
            //已购商品，用来展示购物车，所以去掉了中间反复嵌套的内容
            itemsObj: getAll('itemsObj') || {},
            //订单信息
            orderData: {},
            //目前增加的地址
            tempAddAddress: {
                name: '',
                phone: '',
                otherPhone: '',
                address: '',
                detailAddress: ''
            },
            //用户信息
            userData: null,
            //地址信息列表
            addressArrays: null,
            //订单地址
            finalAddress: null,
            //备注
            finalReMark: '',
            //评价分类
            evaluationTags: [],
            //评价分数
            evaluationScores: {},
            //评价信息
            evaluationMessages: [],
            //订单列表
            orderList: [],
            //订单详情
            orderDetail: {},
            //当前正在填写的地址表格数据
            curAddress: {},
            //是否展示loading
            showLoading: false
        }
    },
    actions: {
        getOrderData(data) {
            this.orderData = data
        },
        //设置用户信息
        setUserData(data) {
            this.userData = data
        },
        //支付成功，清空相关数据
        clearData() {
            let restaurant_id = this.orderData.cart.restaurant_id
            this.orderData = {}
            this.finalReMark = ''
            del('shopCart', restaurant_id)
            del('itemsObj', restaurant_id)
            delete this.itemsObj[restaurant_id]
            this.specObj = {}
            delete this.storageShop[restaurant_id]
        },
        fillCurAddress({phone, name, detailAddress, tag, sex}) {
            this.curAddress.phone = phone
            this.curAddress.name = name
            this.curAddress.detailAddress = detailAddress
            this.curAddress.tag = tag
            this.curAddress.sex = sex
        },
        closeLoading() {
            this.showLoading = false
        },
        openLoading() {
            this.showLoading = true
        }
    },
    getters: {

    }
})