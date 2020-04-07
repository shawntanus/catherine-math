<template>
  <div class="jumbotron">
    <div><h1>Level: {{ progress.level }}</h1></div>
    <div><h1>Right: {{ progress.right }}</h1></div>
    <div><h1>Wrong: {{ progress.wrong }}</h1></div>
    <div><h1>Time: {{ time }}</h1></div>
    <div><h1>Wrong answers:</h1></div>
    <ul><li v-for="(question, index) in progress.wrong_questions" :key="index"><h2>{{question}}</h2></li></ul>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: {
    progress: {},
  },
  computed: {
    time: function () {
      var t = this.progress.end - this.progress.begin; 
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
      var seconds = Math.floor((t % (1000 * 60)) / 1000); 
      return minutes + " minutes " + seconds + " seconds";
    }
  },
}
</script>

<style scoped>
h2 {
  color: red;
}
</style>
