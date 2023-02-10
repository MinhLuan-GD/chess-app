interface Piece {
  img: string;
  pieceX: number;
  pieceY: number;
  piece: PieceType;
  team: TeamType;
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

export { Piece, PieceType, TeamType };
