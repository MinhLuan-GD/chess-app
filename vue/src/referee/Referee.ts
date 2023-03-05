import { Piece, Position } from "@/utils/types";
import { PieceType, TeamType } from "@/utils/constants";
import {
  pawnMove,
  knightMove,
  bishopMove,
  rookMove,
  queenMove,
  kingMove,
  getPossiblePawnMoves,
  getPossibleKnightMoves,
  getPossibleBishopMoves,
  getPossibleRookMoves,
  getPossibleQueenMoves,
  getPossibleKingMoves,
} from "./rules";

export default class Referee {
  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    pieceType: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.WHITE ? 1 : -1;
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
    let validMode = false;
    switch (piece) {
      case PieceType.PAWN:
        validMode = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KNIGHT:
        validMode = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMode = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.ROOK:
        validMode = rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.QUEEN:
        validMode = queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KING:
        validMode = kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
    }
    return validMode;
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState);
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState);
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState);
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState);
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState);
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState);

      default:
        return [];
    }
  }
}
