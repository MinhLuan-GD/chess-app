import { TeamType } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";
import { tileIsEmptyOrOccupiedByOpponent } from "./general.rule";

export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        }
      }
      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getPossibleKnightMoves = (
  piece: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove: Position = {
        x: piece.position.x + j,
        y: piece.position.y + i * 2,
      };
      const horizontalMove: Position = {
        x: piece.position.x + i * 2,
        y: piece.position.y + j,
      };

      if (
        tileIsEmptyOrOccupiedByOpponent(verticalMove, boardState, piece.team)
      ) {
        possibleMoves.push(verticalMove);
      }

      if (
        tileIsEmptyOrOccupiedByOpponent(horizontalMove, boardState, piece.team)
      ) {
        possibleMoves.push(horizontalMove);
      }
    }
  }

  return possibleMoves;
};
