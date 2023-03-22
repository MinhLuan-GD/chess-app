import { LoginModel } from "@/models/login";
import { SignupModel } from "@/models/signup";
import { Player } from "@/utils/types";
import { api } from ".";

const currentPlayer = () =>
  api.get<Player>("/auth/current-player", {
    withCredentials: true,
  });

const signup = (model: SignupModel) =>
  api.post<Player>("/players/", model, { withCredentials: true });

const login = (model: LoginModel) =>
  api.post<Player>("/auth/login/", model, { withCredentials: true });

const getPlayer = (id: string) => api.get<Player>(`/players/${id}`);

export { currentPlayer, signup, login, getPlayer };
