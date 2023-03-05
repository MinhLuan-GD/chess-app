import { samePosition, TeamType } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";
import { tileIsOccupied, tileIsOccupiedOpponent } from "./general.rule";

export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const specialRow = team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = team === TeamType.WHITE ? 1 : -1;

  if (
    initialPosition.x === desiredPosition.x &&
    initialPosition.y === specialRow &&
    desiredPosition.y - initialPosition.y === 2 * pawnDirection
  ) {
    if (
      !tileIsOccupied(desiredPosition, boardState) &&
      !tileIsOccupied(
        { ...desiredPosition, y: desiredPosition.y - pawnDirection },
        boardState
      )
    ) {
      return true;
    }
  } else if (
    initialPosition.x === desiredPosition.x &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (!tileIsOccupied(desiredPosition, boardState)) {
      return true;
    }
  } else if (
    desiredPosition.x - initialPosition.x === -1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  } else if (
    desiredPosition.x - initialPosition.x === 1 &&
    desiredPosition.y - initialPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedOpponent(desiredPosition, boardState, team)) {
      return true;
    }
  }
  return false;
};

export const getPossiblePawnMoves = (
  piece: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  const specialRow = piece.team === TeamType.WHITE ? 1 : 6;
  const pawnDirection = piece.team === TeamType.WHITE ? 1 : -1;

  const normalMove = {
    x: piece.position.x,
    y: piece.position.y + pawnDirection,
  };
  const specialMove = {
    x: piece.position.x,
    y: piece.position.y + pawnDirection * 2,
  };
  const upperLeftAttack = {
    x: piece.position.x - 1,
    y: piece.position.y + pawnDirection,
  };
  const upperRightAttack = {
    x: piece.position.x + 1,
    y: piece.position.y + pawnDirection,
  };
  const leftPosition = { x: piece.position.x - 1, y: piece.position.y };
  const rightPosition = { x: piece.position.x + 1, y: piece.position.y };
  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove);
    if (
      piece.position.y === specialRow &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove);
    }
  }

  if (tileIsOccupiedOpponent(upperLeftAttack, boardState, piece.team)) {
    possibleMoves.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) =>
      samePosition(p.position, leftPosition)
    );
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMoves.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedOpponent(upperRightAttack, boardState, piece.team)) {
    possibleMoves.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) =>
      samePosition(p.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMoves.push(upperRightAttack);
    }
  }

  return possibleMoves;
};
