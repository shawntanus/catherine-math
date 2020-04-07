<template>
  <div class="jumbotron">
    <form v-on:submit.prevent="onSubmit">
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ question }} = </span>
        </div>
        <input v-model="inputAnswer" type="number" class="form-control" placeholder="Answer here" ref="inputAnswer">
      </div>
    </form> 
  </div>
</template>

<script>
export default {
  name: 'Problem',
  props: {
    progress: {},
  },
  data() {
    return {
      question: "",
      answer: 0,
      inputAnswer: null,
      gBounce: new Audio("assets/bounce.mp3"),
      gClick: new Audio("assets/click.mp3"),
    }
  },
  methods: {
    generateQuestion(){
    },
    onSubmit(){
      if(this.inputAnswer == "")
        return false;
        
      if(this.inputAnswer == this.answer){
          this.progress.right++;
          this.gBounce.play();
      }else{
          this.progress.wrong++;
          this.gClick.play();
          var wrong = this.question + " = " + this.inputAnswer;
          console.log(wrong);
          this.progress.wrong_questions.push(wrong);
      }

      if(this.progress.right + this.progress.wrong < this.progress.total){
        var q;
        do{
          q = this.generateQuestion()
        }while(this.question == q.question);
        
        this.question = q.question;
        this.answer = q.answer;
      }else{
         this.$emit('onProblemNext');
      }
      this.inputAnswer = "";
      return false;
    },
  },
  mounted(){
    var q = this.generateQuestion();
    this.question = q.question;
    this.answer = q.answer;
    this.$refs.inputAnswer.focus();
    this.inputAnswer="";
  }
}
</script>
