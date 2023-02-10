import { Piece, PieceType, TeamType } from "@/utils/types";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    console.log("check if tile is occupied...");
    const piece = boardState.find((p) => p.pieceX === x && p.pieceY === y);
    return piece != null;
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    piece: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    if (piece === PieceType.PAWN) {
      if (team === TeamType.OUR) {
        if (py === 1) {
          // if (px === x && (y - py === 1 || y - py === 2)) {
          //   if (!this.tileIsOccupied(x, y, boardState)) {
          //     return true;
          //   }
          // }
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          } else if (px === x && y - py === 2) {
            if (
              !this.tileIsOccupied(x, y, boardState) &&
              !this.tileIsOccupied(x, y - 1, boardState)
            ) {
              return true;
            }
          }
        } else {
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}
