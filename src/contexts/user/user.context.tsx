import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useReducer } from "react";
import supabase from "../../utils/supabase/supabase.utils";

interface Props {
  children: React.ReactNode;
}

enum UserActionTypes {
  SET_USER = "SET_USER",
}

interface UserReducerAction {
  type: UserActionTypes;
  payload: User | null;
}

interface UserState {
  user: User | null;
}

const userReducer = (state: UserState, action: UserReducerAction) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [{ user }, dispatch] = useReducer(userReducer, { user: null });

  const setUser = (user: User | null) => {
    dispatch({ type: UserActionTypes.SET_USER, payload: user });
  };

  const value = { user, setUser };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") setUser(session?.user as User);
      if (event === "SIGNED_OUT") setUser(null);
    });
  }, []);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user as User);
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
