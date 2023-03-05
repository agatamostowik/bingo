import { BingoAction, BingoState } from "../types";
import {
  calculateNewWinners,
  calculatePlayersInTheGame,
  calculateStateWithNewDrawnNumbers,
} from "./helpers";

const initialNumbers = [...Array(75)].map((_, index) => {
  return index + 1;
});

const initialState: BingoState = {
  players: [],
  winners: [],
  numbers: initialNumbers,
  numbersDrawn: [],
};

export function bingoReducer(
  state = initialState,
  action: BingoAction
): BingoState {
  switch (action.type) {
    case "registered": {
      const flatTicketArray = action.payload.ticket.flat();
      const set = new Set(flatTicketArray);
      if (set.size === flatTicketArray.length) {
        return {
          ...state,
          players: [
            ...state.players,
            { name: action.payload.name, ticket: action.payload.ticket },
          ],
        };
      } else {
        return state;
      }
    }

    case "numberDrawn": {
      const stateWithNewDrawnNumbers = calculateStateWithNewDrawnNumbers(state);

      if (
        state.numbersDrawn.length ===
        stateWithNewDrawnNumbers.numbersDrawn.length
      ) {
        return state;
      }

      const playersInTheGame = calculatePlayersInTheGame(
        stateWithNewDrawnNumbers
      );

      const newWinners = calculateNewWinners(
        stateWithNewDrawnNumbers.numbersDrawn,
        stateWithNewDrawnNumbers.winners,
        playersInTheGame
      );

      return { ...stateWithNewDrawnNumbers, winners: newWinners };
    }

    default:
      return state;
  }
}
