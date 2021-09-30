<template>
    <div id="home">
        <h1>Finance Quiz</h1>
        <h2>A quick quiz to test your ability to interact with financial software.</h2>
        <button id="startTest" v-on:click="startTest()">Start</button>

    </div>

</template>

<script>


export default 
{
    methods: {
        startTest(){
            this.$router.push({path: '/question1'})
        }
    }
}
</script>

<style scoped>
#startTest{
    height: 50px;
    width: 400px;
    background-color: lightgreen;
    font-size: 30px;
}

</style>