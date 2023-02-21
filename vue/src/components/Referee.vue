<template>
  <Chessboard />
</template>

<script lang="ts">
import { initialBoardState } from "@/utils/constants";
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import Chessboard from "./ChessBoard.vue";

@Options({ components: { Chessboard } })
export default class Referee extends Vue {
  created(): void {
    store.dispatch("changeBoardState", initialBoardState());
  }
}
</script>

<style scoped></style>
