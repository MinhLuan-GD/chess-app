<template>
  <div>
    <ChessBoard />
  </div>
</template>

<script lang="ts">
import ChessBoard from "@/components/ChessBoard.vue";
import { Options, Vue } from "vue-class-component";

@Options({ components: { ChessBoard } })
export default class GameView extends Vue {}
</script>

<style scoped></style>
