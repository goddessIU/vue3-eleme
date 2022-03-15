<template>
    <div class="scoreBlock">
        <div class="scoreBlock__totalScore">
            <span class="scoreBlock__totalScore__num">{{ overallScore }}</span>
            <span class="scoreBlock__totalScore__title">综合评价</span>
            <span class="scoreBlock__totalScore__around">高于周边{{ highOthers }}%</span>
        </div>
        <div class="scoreBlock__detailScore">
            <span>
                服务态度：<span class="scoreBlock__detailScore__num">{{store?.evaluationScores?.service_score.toFixed(1)}}</span>
            </span>
            <span>
                菜品评价：<span class="scoreBlock__detailScore__num">{{store?.evaluationScores?.food_score.toFixed(1)}}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../../store';
import { getEvaluationsTags, getEvaluationsScores, getEvaluationsMessages } from '../../service/getData'
import { onMounted, computed } from 'vue';
const store = useStore()
const useGetEvaluations = async () => {
    try {
        let data = await getEvaluationsTags()
        store.evaluationTags = data
        let scoreData = await getEvaluationsScores()
        store.evaluationScores = scoreData
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


//整体分数
const overallScore = computed(() => {
    return  store.evaluationScores?.overall_score?.toFixed?.(1)
})
const highOthers = computed(() => {
    return (store?.evaluationScores?.compare_rating * 100).toFixed(2)
})
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