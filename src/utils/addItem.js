import { useStore } from "../store"
import {
    get,
    set,
    getAll
} from '../config/storage'
const store = useStore()
const changeNum = ({secondIndex, firstIndex, operator, spec = ''}) => {
    const firstLayer = store.storeInfoData[firstIndex]
    //获得餐馆id
    const restaurantId = firstLayer['restaurant_id']
    //获得餐馆分类id
    const classId = firstLayer['id']
    //获取该分类下的事物列表
    const foodsArr = firstLayer['foods']
    //获取点击的事物
    const chosedFood = foodsArr[secondIndex]
    const chosedSpecFood = chosedFood.specfoods[0]
    //事物Id
    const foodId = chosedFood['item_id']
    //最细致的事物id
    const foodRealId = chosedFood['specfoods'][0]['food_id']
    let storageShop = get('shopCart', restaurantId)
    if (!storageShop) {
        storageShop = {}
    }
    if (!storageShop[classId]) {
        storageShop[classId] = {}
    }
    if (!storageShop[classId][foodId]) {
        storageShop[classId][foodId] = {}
    }
    if (!storageShop[classId][foodId][foodRealId]) {
        storageShop[classId][foodId][foodRealId] = {
            quantity: 0
        }
    }
    const foodObj = storageShop[classId][foodId][foodRealId]
    if (operator === '+') {
        foodObj.quantity++
        if (foodObj.quantity >= 100 && chosedSpecFood.stock) {
            foodObj.quantity = 100
        }
    } else if (operator === '-') {
        foodObj.quantity--
        if (foodObj.quantity < 0) {
            foodObj.quantity = 0
        }
    }
    foodObj.attrs = chosedFood.attrs || []
    foodObj.extra = chosedFood.extra || {}
    foodObj.id = foodRealId
    foodObj.name = chosedSpecFood.name
    foodObj['packing_fee'] = chosedSpecFood['packing_fee']
    foodObj.price = chosedSpecFood.price
    foodObj['sku_id'] = chosedFood['sku_id']
    foodObj['stock'] = chosedFood['stock']
    if (!foodObj.specs || (foodObj.specs.length === 1 && foodObj.specs[0] === '')) {
        foodObj.specs = []
    } 
    foodObj.specs.push(spec)
    set('shopCart', restaurantId, storageShop)
    store.storageShop = getAll('shopCart')
    console.log(foodObj)
}

export default changeNum