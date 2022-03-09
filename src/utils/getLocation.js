import instance from '.././config/fetchData'
import { set, get } from '.././config/storage.js'
import { useStore } from '../store/index.js'

//获取当前位置

const getLocation = async () => {
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
}
export default getLocation