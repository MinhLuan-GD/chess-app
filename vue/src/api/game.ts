import { Game } from "@/utils/types";
import { api } from ".";

const getFenGame = (id: string) => {
  return api.get(`games/${id}/fen`);
};

const getGame = (id: string) => {
  return api.get<Game>(`/games/${id}`);
};

export { getFenGame, getGame };
