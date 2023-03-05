import { BingoAction, BingoNumber, BingoTicket } from "../types";

export const drawnNumberAction = (): BingoAction => {
  return {
    type: "numberDrawn",
  };
};

export const registrationAction = (
  name: string,
  ticket: BingoTicket
): BingoAction => {
  return {
    type: "registered",
    payload: {
      name: name,
      ticket: ticket,
    },
  };
};
