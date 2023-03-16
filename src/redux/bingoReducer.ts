import { createAction, createSlice } from "@reduxjs/toolkit";
import { BingoState } from "../types";
import { generateRandomTicket, randomName } from "../utils";
import {
  calculateNewWinners,
  calculatePlayersInTheGame,
  calculateStateWithNewDrawnNumbers,
} from "./helpers";

const initialNumbers = [...Array(75)].map((_, index) => {
  return index + 1;
});

const unregisteredPlayers = [...Array(4)].map((_, index) => {
  return { id: index, name: randomName(), ticket: generateRandomTicket() };
});

const initialState: BingoState = {
  unregisteredPlayers,
  registeredPlayers: [],
  winners: [],
  numbers: initialNumbers,
  numbersDrawn: [],
};

export const registered = createAction<{ id: number }>("registered");
export const numberDrawn = createAction("numberDrawn");

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registered, (state, action) => {
        const player = state.unregisteredPlayers.find(
          (player) => player.id === action.payload.id
        );

        if (player) {
          return {
            ...state,
            unregisteredPlayers: state.unregisteredPlayers.filter(
              (player) => player.id !== action.payload.id
            ),
            registeredPlayers: [...state.registeredPlayers, player],
          };
        } else {
          return state;
        }
      })
      .addCase(numberDrawn, (state) => {
        const stateWithNewDrawnNumbers =
          calculateStateWithNewDrawnNumbers(state);

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
      })

      .addDefaultCase((state) => {
        return state;
      });
  },
});

// export const { registered, numberDrawn } = bingoSlice.actions
export default bingoSlice.reducer;
