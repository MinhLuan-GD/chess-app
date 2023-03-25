<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "./store";

export default class App extends Vue {
  created() {
    store.dispatch("getPlayer");
    store.dispatch("getGameId");
    store.dispatch("getTenGames");
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5c1810;
    border-radius: 10px;
  }
  background-color: #312e2b;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
