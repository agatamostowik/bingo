import { Provider } from "react-redux";
import { Background } from "../components/Background";
import { DrawnNumbers } from "../components/DrawnNumbers/DrawnNumbers";
import { RegisteredTickets } from "../components/RegisteredTickets/RegisteredTickets";
import { UnregisteredTickets } from "../components/UnregisteredTickets/UnregisteredTickets";
import { Winners } from "../components/Winners/Winners";
import { store } from "../redux/index";
import classes from "./app.module.css";

export const App = () => {
  return (
    <Provider store={store}>
      <Background />
      <div className={classes["game-wrapper"]}>
        <section className={classes["section"]}>
          <h3 className={classes["h3"]}>Unregistered tickets</h3>
          <UnregisteredTickets />
        </section>
        <section className={classes["section"]}>
          <h3 className={classes["h3"]}>Registered tickets</h3>
          <RegisteredTickets />
        </section>

        {/* <div className={classes["game-title"]}>
          <h1>BINGO!</h1>
        </div> */}
        <Winners />
        <DrawnNumbers />
      </div>
    </Provider>
  );
};
