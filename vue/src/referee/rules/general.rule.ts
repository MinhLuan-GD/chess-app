import { TeamType, samePosition } from "@/utils/constants";
import { Position, Piece } from "@/utils/types";

const tileIsEmptyOrOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
) => {
  return (
    !tileIsOccupied(position, boardState) ||
    tileIsOccupiedOpponent(position, boardState, team)
  );
};

const tileIsOccupied = (position: Position, boardState: Piece[]): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position));
  return piece != null;
};

const tileIsOccupiedOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  const piece = boardState.find(
    (p) => samePosition(p.position, position) && p.team !== team
  );
  return piece != null;
};

export {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedOpponent,
};
