import { Piece, Position } from "./types";

const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8];
const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

const samePosition = (a: Position, b: Position) => {
  return a.x === b.x && a.y === b.y;
};

const initialBoardState = () => {
  const pieces: Piece[] = [
    {
      img: "rdt.png",
      position: { x: 0, y: 7 },
      piece: PieceType.ROOK,
      team: TeamType.OPPONENT,
    },
    {
      img: "rdt.png",
      position: { x: 7, y: 7 },
      piece: PieceType.ROOK,
      team: TeamType.OPPONENT,
    },
    {
      img: "rlt.png",
      position: { x: 0, y: 0 },
      piece: PieceType.ROOK,
      team: TeamType.OUR,
    },
    {
      img: "rlt.png",
      position: { x: 7, y: 0 },
      piece: PieceType.ROOK,
      team: TeamType.OUR,
    },
    {
      img: "ndt.png",
      position: { x: 1, y: 7 },
      piece: PieceType.KNIGHT,
      team: TeamType.OPPONENT,
    },
    {
      img: "ndt.png",
      position: { x: 6, y: 7 },
      piece: PieceType.KNIGHT,
      team: TeamType.OPPONENT,
    },
    {
      img: "nlt.png",
      position: { x: 1, y: 0 },
      piece: PieceType.KNIGHT,
      team: TeamType.OUR,
    },
    {
      img: "nlt.png",
      position: { x: 6, y: 0 },
      piece: PieceType.KNIGHT,
      team: TeamType.OUR,
    },
    {
      img: "bdt.png",
      position: { x: 2, y: 7 },
      piece: PieceType.BISHOP,
      team: TeamType.OPPONENT,
    },
    {
      img: "bdt.png",
      position: { x: 5, y: 7 },
      piece: PieceType.BISHOP,
      team: TeamType.OPPONENT,
    },
    {
      img: "blt.png",
      position: { x: 2, y: 0 },
      piece: PieceType.BISHOP,
      team: TeamType.OUR,
    },
    {
      img: "blt.png",
      position: { x: 5, y: 0 },
      piece: PieceType.BISHOP,
      team: TeamType.OUR,
    },
    {
      img: "qdt.png",
      position: { x: 3, y: 7 },
      piece: PieceType.QUEEN,
      team: TeamType.OPPONENT,
    },
    {
      img: "kdt.png",
      position: { x: 4, y: 7 },
      piece: PieceType.KING,
      team: TeamType.OPPONENT,
    },
    {
      img: "qlt.png",
      position: { x: 3, y: 0 },
      piece: PieceType.QUEEN,
      team: TeamType.OUR,
    },
    {
      img: "klt.png",
      position: { x: 4, y: 0 },
      piece: PieceType.KING,
      team: TeamType.OUR,
    },
  ];
  for (let i = 0; i < 8; i++) {
    pieces.push({
      img: "pdt.png",
      position: { x: i, y: 6 },
      piece: PieceType.PAWN,
      team: TeamType.OPPONENT,
    });
    pieces.push({
      img: "plt.png",
      position: { x: i, y: 1 },
      piece: PieceType.PAWN,
      team: TeamType.OUR,
    });
  }

  return pieces;
};

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
export {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  TeamType,
  PieceType,
  initialBoardState,
  samePosition,
};
