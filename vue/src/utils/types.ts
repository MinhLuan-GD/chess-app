import { PieceType, TeamType } from "./constants";

interface Position {
  x: number;
  y: number;
}
interface Piece {
  img: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
  possibleMoves?: Position[];
}

interface Board {
  key: string;
  black: boolean;
  image?: string;
  highlight: boolean;
  team?: TeamType;
}

interface Player {
  _id: string;
  email: string;
  nickname: string;
  rating: number;
}

interface State {
  player: Player | null;
  gameId: string | null;
  games: Game[];
  gameMessages: Message[];
}

interface Message {
  _id: string;
  player: Player;
  text: string;
}

interface Game {
  _id: string;
  start_time: string;
  end_time?: string;
  whitePlayerId: string;
  whitePlayerName: string;
  blackPlayerId: string;
  blackPlayerName: string;
  move_time_limit: string;
  game_time_limit: string;
  messages: Message[];
  moves: string[];
  status: number;
}

export { Piece, Board, Position, State, Game, Player, Message };
