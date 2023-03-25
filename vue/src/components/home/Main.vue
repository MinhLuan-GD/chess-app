<template>
  <div :class="$style.main">
    <div :class="$style.board">
      <!-- square light black-castle -->
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-queen']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-king']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['black-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['black-pawn']}`"
      ></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div :class="`${$style.square} ${$style.dark}`"></div>
      <div :class="`${$style.square} ${$style.light}`"></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-pawn']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-castle']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-queen']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-king']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-bishop']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.dark} ${$style['white-knight']}`"
      ></div>
      <div
        :class="`${$style.square} ${$style.light} ${$style['white-castle']}`"
      ></div>
    </div>
    <div :class="$style['main-instro']">
      <h1 :class="$style['main-title']">
        Chơi trực tuyến tại trang web cờ vua số 1!
      </h1>
      <div :class="$style['main-info']">
        <p :class="$style['main-info-item']">
          Các ván đấu hôm nay:
          <span :class="$style['main-info-item-counter']"> 3.261.436 </span>
        </p>
        <p :class="$style['main-info-item']">
          Các ván đấu đang chơi:
          <span :class="$style['main-info-item-counter']"> 423.577 </span>
        </p>
      </div>
      <div :class="$style['main-button-wrap']">
        <div
          v-if="!$store.state.gameId"
          :class="$style['main-button']"
          @click="joinGame"
        >
          <img src="@/assets/icon/playhand.png" alt="" />
          <div :class="$style['main-button-title']">
            <h2>Chơi trực tuyến</h2>
            Đấu với ai đó cùng cấp độ với bạn
          </div>
        </div>
        <div v-else :class="$style['main-button']" @click="continueGame">
          <img src="@/assets/icon/playhand.png" alt="" />
          <div :class="$style['main-button-title']">
            <h2>Chơi tiếp</h2>
            Tiếp tục ván đấu của bạn
          </div>
        </div>
        <div :class="$style['main-button']">
          <img src="@/assets/icon/computer.png" alt="" />
          <div :class="$style['main-button-title']">
            <h2>Chơi với máy tính</h2>
            chơi với máy có thể tùy chỉnh
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { io, Socket } from "socket.io-client";
import { Vue } from "vue-class-component";

export default class Main extends Vue {
  socket!: Socket;
  loading!: HTMLElement;

  created(): void {
    this.socket = io("http://localhost:3002");
  }

  mounted(): void {
    this.loading = document.getElementById("loading") as HTMLElement;
  }

  continueGame() {
    router.push("/game");
  }

  joinGame(): void {
    const { player } = store.state;
    if (player) {
      this.loading.style.display = "flex";
      this.socket.emit("join", { id: player._id, name: player.nickname });
      this.socket.on(`games:${player._id}:created`, (gameId) => {
        store.dispatch("setGameId", gameId);
        this.loading.style.display = "none";
        router.push("/game");
      });
    } else alert("Bạn chưa đăng nhập");
  }

  beforeUnmount(): void {
    if (this.socket) this.socket.disconnect();
  }
}
</script>

<style lang="scss" module>
.main {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  & .board {
    width: 33vw;
    height: 33vw;
    border: 5px solid black;
    & .square {
      width: 12.5%;
      height: 12.5%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    & .light {
      background-color: #f0d9b5;
    }
    & .dark {
      background-color: #b58863;
    }
    & .black-castle {
      background-image: url("/public/img/pieces/rdt.png");
    }
    & .black-knight {
      background-image: url("/public/img/pieces/ndt.png");
    }
    & .black-bishop {
      background-image: url("/public/img/pieces/bdt.png");
    }
    & .black-king {
      background-image: url("/public/img/pieces/kdt.png");
    }
    & .black-queen {
      background-image: url("/public/img/pieces/qdt.png");
    }
    & .black-pawn {
      background-image: url("/public/img/pieces/pdt.png");
    }
    & .white-castle {
      background-image: url("/public/img/pieces/rlt.png");
    }
    & .white-knight {
      background-image: url("/public/img/pieces/nlt.png");
    }
    & .white-bishop {
      background-image: url("/public/img/pieces/blt.png");
    }
    & .white-king {
      background-image: url("/public/img/pieces/klt.png");
    }
    & .white-queen {
      background-image: url("/public/img/pieces/qlt.png");
    }
    & .white-pawn {
      background-image: url("/public/img/pieces/plt.png");
    }
  }
  & .main-instro {
    display: flex;
    flex-direction: column;
    padding: 10px 50px;
    width: 500px;
    height: 500px;
    color: aliceblue;
    & .main-title {
      text-align: center;
      font-size: 2.8rem;
      max-lines: 3;
    }
    & .main-info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 160px;
      & .main-info-item {
        color: #989795;
        font-size: 19px;
        & .main-info-item-counter {
          color: #fff;
          font-family: var(--globalSecondaryFont);
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
    & .main-button-wrap {
      height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      & .main-button {
        height: 80px;
        cursor: pointer;
        color: #5c1810;
        background-color: #cea159;
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 0px 20px;
        &:hover {
          background-color: #d3ab6a;
        }
        & > img {
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
