import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import FinanceQuestion from '@/components/FinanceQuestion.vue'

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/Question:questionNum',
        name: 'FinanceQuestion',
        component: FinanceQuestion,
        props: true
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router