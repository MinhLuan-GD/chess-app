import { TeamType, samePosition, toAxis } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";
import { Chess } from "chess.js";
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedOpponent,
} from "./general.rule";

export const kingMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 2; i++) {
    const multiplierX =
      desiredPosition.x < initialPosition.x
        ? -1
        : desiredPosition.x > initialPosition.x
        ? 1
        : 0;
    const multiplierY =
      desiredPosition.y < initialPosition.y
        ? -1
        : desiredPosition.y > initialPosition.y
        ? 1
        : 0;

    const passedPosition: Position = {
      x: initialPosition.x + i * multiplierX,
      y: initialPosition.y + i * multiplierY,
    };
    if (samePosition(passedPosition, desiredPosition)) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};

export const getPossibleKingMoves = (
  piece: Piece,
  boardState: Piece[],
  gameClient: Chess
): Position[] => {
  let possibleMoves: Position[] = [];

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x + i,
      y: piece.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x + i,
      y: piece.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x - i,
      y: piece.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x - i,
      y: piece.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x,
      y: piece.position.y + i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x,
      y: piece.position.y - i,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x + i,
      y: piece.position.y,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  for (let i = 1; i < 2; i++) {
    const destination: Position = {
      x: piece.position.x - i,
      y: piece.position.y,
    };

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedOpponent(destination, boardState, piece.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  if (piece.team === TeamType.WHITE) {
    if (samePosition(piece.position, { x: 4, y: 0 })) {
      possibleMoves.push({ x: 6, y: 0 });
      possibleMoves.push({ x: 2, y: 0 });
    }
  }

  if (piece.team === TeamType.BLACK) {
    if (samePosition(piece.position, { x: 4, y: 7 })) {
      possibleMoves.push({ x: 6, y: 7 });
      possibleMoves.push({ x: 2, y: 7 });
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
