import { Game } from "@/utils/types";
import { api } from ".";

const getFenGame = (id: string) => api.get<string>(`games/${id}/fen`);

const getGame = (id: string) => api.get<Game>(`/games/${id}`);

const getGames = (query = "") => api.get<Game[]>(`/games/current${query}`);

const getGamesLen = () => api.get<number>(`/games/current/len`);

export { getFenGame, getGame, getGames, getGamesLen };
