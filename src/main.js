//import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const axios = require('axios');

import router from './router'
import App from './App.vue'

import QuestionEntry from '@/components/QuestionEntry.vue'


//create store
const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state() {
        return{
            apiResponse: null,
            userAnswers: [],
            count: 14
        }
     },
     mutations: {
        updateApiResponse (state, apiResponse) {
             state.apiResponse = apiResponse
        },
        setAnswerFlag(state, {flag, index}) {
            state.userAnswers[index] = flag
        },
        resetTest (state) {
            state.userAnswers = []
            updateApiResponse().then(response => store.commit('updateApiResponse', response.data))
        },
        increment(state) {
            state.count += 1;
        }
     },
     getters: {
        getApiResponse: state => state.apiResponse, 
        getQuestionCount: (state, getters) => getters.getApiResponse.length,
        apiResponsePopulated: (state) => !!state.apiResponse,
        getUserAnswersForQuestion: (state) => (index) => state.userAnswers[index]
     }
})

export default store

async function updateApiResponse(){
    return axios.get('https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json')
}

function registerComponents(app){
    app.component('question-entry', {
        data() {
            return {
                count : 0
            }
        },
        template: QuestionEntry
    })
}

async function populateResponseCache(){
    if(!store.getters.apiResponsePopulated){
        await updateApiResponse().then(function(response) {
            store.commit('updateApiResponse', response.data)
        })
    }
    return true;
}

const app = createApp(App)
app.use(store)
registerComponents(app)
populateResponseCache().then(() => {
    app.use(router)
    app.mount('#app')
})
