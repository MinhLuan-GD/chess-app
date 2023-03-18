import { currentPlayer } from "@/api/player";
import { Player, State } from "@/utils/types";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    player: null,
    gameId: null,
  },
  getters: {},
  mutations: {
    SET_PLAYER(state, player: Player) {
      state.player = player;
    },
    SET_GAME_ID(state, gameId: string) {
      state.gameId = gameId;
    },
  },
  actions: {
    async getPlayer({ commit }) {
      const response = await currentPlayer();
      if (response.status !== 200) {
        commit("SET_PLAYER", null);
        return;
      }
      commit("SET_PLAYER", response.data);
    },
    setPlayer({ commit }, player: Player) {
      commit("SET_PLAYER", player);
    },
    setGameId({ commit }, gameId: string) {
      commit("SET_GAME_ID", gameId);
    },
  },
  modules: {},
});
