import { TeamType, samePosition } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";
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
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = [];

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

  return possibleMoves;
};
