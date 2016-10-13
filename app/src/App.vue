<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    width: 300px;
    text-align: center;
    font-family: Lato, Helvetica, sans-serif;
    overflow: hidden;
  }
</style>