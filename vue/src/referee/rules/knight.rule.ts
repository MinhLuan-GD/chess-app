import { TeamType, toAxis } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";
import { Chess } from "chess.js";
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
  boardState: Piece[],
  gameClient: Chess
): Position[] => {
  let possibleMoves: Position[] = [];

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

  possibleMoves = possibleMoves.filter((move) => {
    const game = new Chess(gameClient.fen());
    const from = toAxis(piece.position);
    const to = toAxis(move);
    try {
      game.move({ from, to });
      return true;
    } catch (error) {
      return false;
    }
  });

  return possibleMoves;
};
