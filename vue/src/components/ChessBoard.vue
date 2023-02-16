<template>
  <div :class="$style['pawn-promotion-modal']" ref="modalRef">
    <div @click="() => promotePawn(pieceType.ROOK)">
      <img src="@/assets/Chess_rlt60.png" alt="rook" />
      <span>Rook</span>
    </div>
    <div @click="() => promotePawn(pieceType.BISHOP)">
      <img src="@/assets/Chess_blt60.png" alt="bishop" />
      <span>Bishop</span>
    </div>
    <div @click="() => promotePawn(pieceType.KNIGHT)">
      <img src="@/assets/Chess_klt60.png" alt="knight" />
      <span>Knight</span>
    </div>
    <div @click="() => promotePawn(pieceType.QUEEN)">
      <img src="@/assets/Chess_qlt60.png" alt="queen" />
      <span>Queen</span>
    </div>
  </div>
  <div
    @mousedown="(e) => grabPiece(e)"
    @mousemove="(e) => movePiece(e)"
    @mouseup="(e) => dropPiece(e)"
    :class="$style['chess-board']"
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
import { Piece, Board, Position } from "@/utils/types";
import {
  PieceType,
  TeamType,
  initialBoardState,
  samePosition,
} from "@/utils/constants";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import Referee from "@/referee/Referee";
import Tile from "./Tile.vue";

@Options({ components: { Tile } })
export default class ChessBoard extends Vue {
  activatePiece!: HTMLElement | null;
  chessBoardRef = ref() as unknown as HTMLDivElement;
  modalRef = ref() as unknown as HTMLDivElement;

  board: Board[] = [];
  referee!: Referee;
  grabPosition!: Position;

  pieceType = PieceType;
  teamPlay!: string;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;

  promotionPawn!: Piece;
  pieces: Piece[] = [];

  created(): void {
    this.teamPlay = "w";
    this.pieces = initialBoardState();
    this.referee = new Referee();
    this.changeBoard();
  }

  changeBoard() {
    this.board = [];
    if (this.teamPlay === "w") {
      for (let j = 7; j >= 0; j--)
        for (let i = 0; i < 8; i++) {
          this.board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find(
              (p) => p.position.x === i && p.position.y === j
            )?.img,
          });
        }
    } else {
      for (let j = 7; j >= 0; j--)
        for (let i = 0; i < 8; i++) {
          this.board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find(
              (p) =>
                p.position.x === Math.abs(i - 7) &&
                p.position.y === Math.abs(j - 7)
            )?.img,
          });
        }
    }
  }

  getIndexPiece(clientX: number, clientY: number): Position {
    if (this.teamPlay === "w") {
      const x = Math.floor((clientX - this.chessBoardRef.offsetLeft) / 70);
      const y = 7 - Math.floor((clientY - this.chessBoardRef.offsetTop) / 70);
      return { x, y };
    } else {
      const x = 7 - Math.floor((clientX - this.chessBoardRef.offsetLeft) / 70);
      const y = Math.floor((clientY - this.chessBoardRef.offsetTop) / 70);
      return { x, y };
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
      this.grabPosition = this.getIndexPiece(e.clientX, e.clientY);
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

      if (!samePosition(this.grabPosition, { x, y })) {
        const currentPiece = this.pieces.find((p) =>
          samePosition(p.position, this.grabPosition)
        );

        if (currentPiece) {
          const validMove = this.referee.isValidMove(
            this.grabPosition,
            { x, y },
            currentPiece.piece,
            currentPiece.team,
            this.pieces
          );

          const isEnPassantMove = this.referee.isEnPassantMove(
            this.grabPosition,
            { x, y },
            currentPiece.piece,
            currentPiece.team,
            this.pieces
          );
          const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;
          if (isEnPassantMove) {
            const pieces: Piece[] = [];
            this.pieces.map((p) => {
              if (samePosition(p.position, this.grabPosition)) {
                pieces.push({
                  ...p,
                  position: { x, y },
                  enPassant: false,
                });
              } else if (
                !(p.position.x === x && p.position.y === y - pawnDirection)
              ) {
                if (p.piece === PieceType.PAWN)
                  pieces.push({ ...p, enPassant: false });
                else pieces.push(p);
              }
            });
            this.pieces = pieces;
            this.changeBoard();
          } else if (validMove) {
            const pieces: Piece[] = [];
            this.pieces.map((p) => {
              if (samePosition(p.position, this.grabPosition)) {
                const promotionRow = p.team === TeamType.OUR ? 7 : 0;
                if (y === promotionRow && p.piece === PieceType.PAWN) {
                  this.modalRef.style.display = "block";
                  this.promotionPawn = { ...p, position: { x, y } };
                }
                pieces.push({
                  ...p,
                  position: { x, y },
                  enPassant:
                    Math.abs(this.grabPosition.y - y) === 2 &&
                    p.piece === PieceType.PAWN,
                });
              } else if (!samePosition(p.position, { x, y })) {
                if (p.piece === PieceType.PAWN)
                  pieces.push({ ...p, enPassant: false });
                else pieces.push(p);
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

  promotePawn(piece: PieceType) {
    this.modalRef.style.display = "none";
    this.pieces.forEach((p) => {
      if (samePosition(p.position, this.promotionPawn.position)) {
        p.piece = piece;
        const team = this.teamPlay === "w" ? "l" : "d";
        switch (piece) {
          case PieceType.ROOK:
            p.img = `r${team}t.png`;
            break;
          case PieceType.BISHOP:
            p.img = `b${team}t.png`;
            break;
          case PieceType.KNIGHT:
            p.img = `n${team}t.png`;
            break;
          case PieceType.QUEEN:
            p.img = `q${team}t.png`;
            break;
        }
      }
    });
    this.changeBoard();
  }
}
</script>
<style lang="scss" module>
.chess-board {
  display: grid;
  position: relative;
  grid-template-columns: repeat(8, 70px);
  grid-template-rows: repeat(8, 70px);
  color: rgb(255, 0, 0);
  width: 560px;
}
.pawn-promotion-modal {
  display: none;
  position: absolute;
  z-index: 2;
  width: 140px;
  height: 260px;
  left: 210px;
  top: 150px;
  background-color: aliceblue;
  padding: 10px;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: antiquewhite;
    }
    & span {
      width: 60px;
    }
    & img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
