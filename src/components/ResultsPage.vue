<template>
  <div class="resultPage">
    <h1>Results</h1>
    <table>
      <tr>
        <th></th>
        <th>#</th>
        <th>Question</th>
      </tr>
  <tr v-for="(entry, index) in apiResponse" :key="index">
    <td v-html=formatCheckbox(userAnswers[index])></td>
    <td>{{entry.title}}</td>
    <td>{{entry.description}}</td>
  </tr>
</table>

<div id="scoreBlock">
  <h3>Score</h3>
  <div id="score">{{myScore}}</div>
</div>

<button id="restartTest" v-on:click="restartTest()">Restart Test</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ResultPage',
         
  data: function() {
        return {
          apiResponse: this.$store.state.apiResponse,
          userAnswers: this.$store.state.userAnswers,
          myScore: (this.$store.state.userAnswers.filter(x => x == true).length / this.$store.state.apiResponse.length * 100)
        }
  },
  methods:{
    ...mapMutations([
      'resetTest'
    ]),
    formatCheckbox(input){
      if(input){
        return "<span style='color: #00ff00;'>&#10004</span>"
      }
      else{
        return "<span style='color: #ff0000;'>&#10006</span>"
      }
    },
    restartTest(){
      this.resetTest()
      this.$router.push({path: '/question1'})
    }
  }
    
    
}
</script>


<style scoped>
  table{
    margin: auto;
  }

  a {
    color: #42b983;
  }
  td, th{
    border: 1px solid;
    min-width: 30px;
  }
  #restartTest{
    margin-top: 50px;
    height: 50px;
    width: 400px;
    background-color: lightskyblue;
    font-size: 30px;
  }
  #score{
    font-size: 100px;
  }
  #scoreBlock{
    margin-top: 60px;
  }
</style>
