import { ref } from "vue";
import getScrollTop from "../utils/getScrollTop";
//本函数用于实现吸附功能
//stickItem 要吸附的对象
const useSticky = (stickItem) => {
    let isSticky = ref(false)
    const useStickyEffect = () => {
        let scrollTop = getScrollTop()
        let scrollHead = undefined
        if (typeof stickItem === 'number') {
            scrollHead = stickItem
        } else if (typeof stickItem === 'string') {
            scrollHead = document.querySelector(stickItem).clientHeight
        }
        if (scrollTop > scrollHead) {
            isSticky.value = true
        } else {
            isSticky.value = false
        }
    }
    return {
        useStickyEffect,
        isSticky
    }
}

export default useSticky