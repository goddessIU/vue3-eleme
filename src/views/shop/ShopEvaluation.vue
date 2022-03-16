<template>
    <vue-simple-spinner size="medium" v-show="store.showLoading" />
    <div class="scoreBlock">
        
        <div class="scoreBlock__totalScore">
            <span class="scoreBlock__totalScore__num">{{ overallScore }}</span>
            <span class="scoreBlock__totalScore__title">综合评价</span>
            <span class="scoreBlock__totalScore__around">高于周边{{ highOthers }}%</span>
        </div>
        <div class="scoreBlock__detailScore">
            <span>
                服务态度：
                <span class="scoreBlock__detailScore__num">{{
                serviceScore }}</span>
            </span>
            <span>
                菜品评价：
                <span class="scoreBlock__detailScore__num">{{foodScore }}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../../store';
import { onMounted, computed } from 'vue';
import { getEvaluationsTags, getEvaluationsScores, getEvaluationsMessages } from '../../service/getData'

const store = useStore()
const useGetEvaluations = async () => {
    try {
        store.openLoading()
        let data = await getEvaluationsTags()
        store.evaluationTags = data
        let scoreData = await getEvaluationsScores()
        store.evaluationScores = scoreData
        store.closeLoading()
        let messageData = await getEvaluationsMessages({
            tag_name: '全部',
            offset: 0,
            limit: 10
        })
        store.evaluationMessages = messageData
        
    } catch (err) {
        console.error(err)
    }

}
onMounted(() => {
    useGetEvaluations()
})

//计算相关展示分数
const computedScore = () => {
    //分数
    const overallScore = computed(() => {
        return store.evaluationScores?.overall_score?.toFixed?.(1)
    })
    const highOthers = computed(() => {
        return (store?.evaluationScores?.compare_rating * 100).toFixed(2)
    })
    const serviceScore = computed(() => {
        if (store?.evaluationScores?.service_score) {
            return store?.evaluationScores?.service_score.toFixed(1) 
        } 
        return 0
    })
    const foodScore = computed(() => {
        if (store?.evaluationScores?.food_score) {
            return store?.evaluationScores?.food_score.toFixed(1)
        }
        return 0
    })

    return {
        overallScore,
        highOthers,
        serviceScore,
        foodScore
    }
}
const {
    overallScore,
    highOthers,
    serviceScore,
    foodScore
} = computedScore()
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
@import "../../style/config.scss";
.scoreBlock {
    width: 100vw;
    height: 8rem;
    background-color: #fff;
    @include displayFlex();
    .scoreBlock__totalScore {
        @include displayFlex(center, space-around, column);
        width: 40vw;
        height: 8rem;
        .scoreBlock__totalScore__num {
            color: $priceColor;
            font-size: 1.8rem;
            height: 3rem;
            line-height: 3rem;
        }
        .scoreBlock__totalScore__title {
            height: 2rem;
            font-size: 1.5rem;
        }
        .scoreBlock__totalScore__around {
            height: 2rem;
            font-size: 0.8rem;
        }
    }
    .scoreBlock__detailScore {
        width: 60vw;
        @include displayFlex(center, space-between, column);
        .scoreBlock__detailScore__num {
            color: $priceColor;
        }
    }
}
</style>