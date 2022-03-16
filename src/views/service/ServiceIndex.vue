<template>
    <div class="service">
        <div class="serviceMan">
            <a class="serviceMan__text" href="https://ecs-im.ele.me/">
                <div class="serviceMan__icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-service" />
                    </svg>
                </div>
                <div class="serviceMan__content">短信客服</div>
            </a>
            <a class="serviceMan__call" href="tel:10105757">
                <div class="serviceMan__icon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-call" />
                    </svg>
                </div>
                <div class="serviceMan__content">电话客服</div>
            </a>
        </div>
        <div class="serviceQuestions">
            <div class="serviceQuestions__title">热门问题</div>
            <div
                class="serviceQuestions__content"
                v-for="(quest, index) in QAContents"
                @click="goAnswer(index)"
            >
                <span>{{ quest }}</span>
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-right" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getService } from '../../service/getData'

//得到问答内容
const useQAContentsEffect = () => {
    let QAContents = ref([])
    const getQA = async () => {
        try {
            let data = await getService()
            QAContents.value = []
            for (let key in data) {
                if (key.includes('Caption')) {
                    QAContents.value.push(data[key])
                }
            }
        } catch (err) {
            console.error(err)
        }

    }
    return {
        QAContents,
        getQA
    }
}
const {
    QAContents,
    getQA
} = useQAContentsEffect()
onMounted(() => {
    getQA()
})

//处理路由相关
const useRouterEffect = () => {
    const router = useRouter()
    const goAnswer = (index) => {
        router.push({
            name: 'serviceAnswer',
            query: {
                keyword: `${index}`
            }
        })
    }

    return {
        router,
        goAnswer
    }
}
const {
    router,
    goAnswer
} = useRouterEffect()

</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
@import "../../style/mixin.scss";
.service {
    max-height: calc(100% - 3rem);
    overflow-y: scroll;
    .serviceMan {
        width: 100vw;
        height: 8rem;
        background-color: #fff;
        @include displayFlex();
        .serviceMan__text,
        .serviceMan__call {
            width: 50vw;
            text-align: center;
            height: 8rem;
            line-height: 15rem;
            @include displayFlex(center, start, column);
            text-decoration: none;
            .serviceMan__icon {
                font-size: 3rem;
                height: 5rem;
                line-height: 5rem;
            }
            .serviceMan__content {
                font-size: 1.2rem;
                height: 3rem;
                line-height: 3rem;
            }
        }
        .serviceMan__text {
            color: #f3a618;
        }
        .serviceMan__call {
            color: #20ff008c;
        }
    }

    .serviceQuestions {
        margin-top: 2rem;

        .serviceQuestions__title {
            padding: 0 0.3rem;
            @include detailBar(3rem, 3rem);
            background-color: #fff;
            font-size: 1.2rem;
            color: $fontBlackColor;
        }
        .serviceQuestions__content {
            padding: 0 0.3rem;
            @include detailBar(2rem, 2rem);
            background-color: #fff;
            font-size: 1.2rem;
            color: $fontBlackColor;
        }
    }
}
</style>