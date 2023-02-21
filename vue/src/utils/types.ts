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
}

interface State {
  referee: { pieces: Piece[] };
}

export { Piece, Board, Position, State };
