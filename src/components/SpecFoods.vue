<template>
    <div class="mask">
        <div class="SpecFoods">
            <div class="SpecFoods__title">
                <h1 class="SpecFoods__title__content">{{ specArrs[0].name }}</h1>
                <span class="SpecFoods__title__close" @click="closeSpec">x</span>
            </div>
            <div class="SpecFoods__content">
                <div class="SpecFoods__content__name">规格</div>
                <div
                    class="SpecFoods__content__options"
                    :class="{ 'SpecFoods__content__options--isChosed': isChoosed === index }"
                    v-for="(specItem, index) in specArrs"
                    @click="chooseSpec(index, specItem)"
                >{{ specItem.specs[0].value }}</div>
            </div>
            <div class="SpecFoods__addCart">
                <div class="SpecFoods__addCart__price">￥{{ price }}</div>
                <button
                    class="SpecFoods__addCart__pushForm"
                    @click="addCart({
                        operator: '+',
                        firstIndex: classId,
                        secondIndex: foodId,
                        specIndex: isChoosed
                    })"
                >添加至购物车</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/mixin.scss";
.mask {
    width: 100%;
    height: 100%;
    background-color: blue;
    .SpecFoods {
        // width: 18rem;
        width: 80%;
        height: 12rem;
        background-color: #fff;
        z-index: 300;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.3rem;
        .SpecFoods__title {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.2rem;
            background-color: $commonGray;
            @include displayFlex(center, center);
            .SpecFoods__title__content {
                width: 90%;
                text-align: center;
            }
            .SpecFoods__title__close {
                width: 10%;
                text-align: center;
                font-size: 1.3rem;
            }
        }
        .SpecFoods__content {
            height: 7rem;
            background-color: #fff;
            padding: 0.2rem 0.5rem;
            overflow-y: scroll;
            .SpecFoods__content__name {
                height: 1rem;
                line-height: 1rem;
                font-size: 1rem;
                margin-bottom: 0.3rem;
            }
            .SpecFoods__content__options {
                width: 4rem;
                height: 2.5rem;
                border: 0.125rem solid $commonGray;
                line-height: 2.5rem;
                text-align: center;
                font-size: 1.2rem;
                float: left;
                margin-left: 0.1875rem;
                margin-top: 0.125rem;
            }
            .SpecFoods__content__options--isChosed {
                border-color: $commonColor;
            }
        }
        .SpecFoods__addCart {
            height: 2rem;
            background-color: $commonGray;
            line-height: 2rem;
            @include displayFlex();
            .SpecFoods__addCart__price {
                font-size: 1.2rem;
                color: $priceColor;
            }
            .SpecFoods__addCart__pushForm {
                @include button();
                height: 2rem;
                width: 40%;
                line-height: 2rem;
                font-size: 0.7rem;
            }
        }
    }
}
</style>

<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import changeNum from '../utils/addItem';
const store = useStore()
const emit = defineEmits(['closeSpec'])

// 获得相关id以及spec数组
const useGetSpecArr = () => {
    const classId = store.specObj.classId
    const foodId = store.specObj.foodId
    const specArrs = store.storeInfoData[classId].foods[foodId].specfoods
    return {
        classId,
        foodId,
        specArrs
    }
}
const {
    classId,
    foodId,
    specArrs
} = useGetSpecArr()

// 展示spec卡片中的相关信息
const showCartDetail = () => {
    let price = ref(
        specArrs[0].price
    )
    let spec = ref(
        specArrs[0].value
    )
    return {
        spec,
        price
    }
}
const {
    spec,
    price
} = showCartDetail()


// 选择某个option
const useChooseOption = () => {
    let isChoosed = ref(0)
    const chooseSpec = (index, specItem) => {
        isChoosed.value = index
        price.value = specItem.price
        spec.value = specArrs[index].specs[0].value
    }
    return {
        isChoosed,
        chooseSpec
    }
}
const {
    isChoosed,
    chooseSpec
} = useChooseOption()


//关闭spec框
const closeSpec = () => {
    emit('closeSpec')
}

//加入购物车
const addCart = ({
    operator,
    firstIndex,
    secondIndex,
    specIndex
}) => {
    changeNum({
        operator,
        firstIndex,
        secondIndex,
        spec: specIndex
    })
    closeSpec()
}
</script>