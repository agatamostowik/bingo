import "sanitize.css/sanitize.css";
import React, { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { DrawnNumbers } from "./components/DrawnNumbers/DrawnNumbers";
import { UnregisteredTickets } from "./components/UnregisteredTickets/UnregisteredTickets";
import { Winners } from "./components/Winners/Winners";
import { RegisteredTicketsContainer } from "./components/RegisteredTicketsContainer/RegisteredTicketsContainer.js";
import { store } from "./redux/index";
import classes from "./app.module.css";

function Circle(props: any) {
  console.log(props);
  return (
    <svg height="50" width="50">
      <circle
        cx="25"
        cy="50"
        r="50%"
        fill={props.odd ? "#2D4C57" : "#FF3F27"}
      />
    </svg>
  );
}

function Flags() {
  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        position: "absolute",
        transform: "rotate(25deg)",
        top: 0,
        right: 0,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280.000000 863.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,863.000000) scale(0.100000,-0.100000)"
          fill="#FF3F27"
          stroke="none"
        >
          <path
            d="M0 8395 c0 -20 6 -25 38 -31 20 -4 111 -23 202 -43 l165 -37 51 -219
c123 -528 272 -1168 384 -1649 66 -286 122 -521 124 -523 2 -3 183 208 456
533 63 75 533 635 625 745 50 59 181 215 292 346 l202 240 73 -14 c192 -37
179 -32 194 -68 7 -18 189 -529 403 -1136 214 -607 393 -1112 396 -1122 6 -14
174 232 691 1007 l684 1026 38 0 c20 0 87 -3 148 -6 l111 -7 549 -1098 c302
-605 551 -1099 554 -1099 3 0 250 491 550 1091 300 600 549 1093 555 1097 5 3
63 9 128 12 l118 5 641 -1033 c352 -568 643 -1030 647 -1027 3 4 207 520 453
1148 l446 1142 54 12 c29 6 88 18 131 26 l78 15 472 -567 c260 -311 611 -734
782 -940 l310 -374 72 299 c119 489 149 614 223 929 39 165 107 449 151 630
45 182 91 377 104 433 13 57 25 105 27 107 5 5 166 45 323 79 144 31 150 34
153 58 l3 26 -88 -19 c-48 -11 -140 -31 -203 -45 -63 -13 -129 -29 -146 -34
-17 -6 -145 -39 -285 -74 -140 -35 -416 -107 -614 -159 -654 -174 -827 -213
-1690 -378 -192 -37 -861 -122 -1165 -148 -343 -30 -466 -37 -1120 -69 -266
-12 -2020 -8 -2265 6 -121 7 -301 17 -400 23 -855 48 -1653 158 -2555 355
-300 65 -927 221 -1225 304 -192 54 -692 179 -775 195 -19 3 -85 17 -146 31
-61 13 -114 24 -118 24 -3 0 -6 -11 -6 -25z"
          />
        </g>
      </svg>
    </div>
  );
}

function Flags2() {
  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        position: "absolute",
        transform: "rotate(-25deg)",
        top: 0,
        left: 0,
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280.000000 863.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,863.000000) scale(0.100000,-0.100000)"
          fill="#2D4C57"
          stroke="none"
        >
          <path
            d="M0 8395 c0 -20 6 -25 38 -31 20 -4 111 -23 202 -43 l165 -37 51 -219
c123 -528 272 -1168 384 -1649 66 -286 122 -521 124 -523 2 -3 183 208 456
533 63 75 533 635 625 745 50 59 181 215 292 346 l202 240 73 -14 c192 -37
179 -32 194 -68 7 -18 189 -529 403 -1136 214 -607 393 -1112 396 -1122 6 -14
174 232 691 1007 l684 1026 38 0 c20 0 87 -3 148 -6 l111 -7 549 -1098 c302
-605 551 -1099 554 -1099 3 0 250 491 550 1091 300 600 549 1093 555 1097 5 3
63 9 128 12 l118 5 641 -1033 c352 -568 643 -1030 647 -1027 3 4 207 520 453
1148 l446 1142 54 12 c29 6 88 18 131 26 l78 15 472 -567 c260 -311 611 -734
782 -940 l310 -374 72 299 c119 489 149 614 223 929 39 165 107 449 151 630
45 182 91 377 104 433 13 57 25 105 27 107 5 5 166 45 323 79 144 31 150 34
153 58 l3 26 -88 -19 c-48 -11 -140 -31 -203 -45 -63 -13 -129 -29 -146 -34
-17 -6 -145 -39 -285 -74 -140 -35 -416 -107 -614 -159 -654 -174 -827 -213
-1690 -378 -192 -37 -861 -122 -1165 -148 -343 -30 -466 -37 -1120 -69 -266
-12 -2020 -8 -2265 6 -121 7 -301 17 -400 23 -855 48 -1653 158 -2555 355
-300 65 -927 221 -1225 304 -192 54 -692 179 -775 195 -19 3 -85 17 -146 31
-61 13 -114 24 -118 24 -3 0 -6 -11 -6 -25z"
          />
        </g>
      </svg>
    </div>
  );
}

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const w = Math.round(width / 50);

  return (
    <Provider store={store}>
      <div className={classes["grad"]}>
        <Flags />
        <Flags2 />

        <div className={classes["grad-shadow"]} />
      </div>
      <div className={classes["game-wrapper"]}>
        <div className={classes["content-wrapper"]}>
          <div className={classes["top-container"]}>
            <div className={classes["registered-tickets-wrapper"]}>
              <div className={classes["game-title"]}>
                <h1>BINGO!</h1>
              </div>
            </div>
          </div>
          {/* <RegisteredTicketsContainer /> */}
          {/* <UnregisteredTickets /> */}
          <div className={classes["circle-list"]} ref={ref}>
            {[...Array(w)].map((_, index) => {
              return <Circle key={index} odd={(index + 1) % 2 === 0} />;
            })}
          </div>
        </div>
        {/* <Winners /> */}
        {/* <DrawnNumbers /> */}
      </div>
    </Provider>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
