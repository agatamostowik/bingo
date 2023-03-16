import { BingoAction, BingoNumber, BingoTicket, Player } from "../types";

export const drawnNumberAction = (): BingoAction => {
  return {
    type: "numberDrawn",
  };
};

export const registrationAction = (id: Player["id"]): BingoAction => {
  return {
    type: "registered",
    payload: {
      id,
    },
  };
};
