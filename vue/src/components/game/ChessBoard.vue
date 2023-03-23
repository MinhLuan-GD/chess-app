<template>
  <div :class="$style['main-container']" ref="mainContainerRef">
    <div v-if="!turnOn" :class="$style['top-play']">&bull;</div>
    <div :class="$style['top-player']">{{ opponentName }}</div>
    <div
      @mousedown="(e) => grabPiece(e)"
      @dragstart="() => false"
      @contextmenu.prevent="() => false"
      :class="$style['chess-board']"
      ref="chessBoardRef"
    >
      <div
        :class="$style['pawn-promotion-modal']"
        ref="modalRef"
        @click="promotePawnCancel"
      >
        <div :class="$style.container" @click.stop="">
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
      </div>
      <div :class="$style['game-over']" ref="gameOverRef">
        <div :class="$style.container">
          <h2>Game Over</h2>
          <div v-if="winner && loser" :class="$style['over-winner-loser']">
            <div :class="$style['over-winner']">
              <span>Winner: </span>
              <span>{{ winner }}</span>
            </div>
            <div :class="$style['over-loser']">
              <span>Loser: </span>
              <span>{{ loser }}</span>
            </div>
          </div>
          <div v-else :class="$style['over-draw']">Draw</div>
          <div :class="$style['new-game']">
            <button @click="newGame">Chơi lại</button>
            <button @click="newGame">Chơi game mới</button>
          </div>
        </div>
      </div>
      <div :class="$style.check" ref="checkRef">Check</div>
      <Tile
        v-for="item of board"
        :black="item.black"
        :piece-image="item.image"
        :highlight="item.highlight"
        :key="item.key"
        :team="`team${item.team}`"
      />
    </div>
    <div v-if="turnOn" :class="$style['bottom-play']">&bull;</div>
    <div :class="$style['bottom-player']">{{ ourName }}</div>
  </div>
</template>

<script lang="ts">
import { Piece, Board, Position, Player } from "@/utils/types";
import {
  PieceType,
  TeamType,
  samePosition,
  toAxis,
  GameStatus,
} from "@/utils/constants";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import Referee from "@/referee/Referee";
import Tile from "./Tile.vue";
import { io, Socket } from "socket.io-client";
import { Chess } from "chess.js";
import { getGame } from "@/api/game";
import { initialBoardState } from "@/utils/constants";
import store from "@/store";
import { getPlayer } from "@/api/player";
import router from "@/router";

@Options({ components: { Tile } })
export default class ChessBoard extends Vue {
  activatePiece!: HTMLElement | null;
  chessBoardRef = ref() as unknown as HTMLDivElement;
  modalRef = ref() as unknown as HTMLDivElement;
  gameOverRef = ref() as unknown as HTMLDivElement;
  mainContainerRef = ref() as unknown as HTMLDivElement;
  checkRef = ref() as unknown as HTMLDivElement;
  loading!: HTMLElement;

  board: Board[] = [];
  referee!: Referee;
  grabPosition!: Position;

  ourName = "";
  opponentName = "";

  pieceType = PieceType;
  teamPlay = TeamType.SPECTATOR;

  gameId = store.state.gameId;
  isCheck = false;
  isCheckMate = false;

  winner = "";
  loser = "";

  offsetTop!: number;
  offsetLeft!: number;
  whitePlayer!: Player;
  blackPlayer!: Player;

