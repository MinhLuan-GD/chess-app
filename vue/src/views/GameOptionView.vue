<template>
  <div :class="$style.container">
    <Header />
    <div :class="$style.main">
      <Main />
      <Menu />
    </div>
    <Footer />
  </div>
  <Waiting />
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Main from "@/components/game-option/Main.vue";
import Menu from "@/components/game-option/Menu.vue";
import Waiting from "@/components/game-option/Waiting.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Header,
    Main,
    Menu,
    Waiting,
    Footer,
  },
})
export default class GameOptionView extends Vue {}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-areas: "header main" "header footer";
  grid-template-columns: 180px auto;
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #312e2b;
  & .main {
    grid-area: main;
    display: flex;
    align-items: center;
  }
}
</style>
