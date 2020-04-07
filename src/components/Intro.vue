<template>
  <div class="jumbotron">
    <h1>Minus Level {{ progress.level }}</h1>
    <p>{{ progress.level_desc }}</p>
    <p>
      <button class="btn btn-lg btn-primary" v-on:click="$emit('onIntroNext')">Start &raquo;</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  props: {
    progress: {}
  },
}
</script>
