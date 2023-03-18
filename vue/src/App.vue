<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "./store";

export default class App extends Vue {
  created() {
    store.dispatch("getPlayer");
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
