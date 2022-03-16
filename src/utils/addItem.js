import { useStore } from "../store"
import {
    get,
    set,
    getAll
} from '../config/storage'

//购买物品
const store = useStore()
const changeNum = ({secondIndex, firstIndex, operator, spec}) => {
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
    //规格事物列表
    const specFoods = chosedFood['specfoods']
    //具体规格的id和信息
    let skuId = undefined
    let skuname = ''
    let stock = undefined


    if (spec === null) {
        skuId = specFoods[0]['sku_id']
        stock = specFoods[0]['stock']
    } else {
        skuId = specFoods[spec]['sku_id']
        stock  = specFoods[spec]['stock']
        skuname = specFoods[spec].specs[0].value
    }


    //创建对象
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
    if (!storageShop[classId][foodId][skuId]) {
        storageShop[classId][foodId][skuId] = {
            quantity: 0,
            specs: skuname,
            sku_id: skuId,
            stock,
            restaurantId,
            foodId,
            classId,
            secondIndex,
            firstIndex,//循环中两个变量，用来确定具体id
            specIndex: spec //用来确定spec
            //因为后端数据嵌套过于复杂， 所以保留这些数据， 由itemsObj可以更好的取得数据
        }
    }
    
    const foodObj = storageShop[classId][foodId][skuId]
    if (operator === '+') {
        foodObj.quantity++
        if (foodObj.quantity >= 100 && chosedSpecFood.stock) {
            foodObj.quantity = 100
        }
    } else if (operator === '-') {
        foodObj.quantity--
        if (foodObj.quantity <= 0) {
            foodObj.quantity = 0
        }
    }

    foodObj.attrs = chosedFood.attrs || []
    foodObj.extra = chosedFood.extra || {}
    foodObj.name = chosedSpecFood.name
    foodObj['packing_fee'] = chosedSpecFood['packing_fee']
    foodObj.price = chosedSpecFood.price
    const itemsObj = getAll('itemsObj')

    if (!itemsObj[restaurantId]) {
        itemsObj[restaurantId] = {}
    }
    if (!itemsObj[restaurantId][foodId]) {
        itemsObj[restaurantId][foodId] = {}
    }
    itemsObj[restaurantId][foodId][skuId] = foodObj
    set('itemsObj', restaurantId, itemsObj[restaurantId])
    set('shopCart', restaurantId, storageShop)
    store.storageShop = getAll('shopCart')
    store.itemsObj = getAll('itemsObj')
}

export default changeNum