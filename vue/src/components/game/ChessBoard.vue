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
      :team="`team${item.team}`"
    />
  </div>
</template>

<script lang="ts">
import { Piece, Board, Position } from "@/utils/types";
import { PieceType, TeamType, samePosition, toAxis } from "@/utils/constants";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import Referee from "@/referee/Referee";
import Tile from "./Tile.vue";
import { io, Socket } from "socket.io-client";
import { Chess } from "chess.js";
import { getGame } from "@/api/game";
import { initialBoardState } from "@/utils/constants";
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
  teamPlay = TeamType.SPECTATOR;

  gameId = store.state.gameId;
  isCheck = false;
  isCheckMate = false;

  offsetTop!: number;
  offsetLeft!: number;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;

  pieces!: Piece[];

  turnOn = false;

  promotionPawn!: any;

  socket!: Socket;
  gameClient!: Chess;

  created(): void {
    this.socket = io("http://localhost:3002");
    this.referee = new Referee();
    this.initGame();
  }

  async initGame() {
    if (this.gameId) {
      const { data } = await getGame(this.gameId);
      this.gameClient = new Chess();
      data.moves.forEach((move: string) => {
        this.gameClient.move(move);
      });
      this.isCheck = this.gameClient.isCheck();
      this.isCheckMate = this.gameClient.isCheckmate();
      this.pieces = initialBoardState(this.gameClient.board());
      if (data.whitePlayerId === store.state.player?._id) {
        this.teamPlay = TeamType.WHITE;
      } else if (data.blackPlayerId === store.state.player?._id) {
        this.teamPlay = TeamType.BLACK;
      } else {
        this.teamPlay = TeamType.SPECTATOR;
      }
      if (this.teamPlay === this.gameClient.turn()) {
        this.turnOn = true;
      }
      this.socket.on(
        `game:${this.gameId}:turn:${this.teamPlay}`,
        (move: string) => {
          this.gameClient.move(move);
          this.isCheck = this.gameClient.isCheck();
          this.isCheckMate = this.gameClient.isCheckmate();
          this.pieces = initialBoardState(this.gameClient.board());
          this.changeBoard();
          this.turnOn = true;
        }
      );
      this.changeBoard();
    }
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
          const piece = this.pieces.find(
            (p) => p.position.x === i && p.position.y === j
          );
          board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: piece?.img,
            highlight: currentPiece?.possibleMoves
              ? currentPiece.possibleMoves.some((p) =>
                  samePosition(p, { x: i, y: j })
                )
              : false,
            team: piece?.team,
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
          const piece = this.pieces.find(
            (p) => p.position.x === i && p.position.y === j
          );
          board.push({
            key: `${i}${j}`,
            black: (i + j) % 2 == 0,
            image: piece?.img,
            highlight: currentPiece?.possibleMoves
              ? currentPiece.possibleMoves.some((p) =>
                  samePosition(p, { x: i, y: j })
                )
              : false,
            team: piece?.team,
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
    this.offsetTop = this.chessBoardRef.offsetTop;
    this.offsetLeft = this.chessBoardRef.offsetLeft;
    this.minX = -10;
    this.minY = -10;
    this.maxX = this.chessBoardRef.clientWidth - 60;
    this.maxY = this.chessBoardRef.clientHeight - 60;
  }

  url(chess: string) {
    const team = this.teamPlay === TeamType.BLACK ? "d" : "l";
    return require(`@/assets/pieces/${chess}${team}t.png`);
  }

  grabPiece(e: MouseEvent) {
    const element = e.target as HTMLElement;
    if (
      this.turnOn &&
      element.classList.contains("chess-piece") &&
      element.classList.contains(`team${this.teamPlay}`)
    ) {
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
      const x = e.clientX - this.offsetLeft - 36;
      const y = e.clientY - this.offsetTop - 36;
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
          const from = toAxis(this.grabPosition);
          const to = toAxis({ x, y });
          const promotionRow = currentPiece.team === TeamType.WHITE ? 7 : 0;
          if (y === promotionRow && currentPiece.type === PieceType.PAWN) {
            this.modalRef.style.display = "block";
            this.promotionPawn = { from, to };
          } else {
            try {
              if (this.gameClient.move({ from, to })) {
                this.turnOn = false;
                this.pieces = initialBoardState(this.gameClient.board());
                this.changeBoard();
                this.socket.emit("move", {
                  game: this.gameId,
                  move: this.gameClient.history().pop(),
                });
              }
            } catch (error) {
              console.log("valid move");
            }
          }
        }
      }

      this.activatePiece = null;
    }
  }

  promotePawn(piece: PieceType) {
    this.modalRef.style.display = "none";
    try {
      if (this.gameClient.move({ ...this.promotionPawn, promotion: piece })) {
        this.turnOn = false;
        this.pieces = initialBoardState(this.gameClient.board());
        this.changeBoard();
        this.socket.emit("move", {
          game: this.gameId,
          move: this.gameClient.history().pop(),
        });
      }
    } catch (error) {
      console.log("valid move");
    }
  }

  updateValidMoves() {
    if (!this.isCheck) {
      this.pieces.forEach((p) => {
        p.possibleMoves = this.referee.getValidMoves(p, this.pieces);
      });
      this.changeBoard();
    }
  }

  deleteValidMoves() {
    this.pieces.forEach((p) => {
      p.possibleMoves = [];
    });
    this.changeBoard();
  }

  beforeUnmount(): void {
    if (this.socket) this.socket.disconnect();
  }
}
</script>
<style lang="scss" module>
.chess-board {
  display: grid;
  position: relative;
  grid-template-columns: repeat(8, calc(40vw / 8));
  grid-template-rows: repeat(8, calc(40vw / 8));
  color: rgb(255, 0, 0);
  width: 40vw;
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
