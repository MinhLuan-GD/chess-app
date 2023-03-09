import { Piece, Player, State } from "@/utils/types";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    referee: { pieces: [] },
    player: null,
  },
  getters: {},
  mutations: {
    CHANGE_BOARD_STATE(state, pieces: Piece[]) {
      state.referee.pieces = pieces;
    },
    CHANGE_PLAYER(state, player: Player) {
      state.player = player;
    },
  },
  actions: {
    changeBoardState({ commit }, pieces: string) {
      commit("CHANGE_BOARD_STATE", pieces);
    },
    changePlayer({ commit }, player: Player) {
      commit("CHANGE_PLAYER", player);
    },
  },
  modules: {},
});
