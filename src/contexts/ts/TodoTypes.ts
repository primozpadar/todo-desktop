import { TodoType } from "../../types";

export type Actions =
  | {
      type: "ADD";
      data: string;
    }
  | {
      type: "REMOVE";
      _id: string;
    }
  | {
      type: "DONE";
      _id: string;
      prev: boolean;
    }
  | { type: "INIT"; data: TodoType[] };

export type State = TodoType[];

export const initialState: State = [];
