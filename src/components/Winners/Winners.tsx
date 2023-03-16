import { useAppDispatch, useAppSelector } from "../../redux";
import { numberDrawn } from "../../redux/bingoReducer";
import classes from "./Winners.module.css";

export const Winners = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector((state) => state.bingoReducer.winners);

  const handleClick = () => {
    dispatch(numberDrawn());
  };

  return (
    <section className={classes["section"]}>
      <h3 className={classes["h3"]}>Winners</h3>
      <div className={classes["container"]}>
        <div className={classes["winners"]}>
          {winners.length ? (
            winners.map((winner) => {
              return <div className={classes["winner"]}>{winner}</div>;
            })
          ) : (
            <div className={classes["empty"]}>no winners yet!</div>
          )}
        </div>
        <div>
          <button className={classes["draw"]} onClick={handleClick}>
            Draw number
          </button>
        </div>
      </div>
    </section>
  );
};
