import { Piece, Position } from "@/utils/types";
import { PieceType, samePosition, TeamType } from "@/utils/constants";

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedOpponent(position, boardState, team)
    );
  }

  tileIsOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));
    return piece != null;
  }

  tileIsOccupiedOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
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

  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const specialRow = team === TeamType.OUR ? 1 : 6;
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    // Movement logic
    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.tileIsOccupied(desiredPosition, boardState) &&
        !this.tileIsOccupied(
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
      if (!this.tileIsOccupied(desiredPosition, boardState)) {
        return true;
      }
    }
    // Attack logic
    else if (
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.tileIsOccupiedOpponent(desiredPosition, boardState, team)) {
        return true;
      }
    } else if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.tileIsOccupiedOpponent(desiredPosition, boardState, team)) {
        return true;
      }
    }
    return false;
  }

  knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }

      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }

      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y - i,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }

      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        const passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y + i,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  }

  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;
        const passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    } else if (initialPosition.y === desiredPosition.y) {
      for (let i = 1; i < 8; i++) {
        const multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;
        const passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  }

  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      let multiplierX = 0;
      let multiplierY = 0;

      if (desiredPosition.x < initialPosition.x) {
        multiplierX = -1;
      } else if (desiredPosition.x > initialPosition.x) {
        multiplierX = 1;
      }

      if (desiredPosition.y < initialPosition.y) {
        multiplierY = -1;
      } else if (desiredPosition.y > initialPosition.y) {
        multiplierY = 1;
      }

      const passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      };
      if (samePosition(passedPosition, desiredPosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }

    return false;
  }

  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
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
        validMode = this.pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KNIGHT:
        validMode = this.knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMode = this.bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.ROOK:
        validMode = this.rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.QUEEN:
        validMode = this.queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
      case PieceType.KING:
        validMode = this.kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        );
        break;
    }
    return validMode;
  }
}
