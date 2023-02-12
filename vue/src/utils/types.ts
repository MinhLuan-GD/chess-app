import { PieceType, TeamType } from "./constants";

interface Position {
  x: number;
  y: number;
}
interface Piece {
  img: string;
  position: Position;
  piece: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

interface Board {
  key: string;
  black: boolean;
  image?: string;
}

export { Piece, Board, Position };
