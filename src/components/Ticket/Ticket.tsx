import React from "react";
import { BingoTicket } from "../../types";
import "./Ticket.css";
import classes from "./Ticket.module.css";

type Props = {
  numbers: BingoTicket;
  numbersDrawn: readonly number[];
};

export function Ticket(props: Props) {
  const { numbers, numbersDrawn } = props;

  return (
    <div className="ticket-container">
      <h3 className="card-title-container">
        {"BINGO".split("").map((l) => {
          return <div className="card-title">{l}</div>;
        })}
      </h3>

      <div className="ticketNumbers">
        {numbers.map((col, i) => {
          return col.map((num, j) => {
            const isDrawn = numbersDrawn ? numbersDrawn.includes(num) : null;

            return (
              <React.Fragment key={`${i} + ${j}`}>
                <div className={`num ${isDrawn ? "marked" : ""}`}>{num}</div>
                {i === 2 && j === 1 ? (
                  <span className="material-symbols-outlined">star_rate</span>
                ) : null}
              </React.Fragment>
            );
          });
        })}
      </div>
    </div>
  );
}
