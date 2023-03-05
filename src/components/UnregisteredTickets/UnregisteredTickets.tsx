import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomTicket, randomName } from "../../utils.js";
import { registrationAction } from "../../redux/actions.js";
import { RootStateExtracted } from "../../redux/index.js";
import { Ticket } from "../Ticket/Ticket.js";
import { BingoTicket } from "../../types.js";
import "./UnregisteredTickets.css";

const initialPlayers = [...Array(10)].map(() => {
  return { name: randomName(), ticket: generateRandomTicket() };
});

export function UnregisteredTickets() {
  const numbersDrawn = useSelector(
    (state: RootStateExtracted) => state.numbersDrawn
  );

  const players = useSelector((state: RootStateExtracted) => state.players);
  const unregisteredPlayers = initialPlayers.filter((player) => {
    return !players.some(
      (p) => p.name === player.name && p.ticket === player.ticket
    );
  });

  return (
    <section>
      <h3>Unregistered tickets</h3>
      <ul className="ticket">
        {unregisteredPlayers.map((player, i) => (
          <li key={i}>
            <RegisterableTicket player={player} numbersDrawn={numbersDrawn} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type Props = {
  player: { name: string; ticket: BingoTicket };
  numbersDrawn: readonly number[];
};

function RegisterableTicket(props: Props) {
  const { player, numbersDrawn } = props;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(registrationAction(player.name, player.ticket));
  };

  return (
    <>
      <Ticket
        name={player.name}
        numbers={player.ticket}
        numbersDrawn={numbersDrawn}
      />
      <button onClick={handleClick}>Register ticket</button>
    </>
  );
}
