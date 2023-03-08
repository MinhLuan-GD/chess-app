<template>
  <Chessboard />
  {{ $store.state.boardState }}
</template>

<script lang="ts">
import { initialBoardState } from "@/utils/constants";
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import Chessboard from "./ChessBoard.vue";
import { io, Socket } from "socket.io-client";

@Options({ components: { Chessboard } })
export default class Referee extends Vue {
  socket!: Socket;
  created(): void {
    store.dispatch("changeBoardState", initialBoardState());

    this.socket = io("http://localhost:3002");
    this.socket.emit("msgToServer", "Hello from client");
    this.socket.on("msgToClient", (data: string) => {
      console.log(data);
    });
  }
}
</script>

<style scoped></style>
