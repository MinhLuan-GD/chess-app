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

interface State {
  referee: { pieces: Piece[] };
}

interface Game {
  _id: string;
  start_time: string;
  end_time?: string;
  player_one: string;
  player_two: string;
  move_time_limit: string;
  game_time_limit: string;
  moves: string[];
  status: string;
}

export { Piece, Board, Position, State, Game };
