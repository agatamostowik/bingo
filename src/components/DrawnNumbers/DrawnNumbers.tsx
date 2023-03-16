import { useAppSelector } from "../../redux";
import classes from "./DrawnNumbers.module.css";

export const DrawnNumbers = () => {
  const numbersDrawn = useAppSelector(
    (state) => state.bingoReducer.numbersDrawn
  );

  return (
    <section className={classes["section"]}>
      <h3 className={classes["h3"]}>Drawn numbers</h3>
      <div className={classes["container"]}>
        {numbersDrawn.length !== 0 && (
          <ul className={classes["drawn"]}>
            {numbersDrawn.map((number) => (
              <li key={number} className={classes["drawn-number"]}>
                {number}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
