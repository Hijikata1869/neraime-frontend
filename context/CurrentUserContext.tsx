import { ReactNode, createContext, useState } from "react";
import { CurrentUserObj } from "@/types/user";

export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUserObj | undefined;
    setCurrentUser: React.Dispatch<
      React.SetStateAction<CurrentUserObj | undefined>
    >;
    isLogin: boolean | undefined;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

type Props = {
  children: ReactNode;
};

export const CurrentUserContextProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<CurrentUserObj | undefined>(
    undefined
  );
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLogin, setIsLogin }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
