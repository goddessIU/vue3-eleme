import { ref } from "vue";
//本函数用于实现吸附功能
//stickItem 要吸附的对象
const useSticky = (stickItem) => {
    let isSticky = ref(false)
    const useStickyEffect = () => {
        const scrollHead = document.querySelector(stickItem).clientHeight
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= scrollHead) {
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