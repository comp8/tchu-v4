import { createContext } from "react";

interface IAppContext {
  access_token: string;
}

export const AppContext = createContext<IAppContext>({
  access_token: null,
});