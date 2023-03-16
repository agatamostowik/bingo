import { useLayoutEffect, useRef, useState } from "react";
import { Circle } from "./Circle";
import { Left, Right } from "./Flags";
import classes from "./background.module.css";

export const Background = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const w = Math.round(width / 50);

  return (
    <div ref={ref} className={classes["grad"]}>
      <Right />
      <Left />

      <div className={classes["circle-list"]}>
        {[...Array(w)].map((_, index) => {
          return <Circle key={index} odd={(index + 1) % 2 === 0} />;
        })}
      </div>
      <div className={classes["grad-shadow"]} />
    </div>
  );
};
