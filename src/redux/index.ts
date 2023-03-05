import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { bingoReducer } from "./bingoReducer";

export const store = createStore(bingoReducer, composeWithDevTools());

export type RootStore = typeof store;
export type RootStateExtracted = ReturnType<typeof store.getState>;
