<template>
    
    <div id="componentWrapper">
        <h1>{{ getCurrentQuestion.title }}</h1>
        <h2>{{ getCurrentQuestion.description }}</h2>
        <div id="formWrapper">
            <!-- <question-entry v-for="entry in getUserAnswersForQuestion" v-bind:key="entry.id"></question-entry> -->
            <ol>
                <li class="entry" v-for="(count, index) in counts" :key="index">
                    <QuestionEntry color="red" label="Red Button" @updateAnswer="UpdateAnswer($event, index)"></QuestionEntry>
                </li>
            </ol>
            <button @click="addComponent">Add</button>
            <button @click="removeComponent">Remove</button>


            <button v-on:click="console.log(getUserAnswersForQuestion())">Back</button>
            <button v-on:click="console.log(getUserAnswersForQuestion())">Submit and Continue</button>

            <br />
            <button v-on:click="increment()">You clicked me {{ getCount }} times.</button>
            <button v-on:click="console.log(getUserAnswersForQuestion())">SHOW ANSWER!!</button>
        </div>
    </div>
    
    

</template>

<script>
//import {mapState} from 'vuex'
import { mapMutations } from 'vuex'
import QuestionEntry from './QuestionEntry'

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
        getCount(){
            return this.$store.state.count
        },
        getQuestionIndex(){
            return parseInt(this.$props.questionNum)-1
        },
        getCurrentQuestion(){
            return this.$store.state.apiResponse[parseInt(this.$props.questionNum)-1]
         },
        getUserAnswersForQuestion(){
            return this.$store.getters.getUserAnswersForQuestion(parseInt(this.$props.questionNum)-1)
        }
        //currentQuestion: this.$store.state.apiResponse[parseInt(this.$props.questionNum)-1]

    },
    data: function() {
        return {
            counts: 1,
            userAnswer: {
                type: "",
                entries: []
            }
        };
    },
    methods: {
        ...mapMutations([
        'increment'
        ]),
        addComponent: function(){
            this.counts ++
        },
        removeComponent: function(){
            this.counts --
        },
        UpdateAnswer: function(entryData, index){
            console.log(">>>>>>>" + index + ": " + entryData)
            this.userAnswer.entries[index] = entryData
            console.log(this.userAnswer);
        },
    },
}
</script>

<style scoped>
#formWrapper {
    width: 800px;
    margin: 25px auto;
    border: 1px solid gray;
}
ul {
  list-style-type: none;
  padding: 0;
}
li.entry{
  display: block;
}
a {
  color: #42b983;
}
</style>