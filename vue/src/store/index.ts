import { Piece, State } from "@/utils/types";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    referee: { pieces: [] },
  },
  getters: {},
  mutations: {
    CHANGE_BOARD_STATE(state, pieces: Piece[]) {
      state.referee.pieces = pieces;
    },
  },
  actions: {
    changeBoardState({ commit }, pieces: string) {
      commit("CHANGE_BOARD_STATE", pieces);
    },
  },
  modules: {},
});
