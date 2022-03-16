<template>
    <div class="answer">{{ answer }}</div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getService } from '../../service/getData'


//得到问答内容
const useQAContentsEffect = () => {
    let answer = ref('')
    const route = useRoute()
    
    const getQA = async () => {
        let keyIndex = route.query.keyword * 2
        try {
            let data = await getService()
            let question = Object.keys(data)[keyIndex]
            answer.value = data[question]
        } catch (err) {
            console.error(err)
        }
    }

    return {
        route,
        answer,
        getQA
    }
}
const {
    route,
    getQA,
    answer
} = useQAContentsEffect()
onMounted(() => {
    getQA()
})
</script>

<style lang="scss" scoped>
.answer {
    padding: 0.5rem;
    font-size: 1.5rem;
    max-height: calc(100% - 3rem);
    overflow-y: scroll;
}
</style>