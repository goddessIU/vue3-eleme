//用来返回页面滚动距离，服务于顶部吸附功能
const getScrollTop = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    return scrollTop
}

export default getScrollTop