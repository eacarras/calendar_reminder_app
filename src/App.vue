<template>
  <div id="app">
    <app-bar></app-bar>
    <router-view/>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import AppBar from '@/components/core/appBar/AppBar.vue';
import CustomFooter from '@/components/core/footer/CustomFooter.vue';

export default {
  components: {
    AppBar,
    CustomFooter,
  }  
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
