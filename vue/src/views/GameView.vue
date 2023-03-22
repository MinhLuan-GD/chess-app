<template>
  <div :class="$style.container">
    <Header />
    <div :class="$style.main">
      <ChessBoard />
      <Chat />
    </div>
    <Footer />
  </div>
  <Waiting />
</template>

<script lang="ts">
import ChessBoard from "@/components/game/ChessBoard.vue";
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Chat from "@/components/game/Chat.vue";
import Waiting from "@/components/home/Waiting.vue";

@Options({ components: { ChessBoard, Header, Footer, Chat, Waiting } })
export default class GameView extends Vue {}
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
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
