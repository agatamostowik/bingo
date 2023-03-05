import React from "react";
import { useSelector } from "react-redux";
import { RootStateExtracted } from "../../redux";
import { RegisteredTickets } from "../RegisteredTickets/RegisteredTickets";

export function RegisteredTicketsContainer() {
  const players = useSelector((state: RootStateExtracted) => state.players);

  return <>{players.length !== 0 ? <RegisteredTickets /> : null}</>;
}
