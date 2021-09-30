<template>
    <div id="componentWrapper">
        <h1>{{ getCurrentQuestion.title }}</h1>
        <h2>{{ getCurrentQuestion.description }}</h2>
        <div id="formWrapper">
        
        <label for="transactionType" class="ttlabel">Transaction Type:</label>
        <select v-model="userAnswer.type" class="formElement" name="transactionType">
          <option disabled value="">Please select one</option>
          <option value="cash">Cash</option>
          <option value="accrual">Accrual</option>
        </select>

            <!-- <question-entry v-for="entry in getUserAnswersForQuestion" v-bind:key="entry.id"></question-entry> -->
            <ol>
                <li class="entry" v-for="(count, index) in counts" :key="index">
                    <QuestionEntry color="red" label="Red Button" @updateAnswer="UpdateAnswer($event, index)"></QuestionEntry>
                </li>
            </ol>
            <div style="float:left; margin-left:40px">
            <button @click="addComponent" class="formElement">Add</button>
            <button @click="removeComponent" class="formElement">Remove</button>
            </div>

            <div>
            <button v-on:click="submitAnswer()" class="formElement">Submit</button>
            </div>
        </div>
        
        <div id="resultArea">
            <span class="incorrect" style="color:red">Incorrect</span>
            <span class="correct" style="color:green">Correct</span>

            <div>
                <button v-if=isLastQuestion v-on:click="resultsPage()">View Results</button>
                <button v-else v-on:click="nextQuestion()">Next</button>
            </div>
        </div>

    </div>
    
    

</template>

<script>
//import {mapState} from 'vuex'
import { mapMutations } from 'vuex'
import QuestionEntry from './QuestionEntry'
import _ from 'lodash'

export default 
{
    components: {
        QuestionEntry
    },
    props: 
    {
        questionNum: { required: true }
    },
    computed: {
        getCurrentQuestion(){
            return this.$store.state.apiResponse[parseInt(this.$props.questionNum)-1]
         },
        getUserAnswersForQuestion(){
            return this.$store.getters.getUserAnswersForQuestion(parseInt(this.$props.questionNum)-1)
        },
    },
    data: function() {
        return {
            counts: 1,
            isLastQuestion: (this.$props.questionNum == this.$store.state.apiResponse.length),
            nextQuestionRoute: 'question' + (this.$props.questionNum + 1),
            userAnswer: {
                type: "",
                entries: []
            }
        };
    },
    methods: {
        ...mapMutations([
        'setAnswerFlag'
        ]),
        addComponent: function(){
            this.counts ++
        },
        removeComponent: function(){
            if(this.counts > 0){
                this.counts --
            }
            
        },
        getQuestionIndex: function(){
            return parseInt(this.$props.questionNum)-1
        },
        UpdateAnswer: function(entryData, index){
            this.userAnswer.entries[index] = entryData
        },
        submitAnswer(){
            const possibleAnswers = this.$store.state.apiResponse[this.getQuestionIndex()].correct_answers
            var correct = false
            possibleAnswers.forEach(possibleAnswer => {
                if (_.isEqual(possibleAnswer, this.userAnswer)){
                    correct = true
                }
            });
            this.disableFormElements()
            document.getElementById("resultArea").classList.add(correct ? "correct" : "incorrect");
            this.setAnswerFlag({flag: correct, index: this.getQuestionIndex()})
        },
        disableFormElements(){
            var formElements = document.getElementsByClassName("formElement")
            formElements.forEach(x => x.setAttribute("disabled","disabled"))
        },
        nextQuestion(){
            const nextQuestionNumber = parseInt(this.$props.questionNum) + 1
            const nextQuestionRoute = '/question' + nextQuestionNumber
            this.$router.push({path: nextQuestionRoute})
        },
        resultsPage(){
            this.$router.push({path: '/results'})
        }
    },
}
</script>

<style scoped>
#formWrapper {
    width: 800px;
    margin: 25px auto;
    position: relative;
}
.ttlabel{
    margin: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li.entry{
  display: block;
}
#resultArea {
    display: none;
}
#resultArea span {
    display: none;
    font-size: 40px;
}
#resultArea.correct span.correct {
    display: block;
}
#resultArea.incorrect span.incorrect {
    display: block;
}
#resultArea.correct, #resultArea.incorrect{
    display: block
}

</style>