import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateExtracted } from "../../redux";
import { drawnNumberAction } from "../../redux/actions";
import { BingoNumber } from "../../types";
import { random } from "../../utils";
import "./DrawnNumbers.css";

export function DrawnNumbers() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(drawnNumberAction());
  };

  const numbersDrawn = useSelector(
    (state: RootStateExtracted) => state.numbersDrawn
  );

  return (
    <section className="drawn-numbers-container">
      <h3>Drawn numbers</h3>
      {numbersDrawn.length !== 0 ? (
        <ul className="drawn">
          {numbersDrawn.map((n) => (
            <li key={n} className="drawnNumber">
              {n}
            </li>
          ))}
        </ul>
      ) : null}
      <button onClick={handleClick}>Draw number</button>
    </section>
  );
}
