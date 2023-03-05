import React from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../Ticket/Ticket.js";
import { RootStateExtracted } from "../../redux";
import "./RegisteredTickets.css";

export function RegisteredTickets() {
  const players = useSelector((state: RootStateExtracted) => state.players);

  const numbersDrawn = useSelector(
    (state: RootStateExtracted) => state.numbersDrawn
  );

  return (
    <section>
      <div className="registered-tickets-title"></div>
      <h3>Registered tickets</h3>
      <ul className="registered-tickets ticket">
        {players.map((player, index) => (
          <li key={index}>
            <Ticket
              name={player.name}
              numbers={player.ticket}
              numbersDrawn={numbersDrawn}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
