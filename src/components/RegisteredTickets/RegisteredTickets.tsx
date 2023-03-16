import React from "react";
import { Ticket } from "../Ticket/Ticket.js";
import { useAppSelector } from "../../redux";
import classes from "./RegisteredTickets.module.css";
import "./RegisteredTickets.css";

export const RegisteredTickets = () => {
  const registeredPlayers = useAppSelector(
    (state) => state.bingoReducer.registeredPlayers
  );
  const unregisteredPlayers = useAppSelector(
    (state) => state.bingoReducer.unregisteredPlayers
  );
  const numbersDrawn = useAppSelector(
    (state) => state.bingoReducer.numbersDrawn
  );

  return (
    <ul className={classes["tickets"]}>
      {registeredPlayers.map((player) => {
        return (
          <li key={player.id} className={classes["container"]}>
            <small className={classes["small"]}>{player.name}</small>
            <Ticket numbers={player.ticket} numbersDrawn={numbersDrawn} />
          </li>
        );
      })}
      {unregisteredPlayers.map((player) => {
        return (
          <li key={player.id} className={classes["container"]}>
            <div className={classes["empty-slot"]} />
          </li>
        );
      })}
    </ul>
  );
};
