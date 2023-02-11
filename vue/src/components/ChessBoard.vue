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
import { Piece, Board, PieceType, TeamType } from "@/utils/types";
import { ref, watch } from "vue";
import { Options, Vue } from "vue-class-component";
import Referee from "@/referee/Referee";
import Tile from "./Tile.vue";
import { initChess } from "@/utils/init-chess";

@Options({ components: { Tile } })
export default class ChessBoard extends Vue {
  verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  activatePiece!: HTMLElement | null;
  chessBoardRef = ref() as unknown as HTMLDivElement;

  board: Board[] = [];
  referee!: Referee;
  gridX!: number;
  gridY!: number;

  teamPlay!: string;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;

  pieces: Piece[] = [];

  created(): void {
    this.teamPlay = "b";
    this.pieces = initChess();
    this.referee = new Referee();
    this.changeBoard();
  }

  changeBoard() {
    this.board = [];
    if (this.teamPlay === "w") {
      for (let j = this.verticalAxis.length - 1; j >= 0; j--)
        for (let i = 0; i < this.horizontalAxis.length; i++) {
          this.board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find((p) => p.pieceX === i && p.pieceY === j)
              ?.img,
          });
        }
    } else {
      for (let j = this.verticalAxis.length - 1; j >= 0; j--)
        for (let i = 0; i < this.horizontalAxis.length; i++) {
          this.board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find(
              (p) =>
                p.pieceX === Math.abs(i - 7) && p.pieceY === Math.abs(j - 7)
            )?.img,
          });
        }
    }
  }

  getIndexPiece(clientX: number, clientY: number): { x: number; y: number } {
    if (this.teamPlay === "w") {
      const x = Math.floor((clientX - this.chessBoardRef.offsetLeft) / 70);
      const y = Math.abs(
        Math.floor((clientY - this.chessBoardRef.offsetTop - 490) / 70)
      );
      return { x, y };
    } else {
      const x = Math.abs(
        Math.floor((clientX - this.chessBoardRef.offsetLeft - 490) / 70)
      );
      const y = Math.floor((clientY - this.chessBoardRef.offsetTop) / 70);
      return { x, y };
    }
  }

  mounted(): void {
    watch([this.pieces], () => this.changeBoard());
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
      const indexPiece = this.getIndexPiece(e.clientX, e.clientY);
      this.gridX = indexPiece.x;
      this.gridY = indexPiece.y;

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
      const { x, y } = this.getIndexPiece(e.clientX, e.clientY);
      this.activatePiece.style.position = "unset";

      if (this.gridX !== x || this.gridY !== y) {
        const currentPiece = this.pieces.find(
          (p) => p.pieceX === this.gridX && p.pieceY === this.gridY
        );

        if (currentPiece) {
          const validMove = this.referee.isValidMove(
            this.gridX,
            this.gridY,
            x,
            y,
            currentPiece.piece,
            currentPiece.team,
            this.pieces
          );

          const isEnPassantMove = this.referee.isEnPassantMove(
            this.gridX,
            this.gridY,
            x,
            y,
            currentPiece.piece,
            currentPiece.team,
            this.pieces
          );
          const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;
          if (isEnPassantMove) {
            const pieces: Piece[] = [];
            this.pieces.map((p) => {
              if (p.pieceX === this.gridX && p.pieceY === this.gridY) {
                pieces.push({
                  ...p,
                  pieceX: x,
                  pieceY: y,
                  enPassant: false,
                });
              } else if (!(p.pieceX === x && p.pieceY === y - pawnDirection)) {
                pieces.push({ ...p, enPassant: p.piece === PieceType.PAWN });
              }
            });
            this.pieces = pieces;
            this.changeBoard();
          } else if (validMove) {
            const pieces: Piece[] = [];
            this.pieces.map((p) => {
              if (p.pieceX === this.gridX && p.pieceY === this.gridY) {
                // if (
                //   Math.abs(this.gridY - y) === 2 &&
                //   p.piece === PieceType.PAWN
                // ) {
                //   pieces.push({ ...p, pieceX: x, pieceY: y, enPassant: true });
                // } else {
                //   pieces.push({ ...p, pieceX: x, pieceY: y });
                // }
                pieces.push({
                  ...p,
                  pieceX: x,
                  pieceY: y,
                  enPassant:
                    Math.abs(this.gridY - y) === 2 &&
                    p.piece === PieceType.PAWN,
                });
              } else if (!(p.pieceX === x && p.pieceY === y)) {
                pieces.push({ ...p, enPassant: p.piece === PieceType.PAWN });
              }
            });
            this.pieces = pieces;
            this.changeBoard();
          }
        }
      }

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
