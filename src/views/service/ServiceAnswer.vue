<template>
    <div class="answer">{{answer}}</div>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { getService } from '../../service/getData'
const route = useRoute()
//得到问答内容
let answer = ref('')
const useQAContentsEffect = () => {
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
        getQA
    }
}
const {
    getQA
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