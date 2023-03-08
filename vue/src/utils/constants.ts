import { Piece, Position } from "./types";

const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8];
const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

const samePosition = (a: Position, b: Position) => {
  return a.x === b.x && a.y === b.y;
};

const initialBoardState = (gameBoard: any[][]) => {
  const boardState: Piece[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      const piece = gameBoard[i][j];
      if (piece) {
        let type, img, team, imgTeam;
        if (piece.color === "w") {
          team = TeamType.WHITE;
          imgTeam = "l";
        } else {
          team = TeamType.BLACK;
          imgTeam = "d";
        }
        switch (piece.type) {
          case "p":
            type = PieceType.PAWN;
            img = `p${imgTeam}t.png`;
            break;
          case "r":
            type = PieceType.ROOK;
            img = `r${imgTeam}t.png`;
            break;
          case "n":
            type = PieceType.KNIGHT;
            img = `n${imgTeam}t.png`;
            break;
          case "b":
            type = PieceType.BISHOP;
            img = `b${imgTeam}t.png`;
            break;
          case "q":
            type = PieceType.QUEEN;
            img = `q${imgTeam}t.png`;
            break;
          default:
            type = PieceType.KING;
            img = `k${imgTeam}t.png`;
        }
        boardState.push({
          type,
          img,
          team,
          position: { x: j, y: Math.abs(i - 7) },
        });
      }
    }
  return boardState;
};

export const initialBoardStateOld = () => {
  const pieces: Piece[] = [
    {
      img: "rdt.png",
      position: { x: 0, y: 7 },
      type: PieceType.ROOK,
      team: TeamType.BLACK,
    },
    {
      img: "rdt.png",
      position: { x: 7, y: 7 },
      type: PieceType.ROOK,
      team: TeamType.BLACK,
    },
    {
      img: "rlt.png",
      position: { x: 0, y: 0 },
      type: PieceType.ROOK,
      team: TeamType.WHITE,
    },
    {
      img: "rlt.png",
      position: { x: 7, y: 0 },
      type: PieceType.ROOK,
      team: TeamType.WHITE,
    },
    {
      img: "ndt.png",
      position: { x: 1, y: 7 },
      type: PieceType.KNIGHT,
      team: TeamType.BLACK,
    },
    {
      img: "ndt.png",
      position: { x: 6, y: 7 },
      type: PieceType.KNIGHT,
      team: TeamType.BLACK,
    },
    {
      img: "nlt.png",
      position: { x: 1, y: 0 },
      type: PieceType.KNIGHT,
      team: TeamType.WHITE,
    },
    {
      img: "nlt.png",
      position: { x: 6, y: 0 },
      type: PieceType.KNIGHT,
      team: TeamType.WHITE,
    },
    {
      img: "bdt.png",
      position: { x: 2, y: 7 },
      type: PieceType.BISHOP,
      team: TeamType.BLACK,
    },
    {
      img: "bdt.png",
      position: { x: 5, y: 7 },
      type: PieceType.BISHOP,
      team: TeamType.BLACK,
    },
    {
      img: "blt.png",
      position: { x: 2, y: 0 },
      type: PieceType.BISHOP,
      team: TeamType.WHITE,
    },
    {
      img: "blt.png",
      position: { x: 5, y: 0 },
      type: PieceType.BISHOP,
      team: TeamType.WHITE,
    },
    {
      img: "qdt.png",
      position: { x: 3, y: 7 },
      type: PieceType.QUEEN,
      team: TeamType.BLACK,
    },
    {
      img: "kdt.png",
      position: { x: 4, y: 7 },
      type: PieceType.KING,
      team: TeamType.BLACK,
    },
    {
      img: "qlt.png",
      position: { x: 3, y: 0 },
      type: PieceType.QUEEN,
      team: TeamType.WHITE,
    },
    {
      img: "klt.png",
      position: { x: 4, y: 0 },
      type: PieceType.KING,
      team: TeamType.WHITE,
    },
  ];
  for (let i = 0; i < 8; i++) {
    pieces.push({
      img: "pdt.png",
      position: { x: i, y: 6 },
      type: PieceType.PAWN,
      team: TeamType.BLACK,
    });
    pieces.push({
      img: "plt.png",
      position: { x: i, y: 1 },
      type: PieceType.PAWN,
      team: TeamType.WHITE,
    });
  }

  return pieces;
};

enum TeamType {
  BLACK,
  WHITE,
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
