import { getGames } from "@/api/game";
import { currentPlayer } from "@/api/player";
import { Game, Message, Player, State } from "@/utils/types";
import { createStore } from "vuex";

export default createStore<State>({
  state: {
    player: null,
    gameId: null,
    games: [],
    gameMessages: [],
  },
  getters: {},
  mutations: {
    SET_PLAYER(state, player: Player) {
      state.player = player;
    },
    SET_GAME_ID(state, gameId: string) {
      state.gameId = gameId;
      localStorage.setItem("gameId", gameId);
    },
    DELETE_GAME_ID(state) {
      state.gameId = null;
      localStorage.removeItem("gameId");
    },
    SET_GAME_MESSAGES(state, messages: Message[]) {
      state.gameMessages = messages;
    },
    PUSH_GAME_MESSAGE(state, message: Message) {
      if (state.gameMessages) {
        state.gameMessages.push(message);
      }
    },
    SET_GAME(state, games) {
      state.games = games;
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
    deleteGameId({ commit }) {
      commit("DELETE_GAME_ID", null);
    },
    getGameId({ commit }) {
      const gameId = localStorage.getItem("gameId");
      if (gameId) {
        commit("SET_GAME_ID", gameId);
      }
    },
    logout({ commit }) {
      commit("SET_PLAYER", null);
    },
    setGameMessages({ commit }, messages: Message[]) {
      commit("SET_GAME_MESSAGES", messages);
    },
    pushGameMessage({ commit }, message: Message) {
      commit("PUSH_GAME_MESSAGE", message);
    },
    async getTenGames({ commit }) {
      try {
        const { data } = await getGames();
        commit("SET_GAME", data);
      } catch (error) {
        console.log(error);
      }
    },
    setGames({ commit }, games: Game[]) {
      commit("SET_GAME", games);
    },
  },
  modules: {},
});
