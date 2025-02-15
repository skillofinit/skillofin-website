/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useReducer } from "react";

export type dispatchDataType = {
  type: string;
  payload: any;
};

export type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  temp: any;
  userRole: string | undefined;
  loggedIn: boolean;
  userData: any;
};

const initState: contextType = {
  dispatch: () => {},
  temp: undefined,
  userRole: undefined,
  loggedIn: false,
  userData: undefined,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setTemp":
      return {
        ...state,
        temp: action?.payload,
      };
    case "setUser":
      return {
        ...state,
        loggedIn: action?.payload?.loggedIn,
        userRole: action?.payload?.data?.userData?.role ?? undefined,
        userData: action.payload?.data ?? undefined,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ temp, loggedIn, userData, userRole }, dispatch] = useReducer(
    reducer,
    initState
  );

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        loggedIn,
        userData,
        userRole,
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
