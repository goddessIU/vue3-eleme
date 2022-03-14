// 获取数据
//由于samesite策略，所以使用firefox可能会没问题
import instance from '../config/fetchData'
import { set, get } from '../config/storage.js'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useStore } from '../store/index'

//获取二维码
const getCode = async () => {
    try {
        let data = await instance.post('/v1/captchas')
        return data
    } catch (err) {
        throw err
    }
}


// 重置密码
const resetPassword = async (account, oldPass, newPass, reNewPass, code) => {
    try {
        let data = await instance.post('/v2/changepassword', {
            data: {
                username: account,
                oldpassWord: oldPass,
                newpassword: newPass,
                confirmpassword: reNewPass,
                captcha_code: code
            }
        })
        return data
    } catch (err) {
        throw err
    }
}


// 登录

const goLogin = async ({ username, password, captcha_code }) => {
    console.log(typeof username, typeof password, typeof captcha_code)
    console.log(username, password, captcha_code)
    try {
        let data = await instance.post('/v2/login', {
            username,
            password,
            captcha_code
        })
        return data
    } catch (err) {
        throw err
    }
}

// 搜索框搜索
const searchKeyword = async (id, keyword) => {
    try {
        let data = await instance.get(`/v1/pois?city_id=${id}&keyword=${keyword}&type=search`)
        return data
    } catch (err) {
        throw err
    }

}



//获取当前位置
const getLocation = async () => {
    try {
        const data = await instance.get('/v1/cities?type=guess')
        const { latitude, longitude, name, id } = data
        set('eleme', 'latitude', latitude)
        set('eleme', 'longitude', longitude)
        set('eleme', 'city_name', name)
        set('eleme', 'city_id', id)
        const addressData = await instance.get(`/v2/pois/${get('eleme', 'latitude')},${get('eleme', 'longitude')}`)
        const storesData = await instance.get('/shopping/restaurants', {
            params: {
                latitude,
                longitude
            }
        })
        const store = useStore()
        store.addressData = addressData || {}
        store.storesData = storesData || {}
        store.cityData = data || {}
        return {
            addressData,
            storesData
        }
    } catch (error) {
        throw error
    }
}

//得到当前商店的全部信息
const getShopInfo = async () => {
    const route = useRoute()
    try {
        let data = await instance.get(`/shopping/v2/menu`, {
            params: {
                restaurant_id: route.query.shopId
            }
        })
        return data
    } catch (err) {
        throw err
    }
}

//提交订单
const postCheckout = async ({ geohash, restaurant_id, entities }) => {
    try {
        let data = await instance.post('/v1/carts/checkout', {
            geohash,
            restaurant_id,
            entities
        })
        return data
    } catch (err) {
        throw err
    }

}

// 获取首页商店
const getRecommend = async (index, offset) => {
    try {
        const storesData = await instance.get('/shopping/restaurants', {
            params: {
                latitude: get('eleme', 'latitude'),
                longitude: get('eleme', 'longitude'),
                order_by: index,
                offset
            }
        })
        const store = useStore()
        store.storesData = storesData || {}
        return {
            storesData
        }
    } catch (error) {
        throw error
    }
}

//获取服务中心问题列表
const getService = async () => {
    try {
        let data = await instance.get('/v3/profile/explain')
        return data
    } catch (err) {
        throw err
    }
}

//增加地址
const postAddAddress = async ({
    user_id,
    address,
    address_detail,
    geohash,
    name,
    phone,
    tag,
    sex,
    tag_type,
    phone_bk
}) => {
    try {
        let data = await instance.post(`/v1/users/${user_id}/addresses`, {
            user_id,
            address,
            address_detail,
            geohash,
            name,
            phone,
            tag,
            sex,
            tag_type,
            phone_bk
        })
        return data
    } catch (err) {
        throw err
    }
}

//获取地址信息列表
const getAddressList = async () => {
    const store = useStore()
    try {
        let data = await instance.get(`/v1/users/${store.userData.user_id}/addresses`)
        return data
    } catch (err) {
        throw err
    }
}
export { getCode, resetPassword, goLogin, searchKeyword, getLocation, getShopInfo, postCheckout, getRecommend, getService, postAddAddress, getAddressList }

