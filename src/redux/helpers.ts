import { BingoNumber, BingoState } from "../types";

const pickRandomNumber = (numbers: BingoState["numbers"]): number => {
  const randomIndex = 1 + Math.floor(Math.random() * (numbers.length - 1));

  return numbers[randomIndex];
};

export const calculateStateWithNewDrawnNumbers = (
  state: BingoState
): BingoState => {
  if (state.numbersDrawn.length === 75) {
    return state;
  }

  const numberDrawn = pickRandomNumber(state.numbers);

  return {
    ...state,
    numbersDrawn: [...state.numbersDrawn, numberDrawn],
    numbers: state.numbers.filter((number) => number !== numberDrawn),
  };
};

export const calculatePlayersInTheGame = (
  state: BingoState
): BingoState["registeredPlayers"] => {
  if (state.winners.length > 0) {
    return state.registeredPlayers.filter(
      (player) => !state.winners.includes(player.name)
    );
  } else {
    return state.registeredPlayers;
  }
};

export const horizontalCheck = (
  ticket: BingoNumber[][],
  numbersDrawn: BingoState["numbersDrawn"]
): boolean => {
  const [firstRow, ...restRows] = ticket;

  if (!firstRow) {
    return false;
  }

  if (firstRow.every((number) => numbersDrawn.includes(number))) {
    return true;
  } else {
    return horizontalCheck(restRows, numbersDrawn);
  }
};

export const getColumnValues = (
  ticket: BingoNumber[][],
  iteration: number
): BingoNumber[] => {
  return ticket.reduce((acc, row, index) => {
    if (iteration === 2 && index === 2) {
      return acc;
    } else if (iteration > 2 && index === 2) {
      return [...acc, row[iteration - 1]];
    } else {
      return [...acc, row[iteration]];
    }
  }, []);
};

export const verticalCheck = (
  ticket: BingoNumber[][],
  numbersDrawn: BingoState["numbersDrawn"],
  iteration: number = 0
): boolean => {
  const column = getColumnValues(ticket, iteration);

  if (iteration > 4) {
    return false;
  }

  if (column.every((number) => numbersDrawn.includes(number))) {
    return true;
  } else {
    return verticalCheck(ticket, numbersDrawn, iteration + 1);
  }
};

export const getDiagonalValues = (
  ticket: BingoNumber[][]
): [BingoNumber[], BingoNumber[]] => {
  return ticket.reduce(
    (acc, row, index) => {
      if (index === 2) {
        return acc;
      }
      return [
        [...acc[0], row[index]],
        [...acc[1], row[row.length - (index + 1)]],
      ];
    },
    [[], []] as [BingoNumber[], BingoNumber[]]
  );
};

export const diagonalCheck = <Tticket extends BingoNumber[][]>(
  ticket: Tticket,
  numbersDrawn: BingoState["numbersDrawn"]
): boolean => {
  const [left, right] = getDiagonalValues(ticket);

  if (
    left.every((number) => numbersDrawn.includes(number)) ||
    right.every((number) => numbersDrawn.includes(number))
  ) {
    return true;
  } else {
    return false;
  }
};

export const calculateNewWinners = (
  numbersDrawn: BingoState["numbersDrawn"],
  winners: BingoState["winners"],
  players: BingoState["registeredPlayers"]
): BingoState["winners"] => {
  const [firstPlayer, ...restPLayers] = players;

  if (!firstPlayer) {
    return winners;
  }

  const horizontal = horizontalCheck(firstPlayer.ticket, numbersDrawn);
  const vertical = verticalCheck(firstPlayer.ticket, numbersDrawn);
  const diagonal = diagonalCheck(firstPlayer.ticket, numbersDrawn);

  if (horizontal || vertical || diagonal) {
    return calculateNewWinners(
      numbersDrawn,
      [...winners, firstPlayer.name],
      restPLayers
    );
  } else {
    return calculateNewWinners(numbersDrawn, winners, restPLayers);
  }
};
