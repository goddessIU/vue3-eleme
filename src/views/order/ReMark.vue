<template>
    <div class="fastRemark">
        <h1>快速备注</h1>
        <div class="fastRemark__choices">
            <div class="fastReamark__choices__class" v-for="(options, firstIndex) in arrs">
                <span
                    v-for="(option, secondIndex) in options"
                    @click="chooseOpt(firstIndex, secondIndex)"
                    :class="{ 'click': controls[firstIndex].value === secondIndex }"
                >{{ option }}</span>
            </div>
        </div>
    </div>
    <div class="otherRemark">
        <h1>其他备注</h1>
        <div class="otherRemark__text">
            <textarea
                name
                id
                cols="30"
                rows="10"
                class="otherRemark__text__textInput"
                placeholder="请输入备注内容(可不填)"
                v-model="textContent"
            ></textarea>
        </div>
    </div>
    <button class="confirmRemark" @click="pushForm">确定</button>
</template>

<style lang="scss" scoped>
@import "../../style/config.scss";
.fastRemark {
    width: 100vw;
    height: 15rem;
    background-color: #fff;
    margin-top: 2rem;
    padding: 0.5rem;
    .fastRemark__choices {
        margin-top: 0.8rem;

        .fastReamark__choices__class {
            height: 3rem;
            line-height: 3rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            display: inline-block;
            span {
                padding: 0.3rem;
                border: 0.125rem solid #1e80ff;
            }
            .click {
                background-color: #0076ff;
                color: #fff;
            }
        }
    }
}
.otherRemark {
    width: 100vw;
    height: 10rem;
    background-color: #fff;
    margin-top: 2rem;
    padding: 0.5rem;
    .otherRemark__text {
        margin-top: 0.8rem;
        text-align: center;
        .otherRemark__text__textInput {
            width: 80%;
            height: 6rem;
            background-color: $commonGray;
            outline: none;
            border: 0.0625rem solid #eee;
            border-radius: 0.5rem;
            padding: 0.2rem 1rem;
            color: black;
            font-size: 1rem;
        }
    }
}
.confirmRemark {
    outline: none;
    border: none;
    width: 70vw;
    height: 3rem;
    display: block;
    margin: 0 auto 0 auto;
    border-radius: 2vw;
    background-color: $butColor;
    color: #fff;
    font-size: 1.2rem;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '../../store';
import xss from 'xss'
const store = useStore()
const router = useRouter()



//填写的信息
const chooseFlag = () => {
    //输入框内容
    let textContent = ref('')

    // 选择选项
    let hot = ref(-1)
    let hotArr = ref(['不要辣', '少要辣', '多要辣'])
    let ice = ref(-1)
    let iceArr = ref(['去冰', '少冰'])
    let onion = ref(-1)
    let onionArr = ref(['不要洋葱'])
    let coriander = ref(-1)
    let corianderArr = ref(['不要香菜'])
    let vinegar = ref(-1)
    let vinegarArr = ref(['多点醋'])
    let scallion = ref(-1)
    let scallionArr = ref(['多点葱'])
    let arrs = ref([
        hotArr.value,
        corianderArr.value,
        onionArr.value,
        vinegarArr.value,
        scallionArr.value,
        iceArr.value
    ])

    let controls = ref([
        hot,
        coriander,
        onion,
        vinegar,
        scallion,
        ice
    ])

    const chooseOpt = (firstIndex, secondIndex) => {
        if (controls.value[firstIndex].value === secondIndex) {
            controls.value[firstIndex].value = -1
        } else {
            controls.value[firstIndex].value = secondIndex
        }
    }

    return {
        chooseOpt,
        controls,
        arrs,
        textContent
    }
}
const {
    chooseOpt,
    controls,
    arrs,
    textContent
} = chooseFlag()


//提交表单
const pushForm = () => {
    let str = ''
    for (let i = 0; i <  controls.value.length; i++) {
        let control = controls.value[i]
        if (control.value !== -1) {
            str += arrs.value[i][control.value]
        }
    }
    str += xss(textContent.value)
    store.finalReMark = str
    router.back()
}
</script>