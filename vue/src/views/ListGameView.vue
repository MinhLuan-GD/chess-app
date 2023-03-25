<template>
  <div :class="$style.container">
    <Header />
    <List />
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Options, Vue } from "vue-class-component";
import List from "@/components/list-game/List.vue";

@Options({
  components: {
    Header,
    List,
    Footer,
  },
})
export default class ListGame extends Vue {}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-areas: "header main" "header footer";
  grid-template-columns: 180px auto;
  width: 100%;
  height: 100%;
  background-color: #312e2b;
}
</style>
