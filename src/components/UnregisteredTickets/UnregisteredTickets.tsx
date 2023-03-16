import React from "react";
import { useDispatch } from "react-redux";
import { registrationAction } from "../../redux/actions";
import { useAppSelector } from "../../redux/index";
import { Ticket } from "../Ticket/Ticket.js";
import { Player } from "../../types";
import classes from "./UnregisteredTickets.module.css";

export const UnregisteredTickets = () => {
  const numbersDrawn = useAppSelector(
    (state) => state.bingoReducer.numbersDrawn
  );

  const unregisteredPlayers = useAppSelector(
    (state) => state.bingoReducer.unregisteredPlayers
  );

  return (
    <div className={classes["tickets"]}>
      {!unregisteredPlayers.length ? (
        <div className={classes["empty"]}>all aboard!</div>
      ) : (
        unregisteredPlayers.map((player) => {
          return (
            <RegisterableTicket
              key={player.id}
              player={player}
              numbersDrawn={numbersDrawn}
            />
          );
        })
      )}
    </div>
  );
};

type Props = {
  player: Player;
  numbersDrawn: readonly number[];
};

function RegisterableTicket(props: Props) {
  const { player, numbersDrawn } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(registrationAction(player.id));
  };

  return (
    <div className={classes["container"]}>
      <small className={classes["small"]}>{player.name}</small>
      <Ticket numbers={player.ticket} numbersDrawn={numbersDrawn} />
      <button className={classes["register"]} onClick={handleClick}>
        Register ticket
      </button>
    </div>
  );
}
