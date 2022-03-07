import instance from '.././config/fetchData'
import { set, get } from '.././config/storage.js'
import { useStore } from '../store/index.js'

const getLocation = async () => {
    const data = await instance.get('/v1/cities?type=guess')
    const { latitude, longitude, name, id } = data
    set('latitude', latitude)
    set('longitude', longitude)
    set('city_name', name)
    set('city_id', id)
    const addressData = await instance.get(`/v2/pois/${get('latitude')},${get('longitude')}`)
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