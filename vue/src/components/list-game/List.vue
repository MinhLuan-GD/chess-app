<template>
  <div :class="$style.list">
    <h1 :class="$style.title">Các trận đấu</h1>
    <div :class="$style['list-body']" v-if="numOfPage">
      <table>
        <tr>
          <th>GameId</th>
          <th>Game</th>
          <th>Rank</th>
        </tr>
        <tr
          v-for="game in $store.state.games"
          :key="game._id"
          :class="$style.body"
          @click="() => joinGame(game._id)"
        >
          <td>{{ game._id }}</td>
          <td :class="$style.game">
            <div>{{ game.whitePlayerName }}</div>
            <div>-</div>
            <div>{{ game.blackPlayerName }}</div>
          </td>
          <td>2700-2900</td>
        </tr>
      </table>
    </div>
    <div v-else :class="$style['no-game']">Không có trận đấu nào</div>
    <div v-if="numOfPage" :class="$style['page-contain']">
      <div
        @click="() => $router.push(`listgame?page=${i}`)"
        v-for="i in numOfPage"
        :key="i"
        :class="$style.item"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getGames, getGamesLen } from "@/api/game";
import store from "@/store";
import { watch } from "vue";
import { Vue } from "vue-class-component";

export default class List extends Vue {
  numOfPage = 0;
  created(): void {
    getGamesLen().then(({ data }) => {
      this.numOfPage = data;
    });
    watch(
      () => this.$route.query.page,
      () => {
        console.log(this.$route.query.page);
        this.changePage(this.$route.query.page);
      }
    );
  }

  changePage(page: any) {
    if (page)
      getGames(`?page=${page}`).then(({ data }) =>
        store.dispatch("setGames", data)
      );
    else getGames().then(({ data }) => store.dispatch("setGames", data));
  }

  joinGame(gameId: string) {
    if (store.state.player) {
      store.dispatch("setGameId", gameId);
      this.$router.push("game");
    } else {
      alert("Bạn chưa đăng nhập");
    }
  }
}
</script>

<style lang="scss" module>
.list {
  background-color: #272522;
  width: auto;
  height: 664px;
  padding: 10px 20px;
  border-radius: 15px;
  margin: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  & .title {
    color: white;
    margin: 20px 0;
  }

  & .page-contain {
    height: 50px;
    background-color: #5c1810;
    position: absolute;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 5px;
    & .item {
      height: 45px;
      width: 45px;
      background-color: #22201f;
      margin: 0 5px;
      color: aliceblue;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
        background-color: #22201fcc;
      }
    }
  }

  & .list-body {
    margin: 5px 0px;
    width: 100%;
    padding: 10px;
    background: #22201f;
    border-radius: 10px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #171614;
    }
    & table {
      color: aliceblue;
      width: 100%;
      & .game {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 40px;
      }
      & tr {
        height: 50px;
      }
      & th {
        &:nth-child(1) {
          width: 280px;
        }
        &:nth-child(3) {
          width: 280px;
        }
      }
      & td {
        padding: 5px;
        text-align: center;
      }
      & .body {
        height: 40px;
        background-color: rgb(185 185 185 / 35%);
        &:hover {
          color: rgb(217, 224, 230);
          background-color: rgb(185 185 185 / 50%);
          cursor: pointer;
        }
      }
    }
  }

  & .no-game {
    color: aliceblue;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 150px;
    font-size: 36px;
    font-weight: 600;
  }
}
</style>
