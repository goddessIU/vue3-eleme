// 获取数据
import instance from '../config/fetchData'
import { set, get } from '../config/storage.js'
import { useStore } from '../store/index'
import { useRoute } from 'vue-router'

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

export { getCode, resetPassword, goLogin, searchKeyword, getLocation, getShopInfo, postCheckout, getRecommend }

