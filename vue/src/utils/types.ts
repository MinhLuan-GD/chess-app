interface Piece {
  img: string;
  pieceX: number;
  pieceY: number;
  piece: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

interface Board {
  key: string;
  black: boolean;
  image?: string;
}

enum TeamType {
  OPPONENT,
  OUR,
}

enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export { Piece, PieceType, TeamType, Board };