  minX!: number;
  minY!: number;
  maxX!: number;
  maxY!: number;
  tileSize!: number;

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
      if (data.status === GameStatus.FINISHED) {
        alert("Game đã kết thúc");
        router.push("/");
        store.dispatch("deleteGameId");
        return;
      }
      store.dispatch("setGameMessages", data.messages);
      this.gameClient = new Chess();
      data.moves.forEach((move: string) => {
        this.gameClient.move(move);
      });
      this.isCheck = this.gameClient.isCheck();
      this.isCheckMate = this.gameClient.isCheckmate();
      this.pieces = initialBoardState(this.gameClient.board());
      const interval = setInterval(() => {
        if (store.state.player) {
          if (data.whitePlayerId === store.state.player._id) {
            this.teamPlay = TeamType.WHITE;
          } else if (data.blackPlayerId === store.state.player._id) {
            this.teamPlay = TeamType.BLACK;
          } else {
            this.teamPlay = TeamType.SPECTATOR;
          }
          getPlayer(data.whitePlayerId).then(({ data }) => {
            this.whitePlayer = data;
            if (this.teamPlay === TeamType.WHITE) {
              this.ourName = data.nickname;
            } else {
              this.opponentName = data.nickname;
            }
          });
          getPlayer(data.blackPlayerId).then(({ data }) => {
            this.blackPlayer = data;
            if (this.teamPlay === TeamType.BLACK) {
              this.ourName = data.nickname;
            } else {
              this.opponentName = data.nickname;
            }
          });
          if (this.teamPlay === this.gameClient.turn()) {
            this.turnOn = true;
          }
          this.socket.on(
            `game:${this.gameId}:turn:${this.teamPlay}`,
            (move: string) => {
              this.gameClient.move(move);
              this.isCheck = this.gameClient.isCheck();
              if (this.isCheck) {
                this.checkRef.style.display = "flex";
                for (let i = 1; i <= 10; i++) {
                  setTimeout(() => {
                    this.checkRef.style.opacity = (1 - i / 10).toString();
                  }, 60 * i);
                }
              }
              this.isCheckMate = this.gameClient.isCheckmate();
              this.pieces = initialBoardState(this.gameClient.board());
              this.changeBoard();
              this.turnOn = true;
            }
          );
          this.socket.on(`game:${this.gameId}:end`, (data: any) => {
            if (data === TeamType.BLACK) {
              this.winner = this.whitePlayer.nickname;
              this.loser = this.blackPlayer.nickname;
            } else if (data === TeamType.WHITE) {
              this.winner = this.blackPlayer.nickname;
              this.loser = this.whitePlayer.nickname;
            } else {
              this.winner = "";
              this.loser = "";
            }
            this.gameOverRef.style.display = "flex";
          });
          this.socket.on(`game:${this.gameId}:error`, () => {
            window.location.reload();
          });
          this.changeBoard();
          clearInterval(interval);
        }
      }, 100);
    } else {
      router.push("/");
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
      const x = Math.floor((clientX - this.offsetLeft) / this.tileSize);
      const y = 7 - Math.floor((clientY - this.offsetTop) / this.tileSize);
      return { x, y };
    } else {
      const x = 7 - Math.floor((clientX - this.offsetLeft) / this.tileSize);
      const y = Math.floor((clientY - this.offsetTop) / this.tileSize);
      return { x, y };
    }
  }

  mounted(): void {
    this.tileSize = this.chessBoardRef.clientWidth / 8;
    this.offsetLeft = this.mainContainerRef.offsetLeft + 30;
    this.offsetTop = this.mainContainerRef.offsetTop;
    this.minX = -10;
    this.minY = -10;
    this.maxX = this.chessBoardRef.clientWidth - this.tileSize + 10;
    this.maxY = this.chessBoardRef.clientHeight - this.tileSize + 10;
    this.loading = document.getElementById("loading") as HTMLElement;
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
            this.modalRef.style.display = "flex";
            this.promotionPawn = { from, to };
          } else {
            try {
              if (this.gameClient.move({ from, to })) {
                this.turnOn = false;
                this.pieces = initialBoardState(this.gameClient.board());
                this.changeBoard();
                if (this.gameClient.isCheckmate()) {
                  this.gameOverRef.style.display = "flex";
                  this.winner =
                    this.teamPlay === TeamType.WHITE
                      ? this.whitePlayer.nickname
                      : this.blackPlayer.nickname;
                  this.loser =
                    this.teamPlay === TeamType.WHITE
                      ? this.blackPlayer.nickname
                      : this.whitePlayer.nickname;
                }
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
        if (this.gameClient.isCheckmate()) {
          this.gameOverRef.style.display = "flex";
          this.winner =
            this.teamPlay === TeamType.WHITE
              ? this.whitePlayer.nickname
              : this.blackPlayer.nickname;
          this.loser =
            this.teamPlay === TeamType.WHITE
              ? this.blackPlayer.nickname
              : this.whitePlayer.nickname;
        }
        this.socket.emit("move", {
          game: this.gameId,
          move: this.gameClient.history().pop(),
        });
      }
    } catch (error) {
      console.log("valid move");
    }
  }

  promotePawnCancel() {
    this.modalRef.style.display = "none";
  }

  updateValidMoves() {
    this.pieces.forEach((p) => {
      p.possibleMoves = this.referee.getValidMoves(
        p,
        this.pieces,
        this.gameClient
      );
    });
    this.changeBoard();
  }

  deleteValidMoves() {
    this.pieces.forEach((p) => {
      p.possibleMoves = [];
    });
    this.changeBoard();
  }

  newGame(): void {
    const { player } = store.state;
    if (player) {
      this.loading.style.display = "flex";
      this.socket.emit("join", { userId: player._id });
      this.socket.on(`games:${player._id}:created`, (gameId) => {
        store.dispatch("setGameId", gameId);
        this.loading.style.display = "none";
        window.location.reload();
      });
    } else alert("Bạn chưa đăng nhập");
  }

  beforeUnmount(): void {
    if (this.socket) this.socket.disconnect();
  }
}
</script>
<style lang="scss" module>
.main-container {
  position: relative;
  & .top-player {
    color: aliceblue;
    margin-left: 30px;
    font-size: 22px;
  }
  & .top-play {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    color: rgb(13, 173, 13);
    font-size: 40px;
    line-height: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .bottom-player {
    color: aliceblue;
    margin-left: 30px;
    font-size: 22px;
  }
  & .bottom-play {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    color: rgb(13, 173, 13);
    font-size: 40px;
    line-height: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .chess-board {
    display: grid;
    position: relative;
    grid-template-columns: repeat(8, calc(38vw / 8));
    grid-template-rows: repeat(8, calc(38vw / 8));
    width: 38vw;
    margin-left: 30px;
    & .pawn-promotion-modal {
      display: none;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      color: #0f0f0f;
      & .container {
        width: 140px;
        height: 260px;
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
    }

    & .game-over {
      display: none;
      position: absolute;
      z-index: 3;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      & .container {
        width: 25vw;
        height: 18vw;
        background-color: aliceblue;
        padding: 10px;
        border: 1px solid #0f0f0f;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        & h2 {
          text-align: center;
          margin: 0;
        }
        & .over-winner-loser {
          display: flex;
          justify-content: space-around;
          align-items: center;
          & .over-winner {
            font-weight: bold;
            width: 160px;
            text-align: center;
          }
          & .over-loser {
            color: #a0a0a0;
            width: 160px;
            text-align: center;
          }
        }
        & .over-draw {
          text-align: center;
          font-size: 36px;
          font-weight: bold;
        }
        & .new-game {
          display: flex;
          justify-content: space-evenly;
          & button {
            width: 120px;
            height: 40px;
            border: 1px solid #b58863;
            border-radius: 5px;
            background-color: #b58863;
            color: #fff;
            cursor: pointer;
            &:hover {
              background-color: #fff;
              color: #0f0f0f;
            }
          }
        }
      }
    }

    & .check {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255, 0, 0, 0.2);
      font-size: 40px;
      display: flex;
      opacity: 0;
      pointer-events: none;
      justify-content: center;
      align-items: center;
      color: #5c1810;
    }
  }
}
</style>
