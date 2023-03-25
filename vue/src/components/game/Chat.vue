<template>
  <div :class="$style.container">
    <div :class="$style.title">Chat</div>
    <div :class="$style['chat-box']" ref="chatBoxRef">
      <!-- messages -->

      <div
        v-for="message in $store.state.gameMessages"
        :key="message._id"
        :class="$style.item"
      >
        <div :class="$style.name">{{ message.player.nickname }}</div>
        <div :class="$style.message">{{ message.text }}</div>
      </div>

      <!-- messages -->
    </div>
    <div :class="$style['chat-input']">
      <input type="text" v-model="message" />
      <div :class="$style.btn" @click="sendMessage">
        <img src="@/assets/icon/send-fill.svg" alt="send" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Message } from "@/utils/types";
import { io, Socket } from "socket.io-client";
import { ref } from "vue";
import { Vue } from "vue-class-component";

export default class Chat extends Vue {
  chatBoxRef = ref() as unknown as HTMLDivElement;

  socket!: Socket;

  message = "";
  gameId = store.state.gameId;

  created() {
    this.socket = io("http://localhost:3002");
    this.gameId = store.state.gameId;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  mounted() {
    this.changeScroll();
    this.socket.on(`game:${this.gameId}:message`, (data: Message) => {
      if (data.player._id !== store.state.player?._id) {
        store.dispatch("pushGameMessage", data);
        this.changeScroll();
      }
    });
  }

  changeScroll() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.chatBoxRef.scrollTo(0, this.chatBoxRef.scrollHeight);
      }, 200 * i);
    }
  }

  sendMessage() {
    if (this.message && store.state.player) {
      store.dispatch("pushGameMessage", {
        _id: "",
        text: this.message,
        player: {
          nickname: store.state.player.nickname,
          rating: store.state.player.rating,
        },
      });
      this.changeScroll();
      this.socket.emit("message", {
        game: this.gameId,
        message: {
          text: this.message,
          player: {
            _id: store.state.player._id,
            nickname: store.state.player.nickname,
            rating: store.state.player.rating,
          },
        },
      });
      this.message = "";
    }
  }

  beforeUnmount() {
    if (this.socket) this.socket.disconnect();
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }
}
</script>

<style lang="scss" module>
.container {
  width: 33vw;
  height: 40vw;
  border-radius: 5px;
  border: 3px solid #cea159;
  display: block;
  background-color: #312e2b;
  & .title {
    background-color: #cea159;
    height: 8%;
    color: #5c1810;
    font-size: 20px;
    display: flex;
    padding-left: 10px;
    align-items: center;
  }
  & .chat-box {
    background-color: #f0d9b5;
    height: 84%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #5c1810;
      border-radius: 10px;
    }
    & .item {
      display: flex;
      padding: 5px 10px;
      & .name {
        color: #5c1810;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
      }
      & .message {
        color: #5c1810;
        font-size: 18px;
      }
    }
  }
  & .chat-input {
    background-color: #cea159;
    height: 8%;
    display: flex;
    align-items: center;
    padding-left: 5px;
    & input {
      width: 80%;
      height: 80%;
      border: none;
      border-radius: 5px;
      padding-left: 10px;
      background-color: #f0d9b5;
      outline: none;
      font-size: 18px;
    }
    & .btn {
      width: 20%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & img {
        width: 50%;
        height: 50%;
      }
    }
  }
}
</style>
