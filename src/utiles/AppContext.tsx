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
  paymetEmailId: string;
  posts: any;
  jobs: any;
  mobileBottomMenu:number
  projectDetails:{
    id:string,
    milestoneId:string
  }
};

const initState: contextType = {
  dispatch: () => {},
  temp: undefined,
  userRole: undefined,
  loggedIn: false,
  userData: undefined,
  paymetEmailId: "",
  jobs: undefined,
  posts: undefined,
  mobileBottomMenu:0,
  projectDetails:{
    id:"",
    milestoneId:""
  }
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setTemp":
      return {
        ...state,
        temp: action?.payload,
      };
      
    case "setMobileBottomMenu":
      return {
        ...state,
        mobileBottomMenu: action?.payload,
      };
      
    case "setProjectDetails":
      return {
        ...state,
        projectDetails:action?.payload,
      };
      

    case "setPaymentEmailId":
      return {
        ...state,
        paymetEmailId: action?.payload,
      };
    case "setUser":
      return {
        ...state,
        loggedIn: action?.payload?.loggedIn,
        userRole: action?.payload?.data?.userData?.role ?? undefined,
        userData: action.payload?.data ?? undefined,
        posts: action?.payload?.data?.allPosts  ,
        jobs: action?.payload?.data?.jobs,
      };

    case "addMessages": {
      const receiverKey = action.payload.receiverEmail.replace(/\./g, "_");

      return {
        ...state,
        userData: {
          ...state.userData,
          userData: {
            ...state.userData?.userData,
            messages: {
              ...(state.userData?.userData?.messages ?? {}), // Ensure messages exist
              [receiverKey]: {
                ...(state.userData?.userData?.messages?.[receiverKey] || {
                  messages: [],
                  name: action.payload.receiverName || "Unknown",
                  profile: action.payload.receiverProfile || "",
                  read: 0,
                }),
                messages: [
                  ...(state.userData?.userData?.messages?.[receiverKey]
                    ?.messages || []),
                ],
              },
            },
          },
        },
      };
    }

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [
    { temp, loggedIn, userData, userRole, posts, jobs, paymetEmailId,mobileBottomMenu,projectDetails },
    dispatch,
  ] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        loggedIn,
        userData,
        userRole,
        paymetEmailId,
        jobs,
        temp,
        posts,
        mobileBottomMenu,
        projectDetails
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
