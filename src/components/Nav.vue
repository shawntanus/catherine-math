<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Catherine Math Practice Project</a>
      <div class="navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" v-bind:class="{active: progress.level === 1}" v-on:click="$emit('setLevel', 1)">Level 1</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" v-bind:class="{active: progress.level === 2}" v-on:click="$emit('setLevel', 2)">Level 2</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" v-bind:class="{active: progress.level === 3}" v-on:click="$emit('setLevel', 3)">Level 3</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" v-bind:class="{active: progress.level === 4}" v-on:click="$emit('setLevel', 4)">Level 4</a>
          </li>
        </ul>

        <ul class="navbar-nav navbar-right">
          <li><a class="nav-link">Timer: {{ timer }}</a></li>
          <li><a class="nav-link">Progress: {{ progress.right + progress.wrong }}/{{ progress.total || "-" }}</a></li>
        </ul>
      </div>
    </nav>

</template>

<script>
export default {
  name: 'Nav',
  props: {
    progress: {}
  },
  data () {
    return {
      timerInSeconds: 0
    }
  },
  methods: {
    updateTimer(){
      if(this.progress.end != null){
        this.timerInSeconds = this.progress.end - this.progress.begin; 
      }else if(this.progress.begin != null){
        this.timerInSeconds = new Date().getTime() - this.progress.begin; 
      }
    }
  },
  computed: {
    timer: function () {
      if (this.timerInSeconds == 0)
        return "--";
      var minutes = Math.floor((this.timerInSeconds % (1000 * 60 * 60)) / (1000 * 60)); 
      var seconds = Math.floor((this.timerInSeconds % (1000 * 60)) / 1000); 
      return minutes + " minutes " + seconds + " seconds";
    }
  },
  created() {
    setInterval(this.updateTimer, 1000);
  }
}
</script>
