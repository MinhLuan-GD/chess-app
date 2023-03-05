<template>
  <div :class="$style['pawn-promotion-modal']" ref="modalRef">
    <div @click="() => promotePawn(pieceType.ROOK)">
      <img :src="url('r')" alt="rook" />
      <span>Rook</span>
    </div>
    <div @click="() => promotePawn(pieceType.BISHOP)">
      <img :src="url('b')" alt="bishop" />
      <span>Bishop</span>
    </div>
    <div @click="() => promotePawn(pieceType.KNIGHT)">
      <img :src="url('n')" alt="knight" />
      <span>Knight</span>
    </div>
    <div @click="() => promotePawn(pieceType.QUEEN)">
      <img :src="url('q')" alt="queen" />
      <span>Queen</span>
    </div>
  </div>
  <div
    @mousedown="(e) => grabPiece(e)"
    @dragstart="() => false"
    @contextmenu.prevent="() => false"
    :class="$style['chess-board']"
    ref="chessBoardRef"
  >
    <Tile
      v-for="item of board"
      :black="item.black"
      :piece-image="item.image"
      :highlight="item.highlight"
      :key="item.key"
    />
  </div>
</template>

<script lang="ts">
import { Piece, Board, Position } from "@/utils/types";
import { PieceType, TeamType, samePosition } from "@/utils/constants";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import Referee from "@/referee/Referee";
import Tile from "./Tile.vue";
import store from "@/store";

@Options({ components: { Tile } })
export default class ChessBoard extends Vue {
  activatePiece!: HTMLElement | null;
  chessBoardRef = ref() as unknown as HTMLDivElement;
  modalRef = ref() as unknown as HTMLDivElement;

  board: Board[] = [];
  referee!: Referee;
  grabPosition!: Position;

  pieceType = PieceType;
  teamPlay!: number;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;

  pieces = store.state.referee.pieces;

  promotionPawn!: Piece;

  created(): void {
    this.teamPlay = TeamType.WHITE;
    this.referee = new Referee();
    this.changeBoard();
  }

  changeBoard() {
    const board = [];
    if (this.teamPlay === TeamType.WHITE) {
      for (let j = 7; j >= 0; j--)
        for (let i = 0; i < 8; i++) {
          let currentPiece;
          if (this.grabPosition) {
            currentPiece = this.pieces.find((p) =>
              samePosition(p.position, this.grabPosition)
            );
          }
          board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find(
              (p) => p.position.x === i && p.position.y === j
            )?.img,
            highlight: currentPiece?.possibleMoves
              ? currentPiece.possibleMoves.some((p) =>
                  samePosition(p, { x: i, y: j })
                )
              : false,
          });
        }
    } else {
      for (let j = 0; j < 8; j++)
        for (let i = 7; i >= 0; i--) {
          let currentPiece;
          if (this.grabPosition) {
            currentPiece = this.pieces.find((p) =>
              samePosition(p.position, this.grabPosition)
            );
          }
          board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: this.pieces.find(
              (p) => p.position.x === i && p.position.y === j
            )?.img,
            highlight: currentPiece?.possibleMoves
              ? currentPiece.possibleMoves.some((p) =>
                  samePosition(p, { x: i, y: j })
                )
              : false,
          });
        }
    }
    this.board = board;
  }

  getIndexPiece(clientX: number, clientY: number): Position {
    if (this.teamPlay === TeamType.WHITE) {
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

  url(chess: string) {
    const team = this.teamPlay === TeamType.BLACK ? "d" : "l";
    return require(`@/assets/Chess_${chess}${team}t60.png`);
  }

  grabPiece(e: MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      document.addEventListener("mousemove", this.movePiece);
      this.grabPosition = this.getIndexPiece(e.clientX, e.clientY);
      element.style.position = "absolute";
      element.style.zIndex = "3";
      this.activatePiece = element;
      element.onmouseup = (e) => {
        this.dropPiece(e);
        document.removeEventListener("mousemove", this.movePiece);
        element.onmouseup = null;
      };
      this.updateValidMoves();
      this.changeBoard();
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
    this.deleteValidMoves();
    if (this.activatePiece) {
      const { x, y } = this.getIndexPiece(e.clientX, e.clientY);
      this.activatePiece.style.position = "unset";
      this.activatePiece.style.top = "unset";
      this.activatePiece.style.left = "unset";
      this.activatePiece.style.zIndex = "1";

      if (!samePosition(this.grabPosition, { x, y })) {
        const currentPiece = this.pieces.find((p) =>
          samePosition(p.position, this.grabPosition)
        );

        if (currentPiece) {
          const validMove = this.referee.isValidMove(
            this.grabPosition,
            { x, y },
            currentPiece.type,
            currentPiece.team,
            this.pieces
          );

          const enPassantMove = this.referee.isEnPassantMove(
            this.grabPosition,
            { x, y },
            currentPiece.type,
            currentPiece.team,
            this.pieces
          );
          const pawnDirection = currentPiece.team === TeamType.WHITE ? 1 : -1;
          if (enPassantMove) {
            const pieces: Piece[] = [];
            this.pieces.forEach((p) => {
              if (samePosition(p.position, currentPiece.position)) {
                pieces.push({
                  ...p,
                  position: { x, y },
                  enPassant: false,
                });
              } else if (
                !(p.position.x === x && p.position.y === y - pawnDirection)
              ) {
                if (p.type === PieceType.PAWN)
                  pieces.push({ ...p, enPassant: false });
                else pieces.push(p);
              }
            });
            this.pieces = pieces;
            store.dispatch("changeBoardState", pieces);
          } else if (validMove) {
            const pieces: Piece[] = [];
            this.pieces.forEach((p) => {
              if (samePosition(p.position, currentPiece.position)) {
                const promotionRow = p.team === TeamType.WHITE ? 7 : 0;
                if (y === promotionRow && p.type === PieceType.PAWN) {
                  this.modalRef.style.display = "block";
                  this.promotionPawn = { ...p, position: { x, y } };
                }
                pieces.push({
                  ...p,
                  position: { x, y },
                  enPassant:
                    Math.abs(this.grabPosition.y - y) === 2 &&
                    p.type === PieceType.PAWN,
                });
              } else if (!samePosition(p.position, { x, y })) {
                if (p.type === PieceType.PAWN)
                  pieces.push({ ...p, enPassant: false });
                else pieces.push(p);
              }
            });
            this.pieces = pieces;
            store.dispatch("changeBoardState", pieces);
          }
        }
      }
      this.changeBoard();

      this.activatePiece = null;
    }
  }

  promotePawn(piece: PieceType) {
    this.modalRef.style.display = "none";
    this.pieces.forEach((p) => {
      if (samePosition(p.position, this.promotionPawn.position)) {
        p.type = piece;
        const team = this.teamPlay === TeamType.WHITE ? "l" : "d";
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

  updateValidMoves() {
    this.pieces.forEach((p) => {
      p.possibleMoves = this.referee.getValidMoves(p, this.pieces);
    });
    this.changeBoard();
  }

  deleteValidMoves() {
    this.pieces.forEach((p) => {
      p.possibleMoves = [];
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
