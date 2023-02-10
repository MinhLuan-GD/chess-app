import { Piece, PieceType, TeamType } from "./types";

export const initChess = (play: string) => {
  const by = play === "w" ? 7 : 0;
  const wy = play === "w" ? 0 : 7;
  const bpy = play === "w" ? 6 : 1;
  const wpy = play === "w" ? 1 : 6;
  const opponent = play === "w" ? TeamType.OPPONENT : TeamType.OUR;
  const our = play === "w" ? TeamType.OUR : TeamType.OPPONENT;
  const pieces: Piece[] = [
    {
      img: "rdt.png",
      pieceX: 0,
      pieceY: by,
      piece: PieceType.ROOK,
      team: opponent,
    },
    {
      img: "rdt.png",
      pieceX: 7,
      pieceY: by,
      piece: PieceType.ROOK,
      team: opponent,
    },
    { img: "rlt.png", pieceX: 0, pieceY: wy, piece: PieceType.ROOK, team: our },
    { img: "rlt.png", pieceX: 7, pieceY: wy, piece: PieceType.ROOK, team: our },
    {
      img: "ndt.png",
      pieceX: 1,
      pieceY: by,
      piece: PieceType.KNIGHT,
      team: opponent,
    },
    {
      img: "ndt.png",
      pieceX: 6,
      pieceY: by,
      piece: PieceType.KNIGHT,
      team: opponent,
    },
    {
      img: "nlt.png",
      pieceX: 1,
      pieceY: wy,
      piece: PieceType.KNIGHT,
      team: our,
    },
    {
      img: "nlt.png",
      pieceX: 6,
      pieceY: wy,
      piece: PieceType.KNIGHT,
      team: our,
    },
    {
      img: "bdt.png",
      pieceX: 2,
      pieceY: by,
      piece: PieceType.BISHOP,
      team: opponent,
    },
    {
      img: "bdt.png",
      pieceX: 5,
      pieceY: by,
      piece: PieceType.BISHOP,
      team: opponent,
    },
    {
      img: "blt.png",
      pieceX: 2,
      pieceY: wy,
      piece: PieceType.BISHOP,
      team: our,
    },
    {
      img: "blt.png",
      pieceX: 5,
      pieceY: wy,
      piece: PieceType.BISHOP,
      team: our,
    },
    {
      img: "qdt.png",
      pieceX: 3,
      pieceY: by,
      piece: PieceType.QUEEN,
      team: opponent,
    },
    { img: "kdt.png", pieceX: 4, pieceY: by, piece: PieceType.KING, team: our },
    {
      img: "qlt.png",
      pieceX: 3,
      pieceY: wy,
      piece: PieceType.QUEEN,
      team: opponent,
    },
    { img: "klt.png", pieceX: 4, pieceY: wy, piece: PieceType.KING, team: our },
  ];
  for (let i = 0; i < 8; i++) {
    pieces.push({
      img: "pdt.png",
      pieceX: i,
      pieceY: bpy,
      piece: PieceType.PAWN,
      team: opponent,
    });
    pieces.push({
      img: "plt.png",
      pieceX: i,
      pieceY: wpy,
      piece: PieceType.PAWN,
      team: our,
    });
  }

  return pieces;
};
