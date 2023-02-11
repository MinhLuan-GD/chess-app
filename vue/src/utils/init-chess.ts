import { Piece, PieceType, TeamType } from "./types";

export const initChess = () => {
  const pieces: Piece[] = [
    {
      img: "rdt.png",
      pieceX: 0,
      pieceY: 7,
      piece: PieceType.ROOK,
      team: TeamType.OPPONENT,
    },
    {
      img: "rdt.png",
      pieceX: 7,
      pieceY: 7,
      piece: PieceType.ROOK,
      team: TeamType.OPPONENT,
    },
    {
      img: "rlt.png",
      pieceX: 0,
      pieceY: 0,
      piece: PieceType.ROOK,
      team: TeamType.OUR,
    },
    {
      img: "rlt.png",
      pieceX: 7,
      pieceY: 0,
      piece: PieceType.ROOK,
      team: TeamType.OUR,
    },
    {
      img: "ndt.png",
      pieceX: 1,
      pieceY: 7,
      piece: PieceType.KNIGHT,
      team: TeamType.OPPONENT,
    },
    {
      img: "ndt.png",
      pieceX: 6,
      pieceY: 7,
      piece: PieceType.KNIGHT,
      team: TeamType.OPPONENT,
    },
    {
      img: "nlt.png",
      pieceX: 1,
      pieceY: 0,
      piece: PieceType.KNIGHT,
      team: TeamType.OUR,
    },
    {
      img: "nlt.png",
      pieceX: 6,
      pieceY: 0,
      piece: PieceType.KNIGHT,
      team: TeamType.OUR,
    },
    {
      img: "bdt.png",
      pieceX: 2,
      pieceY: 7,
      piece: PieceType.BISHOP,
      team: TeamType.OPPONENT,
    },
    {
      img: "bdt.png",
      pieceX: 5,
      pieceY: 7,
      piece: PieceType.BISHOP,
      team: TeamType.OPPONENT,
    },
    {
      img: "blt.png",
      pieceX: 2,
      pieceY: 0,
      piece: PieceType.BISHOP,
      team: TeamType.OUR,
    },
    {
      img: "blt.png",
      pieceX: 5,
      pieceY: 0,
      piece: PieceType.BISHOP,
      team: TeamType.OUR,
    },
    {
      img: "qdt.png",
      pieceX: 3,
      pieceY: 7,
      piece: PieceType.QUEEN,
      team: TeamType.OPPONENT,
    },
    {
      img: "kdt.png",
      pieceX: 4,
      pieceY: 7,
      piece: PieceType.KING,
      team: TeamType.OPPONENT,
    },
    {
      img: "qlt.png",
      pieceX: 3,
      pieceY: 0,
      piece: PieceType.QUEEN,
      team: TeamType.OUR,
    },
    {
      img: "klt.png",
      pieceX: 4,
      pieceY: 0,
      piece: PieceType.KING,
      team: TeamType.OUR,
    },
  ];
  for (let i = 0; i < 8; i++) {
    pieces.push({
      img: "pdt.png",
      pieceX: i,
      pieceY: 6,
      piece: PieceType.PAWN,
      team: TeamType.OPPONENT,
    });
    pieces.push({
      img: "plt.png",
      pieceX: i,
      pieceY: 1,
      piece: PieceType.PAWN,
      team: TeamType.OUR,
    });
  }

  return pieces;
};
