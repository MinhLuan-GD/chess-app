import { Game } from "@/utils/types";
import { api } from ".";

const getFenGame = (id: string) => api.get<string>(`games/${id}/fen`);

const getGame = (id: string) => api.get<Game>(`/games/${id}`);

export { getFenGame, getGame };
