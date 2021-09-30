import { createRouter, createWebHistory } from 'vue-router'
//import HelloWorld from '@/components/HelloWorld.vue'
import FinanceQuestion from '@/components/FinanceQuestion.vue'
import Home from '@/components/Home.vue'
import ResultsPage from '@/components/ResultsPage.vue'
import store from '../main.js'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Question:questionNum',
        name: 'FinanceQuestion',
        component: FinanceQuestion,
        props: true
    },
    {
        path: '/Results',
        name: 'ResultPage',
        component: ResultsPage,
    }
    
]

const router = createRouter({ history: createWebHistory(), routes })

//guards
router.beforeEach((to, from, next) => {
    const questionNumber = parseInt(to.params.questionNum)
     if (to.name == 'FinanceQuestion'){
        if(isNaN(questionNumber) || questionNumber > store.getters.getQuestionCount || questionNumber < 1){
            next('/')
        }
        else next()     
    }
    else next()
  })
export default router