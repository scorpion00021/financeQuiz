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
        //updateUserAnswer(state, answer) {
            //state.userAnswers[index] = answer
            //get top level type selected
            //get each answer in form
            // {
			// 	"type": "cash",
			// 	"entries": [
			// 		{
			// 			"when": "6/10",
			// 			"type": "cash",
			// 			"Dr": 100
			// 		},
			// 		{
			// 			"when": "6/10",
			// 			"type": "revenue",
			// 			"Cr": 100
			// 		}
			// 	]
			// }
        //},
        increment(state) {
            state.count += 1;
        }
     },
     getters: {
        getApiResponse: state => state.apiResponse, 
        getQuestionCount: (state, getters) => getters.getApiResponse.length,
        apiResponsePopulated: (state, getters) => getters.getQuestionCount > 0,
        getUserAnswersForQuestion: (state) => (index) => state.userAnswers[index]
     }
})

function updateApiResponse(){
    axios.get('https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json').then(function (response) {
    store.commit('updateApiResponse', response.data)
    console.log(response);
  }) 
    
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

const app = createApp(App)
app.use(router)
app.use(store)
registerComponents(app)
app.mount('#app')


//post app mount
//only pull from the question endpoint if we havent cached it.
console.log(store.getters.apiResponsePopulated)
if(!store.getters.apiResponsePopulated){
    updateApiResponse()
}
