//获取某一值
const get = (module, key) => {
    let obj = getAll(module)
    return obj[key]
}
//设置某一值
const set = (module, key, val) => {
    let obj = getAll(module)
    obj[key] = val
    localStorage.setItem(module, JSON.stringify(obj))
}
//获取全部storage
const getAll = (module) => {
    if (!localStorage.getItem(module)) {
        localStorage.setItem(module, JSON.stringify({}))
    }
    return JSON.parse(localStorage.getItem(module) || '{}')
    
}
//清空storage
const clearAll = (module) => {
    localStorage.setItem(module, JSON.stringify({}))
}
//清空某一值
const del = (module, key) => {
    let obj = getAll(module)
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