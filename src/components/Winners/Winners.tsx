import React from "react";
import { useSelector } from "react-redux";
import { RootStateExtracted } from "../../redux";
import { BingoState } from "../../types";
import "./Winners.css";

export function Winners() {
  const winners: BingoState["winners"] = useSelector(
    (state: RootStateExtracted) => state.winners
  );
  return (
    <section className="winners-container">
      <div className="winners-title-container"></div>
      <h3 className="winners-title">Winners</h3>
      <div className="winners-list-container">
        <p className="winners-list">
          {winners.length ? winners.join() : "no winners yet, game in progress"}
        </p>
      </div>
    </section>
  );
}
