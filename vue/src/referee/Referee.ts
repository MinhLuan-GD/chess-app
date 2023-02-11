import { Piece, PieceType, TeamType } from "@/utils/types";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.pieceX === x && p.pieceY === y);
    return piece != null;
  }

  tileIsOccupiedOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.pieceX === x && p.pieceY === y && p.team !== team
    );
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
  ): boolean {
    if (piece === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      // Movement logic
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
      // Attack logic
      else if (x - px === -1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedOpponent(x, y, boardState, team)) {
          return true;
        }
      } else {
        console.log("trash");
      }
    }
    return false;
  }
}
