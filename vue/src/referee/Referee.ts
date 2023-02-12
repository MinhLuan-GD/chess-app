import { Piece, Position } from "@/utils/types";
import { PieceType, TeamType } from "@/utils/constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
    return piece != null;
  }

  tileIsOccupiedOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );
    return piece != null;
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    pieceType: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (pieceType === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        return piece != null;
      }
    }
    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    piece: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (piece === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;

      // Movement logic
      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.tileIsOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)
        ) {
          return true;
        }
      }
      // Attack logic
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
