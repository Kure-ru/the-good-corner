import { CurrentUser } from "@/types/users.type";
import React from "react";

export const AuthContext = React.createContext<{
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}>({
  currentUser: null,
  setCurrentUser: (user: CurrentUser | null) => {},
});
