<template>
  <div id="app">
    <Nav :progress="progress" @setLevel="onSetLevel"/>
    <div class="container">
      <component :is="currentComponent" :progress="progress" @onIntroNext="onIntroNext" @onProblemNext="onProblemNext"/>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Intro from './components/Intro.vue'
import Problem from './components/Problem.vue'
import Summary from './components/Summary.vue'
import problemGenerator from './components/problem_generator.js'

export default {
  name: 'App',
  components: {
    Nav,
    Intro,
    Problem,
    Summary
  },
  data() {
    return {
      showIntro: true,
      showQuestion: false,
      showSummary: false,
      currentComponent: Intro,
      progress: {
        right: 0,
        wrong: 0,
        wrong_questions: [],
        begin: null,
        end: null,
        total: 30,
        level: 0,
        level_desc: "",
      },
    }

  },
  methods: {
    reset(){
      Object.assign(this.$data, this.$options.data());
    },
    onIntroNext () {
      this.currentComponent = Problem;
      this.progress.begin = new Date();
    },
    onProblemNext () {
      this.currentComponent = Summary;
      this.progress.end = new Date();
    },
    onSetLevel(level){
      this.reset();
      switch(level){
        case 1:
          this.progress.level = 1;
          this.progress.level_desc = "Minus under 20";
          this.progress.total = 30;
          Problem.methods.generateQuestion = problemGenerator.problem_generator_1;
          break;
        case 2:
          this.progress.level = 2;
          this.progress.level_desc = "Minus under 100";
          this.progress.total = 30;
          Problem.methods.generateQuestion = problemGenerator.problem_generator_2;
          break;
        case 3:
          this.progress.level = 3;
          this.progress.level_desc = "Minus under 100 with borrow";
          this.progress.total = 10;
          Problem.methods.generateQuestion = problemGenerator.problem_generator_3;
          break;
      }
    },
  },
  mounted(){
    this.onSetLevel(1);
  }
}
</script>

<style>
.container {
  padding-top: 70px;
}
</style>