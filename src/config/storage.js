const module = 'eleme'
//获取某一值
const get = (key) => {
    let obj = getAll()
    return obj[key]
}
//设置某一值
const set = (key, val) => {
    let obj = getAll()
    obj[key] = val
    localStorage.setItem(module, JSON.stringify(obj))
}
//获取全部storage
const getAll = () => {
    return JSON.parse(localStorage.getItem(module) || '{}')
    
}
//清空storage
const clearAll = () => {
    localStorage.setItem(module, JSON.stringify({}))
}
//清空某一值
const del = (key) => {
    let obj = getAll()
    delete obj[key]
    localStorage.setItem(module, JSON.stringify(obj))
}

export {
    get,
    set,
    getAll,
    clearAll,
    del
}