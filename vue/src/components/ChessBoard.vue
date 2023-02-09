<template>
  <div
    @mousedown="(e) => grabPiece(e)"
    @mousemove="(e) => movePiece(e)"
    @mouseup="(e) => dropPiece(e)"
    class="chess-board"
    ref="chessBoardRef"
  >
    <Tile
      v-for="item of board"
      :black="item.black"
      :piece-image="item.image"
      :key="item.key"
    />
  </div>
</template>

<script lang="ts">
import { Piece } from "@/utils/types";
import { ref, watch } from "vue";
import { Options, Vue } from "vue-class-component";
import Tile from "./Tile.vue";

@Options({ components: { Tile } })
export default class ChessBoard extends Vue {
  verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  activatePiece!: HTMLElement | null;
  chessBoardRef = ref() as unknown as HTMLDivElement;

  board: any[] = [];
  gridX!: number;
  gridY!: number;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;

  pieces: Piece[] = [
    { image: "rdt.png", x: 0, y: 7 },
    { image: "rdt.png", x: 7, y: 7 },
    { image: "rlt.png", x: 0, y: 0 },
    { image: "rlt.png", x: 7, y: 0 },
    { image: "ndt.png", x: 1, y: 7 },
    { image: "ndt.png", x: 6, y: 7 },
    { image: "nlt.png", x: 1, y: 0 },
    { image: "nlt.png", x: 6, y: 0 },
    { image: "bdt.png", x: 2, y: 7 },
    { image: "bdt.png", x: 5, y: 7 },
    { image: "blt.png", x: 2, y: 0 },
    { image: "blt.png", x: 5, y: 0 },
    { image: "qdt.png", x: 3, y: 7 },
    { image: "kdt.png", x: 4, y: 7 },
    { image: "qlt.png", x: 3, y: 0 },
    { image: "klt.png", x: 4, y: 0 },
  ];

  created(): void {
    for (let i = 0; i < 8; i++) {
      this.pieces.push({ image: "pdt.png", x: i, y: 6 });
      this.pieces.push({ image: "plt.png", x: i, y: 1 });
    }
    this.changeBoard();
    watch([this.pieces], () => this.changeBoard());
  }

  changeBoard() {
    this.board = [];
    for (let j = this.verticalAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < this.horizontalAxis.length; i++) {
        this.board.push({
          // x: this.horizontalAxis[i],
          // y: this.verticalAxis[j],
          key: `${i}${j}`,
          black: (i + j) % 2 == 0,
          image: this.pieces.filter((p) => p.x == i && p.y == j)[0]?.image,
        });
      }
  }

  mounted(): void {
    this.minX = this.chessBoardRef.offsetLeft - 10;
    this.minY = this.chessBoardRef.offsetTop - 10;
    this.maxX =
      this.chessBoardRef.offsetLeft + this.chessBoardRef.clientWidth - 60;
    this.maxY =
      this.chessBoardRef.offsetTop + this.chessBoardRef.clientHeight - 60;
  }

  grabPiece(e: MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      this.gridX = Math.floor((e.clientX - this.chessBoardRef.offsetLeft) / 70);
      this.gridY = Math.abs(
        Math.floor((e.clientY - this.chessBoardRef.offsetTop - 490) / 70)
      );
      const x = e.clientX - 36;
      const y = e.clientY - 36;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      this.activatePiece = element;
    }
  }

  movePiece(e: MouseEvent) {
    if (this.activatePiece && this.chessBoardRef) {
      const x = e.clientX - 36;
      const y = e.clientY - 36;
      if (x < this.minX) this.activatePiece.style.left = `${this.minX}px`;
      else if (x > this.maxX) {
        this.activatePiece.style.left = `${this.maxX}px`;
      } else this.activatePiece.style.left = `${x}px`;

      if (y < this.minY) this.activatePiece.style.top = `${this.minY}px`;
      else if (y > this.maxY) {
        this.activatePiece.style.top = `${this.maxY}px`;
      } else this.activatePiece.style.top = `${y}px`;
    }
  }

  dropPiece(e: MouseEvent) {
    if (this.activatePiece) {
      const x = Math.floor((e.clientX - this.chessBoardRef.offsetLeft) / 70);
      const y = Math.abs(
        Math.floor((e.clientY - this.chessBoardRef.offsetTop - 490) / 70)
      );
      this.activatePiece.style.position = "unset";
      this.pieces.map((p) => {
        if (p.x == this.gridX && p.y == this.gridY) {
          p.x = x;
          p.y = y;
        }
      });
      // this.pieces[0].y = 5;
      this.activatePiece = null;
    }
  }
}
</script>

<style lang="scss">
.chess-board {
  display: grid;
  position: relative;
  grid-template-columns: repeat(8, 70px);
  grid-template-rows: repeat(8, 70px);
  color: rgb(255, 0, 0);
  width: 560px;
}
</style>
