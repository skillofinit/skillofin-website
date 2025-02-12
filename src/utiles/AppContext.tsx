/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useReducer } from "react";

export type dispatchDataType = {
  type: string;
  payload: any;
};

export type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  temp: any;
};

const initState: contextType = {
  dispatch: () => {},
  temp: undefined,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setTemp":
      return {
        ...state,
        temp: action?.payload,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ temp }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        temp,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
