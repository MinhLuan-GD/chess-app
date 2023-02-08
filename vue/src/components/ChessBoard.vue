<template>
  <div :class="$style['chess-board']">
    <Tile
      v-for="item of board"
      :black="item.black"
      :piece-image="item.image"
      :key="item"
    />
  </div>
</template>

<script lang="ts">
import { Piece } from "@/utils/types";
import { Options, Vue } from "vue-class-component";
import Tile from "./Tile.vue";

@Options({
  components: {
    Tile,
  },
})
export default class ChessBoard extends Vue {
  verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  board: any[] = [];
  pieces: Piece[] = [];

  created(): void {
    for (let i = 0; i < 8; i++) {
      this.pieces.push({ image: "pdt.png", x: i, y: 6 });
    }
    for (let j = this.verticalAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < this.horizontalAxis.length; i++) {
        this.board.push({
          x: this.horizontalAxis[i],
          y: this.verticalAxis[j],
          black: (i + j) % 2 == 0,
          image: this.pieces.filter((p) => p.x == i && p.y == j)[0]?.image,
        });
      }
  }
}
</script>

<style lang="scss" module>
.chess-board {
  display: grid;
  grid-template-columns: repeat(8, 70px);
  grid-template-rows: repeat(8, 70px);
  color: rgb(255, 0, 0);
  width: 560px;
}
</style>
